import { css } from "lit-element";

export const frostedStyles = css`
  .frosted-container {
    margin: 0 2.5vw 5vh 2.5vw;
    padding: 5vh;
    border-radius: 10px;
    width: 95%;
    position: relative;
    background: inherit;
    overflow: hidden;
    z-index: 1;
  }
  .frosted-container::before {
    content: "";
    position: absolute;
    background: inherit;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 0 2000px rgba(255, 255, 255, 0.75);
    filter: blur(10px);
    margin: -20px;
    z-index: -1;
  }
`;
