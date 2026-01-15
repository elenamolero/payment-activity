import { html, css, LitElement } from 'lit';
import '../atoms/ui-button/ui-button.js';

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
      <section
        class="buttons-container"
        role="group"
        aria-labelledby="payment-actions"
      >
        <ui-button label="Button" variant="primary"></ui-button>
        <ui-button label="Link" variant="secondary"></ui-button>
      </section>
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
