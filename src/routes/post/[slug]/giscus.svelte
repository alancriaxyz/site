<script lang="ts">
  import { onMount } from 'svelte'
  import Giscus from '@giscus/svelte'

  let giscusTheme: string = 'dark'
  onMount(() => {
    const storedTheme = localStorage.getItem('mode-watcher-mode')
    giscusTheme = storedTheme ? storedTheme : 'dark'
  })

  export let title: string
</script>

<Giscus
  id="comments"
  repo="alancriaxyz/alancria.xyz-comments"
  repoId="R_kgDOLbvKEw"
  category="General"
  categoryId="DIC_kwDOLbvKE84CducC"
  mapping="title"
  term={title}
  reactionsEnabled="1"
  emitMetadata="0"
  inputPosition="top"
  theme={giscusTheme}
  lang="pt"
  loading="lazy" />
