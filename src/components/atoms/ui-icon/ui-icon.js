import { LitElement, html } from 'lit';

export class UiIcon extends LitElement {
  static properties = {
    name: { type: String },
    description: { type: String },
    size: { type: String },
    color: { type: String },
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
