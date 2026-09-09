"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CmsSettings } from "@/lib/cms/types";

export function CmsSettingsForm({ initial }: { initial: CmsSettings }) {
  const [settings, setSettings] = useState(initial);
  const [message, setMessage] = useState("");

  async function save() {
    const res = await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    setMessage(res.ok ? "Settings saved. Public /blogs will use the new intro copy." : data.error || "Save failed.");
  }

  return (
    <div className="cms-form">
      <label>
        Default author
        <Input
          value={settings.defaultAuthor}
          onChange={(e) => setSettings({ ...settings, defaultAuthor: e.target.value })}
        />
      </label>
      <label>
        Posts per page
        <Input
          type="number"
          min={1}
          value={settings.postsPerPage}
          onChange={(e) => setSettings({ ...settings, postsPerPage: Number(e.target.value) || 12 })}
        />
      </label>
      <label>
        Blogs eyebrow
        <Input
          value={settings.blogEyebrow}
          onChange={(e) => setSettings({ ...settings, blogEyebrow: e.target.value })}
        />
      </label>
      <label>
        Blogs heading
        <Input
          value={settings.blogTitle}
          onChange={(e) => setSettings({ ...settings, blogTitle: e.target.value })}
        />
      </label>
      <label>
        Blogs lede
        <Textarea
          value={settings.blogLede}
          onChange={(e) => setSettings({ ...settings, blogLede: e.target.value })}
        />
      </label>
      {message ? <p className="cms-flash">{message}</p> : null}
      <Button type="button" onClick={() => void save()}>
        Save settings
      </Button>
    </div>
  );
}
