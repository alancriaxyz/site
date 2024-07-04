export const prerender = true;

import { config } from '$lib/config';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/services/post';
import type { Post } from '$lib/models/post';

export const GET: RequestHandler = async () => {
  try {
    const posts = await getPosts();

    const body = sitemap(posts);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');

    return response;
  } catch (e) {
    return json({ error: 'Failed to load posts' }, { status: 500 });
  }
};


const sitemap = (posts: Post[]): string => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>${config.url}/post/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <lastmod>${post.dateModified}</lastmod>
    <priority>0.5</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;