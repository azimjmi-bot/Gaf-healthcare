"use client";

import { useEffect } from "react";
import { classifyPageType, trackGaEvent } from "@/lib/analytics";

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
      // gtag.js ignores a rest-parameter array. It only runs commands queued
      // as an Arguments object (or an object with a `callee` property).
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", id);
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.async = true;
      document.head.appendChild(script);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      const pathname = window.location.pathname || "/";
      const locale = pathname.startsWith("/ar") ? "ar" : "en";
      const pageType = classifyPageType(pathname);
      const placement =
        anchor.dataset.gaPlacement ||
        (anchor.classList.contains("wa-float")
          ? "floating_widget"
          : anchor.closest("header")
            ? "header"
            : anchor.closest("footer")
              ? "footer"
              : "content");

      if (/^https:\/\/wa\.me\//i.test(href)) {
        trackGaEvent("whatsapp_click", {
          locale,
          placement,
          page_type: pageType,
          cta_target: "whatsapp",
        });
      } else if (/^tel:/i.test(href)) {
        trackGaEvent("phone_click", {
          locale,
          placement,
          page_type: pageType,
          cta_target: "phone",
        });
      }
    };

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    for (const event of events) {
      window.addEventListener(event, load, { once: true, passive: true });
    }
    document.addEventListener("click", onClick, { passive: true });
    const timer = window.setTimeout(load, 10_000);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onClick);
      for (const event of events) window.removeEventListener(event, load);
    };
  }, [id]);
  return null;
}
