import { css } from "lit-element";

export const frostedContainer = css`
  .frosted-container {
    margin: 0 1% 5vh 1%;
    padding: 10%;
    border-radius: 10px;
    width: 98%;
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
