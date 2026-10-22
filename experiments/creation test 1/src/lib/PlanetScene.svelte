<script>
  import { T } from '@threlte/core';
  import Planet from './Planet.svelte';
  import { planets } from './planets.svelte.js';

  // The live scene displays Planet 1 from the shared configuration.
  let activePlanet = $derived(planets.find((planet) => planet.id === 'planet-1'));
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 4.5]} />
<T.AmbientLight intensity={0.8} />
<T.PointLight position={[3, 3, 4]} intensity={22} />
{#if activePlanet}
  {#key activePlanet.id}
    <Planet config={activePlanet} />
  {/key}
{/if}
