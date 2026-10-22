

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.EZH5pSGC.js","_app/immutable/chunks/D9eMWznT.js","_app/immutable/chunks/JsbfRmew.js"];
export const stylesheets = ["_app/immutable/assets/0.CnSvPRNh.css"];
export const fonts = [];
