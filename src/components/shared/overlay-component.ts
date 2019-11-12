import { css, customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { globalStyles } from "../../styles/globalStyles";

@customElement("overlay-component")
export class OverlayComponent extends LitElement {
  @property({ type: Boolean }) public contrast = false;
  @property({ type: Boolean }) public frosted = false;
  @property({ type: Boolean }) public marginless = false;
  @property({ type: Boolean }) public maxHeight = false;
  @property({ type: Boolean }) public outline = false;
  @property({ type: Boolean }) public rounded = false;
  @property({ type: Boolean }) public shadow = false;
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          background: inherit;
        }
        .overlay {
          background: var(--theme-back);
          margin: 2.5vh 2.5%;
          padding: 5vh;
          width: 95%;
        }
        .contrast {
          background: var(--theme-alt);
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
          box-shadow: inset 0 0 0 2000px var(--theme-frost-alt);
          filter: blur(10px);
          margin: -20px;
          z-index: -1;
        }
        .marginless {
          margin: 0;
          width: 100%;
        }
        .maxHeight {
          height: 100%;
        }
        .outline {
          border: 2px solid var(--theme-alt);
        }
        .outlineContrast {
          border: 2px solid var(--theme-back);
        }
        .rounded {
          border-radius: 10px;
        }
        .shadow {
          box-shadow: 0px 1px 5px black;
        }
      `,
    ];
  }
  public render() {
    return html`
      <div
        class=${classMap({
          contrast: this.contrast,
          frosted: this.contrast && this.frosted ? false : this.frosted,
          frostedContrast: this.contrast && this.frosted ? true : false,
          marginless: this.marginless,
          maxHeight: this.maxHeight,
          outline: this.contrast && this.outline ? false : this.outline,
          outlineContrast: this.contrast && this.outline ? true : false,
          overlay: true,
          rounded: this.rounded,
          shadow: this.shadow,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}
