import { html } from 'lit';
import '../src/components/payment-widget/PaymentWidget.js';

export default {
  title: 'PaymentWidget',
  component: 'payment-widget',
  argTypes: {
    header: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

function Template({ header = 'Hello world', counter = 5, textColor, slot }) {
  return html`
    <payment-widget
      style="--payment-widget-text-color: ${textColor || 'black'}"
      .header=${header}
      .counter=${counter}
    >
      ${slot}
    </payment-widget>
  `;
}

export const Regular = Template.bind({});

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  header: 'My header',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
