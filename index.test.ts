import { evaluate } from "./index";

describe("json-lisp", () => {
  it("should return the evaluated operator", () => {
    const add = (x, y) => x + y;
    expect(
      evaluate([["+"]], {
        "+": add,
      })
    ).toEqual(add);
  });

  it("should return the evaluated result", () => {
    expect(evaluate(["+", 1, 1])).toEqual(2);
  });

  it("should support nested evaluation", () => {
    expect(evaluate(["+", 1, ["+", 2, 3]])).toEqual(6);
  });

  it("should return the evaluated result", () => {
    expect(evaluate(["%", 10, 3])).toEqual(1);
  });

  it("should support nested evaluation", () => {
    expect(evaluate(["%", 10, ["+", 2, 1]])).toEqual(1);
  });

  it("should support case analysis with cond", () => {
    expect(evaluate(["cond", [true, 1], [false, 0]])).toEqual(1);
    expect(evaluate(["cond", [false, 1], [false, 0], [true, 3]])).toEqual(3);
  });

  it("should support else clause", () => {
    expect(evaluate(["cond", [false, 1], [false, 0], ["else", 4]])).toEqual(4);
  });

  it("should support case analysis with if", () => {
    expect(evaluate(["if", true, ["+", 1, 1]])).toEqual(2);
  });

  it("should support reading the alternative", () => {
    expect(evaluate(["if", false, 1, ["+", 1, 2]])).toEqual(3);
    expect(evaluate(["if", false, 1])).toEqual(null);
  });

  it("should support and logical combination", () => {
    expect(evaluate(["if", ["and", true, true], 2])).toEqual(2);
    expect(evaluate(["if", ["and", true, false], 2, 1])).toEqual(1);
  });

  it("should support or logical combination", () => {
    expect(evaluate(["if", ["or", false, true], 2])).toEqual(2);
    expect(evaluate(["if", ["or", true, false], 2, 1])).toEqual(2);
    expect(evaluate(["if", ["or", false, false], 2, 1])).toEqual(1);
  });
  it("should support not negation", () => {
    expect(evaluate(["if", ["not", false], 2])).toEqual(2);
    expect(evaluate(["if", ["not", true], 2, 1])).toEqual(1);
  });

  describe("built in environment", () => {
    it("should support addition", () => {
      expect(evaluate(["+", 2, 5, 1, 2])).toEqual(10);
    });

    it("should support subtraction", () => {
      expect(evaluate(["-", 5, 2, 1])).toEqual(2);
    });

    it("should support using subtraction to indicate negative numbers", () => {
      expect(evaluate(["-", 5])).toEqual(-5);
    });

    it("should support using division", () => {
      expect(evaluate(["/", 2, 2])).toEqual(1);
      expect(evaluate(["/", 2, 2, 2])).toEqual(0.5);
      expect(evaluate(["/", ["/", 2, 2], 2])).toEqual(0.5);
    });

    it("should support division by 1 by default", () => {
      expect(evaluate(["/", 2])).toEqual(0.5);
    });

    it("should support multiplication", () => {
      expect(evaluate(["*", 2, 2])).toEqual(4);
    });

    it("should support multiplication by 1 implicitly", () => {
      expect(evaluate(["*", 2])).toEqual(2);
    });
  });
});
