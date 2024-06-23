<script lang="ts">
  import { config } from '$lib/config'
</script>

<header
  class="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex h-14 max-w-screen-lg items-center justify-between">
    <div>
      <a href="/">
        <span class="text-sm font-bold">
          {config.logo}
        </span>
      </a>
    </div>
  </div>
</header>
