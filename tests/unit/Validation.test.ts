import { IGroup } from "../../src/models/Group";
import { Validation } from "../../src/validation/Validation";

describe("isValidGroup", () => {
  it("throws an error if errorsRef is not an empty string array", () => {
    const errors: string[] = ["data", "data"];
    const group: IGroup = { id: 1, name: "group" };
    expect(() => {
      Validation.isValidGroup(group, errors);
    }).toThrow(
      new Error(
        "errorsRef parameter must be passed in as an empty string array"
      )
    );
  });
  it("returns true with an empty errorsRef array", () => {
    const errors: string[] = [];
    const group: IGroup = { id: 1, name: "group" };
    expect(Validation.isValidGroup(group, errors)).toBe(true);
    expect(errors).toEqual([]);
  });
  it("returns false with all possible errors in errorsRef array", () => {
    const errors: string[] = [];
    const group: IGroup = { id: 1, name: "" };
    expect(Validation.isValidGroup(group, errors)).toBe(false);
    expect(errors).toEqual(["Name must be at least 2 characters"]);
  });
});
