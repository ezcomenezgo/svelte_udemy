<script>
import Header from './UI/Header.svelte'
import MeetupItem from './Meetups/MeetupItem.svelte'

const meetups = [
  {
    id: 'm1',
    title: 'Coding BootCamp',
    subtitle: 'Learn coding in two hours',
    description: 'In this meetup, we will have some experts that teach you hoe to code!',
    imageUrl: 'https://addicted2success.com/wp-content/uploads/2018/06/8-Reasons-You-Should-Join-a-Meetup-Group-Today.jpg',
    address: '45th Nerd Road, 648902 Taiwan',
    contactEmail: 'code@test.com'
  },
  {
    id: 'm2',
    title: 'Swimming together',
    subtitle: 'Let\'s swimming!',
    description: 'Swim forrrr funnn!',
    imageUrl: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-1/baby_swimming-1200x628-header.jpg?w=1155',
    address: '77th Water Road, 648902 Taiwan',
    contactEmail: 'swim@test.com'
  }
]
</script>

<style>
  #meetups {
    margin-top: 5rem;
  }
</style>

<Header />

<section id="meetups">
  {#each meetups as meetup}
    <MeetupItem 
    title={meetup.title} 
    subtitle={meetup.subtitle} 
    src={meetup.imageUrl} 
    description={meetup.description}/>
  {/each}
</section>


