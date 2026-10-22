export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	app_dir: "_app",
	app_path: "_app",
	assets: new Set([]),
	mime_types: {},
	client: {start:"_app/immutable/entry/start.CjNexErv.js",app:"_app/immutable/entry/app.DzCTumvK.js",imports:["_app/immutable/entry/start.CjNexErv.js","_app/immutable/entry/payload.DSmR2FwN.js","_app/immutable/chunks/CRzLMJPS.js","_app/immutable/chunks/Cz3I739T.js","_app/immutable/chunks/BM0Csl4m.js","_app/immutable/chunks/Cj8-xVjx.js","_app/immutable/entry/app.DzCTumvK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
	
	nodes: [
		__memo(() => import('./nodes/0.js')),
		__memo(() => import('./nodes/1.js')),
		__memo(() => import('./nodes/2.js'))
	],
	remotes: {
		
	},
	routes: [
		{
			id: "/",
			pattern: /^\/$/,
			params: [],
			page: { layouts: [0,], errors: [1,], leaf: 2 },
			endpoint: null
		}
	],
	prerendered_routes: new Set([]),
	matchers: async () => {
		return {};
	},
	server_assets: {}
}
})();
