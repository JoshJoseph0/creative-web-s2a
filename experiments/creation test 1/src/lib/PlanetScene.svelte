<script>
  import { T, useTask } from '@threlte/core';

  let planet = $state.raw();

  // Animation hooks need the context provided by the parent Canvas.
  useTask((delta) => {
    if (planet) {
      planet.rotation.y += delta * 0.22;
    }
  });
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 4.5]} />
<T.AmbientLight intensity={0.8} />
<T.PointLight position={[3, 3, 4]} intensity={22} />
<T.Mesh bind:ref={planet}>
  <T.SphereGeometry args={[1.15, 48, 48]} />
  <T.MeshStandardMaterial color="#76b7ff" roughness={0.42} metalness={0.12} />
</T.Mesh>
