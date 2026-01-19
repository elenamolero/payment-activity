import { LitElement, html } from 'lit';

/**
 * @class UiIcon
 * @extends LitElement
 * @description A lightweight, accessible icon component that renders SVG icons from a centralized icon set
 */
export class UiIcon extends LitElement {
  /**
   * @typedef {Object} UiIconProperties
   * @property {string} name - The icon identifier matching a symbol in ui-icon-set
   * @property {string} description - Accessible description text for the icon
   * @property {string} size - Icon size (xs, s, default, m, l, xl)
   * @property {string} color - SVG fill color (CSS color value or currentColor)
   * @property {boolean} decorative - If true, hides icon from screen readers
   */

  static properties = {
    /** @type {string} Icon identifier matching a symbol id in ui-icon-set */
    name: { type: String },

    /** @type {string} Accessible description text for screen readers */
    description: { type: String },

    /** @type {string} Icon size (xs, s, default, m, l, xl) */
    size: { type: String },

    /** @type {string} SVG fill color (hex, rgb, hsl, or currentColor) */
    color: { type: String },

    /** @type {boolean} If true, hides icon from screen readers */
    decorative: { type: Boolean },
  };

  constructor() {
    super();
    this.name = '';
    this.description = '';
    this.size = 'default';
    this.color = 'currentColor';
    this.decorative = false;
  }

  static _validateSize(size) {
    const allowedSizes = ['xs', 's', 'default', 'm', 'l', 'xl'];
    return allowedSizes.includes(size) ? size : 'default';
  }

  get validatedSize() {
    return UiIcon._validateSize(this.size);
  }

  render() {
    if (!this.name) {
      return html``;
    }

    const displayTitle = this.description || this.name.replace('-', ' ');

    return html`
      <style>
        ui-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ui-icon-color, currentColor);
        }

        .ui-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(--ui-icon-size, 1rem);
          height: var(--ui-icon-size, 1rem);
        }

        svg {
          width: 100%;
          height: 100%;
        }

        .ui-icon--xs {
          --ui-icon-size: 0.8rem;
        }
        .ui-icon--s {
          --ui-icon-size: 1.2rem;
        }
        .ui-icon--default {
          --ui-icon-size: 1.5rem;
        }
        .ui-icon--m {
          --ui-icon-size: 2rem;
        }
        .ui-icon--l {
          --ui-icon-size: 3rem;
        }
        .ui-icon--xl {
          --ui-icon-size: 4rem;
        }
      </style>
      <span
        class="ui-icon ui-icon--${this.validatedSize}"
        aria-hidden="${this.decorative}"
      >
        ${this.decorative
          ? html`
              <svg role="presentation">
                ${this.description
                  ? html`<title>${this.description}</title>`
                  : ''}
                <use href="#${this.name}" fill="${this.color}"></use>
              </svg>
            `
          : html`
              <svg role="img" aria-label="${displayTitle}">
                ${this.description
                  ? html`<title>${this.description}</title>`
                  : ''}
                <use href="#${this.name}" fill="${this.color}"></use>
              </svg>
            `}
      </span>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('ui-icon', UiIcon);
