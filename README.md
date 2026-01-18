# \<payment-widget>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i payment-widget
```

## Usage

```html
<script type="module">
  import 'payment-widget/ui-payment-widget.js';
</script>

<payment-widget></payment-widget>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

## Demoing with Storybook

To run a local instance of Storybook, run

```bash
npm run storybook
```
## Technical decitions


```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

## Technical Decisions

### Design Interpretations
* **Transaction Context:** The parent component is interpreted as a payment transaction card. To represent this meaning, buttons are assigned specific semantic meanings within this context, utilizing the ui-button subcomponent to ensure consistency and ease of integration.
* **Accessibility & Semantics:** The element labeled "Link" is semantically implemented as an anchor (link) but styled visually as a button. This ensures the component meets web accessibility standards while maintaining the intended design aesthetic.
* **Financial Indicators:** The amount displayed in the upper right corner is interpreted as the account balance. It includes an icon that dynamically represents whether the financial trend is positive or negative.
* **Theming:** A secondary file, dark-index.html, is provided to demonstrate the main component's Dark Mode capabilities, highlighting its reusability and visual flexibility keeping its meaning.

### Architecture & Components
* **Core Subcomponents:** The system is built around three high-utility subcomponents designed for maximum reusability:
    * **Button:** For standardized user interactions.
    * **Amount:** Specifically designed to represent monetary values and currencies.
    * **Icon:** A centralized system for managing visual assets.
* **DOM Strategy (Shadow vs. Light):** While most components use Shadow DOM to maintain strict style encapsulation, the Icon component works within the Light DOM. This specific decision allows the icon component to be easily ported to other projects, enabling developers to define a new iconSet as needed without having to edit the icon component.

## Accessibility Considerations

* **Keyboard Interaction:** The `UiButton` component is fully accessible via keyboard, ensuring all interactive elements can be focused and triggered using standard navigation keys.
* **Visual States and Feedback:** * The cursor changes to `pointer` upon hovering over interactive buttons.
    * When a button is in a **disabled** state, the cursor changes to `not-allowed`, providing immediate visual feedback about the element's inactivity.
* **Assistive Technology Optimization:**
    * **Decorative Icons:** Purely decorative icons are hidden from screen readers to avoid unnecessary noise in the vocal interface.
    * **Semantic HTML:** The component is built using standard HTML tags that provide inherent structure and meaning to the document.
    * **ARIA Attributes & Hidden Info:** We utilize `aria-*` labels and include additional descriptive text—hidden visually but accessible to screen readers to provide extra context and support for users with visual impairments.

