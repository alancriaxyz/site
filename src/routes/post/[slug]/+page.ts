import { error } from '@sveltejs/kit'
import { config } from '$lib/config';

export async function load({ params: { slug } }) {
	try {
		const post = await import(`../../../posts/${slug}/post.md`)
		
		return {
			meta: post.metadata,
			content: post.default
		}
	} catch (e) {
		error(404, `Post does not exist`)
	}
}