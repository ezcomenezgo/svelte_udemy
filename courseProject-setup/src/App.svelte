<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import Button from './UI/Button.svelte'
  import EditMeetup from './Meetups/EditMeetup.svelte'
  import MeetupDetail from './Meetups/MeetupDetail.svelte'
  import meetups from './Meetups/meetups-store'

  let editMode
  let editedId
  let page = 'overview'
  let pageData = {}
  

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
    editMode = "edit"
    editedId = event.detail
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page ==='overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit}/>
    {/if}
    <MeetupGrid meetups={$meetups} on:showDetails={showDetails} on:edit={startEdit} on:add={() => editMode = 'edit'} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails}/>
  {/if}
  
</main>

