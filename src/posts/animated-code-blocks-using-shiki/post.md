---
title: Animated Code Blocks Using Shiki Magic Move
description: Using the framework agnostic Shiki Magic Move library in Svelte for smoothly animated code blocks.
datePublished: '2024-05-13'
dateModified: '2024-05-13'
---

## Markdown

Hey friends! 👋

```ts:exemplo.ts
const mdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await createHighlighter({
        themes: ['aurora-x'],
        langs: ['javascript', 'typescript'],
      })

      await highlighter.loadLanguage('javascript', 'typescript')

      const html = escapeSvelte(
        highlighter.codeToHtml(code, { lang, theme: 'aurora-x' })
      )
      return `{@html \`${html}\` }` // [!code highlight]
    },
  },
}
```

```js {1,3-4}
console.log('1')
console.log('2')
console.log('3')
console.log('4')
```
