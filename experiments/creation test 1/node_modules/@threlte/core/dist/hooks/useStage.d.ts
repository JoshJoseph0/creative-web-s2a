import type { CreateStageOptions, Key } from '../frame-scheduling/index.js';
/**
 * Creates a stage and returns it. If the stage already exists, it is returned.
 *
 * @param key The key of the stage.
 * @param options Options for creating the stage.
 */
export declare function useStage(key: Key, options?: CreateStageOptions): import("../frame-scheduling/Stage.js").Stage;
