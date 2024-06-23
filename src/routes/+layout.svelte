<script lang="ts">
  import { ModeWatcher } from 'mode-watcher'
  import { Analytics } from '$lib/components/analytics'

  import { Header } from '$lib/components'

  import '../styles/styles.scss'
</script>

<Analytics />

<ModeWatcher />

<div class="relative flex min-h-screen flex-col">
  <Header />

  <!-- <LiteYouTubeEmbed />

	<main class="container flex max-w-screen-lg flex-col py-5">
		<slot />
	</main>

	<SiteFooter /> -->
</div>
