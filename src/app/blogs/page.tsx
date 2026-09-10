import { CoverImage } from "@/components/article-body";
import { LocaleLink as Link } from "@/components/locale-link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { blogSettings, listPublishedPosts } from "@/lib/blogs";
import { localizeBlog } from "@/lib/i18n/localize";
import { LOCALES } from "@/lib/i18n/languages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getLocalizedFields } from "@/lib/i18n/service";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const settings = blogSettings();
  const fields = await getLocalizedFields({
    sourceType: "page",
    sourceId: "blogs-index",
    language: locale,
    fields: {
      blogEyebrow: settings.blogEyebrow,
      blogTitle: settings.blogTitle,
      blogLede: settings.blogLede,
      seoTitle: "Blogs",
    },
    generateIfMissing: locale !== "en",
  });
  return withLocaleMetadata({ title: fields.seoTitle || "Blogs" }, "/blogs", locale, LOCALES);
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const settings = blogSettings();
  const locale = await getRequestLocale();
  const localizedSettings = await getLocalizedFields({
    sourceType: "page",
    sourceId: "blogs-index",
    language: locale,
    fields: {
      blogEyebrow: settings.blogEyebrow,
      blogTitle: settings.blogTitle,
      blogLede: settings.blogLede,
    },
    generateIfMissing: locale !== "en",
  });
  const category = Array.isArray(raw.category) ? raw.category[0] : raw.category;
  const pageRaw = Array.isArray(raw.page) ? raw.page[0] : raw.page;
  const page = Math.max(1, Number.parseInt(pageRaw || "1", 10) || 1);
  const all = listPublishedPosts().filter((p) => !category || p.category === category);
  const size = settings.postsPerPage || 12;
  const totalPages = Math.max(1, Math.ceil(all.length / size) || 1);
  const current = Math.min(page, totalPages);
  const posts = await Promise.all(
    all.slice((current - 1) * size, current * size).map((post) => localizeBlog(post, locale, false)),
  );

  return (
    <>
      <PageIntro
        eyebrow={localizedSettings.blogEyebrow || settings.blogEyebrow}
        title={localizedSettings.blogTitle || settings.blogTitle}
        lede={localizedSettings.blogLede || settings.blogLede}
      />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-16">
        {all.length === 0 ? (
          <p className="text-muted-foreground">No published notes yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-56 overflow-hidden bg-[#dce8ee]">
                  {post.image ? (
                    <CoverImage
                      src={post.image}
                      alt={post.imageAlt || ""}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-[0.18em] uppercase text-gold">
                    {post.category} · {post.date}
                  </p>
                  <h2 className="mt-2 font-heading text-3xl leading-snug">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {totalPages > 1 ? (
          <p className="mt-10 flex gap-3 text-sm">
            {current > 1 ? (
              <Link href={`/blogs?page=${current - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>
                Previous
              </Link>
            ) : null}
            <span>
              Page {current} of {totalPages}
            </span>
            {current < totalPages ? (
              <Link href={`/blogs?page=${current + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}>
                Next
              </Link>
            ) : null}
          </p>
        ) : null}
      </section>
      <CtaBand />
    </>
  );
}
