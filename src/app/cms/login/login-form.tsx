"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CmsLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/cms/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Wrong password.");
      return;
    }
    router.push(params.get("next") || "/cms");
    router.refresh();
  }

  return (
    <div className="cms-login">
      <form onSubmit={onSubmit} className="cms-login__card">
        <p className="cms-kicker">Velora desk</p>
        <h1>Sign in to the article CMS</h1>
        <p>
          Local default password is <code>velora-local</code>. Set <code>CMS_PASSWORD</code> in
          production.
        </p>
        <label>
          Password
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </label>
        {error ? <p className="cms-error">{error}</p> : null}
        <Button type="submit">Enter desk</Button>
      </form>
    </div>
  );
}
