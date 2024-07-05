<script>
  import { onMount } from 'svelte'

  let isProduction = import.meta.env.VITE_ENV === 'production'
  let beamToken = import.meta.env.VITE_BEAM_ANALYTICS_TOKEN

  onMount(() => {
    if (isProduction) {
      const meta = document.createElement('meta')
      meta.httpEquiv = 'Content-Security-Policy'
      meta.content =
        "script-src 'self' https://beamanalytics.b-cdn.net; object-src 'none';"
      document.head.appendChild(meta)

      const script = document.createElement('script')
      script.src = 'https://beamanalytics.b-cdn.net/beam.min.js'
      script.setAttribute('data-token', beamToken)
      script.setAttribute('async', '')
      document.head.appendChild(script)
    }
  })
</script>
