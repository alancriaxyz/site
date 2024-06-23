<script lang="ts">
  import * as Card from '$lib/components/ui/card'
  import type { Post } from '$lib/models/post'

  export let posts: Post[] = []
</script>

{#each posts as post}
  <article class="my-3">
    <a href="/blog/{post.slug}" data-sveltekit-preload-data="off">
      <Card.Root
        class="hover:shadow-[0px_1px_1px_rgba(221,_221,_221,_1),_0_1px_10px_rgba(204,_204,_204,_1)]">
        <Card.Header>
          <Card.Title title={post.title}>{post.title}</Card.Title>
          <Card.Description>{post.description}</Card.Description>
        </Card.Header>
        <Card.Footer class="text-xs text-gray-500">
          {post.timeAgo}
        </Card.Footer>
      </Card.Root>
    </a>
  </article>
{/each}
