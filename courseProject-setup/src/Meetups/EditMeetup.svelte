<script>
  import { createEventDispatcher } from 'svelte'
  import Button from '../UI/Button.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Modal from '../UI/Modal.svelte'
  import { isEmpty, isValidEmail } from '../helpers/validation'

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let email = ''

  const dispatch  = createEventDispatcher()

  $: titleValid = !isEmpty(title) // 如果有輸入有效的文字，isEmpty function 會返回 false，所以用驚嘆號把它變成 true
  $: subtitleValid = !isEmpty(subtitle)
  $: descriptionValid = !isEmpty(description)
  $: imageUrlValid = !isEmpty(imageUrl)
  $: addressValid = !isEmpty(address)
  $: emailValid = isValidEmail(email)
  $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && emailValid

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
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={(e) => (title = e.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput
      id="imageUrl"
      label="Image Url"
      valid={imageUrlValid}
      validityMessage="Please enter a valid Url."
      value={imageUrl}
      on:input={(e) => (imageUrl = e.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={(e) => (address = e.target.value)}
    />
    <TextInput
      id="email"
      label="Email"
      valid={emailValid}
      validityMessage="Please enter a valid email."
      value={email}
      type="email"
      on:input={(e) => (email = e.target.value)}
    />
    <TextInput
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter some description."
      value={description}
      controlType="textarea"
      on:input={(e) => (description = e.target.value)}
    />
  </form>
  <div slot="footer">
    <Button type="submit" mode="outline" on:click={cancelForm}>Cancel</Button>
    <Button type="submit" on:click={submitForm} disabled={!formIsValid}>Save</Button>
  </div>
</Modal>