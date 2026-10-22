import type { BaseProps, MaybeInstance } from '../types.js';
export declare const useAttach: <T extends MaybeInstance<any>>(ref: () => T, attach: () => BaseProps<T>["attach"]) => void;
