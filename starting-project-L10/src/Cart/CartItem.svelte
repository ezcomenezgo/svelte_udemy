<script>
  import { products } from "../Products/products-store"
  import Button from "../UI/Button.svelte";
  import cartItem from "../Cart/cart-store"
import Product from "../Products/Product.svelte";

  export let title;
  export let price;
  export let id;

  let showDescription = false;
  let description = 'Not avaliable!'
  // let fetchProducts = []

  // products.subscribe(prods => {
  //   fetchProducts = prods
  //   // console.log(fetchProducts)
  // })

  function displayDescription(id) {
    showDescription = !showDescription;
    // description = fetchProducts.find(product => product.id === id).description
    const unsubscribe = products.subscribe(prods => {
      description = prods.find(product => product.id === id).description
    })
    unsubscribe()
  }

  function removeFromCart(id) {
    cartItem.update(items => {
      return items.filter(item => item.id !== id)
    })
    console.log("Removing...")
  }
</script>

<style>
  li {
    margin: 1rem 0;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
  }

  h1,
  h2 {
    font-size: 1rem;
    margin: 0;
  }

  h2 {
    color: #494949;
    margin-bottom: 1rem;
  }
</style>

<li>
  <h1>{title}</h1>
  <h2>{price}</h2>
  <Button mode="outline" on:click={displayDescription(id)}>
    {showDescription ? 'Hide Description' : 'Show Description'}
  </Button>
  <Button on:click={removeFromCart(id)}>Remove from Cart</Button>
  {#if showDescription}
    <p>{description}</p>
  {/if}
</li>
