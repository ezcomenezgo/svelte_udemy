import { writable } from 'svelte/store'

const meetups = writable([])

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  setMeetups: (meetupArray) => {
    meetups.set(meetupArray)
  },
  addMeetup: (meetupData) => {
    const newMeetup = {
      ...meetupData,
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
