import { BaseDAL } from "./BaseDAL";

export class DarkModeDAL extends BaseDAL {
  public getDarkMode(): boolean {
    return this.store.get("darkMode");
  }
  public setDarkMode(darkMode: boolean): void {
    this.store.set("darkMode", darkMode);
  }
}
