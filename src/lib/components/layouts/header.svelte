<script lang="ts">
  import { onMount } from 'svelte'
  import { config } from '$lib/config'
  import { cn } from '$lib/utils/theme'
  import { page } from '$app/stores'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import { Icon } from '$lib/components'
  import { setMode, mode } from 'mode-watcher'
  import { setGiscusTheme } from '$lib/components/giscus/'

  function handleModeChange() {
    if ($mode === 'light') {
      setMode('dark')
      setGiscusTheme('dark')
    } else {
      setMode('light')
      setGiscusTheme('light')
    }
  }
</script>

<header
  class="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="container flex h-14 max-w-screen-lg items-center justify-between">
    <div>
      <a href="/">
        <span class="text-sm font-bold">
          <img src="/logo.png" alt="Logo" width="26" height="26" />
        </span>
      </a>
    </div>

    <div>
      <nav class="space-x-4 text-sm">
        <a
          href="/"
          class={cn(
            'transition-colors hover:text-foreground/80 hover:underline',
            $page.url.pathname === '/'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}>
          Posts
        </a>
        <a
          href="/post/python-365-dias"
          class={cn(
            'transition-colors hover:text-foreground/80 hover:underline',
            $page.url.pathname === '/post/python-365-dias'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}>
          Cursos
        </a>
      </nav>
    </div>

    <nav class="flex items-center">
      <a
        href={config.social.youtube}
        target="_blank"
        rel="noreferrer"
        aria-label="Visitar canal no YouTube">
        <div
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}>
          <Icon.youtube class="h-4 w-4" />
        </div>
      </a>
      <Button
        on:click={handleModeChange}
        variant="ghost"
        class="w-9 px-0"
        size="sm"
        aria-label="Mudar Thema">
        <Icon.sun
          class="dark:-roate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
        <Icon.moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </nav>
  </div>
</header>
