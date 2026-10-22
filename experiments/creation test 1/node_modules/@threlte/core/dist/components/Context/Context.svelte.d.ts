import type { Snippet } from 'svelte';
import { type CreateThrelteContextOptions } from '../../context/createThrelteContext.svelte.js';
import type { Renderer } from '../../context/fragments/renderer.svelte.js';
type $$ComponentProps = CreateThrelteContextOptions<Renderer> & {
    children: Snippet;
};
declare const Context: import("svelte").Component<$$ComponentProps, {}, "">;
type Context = ReturnType<typeof Context>;
export default Context;
