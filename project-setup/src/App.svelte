<script>
  import ContactCard from './ContactCard.svelte'

  let name = 'Max'
  let title = ''
  let image = ''
  let description = ''
  let formState = 'empty'
  let createdContacts = []

  function addContact() {
    if (
      name.trim().length === 0 ||
      title.trim().length === 0 ||
      image.trim().length === 0 ||
      description.trim().length === 0
    ) {
      formState = 'invalid'
      return
    }
    createdContacts = [
      ...createdContacts,
    {
      id: Math.random(),
      name: name,
      jobTitle: title,
      image: image,
      desc: description
    }]
    formState = 'done'
  }

  function deleteFirst() {
    createdContacts = createdContacts.slice(1)
  }

  function deleteLast() {
    createdContacts = createdContacts.slice(0,-1)
  }
</script>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
</div>

<button on:click={addContact}>add Contact Card</button>
<button on:click={deleteFirst}>Delete First</button>
<button on:click={deleteLast}>Delete Last</button>

{#if formState === 'invalid'}
  <p>input invalid</p>
{:else if formState === 'empty'}
  <p>Please fill some data and hit the button!</p>
{/if}

{#each createdContacts as contact, i (contact.id)}
  <h3># {i + 1}</h3>
  <ContactCard
    userName={contact.name}
    jobTitle={contact.jobTitle}
    description={contact.desc}
    userImage={contact.image}
  />
{:else}
<p>Please start adding some card here!</p>
{/each}

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>
