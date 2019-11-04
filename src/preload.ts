import { remote } from "electron";

const { systemPreferences } = remote;
window.localStorage.darkMode = systemPreferences.isDarkMode();

// tslint:disable-next-line: no-var-requires
require = require("esm")(module);
// tslint:disable-next-line: no-var-requires
module.exports = require("./renderer");
