interface ParentContext {
    current: unknown;
}
/**
 * The parent context is used to access the parent object created by a `<T>`
 * component.
 */
export declare const createParentContext: <T>(parent: () => T | undefined) => {
    readonly current: T | undefined;
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
export declare const useParent: () => ParentContext;
/*********************************/
/** Will be removed in Threlte 9 */
/*********************************/
type MaybeParentGetter<T> = T | undefined | (() => T | undefined);
export declare const createParentContext_deprecated: <T>(parent: MaybeParentGetter<T>) => {
    readonly current: T | undefined;
};
export declare const useParent_deprecated: () => import("../../utilities/currentWritable.js").CurrentReadable<unknown>;
export {};
