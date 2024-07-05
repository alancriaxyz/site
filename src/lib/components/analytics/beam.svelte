<script>
  import { onMount } from 'svelte'

  let isProduction = import.meta.env.VITE_ENV === 'production'
  let beamToken = import.meta.env.VITE_BEAM_ANALYTICS_TOKEN

  onMount(() => {
    if (isProduction) {
      const script = document.createElement('script')
      script.src = 'https://beamanalytics.b-cdn.net/beam.min.js'
      script.setAttribute('data-token', beamToken)
      script.async = true
      document.head.appendChild(script)
    }
  })
</script>
