"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  Heading2,
  ImageIcon,
  Link2,
  List,
  ListOrdered,
  Minus,
  Plus,
  Quote,
  Trash2,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoverImage } from "@/components/article-body";
import type { Article, ArticleBlock, CmsStore, MediaItem } from "@/lib/cms/types";
import { newId } from "@/lib/cms/types";

function addBlock(type: ArticleBlock["type"]): ArticleBlock {
  if (type === "heading") return { id: newId("b"), type, level: 2, text: "" };
  if (type === "quote") return { id: newId("b"), type, text: "", cite: "" };
  if (type === "list") return { id: newId("b"), type, style: "ul", items: [""] };
  if (type === "image") return { id: newId("b"), type, src: "", alt: "", caption: "" };
  if (type === "html") return { id: newId("b"), type, html: "" };
  if (type === "separator") return { id: newId("b"), type };
  if (type === "button") return { id: newId("b"), type, label: "Read more", href: "" };
  return { id: newId("b"), type: "paragraph", text: "" };
}

export function CmsArticleEditor({
  initial,
  store,
}: {
  initial: Article;
  store: CmsStore;
}) {
  const router = useRouter();
  const [article, setArticle] = useState(initial);
  const [media, setMedia] = useState(store.media);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [picker, setPicker] = useState<"cover" | "block" | null>(null);
  const [pickerBlock, setPickerBlock] = useState<string | null>(null);

  const wordCount = useMemo(
    () =>
      article.blocks
        .map((b) => {
          if ("text" in b) return b.text;
          if (b.type === "list") return b.items.join(" ");
          return "";
        })
        .join(" ")
        .trim()
        .split(/\s+/)
        .filter(Boolean).length,
    [article.blocks],
  );

  function patch(next: Partial<Article>) {
    setArticle((a) => ({ ...a, ...next }));
  }

  function setBlock(id: string, next: ArticleBlock) {
    setArticle((a) => ({ ...a, blocks: a.blocks.map((b) => (b.id === id ? next : b)) }));
  }

  function move(id: string, dir: -1 | 1) {
    setArticle((a) => {
      const i = a.blocks.findIndex((b) => b.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= a.blocks.length) return a;
      const blocks = [...a.blocks];
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      return { ...a, blocks };
    });
  }

  async function save(status?: Article["status"]) {
    setBusy(true);
    setMessage("");
    const payload = { ...article, status: status ?? article.status };
    if (status === "published") {
      payload.publishedAt = payload.publishedAt || new Date().toISOString();
      payload.date =
        payload.date ||
        new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    }
    const res = await fetch(`/api/cms/articles/${article.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error || "Save failed.");
      return;
    }
    setArticle(data);
    setMessage(status === "published" ? "Published." : "Saved.");
    router.refresh();
  }

  async function upload(file: File) {
    const form = new FormData();
    form.set("file", file);
    const res = await fetch("/api/cms/media", { method: "POST", body: form });
    const item = (await res.json()) as MediaItem & { error?: string };
    if (!res.ok) {
      setMessage(item.error || "Upload failed.");
      return;
    }
    setMedia((m) => [item, ...m]);
    applyMedia(item.url);
  }

  function applyMedia(url: string) {
    if (picker === "cover") patch({ image: url, ogImage: article.ogImage || url });
    if (picker === "block" && pickerBlock) {
      const block = article.blocks.find((b) => b.id === pickerBlock);
      if (block?.type === "image") setBlock(block.id, { ...block, src: url });
    }
    setPicker(null);
    setPickerBlock(null);
  }

  return (
    <div className="cms-editor">
      <header className="cms-editor__bar">
        <div>
          <p className="cms-kicker">{wordCount} words · /blogs/{article.slug || "…"}</p>
          <h1>{article.title || "Untitled article"}</h1>
        </div>
        <div className="cms-editor__actions">
          <Button variant="outline" disabled={busy} onClick={() => save("draft")}>
            Save draft
          </Button>
          <Button disabled={busy} onClick={() => save("published")}>
            Publish
          </Button>
          {article.slug ? (
            <a className="cms-ghost" href={`/blogs/${article.slug}`} target="_blank" rel="noreferrer">
              View
            </a>
          ) : null}
        </div>
      </header>
      {message ? <p className="cms-flash">{message}</p> : null}

      <div className="cms-editor__grid">
        <div className="cms-canvas">
          <Input
            className="cms-title-input"
            value={article.title}
            placeholder="Add title"
            onChange={(e) => patch({ title: e.target.value })}
          />
          <div className="cms-inserter">
            {(
              [
                ["paragraph", Type, "Paragraph"],
                ["heading", Heading2, "Heading"],
                ["quote", Quote, "Quote"],
                ["list", List, "List"],
                ["image", ImageIcon, "Image"],
                ["button", Link2, "Link button"],
                ["separator", Minus, "Divider"],
              ] as const
            ).map(([type, Icon, label]) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setArticle((a) => ({
                    ...a,
                    blocks: [...a.blocks, addBlock(type === "list" ? "list" : type)],
                  }))
                }
              >
                <Icon className="size-3.5" />
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                setArticle((a) => ({
                  ...a,
                  blocks: [...a.blocks, { id: newId("b"), type: "list", style: "ol", items: [""] }],
                }))
              }
            >
              <ListOrdered className="size-3.5" />
              Numbered
            </button>
            <button
              type="button"
              onClick={() => setArticle((a) => ({ ...a, blocks: [...a.blocks, addBlock("html")] }))}
            >
              <Plus className="size-3.5" />
              HTML
            </button>
          </div>

          {article.blocks.map((block, index) => (
            <div key={block.id} className="cms-block">
              <div className="cms-block__tools">
                <span>{block.type}</span>
                <button type="button" onClick={() => move(block.id, -1)} disabled={index === 0}>
                  <ArrowUp className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(block.id, 1)}
                  disabled={index === article.blocks.length - 1}
                >
                  <ArrowDown className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setArticle((a) => ({ ...a, blocks: a.blocks.filter((b) => b.id !== block.id) }))
                  }
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              {block.type === "paragraph" ? (
                <Textarea
                  value={block.text}
                  placeholder="Write…"
                  onChange={(e) => setBlock(block.id, { ...block, text: e.target.value })}
                />
              ) : null}
              {block.type === "heading" ? (
                <div className="cms-row">
                  <select
                    value={block.level}
                    onChange={(e) =>
                      setBlock(block.id, { ...block, level: Number(e.target.value) as 2 | 3 | 4 })
                    }
                  >
                    <option value={2}>H2</option>
                    <option value={3}>H3</option>
                    <option value={4}>H4</option>
                  </select>
                  <Input
                    value={block.text}
                    placeholder="Heading"
                    onChange={(e) => setBlock(block.id, { ...block, text: e.target.value })}
                  />
                </div>
              ) : null}
              {block.type === "quote" ? (
                <>
                  <Textarea
                    value={block.text}
                    placeholder="Quotation"
                    onChange={(e) => setBlock(block.id, { ...block, text: e.target.value })}
                  />
                  <Input
                    value={block.cite || ""}
                    placeholder="Citation (optional)"
                    onChange={(e) => setBlock(block.id, { ...block, cite: e.target.value })}
                  />
                </>
              ) : null}
              {block.type === "list" ? (
                <>
                  <select
                    value={block.style}
                    onChange={(e) =>
                      setBlock(block.id, { ...block, style: e.target.value as "ul" | "ol" })
                    }
                  >
                    <option value="ul">Bulleted</option>
                    <option value="ol">Numbered</option>
                  </select>
                  {block.items.map((item, i) => (
                    <Input
                      key={i}
                      value={item}
                      placeholder={`Item ${i + 1}`}
                      onChange={(e) => {
                        const items = [...block.items];
                        items[i] = e.target.value;
                        setBlock(block.id, { ...block, items });
                      }}
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => setBlock(block.id, { ...block, items: [...block.items, ""] })}
                  >
                    Add item
                  </Button>
                </>
              ) : null}
              {block.type === "image" ? (
                <>
                  {block.src ? <CoverImage src={block.src} alt={block.alt} className="cms-block-img" /> : null}
                  <Input
                    value={block.src}
                    placeholder="Image URL"
                    onChange={(e) => setBlock(block.id, { ...block, src: e.target.value })}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setPicker("block");
                      setPickerBlock(block.id);
                    }}
                  >
                    Choose from library
                  </Button>
                  <Input
                    value={block.alt}
                    placeholder="Alt text"
                    onChange={(e) => setBlock(block.id, { ...block, alt: e.target.value })}
                  />
                  <Input
                    value={block.caption || ""}
                    placeholder="Caption"
                    onChange={(e) => setBlock(block.id, { ...block, caption: e.target.value })}
                  />
                </>
              ) : null}
              {block.type === "html" ? (
                <Textarea
                  value={block.html}
                  placeholder="Embed HTML"
                  onChange={(e) => setBlock(block.id, { ...block, html: e.target.value })}
                />
              ) : null}
              {block.type === "separator" ? <hr /> : null}
              {block.type === "button" ? (
                <div className="cms-row">
                  <Input
                    value={block.label}
                    placeholder="Button label"
                    onChange={(e) => setBlock(block.id, { ...block, label: e.target.value })}
                  />
                  <Input
                    value={block.href}
                    placeholder="/costs/…"
                    onChange={(e) => setBlock(block.id, { ...block, href: e.target.value })}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <aside className="cms-side">
          <section>
            <h2>Publish</h2>
            <label>
              Status
              <select
                value={article.status}
                onChange={(e) => patch({ status: e.target.value as Article["status"] })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
                <option value="trash">Trash</option>
              </select>
            </label>
            <label>
              Display date
              <Input value={article.date} onChange={(e) => patch({ date: e.target.value })} />
            </label>
            <label>
              Publish at (ISO)
              <Input
                value={article.publishedAt}
                onChange={(e) => patch({ publishedAt: e.target.value })}
              />
            </label>
            <label className="cms-check">
              <input
                type="checkbox"
                checked={article.featured}
                onChange={(e) => patch({ featured: e.target.checked })}
              />
              Featured on home
            </label>
            <label className="cms-check">
              <input
                type="checkbox"
                checked={article.allowIndex}
                onChange={(e) => patch({ allowIndex: e.target.checked })}
              />
              Allow search indexing
            </label>
          </section>
          <section>
            <h2>Permalink</h2>
            <label>
              Slug
              <Input value={article.slug} onChange={(e) => patch({ slug: e.target.value })} />
            </label>
            <label>
              Author
              <Input value={article.author} onChange={(e) => patch({ author: e.target.value })} />
            </label>
          </section>
          <section>
            <h2>Taxonomy</h2>
            <label>
              Category
              <Input
                list="cms-cats"
                value={article.category}
                onChange={(e) => patch({ category: e.target.value })}
              />
              <datalist id="cms-cats">
                {store.categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
            <label>
              Tags (comma separated)
              <Input
                value={article.tags.join(", ")}
                onChange={(e) =>
                  patch({
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
              />
            </label>
          </section>
          <section>
            <h2>Excerpt</h2>
            <Textarea
              value={article.excerpt}
              onChange={(e) => patch({ excerpt: e.target.value })}
              placeholder="Standfirst used on cards and search."
            />
          </section>
          <section>
            <h2>Featured image</h2>
            {article.image ? (
              <CoverImage src={article.image} alt={article.imageAlt} className="cms-cover" />
            ) : null}
            <Input
              value={article.image}
              placeholder="Image URL"
              onChange={(e) => patch({ image: e.target.value })}
            />
            <Input
              value={article.imageAlt}
              placeholder="Alt text"
              onChange={(e) => patch({ imageAlt: e.target.value })}
            />
            <Button variant="outline" size="sm" type="button" onClick={() => setPicker("cover")}>
              Media library
            </Button>
          </section>
          <section>
            <h2>SEO</h2>
            <label>
              SEO title
              <Input
                value={article.seoTitle}
                placeholder={article.title}
                onChange={(e) => patch({ seoTitle: e.target.value })}
              />
            </label>
            <label>
              Meta description
              <Textarea
                value={article.seoDescription}
                placeholder={article.excerpt}
                onChange={(e) => patch({ seoDescription: e.target.value })}
              />
            </label>
            <label>
              Canonical URL
              <Input
                value={article.canonical}
                placeholder="https://gaf.healthcare/blogs/…"
                onChange={(e) => patch({ canonical: e.target.value })}
              />
            </label>
            <label>
              Social image
              <Input value={article.ogImage} onChange={(e) => patch({ ogImage: e.target.value })} />
            </label>
          </section>
          <section>
            <h2>Related links</h2>
            {article.relatedLinks.map((link, i) => (
              <div key={i} className="cms-row">
                <Input
                  value={link.label}
                  placeholder="Label"
                  onChange={(e) => {
                    const relatedLinks = [...article.relatedLinks];
                    relatedLinks[i] = { ...link, label: e.target.value };
                    patch({ relatedLinks });
                  }}
                />
                <Input
                  value={link.href}
                  placeholder="/costs/…"
                  onChange={(e) => {
                    const relatedLinks = [...article.relatedLinks];
                    relatedLinks[i] = { ...link, href: e.target.value };
                    patch({ relatedLinks });
                  }}
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => patch({ relatedLinks: [...article.relatedLinks, { label: "", href: "" }] })}
            >
              Add link
            </Button>
          </section>
        </aside>
      </div>

      {picker ? (
        <div className="cms-modal" role="dialog">
          <div className="cms-modal__card">
            <h2>Media library</h2>
            <input
              type="file"
              accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void upload(file);
              }}
            />
            <ul className="cms-media-grid">
              {media.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => applyMedia(item.url)}>
                    <CoverImage src={item.url} alt={item.alt || item.name} />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Button variant="outline" type="button" onClick={() => setPicker(null)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
