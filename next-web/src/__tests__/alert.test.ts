import { shouldAlert } from "../lib/alert";

describe("shouldAlert", () => {
  test("triggers when move exceeds threshold", () => {
    expect(shouldAlert(1.1000, 1.1015, 1.2)).toBe(true);  // 15 pips
  });

  test("does not trigger when move is small", () => {
    expect(shouldAlert(1.1000, 1.1008, 12)).toBe(false); // 8 pips
  });
});