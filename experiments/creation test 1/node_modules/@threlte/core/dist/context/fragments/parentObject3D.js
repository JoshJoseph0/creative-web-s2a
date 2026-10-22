import { getContext, setContext } from 'svelte';
import { runeToCurrentReadable } from '../../utilities/currentWritable.js';
const parentObject3DContextKey = Symbol('threlte-parent-object3d-context');
/**
 * The parentObject3D context is used to access the parent `THREE.Object3D`
 * created by a `<T>` component. The context is automatically merged with the
 * parentObject3D context of the parent component when the local context store
 * is `undefined`.
 */
export const createParentObject3DContext = (object) => {
    const parentObject3D = getContext(parentObject3DContextKey);
    const context = {
        get current() {
            return object() ?? parentObject3D.current;
        }
    };
    setContext(parentObject3DContextKey, context);
    return context;
};
/**
 * The parentObject3D context is used to access the parent `THREE.Object3D`
 * created by a `<T>` component.
 *
 * @example
 * ```svelte
 * <T.Mesh>
 *   <T.MeshStandardMaterial>
 *     <CustomComponent />
 *   </T.MeshStandardMaterial>
 * </T.Mesh>
 * ```
 *
 * The parentObject3D as retrieved inside the component `<CustomComponent>`
 * will be the mesh created by the `<T.Mesh>` component.
 */
export const useParentObject3D = () => {
    return getContext(parentObject3DContextKey);
};
export const createParentObject3DContext_deprecated = (parent) => {
    const getParent = typeof parent === 'function' ? parent : () => parent;
    return createParentObject3DContext(getParent);
};
export const useParentObject3D_deprecated = () => {
    const parent = useParentObject3D();
    return runeToCurrentReadable(() => parent.current);
};
