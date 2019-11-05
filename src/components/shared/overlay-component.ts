import { css, customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { globalStyles } from "../../styles/global-styles";

@customElement("overlay-component")
export class OverlayComponent extends LitElement {
  @property({ type: Boolean }) rounded = false;
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
        .rounded {
          border-radius: 10px;
        }
      `,
    ];
  }
  render() {
    return html`
      <div
        class=${classMap({
          overlay: true,
          rounded: this.rounded,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
