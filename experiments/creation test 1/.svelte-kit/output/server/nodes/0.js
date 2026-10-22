

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.laPIwY2s.js","_app/immutable/chunks/BM0Csl4m.js","_app/immutable/chunks/uZ6ssbAw.js"];
export const stylesheets = ["_app/immutable/assets/0.Di9NP_HU.css"];
export const fonts = [];
