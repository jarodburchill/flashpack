import { css, customElement, html, LitElement } from "lit-element";
import { globalStyles } from "../../styles/global-styles";

@customElement("frosted-component")
export class FrostedComponent extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          background: inherit;
        }
        .frosted {
          margin: 0 2.5vw 5vh 2.5vw;
          padding: 5vh;
          border-radius: 10px;
          width: 95%;
          position: relative;
          background: inherit;
          overflow: hidden;
          box-shadow: 0px 1px 5px hsl(0, 0%, 0%);
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
      `,
    ];
  }
  render() {
    return html`
      <div class="frosted">
        <slot></slot>
      </div>
    `;
  }
}
