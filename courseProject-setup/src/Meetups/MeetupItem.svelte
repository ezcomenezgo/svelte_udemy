<script>
  import { createEventDispatcher } from 'svelte'
  import meetups from './meetups-store'
  import Button from '../UI/Button.svelte'
  import Badge from '../UI/Badge.svelte'

  export let id
  export let title
  export let subtitle
  export let src
  export let description
  export let address
  // export let email
  export let isFav

  let isLoading = false

  const dispatch = createEventDispatcher()

  function toggleFavorite() {
    isLoading = true
    fetch(
      `https://svelte-course-aa75b-default-rtdb.firebaseio.com/meetup/${id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({ isFavorite: !isFav }),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('An err occuerred')
        }
        isLoading
      })
      .catch((err) => console.log(err))
    meetups.toggleFavorite(id) // use meetups store to call the function
  }
</script>

<article>
  <header>
    <h1>
      {title}
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img {src} alt={title} />
  </div>
  <div class="content">
    {description}
  </div>
  <footer>
    <Button mode="outline" type="button" on:click={() => dispatch('edit', id)}>
      Edit
    </Button>
    <!-- <Button href="mailto:{email}">Contact</Button> -->
    <Button on:click={() => dispatch('showDetails', id)}>Show Details</Button>
    <Button
      mode="outline"
      color={isFav ? null : 'success'}
      on:click={toggleFavorite}
    >
      {isFav ? 'Unfavorite' : 'Favorite'}
    </Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: 'Roboto Slab', sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
