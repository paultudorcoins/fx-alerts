import { sharpeRatio } from "../lib/compare";

describe("sharpeRatio", () => {
  test("calculates Sharpe ratio correctly for positive returns", () => {
    const returns = [0.05, 0.03, 0.08, 0.02, 0.06];
    const riskFreeRate = 0.02;
    const expected = 1.1727909432167476;   // ← updated
    expect(sharpeRatio(returns, riskFreeRate)).toBeCloseTo(expected, 1);
  });

  test("calculates Sharpe ratio correctly for negative returns", () => {
    const returns = [-0.02, -0.03, -0.01, -0.04, -0.02];
    const riskFreeRate = 0.02;
    const expected = -3.8590552849509288;  // ← updated
    expect(sharpeRatio(returns, riskFreeRate)).toBeCloseTo(expected, 1);
  });
});