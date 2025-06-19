import { sharpeRatio } from "./compare";

// Jest tests
describe('sharpeRatio', () => {
  test('calculates Sharpe ratio correctly for positive returns', () => {
    const returns = [0.05, 0.03, 0.08, 0.02, 0.06];
    const riskFreeRate = 0.02;
    const expectedSharpeRatio = 1.265289766717061;
    expect(sharpeRatio(returns, riskFreeRate)).toBeCloseTo(expectedSharpeRatio);
  });

  test('calculates Sharpe ratio correctly for negative returns', () => {
    const returns = [-0.02, -0.03, -0.01, -0.04, -0.02];
    const riskFreeRate = 0.02;
    const expectedSharpeRatio = -3.5355339059327378;
    expect(sharpeRatio(returns, riskFreeRate)).toBeCloseTo(expectedSharpeRatio);
  });
});
