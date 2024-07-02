<script lang="ts">
  import { config } from '$lib/config'

  export let data: {
    meta?: {
      title?: string
      description?: string
      cover?: string
      datePublished?: string
      dateModified?: string
    }
    url?: string
    slug?: string
  } = {}

  let isArticle = !!data.meta?.datePublished && !!data.meta?.dateModified

  let title = isArticle ? data.meta!.title : config.seo.title
  let description = isArticle ? data.meta!.description : config.seo.description
  let url = isArticle ? data.url : config.url
  let image = isArticle
    ? `https://raw.githubusercontent.com/alancriaxyz/site/main/src/posts/${data.slug}/og.png`
    : config.seo.openGraph.image
  let width = '1200'
  let height = isArticle ? '726' : '675'
  let datePublished = isArticle ? data.meta!.datePublished || '' : ''
  let dateModified = isArticle ? data.meta!.dateModified || '' : ''
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta property="og:type" content={isArticle ? 'article' : 'website'} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta property="og:image:width" content={width} />
  <meta property="og:image:height" content={height} />
  {#if isArticle}
    <meta property="article:published_time" content={datePublished} />
    <meta property="article:modified_time" content={dateModified} />
  {/if}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:site" content={config.social.username} />

  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': isArticle ? 'Article' : 'WebSite',
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
    author: isArticle
      ? {
          '@type': 'Person',
          name: config.author.name,
          url: config.url,
          sameAs: Object.values(config.social).filter(
            (url) => typeof url === 'string' && url.startsWith('https')
          ),
        }
      : undefined,
    headline: title,
    url: url,
    datePublished: isArticle ? datePublished : undefined,
    dateModified: isArticle ? dateModified : undefined,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: parseInt(width),
      height: parseInt(height),
    },
    description: description,
    mainEntityOfPage: url,
  })}</script>`}
</svelte:head>
