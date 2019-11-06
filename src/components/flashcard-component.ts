import { css, customElement, html, LitElement, property } from "lit-element";
import { globalStyles } from "../styles/global-styles";
import "./shared/overlay-component";

@customElement("flashcard-component")
export class FlashcardComponent extends LitElement {
  static get styles() {
    return [
      globalStyles,
      css`
        :host {
          background: inherit;
        }
      `,
    ];
  }
  render() {
    return html`
      <overlay-component frosted rounded>
        <overlay-component contrast frosted outline rounded shadow>
          Question
        </overlay-component>
        <overlay-component
          contrast
          frosted
          outline
          rounded
          shadow
        ></overlay-component>
        <overlay-component
          contrast
          frosted
          outline
          rounded
          shadow
        ></overlay-component>
        <overlay-component
          contrast
          frosted
          outline
          rounded
          shadow
        ></overlay-component>
        <overlay-component
          contrast
          frosted
          outline
          rounded
          shadow
        ></overlay-component>
      </overlay-component>
    `;
  }
}
