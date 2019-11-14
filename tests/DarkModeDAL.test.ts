import { DarkModeDAL } from "../src/data/classes/DarkModeDAL";

it("stores darkMode", () => {
  const darkModeDAL: DarkModeDAL = new DarkModeDAL();
  darkModeDAL.setDarkMode(true);
  expect(darkModeDAL.getDarkMode()).toBe(true);
});
