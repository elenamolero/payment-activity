import { html, css, LitElement } from 'lit';
import '../atoms/ui-button/ui-button.js';
import '../atoms/ui-icon/ui-icon.js';
import '../atoms/ui-icon/ui-icon-set.js';
import '../atoms/ui-amount/ui-amount.js';

export class PaymentWidget extends LitElement {
  static properties = {
    date: { type: String },
    headerAmount: { type: Number },
    paymentAmount: { type: Number },
    currency: { type: String },
    locale: { type: String },
    currencyPosition: { type: String },
    headerAmountTrend: { type: String },
    paymentTitle: { type: String },
    paymentId: { type: String },
    status: { type: String },
    category: { type: String },
    description: { type: String },
    bullets: { type: Array },
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
    this.paymentId = '';
    this.status = 'Pending';
    this.category = 'Transfer';
    this.description = '';
    this.bullets = [];
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
          paymentId: this.paymentId,
        },
      }),
    );
  }

  _onSecondaryClick() {
    this.dispatchEvent(
      new CustomEvent('payment-cancel', {
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
        aria-labelledby="payment-card"
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
              .size=${'m'}
              aria-label="Total payment amount"
            ></ui-amount>
          </output>
        </header>

        <main class="payment-main">
          <section
            class="main-payment-details"
            aria-labelledby="main-payment-details"
          >
            <img
              src="../../assets/paper-plane.png"
              alt=""
              aria-hidden="true"
              class="paper-plane"
            />
            <h1 id="payment-title">${this.paymentTitle}</h1>
            <data class="amount-display" role="status" aria-live="polite">
              <ui-amount
                .value=${this.paymentAmount}
                .currency=${this.currency}
                .locale=${this.locale}
                .currencyPosition=${this.currencyPosition}
                .size=${'xl'}
                aria-label="Total payment amount"
              ></ui-amount>
            </data>
          </section>

          <section
            class="secondary-payment-details"
            aria-labelledby="secondary-payment-details"
          >
            <p class="payment-id-info">
              <ui-icon name="bank-reduced-logo" aria-hidden="true"></ui-icon>
              <span>•${this.paymentId}</span>
            </p>

            <p class="status-container">
              <strong class="status-badge" role="status">
                <i>${this.status}</i>
              </strong>
            </p>

            <p class="category-info">
              <ui-icon name="car" aria-hidden="true"></ui-icon>
              <span class="category-text">${this.category}</span>
            </p>

            <p class="detail-description">${this.description}</p>

            ${this.bullets.length > 0
              ? html`
                  <ul class="bullets-list" aria-label="Información adicional">
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
          <ui-button
            .label="Confirm"
            variant="primary"
            @ui-button-click=${this._onPrimaryClick}
            aria-describedby="confirm-description"
          ></ui-button>

          <ui-button
            .label="Cancel"
            variant="secondary"
            @ui-button-click=${this._onSecondaryClick}
            aria-describedby="cancel-description"
          ></ui-button>
        </footer>
      </article>
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: #070e46;
      min-height: 100vh;
      font-family: sans-serif, Arial, Helvetica;
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
      background-color: #ffffff;
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

    .payment-id-info {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .status-badge {
      display: inline-flex;
      background-color: #ecedf0;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
    }

    .status-badge i {
      font-style: italic;
      font-weight: normal;
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
      background: #070e46;
      border-radius: 0.5rem;
    }

    .payment-footer {
      position: sticky;
      bottom: 0;
      display: flex;
      flex-direction: column;
      padding: 1.2rem 1.6rem;
      gap: 1rem;
      background-color: #ffffff;
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
