<script>
  import { createEventDispatcher } from 'svelte'
  import Button from '../UI/Button.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Modal from '../UI/Modal.svelte'

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let email = ''

  const dispatch  = createEventDispatcher()

  function submitForm() {
    dispatch('save', {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      email: email
    })
  }

  function cancelForm () {
    dispatch('cancel')
  }
</script>

<style>
   form {
    width: 100%;
  }
</style>

<Modal title='Create A New Meetup!' on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={(e) => (title = e.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput
      id="imageUrl"
      label="Image Url"
      value={imageUrl}
      on:input={(e) => (imageUrl = e.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={(e) => (address = e.target.value)}
    />
    <TextInput
      id="email"
      label="Email"
      value={email}
      type="email"
      on:input={(e) => (email = e.target.value)}
    />
    <TextInput
      id="description"
      label="Description"
      value={description}
      controlType="textarea"
      on:input={(e) => (description = e.target.value)}
    />
  </form>
  <div slot="footer">
    <Button type="submit" mode="outline" on:click={cancelForm}>Cancel</Button>
    <Button type="submit" on:click={submitForm}>Save</Button>
  </div>
</Modal>