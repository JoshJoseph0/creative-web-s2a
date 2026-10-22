import { createCacheContext } from './fragments/cache.js';
import { createCameraContext } from './fragments/camera.svelte.js';
import { createDisposalContext } from './fragments/disposal.svelte.js';
import { createDOMContext } from './fragments/dom.svelte.js';
import { createParentContext } from './fragments/parent.js';
import { createParentObject3DContext } from './fragments/parentObject3D.js';
import { createRendererContext } from './fragments/renderer.svelte.js';
import { createSceneContext } from './fragments/scene.js';
import { createSchedulerContext } from './fragments/scheduler.svelte.js';
import { createUserContext } from './fragments/user.js';
export const createThrelteContext = (options) => {
    const { scene } = createSceneContext();
    const opts = typeof options === 'function' ? options : () => options;
    return {
        scene,
        ...createDOMContext(opts),
        ...createCacheContext(),
        ...createParentContext(() => scene),
        ...createParentObject3DContext(() => scene),
        ...createDisposalContext(),
        ...createSchedulerContext(opts),
        ...createCameraContext(),
        ...createRendererContext(opts),
        ...createUserContext()
    };
};
