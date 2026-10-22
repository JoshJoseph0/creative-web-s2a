import { getContext, setContext } from 'svelte';
import { runeToCurrentReadable } from '../../utilities/currentWritable.js';
const parentContextKey = Symbol('threlte-parent-context');
/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 */
export const createParentContext = (parent) => {
    const context = {
        get current() {
            return parent();
        }
    };
    setContext(parentContextKey, context);
    return context;
};
/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 *
 * @example
 * ```svelte
 * <T.Mesh>
 *   <CustomComponent />
 * </T.Mesh>
 * ```
 *
 * The parent as retrieved inside the component `<CustomComponent>`
 * will be the mesh created by the `<T.Mesh>` component.
 */
export const useParent = () => {
    return getContext(parentContextKey);
};
export const createParentContext_deprecated = (parent) => {
    const getParent = typeof parent === 'function' ? parent : () => parent;
    return createParentContext(getParent);
};
export const useParent_deprecated = () => {
    const parent = useParent();
    return runeToCurrentReadable(() => parent.current);
};
