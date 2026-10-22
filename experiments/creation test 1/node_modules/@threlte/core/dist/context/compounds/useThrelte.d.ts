import type { WebGLRenderer } from 'three';
import { type CameraContext } from '../fragments/camera.svelte.js';
import { type DOMContext } from '../fragments/dom.svelte.js';
import { type Renderer, type RendererContext } from '../fragments/renderer.svelte.js';
import { type SceneContext } from '../fragments/scene.js';
import { type SchedulerContext } from '../fragments/scheduler.svelte.js';
/**
 * ### `ThrelteContext`
 *
 * This is the main context of a Threlte application.
 * It's exposed to the user via the hook `useThrelte`.
 */
export interface ThrelteContext<T extends Renderer> extends Omit<CameraContext, 'manual' | 'makeDefaultCameras' | 'makeDefaultCameraManual'>, Omit<DOMContext, 'shouldUpdateSize'>, RendererContext<T>, SceneContext, Omit<SchedulerContext, 'frameInvalidated' | 'autoInvalidations' | 'resetFrameInvalidation'> {
}
/**
 * ### `useThrelte`
 *
 * This hook provides access to the main context of a Threlte application.
 *
 * ```svelte
 * <script>
 *   import { useThrelte } from 'threlte'
 *   const { camera } = useThrelte()
 *
 *   // Access the camera
 *   console.log(camera.current) // => PerspectiveCamera { … }
 * </script>
 * ```
 */
export declare const useThrelte: <T extends Renderer = WebGLRenderer>() => ThrelteContext<T>;
