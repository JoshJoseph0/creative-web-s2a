import type { TProps } from './types.js';
declare function $$render<Type>(): {
    props: TProps<Type>;
    exports: {};
    bindings: "ref";
    slots: {};
    events: {};
};
declare class __sveltets_Render<Type> {
    props(): ReturnType<typeof $$render<Type>>['props'];
    events(): ReturnType<typeof $$render<Type>>['events'];
    slots(): ReturnType<typeof $$render<Type>>['slots'];
    bindings(): "ref";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <Type>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<Type>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<Type>['props']>, ReturnType<__sveltets_Render<Type>['events']>, ReturnType<__sveltets_Render<Type>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<Type>['bindings']>;
    } & ReturnType<__sveltets_Render<Type>['exports']>;
    <Type>(internal: unknown, props: ReturnType<__sveltets_Render<Type>['props']> & {}): ReturnType<__sveltets_Render<Type>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const T: $$IsomorphicComponent;
type T<Type> = InstanceType<typeof T<Type>>;
export default T;
