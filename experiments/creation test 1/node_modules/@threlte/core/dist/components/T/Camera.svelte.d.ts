import type { OrthographicCamera, PerspectiveCamera } from 'three';
interface Props {
    ref: PerspectiveCamera | OrthographicCamera;
    manual?: boolean;
    makeDefault?: boolean;
}
declare const Camera: import("svelte").Component<Props, {}, "">;
type Camera = ReturnType<typeof Camera>;
export default Camera;
