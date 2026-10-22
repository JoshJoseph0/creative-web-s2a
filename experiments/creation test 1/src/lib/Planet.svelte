<script>
  import { T, useTask } from '@threlte/core';
  import { createPlanetGeometry } from './planetGeometry.js';

  let { config } = $props();
  let mesh = $state.raw();
  let geometry = $derived(createPlanetGeometry(config));

  $effect(() => {
    const currentGeometry = geometry;
    return () => currentGeometry.dispose();
  });

  useTask((delta) => {
    if (mesh && config.visible) {
      mesh.rotation.y += delta * config.rotationSpeed;
    }
  });
</script>

<T.Group position={config.position} rotation.z={config.tilt} visible={config.visible}>
  <T.Mesh bind:ref={mesh} name={config.name} {geometry}>
    <T.MeshStandardMaterial
      color={config.color}
      roughness={config.roughness}
      metalness={config.metalness}
    />
  </T.Mesh>
</T.Group>
