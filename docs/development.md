# Development

## Best practices

### Svelte

See `.prettierrc.js` for prettier configuration for Svelte (3).

#### Components

- Component structure:

  As opposed to default component markup created by most Svelte itself, reverse the declaration; markup, style and last script. This to make it more readable, structure first, details later.
  If you need to export functionality from the component to be used in other contexts, without component rendering, use the module context script.

  1. Component Markup
  2. Style block
  3. Script block
  4. Script context="module"

- Component naming

  Inside the components folder you will find:

  - layouts; `{Component}Layout.svelte`
  - pages; `{Component}Page.svelte`
  - forms; `{Component}Form.svelte`

### HTML

- Attribute priority: role, for, id, element specific attributes, global attributes, class, data-attributes, aria-attributes.

  This way we can write consistent elements and know what to expect where.

- html id naming:

  - `Component`
  - `Component__property`
  - `Component--SubComponent`
  - `hash` or `a-very-long-hash` intended for document section identification / url hashes.

### JavaScript

- Variable naming:

  - `Class` or `HTMLElement` or `Component`
  - `property` or `longPropertyNames`
  - `CONSTANT` or `LONG_CONSTANT`
