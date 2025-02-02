import { describe, test } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { intersectionPoint, merge } from "../2019/day3/03_part1.js";

describe("It should give merged Object", () => {
  test("should give a and b as keys", () => {
    const [input1, input2] = [
      { a: 4, b: 5 },
      { a: 5, b: 1 },
    ];
    const expected = { a: 9, b: 6 };
    assertEquals(merge(input1, input2), expected);
  });

  test("should merge keys in expected", () => {
    const [input1, input2] = [{ a: 5 }, { b: 7 }];
    const expected = { a: 5, b: 7 };
    assertEquals(merge(input1, input2), expected);
  });
});

describe("intersectionPoint: ", () => {
  test(" should give shortest intersection path as 6", () => {
    const wire1 = ["U7", "D4", "R6", "L4"];
    const wire2 = ["R8", "U5", "L5", "D3"];
    assertEquals(intersectionPoint(wire1, wire2), 6);
  });

  test("should give 159 amongest all path", () => {
    const wire1 = [
      "R75",
      "D30",
      "R83",
      "U83",
      "L12",
      "D49",
      "R71",
      "U7",
      "L72",
    ];
    const wire2 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];

    assertEquals(intersectionPoint(wire1, wire2), 159);
  });
});
