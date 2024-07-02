<script>
  import { onMount } from 'svelte'

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    document.head.appendChild(script)
  })
</script>
