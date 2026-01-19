import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './ui-payment-widget.js';
import '../atoms/ui-icon/ui-icon-set.js';

describe('PaymentWidget', () => {
  let el;

  beforeEach(async () => {
    const iconSet = await fixture(html`<ui-icon-set></ui-icon-set>`);
    document.body.appendChild(iconSet);
  });

  afterEach(() => {
    const iconSets = document.querySelectorAll('ui-icon-set');
    iconSets.forEach(iconSet => iconSet.remove());
  });

  it('renders primary button with custom label and variant', async () => {
    el = await fixture(
      html`<payment-widget
        .primaryButtonLabel=${'Accept Payment'}
        .primaryButtonVariant=${'secondary'}
      ></payment-widget>`,
    );
    await el.updateComplete;

    const primaryButton = el.shadowRoot.querySelectorAll('ui-button')[0];
    expect(primaryButton.label).to.equal('Accept Payment');
    expect(primaryButton.variant).to.equal('secondary');
  });

  it('renders secondary button with custom label, variant and href', async () => {
    el = await fixture(
      html`<payment-widget
        .secondaryButtonLabel=${'Learn More'}
        .secondaryButtonVariant=${'primary'}
        .secondaryButtonHref=${'https://example.com'}
      ></payment-widget>`,
    );
    await el.updateComplete;

    const secondaryButton = el.shadowRoot.querySelectorAll('ui-button')[1];
    expect(secondaryButton.label).to.equal('Learn More');
    expect(secondaryButton.variant).to.equal('primary');
    expect(secondaryButton.href).to.equal('https://example.com');
  });

  it('updates button properties dynamically', async () => {
    el = await fixture(
      html`<payment-widget
        .primaryButtonLabel=${'Confirm'}
        .secondaryButtonLabel=${'Cancel'}
      ></payment-widget>`,
    );
    await el.updateComplete;

    const [primaryButton, secondaryButton] =
      el.shadowRoot.querySelectorAll('ui-button');
    expect(primaryButton.label).to.equal('Confirm');
    expect(secondaryButton.label).to.equal('Cancel');

    el.primaryButtonLabel = 'Accept';
    el.secondaryButtonLabel = 'Reject';
    await el.updateComplete;

    const [updatedPrimaryButton, updatedSecondaryButton] =
      el.shadowRoot.querySelectorAll('ui-button');
    expect(updatedPrimaryButton.label).to.equal('Accept');
    expect(updatedSecondaryButton.label).to.equal('Reject');
  });

  it('renders with default properties', async () => {
    el = await fixture(html`<payment-widget></payment-widget>`);
    await el.updateComplete;

    expect(el).to.be.accessible();
    expect(
      el.shadowRoot.querySelector('.payment-date').textContent.trim(),
    ).to.equal('');
    expect(el.shadowRoot.querySelector('#payment-title').textContent).to.equal(
      'Payment',
    );
    expect(
      el.shadowRoot.querySelector('.status-badge').textContent.trim(),
    ).to.equal('Pending');
    expect(
      el.shadowRoot.querySelector('.category-text').textContent.trim(),
    ).to.equal('Transfer');
    expect(
      el.shadowRoot.querySelector('.detail-description').textContent,
    ).to.equal('');

    const headerUiAmount = el.shadowRoot.querySelector(
      'header .amount-display ui-amount',
    );
    expect(headerUiAmount.value).to.equal(0);
    expect(headerUiAmount.currency).to.equal('€');
    expect(headerUiAmount.locale).to.equal(navigator.language || 'en-US');
    expect(headerUiAmount.trend).to.equal('none');

    const mainUiAmount = el.shadowRoot.querySelector(
      'main .amount-display ui-amount',
    );
    expect(mainUiAmount.value).to.equal(0);
    expect(mainUiAmount.currency).to.equal('€');
    expect(mainUiAmount.locale).to.equal(navigator.language || 'en-US');

    const primaryButton = el.shadowRoot.querySelectorAll('ui-button')[0];
    const secondaryButton = el.shadowRoot.querySelectorAll('ui-button')[1];
    expect(primaryButton.label).to.equal('Confirm');
    expect(secondaryButton.label).to.equal('Go to web');
  });

  it('renders with custom properties', async () => {
    const testData = {
      date: '2024-07-20',
      paymentTitle: 'Test Payment Title',
      headerAmount: 5000.75,
      paymentAmount: 150.25,
      currency: '$',
      locale: 'en-US',
      currencyPosition: 'before',
      headerAmountTrend: 'up',
      accountNumber: 'US123456789',
      status: 'Completed',
      category: 'Shopping',
      description: 'Test Description for the payment.',
      bullets: ['Item 1', 'Item 2'],
    };

    el = await fixture(html`
      <payment-widget
        .date=${testData.date}
        .paymentTitle=${testData.paymentTitle}
        .headerAmount=${testData.headerAmount}
        .paymentAmount=${testData.paymentAmount}
        .currency=${testData.currency}
        .locale=${testData.locale}
        .currencyPosition=${testData.currencyPosition}
        .headerAmountTrend=${testData.headerAmountTrend}
        .accountNumber=${testData.accountNumber}
        .status=${testData.status}
        .category=${testData.category}
        .description=${testData.description}
        .bullets=${testData.bullets}
      ></payment-widget>
    `);
    await el.updateComplete;

    expect(
      el.shadowRoot.querySelector('.payment-date').textContent.trim(),
    ).to.equal(testData.date);
    expect(el.shadowRoot.querySelector('#payment-title').textContent).to.equal(
      testData.paymentTitle,
    );
    expect(
      el.shadowRoot.querySelector('.status-badge').textContent.trim(),
    ).to.equal(testData.status);
    expect(
      el.shadowRoot.querySelector('.category-text').textContent.trim(),
    ).to.equal(testData.category);
    expect(
      el.shadowRoot.querySelector('.detail-description').textContent,
    ).to.equal(testData.description);

    const headerUiAmount = el.shadowRoot.querySelector(
      'header .amount-display ui-amount',
    );
    expect(headerUiAmount.value).to.equal(testData.headerAmount);
    expect(headerUiAmount.currency).to.equal(testData.currency);
    expect(headerUiAmount.locale).to.equal(testData.locale);
    expect(headerUiAmount.currencyPosition).to.equal(testData.currencyPosition);
    expect(headerUiAmount.trend).to.equal(testData.headerAmountTrend);

    const mainUiAmount = el.shadowRoot.querySelector(
      'main .amount-display ui-amount',
    );
    expect(mainUiAmount.value).to.equal(testData.paymentAmount);
    expect(mainUiAmount.currency).to.equal(testData.currency);
    expect(mainUiAmount.locale).to.equal(testData.locale);
    expect(mainUiAmount.currencyPosition).to.equal(testData.currencyPosition);

    const bulletListItems = el.shadowRoot.querySelectorAll('.bullets-list li');
    expect(bulletListItems.length).to.equal(testData.bullets.length);
    expect(bulletListItems[0].textContent).to.include(testData.bullets[0]);
    expect(bulletListItems[1].textContent).to.include(testData.bullets[1]);
  });

  it('dispatches payment-confirm event on primary button click', async () => {
    el = await fixture(
      html`<payment-widget
        .headerAmount=${100}
        .currency=${'€'}
        .status=${'Pending'}
        .accountNumber=${'123'}
      ></payment-widget>`,
    );
    await el.updateComplete;

    const uiButtonConfirm = el.shadowRoot.querySelectorAll('ui-button')[0];
    const nativeConfirmButton =
      uiButtonConfirm.shadowRoot.querySelector('button');

    let eventDetail;
    el.addEventListener('payment-confirm', e => {
      eventDetail = e.detail;
    });

    await nativeConfirmButton.click();
    await el.updateComplete;

    expect(eventDetail).to.deep.equal({
      amount: 100,
      currency: '€',
      status: 'Pending',
      accountNumber: '123',
    });
  });

  it('dispatches go-to-web event on secondary button click', async () => {
    el = await fixture(
      html`<payment-widget .headerAmount=${100}></payment-widget>`,
    );
    await el.updateComplete;

    const uiButtonCancel = el.shadowRoot.querySelectorAll('ui-button')[1];
    const nativeCancelButton = uiButtonCancel.shadowRoot.querySelector('a');

    let eventDetail;
    el.addEventListener('go-to-web', e => {
      eventDetail = e.detail;
    });

    await nativeCancelButton.click();
    await el.updateComplete;

    expect(eventDetail).to.deep.equal({ amount: 100 });
  });

  it('renders bullets list when bullets array is not empty', async () => {
    el = await fixture(
      html`<payment-widget
        .bullets=${['Bullet 1', 'Bullet 2']}
      ></payment-widget>`,
    );
    await el.updateComplete;
    const bulletsList = el.shadowRoot.querySelector('.bullets-list');
    expect(bulletsList).to.exist;
    expect(bulletsList.children.length).to.equal(2);
    expect(bulletsList.children[0].textContent).to.include('Bullet 1');
    expect(bulletsList.children[1].textContent).to.include('Bullet 2');
  });

  it('does not render bullets list when bullets array is empty', async () => {
    el = await fixture(html`<payment-widget .bullets=${[]}></payment-widget>`);
    await el.updateComplete;
    const bulletsList = el.shadowRoot.querySelector('.bullets-list');
    expect(bulletsList).to.not.exist;
  });

  it('updates properties dynamically', async () => {
    el = await fixture(
      html`<payment-widget
        .paymentTitle=${'Old Title'}
        .status=${'Old Status'}
      ></payment-widget>`,
    );
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('#payment-title').textContent).to.equal(
      'Old Title',
    );
    expect(
      el.shadowRoot.querySelector('.status-badge').textContent.trim(),
    ).to.equal('Old Status');

    el.paymentTitle = 'New Title';
    el.status = 'New Status';
    await el.updateComplete;

    expect(el.shadowRoot.querySelector('#payment-title').textContent).to.equal(
      'New Title',
    );
    expect(
      el.shadowRoot.querySelector('.status-badge').textContent.trim(),
    ).to.equal('New Status');
  });

  it('uses ui-icon for accountNumber and category-info', async () => {
    el = await fixture(
      html`<payment-widget
        accountNumber="1234"
        category="Food"
      ></payment-widget>`,
    );
    await el.updateComplete;

    const bankIcon = el.shadowRoot.querySelector('.account-number ui-icon');
    expect(bankIcon).to.exist;
    expect(bankIcon.name).to.equal('bank-reduced-logo');

    const carIcon = el.shadowRoot.querySelector('.category-info ui-icon');
    expect(carIcon).to.exist;
    expect(carIcon.name).to.equal('car');
  });

  it('sets header amount trend to up with correct icon and color', async () => {
    el = await fixture(
      html`<payment-widget
        .headerAmount=${1000}
        .headerAmountTrend=${'up'}
      ></payment-widget>`,
    );
    await el.updateComplete;
    const headerUiAmount = el.shadowRoot.querySelector(
      'header .amount-display ui-amount',
    );
    const trendIcon = headerUiAmount.shadowRoot.querySelector('ui-icon');

    expect(headerUiAmount.trend).to.equal('up');
    expect(trendIcon).to.exist;
    expect(trendIcon.name).to.equal('caret-up');
    expect(trendIcon.color).to.equal('#02702a');
  });

  it('sets header amount trend to down with correct icon and color', async () => {
    el = await fixture(
      html`<payment-widget
        .headerAmount=${-500}
        .headerAmountTrend=${'down'}
      ></payment-widget>`,
    );
    await el.updateComplete;
    const headerUiAmount = el.shadowRoot.querySelector(
      'header .amount-display ui-amount',
    );
    const trendIcon = headerUiAmount.shadowRoot.querySelector('ui-icon');

    expect(headerUiAmount.trend).to.equal('down');
    expect(trendIcon).to.exist;
    expect(trendIcon.name).to.equal('caret-down');
    expect(trendIcon.color).to.equal('#aa0f0f');
  });

  it('does not render trend icon when headerAmountTrend is none', async () => {
    el = await fixture(
      html`<payment-widget
        .headerAmount=${100}
        .headerAmountTrend=${'none'}
      ></payment-widget>`,
    );
    await el.updateComplete;
    const headerUiAmount = el.shadowRoot.querySelector(
      'header .amount-display ui-amount',
    );
    const trendIcon = headerUiAmount.shadowRoot.querySelector('ui-icon');

    expect(headerUiAmount.trend).to.equal('none');
    expect(trendIcon).to.not.exist;
  });
});
