<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import Button from './UI/Button.svelte'
  import EditMeetup from './Meetups/EditMeetup.svelte'
  import MeetupDetail from './Meetups/MeetupDetail.svelte'
  import meetups from './Meetups/meetups-store'
  import LoadingSpinner from './UI/LoadingSpinner.svelte'

  fetch('https://svelte-course-aa75b-default-rtdb.firebaseio.com/meetup.json')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Fetching Meetups Failed.')
      }
      return res.json()
    })
    .then((data) => {
      const loadedMeetups = []
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key,
        })
      }
      setTimeout(() => {
        isLoading = false
        meetups.setMeetups(loadedMeetups.reverse())
      }, 1000)
    })
    .catch((err) => {
      isLoading = false
      console.log(err)
    })

  let editMode
  let editedId
  let page = 'overview'
  let pageData = {}
  let isLoading = true

  function savedMeetup(event) {
    // meetups = [newMeetup, ...meetups]
    editMode = null
    editedId = null
  }

  function cancelEdit() {
    editMode = null
    editedId = null
  }

  function showDetails(event) {
    page = 'showDetails'
    pageData.id = event.detail
  }

  function closeDetails() {
    page = 'overview'
    pageData = {}
  }

  function startEdit(event) {
    editMode = 'edit'
    editedId = event.detail
  }
</script>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showDetails={showDetails}
        on:edit={startEdit}
        on:add={() => (editMode = 'edit')}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
