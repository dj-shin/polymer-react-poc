import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { SimpleComponent } from '../react/SimpleComponent';

import React from 'react';
import ReactDOM from 'react-dom';

class SimpleElement extends PolymerElement {
    static get template() {
        console.log('SimpleElement::template');
        return html`
        <style>
            .bordered {
                border: 1px solid black;
                padding: 1em;
                background-color: sandybrown;
            }
        </style>
        <div class="bordered">
            <p>[Polymer] Simple Element</p>
            <button id="resetBtn">Reset</button>
            <div id="react-mount-point"></div>
            <child-element count="{{ count }}"></child-element>
        </div>
        `;
    }

    connectedCallback() {
        console.log('SimpleElement::connectedCallback');
        super.connectedCallback();
        this.renderReactComponent();
    }

    renderReactComponent() {
        console.log('SimpleElement::renderReactComponent');
        const mountPoint = this.shadowRoot.getElementById("react-mount-point");
        const simpleComponent = React.createElement(SimpleComponent, { count: this.count }, null);
        ReactDOM.unmountComponentAtNode(mountPoint);
        ReactDOM.render(simpleComponent, mountPoint);
    }

    static get is() {
        return 'simple-element';
    }

    static get properties() {
        return {
            count: {
                type: Number,
                value() {
                    return 3;
                },
                notify: true,
            },
        };
    }

    ready() {
        super.ready();

        this.$.resetBtn.addEventListener("click", () => {
            this.count = 0;                 // property change does not update React component
            this.renderReactComponent();    // must render again manually
        });

        this.addEventListener("fire-on-leaf", (e) => {
            e.detail.then.resolve( this.count );
        });
    }

}
customElements.define(SimpleElement.is, SimpleElement);
