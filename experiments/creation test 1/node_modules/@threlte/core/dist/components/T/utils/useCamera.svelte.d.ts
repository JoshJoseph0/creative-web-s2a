import type { OrthographicCamera, PerspectiveCamera } from 'three';
export declare const updateCamera: (camera: PerspectiveCamera | OrthographicCamera, width: number, height: number) => void;
export declare const useCamera: (camera: () => PerspectiveCamera | OrthographicCamera, manual: () => boolean, makeDefault: () => boolean, props: () => Record<string, unknown>) => void;
