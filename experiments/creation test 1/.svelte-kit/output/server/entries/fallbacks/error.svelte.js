import "../../chunks/server-errors.js";
import { St as escape_html, s as getContext } from "../../chunks/server.js";
import "../../chunks/index-server.js";
// node_modules/@sveltejs/kit/src/runtime/app/state/server.js
function context() {
	return getContext("__request__");
}
var page = {
	get data() {
		return context().page.data;
	},
	get error() {
		return context().page.error;
	},
	get form() {
		return context().page.form;
	},
	get params() {
		return context().page.params;
	},
	get route() {
		return context().page.route;
	},
	get shallow() {
		return context().page.shallow;
	},
	get state() {
		return context().page.state;
	},
	get status() {
		return context().page.status;
	},
	get url() {
		return context().page.url;
	}
};
// node_modules/@sveltejs/kit/src/runtime/components/error.svelte
function Error($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
	});
}
export { Error as default };

//# sourceMappingURL=error.svelte.js.map