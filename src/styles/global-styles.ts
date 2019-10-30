import { css } from "lit-element";

export const globalStyles = css`
  * {
    --theme-primary: hsl(0, 0%, 100%);
    --theme-secondary: hsl(0, 0%, 0%);
    --theme-frosted: hsla(0, 0%, 0%, 0.75);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--theme-primary);
  }
`;
