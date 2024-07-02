import matter from 'gray-matter'
import { unified } from 'unified'
import toMarkdownAST from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkTableofContents from 'remark-toc'
import toHtmlAST from 'remark-rehype'
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerNotationHighlight } from '@shikijs/transformers'
import { rehypeCopyCode, rehypeUnwrapImages } from './plugins.js'
import toHtmlString from 'rehype-stringify'

const images = `https://raw.githubusercontent.com/alancriaxyz/site/main/src/posts`

/**
 * Returns post slug.
 * @param {string} filename
 */
function getSlug(filename) {
	return filename.split('/').slice(-2, -1)[0];
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
	const video = /{% video src="(.*?)" %}/g
	const image = /{% img src="(.*?)" alt="(.*?)" %}/g
	const youtube = /{% youtube id="(.*?)" title="(.*?)"(?: start="(\d+)")? %}/g;
	const twitter = /{% twitter (https:\/\/twitter\.com\/\S+\/status\/\d+) %}/g;

	return content
		.replace(video, (_, src) => {
			return `
				<video controls>
				<source
					src="${images}/${slug}/assets/${src}"
					type="video/mp4"
				/>
				</video>`.trim()
		})
		.replace(image, (_, src, alt) => {
			return `<div class="post-image">
				<img
					src="${images}/${slug}/assets/${src}"
					alt="${alt}"
					loading="lazy"
				/><em>"${alt}"</em></div>`.trim()
		})
		.replace(youtube, (_, id, title, start) => {
			const videoStartAt = start ? `params="start=${start}"` : '';
			return `<lite-youtube videoid="${id}" playlabel="${title}" ${videoStartAt}></lite-youtube>`.trim();
		})
		.replace(twitter, (_, url) => {
			return `<blockquote class="twitter-tweet"
								data-lang="en"
								data-theme="dark"
								data-conversation="none"
								data-dnt="true"
								data-align="center">
						<a href="${url}">Tweet</a>
					</blockquote>`.trim();
		});		
		
}

const markdownProcessor = unified()
    .use(toMarkdownAST) 
    .use([remarkGfm, remarkSmartypants, [remarkTableofContents, { heading: "Conteúdo", maxDepth: 2, tight: true }]])
    .use(toHtmlAST, { allowDangerousHtml: true })
	.use(rehypeRaw)
	.use(rehypeExternalLinks, { target: '_blank' })
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