<script lang="ts">
  import dateformat from 'dateformat'
  import { Seo } from '$lib/components'
  import Clipboard from './clipboard.svelte'
  import Giscus from './giscus.svelte'
  import { Tweet, Analytics, LiteYouTubeEmbed } from '$lib/components'

  export let data
</script>

<Seo {data} />

<Tweet />
<LiteYouTubeEmbed />
<Clipboard />

<article class="prose">
  <header>
    <h1 class="title">{data.meta.title}</h1>
    <p class="published">{dateformat(data.meta.datePublished, 'mediumDate')}</p>
  </header>

  <svelte:component this={data.content} />

  <hr />

  <h2>E aí, curtiu?</h2>

  <p>Se você chegou até aqui, muito obrigado!</p>

  <p>
    Seria incrível se você pudesse compartilhar este material em suas redes
    sociais!
  </p>

  <p><strong>Shoutout!</strong></p>
</article>

<Giscus title={data.meta.title} />
