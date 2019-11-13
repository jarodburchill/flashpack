import { css, CSSResult } from "lit-element";
import { DataAccess } from "../data/DataAccess";

const dal: DataAccess = new DataAccess();
const darkMode: boolean = dal.getDarkMode();

export const globalStyles: CSSResult = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :host {
    --theme-fore: ${darkMode ? css`hsl(0, 0%, 97.5%)` : css`hsl(0, 0%, 0%)`};
    --theme-back: ${darkMode ? css`hsl(0, 0%, 25%)` : css`hsl(0, 0%, 97.5%)`};
    --theme-alt: ${darkMode ? css`hsl(0, 0%, 0%)` : css`hsl(0, 0%, 75%)`};
    --theme-frost: ${darkMode
      ? css`hsla(0, 0%, 25%, 0.65)`
      : css`hsla(0, 0%, 97.5%, 0.65)`};
    --theme-frost-alt: ${darkMode
      ? css`hsla(0, 0%, 0%, 0.65)`
      : css`hsla(0, 0%, 75%, 0.65)`};
    color: var(--theme-fore);
  }
`;
