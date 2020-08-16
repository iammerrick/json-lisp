import { evaluate } from "../index";
describe("Chapter 1: Building Abstractions with Procedures", () => {
  describe("Exercise 1.1", () => {
    it("should return the expected values", () => {
      const add = (...args) => args.reduce((x, y) => x + y);
      const subtract = (...args) =>
        (args.length === 1 ? [0, args[0]] : args).reduce((x, y) => x - y);

      const division = (...args) =>
        (args.length === 1 ? [1, args[0]] : args).reduce((x, y) => x / y);

      const multiplication = (...args) => args.reduce((x, y) => x * y, 1);
      const modulus = (...args) => args.reduce((x, y) => x % y);
      const defaultEnvironment = {
        "+": add,
        "-": subtract,
        "/": division,
        "*": multiplication,
        "%": modulus,
      };
      expect(evaluate(10, defaultEnvironment)).toEqual(10);
      expect(evaluate(["+", 5, 3, 4], defaultEnvironment)).toEqual(12);
      expect(evaluate(["-", 9, 1], defaultEnvironment)).toEqual(8);
      expect(evaluate(["/", 6, 2], defaultEnvironment)).toEqual(3);
      expect(evaluate(["%", 10, 3], defaultEnvironment)).toEqual(1);
      expect(
        evaluate(["+", ["*", 2, 4], ["-", 4, 6]], defaultEnvironment)
      ).toEqual(6);
      expect(
        evaluate(["+", ["*", 2, 4], ["-", 4, 6]], defaultEnvironment)
      ).toEqual(6);

      // Definitions
    });
  });
});
