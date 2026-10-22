<script>
  import { Canvas, T, useTask } from '@threlte/core';

  let planet;

  useTask((delta) => {
    if (planet) {
      planet.rotation.y += delta * 0.22;
    }
  });
</script>

<svelte:head>
  <title>Creation Test 1 — Threlte Playground</title>
  <meta
    name="description"
    content="A SvelteKit and Threlte playground for creating 3D scenes with Three.js."
  />
</svelte:head>

<main>
  <section class="intro">
    <p class="eyebrow">EXPERIMENT 01 · 3D PLAYGROUND</p>
    <h1>Creation Test 1</h1>
    <p class="description">
      A first look at building a little world with SvelteKit, Threlte and Three.js.
    </p>
  </section>

  <section class="scene" aria-label="A rotating 3D planet">
    <Canvas>
      <T.PerspectiveCamera makeDefault position={[0, 0, 4.5]} />
      <T.AmbientLight intensity={0.8} />
      <T.PointLight position={[3, 3, 4]} intensity={22} />
      <T.Mesh bind:ref={planet}>
        <T.SphereGeometry args={[1.15, 48, 48]} />
        <T.MeshStandardMaterial color="#76b7ff" roughness={0.42} metalness={0.12} />
      </T.Mesh>
    </Canvas>
    <p class="scene-caption">A small rotating planet, rendered in real time</p>
  </section>

  <footer>
    <span>Made with SvelteKit</span>
    <span>Three.js · Threlte</span>
  </footer>
</main>
