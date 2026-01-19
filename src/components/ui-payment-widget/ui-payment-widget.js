import { html, css, LitElement } from 'lit';
import '../atoms/ui-button/ui-button.js';
import '../atoms/ui-icon/ui-icon.js';
import '../atoms/ui-icon/ui-icon-set.js';
import '../atoms/ui-amount/ui-amount.js';

/**
 * @class PaymentWidget
 * @extends LitElement
 * @description
 * A comprehensive payment widget component that displays payment transaction details
 * with support for multiple currencies, locales, and custom button configurations.
 *
 * The component presents a complete payment card interface including:
 * - Header with transaction date and amount
 * - Main section with payment title and amount
 * - Secondary details section with account info, status, category, and description
 * - Optional bullet points list
 * - Footer with customizable action buttons
 */
export class PaymentWidget extends LitElement {
  /**
   * @property {string} date - Transaction date in ISO format (YYYY-MM-DD)
   * @property {number} headerAmount - Amount displayed in header (account balance)
   * @property {number} paymentAmount - Main payment amount to display
   * @property {string} currency - Currency symbol (€, $, £, etc.)
   * @property {string} locale - (en-US, es-ES, de-DE, etc.)
   * @property {string} currencyPosition - Currency symbol position ('before' or 'after')
   * @property {string} headerAmountTrend - Trend indicator ('up', 'down', 'none')
   * @property {string} paymentTitle - Title of the payment transaction
   * @property {string} accountNumber - Bank account number
   * @property {string} status - Payment status (Pending, Completed, etc.)
   * @property {string} category - Payment category (Transfer, Shopping, etc.)
   * @property {string} description - Detailed payment description
   * @property {Array<string>} bullets - List of additional payment details
   * @property {string} primaryButtonLabel - Label for the primary action button
   * @property {string} primaryButtonVariant - Primary button style variant
   * @property {string} secondaryButtonLabel - Label for the secondary action button
   * @property {string} secondaryButtonVariant - Secondary button style variant
   * @property {string} secondaryButtonHref - URL for secondary button link
   */
  static properties = {
    /** @type {string} Transaction date in ISO format */
    date: { type: String },
    /** @type {number} Amount displayed in header */
    headerAmount: { type: Number },
    /** @type {number} Main payment amount */
    paymentAmount: { type: Number },
    /** @type {string} Currency symbol */
    currency: { type: String },
    /** @type {string} language tag */
    locale: { type: String },
    /** @type {string} Currency symbol position ('before'|'after') */
    currencyPosition: { type: String },
    /** @type {string} Header amount trend indicator */
    headerAmountTrend: { type: String },
    /** @type {string} Payment transaction title */
    paymentTitle: { type: String },
    /** @type {string} Bank account number */
    accountNumber: { type: String },
    /** @type {string} Payment status */
    status: { type: String },
    /** @type {string} Payment category */
    category: { type: String },
    /** @type {string} Payment description */
    description: { type: String },
    /** @type {Array<string>} Additional payment details list */
    bullets: { type: Array },
    /** @type {string} Primary button label */
    primaryButtonLabel: { type: String },
    /** @type {string} Primary button variant style */
    primaryButtonVariant: { type: String },
    /** @type {string} Secondary button label */
    secondaryButtonLabel: { type: String },
    /** @type {string} Secondary button variant style */
    secondaryButtonVariant: { type: String },
    /** @type {string} Secondary button link URL */
    secondaryButtonHref: { type: String },
  };

  constructor() {
    super();
    this.date = '';
    this.headerAmount = 0;
    this.paymentAmount = 0;
    this.currency = '€';
    this.locale = 'es-ES';
    this.currencyPosition = 'after';
    this.headerAmountTrend = 'none';
    this.paymentTitle = 'Payment';
    this.accountNumber = '';
    this.status = 'Pending';
    this.category = 'Transfer';
    this.description = '';
    this.bullets = [];

    this.primaryButtonLabel = 'Confirm';
    this.primaryButtonVariant = 'primary';
    this.secondaryButtonLabel = 'Go to web';
    this.secondaryButtonVariant = 'secondary';
    this.secondaryButtonHref =
      'https://www.bbva.es/en/general/hazte-cliente/abrir-cuenta-bancaria-online.html';
  }

