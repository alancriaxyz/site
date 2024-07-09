import matter from 'gray-matter';
import type { Post } from '$lib/models/post';
import { timeAgo } from '$lib/utils/date';

export async function getPostsFromFiles(): Promise<Post[]> {
  const posts: Post[] = [];
  const modules = import.meta.glob('/posts/*/post.md', { query: '?raw', import: 'default' });

  for (const path in modules) {
    const folder = path.split('/').slice(-2, -1)[0];
    try {
      const markdownContent: string = await modules[path]() as unknown as string;
      const { data } = matter(markdownContent);
      if (data.status !== 'draft') {
        posts.push({
          ...data,
          slug: folder,
          timeAgo: timeAgo(data.datePublished),
        } as Post);
      }
    } catch (err) {
      console.log(`Skipping folder ${folder} - error reading markdown file`);
    }
  }

  return posts;
}
