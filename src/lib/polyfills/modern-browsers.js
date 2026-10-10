// Replaces Next's bundled polyfill-module for the browserslist in package.json
// (Chrome/Edge/Firefox 111+, Safari 16.4+), which already ship Array.prototype.at,
// flat/flatMap, Object.fromEntries, Object.hasOwn and String trimStart/trimEnd.
// PageSpeed's "Legacy JavaScript" audit flagged those ~16 KiB. URL.canParse is
// the one newer API (Safari 17) the framework may still touch, so it stays.
if (typeof URL !== "undefined" && !("canParse" in URL)) {
  URL.canParse = function canParse(url, base) {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}
