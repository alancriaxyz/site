import matter from 'gray-matter'
import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkTableofContents from 'remark-toc'
import toHtmlAST from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import { transformerNotationHighlight } from '@shikijs/transformers'
import { rehypeCopyCode, rehypeUnwrapImages } from './plugins.js'
import toHtmlString from 'rehype-stringify'

const images = `https://raw.githubusercontent.com/mattcroat/joy-of-code/main/posts`

/**
 * Returns post slug.
 * @param {string} filename
 */
function getSlug(filename) {
	return filename.split('/').at(-1)?.replace('.md', '') ?? ''
}

/**
 * Exports post metadata.
 * @param {string} content
 */
function frontmatter(content) {
	const { content: markdown, data } = matter(content)
	const meta = `
		<script context="module">
			export const metadata = ${JSON.stringify(data)}
		</script>
	`
	return { meta, markdown }
}

/**
 * Markdown preprocessor.
 * @param {string} content
 * @param {string} slug
 */
async function parseMarkdown(content, slug) {
	const replacedContent = searchAndReplace(content, slug)
	const parsedMarkdown = await markdownProcessor.process(replacedContent)
	return parsedMarkdown.toString()
}

/**
 * Search and replace Markdown.
 * @param {string} content
 * @param {string} slug
 */
function searchAndReplace(content, slug) {
	const embed = /{% embed src="(.*?)" title="(.*?)" %}/g
	const video = /{% video src="(.*?)" %}/g
	const image = /{% img src="(.*?)" alt="(.*?)" %}/g
	const youtube = /{% youtube id="(.*?)" title="(.*?)" %}/g

	return content
		.replace(embed, (_, src, title) => {
			return `
        <iframe
          title="${title}"
          src="${src}"
          loading="lazy"
        ></iframe>
      `.trim()
		})
		.replace(video, (_, src) => {
			return `
        <video controls>
          <source
            src="${images}/${slug}/images/${src}"
            type="video/mp4"
          />
        </video>
      `.trim()
		})
		.replace(image, (_, src, alt) => {
			return `
      <img
        src="${images}/${slug}/images/${src}"
        alt="${alt}"
        loading="lazy"
      />
  `.trim()
		})
		.replace(youtube, (_, id, title) => {
			return `
				<lite-youtube videoid="${id}" playlabel="${title}"></lite-youtube>
			`.trim()
		})
}

const markdownProcessor = unified()
    .use(toMarkdownAST) 
    .use([remarkGfm, remarkSmartypants, [remarkTableofContents, { tight: true }]])
    .use(toHtmlAST, { allowDangerousHtml: true })
	.use(rehypeRaw)
    .use([rehypeSlug, rehypeAutolinkHeadings])
    .use(rehypeCodeTitles)
    .use(rehypePrettyCode, {
      theme: 'aurora-x',
      transformers: [transformerNotationHighlight()],
    })
    .use(rehypeCopyCode)
    .use(rehypeUnwrapImages)
    .use(toHtmlString, { allowDangerousHtml: true })    

/**
 * Replace special Svelte characters.
 * @param {string} content
 */
function escapeHtml(content) {
	content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')

	const componentRegex = /<[A-Z].*/g
	const components = content.match(componentRegex)
	components?.forEach((component) => {
		const replaced = component.replace('&#123;', '{').replace('&#125;', '}')
		content = content.replace(component, replaced)
	})

  content = content.replace(/tabindex="0"/g, '')

	return content
}

/**
 * Preprocessor for Markdown files which converts
 * Markdown to HTML before it's compiled by Svelte
 * so we can use Svelte components inside Markdown.
 */
function markdown() {
	return {
		name: 'markdown',
		/**
		 * Convert Markdown to HTML.
		 * @param {Object} params
		 * @param {string} params.content
		 * @param {string} params.filename
		 */
		async markup({ content, filename }) {
			if (filename.endsWith('.md')) {
				const slug = getSlug(filename)
				const { meta, markdown } = frontmatter(content)
				const html = await parseMarkdown(markdown, slug)
				const code = escapeHtml(html)
				return { code: meta + code }
			}
		},
	}
}

export default markdown