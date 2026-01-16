import { html } from 'lit';
import './ui-icon.js';
import './ui-icon-set.js';

const availableIcons = [
  'paper-plane',
  'car',
  'caret-down',
  'list-dots',
  'bank-reduced-logo',
];

export default {
  title: 'Atoms/UiIcon',
  component: 'ui-icon',
  argTypes: {
    name: {
      control: 'select',
      options: availableIcons,
    },
    size: {
      control: 'select',
      options: ['xs', 's', 'default', 'm', 'l', 'xl'],
    },
    color: { control: 'color' },
    description: { control: 'text' },
    decorative: { control: 'boolean' },
  },
};

const Template = ({ name, size, color, description, decorative }) => html`
  <ui-icon-set></ui-icon-set>
  <ui-icon
    .name=${name}
    .size=${size}
    .color=${color}
    .description=${description}
    ?decorative=${decorative}
  ></ui-icon>
`;

export const Icons = Template.bind({});
Icons.args = {
  name: 'paper-plane',
  size: 'default',
  color: 'currentColor',
  description: '',
  decorative: false,
};

export const AllSizes = () => html`
  <ui-icon-set></ui-icon-set>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <div style="text-align: center;">
      <ui-icon name="paper-plane" size="xs" color="#3b82f6"></ui-icon>
      <div>xs</div>
    </div>
    <div style="text-align: center;">
      <ui-icon name="paper-plane" size="s" color="#3b82f6"></ui-icon>
      <div>s</div>
    </div>
    <div style="text-align: center;">
      <ui-icon name="paper-plane" size="default" color="#3b82f6"></ui-icon>
      <div>default</div>
    </div>
    <div style="text-align: center;">
      <ui-icon name="paper-plane" size="m" color="#3b82f6"></ui-icon>
      <div>m</div>
    </div>
    <div style="text-align: center;">
      <ui-icon name="paper-plane" size="l" color="#3b82f6"></ui-icon>
      <div>l</div>
    </div>
    <div style="text-align: center;">
      <ui-icon name="paper-plane" size="xl" color="#3b82f6"></ui-icon>
      <div>xl</div>
    </div>
  </div>
`;

AllSizes.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
};
