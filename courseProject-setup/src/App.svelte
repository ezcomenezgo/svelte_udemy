<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import Button from './UI/Button.svelte'
  import EditMeetup from './Meetups/EditMeetup.svelte'

  let show = false
  let meetups = [
    {
      id: 'm1',
      title: 'Coding BootCamp',
      subtitle: 'Learn coding in two hours',
      description:
        'In this meetup, we will have some experts that teach you hoe to code! Do you want to learn how to code? Come to join us!',
      imageUrl:
        'https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg',
      address: '45th Nerd Road, 648902 Taiwan',
      contactEmail: 'code@test.com',
      isFavorite: false
    },
    {
      id: 'm2',
      title: 'Swimming together',
      subtitle: "Let's swimming!",
      description: 'Swim forrrr funnn!',
      imageUrl:
        'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-1/baby_swimming-1200x628-header.jpg?w=1155',
      address: '77th Water Road, 648902 Taiwan',
      contactEmail: 'swim@test.com',
      isFavorite: false
    },
  ]

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString,
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      address: event.detail.address,
      contactEmail: event.detail.email,
    }

    meetups = [newMeetup, ...meetups]

    show = false
  }

  function toggleFavorite(event) {
    const id = event.detail
    const updateMeetup = {...meetups.find(m => m.id === id)} // create a new meetup object instead of mutate the original meetup object
    updateMeetup.isFavorite = !updateMeetup.isFavorite
    const meetupIndex = meetups.findIndex(m => m.id === id) // find the toggled item's index in meetups array
    const updatedMeetups = [...meetups] // copy the entire meetups array
    updatedMeetups[meetupIndex] = updateMeetup // replace the mutated meetup item(updateMeetup) in the copied array(updateMeetups)
    meetups = updatedMeetups // overwrite the meetups array
  }

  function cancelEdit() {
    show = false
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls"></div>
  <Button on:click={() => show = true}>Create A Meetup</Button>
  {#if show}
  <EditMeetup on:save={addMeetup} on:cancel={cancelEdit}/>
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite}/>
</main>

