import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/page-shell";
import { getPost, posts } from "@/lib/blogs";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post ? post.title : "Blogs" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative h-[50vh] min-h-[22rem] bg-ink text-ivory">
        <Image src={post.image} alt="" fill className="object-cover" priority />
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
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <p className="text-sm text-muted-foreground">{post.author}</p>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
          {post.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </div>
        <Link
          href="/blogs"
          className="mt-12 inline-block text-sm underline-offset-4 hover:underline"
        >
          All blogs
        </Link>
      </article>
      {others.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
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
