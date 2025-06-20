

export function sharpeRatio(returns: number[], riskFreeRate = 0.02): number {
  const n = returns.length;
  const mean = returns.reduce((a, b) => a + b) / n;
  const stdDev = Math.sqrt(
    returns.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1)
  );
  return (mean - riskFreeRate) / stdDev;
}

