import type { Post } from '$lib/models/post';
import { getPostsFromFiles } from '$lib/repositories/post';
import { getTime } from '$lib/utils/date';

export async function getPosts(): Promise<Post[]> {
  let posts = await getPostsFromFiles();
  posts = posts.sort((first, second) => {
    return getTime(second.datePublished) - getTime(first.datePublished);
  });

  return posts;
}
