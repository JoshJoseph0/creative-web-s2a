import { type Readable } from 'svelte/store';
type Dependency = Readable<any> | any;
type Dependencies = [Dependency, ...Array<Dependency>];
type ExtractReadableType<T> = T extends Readable<infer U> ? U : T;
type CallbackArgs<D extends Dependencies> = {
    [K in keyof D]: ExtractReadableType<D[K]>;
};
type Callback<D extends Dependencies> = (deps: CallbackArgs<D>) => void | (() => void);
/**
 * ### `observe`
 *
 * Observe multiple stores and reactive values and call a callback when they
 * change to trigger side effects. The callback can return a cleanup function
 * that will be called when the dependencies change again or when the effect
 * root (most likely a component) is destroyed. Under the hood, `observe` uses
 * Svelte's `$effect` to track dependencies and trigger the callback. For a
 * version that uses `$effect.pre`, use `observe.pre`.
 *
 * ```ts
 * const count = writable(0)
 * let name = $state('John')
 *
 * observe(() => [count, name], ([count, name]) => {
 *  console.log(count, name) // 0 John
 * })
 * ```
 *
 * The callback can return a cleanup function that will be called when the
 * dependencies change again or when the component is destroyed.
 *
 * ```ts
 * const count = writable(0)
 *
 * observe(() => [count], ([count]) => {
 *  console.log(count) // 0
 *  return () => {
 *    console.log('cleanup')
 *  }
 * })
 * ```
 *
 * @param dependencies - A function that returns an array of dependencies.
 * @param callback - A function that will be called with the current values of
 * the dependencies. The callback can return a cleanup function that will be
 * called when the dependencies change again or when the component is destroyed.
 */
export declare const observe: (<Deps extends Dependencies>(dependencies: () => Deps, callback: Callback<Deps>) => void) & {
    pre: <Deps extends Dependencies>(dependencies: () => Deps, callback: Callback<Deps>) => void;
};
export {};
