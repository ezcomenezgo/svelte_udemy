<script>
  import meetups from './meetups-store'
  import { createEventDispatcher } from 'svelte'
  import Button from '../UI/Button.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Modal from '../UI/Modal.svelte'
  import { isEmpty, isValidEmail } from '../helpers/validation'

  export let id = null

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let email = ''

  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id)
      title = selectedMeetup.title
      subtitle = selectedMeetup.subtitle
      description = selectedMeetup.description
      imageUrl = selectedMeetup.imageUrl
      address = selectedMeetup.address
      email = selectedMeetup.contactEmail
    })

    unsubscribe() // 馬上 unsubscribe 掉避免在更新表格的時候會出錯
  }

  const dispatch = createEventDispatcher()

  $: titleValid = !isEmpty(title) // 如果有輸入有效的文字，isEmpty function 會返回 false，所以用驚嘆號把它變成 true
  $: subtitleValid = !isEmpty(subtitle)
  $: descriptionValid = !isEmpty(description)
  $: imageUrlValid = !isEmpty(imageUrl)
  $: addressValid = !isEmpty(address)
  $: emailValid = isValidEmail(email)
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    descriptionValid &&
    imageUrlValid &&
    addressValid &&
    emailValid

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    }
    if (id) {
      fetch(
        `https://svelte-course-aa75b-default-rtdb.firebaseio.com/meetup/${id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify(meetupData),
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('An err occuerred')
          }
          meetups.updateMeetup(id, meetupData)
        })
        .catch((err) => console.log(err))
    } else {
      fetch(
        'https://svelte-course-aa75b-default-rtdb.firebaseio.com/meetup.json',
        {
          method: 'POST',
          body: JSON.stringify({ ...meetupData, isFavorite: false }),
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('An err occuerred')
          }
          return res.json()
        })
        .then((data) => {
          meetups.addMeetup({ ...meetupData, isFavorite: false, id: data.name })
        })
        .catch((err) => console.log(err))
    }
    dispatch('save')
  }

  function deleteMeetup() {
    fetch(
      `https://svelte-course-aa75b-default-rtdb.firebaseio.com/meetup/${id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('An err occuerred')
        }
        meetups.removeMeetup(id)
      })
      .catch((err) => console.log(err))
    dispatch('save')
  }

  function cancelForm() {
    dispatch('cancel')
  }
</script>

<Modal title="Create A New Meetup!" on:cancel>
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
    <Button type="submit" on:click={submitForm} disabled={!formIsValid}
      >Save</Button
    >
    {#if id}
      <Button on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
