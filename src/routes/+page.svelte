<script lang="ts">
  import { config } from '$lib/config'
  import { Posts } from '$lib/components'

  export let data
</script>

<svelte:head>
  <title>{config.seo.title}</title>
  <meta name="description" content={config.seo.description} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={config.seo.title} />
  <meta property="og:description" content={config.seo.description} />
  <meta property="og:url" content={config.url} />
  <meta property="og:image" content={config.seo.openGraph.image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="675" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={config.seo.title} />
  <meta name="twitter:description" content={config.seo.description} />
  <meta name="twitter:url" content={config.url} />
  <meta name="twitter:image" content={config.seo.openGraph.image} />
  <meta name="twitter:site" content={config.social.username} />

  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
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
    url: config.url,
    image: {
      '@type': 'ImageObject',
      url: config.seo.openGraph.image,
      width: 1200,
      height: 600,
    },
    mainEntityOfPage: config.url,
    description: config.seo.description,
    sameAs: Object.values(config.social).filter(
      (url) => typeof url === 'string' && url.startsWith('https')
    ),
  })}</script>`}
</svelte:head>

<Posts posts={data.posts} />
