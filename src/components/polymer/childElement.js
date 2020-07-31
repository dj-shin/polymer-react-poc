import { PolymerElement, html } from '@polymer/polymer/polymer-element';

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
            <p>[Polymer] I am leaf node [[count]]</p>
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
}
customElements.define(ChildElement.is, ChildElement);
