import { getContext, setContext } from 'svelte';
import { runeToCurrentWritable } from '../../utilities/currentWritable.js';
import { Scheduler } from '../../frame-scheduling/index.js';
export const createSchedulerContext = (options) => {
    const scheduler = new Scheduler();
    const mainStage = scheduler.createStage(Symbol('threlte-main-stage'));
    const opts = $derived(options());
    const optsAutoRender = $derived(opts.autoRender);
    const optsRenderMode = $derived(opts.renderMode);
    let autoRender = $derived(optsAutoRender ?? true);
    let renderMode = $derived(optsRenderMode ?? 'on-demand');
    const autoInvalidations = new Set();
    let frameInvalidated = true;
    const shouldRender = () => {
        return (renderMode === 'always' ||
            (renderMode === 'on-demand' && (frameInvalidated || autoInvalidations.size > 0)) ||
            (renderMode === 'manual' && frameInvalidated));
    };
    const context = {
        scheduler,
        autoInvalidations,
        frameInvalidated: {
            get current() {
                return frameInvalidated;
            },
            set current(value) {
                frameInvalidated = value;
            }
        },
        advance: () => {
            frameInvalidated = true;
        },
        autoRender: runeToCurrentWritable(() => autoRender, (value) => (autoRender = value)),
        renderMode: runeToCurrentWritable(() => renderMode, (value) => (renderMode = value)),
        invalidate() {
            frameInvalidated = true;
        },
        mainStage,
        shouldRender,
        renderStage: scheduler.createStage(Symbol('threlte-render-stage'), {
            after: mainStage,
            callback(_, runTasks) {
                if (context.shouldRender())
                    runTasks();
            }
        }),
        resetFrameInvalidation() {
            frameInvalidated = false;
        }
    };
    $effect(() => {
        return () => {
            scheduler.dispose();
        };
    });
    setContext('threlte-scheduler-context', context);
    return context;
};
export const useScheduler = () => {
    const context = getContext('threlte-scheduler-context');
    if (!context) {
        throw new Error('useScheduler can only be used in a child component to <Canvas>.');
    }
    return context;
};
