import { Gt as set_prerendering, Ht as enable_verbose_errors, Vt as set_assets, Wt as set_building, l as set_fix_stack_trace, o as set_manifest, s as set_read_implementation, t as format_response } from "./chunks/internal.js";
// node_modules/@sveltejs/kit/src/runtime/server/index.js
/**
* Sets the module-level state the runtime reads, then loads the runtime. Everything that
* evaluates user code, the env config included, sits behind this import
* @param {import('types').ServerConfigureOptions} opts
* @returns {Promise<import('types').ServerInstance>}
*/
async function configure({ building, prerendering, manifest, read, assets, fix_stack_trace, env }) {
	if (building) {
		set_building();
		enable_verbose_errors();
	}
	if (prerendering) set_prerendering();
	if (manifest) set_manifest(manifest);
	if (read) set_read_implementation(read);
	if (assets !== void 0) set_assets(assets);
	if (fix_stack_trace) set_fix_stack_trace(fix_stack_trace);
	const instance = await import("./chunks/instance.js");
	if (env) instance.set_env(env);
	return instance;
}
/**
* The `server` object adapters receive from `builder.generateServerInstance`
* @param {import('types').SSRManifest} manifest
* @returns {import('@sveltejs/kit').Server}
*/
function create_server(manifest) {
	/** @type {import('types').ServerInstance} */
	let server;
	return {
		init: async ({ env, read }) => {
			server = await configure({
				manifest,
				env,
				read
			});
			await server.init();
		},
		/** @type {import('types').ServerInstance['respond']} */
		respond: (request, options) => server.respond(request, options)
	};
}
/** @deprecated use the `server` written by `builder.generateServerInstance`, or `configure` */
var Server = class {
	#server;
	/** @param {import('types').SSRManifest} manifest */
	constructor(manifest) {
		this.#server = create_server(manifest);
	}
	/** @param {import('@sveltejs/kit').ServerInitOptions} opts */
	init(opts) {
		return this.#server.init(opts);
	}
	/**
	* @param {Request} request
	* @param {import('types').InternalRequestOptions} options
	*/
	respond(request, options) {
		return this.#server.respond(request, options);
	}
};
export { Server, configure, create_server, format_response };

//# sourceMappingURL=index.js.map