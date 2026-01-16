import { html } from 'lit';
import './ui-amount.js';
import '../ui-icon/ui-icon-set.js';

export default {
  title: 'Atoms/UiAmount',
  component: 'ui-amount',
  argTypes: {
    value: { control: 'number' },
    currency: { control: 'text' },
    locale: {
      control: 'select',
      options: ['en-US', 'es-ES', 'de-DE', 'fr-FR', 'ja-JP', 'en-GB'],
    },
    currencyPosition: {
      control: 'select',
      options: ['before', 'after'],
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l', 'xl'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'none'],
    },
  },
};

const Template = ({
  value,
  currency,
  locale,
  currencyPosition,
  size,
  trend,
}) => html`
  <ui-icon-set></ui-icon-set>
  <ui-amount
    .value=${value}
    .currency=${currency}
    .locale=${locale}
    .currencyPosition=${currencyPosition}
    .size=${size}
    .trend=${trend}
  ></ui-amount>
`;

export const Default = Template.bind({});
Default.args = {
  value: 1234.56,
  currency: '€',
  locale: 'es-ES',
  currencyPosition: 'after',
  size: 'm',
  trend: 'none',
};

export const USDollar = Template.bind({});
USDollar.args = {
  value: 5000.0,
  currency: '$',
  locale: 'en-US',
  currencyPosition: 'before',
  size: 'l',
  trend: 'up',
};

export const GBPound = Template.bind({});
GBPound.args = {
  value: 789.99,
  currency: '£',
  locale: 'en-GB',
  currencyPosition: 'before',
  size: 'm',
  trend: 'down',
};

export const Bitcoin = Template.bind({});
Bitcoin.args = {
  value: 0.05432,
  currency: '₿',
  locale: 'en-US',
  currencyPosition: 'before',
  size: 's',
  trend: 'none',
};

export const CustomPoints = Template.bind({});
CustomPoints.args = {
  value: 9999.99,
  currency: 'pts',
  locale: 'es-ES',
  currencyPosition: 'after',
  size: 'xl',
  trend: 'up',
};

export const AllSizes = () => html`
  <ui-icon-set></ui-icon-set>
  <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Size: s</label
      >
      <ui-amount
        .value=${1234.56}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'s'}
        .trend=${'up'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Size: m</label
      >
      <ui-amount
        .value=${1234.56}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'m'}
        .trend=${'up'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Size: l</label
      >
      <ui-amount
        .value=${1234.56}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'l'}
        .trend=${'up'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Size: xl</label
      >
      <ui-amount
        .value=${1234.56}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'xl'}
        .trend=${'up'}
      ></ui-amount>
    </div>
  </div>
`;

AllSizes.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
};

export const AllTrends = () => html`
  <ui-icon-set></ui-icon-set>
  <div style="display: flex; gap: 2rem; padding: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Trend: up</label
      >
      <ui-amount
        .value=${5000.0}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'m'}
        .trend=${'up'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Trend: down</label
      >
      <ui-amount
        .value=${-1234.56}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'m'}
        .trend=${'down'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >Trend: none</label
      >
      <ui-amount
        .value=${1234.56}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'m'}
        .trend=${'none'}
      ></ui-amount>
    </div>
  </div>
`;

AllTrends.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
};

export const AllLocales = () => html`
  <ui-icon-set></ui-icon-set>
  <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >en-US</label
      >
      <ui-amount
        .value=${12345.67}
        .currency=${'$'}
        .locale=${'en-US'}
        .currencyPosition=${'before'}
        .size=${'m'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >es-ES</label
      >
      <ui-amount
        .value=${12345.67}
        .currency=${'€'}
        .locale=${'es-ES'}
        .currencyPosition=${'after'}
        .size=${'m'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >de-DE</label
      >
      <ui-amount
        .value=${12345.67}
        .currency=${'€'}
        .locale=${'de-DE'}
        .currencyPosition=${'after'}
        .size=${'m'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >fr-FR</label
      >
      <ui-amount
        .value=${12345.67}
        .currency=${'€'}
        .locale=${'fr-FR'}
        .currencyPosition=${'after'}
        .size=${'m'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >ja-JP</label
      >
      <ui-amount
        .value=${12345.67}
        .currency=${'¥'}
        .locale=${'ja-JP'}
        .currencyPosition=${'before'}
        .size=${'m'}
      ></ui-amount>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;"
        >en-GB</label
      >
      <ui-amount
        .value=${12345.67}
        .currency=${'£'}
        .locale=${'en-GB'}
        .currencyPosition=${'before'}
        .size=${'m'}
      ></ui-amount>
    </div>
  </div>
`;

AllLocales.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
};
