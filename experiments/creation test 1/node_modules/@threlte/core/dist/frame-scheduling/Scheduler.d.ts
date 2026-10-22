import { DAG, type AddNodeOptions, type Key } from './DAG.js';
import { Stage } from './Stage.js';
export type Schedule = ReturnType<Scheduler['getSchedule']>;
export type CreateStageOptions = {
    callback?: (delta: number, runTasks: (deltaOverride?: number) => void) => void;
} & AddNodeOptions<Stage>;
/**
 * A Scheduler is responsible for running stages. It runs the stages in a
 * requestAnimationFrame stage.
 */
export declare class Scheduler extends DAG<Stage> {
    /**
     * Initialized to 0 rather than performance.now() so the first frame's delta is
     * deterministic (clamped to clampDeltaTo). Using performance.now() would make
     * the first delta depend on the gap between construction and first tick, which
     * varies with page load time and can produce inconsistent initial state.
     */
    private lastTime;
    private clampDeltaTo;
    get stages(): Stage[];
    constructor(options?: {
        clampDeltaTo?: number;
    });
    createStage(key: Key, options?: CreateStageOptions): Stage;
    getStage(key: Key): Stage | undefined;
    removeStage: (key: Key | Stage) => void;
    /**
     * Runs all the stages in the scheduler.
     *
     * @param time The time in milliseconds since the start of the program.
     */
    run(time: number): void;
    runWithTiming(time: number): {
        total: number;
        stages: {
            [key: string]: {
                duration: number;
                tasks: Record<Key, number>;
            };
        };
    };
    getSchedule(include?: {
        tasks?: boolean;
    }): {
        stages: {
            tasks: string[] | undefined;
            key: string;
        }[];
    };
    dispose(): void;
}
