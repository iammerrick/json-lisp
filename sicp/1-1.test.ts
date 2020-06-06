import { evaluate } from "../index";
describe("Chapter 1: Building Abstractions with Procedures", () => {
  describe("Exercise 1.1", () => {
    it("should return the expected values", () => {
      expect(evaluate(10)).toEqual(10);
      expect(evaluate(["+", 5, 3, 4])).toEqual(12);
      expect(evaluate(["-", 9, 1])).toEqual(8);
      expect(evaluate(["/", 6, 2])).toEqual(3);
      expect(evaluate(["+", ["*", 2, 4], ["-", 4, 6]])).toEqual(6);
      expect(evaluate(["+", ["*", 2, 4], ["-", 4, 6]])).toEqual(6);

      // Definitions
    });
  });
});
