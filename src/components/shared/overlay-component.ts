import { css, customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { globalStyles } from "../../styles/global-styles";

@customElement("overlay-component")
export class OverlayComponent extends LitElement {
  @property({ type: Boolean }) contrast = false;
  @property({ type: Boolean }) frosted = false;
  @property({ type: Boolean }) marginless = false;
  @property({ type: Boolean }) rounded = false;
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          background: inherit;
        }
        .overlay {
          background: var(--theme-back);
          margin: 5vh 2.5vw;
          padding: 5vh;
          width: 95%;
        }
        .contrast {
          background: var(--theme-fore);
          color: var(--theme-back);
        }
        .frosted {
          position: relative;
          background: inherit;
          overflow: hidden;
          z-index: 1;
        }
        .frosted::before {
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
        .frostedContrast {
          position: relative;
          background: inherit;
          overflow: hidden;
          z-index: 1;
        }
        .frostedContrast::before {
          content: "";
          position: absolute;
          background: inherit;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 0 0 0 2000px var(--theme-frost-con);
          filter: blur(10px);
          margin: -20px;
          z-index: -1;
        }
        .marginless {
          margin: 0;
          width: 100%;
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
          contrast: this.contrast,
          frosted: this.contrast && this.frosted ? false : this.frosted,
          frostedContrast: this.contrast && this.frosted ? true : false,
          marginless: this.marginless,
          overlay: true,
          rounded: this.rounded,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
