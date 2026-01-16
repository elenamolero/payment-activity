const config = {
  stories: [
    '../stories/*.stories.{js,md,mdx}',
    '../src/**/*.stories.{js,md,mdx}',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@web/storybook-framework-web-components',
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
