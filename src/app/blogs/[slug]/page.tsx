import { cookies } from "next/headers";
import { ArticleBlocks, ArticleRelated, CoverImage } from "@/components/article-body";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/page-shell";
import { CMS_COOKIE, cmsToken } from "@/lib/cms/auth";
import { getArticleBySlug } from "@/lib/cms/store";
import { getPost, listPublishedPosts } from "@/lib/blogs";
import { SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const jar = await cookies();
  const preview = jar.get(CMS_COOKIE)?.value === cmsToken();
  const post = getPost(slug) ?? (preview ? getArticleBySlug(slug) : undefined);
  if (!post) return { title: "Blogs" };
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return {
    title,
    description,
    robots: post.allowIndex ? undefined : { index: false, follow: true },
    alternates: {
      canonical: post.canonical || `${SITE_URL}/blogs/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      images: post.ogImage || post.image ? [{ url: post.ogImage || post.image }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jar = await cookies();
  const preview = jar.get(CMS_COOKIE)?.value === cmsToken();
  const post = getPost(slug) ?? (preview ? getArticleBySlug(slug) : undefined);
  if (!post) notFound();

  const others = listPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative h-[50vh] min-h-[22rem] bg-ink text-ivory">
        {post.image ? (
          <CoverImage src={post.image} alt={post.imageAlt || ""} className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 md:px-8">
          <p className="eyebrow text-gold">
            Blogs · {post.category} · {post.date}
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl leading-[1.05] md:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-5 md:px-8 md:py-20">
        <p className="text-sm text-muted-foreground">{post.author}</p>
        {post.tags.length > 0 ? (
          <p className="mt-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
            {post.tags.join(" · ")}
          </p>
        ) : null}
        <div className="mt-8">
          <ArticleBlocks blocks={post.blocks} />
        </div>
        <ArticleRelated links={post.relatedLinks} />
        <Link
          href="/blogs"
          className="mt-12 inline-block text-sm underline-offset-4 hover:underline"
        >
          All blogs
        </Link>
      </article>
      {others.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
            <p className="eyebrow">Also on the desk</p>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blogs/${p.slug}`} className="group block">
                    <p className="text-xs tracking-[0.18em] uppercase text-gold">{p.category}</p>
                    <h2 className="mt-2 font-heading text-2xl group-hover:text-gold">{p.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}
