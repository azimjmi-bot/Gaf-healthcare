import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16) / 255,
    g: Number.parseInt(value.slice(2, 4), 16) / 255,
    b: Number.parseInt(value.slice(4, 6), 16) / 255,
  };
}

function channel(value: number) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test("WhatsApp float copy meets WCAG AA contrast on white", () => {
  const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
  const float = css.match(/\.wa-float \{[\s\S]*?color:\s*(#[0-9a-fA-F]{6});/);
  const meta = css.match(/\.wa-float__meta \{[\s\S]*?color:\s*(#[0-9a-fA-F]{6});/);
  const status = css.match(/\.wa-float__status \{[\s\S]*?color:\s*(#[0-9a-fA-F]{6});/);
  const title = css.match(/\.wa-float__title \{[\s\S]*?color:\s*(#[0-9a-fA-F]{6});/);
  assert.ok(float && meta && status && title);
  assert.ok(contrastRatio(float[1], "#ffffff") >= 4.5, float[1]);
  assert.ok(contrastRatio(meta[1], "#ffffff") >= 4.5, meta[1]);
  assert.ok(contrastRatio(status[1], "#ffffff") >= 4.5, status[1]);
  assert.ok(contrastRatio(title[1], "#ffffff") >= 4.5, title[1]);
});
