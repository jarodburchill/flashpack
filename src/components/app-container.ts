import { customElement, html, LitElement } from "lit-element";
import { globalStyles } from "./styles/global-styles";
import "./test-container";

@customElement("app-container")
export class AppContainer extends LitElement {
  static get styles() {
    return globalStyles;
  }
  render() {
    return html`
      <div>
        <h1>Test</h1>
        <test-container></test-container>
      </div>
    `;
  }
}
