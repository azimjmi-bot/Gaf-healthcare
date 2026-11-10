"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoverImage } from "@/components/article-body";
import { CmsImageUpload } from "@/components/cms/cms-image-upload";
import { CmsMarkdownField } from "@/components/cms/cms-markdown-field";
import { CMS_IMAGE_ACCEPT, uploadCmsMediaMany } from "@/lib/cms/upload-client";
import type { Article, ArticleBlock, CmsStore, MediaItem } from "@/lib/cms/types";
import { newId } from "@/lib/cms/types";

/** Convert a multi-block article to a single Markdown string for the unified editor. */
function blocksToMarkdown(blocks: ArticleBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") return block.text;
      if (block.type === "heading") {
        const prefix = "#".repeat(block.level);
        return `${prefix} ${block.text}`;
      }
      if (block.type === "list") {
        return block.items
          .filter(Boolean)
          .map((item, i) => (block.style === "ol" ? `${i + 1}. ${item}` : `- ${item}`))
          .join("\n");
      }
      if (block.type === "quote") {
        const lines = block.text.split("\n").map((l) => `> ${l}`).join("\n");
        return block.cite ? `${lines}\n>\n> — ${block.cite}` : lines;
      }
      if (block.type === "separator") return "---";
      if (block.type === "image") {
        const caption = block.caption ? `\n*${block.caption}*` : "";
        return `![${block.alt}](${block.src})${caption}`;
      }
      if (block.type === "button") return `[${block.label}](${block.href})`;
      if (block.type === "html") return block.html;
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

/** Wrap a markdown body string into the single-block format used for storage. */
function markdownToBlocks(id: string, text: string): ArticleBlock[] {
  return [{ id, type: "paragraph", text }];
}


export function CmsArticleEditor({
  initial,
  store,
}: {
  initial: Article;
  store: CmsStore;
}) {
  const router = useRouter();
  const BODY_BLOCK_ID = useRef(initial.blocks[0]?.id || newId("b")).current;

  // Flatten all existing blocks into a single markdown string on first load
  const [article, setArticle] = useState(() => ({
    ...initial,
    blocks: markdownToBlocks(BODY_BLOCK_ID, blocksToMarkdown(initial.blocks)),
  }));
  const [media, setMedia] = useState(store.media);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [picker, setPicker] = useState(false);

  const bodyText = (article.blocks[0] as Extract<ArticleBlock, { type: "paragraph" }>)?.text ?? "";

  const wordCount = useMemo(
    () => bodyText.trim().split(/\s+/).filter(Boolean).length,
    [bodyText],
  );

  function patch(next: Partial<Article>) {
    setArticle((a) => ({ ...a, ...next }));
  }

  function setBody(text: string) {
    setArticle((a) => ({
      ...a,
      blocks: markdownToBlocks(BODY_BLOCK_ID, text),
    }));
  }

  function rememberMedia(items: MediaItem[]) {
    setMedia((m) => [...items, ...m]);
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

  async function uploadIntoPicker(files: Iterable<File>) {
    setBusy(true);
    try {
      const items = await uploadCmsMediaMany(files);
      rememberMedia(items);
      if (items[0]) {
        patch({ image: items[0].url, ogImage: article.ogImage || items[0].url });
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
      setPicker(false);
    }
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
          <CmsMarkdownField
            label="Article content"
            value={bodyText}
            rows={40}
            hint="Write or paste the full article here. Markdown is supported: ## Heading, **bold**, *italic*, - lists, [link](url), ![image](url), and raw HTML."
            onChange={setBody}
            onMedia={rememberMedia}
            onError={setMessage}
          />
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
            <CmsImageUpload
              label=""
              src={article.image}
              alt={article.imageAlt}
              emptyHint="No featured image yet. Upload a file or paste a URL."
              chooseLabel={article.image ? "Replace image" : "Upload image"}
              onChange={(image) => patch({ image, ogImage: article.ogImage || image })}
              onUploaded={rememberMedia}
              onError={setMessage}
            />
            <Input
              value={article.image}
              placeholder="Or paste an image URL"
              onChange={(e) => patch({ image: e.target.value })}
            />
            <Input
              value={article.imageAlt}
              placeholder="Alt text"
              onChange={(e) => patch({ imageAlt: e.target.value })}
            />
            <Button variant="outline" size="sm" type="button" onClick={() => setPicker(true)}>
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
            <h2>Cover image — media library</h2>
            <p className="cms-muted">Upload an image to use as the article cover.</p>
            <input
              type="file"
              accept={CMS_IMAGE_ACCEPT}
              multiple
              onChange={(e) => {
                if (e.target.files?.length) void uploadIntoPicker(e.target.files);
                e.target.value = "";
              }}
            />
            <ul className="cms-media-grid">
              {media.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      patch({ image: item.url, ogImage: article.ogImage || item.url });
                      setPicker(false);
                    }}
                  >
                    <CoverImage src={item.url} alt={item.alt || item.name} />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <Button variant="outline" type="button" onClick={() => setPicker(false)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
