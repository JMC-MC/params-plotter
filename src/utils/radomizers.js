// Functions for picking random numbers
export function IntFromInterval(min, max) {
  // min and max included
  return Math.random() * (max - 1 - min + 1) + min;
}
