<script>
  import Product from './Product.svelte'
  import Modal from './Modal.svelte'
  import { tick } from 'svelte'

	let showModal
  let closeable = false

  let products = [
    {
      id: 'p1',
      title: 'A book',
      price: 9.99,
    },
  ]

  function addToCart(e) {
    console.log('app:', e)
  }

  function Delete(e) {
    console.log('app:', e)
  }
</script>

{#each products as product}
  <Product {...product} on:add-to-cart={addToCart} on:Delete={Delete} />
{/each}

<button on:click="{()  => showModal = true}">Show  modal</button>

{#if showModal}
<Modal 
  on:cancel="{() => showModal = false}"
  on:close="{() => showModal= false}"
  let:didAgree={closeable}
>
	<h1 slot="header">Hello!</h1>
	<p>This works!</p>
	<button slot="footer" on:click="{() => showModal = false}" disabled={!closeable}>Confirm</button>
</Modal>
{/if}

<!-- {#each products as product}
  <Product
    title={product.title}
    price={product.price}
    on:add-to-cart={addToCart}
    on:Delete={Delete}
  />
{/each} -->
