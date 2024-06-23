import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/services/post';

export async function GET() {
  try {
    const posts = await getPosts();
    return json(posts);
  } catch (e) {
    return json({ error: "Failed to load posts" }, { status: 500 });
  }
}
