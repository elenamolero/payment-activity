import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './ui-button.js';

describe('UiButton', () => {
  it('renders a button with the default label', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.textContent.trim()).to.equal('Click me');
  });

  it('renders a button with a custom label', async () => {
    const el = await fixture(html`<ui-button label="Submit"></ui-button>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.textContent.trim()).to.equal('Submit');
  });

  it('dispatches ui-button-click event on click', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    let clicked = false;
    el.addEventListener('ui-button-click', () => {
      clicked = true;
    });
    el.shadowRoot.querySelector('button').click();
    expect(clicked).to.be.true;
  });

  it('renders primary variant by default', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.classList.contains('ui-button--primary')).to.be.true;
  });

  it('renders secondary variant when specified', async () => {
    const el = await fixture(html`<ui-button variant="secondary"></ui-button>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.classList.contains('ui-button--secondary')).to.be.true;
  });

  it('disables button when disabled prop is true', async () => {
    const el = await fixture(html`<ui-button disabled></ui-button>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.disabled).to.be.true;
  });

  it('does not dispatch event when disabled', async () => {
    const el = await fixture(html`<ui-button disabled></ui-button>`);
    let clicked = false;
    el.addEventListener('ui-button-click', () => {
      clicked = true;
    });
    el.shadowRoot.querySelector('button').click();
    expect(clicked).to.be.false;
  });

  it('triggers click on Enter key', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    let clicked = false;
    el.addEventListener('ui-button-click', () => {
      clicked = true;
    });
    const button = el.shadowRoot.querySelector('button');
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    button.dispatchEvent(event);
    expect(clicked).to.be.true;
  });

  it('triggers click on Space key', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    let clicked = false;
    el.addEventListener('ui-button-click', () => {
      clicked = true;
    });
    const button = el.shadowRoot.querySelector('button');
    const event = new KeyboardEvent('keydown', { key: ' ' });
    button.dispatchEvent(event);
    expect(clicked).to.be.true;
  });

  it('does not trigger click on other keys', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    let clicked = false;
    el.addEventListener('ui-button-click', () => {
      clicked = true;
    });
    const button = el.shadowRoot.querySelector('button');
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    button.dispatchEvent(event);
    expect(clicked).to.be.false;
  });

  it('sets correct aria-label', async () => {
    const el = await fixture(html`<ui-button label="Submit Form"></ui-button>`);
    const button = el.shadowRoot.querySelector('button');
    expect(button.getAttribute('aria-label')).to.equal('Submit Form');
  });

  it('updates label when property changes', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    el.label = 'New Label';
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    expect(button.textContent.trim()).to.equal('New Label');
  });

  it('updates variant class when property changes', async () => {
    const el = await fixture(html`<ui-button></ui-button>`);
    expect(
      el.shadowRoot
        .querySelector('button')
        .classList.contains('ui-button--primary'),
    ).to.be.true;
    el.variant = 'secondary';
    await el.updateComplete;
    const button = el.shadowRoot.querySelector('button');
    expect(button.classList.contains('ui-button--secondary')).to.be.true;
    expect(button.classList.contains('ui-button--primary')).to.be.false;
  });

  it('renders as link when href is provided', async () => {
    const el = await fixture(
      html`<ui-button href="https://example.com"></ui-button>`,
    );
    const link = el.shadowRoot.querySelector('a');
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('https://example.com');
  });

  it('opens link in new tab when href is provided', async () => {
    const el = await fixture(
      html`<ui-button href="https://example.com"></ui-button>`,
    );
    const link = el.shadowRoot.querySelector('a');
    expect(link.getAttribute('target')).to.equal('_blank');
  });

  it('dispatches event when link is clicked', async () => {
    const el = await fixture(
      html`<ui-button href="https://example.com"></ui-button>`,
    );
    let clicked = false;
    el.addEventListener('ui-button-click', () => {
      clicked = true;
    });
    el.shadowRoot.querySelector('a').click();
    expect(clicked).to.be.true;
  });
});
