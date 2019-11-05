import { css, customElement, html, LitElement } from "lit-element";
import { globalStyles } from "../../styles/global-styles";

@customElement("overlay-component")
export class OverlayComponent extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          background: inherit;
        }
        .overlay {
          margin: 0 2.5vw 5vh 2.5vw;
          padding: 5vh;
          border-radius: 10px;
          width: 95%;
          position: relative;
          background: inherit;
          overflow: hidden;
          z-index: 1;
        }
        .overlay::before {
          content: "";
          position: absolute;
          background: inherit;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 0 0 0 2000px var(--theme-frost);
          filter: blur(10px);
          margin: -20px;
          z-index: -1;
        }
      `,
    ];
  }
  render() {
    return html`
      <div class="overlay">
        <slot></slot>
      </div>
    `;
  }
}
