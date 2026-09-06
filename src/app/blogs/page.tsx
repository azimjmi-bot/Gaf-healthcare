import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { posts } from "@/lib/blogs";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blogs" };

export default function BlogsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Desk"
        title="Planning notes, not a magazine."
        lede="Short essays on radiation techniques, when travel is justified, and the records we ask for before anyone books a ticket. This is the only editorial surface on the site."
      />
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-56">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
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
      </section>
      <CtaBand />
    </>
  );
}
