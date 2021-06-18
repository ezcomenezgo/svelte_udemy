<script>
  import { createEventDispatcher } from 'svelte'

  export let title
  export let price
  export let bestseller = false

  const dispatcher = createEventDispatcher()

  function addToCart(e) {
    dispatcher('add-to-cart', { id: 'p1' })
    alert('add!')
    console.log(e)
  }

  function Delete(e) {
    dispatcher('Delete', { id: 'p2' })
    alert('delete')
    console.log(e)
  }
</script>

<article>
  <h1>{title}</h1>
  <h2>${price}</h2>
  {#if bestseller}
    <h3>BESTSELLER</h3>
  {/if}
  <button on:click={addToCart}>Add to Cart</button>
  <button on:click={Delete}>Delete</button>
</article>
