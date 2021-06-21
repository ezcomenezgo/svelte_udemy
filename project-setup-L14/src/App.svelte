<script>
	import { onMount } from 'svelte'
	import hobbyStore from './hobby-store'
	let hobbies = []
	let hobbyInput
	let isLoading = false

	onMount(() => {
		isLoading = true
		fetch('https://svelte-course-aa75b-default-rtdb.firebaseio.com/hobbies.json')
		.then(res => {
			if(!res.ok){
				throw new Error('Failed')
			}
			return res.json()
		})
		.then(data => {
			isLoading = false
			// hobbies = Object.values(data)
			hobbyStore.setHobbies(Object.values(data))
			let keys = Object.keys(data)
			console.log(hobbies, keys)

			for (const key in data) {
				console.log(data[key])
			}
		})
		.catch(err => {
			isLoading = false
			console.log(err)
		})
	})

	function addHobby() {
		// hobbies = [...hobbies, hobbyInput]
		hobbyStore.addHobby(hobbyInput)

		isLoading = true
		fetch('https://svelte-course-aa75b-default-rtdb.firebaseio.com/hobbies.json', {
			method: 'POST',
			body: JSON.stringify(hobbyInput),
			headers: {
				'Content-Type': 'applicatopn/json'
			}
		}).then(res => {
			isLoading = false
			if(!res.ok) {
				throw new Error('Failed')
			}
			alert('Data saved')
		}).catch(err => {
			isLoading = false
			console.log(err)
		})
	}
</script>

<style>

</style>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:value={hobbyInput}>
<button on:click="{addHobby}">Add Hobby</button>

{#if isLoading}
	<p>Loading...</p>
{:else}
	<ul>
		{#each $hobbyStore as hobby}
			<li>{hobby}</li>
		{/each}
	</ul>
{/if}

