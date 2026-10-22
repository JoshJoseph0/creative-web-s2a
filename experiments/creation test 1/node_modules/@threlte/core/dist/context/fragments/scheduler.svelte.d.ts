import { type CurrentWritable } from '../../utilities/currentWritable.js';
import { Scheduler, type Stage } from '../../frame-scheduling/index.js';
export type SchedulerContext = {
    /** The scheduler used by this Threlte app */
    scheduler: Scheduler;
    /**
     * If set to 'on-demand', the scene will only be rendered when the current frame is invalidated
     * If set to 'manual', the scene will only be rendered when advance() is called
     * If set to 'always', the scene will be rendered every frame
     *
     * @default 'on-demand'
     */
    renderMode: CurrentWritable<'always' | 'on-demand' | 'manual'>;
    /**
     * By default, Threlte will automatically render the scene. To implement
     * custom render pipelines, set this to `false`.
     *
     * @default true
     */
    autoRender: CurrentWritable<boolean>;
    /** A flag to indicate whether the current frame has been invalidated */
    frameInvalidated: {
        current: boolean;
    };
    /** If anything is in this set, the frame will be considered invalidated */
    autoInvalidations: Set<unknown>;
    /**
     * Function to determine if a rendering should happen according to on-demand
     * rendering. The value of this function is valid for the duration of the
     * current frame.
     */
    shouldRender: () => boolean;
    /**
     * Invalidates the current frame when renderMode === 'on-demand'
     */
    invalidate: () => void;
    /** The stage which useTask defaults to */
    mainStage: Stage;
    /**
     * The default render stage. Tasks in this stage are ran according to
     * on-demand rendering.
     */
    renderStage: Stage;
    /**
     * @deprecated Use invalidate()
     */
    advance: () => void;
    /**
     * @deprecated Use frameInvalidated.current = false
     */
    resetFrameInvalidation: () => void;
};
export type CreateSchedulerContextOptions = {
    autoRender?: boolean;
    renderMode?: 'always' | 'on-demand' | 'manual';
};
export declare const createSchedulerContext: (options: () => CreateSchedulerContextOptions) => SchedulerContext;
export declare const useScheduler: () => SchedulerContext;
