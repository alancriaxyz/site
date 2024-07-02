<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'
  import { Header, Footer, Analytics } from '$lib/components'

  import '../styles/styles.scss'
</script>

<ModeWatcher defaultMode={'dark'} />

<div class="relative flex min-h-screen flex-col">
  <Header />

  <main class="container flex max-w-screen-lg flex-col py-5">
    <slot />
  </main>

  <Footer />
</div>

<Analytics />
