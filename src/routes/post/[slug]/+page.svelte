<script lang="ts">
  import { config } from '$lib/config'
  import dateformat from 'dateformat'
  import Clipboard from './clipboard.svelte'

  export let data
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.excerpt} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.excerpt} />
  <meta property="og:url" content={data.url} />
  <meta property="og:image" content={data.meta.cover} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="675" />
  <meta property="article:published_time" content={data.meta.datePublished} />
  <meta property="article:modified_time" content={data.meta.dateModified} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.excerpt} />
  <meta name="twitter:url" content={data.url} />
  <meta name="twitter:image" content={data.meta.cover} />
  <meta name="twitter:site" content={config.social.username} />

  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    publisher: {
      '@type': 'Organization',
      name: config.author.name,
      url: config.url,
      logo: {
        '@type': 'ImageObject',
        url: config.url + '/favicon-32x32.png',
        width: 32,
        height: 32,
      },
    },
    author: {
      '@type': 'Person',
      name: config.author.name,
      url: config.url,
      sameAs: Object.values(config.social).filter(
        (url) => typeof url === 'string' && url.startsWith('https')
      ),
    },
    headline: data.meta.title,
    url: data.url,
    datePublished: data.meta.datePublished,
    dateModified: data.meta.dateModified,
    image: {
      '@type': 'ImageObject',
      url: data.meta.cover,
      width: 1200,
      height: 726,
    },
    description: data.meta.excerpt,
    mainEntityOfPage: data.url,
  })}</script>`}
</svelte:head>

<Clipboard />

<article class="prose">
  <header>
    <h1 class="title">{data.meta.title}</h1>
    <p class="published">{dateformat(data.meta.datePublished, 'mediumDate')}</p>
  </header>

  <svelte:component this={data.content} />
</article>
