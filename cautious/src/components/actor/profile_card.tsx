import { Box, Heading, Skeleton, Stack, Text, useColorModeValue, } from '@chakra-ui/react'
import AnimButton from '@/components/animButton'
import { useNavigation } from 'react-router-dom'
import { MouseEventHandler } from 'react'
import { Actor } from '@/apis/actor'

export default function ProfileCard({ actor, handleClick }: { actor: Actor, handleClick: MouseEventHandler }) {
  const navigation = useNavigation()
  return (
    <Box w={'full'}
         bg={useColorModeValue('gray.100', 'gray.800')}
         borderColor={useColorModeValue('gray.200', 'gray.700')}
         borderWidth={'1px'}
         boxShadow={'2xl'}
         rounded={'md'}
         overflow={'hidden'}>
      <Box p={6}>
        <Stack spacing={0} align={'center'}>
          <Skeleton isLoaded={navigation.state !== 'loading'}>
            <Heading fontSize={'xl'}
                     fontWeight={500}
                     mb={2}>
              {actor.name}
            </Heading>
            <Text color={'gray.500'}>
              {actor.description}
            </Text>
          </Skeleton>
        </Stack>
        <AnimButton bg={useColorModeValue('gray.200', 'gray.900')}
                    w={'full'}
                    rounded={'md'}
                    mt={2}
                    onClick={handleClick}
        >
          Edit
        </AnimButton>
      </Box>
    </Box>
  )
}
