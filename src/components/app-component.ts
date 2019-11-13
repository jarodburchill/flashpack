import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import { globalStyles } from "../styles/globalStyles";
import "./flashcard-component";
import "./shared/overlay-component";

@customElement("app-component")
export class AppComponent extends LitElement {
  @property({ type: Boolean }) public bool: boolean = false;
  @property({ type: String }) public name: string = "Test";
  private contentDesc: TemplateResult = html`
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic aspernatur
      quidem animi id cupiditate repellat sit. Asperiores delectus nam
      praesentium consequatur, veritatis fugiat omnis. Aut voluptatum qui amet
      delectus libero!
    </p>
  `;
  private handleClick(): void {
    this.bool = !this.bool;
  }
  static get styles(): CSSResult[] {
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
        .container {
          background: inherit;
          display: flex;
          justify-content: flex-end;
        }
        .test {
          background: inherit;
          width: calc(100% - 200px);
          height: 100vh;
          display: flex;
          align-items: center;
        }
        .menu {
          background: inherit;
          position: fixed;
          height: 100vh;
          width: 200px;
          z-index: 1;
        }
      `,
    ];
  }
  public render(): TemplateResult {
    return html`
      <div id="app">
        <!-- <h1>${this.name}</h1>
        <input
          type="text"
          id="test"
          value=${this.name}
          @keyup=${(e: any): void => (this.name = e.target.value)}
        />
        <button @click=${this.handleClick}>Test</button> -->
        <div class="menu">
          <overlay-component marginless maxHeight>sadfdsa</overlay-component>
        </div>
        <div class="container">
          <div class="test">
            <flashcard-component></flashcard-component>
          </div>
        </div>
      </div>
    `;
  }
}
