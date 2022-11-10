import ProfileCard from '@/components/actor/profile_card'
import { Grid } from '@chakra-ui/react'
import { Actor } from '@/apis/actor'

export default function PageActor() {
  const actors: Actor[] = []
  const handleClick = (actor: Actor) => {
    console.log('actor:', actor)
  }
  return (
    <Grid gap={4}
          templateColumns={{ xl: 'repeat(5, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(1, 1fr)' }}>
      {actors.map(actor => <ProfileCard actor={actor} handleClick={() => handleClick(actor)}/>)}
    </Grid>
  )
}
