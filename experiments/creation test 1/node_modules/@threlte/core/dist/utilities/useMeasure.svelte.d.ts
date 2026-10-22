/**
 * Tracks the rendered dimensions of an element using `ResizeObserver` and
 * `getBoundingClientRect`. Returns a reactive object whose `width` and
 * `height` always reflect the latest measured size.
 *
 * `getBoundingClientRect` is used (rather than `clientWidth/clientHeight` or
 * `ResizeObserver.contentRect`) because it accounts for CSS transforms on the
 * element and matches what most browser measurement code expects.
 *
 * ```ts
 * const measure = useMeasure(element)
 *
 * $effect(() => {
 *   console.log(measure.width, measure.height)
 * })
 * ```
 */
export declare const useMeasure: (element: HTMLElement) => {
    size: {
        readonly current: {
            width: number;
            height: number;
        };
    };
    shouldUpdateSize: () => boolean;
};
