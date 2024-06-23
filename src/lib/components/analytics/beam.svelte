<script>
	import { onMount } from 'svelte';

	let isProduction = import.meta.env.VITE_ENV === 'production';

	onMount(() => {
		if (isProduction) {
			const script = document.createElement('script');
			script.src = 'https://beamanalytics.b-cdn.net/beam.min.js';
			script.setAttribute('data-token', '5ef93360-2cba-4abc-841b-cfabe3abcff7');
			script.async = true;
			document.head.appendChild(script);
		}
	});
</script>
