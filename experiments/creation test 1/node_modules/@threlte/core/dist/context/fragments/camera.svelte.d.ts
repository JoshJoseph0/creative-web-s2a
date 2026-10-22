import { type Camera } from 'three';
import { type CurrentWritable } from '../../utilities/currentWritable.js';
import { SvelteSet } from 'svelte/reactivity';
export interface CameraContext {
    camera: CurrentWritable<Camera>;
    makeDefaultCameras: SvelteSet<Camera>;
    makeDefaultCameraManual: WeakMap<Camera, boolean>;
    manual: {
        current: boolean;
        set(value: boolean): void;
    };
}
export declare const createCameraContext: () => CameraContext;
export declare const useCamera: () => CameraContext;
