import { getContext, setContext } from 'svelte';
import { runeToCurrentReadable } from '../../utilities/currentWritable.js';
import { useMeasure } from '../../utilities/useMeasure.svelte.js';
export const createDOMContext = (options) => {
    const opts = typeof options === 'function' ? options() : options;
    const { dom, canvas } = opts;
    const { size, shouldUpdateSize } = useMeasure(dom);
    const context = {
        dom,
        canvas,
        size: runeToCurrentReadable(() => size.current),
        shouldUpdateSize
    };
    setContext('threlte-dom-context', context);
    return context;
};
export const useDOM = () => {
    const context = getContext('threlte-dom-context');
    if (!context) {
        throw new Error('useDOM can only be used in a child component to <Canvas>.');
    }
    return context;
};
