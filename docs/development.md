# Development

## Best practices

### Svelte

- Component structure:

  As opposed to default component markup created by most Svelte itself, reverse the declaration; markup, style and last script. This to make it more readable, structure first, details later.
  Within Sapper context, write the module script on top, this is read before rendering the svelte component.

  0. Script context="module" (Sapper)
  1. Component Markup
  2. Style block
  3. Script block

### HTML

- Attribute priority: role, for, id, element specific attributes, global attributes, class, data-attributes, aria-attributes.

  This way we can write consistent elements and know what to expect where.

- html id naming:

  - `Component`
  - `Component__property`
  - `Component--modifier` or `Component__property--modifier`
  - `hash` or `a-very-long-hash` intended for document section identification.

### JavaScript

- Variable naming:

  - `Class` or `HTMLElement` or `Component`
  - `property` or `longPropertyNames`
  - `CONSTANT` or `LONG_CONSTANT`
