import { html } from 'lit';
import './ui-button.js';

export default {
  title: 'Atoms/UiButton',
  component: 'ui-button',
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
  },
};

const Template = ({ label, variant, disabled }) => html`
  <ui-button
    .label=${label}
    .variant=${variant}
    ?disabled=${disabled}
  ></ui-button>
`;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Default Button',
  variant: 'primary',
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  variant: 'primary',
  disabled: true,
};

export const CustomLabel = Template.bind({});
CustomLabel.args = {
  label: 'Custom Label',
  variant: 'primary',
  disabled: false,
};
