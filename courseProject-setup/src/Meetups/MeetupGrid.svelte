<script>
  import { createEventDispatcher } from 'svelte'
  import MeetupItem from './MeetupItem.svelte'
  import Button from '../UI/Button.svelte'
  import MeetupFilter from './MeetupFilter.svelte'
  export let meetups

  const dispatch = createEventDispatcher()

  let favsOnly = false


  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups // 如果 favsOnly 是 true 就會顯示 isFavorited 為 true 的 meetup

  function setFilter(event) {
    favsOnly = event.detail === 1
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

   #meetups-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetups-controls">
  <MeetupFilter on:select={setFilter}/>
  <Button on:click={() => dispatch('add')}>Create A Meetup</Button>
</section>
<section id="meetups">
  {#each filteredMeetups as meetup}
    <MeetupItem
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      address={meetup.address}
      src={meetup.imageUrl}
      description={meetup.description}
      email={meetup.contactEmail}
      isFav={meetup.isFavorite}
      on:togglefavorite
      on:showDetails
      on:edit
    />
  {/each}
</section>


