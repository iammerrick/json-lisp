type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [prop: string]: Json };

type Environment = { [name: string]: JSON | Function };

const add = (...args) => args.reduce((x, y) => x + y);
const subtract = (...args) =>
  (args.length === 1 ? [0, args[0]] : args).reduce((x, y) => x - y);

const division = (...args) =>
  (args.length === 1 ? [1, args[0]] : args).reduce((x, y) => x / y);

const multiplication = (...args) => args.reduce((x, y) => x * y, 1);

const defaultEnvironment = {
  "+": add,
  "-": subtract,
  "/": division,
  "*": multiplication,
};

export const evaluate = (
  expression: Json,
  environment: Environment = defaultEnvironment
) => {
  if (Array.isArray(expression)) {
    /**
     * Support Special Forms
     */
    switch (expression[0]) {
      case "cond": {
        const cases = expression.slice(1);

        for (let _case of cases) {
          const predicate = evaluate(_case[0], environment);
          if (predicate === true || predicate === "else") {
            return evaluate(_case[1], environment);
          }
        }
      }
      case "if": {
        const predicate = expression[1];
        if (evaluate(predicate, environment)) {
          return evaluate(expression[2], environment);
        } else {
          if (expression[3]) {
            return evaluate(expression[3], environment);
          } else {
            return null;
          }
        }
      }
      case "and": {
        const predicates = expression.slice(1);
        return predicates.every(
          (predicate) => evaluate(predicate, environment) === true
        );
      }
      case "or": {
        const predicates = expression.slice(1);
        return predicates.some(
          (predicate) => evaluate(predicate, environment) === true
        );
      }
      case "not": {
        return !(evaluate(expression[1], environment) === true);
      }
      default: {
        const result = expression.map((expression) =>
          evaluate(expression, environment)
        );

        if (result.length === 1) {
          return result[0];
        } else {
          const operator = result[0];
          return operator(...result.slice(1));
        }
      }
    }
  } else if (typeof expression === "object") {
    // What the?
  } else if (typeof expression === "boolean") {
    return expression;
  } else {
    if (environment.hasOwnProperty(expression)) {
      return environment[expression];
    }
    {
      return expression;
    }
  }
};
