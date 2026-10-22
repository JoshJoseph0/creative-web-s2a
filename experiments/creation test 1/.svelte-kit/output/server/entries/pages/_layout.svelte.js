import { a as slot } from "../../chunks/server.js";
// src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.push(`<!--[-->`);
	slot($$renderer, $$props, "default", {}, null);
	$$renderer.push(`<!--]-->`);
}
export { _layout as default };

//# sourceMappingURL=_layout.svelte.js.map