

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CTOfRjPh.js","_app/immutable/chunks/D9eMWznT.js","_app/immutable/chunks/JsbfRmew.js"];
export const stylesheets = ["_app/immutable/assets/2.Dl9nCA7L.css"];
export const fonts = [];
