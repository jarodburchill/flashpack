import { BaseDAL } from "./BaseDAL";

export class DarkModeDAL extends BaseDAL {
  public getDarkMode(): boolean {
    return this.electronStore.get("darkMode");
  }
  public setDarkMode(darkMode: boolean): void {
    this.electronStore.set("darkMode", darkMode);
  }
}
