import { css, customElement, html, LitElement, property } from "lit-element";
import { globalStyles } from "../styles/global-styles";
import "./shared/frosted-component";

@customElement("app-component")
export class AppComponent extends LitElement {
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
      css`
        :host {
          background: inherit;
        }
        #app {
          background: inherit;
          height: max-content;
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
        <input
          type="text"
          id="test"
          value="${this.name}"
          @keyup="${(e: any) => (this.name = e.target.value)}"
        />
        <button @click="${this.handleClick}">Test</button>
        <frosted-component>
          ${this.bool ? this.contentDesc : null}
        </frosted-component>
        <frosted-component>
          ${this.bool ? this.contentDesc : null}
        </frosted-component>
        <div class="test">
          <frosted-component>
            ${this.bool ? this.contentDesc : null}
          </frosted-component>
        </div>
      </div>
    `;
  }
}
