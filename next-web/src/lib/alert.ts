/**
 * Returns true when the absolute price move exceeds `thresholdPips`.
 * Example: prev 1.10000 → curr 1.10150  ==> diff = 15 pips.
 */
export function shouldAlert(
  prev: number,
  curr: number,
  thresholdPips = 1.2
): boolean {
  const diffPips = Math.abs(curr - prev) * 10_000;   // price → pips
  return diffPips > thresholdPips;
}
export function formatAlertMessage(
  prev: number,
  curr: number,
  symbol = "EUR/USD"
): string {
  const diffPips = Math.abs(curr - prev) * 10_000;   // price → pips
  const direction = curr > prev ? "↑" : "↓";
  return `${symbol} ${direction} ${curr.toFixed(5)} (${diffPips.toFixed(2)} pips)`;
}