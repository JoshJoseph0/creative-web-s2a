import { getContext, setContext } from 'svelte';
export const createDisposalContext = () => {
    const disposableObjects = new Map();
    const context = {
        disposableObjects,
        removeObjectFromDisposal: (object) => {
            disposableObjects.delete(object);
        },
        disposableObjectMounted: (object) => {
            const currentValue = disposableObjects.get(object);
            if (currentValue) {
                disposableObjects.set(object, currentValue + 1);
            }
            else {
                disposableObjects.set(object, 1);
            }
        },
        disposableObjectUnmounted: (object) => {
            const currentValue = disposableObjects.get(object);
            if (currentValue && currentValue > 0) {
                disposableObjects.set(object, currentValue - 1);
                if (currentValue - 1 <= 0) {
                    disposableObjects.delete(object);
                    object.dispose();
                }
            }
        }
    };
    $effect(() => {
        return () => {
            for (const [object] of disposableObjects) {
                object.dispose();
            }
            disposableObjects.clear();
        };
    });
    setContext('threlte-disposal-context', context);
    return context;
};
export const useDisposal = () => {
    const context = getContext('threlte-disposal-context');
    if (!context) {
        throw new Error('useDisposal can only be used in a child component to <Canvas>.');
    }
    return context;
};
