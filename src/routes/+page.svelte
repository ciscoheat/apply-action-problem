<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { form } = $props();

	// BUG: This subscribe only works once when posting the form.
	page.subscribe((page) => {
		console.log(page.form ? 'Page posted' : 'Page loaded');
	});
</script>

<h1>applyAction problem with SvelteKit 2.12</h1>

{#if form?.message}
	<p><b>{form?.message}</b></p>
{/if}

<p>1. Load the page, console output should be:</p>
<pre>
Page loaded
</pre>

<p>2. Submit the form, console output should be:</p>
<pre>
Page loaded
Page posted
</pre>

<p>3. Submit again, console output should be:</p>
<pre>
Page loaded
Page posted
Page posted
</pre>

But the page.subscribe isn't called again, missing the last output.

<hr />

<form
	method="POST"
	use:enhance={() => {
		// If adding use:enhance without this callback, it works
		return async ({ result }) => {
			await applyAction(result);
		};
	}}
>
	<button>Submit</button>
</form>
