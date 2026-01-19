import { LitElement, html, css } from 'lit';
import '../ui-icon/ui-icon.js';
import '../ui-icon/ui-icon-set.js';

/**
 * @class UiAmount
 * @extends LitElement
 * @description
 * A specialized component for displaying monetary amounts with currency symbols, locale-aware formatting,
 * and visual trend indicators. Supports multiple sizes and custom colors.
 *
 * The component intelligently formats numbers based on the locale (en-US, es-ES, de-DE, etc.) and positions
 * the currency symbol before or after the amount. Optional trend icons (up/down) provide visual indicators
 * for financial changes.
 */
export class UiAmount extends LitElement {
  /**
   * @typedef {Object} UiAmountProperties
   * @property {number} value - The monetary amount to display
   * @property {string} currency - Currency symbol (€, $, £, ¥, etc.)
   * @property {string} size - Component size (s, m, l, xl)
   * @property {string} trend - Trend indicator ('up', 'down', 'none')
   * @property {string} locale - BCP 47 language tag (en-US, es-ES, de-DE, etc.)
   * @property {string} currencyPosition - Currency symbol position ('before' or 'after')
   */

  static properties = {
    /** @type {number} The monetary amount value to format and display */
    value: { type: Number },

    /** @type {string} Currency symbol displayed with the amount */
    currency: { type: String },

    /** @type {string} The display size of the component (s, m, l, xl) */
    size: { type: String },

    /** @type {string} Visual trend indicator for the amount ('up', 'down', 'none') */
    trend: { type: String },

    /** @type {string} BCP 47 language tag for locale-specific number formatting */
    locale: { type: String },

    /** @type {string} Position of the currency symbol relative to the amount ('before'|'after') */
    currencyPosition: { type: String },
  };

  static _validSizes = ['s', 'm', 'l', 'xl'];

  static _validTrends = ['up', 'down', 'none'];

  static _validPositions = ['before', 'after'];

  constructor() {
    super();
    this.value = 0;
    this.currency = '€';
    this.size = 'm';
    this.trend = 'none';
    this.locale = navigator.language || 'en-US';
    this.currencyPosition = 'after';
  }

  static _validateSize(size) {
    return UiAmount._validSizes.includes(size) ? size : 'm';
  }

  static _validateTrend(trend) {
    return UiAmount._validTrends.includes(trend) ? trend : 'none';
  }

  static _validatePosition(position) {
    return UiAmount._validPositions.includes(position) ? position : 'after';
  }

  get validatedSize() {
    return UiAmount._validateSize(this.size);
  }

  get validatedTrend() {
    return UiAmount._validateTrend(this.trend);
  }

  get validatedPosition() {
    return UiAmount._validatePosition(this.currencyPosition);
  }

  _getIconSize() {
    const sizeMap = {
      s: 'xs',
      m: 's',
      l: 'm',
      xl: 'l',
    };
    return sizeMap[this.validatedSize] || 's';
  }

  _formatValue(value, currencySymbol) {
    const formattedNumber = new Intl.NumberFormat(this.locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    const symbolBefore = this.validatedPosition === 'before';

    return symbolBefore
      ? `${currencySymbol} ${formattedNumber}`
      : `${formattedNumber} ${currencySymbol}`;
  }

  _getTrendColor() {
    const trend = this.validatedTrend;
    const styles = getComputedStyle(this);

    if (trend === 'up') {
      return (
        styles.getPropertyValue('--ui-amount-trend-up-color').trim() ||
        '#02702a'
      );
    }
    if (trend === 'down') {
      return (
        styles.getPropertyValue('--ui-amount-trend-down-color').trim() ||
        '#aa0f0f'
      );
    }
    return null;
  }

  _getTrendDescription() {
    const descriptionMap = {
      up: 'Increasing trend',
      down: 'Decreasing trend',
      none: '',
    };
    return descriptionMap[this.validatedTrend] || '';
  }

  renderTrendIcon() {
    const iconMap = {
      up: { name: 'caret-up' },
      down: { name: 'caret-down' },
      none: null,
    };

    const trendInfo = iconMap[this.validatedTrend];

    if (trendInfo) {
      const color = this._getTrendColor();
      const iconSize = this._getIconSize();
      const description = this._getTrendDescription();
      return html`
        <ui-icon
          name="${trendInfo.name}"
          size="${iconSize}"
          color="${color}"
          description="${description}"
          decorative
        ></ui-icon>
      `;
    }
    return null;
  }

  render() {
    const formattedAmount = this._formatValue(this.value, this.currency);

    return html`
      <ui-icon-set></ui-icon-set>
      <div class="ui-amount ui-amount--${this.validatedSize}">
        <span class="ui-amount__value">${formattedAmount}</span>
        ${this.renderTrendIcon()}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      line-height: 1;
      font-weight: 200;
      font-size: var(--ui-amount-font-size, 1rem);
      --ui-amount-trend-up-color: #02702a;
      --ui-amount-trend-down-color: #aa0f0f;
    }

    .ui-amount {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--ui-amount-color, currentColor);
    }

    .ui-amount__value {
      white-space: nowrap;
    }

    .ui-amount--s {
      font-size: var(--ui-amount-font-size, 0.875rem);
    }
    .ui-amount--m {
      font-size: var(--ui-amount-font-size, 1.125rem);
    }
    .ui-amount--l {
      font-size: var(--ui-amount-font-size, 1.5rem);
    }
    .ui-amount--xl {
      font-size: var(--ui-amount-font-size, 2rem);
    }

    ui-icon {
      margin-left: 0.2em;
    }
  `;
}

customElements.define('ui-amount', UiAmount);
