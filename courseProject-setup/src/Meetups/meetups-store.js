import { writable } from 'svelte/store'

const meetups = writable([
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
    isFavorite: false,
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
    isFavorite: false,
  },
])

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false,
    }
    meetups.update((items) => {
      return [newMeetup, ...items]
    })
  },
  updateMeetup: (id, meetupData) => {
    meetups.update((items) => {
      const meetupIndex = items.findIndex((i) => i.id === id) // 找出要被修改的 meetup 的 index
      const updatedMeetup = { ...items[meetupIndex], ...meetupData } // copy 一份要被修改的 meetup 然後用傳進來的 meetupData 覆寫
      const updatedMeetups = [...items] // 複製一份 meetups 的 array
      updatedMeetups[meetupIndex] = updatedMeetup // 把修改好的 meetup 更新到複製完的 meetups 的 array裡
      return updatedMeetups // 回傳修改好的陣列
    })
  },
  removeMeetup: (id) => {
    meetups.update((items) => {
      return items.filter((i) => i.id !== id)
    })
  },
  toggleFavorite: (id) => {
    meetups.update((items) => {
      const updateMeetup = { ...items.find((m) => m.id === id) } // create a new meetup object instead of mutate the original meetup object
      updateMeetup.isFavorite = !updateMeetup.isFavorite
      const meetupIndex = items.findIndex((m) => m.id === id) // find the toggled item's index in meetups array
      const updatedMeetups = [...items] // copy the entire meetups array
      updatedMeetups[meetupIndex] = updateMeetup // replace the mutated meetup item(updateMeetup) in the copied array(updateMeetups)
      return updatedMeetups // overwrite the meetups array
    })
  },
}

export default customMeetupsStore
