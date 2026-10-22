import { WebGLRenderer, type ColorSpace, type ShadowMapType, type ToneMapping } from 'three';
import type { Task } from '../../frame-scheduling/index.js';
import { type CurrentReadable, type CurrentWritable } from '../../utilities/currentWritable.js';
import type { WebGPURenderer } from 'three/webgpu';
export type Renderer = WebGLRenderer | WebGPURenderer;
type CreateRenderer<T extends Renderer> = (canvas: HTMLCanvasElement) => T;
export interface RendererContext<T extends Renderer> {
    renderer: T;
    colorManagementEnabled: CurrentReadable<boolean>;
    colorSpace: CurrentWritable<ColorSpace>;
    toneMapping: CurrentWritable<ToneMapping>;
    shadows: CurrentWritable<boolean | ShadowMapType>;
    dpr: CurrentWritable<number>;
    autoRenderTask: Task;
}
export type CreateRendererContextOptions<T extends Renderer> = {
    createRenderer?: CreateRenderer<T>;
    /**
     * Colors supplied to three.js — from color pickers, textures, 3D models, and other sources —
     * each have an associated color space. Those not already in the Linear-sRGB working color
     * space must be converted, and textures be given the correct texture.colorSpace assignment.
     *
     * Set to true for certain conversions (for hexadecimal and CSS colors in sRGB) to be made automatically.
     *
     * This property is not reactive and must be enabled before initializing colors.
     *
     * @deprecated If you wish to set this to false, set THREE.ColorManagement.enabled = false
     *
     * @default true
     */
    colorManagementEnabled?: boolean;
    /**
     * @default 'srgb'
     */
    colorSpace?: ColorSpace;
    /**
     * @default AgXToneMapping
     */
    toneMapping?: ToneMapping;
    /**
     * @default PCFSoftShadowMap
     */
    shadows?: boolean | ShadowMapType;
    /**
     * The device pixel ratio used by the renderer.
     *
     * Pass a single number to set the pixel ratio explicitly. Pass a tuple
     * `[min, max]` to clamp `window.devicePixelRatio` between those bounds —
     * useful for capping render resolution on high-DPI displays while still
     * using the native ratio on lower-DPI ones.
     *
     * @default window.devicePixelRatio
     */
    dpr?: number | [min: number, max: number];
};
export declare const createRendererContext: <T extends Renderer>(options: () => CreateRendererContextOptions<T>) => RendererContext<T>;
export declare const useRenderer: <T extends Renderer>() => RendererContext<T>;
export {};
