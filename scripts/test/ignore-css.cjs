// Components import route-scoped stylesheets for side effects; Node's test
// runner has no CSS pipeline, so treat them as empty modules.
const Module = require("node:module");
Module._extensions[".css"] = (mod) => {
  mod.exports = {};
};

// `server-only` throws when imported outside a React Server graph. Unit tests
// that exercise SEO/jsonld helpers need a no-op shim unless NODE_OPTIONS
// already sets `--conditions react-server`.
try {
  const serverOnlyPath = require.resolve("server-only");
  require.cache[serverOnlyPath] = {
    id: serverOnlyPath,
    filename: serverOnlyPath,
    loaded: true,
    exports: {},
  };
} catch {
  // Package missing in some lean checkouts — ignore.
}
