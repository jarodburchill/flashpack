import { css, customElement, html, LitElement } from "lit-element";
import { globalStyles } from "../styles/global-styles";

@customElement("test-container")
export class TestContainer extends LitElement {
  static get styles() {
    return globalStyles;
  }
  render() {
    return html`
      <div>
        <h1>Test</h1>
      </div>
    `;
  }
}
