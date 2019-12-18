import { IGroup } from "../../src/models/Group";
import { IPack } from "../../src/models/Pack";
import { Validation } from "../../src/validation/Validation";

describe("isValidGroup", () => {
  it("throws an error if errorsRef is not an empty string array", () => {
    const errors: string[] = ["data", "data"];
    const group: IGroup = { id: 1, name: "group" };
    expect(() => {
      Validation.isValidGroup(group, errors);
    }).toThrow(
      new Error(
        "errorsRef parameter must be passed in as an empty string array."
      )
    );
  });
  it("returns true with an empty errorsRef array", () => {
    const errors: string[] = [];
    const group: IGroup = { id: 1, name: "group" };
    expect(Validation.isValidGroup(group, errors)).toBe(true);
    expect(errors).toEqual([]);
  });
  it("returns false with a error message when group name is too short", () => {
    const errors: string[] = [];
    const group: IGroup = { id: 1, name: "" };
    expect(Validation.isValidGroup(group, errors)).toBe(false);
    expect(errors).toEqual(["Name must be at least 2 characters"]);
  });
});

describe("isValidPack", () => {
  it("throws an error if errorsRef is not an empty string array", () => {
    const errors: string[] = ["data", "data"];
    const pack: IPack = {
      id: 2,
      groupId: 1,
      type: "flash",
      name: "pack",
      timed: false,
      liveResults: false,
    };
    expect(() => {
      Validation.isValidPack(pack, errors);
    }).toThrow(
      new Error(
        "errorsRef parameter must be passed in as an empty string array."
      )
    );
  });
  it("returns true with an empty errorsRef array", () => {
    const errors: string[] = [];
    const pack: IPack = {
      id: 2,
      groupId: 1,
      type: "flash",
      name: "pack",
      timed: false,
      liveResults: false,
    };
    expect(Validation.isValidPack(pack, errors)).toBe(true);
    expect(errors).toEqual([]);
  });
  it("returns false with error message when pack type is flash and timed and liveResults are true", () => {
    const errors: string[] = [];
    const pack: IPack = {
      id: 2,
      groupId: 1,
      type: "flash",
      name: "pack",
      timed: true,
      liveResults: true,
    };
    expect(Validation.isValidPack(pack, errors)).toBe(false);
    expect(errors).toEqual([
      "If type is 'flash' then timed and liveResults must be false",
    ]);
  });
  it("returns false with error message when pack name is too short", () => {
    const errors: string[] = [];
    const pack: IPack = {
      id: 2,
      groupId: 1,
      type: "quiz",
      name: "",
      timed: true,
      liveResults: true,
    };
    expect(Validation.isValidPack(pack, errors)).toBe(false);
    expect(errors).toEqual(["Name must be at least 2 characters"]);
  });
  it("returns false with multiple error messages", () => {
    const errors: string[] = [];
    const pack: IPack = {
      id: 2,
      groupId: 1,
      type: "flash",
      name: "",
      timed: false,
      liveResults: true,
    };
    expect(Validation.isValidPack(pack, errors)).toBe(false);
    expect(errors).toEqual([
      "If type is 'flash' then timed and liveResults must be false",
      "Name must be at least 2 characters",
    ]);
  });
});
