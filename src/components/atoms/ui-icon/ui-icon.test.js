import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './ui-icon-set.js';
import { UiIcon } from './ui-icon.js';

describe('UiIcon', () => {
  beforeEach(async () => {
    const iconSet = await fixture(html`<ui-icon-set></ui-icon-set>`);
    document.body.appendChild(iconSet);
  });

  afterEach(() => {
    const iconSets = document.querySelectorAll('ui-icon-set');
    iconSets.forEach(iconSet => iconSet.remove());
  });

  it('renders an empty template when no name is provided', async () => {
    const el = await fixture(html`<ui-icon></ui-icon>`);
    expect(el.shadowRoot).to.be.null;
    expect(el.innerHTML).to.include('<!--');
  });

  it('renders an icon with default properties', async () => {
    const el = await fixture(html`<ui-icon name="paper-plane"></ui-icon>`);
    const span = el.querySelector('.ui-icon');
    const svg = el.querySelector('svg');
    const use = el.querySelector('use');

    expect(span).to.exist;
    expect(svg).to.exist;
    expect(use).to.exist;
    expect(use.getAttribute('href')).to.equal('#paper-plane');
    expect(span.classList.contains('ui-icon--default')).to.be.true;
  });

  it('validates and applies size correctly', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" size="xl"></ui-icon>`,
    );
    const span = el.querySelector('.ui-icon');
    expect(span.classList.contains('ui-icon--xl')).to.be.true;
  });

  it('falls back to default size for invalid size', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" size="invalid"></ui-icon>`,
    );
    const span = el.querySelector('.ui-icon');
    expect(span.classList.contains('ui-icon--default')).to.be.true;
  });

  it('sets custom color on use element', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" color="#ff0000"></ui-icon>`,
    );
    const use = el.querySelector('use');
    expect(use.getAttribute('fill')).to.equal('#ff0000');
  });

  it('uses currentColor as default color', async () => {
    const el = await fixture(html`<ui-icon name="paper-plane"></ui-icon>`);
    const use = el.querySelector('use');
    expect(use.getAttribute('fill')).to.equal('currentColor');
  });

  it('renders with custom description', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" description="Send message"></ui-icon>`,
    );
    const title = el.querySelector('title');
    expect(title.textContent).to.equal('Send message');
  });

  it('generates default title from name when no description provided', async () => {
    const el = await fixture(html`<ui-icon name="paper-plane"></ui-icon>`);
    const svg = el.querySelector('svg');
    expect(svg.getAttribute('aria-label')).to.equal('paper plane');
  });

  it('renders as decorative when decorative=true', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" decorative></ui-icon>`,
    );
    const span = el.querySelector('.ui-icon');
    const svg = el.querySelector('svg');

    expect(span.getAttribute('aria-hidden')).to.equal('true');
    expect(svg.getAttribute('role')).to.equal('presentation');
    expect(svg.hasAttribute('aria-label')).to.be.false;
  });

  it('renders as semantic when decorative=false', async () => {
    const el = await fixture(html`<ui-icon name="paper-plane"></ui-icon>`);
    const span = el.querySelector('.ui-icon');
    const svg = el.querySelector('svg');

    expect(span.getAttribute('aria-hidden')).to.equal('false');
    expect(svg.getAttribute('role')).to.equal('img');
    expect(svg.hasAttribute('aria-label')).to.be.true;
  });

  it('updates when properties change', async () => {
    const el = await fixture(html`<ui-icon name="paper-plane"></ui-icon>`);

    el.size = 'xl';
    await el.updateComplete;
    const span = el.querySelector('.ui-icon');
    expect(span.classList.contains('ui-icon--xl')).to.be.true;

    el.color = '#00ff00';
    await el.updateComplete;
    const use = el.querySelector('use');
    expect(use.getAttribute('fill')).to.equal('#00ff00');

    el.name = 'car';
    await el.updateComplete;
    const updatedUse = el.querySelector('use');
    expect(updatedUse.getAttribute('href')).to.equal('#car');
  });

  it('validates size through static method', () => {
    expect(UiIcon._validateSize('xl')).to.equal('xl');
    expect(UiIcon._validateSize('invalid')).to.equal('default');
    expect(UiIcon._validateSize('')).to.equal('default');
    expect(UiIcon._validateSize(null)).to.equal('default');
  });

  it('returns validated size through getter', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" size="xl"></ui-icon>`,
    );
    expect(el.validatedSize).to.equal('xl');

    el.size = 'invalid';
    expect(el.validatedSize).to.equal('default');
  });

  it('includes title element when description is provided', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" description="Custom title"></ui-icon>`,
    );
    const title = el.querySelector('title');
    expect(title).to.exist;
    expect(title.textContent).to.equal('Custom title');
  });

  it('does not include title element when no description and decorative', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" decorative></ui-icon>`,
    );
    const title = el.querySelector('title');
    expect(title).to.not.exist;
  });

  it('applies CSS custom properties for sizing', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" size="xl"></ui-icon>`,
    );
    const span = el.querySelector('.ui-icon');
    expect(span.classList.contains('ui-icon--xl')).to.be.true;
  });

  it('handles empty name gracefully', async () => {
    const el = await fixture(html`<ui-icon name=""></ui-icon>`);
    expect(el.innerHTML).to.include('<!--');
  });

  it('maintains accessibility attributes correctly', async () => {
    const semanticEl = await fixture(
      html`<ui-icon name="paper-plane"></ui-icon>`,
    );
    const semanticSvg = semanticEl.querySelector('svg');
    expect(semanticSvg.getAttribute('role')).to.equal('img');
    expect(semanticSvg.getAttribute('aria-label')).to.equal('paper plane');

    const decorativeEl = await fixture(
      html`<ui-icon name="paper-plane" decorative></ui-icon>`,
    );
    const decorativeSpan = decorativeEl.querySelector('.ui-icon');
    const decorativeSvg = decorativeEl.querySelector('svg');
    expect(decorativeSpan.getAttribute('aria-hidden')).to.equal('true');
    expect(decorativeSvg.getAttribute('role')).to.equal('presentation');
  });

  it('uses description as aria-label when provided', async () => {
    const el = await fixture(
      html`<ui-icon name="paper-plane" description="Send message"></ui-icon>`,
    );
    const svg = el.querySelector('svg');
    expect(svg.getAttribute('aria-label')).to.equal('Send message');
    const title = el.querySelector('title');
    expect(title.textContent).to.equal('Send message');
  });

  it('includes title element when description provided in decorative mode', async () => {
    const el = await fixture(
      html`<ui-icon
        name="paper-plane"
        description="Send message"
        decorative
      ></ui-icon>`,
    );
    const title = el.querySelector('title');
    expect(title).to.exist;
    expect(title.textContent).to.equal('Send message');

    const svg = el.querySelector('svg');
    expect(svg.getAttribute('role')).to.equal('presentation');
    expect(svg.hasAttribute('aria-label')).to.be.false;
  });
});
