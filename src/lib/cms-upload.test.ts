import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCmsImageFile } from "./cms/upload-client";

describe("isCmsImageFile", () => {
  it("accepts image MIME types and the usual extensions", () => {
    assert.equal(isCmsImageFile(new File(["x"], "ward.webp", { type: "image/webp" })), true);
    assert.equal(isCmsImageFile(new File(["x"], "scan.PNG", { type: "" })), true);
    assert.equal(isCmsImageFile(new File(["x"], "notes.pdf", { type: "application/pdf" })), false);
  });
});
