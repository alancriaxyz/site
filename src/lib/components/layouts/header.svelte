<script lang="ts">
  import { config } from '$lib/config'
  import { cn } from '$lib/utils'
  import { page } from '$app/stores'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import { Icon } from '$lib/components'
  import { toggleMode } from 'mode-watcher'
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
      </nav>
    </div>

    <nav class="flex items-center">
      <a
        href={config.social.youtube}
        target="_blank"
        rel="noreferrer"
        class="hidden md:flex">
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
      <a
        href={config.social.twitter}
        target="_blank"
        rel="noreferrer"
        class="hidden md:flex">
        <div
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}>
          <Icon.twitter class="h-3 w-3 fill-current" />
        </div>
      </a>
      <Button on:click={toggleMode} variant="ghost" class="w-9 px-0" size="sm">
        <Icon.sun
          class="dark:-roate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
        <Icon.moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </nav>
  </div>
</header>
