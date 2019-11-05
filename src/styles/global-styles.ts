import Store = require("electron-store");
import { css } from "lit-element";

const store = new Store();
const darkMode: boolean = store.get("darkMode");

export const globalStyles = css`
  * {
    --theme-fore: ${darkMode ? css`hsl(0, 0%, 100%)` : css`hsl(0, 0%, 0%)`};
    --theme-back: ${darkMode ? css`hsl(0, 0%, 0%)` : css`hsl(0, 0%, 100%)`};
    --theme-frost: ${darkMode
      ? css`hsla(0, 0%, 0%, 0.75)`
      : css`hsla(0, 0%, 100%, 0.75)`};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--theme-fore);
  }
`;
