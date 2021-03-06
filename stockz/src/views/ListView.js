import AirElement from "./AirElement.js";
import { html } from "../lit-html/lit-html.js";
// import { html, render } from './../lit-html/lit-html.js';

import Stocks from './Stocks.js';
export default class ListView extends AirElement {

    constructor() {
        super();
        this.onViewChanged = _ => this.viewChanged();
        this.listenerName = 'air-stocks';
        console.log("Listview constructor:", Stocks.all());
    }

    connectedCallback() {
        console.log("ListView connectedCallback:", Stocks.all());
        // Fixed here
        addEventListener(this.listenerName, this.onViewChanged);
        this.viewChanged();
    }

    disconnectedCallback() {
        console.log('ListView cleanup');
        this.removeEventListener(this.listenerName, this.onViewChanged);
    }

    createView() {
        console.log("Listview increateview:", Stocks.all());
        return html`
        <style>
         header{
             background: var(--air-brown, red);
         }
        </style>
            <header>
            <h2>the stocks</h2>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>name</th><th>price</th><th>amount</th><th>total</th>
                    </tr>
                </thead>
                <tbody>
                    ${Stocks.all().map(({ name, price, amount, total }) =>
            html`
                    <tr>
                    <td>${name}</td>
                    <td>${price}</td>
                    <td>${amount}</td>
                    <td>${total}</td>
                    <td><button id="${name}" @click=${(e) => this.removeStock(e)}>remove</button></td>
                    </tr>
                `
        )}
                </tbody>
            </table>
        `;
    }

    removeStock({ target }) {
        Stocks.remove(target.id);
    }

}

customElements.define('list-view', ListView);