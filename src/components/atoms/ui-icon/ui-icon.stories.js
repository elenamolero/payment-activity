import { html } from 'lit';
import './ui-icon.js';
import { getAvailableIcons } from './ui-icon-store.js';

export default {
  title: 'Atoms/UiIcon',
  component: 'ui-icon',
  argTypes: {
    name: {
      control: 'select',
      options: getAvailableIcons(),
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'default', 'm', 'l', 'xl'],
    },
    color: { control: 'color' },
    iconTitle: { control: 'text' },
    decorative: { control: 'boolean' },
  },
};

const Template = ({ name, size, color, iconTitle, decorative }) => html`
  <ui-icon
    .name=${name}
    .size=${size}
    .color=${color}
    .iconTitle=${iconTitle}
    ?decorative=${decorative}
  ></ui-icon>
`;

export const Default = Template.bind({});
Default.args = {
  name: 'paper-plane',
  size: 'default',
  color: 'currentColor',
  iconTitle: '',
  decorative: false,
};

export const PaperPlane = Template.bind({});
PaperPlane.args = {
  name: 'paper-plane',
  size: 'm',
  color: '#3b82f6',
  iconTitle: 'Send message',
  decorative: false,
};
