
class CustomCheckbox extends HTMLElement {
    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    constructor(...props) {
        super(...props);
        this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        style.textContent = `
    :host {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        margin-top: 24px;
      }
      
      :host::before {
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        box-sizing: border-box;
        border: 2px solid rgb(var(--color-primary));
      }
      
      :host([hidden]) {
        display: none;
      }
      
      :host([checked])::before {
        content: '';
        
        color: rgb(var(--background-color));
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath d='M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z' fill='currentColor' /%3E%3C/svg%3E");
        background-position: center;
        background-repeat: no-repeat;
      }
      
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
      
      :host > span {
        margin-left: 12px; 
        line-height: 18px; 
        font-size: 1rem;
      }
      
      :host([parent]) {
        padding-left: 32px;
      }
      `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'checkbox');
        if (!this.hasAttribute('tabindex'))
            this.setAttribute('tabindex', 0);

        this._upgradeProperty('checked');
        this._upgradeProperty('disabled');

        this.addEventListener('keyup', this._onKeyUp);
        this.addEventListener('click', this._onClick);

        this._textContent = this.textContent;
        this.textContent = '';

        const textElement = document.createElement('span');
        textElement.textContent = this._textContent;

        this.shadowRoot.appendChild(textElement);

        this._lookForChildren();
    }

    _lookForChildren(disableChildren) {
        const children = document.body.querySelectorAll(`custom-checkbox[parent="${this.id}"]`);

        for (const child of children) {
            child.disabled = !this.checked;
            if (this.checked === false) child.checked = false;
        }

    }

    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    disconnectedCallback() {
        this.removeEventListener('keyup', this._onKeyUp);
        this.removeEventListener('click', this._onClick);
    }

    set checked(value) {
        const isChecked = Boolean(value);
        if (isChecked) {
            this.setAttribute('checked', '');
            this._lookForChildren();
        } else {
            this.removeAttribute('checked');
            this._lookForChildren(true);
        }
    }

    get checked() {
        return this.hasAttribute('checked');
    }

    set disabled(value) {
        const isDisabled = Boolean(value);
        if (isDisabled)
            this.setAttribute('disabled', '');
        else
            this.removeAttribute('disabled');
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const hasValue = newValue !== null;
        switch (name) {
            case 'checked':
                this.setAttribute('aria-checked', hasValue);
                break;
            case 'disabled':
                this.setAttribute('aria-disabled', hasValue);
                if (hasValue) {
                    this.removeAttribute('tabindex');
                    this.blur();
                } else {
                    this.setAttribute('tabindex', '0');
                }
                break;
        }
    }

    _onKeyUp(event) {
        if (event.altKey)
            return;

        switch (event.keyCode) {
            case 32:
                event.preventDefault();
                this._toggleChecked();
                break;
            default:
                return;
        }
    }

    _onClick(event) {
        this._toggleChecked();
    }

    _toggleChecked() {
        if (this.disabled)
            return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.checked,
            },
            bubbles: true,
        }));
    }
}

class CustomChip extends HTMLElement {
    #value = [];

    constructor(...props) {
        super(...props);
        this.attachShadow({mode: 'open'});
        const style = document.createElement('style');

        style.textContent = `
      @import url('https://css.gg/close-o.css');
      
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap; 
      }
    
      :host > input[type='text'] {
        display: block;
        box-sizing: border-box; 
        position: relative;
        width: 100%;
        height: 54px; 
        line-height: 54px; 
        padding: 0px 12px; 
        border-radius: 4px; 
        border: 1px solid rgba(var(--color-primary),0.23); 
        box-shadow: 0 1px 4px rgba(var(--color-primary),0.25); 
        font-size: 1.05rem; 
        flex-basis: 100%; 
        flex-shrink: 0;
        margin-bottom: 20px;
      }
      
     :host > span {
       display: flex;
       position: relative;
       flex-direction: row;
       width: auto; 
       height: 42px;
       line-height: 42px; 
       background-color: rgb(var(--background-color-2));
       border-radius: 21px;
       padding: 0px 15px;
       margin: 0 16px 16px 0;
       font-size: 0.9rem; 
       box-sizing: border-box;
       align-items: center;
     }
     :host > span > i {
        --ggs: 0.75;
        margin-left: 10px; 
        cursor: pointer;
     }
    
    `;


        const chipInput = document.createElement('input');
        chipInput.type = 'text';
        this.chipInput = chipInput;

        this.shadowRoot.appendChild(style);
    }

    get value() {
        return this.#value;
    }
    set value(values) {
        if (values.constructor === [].constructor) this.#value = values;
    }

    #chipDeleteListener(e) {
        this.value = this.value.filter(item => item !== e.path[1].textContent);
        e.path[1].remove();
    }

    #keyUpListener(e) {
        e.preventDefault();
        if (e.key === ',' || e.key === 'Enter') {
            if (this.chipInput.value === ',' || this.chipInput.value === '') {
                this.chipInput.value = '';
                return;
            }

            const chipText = document.createElement('span');
            chipText.textContent = this.chipInput.value.replace(/,/g, '');

            const chipIcon = document.createElement('i');
            chipIcon.classList.add('gg-close-o');

            chipIcon.addEventListener('click', this.#chipDeleteListener.bind(this));

            chipText.appendChild(chipIcon);
            this.shadowRoot.appendChild(chipText);

            this.value = [...this.value, this.chipInput.value.replace(/,/g, '')];
            this.chipInput.value = '';
        }
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.chipInput);
        this.chipInput.addEventListener('keyup', this.#keyUpListener.bind(this));
    }

    disconnectedCallback() {
        this.chipInput.removeEventListener('keyUp', this.#keyUpListener);
    }

}
customElements.define('custom-chip', CustomChip);
customElements.define('custom-checkbox', CustomCheckbox);