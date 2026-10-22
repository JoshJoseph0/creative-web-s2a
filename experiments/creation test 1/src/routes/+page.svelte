<script>
  import { Canvas } from '@threlte/core';
  import PlanetScene from '../lib/PlanetScene.svelte';
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
      <PlanetScene />
    </Canvas>
    <p class="scene-caption">A small rotating planet, rendered in real time</p>
  </section>

  <footer>
    <span>Made with SvelteKit</span>
    <span>Three.js · Threlte</span>
  </footer>
</main>
