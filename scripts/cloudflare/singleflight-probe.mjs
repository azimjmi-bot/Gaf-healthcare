/**
 * Local workerd probe. Not a production entry. Two requests share one slot.
 * `/naive-waiter` awaits the leader's promise. `/poll-waiter` reads a field
 * from its own timer. The test records which of those returns 200.
 */
const slots = new Map();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id") || "job";
    if (url.pathname === "/naive-leader" || url.pathname === "/poll-leader") {
      let resolve;
      const promise = new Promise((done) => {
        resolve = done;
      });
      const slot = { promise, resolve, result: null, waiterReady: false };
      slots.set(id, slot);
      const deadline = Date.now() + 2000;
      while (!slot.waiterReady && Date.now() < deadline) await wait(5);
      slot.result = "ok";
      resolve("ok");
      return new Response("leader", { status: 200 });
    }
    if (url.pathname === "/naive-waiter") {
      const slot = slots.get(id);
      if (!slot) return new Response("missing", { status: 500 });
      slot.waiterReady = true;
      try {
        const value = await slot.promise;
        return new Response(String(value), { status: 200 });
      } catch (error) {
        return new Response(error instanceof Error ? error.message : String(error), { status: 500 });
      }
    }
    if (url.pathname === "/poll-waiter") {
      const deadline = Date.now() + 2000;
      while (Date.now() < deadline) {
        const slot = slots.get(id);
        if (slot) slot.waiterReady = true;
        if (slot?.result) return new Response(slot.result, { status: 200 });
        await wait(5);
      }
      return new Response("timeout", { status: 504 });
    }
    return new Response("not found", { status: 404 });
  },
};
