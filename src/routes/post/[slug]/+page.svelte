<script lang="ts">
  import { config } from '$lib/config'
  import dateformat from 'dateformat'

  let sameAsUrls = Object.values(config.social).filter(
    (url) => typeof url === 'string' && url.startsWith('https')
  )

  export let data
</script>

<svelte:head>
  <title>{data.frontmatter.title}</title>
  <meta name="description" content={data.frontmatter.excerpt} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.frontmatter.title} />
  <meta property="og:description" content={data.frontmatter.excerpt} />
  <meta property="og:url" content={data.url} />
  <meta property="og:image" content={data.frontmatter.cover} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="675" />
  <meta
    property="article:published_time"
    content={data.frontmatter.datePublished} />
  <meta
    property="article:modified_time"
    content={data.frontmatter.dateModified} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={data.frontmatter.title} />
  <meta name="twitter:description" content={data.frontmatter.excerpt} />
  <meta name="twitter:url" content={data.url} />
  <meta name="twitter:image" content={data.frontmatter.cover} />
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
      sameAs: sameAsUrls,
    },
    headline: data.frontmatter.title,
    url: data.url,
    datePublished: data.frontmatter.datePublished,
    dateModified: data.frontmatter.dateModified,
    image: {
      '@type': 'ImageObject',
      url: data.frontmatter.cover,
      width: 1200,
      height: 726,
    },
    description: data.frontmatter.excerpt,
    mainEntityOfPage: data.url,
  })}</script>`}
</svelte:head>

<article class="prose">
  <header>
    <h1 class="title">{data.frontmatter.title}</h1>
    <p>{dateformat(data.frontmatter.datePublished, 'mediumDate')}</p>
  </header>

  <svelte:component this={data.component} />
</article>
