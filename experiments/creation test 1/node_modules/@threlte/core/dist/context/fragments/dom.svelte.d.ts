import { type CurrentReadable } from '../../utilities/currentWritable.js';
export interface DOMContext {
    /** The canvas wrapper element */
    dom: HTMLElement;
    canvas: HTMLCanvasElement;
    size: CurrentReadable<{
        width: number;
        height: number;
    }>;
    shouldUpdateSize: () => boolean;
}
export type CreateDOMContextOptions = {
    dom: HTMLElement;
    canvas: HTMLCanvasElement;
};
export declare const createDOMContext: (options: CreateDOMContextOptions | (() => CreateDOMContextOptions)) => DOMContext;
export declare const useDOM: () => DOMContext;
