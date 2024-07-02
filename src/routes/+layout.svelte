<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'
  import { Header, Footer } from '$lib/components'
  import LiteYouTubeEmbed from '$lib/components/embeds/youtube.svelte'
  import { Analytics } from '$lib/components/analytics'

  import '../styles/styles.scss'
</script>

<ModeWatcher defaultMode={'dark'} />

<div class="relative flex min-h-screen flex-col">
  <Header />

  <LiteYouTubeEmbed />

  <main class="container flex max-w-screen-lg flex-col py-5">
    <slot />
  </main>

  <Footer />
</div>

<Analytics />
