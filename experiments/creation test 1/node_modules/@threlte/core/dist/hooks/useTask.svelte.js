import { readable, toStore } from 'svelte/store';
import { useScheduler } from '../context/fragments/scheduler.svelte.js';
import { DAG } from '../frame-scheduling/index.js';
import { browser } from '../utilities/browser.js';
export function useTask(keyOrFn, fnOrOptions, options) {
    if (!browser) {
        return {
            task: undefined,
            start: () => undefined,
            stop: () => undefined,
            started: readable(false)
        };
    }
    let key;
    let fn;
    let opts;
    if (DAG.isKey(keyOrFn)) {
        key = keyOrFn;
        fn = fnOrOptions;
        opts = options;
    }
    else {
        key = Symbol('useTask');
        fn = keyOrFn;
        opts = fnOrOptions;
    }
    const schedulerCtx = useScheduler();
    const autoInvalidate = opts?.autoInvalidate ?? true;
    let stage = schedulerCtx.mainStage;
    let running = $derived(opts?.running?.() ?? opts?.autoStart ?? true);
    if (opts) {
        if (opts.stage) {
            if (DAG.isValue(opts.stage)) {
                stage = opts.stage;
            }
            else {
                const maybeStage = schedulerCtx.scheduler.getStage(opts.stage);
                if (!maybeStage) {
                    throw new Error(`No stage found with key ${opts.stage.toString()}`);
                }
                stage = maybeStage;
            }
        }
        else if (opts.after) {
            if (Array.isArray(opts.after)) {
                for (let index = 0; index < opts.after.length; index++) {
                    const element = opts.after[index];
                    if (DAG.isValue(element)) {
                        stage = element.stage;
                        break;
                    }
                }
            }
            else if (DAG.isValue(opts.after)) {
                stage = opts.after.stage;
            }
        }
        else if (opts.before) {
            if (Array.isArray(opts.before)) {
                for (let index = 0; index < opts.before.length; index++) {
                    const element = opts.before[index];
                    if (DAG.isValue(element)) {
                        stage = element.stage;
                        break;
                    }
                }
            }
            else if (DAG.isValue(opts.before)) {
                stage = opts.before.stage;
            }
        }
    }
    const task = stage.createTask(key, fn, opts);
    $effect.pre(() => {
        if (running) {
            task.start();
            if (autoInvalidate) {
                schedulerCtx.autoInvalidations.add(fn);
            }
        }
        else {
            task.stop();
            if (autoInvalidate) {
                schedulerCtx.autoInvalidations.delete(fn);
            }
        }
    });
    $effect.pre(() => {
        return () => {
            stage.removeTask(key);
            if (autoInvalidate) {
                schedulerCtx.autoInvalidations.delete(fn);
            }
        };
    });
    return {
        task,
        start: () => {
            running = true;
        },
        stop: () => {
            running = false;
        },
        started: toStore(() => running)
    };
}
