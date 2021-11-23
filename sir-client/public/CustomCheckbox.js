
class CustomCheckbox extends HTMLElement {
    constructor(...props) {
        super(...props);
        this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = '
            :host {
            background: 
        }
            ' ;

        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        this.shadowRoot.addEventListener('click', e => {

        })
    }
}

customElements.define('custom-ckeckbox', CustomCheckbox);