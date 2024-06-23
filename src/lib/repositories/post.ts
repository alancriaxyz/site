import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { Post } from '$lib/models/post';
import { timeAgo } from '$lib/utils/date';

export async function getPostsFromFiles(): Promise<Post[]> {
  const posts: Post[] = [];
  const postsPath = path.resolve('src/posts');
  const folders = await fs.readdir(postsPath, { withFileTypes: true });

  for (const folder of folders) {
    if (folder.isDirectory()) {
      const markdownFilePath = path.join(postsPath, folder.name, 'post.md');
      try {
        const markdownContent = await fs.readFile(markdownFilePath, 'utf-8');
        const { data } = matter(markdownContent);
        posts.push({
          ...data,
          slug: folder.name,
          timeAgo: timeAgo(data.datePublished)
        } as Post);
      } catch (err) {
        console.log(`Skipping folder ${folder.name} - no markdown file found`);
      }
    }
  }

  return posts;
}
