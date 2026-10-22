export const VERSION = 8;
// canvas component
export { default as Canvas } from './Canvas.svelte';
// components (v6)
export { T, extend } from './components/T/T.js';
// plugins
export { injectPlugin } from './plugins/injectPlugin.js';
// hooks
export { useThrelte } from './context/compounds/useThrelte.js';
export { useStage } from './hooks/useStage.js';
export { useTask } from './hooks/useTask.svelte.js';
export { useThrelteUserContext } from './hooks/useThrelteUserContext.js';
// useLoader
export { useLoader } from './hooks/useLoader.js';
export { createThrelteContext } from './context/createThrelteContext.svelte.js';
export { createCacheContext, useCache } from './context/fragments/cache.js';
export { createCameraContext, useCamera } from './context/fragments/camera.svelte.js';
export { createDOMContext, useDOM } from './context/fragments/dom.svelte.js';
export { createDisposalContext, useDisposal } from './context/fragments/disposal.svelte.js';
export { createParentContext_deprecated as createParentContext, useParent_deprecated as useParent } from './context/fragments/parent.js';
export { createParentObject3DContext_deprecated as createParentObject3DContext, useParentObject3D_deprecated as useParentObject3D } from './context/fragments/parentObject3D.js';
export { createRendererContext, useRenderer } from './context/fragments/renderer.svelte.js';
export { createSceneContext, useScene } from './context/fragments/scene.js';
export { createSchedulerContext, useScheduler } from './context/fragments/scheduler.svelte.js';
export { createUserContext } from './context/fragments/user.js';
// utils
export { observe } from './utilities/observe.svelte.js';
export { isInstanceOf } from './utilities/isInstanceOf.js';
export { asyncWritable } from './utilities/asyncWritable.js';
export { revision } from './utilities/revision.js';
export { watch } from './utilities/watch.js';
export { currentWritable, toCurrentReadable } from './utilities/currentWritable.js';
export { resolvePropertyPath } from './utilities/resolvePropertyPath.js';
