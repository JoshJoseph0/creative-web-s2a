import type { Key } from './DAG.js';
import type { Stage } from './Stage.js';
export type TaskCallback = (delta: number) => void;
export declare class Task {
    readonly key: Key;
    readonly stage: Stage;
    private callback;
    private runTask;
    stop(): void;
    start(): void;
    constructor(stage: Stage, key: Key, callback: (delta: number) => void);
    run(delta: number): void;
}
