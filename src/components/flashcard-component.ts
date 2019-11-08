import { css, customElement, html, LitElement, property } from "lit-element";
import { globalStyles } from "../styles/globalStyles";
import "./shared/overlay-component";

@customElement("flashcard-component")
export class FlashcardComponent extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          background: inherit;
          width: 100%;
        }
      `,
    ];
  }
  render() {
    return html`
      <overlay-component contrast frosted rounded>
        <overlay-component outline rounded shadow>
          Question
        </overlay-component>
        <overlay-component outline rounded shadow>
          test
        </overlay-component>
        <overlay-component outline rounded shadow>
          test
        </overlay-component>
        <overlay-component outline rounded shadow>
          test
        </overlay-component>
        <overlay-component outline rounded shadow>
          test
        </overlay-component>
      </overlay-component>
    `;
  }
}
