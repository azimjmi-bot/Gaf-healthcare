import { CoverImage } from "@/components/article-body";
import { LocaleLink as Link } from "@/components/locale-link";
import { PseoEstimateCtaSection } from "@/components/pseo-estimate-cta";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogDirectoryFacets, blogSettings, filterPublishedPosts } from "@/lib/blogs";
import { LOCALES } from "@/lib/i18n/languages";
import { localizeBlog, localizeMessages } from "@/lib/i18n/localize";
import { localePageIsRenderable } from "@/lib/i18n/locale-publication";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { localePath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { treatmentUi } from "@/lib/i18n/treatment-ui";
import { blogEstimateWhatsapp } from "@/lib/site";
import { getSpecialty } from "@/lib/taxonomy";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function valueOf(value: string | string[] | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, "/blogs")) {
    return { robots: { index: false, follow: false } };
  }
  const messages = await localizeMessages(locale);
  const query = await searchParams;
  const filtered = ["q", "specialty", "subspecialty", "category"].some((key) => Boolean(valueOf(query[key])));
  return withLocaleMetadata(
    {
      title: messages["seo.blogsTitle"] || "Blogs",
      robots: filtered ? { index: false, follow: true } : undefined,
    },
    "/blogs",
    locale,
    LOCALES,
  );
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, "/blogs")) notFound();
  const settings = blogSettings(locale);
  const messages = await localizeMessages(locale);
  const ui = treatmentUi(locale);
  const q = valueOf(query.q);
  const specialty = valueOf(query.specialty);
  const subspecialty = valueOf(query.subspecialty);
  const category = valueOf(query.category);
  const requestedPage = Math.max(1, Number(valueOf(query.page)) || 1);
  const allPublished = filterPublishedPosts(locale);
  const filtered = filterPublishedPosts(locale, { q, specialty, subspecialty, category });
  const { specialtySlugs, subspecialties } = blogDirectoryFacets(locale);
  const size = settings.postsPerPage || 12;
  const pageCount = Math.max(1, Math.ceil(filtered.length / size) || 1);
  const page = Math.min(requestedPage, pageCount);
  const posts = await Promise.all(
    filtered.slice((page - 1) * size, page * size).map((post) => localizeBlog(post, locale)),
  );
  const action = localePath("/blogs", locale);
  const listingWa = blogEstimateWhatsapp("treatment");
  const hasActiveFilters = Boolean(q || specialty || subspecialty || category);

  function pageHref(nextPage: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (specialty) params.set("specialty", specialty);
    if (subspecialty) params.set("subspecialty", subspecialty);
    if (category && !specialty) params.set("category", category);
    params.set("page", String(nextPage));
    return `${action}?${params}`;
  }

  return (
    <>
      <main className="treatments-directory blogs-directory">
        <section className="treatments-directory__hero">
          <div className="page-wrap">
            <p className="eyebrow">{settings.blogEyebrow}</p>
            <h1>{messages["seo.blogsTitle"] || settings.blogTitle}</h1>
            <p>{settings.blogLede}</p>
          </div>
        </section>

        <div className="page-wrap treatments-directory__layout">
          <aside className="treatment-filters">
            <div className="treatment-filters__title">
              <SlidersHorizontal className="size-5" aria-hidden="true" />
              <strong>{ui.applyFilters}</strong>
            </div>
            <form action={action} method="get">
              <label>
                {messages["blogs.searchLabel"]}
                <span className="treatment-search">
                  <Search className="size-4" aria-hidden="true" />
                  <input
                    type="search"
                    name="q"
                    defaultValue={q}
                    placeholder={messages["blogs.searchPlaceholder"]}
                  />
                </span>
              </label>
              {specialtySlugs.length > 1 ? (
                <label>
                  {ui.specialty}
                  <select name="specialty" defaultValue={specialty}>
                    <option value="">{ui.allSpecialties}</option>
                    {specialtySlugs.map((slug) => {
                      const row = getSpecialty(slug);
                      return (
                        <option key={slug} value={slug}>
                          {taxonomyLabel(row?.name, locale) || slug}
                        </option>
                      );
                    })}
                  </select>
                </label>
              ) : null}
              {subspecialties.length > 1 ? (
                <label>
                  {ui.subspecialty}
                  <select name="subspecialty" defaultValue={subspecialty}>
                    <option value="">{ui.allSubspecialties}</option>
                    {subspecialties.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <button type="submit">{ui.applyFilters}</button>
              {hasActiveFilters ? <Link href={action}>{ui.clearFilters}</Link> : null}
            </form>
          </aside>

          <section className="treatment-results" aria-live="polite">
            <p className="treatment-results__count">
              {filtered.length} {messages["blogs.results"]}
            </p>
            {posts.length > 0 ? (
              <div className="blogs-grid">
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
            ) : (
              <div className="treatment-results__empty">
                <Search className="size-8" aria-hidden="true" />
                <p>{allPublished.length > 0 ? messages["blogs.noResults"] : messages["blogs.empty"]}</p>
              </div>
            )}
            {pageCount > 1 ? (
              <nav className="treatment-pagination" aria-label="Pagination">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <Link key={number} href={pageHref(number)} aria-current={number === page ? "page" : undefined}>
                    {number}
                  </Link>
                ))}
              </nav>
            ) : null}
          </section>
        </div>
      </main>
      <PseoEstimateCtaSection
        subject="treatment"
        place="India"
        consultHref={listingWa.primary}
        secondaryHref={listingWa.secondary}
        variant="records"
      />
    </>
  );
}
