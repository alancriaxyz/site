export const load = async ({ url, fetch }) => {
	const res = await fetch(`${url.origin}/api/posts.json`)
	const posts = await res.json()

	return { posts }
}