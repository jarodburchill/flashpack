import ElectronStore = require("electron-store");
import { DarkModeDAL } from "../../src/data/classes/DarkModeDAL";
import { ISchema } from "../../src/models/Schema";

jest.mock("electron-store");

const getStore: () => ElectronStore<ISchema> = () => {
  return new ElectronStore<ISchema>({
    defaults: {
      cards: [],
      darkMode: false,
      groups: [],
      nextId: 1,
      packs: [],
    },
  });
};

describe("getDarkMode", () => {
  it("gets a storred darkMode value", () => {
    const electronStore: ElectronStore<ISchema> = getStore();
    const darkModeDAL: DarkModeDAL = new DarkModeDAL(electronStore);
    expect(darkModeDAL.getDarkMode()).toBe(false);
  });
});

describe("setDarkMode", () => {
  it("sets a darkMode value in storage", () => {
    const electronStore: ElectronStore<ISchema> = getStore();
    const darkModeDAL: DarkModeDAL = new DarkModeDAL(electronStore);
    darkModeDAL.setDarkMode(true);
    expect(electronStore.store.darkMode).toBe(true);
  });
});
