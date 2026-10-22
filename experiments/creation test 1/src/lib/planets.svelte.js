// Edit these values to change each planet. Add another object with a unique id
// to define another planet. This shared state also supports future UI controls.
export const planets = $state([
  {
    id: 'planet-1',
    name: 'Planet 1',
    position: [0, 0, 0], // [x, y, z]
    radius: 1.15,
    mountainHeight: 0.008, // Maximum outward displacement in scene units; 0 = no mountains.
    valleyDepth: 0.08, // Maximum inward displacement; 0 = no valleys.
    noiseSeed: 1337, // Change this number to generate a different surface.
    noiseFrequency: 2, // Higher values create smaller, more tightly packed features.
    segments: 8, // Higher values make a smoother sphere.
    color: '#18314f',
    roughness: 4.42, // 0 = shiny, 1 = matte
    metalness: 0.12, // 0 = non-metal, 1 = metal
    rotationSpeed: 1, // Radians per second; 0 stops rotation.
    tilt: 0, // Radians around the z axis.
    visible: true
  }
]);
