import { LitElement, html, css } from 'lit';

export class UiButton extends LitElement {
  static properties = {
    label: { type: String },
    variant: { type: String },
    disabled: { type: Boolean },
    href: { type: String },
  };

  constructor() {
    super();
    this.label = 'Click me';
    this.variant = 'primary';
    this.disabled = false;
    this.href = '';
  }

  _onClick() {
    this.dispatchEvent(
      new CustomEvent('ui-button-click', {
        bubbles: true,
        composed: true,
        detail: { label: this.label, href: this.href },
      }),
    );
  }

  _onKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onClick();
    }
  }

  render() {
    if (this.href) {
      return html`
        <a
          href="${this.href}"
          class="ui-button ui-button--${this.variant}"
          aria-label="${this.label}"
          target="_blank"
          @click=${this._onClick}
        >
          ${this.label}
        </a>
      `;
    }

    return html`
      <button
        class="ui-button ui-button--${this.variant}"
        ?disabled=${this.disabled}
        @click=${this._onClick}
        @keydown=${this._onKeyDown}
        aria-label="${this.label}"
      >
        ${this.label}
      </button>
    `;
  }

  static styles = css`
    :host {
      display: block;
      flex: var(--ui-button-flex, initial);
      width: var(--ui-button-width, 100%);
      max-width: var(--ui-button-max-width, none);
    }

    .ui-button {
      display: inline-block;
      border: none;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 300;
      transition: all 0.2s ease;
      width: 100%;
      text-align: center;
      text-decoration: none;
    }

    .ui-button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .ui-button:focus-visible {
      outline: 2px solid #5784ff;
      outline-offset: 2px;
    }

    .ui-button--primary {
      background-color: #001391;
      color: white;
    }

    .ui-button--primary:hover:not(:disabled) {
      background-color: #06195b;
    }

    .ui-button--primary:active:not(:disabled) {
      background-color: #02093f;
    }

    .ui-button--secondary {
      background-color: #ededed;
      color: #001391;
    }

    .ui-button--secondary:hover:not(:disabled) {
      color: #020e28;
      border-color: #020e28;
      background-color: #d0d0d0;
    }
  `;
}

customElements.define('ui-button', UiButton);
