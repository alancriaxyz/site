<script lang="ts">
  const currentYear = new Date().getFullYear()

  import { config } from '$lib/config'
  import { cn } from '$lib/utils'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import { Icon } from '$lib/components'
</script>

<footer class="top-9 z-50 w-full border-t">
  <div
    class="container flex max-w-screen-lg flex-col items-center space-y-5 py-5">
    <nav class="flex items-center">
      <a href={config.social.youtube} target="_blank" rel="noreferrer">
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
      <a href={config.social.twitter} target="_blank" rel="noreferrer">
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
      <a href={config.social.tiktok} target="_blank" rel="noreferrer">
        <div
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}>
          <Icon.tiktok class="h-4 w-4" />
        </div>
      </a>
      <a href={config.social.instagram} target="_blank" rel="noreferrer">
        <div
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}>
          <Icon.instagram class="h-4 w-4" />
        </div>
      </a>
      <a href={config.social.github} target="_blank" rel="noopener noreferrer">
        <div
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}>
          <Icon.gitHub class="h-4 w-4" />
        </div>
      </a>
      <a
        href={config.social.linkedin}
        target="_blank"
        rel="noopener noreferrer">
        <div
          class={cn(
            buttonVariants({
              size: 'sm',
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}>
          <Icon.linkedin class="h-4 w-4" />
          <span class="sr-only">GitHub</span>
        </div>
      </a>
    </nav>

    <div class="flex items-center">
      <p class="text-sm">© {currentYear} - {config.logo}</p>
    </div>
  </div>
</footer>
