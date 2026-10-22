import { getContext, setContext } from 'svelte';
import { useDisposal } from '../../../context/fragments/disposal.svelte.js';
const contextName = Symbol('threlte-disposable-object-context');
/**
 * Checks if the given object is a disposable object. Scenes are not disposable.
 * @param object - The object to check.
 * @returns True if the object is a disposable object, false otherwise.
 */
export const isDisposableObject = (object) => {
    return typeof object?.dispose === 'function';
};
export const useDispose = (object, dispose) => {
    const { disposableObjectMounted, disposableObjectUnmounted, removeObjectFromDisposal } = useDisposal();
    const parentDispose = getContext(contextName);
    // We merge the local dispose with the parent dispose. If the parent dispose
    // is not set, we use true as default.
    const mergedDispose = $derived.by(() => {
        // An explicit local dispose value takes precedence over the parent.
        const local = dispose();
        if (local !== undefined)
            return local !== false;
        if (parentDispose?.() === false)
            return false;
        return true;
    });
    setContext(contextName, () => mergedDispose);
    const mountedObjects = new Set();
    // Track objects as `is` changes — mount new ones, but never unmount here.
    // Disposal only happens when the component itself unmounts.
    $effect(() => {
        const disposable = object();
        if (!isDisposableObject(disposable))
            return;
        if (mergedDispose) {
            disposableObjectMounted(disposable);
            mountedObjects.add(disposable);
        }
        else {
            removeObjectFromDisposal(disposable);
            mountedObjects.delete(disposable);
        }
    });
    // Unmount all tracked objects on component destroy
    $effect(() => {
        return () => {
            for (const obj of mountedObjects) {
                disposableObjectUnmounted(obj);
            }
            mountedObjects.clear();
        };
    });
};
