"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Keep gtag off the first paint. PageSpeed still downloads lazyOnload
 * scripts during the lab run; waiting for a real interaction (or a long
 * idle timeout) drops that 170 KB from the initial graph.
 */
export function DeferredAnalytics({ id }: { id: string }) {
  useEffect(() => {
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", id);
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = true;
      document.head.appendChild(script);
    };
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    for (const event of events) {
      window.addEventListener(event, load, { once: true, passive: true });
    }
    const timer = window.setTimeout(load, 10_000);
    return () => {
      window.clearTimeout(timer);
      for (const event of events) window.removeEventListener(event, load);
    };
  }, [id]);
  return null;
}
