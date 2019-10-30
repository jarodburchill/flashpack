import { css, customElement, html, LitElement, property } from "lit-element";
import { frostedStyles } from "../styles/frosted-styles";
import { globalStyles } from "../styles/global-styles";
import "./test-container";

@customElement("app-container")
export class AppContainer extends LitElement {
  @property({ type: Boolean }) bool = false;
  @property({ type: String }) name = "Test";
  contentDesc = html`
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur
      quidem animi id cupiditate repellat sit. Asperiores delectus nam
      praesentium consequatur, veritatis fugiat omnis. Aut voluptatum qui amet
      delectus libero!
    </p>
  `;
  handleClick() {
    this.bool = !this.bool;
  }
  static get styles() {
    return [
      globalStyles,
      frostedStyles,
      css`
        :host {
          background: inherit;
        }
        #app {
          min-height: 100vh;
          background: inherit;
        }
        .test {
          background: inherit;
          width: 50%;
        }
      `,
    ];
  }
  render() {
    return html`
      <div id="app">
        <h1>${this.name}</h1>
        <button @click="${this.handleClick}">Test</button>
        <div class="frosted-container">
          ${this.bool ? this.contentDesc : null}
        </div>
        <div class="frosted-container">
          ${this.bool ? this.contentDesc : null}
        </div>
        <div class="test">
          <div class="frosted-container">
            ${this.bool ? this.contentDesc : null}
          </div>
        </div>
        <test-container></test-container>
      </div>
    `;
  }
}
