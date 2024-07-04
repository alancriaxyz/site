<script lang="ts">
  import * as Card from '$lib/components/ui/card'
  import type { Post } from '$lib/models/post'

  export let posts: Post[] = []
</script>

{#each posts as post}
  <article class="my-3">
    <a href="/post/{post.slug}" data-sveltekit-preload-data="off">
      <Card.Root
        class="overflow-hidden rounded-lg transition-all duration-500 hover:shadow-[0_0_5px_rgba(221,221,221,0.5),0_0_15px_rgba(204,204,204,0.5)]">
        <Card.Header>
          <Card.Title title={post.title}>{post.title}</Card.Title>
          <Card.Description>{post.description}</Card.Description>
        </Card.Header>
        <Card.Footer class="text-xs text-gray-100">
          {post.timeAgo}
        </Card.Footer>
      </Card.Root>
    </a>
  </article>
{/each}
