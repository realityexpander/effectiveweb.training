import AirElement from "./AirElement.js";
import { html } from "../lit-html/lit-html.js";

export default class About2View extends AirElement {

    constructor() {
        super();
    }
    connectedCallback() {
        this.viewChanged();
    }

    createView() {
        return html`
        <article>
         <h3>About #2</h3>
        </article>
        `;

    }
}

customElements.define('about2-view', About2View);



