import { LitElement, html, css } from 'lit';

/**
 * @class UiButton
 * @extends LitElement
 * @description
 * A versatile button component that renders either as a semantic button or link element.
 * Supports primary and secondary variants with full keyboard accessibility and customizable styling.
 *
 * The component intelligently switches between button and link rendering based on the href property.
 * When href is provided, it renders as an anchor tag that opens in a new tab. Otherwise, it renders
 * as a standard button element with keyboard event handling.
 */
export class UiButton extends LitElement {
  /**
   * @typedef {Object} UiButtonProperties
   * @property {string} label - The text displayed on the button
   * @property {string} variant - Button style variant (primary or secondary)
   * @property {boolean} disabled - Disables the button and prevents interactions
   * @property {string} href - URL for link mode, renders as anchor when provided
   */

  static properties = {
    /** @type {string} The text label displayed on the button */
    label: { type: String },

    /** @type {string} The button style variant ('primary'|'secondary') */
    variant: { type: String },

    /** @type {boolean} Disables the button and prevents all interactions */
    disabled: { type: Boolean },

    /** @type {string} URL for link mode, renders as anchor tag when provided */
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
      background-color: var(--ui-button-primary-bg-color, #001391);
      color: var(--ui-button-primary-text-color, white);
    }

    .ui-button--primary:hover:not(:disabled) {
      background-color: var(--ui-button-primary-hover-bg-color, #06195b);
    }

    .ui-button--primary:active:not(:disabled) {
      background-color: var(--ui-button-primary-active-bg-color, #02093f);
    }

    .ui-button--secondary {
      background-color: var(--ui-button-secondary-bg-color, #ededed);
      color: var(--ui-button-secondary-text-color, #001391);
    }

    .ui-button--secondary:hover:not(:disabled) {
      color: var(--ui-button-secondary-hover-text-color, #020e28);
      border-color: var(--ui-button-secondary-hover-border-color, #020e28);
      background-color: #d0d0d0;
    }
  `;
}

customElements.define('ui-button', UiButton);
