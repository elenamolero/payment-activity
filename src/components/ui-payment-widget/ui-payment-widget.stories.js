import { html } from 'lit';
import './ui-payment-widget.js';

export default {
  title: 'Components/PaymentWidget',
  component: 'payment-widget',
  argTypes: {
    date: { control: 'text' },
    paymentTitle: { control: 'text' },
    headerAmount: { control: 'number' },
    paymentAmount: { control: 'number' },
    currency: {
      control: 'select',
      options: ['€', '$', '£', '¥', 'CHF'],
    },
    locale: {
      control: 'select',
      options: ['es-ES', 'en-US', 'de-DE', 'fr-FR', 'ja-JP', 'en-GB'],
    },
    currencyPosition: {
      control: 'select',
      options: ['before', 'after'],
    },
    headerAmountTrend: {
      control: 'select',
      options: ['up', 'down', 'none'],
    },
    status: { control: 'text' },
    accountNumber: { control: 'text' },
    category: { control: 'text' },
    description: { control: 'text' },
    bullets: { control: 'object' },
  },
};

const Template = ({
  date,
  paymentTitle,
  headerAmount,
  paymentAmount,
  currency,
  locale,
  currencyPosition,
  headerAmountTrend,
  accountNumber,
  status,
  category,
  description,
  bullets,
}) => html`
  <payment-widget
    .date=${date}
    .paymentTitle=${paymentTitle}
    .headerAmount=${headerAmount}
    .paymentAmount=${paymentAmount}
    .currency=${currency}
    .locale=${locale}
    .currencyPosition=${currencyPosition}
    .headerAmountTrend=${headerAmountTrend}
    .accountNumber=${accountNumber}
    .status=${status}
    .category=${category}
    .description=${description}
    .bullets=${bullets}
  ></payment-widget>
`;

export const WithBullets = Template.bind({});
WithBullets.args = {
  date: '2024-06-15',
  paymentTitle: 'Transfer Payment',
  headerAmount: 91234.56,
  paymentAmount: 1234.56,
  currency: '€',
  locale: 'es-ES',
  currencyPosition: 'after',
  headerAmountTrend: 'up',
  status: 'Pending',
  accountNumber: 'ES21 1234 0000 0000 0000 0000',
  category: 'Transfer',
  description: 'Payment to Elena Molero Padilla',
  bullets: [
    'Milk, bread, eggs',
    'Fresh fruits and vegetables',
    'Cleaning supplies',
  ],
};
