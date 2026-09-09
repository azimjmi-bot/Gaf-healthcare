"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Article, ArticleStatus } from "@/lib/cms/types";

export function CmsArticleTable({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ArticleStatus | "all">("all");

  const rows = useMemo(() => {
    return articles
      .filter((a) => (status === "all" ? a.status !== "trash" : a.status === status))
      .filter((a) => {
        const hay = `${a.title} ${a.slug} ${a.category} ${a.excerpt}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      });
  }, [articles, q, status]);

  async function duplicate(id: string) {
    const res = await fetch(`/api/cms/articles/${id}/duplicate`, { method: "POST" });
    const data = await res.json();
    if (res.ok) router.push(`/cms/articles/${data.id}`);
    else router.refresh();
  }

  async function trash(id: string) {
    await fetch(`/api/cms/articles/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function restore(id: string) {
    await fetch(`/api/cms/articles/${id}/restore`, { method: "POST" });
    router.refresh();
  }

  return (
    <div>
      <div className="cms-filters">
        <Input value={q} placeholder="Search articles" onChange={(e) => setQ(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value as ArticleStatus | "all")}>
          <option value="all">All except trash</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
          <option value="scheduled">Scheduled</option>
          <option value="trash">Trash</option>
        </select>
      </div>
      <table className="cms-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5}>No articles in this view.</td>
            </tr>
          ) : (
            rows.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link href={`/cms/articles/${a.id}`}>{a.title || "Untitled"}</Link>
                  <div className="cms-muted">/{a.slug}</div>
                </td>
                <td>{a.category}</td>
                <td>{a.status}</td>
                <td>{a.date}</td>
                <td className="cms-row-actions">
                  <Button variant="outline" size="xs" type="button" onClick={() => duplicate(a.id)}>
                    Duplicate
                  </Button>
                  {a.status === "trash" ? (
                    <>
                      <Button variant="outline" size="xs" type="button" onClick={() => restore(a.id)}>
                        Restore
                      </Button>
                      <Button variant="destructive" size="xs" type="button" onClick={() => trash(a.id)}>
                        Delete forever
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="xs" type="button" onClick={() => trash(a.id)}>
                      Trash
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
