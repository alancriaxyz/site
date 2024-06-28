<script lang="ts">
  import { Seo, Posts } from '$lib/components'

  export let data
</script>

<Seo />

<Posts posts={data.posts} />
