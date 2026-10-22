import { type DisposableObject } from '../../../context/fragments/disposal.svelte.js';
import type { MaybeInstance } from '../types.js';
/**
 * Checks if the given object is a disposable object. Scenes are not disposable.
 * @param object - The object to check.
 * @returns True if the object is a disposable object, false otherwise.
 */
export declare const isDisposableObject: (object: unknown) => object is DisposableObject;
export declare const useDispose: <T>(object: () => MaybeInstance<T>, dispose: () => boolean | undefined) => void;
