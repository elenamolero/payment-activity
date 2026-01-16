import { LitElement, html, css } from 'lit';
import { getIcon } from './ui-icon-store.js';

export class UiIcon extends LitElement {
  static properties = {
    name: { type: String },
    iconTitle: { type: String },
    size: { type: String },
    color: { type: String },
    decorative: { type: Boolean },
  };

  constructor() {
    super();
    this.name = '';
    this.iconTitle = '';
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
    const icon = getIcon(this.name);
    if (!this.name || !icon) {
      return html``;
    }

    const displayTitle = this.iconTitle || this.name.replace('-', ' ');

    return html`
      <span
        class="ui-icon ui-icon--${this.validatedSize}"
        aria-hidden="${this.decorative}"
      >
        ${this.decorative
          ? html`
              <svg role="presentation" viewBox="${icon.viewBox}">
                ${this.iconTitle ? html`<title>${this.iconTitle}</title>` : ''}
                <path d="${icon.path}" fill="${this.color}"></path>
              </svg>
            `
          : html`
              <svg
                role="img"
                aria-label="${displayTitle}"
                viewBox="${icon.viewBox}"
              >
                ${this.iconTitle ? html`<title>${this.iconTitle}</title>` : ''}
                <path d="${icon.path}" fill="${this.color}"></path>
              </svg>
            `}
      </span>
    `;
  }

  static styles = css`
    :host {
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
      --ui-icon-size: 0.75rem;
    }
    .ui-icon--s {
      --ui-icon-size: 0.875rem;
    }
    .ui-icon--default {
      --ui-icon-size: 1rem;
    }
    .ui-icon--m {
      --ui-icon-size: 1.25rem;
    }
    .ui-icon--l {
      --ui-icon-size: 1.5rem;
    }
    .ui-icon--xl {
      --ui-icon-size: 2rem;
    }
  `;
}
customElements.define('ui-icon', UiIcon);
