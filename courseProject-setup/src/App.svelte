<script>
  import Header from './UI/Header.svelte'
  import MeetupGrid from './Meetups/MeetupGrid.svelte'
  import TextInput from './UI/TextInput.svelte'
  import Button from './UI/Button.svelte'

  let title = ''
  let subtitle = ''
  let description = ''
  let imageUrl = ''
  let address = ''
  let email = ''

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
    },
  ]

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString,
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    }

    meetups = [newMeetup, ...meetups]
  }
</script>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      type="text"
      on:input={(e) => (title = e.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      type="text"
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput
      id="imageUrl"
      label="Image Url"
      value={imageUrl}
      type="text"
      on:input={(e) => (imageUrl = e.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      value={address}
      type="text"
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
    <Button type="submit" caption="Save" />
  </form>
  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
