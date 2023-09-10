import { describe, expect, test } from "@jest/globals";
import { getClothing } from "../../../src/components/Weather/weather-utils";

describe("getClothing", () => {
  test("returns coat when temperature is below 10", () => {
    expect(getClothing(9)).toBe("coat");
  });

  test("returns hoody when temperature is between 10 and 17", () => {
    expect(getClothing(16)).toBe("hoody");
  });

  test("returns tshirt when temperature is above 17", () => {
    expect(getClothing(18)).toBe("tshirt");
  });
});

describe("getIcon", () => {
  test("returns coat when temperature is below 10", () => {
    expect(getClothing(9)).toBe("coat");
  });

  test("returns hoody when temperature is between 10 and 17", () => {
    expect(getClothing(16)).toBe("hoody");
  });

  test("returns tshirt when temperature is above 17", () => {
    expect(getClothing(18)).toBe("tshirt");
  });
});
