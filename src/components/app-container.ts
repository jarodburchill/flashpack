import { customElement, html, LitElement } from "lit-element";

@customElement("app-container")
export class SimpleGreeting extends LitElement {
  render() {
    return html`
      <div>
        <p>Test</p>
      </div>
    `;
  }
}
