import { config } from '$lib/config';
import { json, type RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/services/post';
import type { Post } from '$lib/models/post';
import dateformat from 'dateformat';

export const GET: RequestHandler = async () => {
  try {
    const posts = await getPosts();

    const body = rss(posts);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');

    return response;
  } catch (e) {
    return json({ error: 'Failed to load posts' }, { status: 500 });
  }
};


const rss = (posts: Post[]): string => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	xmlns:georss="http://www.georss.org/georss"
	xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
>
  <channel>
    <title>${config.seo.title}</title>
    <description>${config.seo.description}</description>
    <link>${config.url}</link>
    <atom:link href="https://${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${config.url}/favicon-32x32.png</url>
      <title>${config.seo.title}</title>
      <link>${config.url}</link>
      <width>32</width>
      <height>32</height>
    </image>    
      ${posts
    .map(
      (post) => `
        <item>
          <guid isPermaLink="true">${config.url}/${post.slug}</guid>
          <title>${post.title}</title>
          <description>${post.description}</description>
          <link>${config.url}/${post.slug}</link>
          <pubDate>${dateformat(post.datePublished, 'ddd, dd mmm yyyy HH:MM:ss o')}</pubDate>
          <content:encoded><![CDATA[
            <div style="margin: 50px 0; font-style: italic;">
              If anything looks wrong, 
              <strong>
                <a href="${config.url}/${post.slug}">
                  read on the site!
                </a>
              </strong>
            </div>
          ]]></content:encoded>         
        </item>`)
    .join('')}
  </channel>
</rss>`;