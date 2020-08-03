import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { dispatchEvent } from "../../promisfy";

export class ChildElement extends PolymerElement {
    static get template() {
        console.log('ChildElement::template');
        return html`
        <style>
            .bordered {
                border: 1px solid black;
                padding: 1em;
                background-color: coral;
            }
        </style>
        <div class="bordered">
            <p>
                [Polymer] I am leaf node [[count]]
                |
                <button id="btnOk"> get count from Simple Element [polymer]</button>
            </p>
        </div>
        `;
    }

    static get is() {
        return 'child-element';
    }

    static get properties() {
        return {
            count: {
                type: Number,
                value() {
                    return 10;
                },
            }
        };
    }

    ready() {
        super.ready();

        this.$.btnOk.addEventListener("click", async () => {

            console.log(`clicked. send event...`);
            const response = await dispatchEvent(this, new CustomEvent("fire-on-leaf", {
                bubbles: true,
                composed: true,
                detail: {
                    count: this.count
                }
            }));

            console.log(`response in sync: `, response);
            this.count = response;
        });
    }
}
customElements.define(ChildElement.is, ChildElement);
