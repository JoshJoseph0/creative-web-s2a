import type { Object3D } from 'three';
interface ParentObject3DContext {
    current: Object3D;
}
/**
 * The parentObject3D context is used to access the parent `THREE.Object3D`
 * created by a `<T>` component. The context is automatically merged with the
 * parentObject3D context of the parent component when the local context store
 * is `undefined`.
 */
export declare const createParentObject3DContext: (object: () => Object3D | undefined) => {
    readonly current: Object3D<import("three").Object3DEventMap>;
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
export declare const useParentObject3D: () => ParentObject3DContext;
/*********************************/
/** Will be removed in Threlte 9 */
/*********************************/
type MaybeParentObject3DGetter = Object3D | undefined | (() => Object3D | undefined);
export declare const createParentObject3DContext_deprecated: (parent: MaybeParentObject3DGetter) => {
    readonly current: Object3D<import("three").Object3DEventMap>;
};
export declare const useParentObject3D_deprecated: () => import("../../utilities/currentWritable.js").CurrentReadable<Object3D<import("three").Object3DEventMap>>;
export {};
