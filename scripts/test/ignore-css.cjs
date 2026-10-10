// Components import route-scoped stylesheets for side effects; Node's test
// runner has no CSS pipeline, so treat them as empty modules.
const Module = require("node:module");
Module._extensions[".css"] = (mod) => {
  mod.exports = {};
};
