<script lang="ts">
  import { onMount } from 'svelte'
  import Giscus from '@giscus/svelte'
  import { setGiscusTheme } from '$lib/components/giscus/'

  let giscusTheme: string = 'dark'
  onMount(() => {
    const storedTheme = localStorage.getItem('mode-watcher-mode')
    giscusTheme = storedTheme ? storedTheme : 'dark'
  })
</script>

<Giscus
  id="comments"
  repo="alancriaxyz/alancria.xyz-comments"
  repoId="R_kgDOLbvKEw"
  category="General"
  categoryId="DIC_kwDOLbvKE84CducC"
  mapping="pathname"
  term="Welcome to @giscus/react component!"
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={giscusTheme}
  lang="pt"
  loading="lazy" />
