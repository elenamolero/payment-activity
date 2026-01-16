import { html, css, LitElement } from 'lit';
import '../atoms/ui-button/ui-button.js';
import '../atoms/ui-icon/ui-icon.js';
import '../atoms/ui-icon/ui-icon-set.js';
import '../atoms/ui-amount/ui-amount.js';

export class PaymentWidget extends LitElement {
  static properties = {
    header: { type: String },
    counter: { type: Number },
  };

  constructor() {
    super();
    this.header = 'Hey there';
    this.counter = 5;
  }

  render() {
    return html`
      <ui-icon-set></ui-icon-set>
      <ui-icon
        name="paper-plane"
        size="xl"
        color="#3b82f6"
        description="Send payment"
      ></ui-icon>
      <ui-icon
        name="paper-plane"
        size="xs"
        color="#3b82f6"
        description="Send payment"
      ></ui-icon>

      <section
        class="buttons-container"
        role="group"
        aria-labelledby="payment-actions"
      >
        <ui-button label="Button" variant="primary"></ui-button>
        <ui-button label="Link" variant="secondary"></ui-button>
      </section>
      <ui-amount
        .value=${1234567.89}
        .currency=${'$'}
        .locale=${'en-US'}
        .currencyPosition=${'before'}
      ></ui-amount
      ><br />
      <ui-amount
        .value=${1234567.89}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
      ></ui-amount
      ><br />
      <ui-amount
        .value=${54321.99}
        .currency=${'CHF'}
        .locale=${'de-DE'}
        .currencyPosition=${'before'}
      ></ui-amount
      ><br />
      <ui-amount
        .value=${123456.78}
        .currency=${'¥'}
        .locale=${'ja-JP'}
        .currencyPosition=${'before'}
        .trend=${'up'}
      ></ui-amount>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--payment-widget-text-color, #000);
    }

    .buttons-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    @media (min-width: 768px) {
      .buttons-container {
        flex-direction: row;
        align-items: center;
        width: 100%;
      }

      ui-button {
        --ui-button-flex: 1;
      }
    }
  `;
}

customElements.define('payment-widget', PaymentWidget);
