export function generateColor(value: number): string {
  const baseHue = value ** 5 % 360; // Hue based on tile value
  const saturation = `${50 + (value % 5) * 15}%`; // Vary saturation
  const lightness = `${30 + (value % 4) * 10}%`; // Vary lightness

  return `hsl(${baseHue}, ${saturation}, ${lightness})`;
}