  _onPrimaryClick() {
    this.dispatchEvent(
      new CustomEvent('payment-confirm', {
        bubbles: true,
        composed: true,
        detail: {
          amount: this.headerAmount,
          currency: this.currency,
          status: this.status,
          accountNumber: this.accountNumber,
        },
      }),
    );
  }

  _onSecondaryClick() {
    this.dispatchEvent(
      new CustomEvent('go-to-web', {
        bubbles: true,
        composed: true,
        detail: { amount: this.headerAmount },
      }),
    );
  }

  render() {
    return html`
      <ui-icon-set></ui-icon-set>

      <article
        class="payment-widget"
        role="region"
        aria-labelledby="payment-card-title"
      >
        <header class="payment-header">
          <time
            datetime="${this.date}"
            class="payment-date"
            aria-label="Fecha de la operación: ${this.date}"
          >
            ${this.date}
          </time>
          <output class="amount-display" aria-live="polite">
            <ui-amount
              .value=${this.headerAmount}
              .currency=${this.currency}
              .locale=${this.locale}
              .currencyPosition=${this.currencyPosition}
              .trend=${this.headerAmountTrend}
              size="m"
              aria-label="Total payment amount"
            ></ui-amount>
          </output>
        </header>

        <main class="payment-main">
          <section class="main-payment-details" aria-labelledby="payment-title">
            <img
              src="../../assets/paper-plane.png"
              alt=""
              aria-hidden="true"
              class="paper-plane"
            />
            <h1 id="payment-title">${this.paymentTitle}</h1>
            <data class="amount-display" role="status">
              <ui-amount
                .value=${this.paymentAmount}
                .currency=${this.currency}
                .locale=${this.locale}
                .currencyPosition=${this.currencyPosition}
                size="xl"
                aria-label="Total payment amount"
              ></ui-amount>
            </data>
          </section>

          <section
            class="secondary-payment-details"
            aria-labelledby="secondary-details-heading"
          >
            <h2 id="secondary-details-heading" class="visually-hidden">
              Additional payment details
            </h2>
            <p
              class="account-number"
              aria-label="The account number is ${this.accountNumber}"
            >
              <ui-icon
                name="bank-reduced-logo"
                aria-hidden="true"
                size="s"
              ></ui-icon>
              <span aria-hidden="true"
                >${this.accountNumber ? `•${this.accountNumber}` : ''}</span
              >
            </p>

            <p class="status-container">
              <span
                class="status-badge"
                role="status"
                aria-label="Estado del pago: ${this.status}"
              >
                ${this.status}
              </span>
            </p>

            <p
              class="category-info"
              aria-label="Payment category: ${this.category}"
            >
              <ui-icon name="car" aria-hidden="true"></ui-icon>
              <span class="category-text" aria-hidden="true"
                >${this.category}</span
              >
            </p>

            <p class="detail-description">${this.description}</p>

            ${this.bullets.length > 0
              ? html`
                  <ul class="bullets-list" aria-label="Bullets details">
                    ${this.bullets.map(bullet => html` <li>${bullet}</li> `)}
                  </ul>
                `
              : ''}
          </section>
        </main>

        <footer
          class="payment-footer"
          role="group"
          aria-labelledby="actions-heading"
        >
          <h2 id="actions-heading" class="visually-hidden">Actions</h2>

          <ui-button
            id="primary-button"
            .label=${this.primaryButtonLabel}
            .variant=${this.primaryButtonVariant}
            @ui-button-click=${this._onPrimaryClick}
            aria-describedby="confirm-description"
          ></ui-button>
          <span id="confirm-description" class="visually-hidden"
            >Confirm the pending payment</span
          >

          <ui-button
            id="secondary-button"
            .label=${this.secondaryButtonLabel}
            .variant=${this.secondaryButtonVariant}
            .href=${this.secondaryButtonHref}
            @ui-button-click=${this._onSecondaryClick}
            aria-describedby="go-to-web"
          ></ui-button>
          <span id="go-to-web" class="visually-hidden"
            >Open a link of the website</span
          >
        </footer>
      </article>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --payment-widget-text-color: #070e46;
      --payment-widget-bg-color: #ffffff;
      --payment-widget-amount-text-color: var(--payment-widget-text-color);
      --payment-widget-primary-button-label: 'Confirm';
      --payment-widget-primary-button-variant: 'primary';
      --payment-widget-secondary-button-label: 'Go to web';
      --payment-widget-secondary-button-variant: 'secondary';
      --payment-widget-secondary-button-href: 'https://www.bbva.es/en/general/hazte-cliente/abrir-cuenta-bancaria-online.html';

      min-height: 100vh;
      font-family: sans-serif, Arial, Helvetica;
      color: var(--payment-widget-text-color);
      background-color: var(--payment-widget-bg-color);
    }

    ui-amount {
      --ui-amount-color: var(--payment-widget-amount-text-color);
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .payment-widget {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .payment-header {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      padding: 1.2rem 1.6rem;
      background-color: var(--payment-widget-bg-color);
    }

    .payment-date {
      font-size: 1.125rem;
      font-weight: 600;
    }

    .payment-header .amount-display {
      display: flex;
      align-items: center;
    }

    .payment-main {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.6rem;
      gap: 1.3rem;
      flex: 1 0 auto;
    }

    .main-payment-details {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .paper-plane {
      width: 22%;
      max-width: 300px;
      min-width: 200px;
      height: auto;
      display: block;
    }

    #payment-title {
      font-family: 'Times New Roman', Times, serif;
      margin: 0;
    }

    .amount-display {
      font-size: 2rem;
      font-weight: 600;
    }

    .secondary-payment-details {
      display: flex;
      flex-direction: column;
      gap: 1.3rem;
    }

    .secondary-payment-details > p {
      margin: 0;
      font-size: 1.1rem;
    }

    .account-number {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .status-badge {
      display: inline-flex;
      background-color: var(
        --payment-widget-status-badge-background-color,
        #e0e0e0
      );
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-style: italic;
    }

    .category-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }

    .description-label {
      font-size: 0.9rem;
      font-weight: 600;
    }

    .bullets-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.9rem;
    }

    .bullets-list li {
      position: relative;
      padding-left: 1.8rem;
      font-size: 1.1rem;
    }

    .bullets-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0.8rem;
      height: 0.4rem;
      background: var(
        --payment-widget-bullets-color,
        var(--payment-widget-text-color)
      );
      border-radius: 0.5rem;
    }

    .payment-footer {
      position: sticky;
      bottom: 0;
      display: flex;
      flex-direction: column;
      padding: 1.2rem 1.6rem;
      gap: 1rem;
      background-color: var(--payment-widget-bg-color);
    }

    ui-button {
      --ui-button-primary-bg-color: var(--payment-widget-button-primary-bg);
      --ui-button-primary-text-color: var(--payment-widget-button-primary-text);
      --ui-button-secondary-bg-color: var(--payment-widget-button-secondary-bg);
      --ui-button-secondary-text-color: var(
        --payment-widget-button-secondary-text
      );
    }

    @media (min-width: 768px) {
      .payment-footer {
        flex-direction: row;
        gap: 1rem;
      }

      ui-button {
        --ui-button-flex: 1;
      }
    }
  `;
}

customElements.define('payment-widget', PaymentWidget);
