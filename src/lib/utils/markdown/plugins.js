// @ts-nocheck

import { visit, SKIP } from 'unist-util-visit';

const copyBtnDefault = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-copy"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
`;

export function rehypeCopyCode() {
  function codeTitle(node) {
    if (node.tagName === 'div') {
      return node.properties.className[0] === 'rehype-code-title';
    }
  }

  return (tree) => {
    visit(tree, codeTitle, (node) => {
      if (node.type !== 'element') return;

      const value =
        node.children[0].type === 'text' ? node.children[0].value : '';

      node.children = [
        {
          type: 'element',
          tagName: 'span',
          children: [{ type: 'text', value }],
        },
        {
          type: 'element',
          tagName: 'button',
          properties: { className: ['copy'] },
          children: [
            {
              type: 'raw',
              value: copyBtnDefault,
            },
          ],
        },
      ];
    });
  };
}

export function rehypeUnwrapImages() {
  function containsImage(node) {
    return (
      node.tagName === 'p' &&
      node.children.some((child) => {
        if (child.type === 'element') {
          return child.tagName === 'img';
        }
      })
    );
  }

  return (tree) => {
    visit(tree, containsImage, (node, index, parent) => {
      if (node.type === 'element') {
        parent.children.splice(index, 1, ...node.children);
        return [SKIP, index];
      }
    });
  };
}
