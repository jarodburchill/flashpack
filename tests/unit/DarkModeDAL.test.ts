import ElectronStore = require("electron-store");
import { DarkModeDAL } from "../../src/data/classes/DarkModeDAL";
import { ISchema } from "../../src/models/Schema";
import { getEmptyStore } from "../testData";

jest.mock("electron-store");

describe("getDarkMode", () => {
  it("gets a stored darkMode value", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const darkModeDAL: DarkModeDAL = new DarkModeDAL(electronStore);
    expect(darkModeDAL.getDarkMode()).toBe(false);
  });
});

describe("setDarkMode", () => {
  it("sets a darkMode value in storage", () => {
    const electronStore: ElectronStore<ISchema> = getEmptyStore();
    const darkModeDAL: DarkModeDAL = new DarkModeDAL(electronStore);
    darkModeDAL.setDarkMode(true);
    expect(electronStore.store.darkMode).toBe(true);
  });
});
