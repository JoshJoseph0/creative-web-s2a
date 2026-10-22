import { SphereGeometry } from 'three';
import FastNoiseLite from 'fastnoise-lite';

export function createPlanetGeometry({
  radius,
  segments,
  mountainHeight = 0,
  valleyDepth = 0,
  noiseSeed = 1337,
  noiseFrequency = 2
}) {
  const geometry = new SphereGeometry(radius, segments, segments);
  const positions = geometry.attributes.position;
  const noise = new FastNoiseLite(noiseSeed);
  noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
  noise.SetFrequency(noiseFrequency);

  const height = Math.max(0, mountainHeight);
  // Keep valleys from cutting through the centre of the planet.
  const depth = Math.min(Math.max(0, valleyDepth), radius * 0.95);

  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index);
    const y = positions.getY(index);
    const z = positions.getZ(index);
    const length = Math.hypot(x, y, z);
    if (length === 0) continue;

    // Sample in 3D on the unit sphere so the terrain wraps around the planet.
    const value = Math.max(-1, Math.min(1, noise.GetNoise(x / length, y / length, z / length)));
    const displacement = value * (value >= 0 ? height : depth);
    const scale = (radius + displacement) / length;
    positions.setXYZ(index, x * scale, y * scale, z * scale);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();
  return geometry;
}
