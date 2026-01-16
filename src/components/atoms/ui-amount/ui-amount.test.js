import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { UiAmount } from './ui-amount.js';

import '../ui-icon/ui-icon-set.js';

describe('UiAmount', () => {
  beforeEach(async () => {
    const iconSet = await fixture(html`<ui-icon-set></ui-icon-set>`);
    document.body.appendChild(iconSet);
  });

  afterEach(() => {
    const iconSets = document.querySelectorAll('ui-icon-set');
    iconSets.forEach(iconSet => iconSet.remove());
  });

  it('renders with default properties', async () => {
    const el = await fixture(html`<ui-amount></ui-amount>`);
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span).to.exist;
    expect(span.textContent).to.include('€');
    expect(span.textContent).to.include('0');
  });

  it('formats value with currency symbol', async () => {
    const el = await fixture(html`<ui-amount .value=${1234.56}></ui-amount>`);
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('1234');
    expect(span.textContent).to.include('56');
    expect(span.textContent).to.include('€');
  });

  it('applies currencyPosition before', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${100}
        .currency=${'$'}
        .currencyPosition=${'before'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent.trim().startsWith('$')).to.be.true;
  });

  it('applies currencyPosition after', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${100}
        .currency=${'€'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent.trim().endsWith('€')).to.be.true;
  });

  it('formats numbers according to locale es-ES', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${1234.56}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('1234,56');
  });

  it('formats numbers according to locale es-ES', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${11234.56}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('11.234,56');
  });

  it('formats numbers according to locale en-US', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${1234.56}
        .locale=${'en-US'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('1,234.56');
  });

  it('formats numbers according to locale de-DE', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${1234.56}
        .locale=${'de-DE'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('1.234,56');
  });

  it('renders with custom currency symbol', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${100}
        .currency=${'₿'}
        .currencyPosition=${'before'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('₿');
  });

  it('renders with size s', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .size=${'s'}></ui-amount>`,
    );
    const amount = el.shadowRoot.querySelector('.ui-amount');
    expect(amount.classList.contains('ui-amount--s')).to.be.true;
  });

  it('renders with size m', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .size=${'m'}></ui-amount>`,
    );
    const amount = el.shadowRoot.querySelector('.ui-amount');
    expect(amount.classList.contains('ui-amount--m')).to.be.true;
  });

  it('renders with size l', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .size=${'l'}></ui-amount>`,
    );
    const amount = el.shadowRoot.querySelector('.ui-amount');
    expect(amount.classList.contains('ui-amount--l')).to.be.true;
  });

  it('renders with size xl', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .size=${'xl'}></ui-amount>`,
    );
    const amount = el.shadowRoot.querySelector('.ui-amount');
    expect(amount.classList.contains('ui-amount--xl')).to.be.true;
  });

  it('defaults to size m for invalid size', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .size=${'invalid'}></ui-amount>`,
    );
    const amount = el.shadowRoot.querySelector('.ui-amount');
    expect(amount.classList.contains('ui-amount--m')).to.be.true;
  });

  it('renders trend icon up', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .trend=${'up'}></ui-amount>`,
    );
    const icon = el.shadowRoot.querySelector('ui-icon');
    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('caret-up');
    expect(icon.getAttribute('color')).to.equal('#02702a');
  });

  it('renders trend icon down', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .trend=${'down'}></ui-amount>`,
    );
    const icon = el.shadowRoot.querySelector('ui-icon');
    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('caret-down');
    expect(icon.getAttribute('color')).to.equal('#aa0f0f');
  });

  it('does not render trend icon when trend is none', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .trend=${'none'}></ui-amount>`,
    );
    const icon = el.shadowRoot.querySelector('ui-icon');
    expect(icon).to.not.exist;
  });

  it('defaults to trend none for invalid trend', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .trend=${'invalid'}></ui-amount>`,
    );
    const icon = el.shadowRoot.querySelector('ui-icon');
    expect(icon).to.not.exist;
  });

  it('formats negative values correctly', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${-1234.56}
        .currency=${'$'}
        .locale=${'en-US'}
        .currencyPosition=${'before'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('-');
  });

  it('formats zero value correctly', async () => {
    const el = await fixture(
      html`<ui-amount .value=${0} .currency=${'€'}></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('0');
    expect(span.textContent).to.include('€');
  });

  it('formats large values correctly', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${1000000.99}
        .locale=${'en-US'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.match(/1.*000.*000.*99/);
  });

  it('updates when value changes', async () => {
    const el = await fixture(html`<ui-amount .value=${100}></ui-amount>`);
    el.value = 200;
    await el.updateComplete;
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('200');
  });

  it('updates when currency changes', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .currency=${'€'}></ui-amount>`,
    );
    el.currency = '$';
    el.currencyPosition = 'before';
    await el.updateComplete;
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    expect(span.textContent).to.include('$');
  });

  it('updates when locale changes', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${12345.67}
        .locale=${'en-US'}
        .currencyPosition=${'after'}
      ></ui-amount>`,
    );
    expect(
      el.shadowRoot.querySelector('.ui-amount__value').textContent,
    ).to.equal('12,345.67 €');
    el.locale = 'es-ES';
    await el.updateComplete;
    expect(
      el.shadowRoot.querySelector('.ui-amount__value').textContent,
    ).to.equal('12.345,67 €');
  });

  it('updates when trend changes', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .trend=${'none'}></ui-amount>`,
    );
    expect(el.shadowRoot.querySelector('ui-icon')).to.not.exist;
    el.trend = 'up';
    await el.updateComplete;
    const icon = el.shadowRoot.querySelector('ui-icon');
    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('caret-up');
  });

  it('updates when size changes', async () => {
    const el = await fixture(
      html`<ui-amount .value=${100} .size=${'m'}></ui-amount>`,
    );
    expect(
      el.shadowRoot
        .querySelector('.ui-amount')
        .classList.contains('ui-amount--m'),
    ).to.be.true;
    el.size = 'xl';
    await el.updateComplete;
    const amount = el.shadowRoot.querySelector('.ui-amount');
    expect(amount.classList.contains('ui-amount--xl')).to.be.true;
    expect(amount.classList.contains('ui-amount--m')).to.be.false;
  });

  it('validates size through static method', () => {
    expect(UiAmount._validateSize('xl')).to.equal('xl');
    expect(UiAmount._validateSize('invalid')).to.equal('m');
    expect(UiAmount._validateSize('')).to.equal('m');
  });

  it('validates trend through static method', () => {
    expect(UiAmount._validateTrend('up')).to.equal('up');
    expect(UiAmount._validateTrend('down')).to.equal('down');
    expect(UiAmount._validateTrend('invalid')).to.equal('none');
  });

  it('validates position through static method', () => {
    expect(UiAmount._validatePosition('before')).to.equal('before');
    expect(UiAmount._validatePosition('after')).to.equal('after');
    expect(UiAmount._validatePosition('invalid')).to.equal('after');
  });

  it('renders with all properties combined', async () => {
    const el = await fixture(
      html`<ui-amount
        .value=${54321.99}
        .currency=${'CHF'}
        .locale=${'de-DE'}
        .size=${'l'}
        .trend=${'up'}
        .currencyPosition=${'before'}
      ></ui-amount>`,
    );
    const amount = el.shadowRoot.querySelector('.ui-amount');
    const span = el.shadowRoot.querySelector('.ui-amount__value');
    const icon = el.shadowRoot.querySelector('ui-icon');
    expect(amount.classList.contains('ui-amount--l')).to.be.true;
    expect(span.textContent).to.equal('CHF 54.321,99');
    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('caret-up');
  });

  it('has inline-flex display', async () => {
    const el = await fixture(html`<ui-amount></ui-amount>`);
    const styles = window.getComputedStyle(el);
    expect(styles.display).to.equal('inline-flex');
  });
});
