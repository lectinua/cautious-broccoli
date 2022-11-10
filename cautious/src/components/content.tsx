import { Box } from '@chakra-ui/react'
import { Outlet, useNavigation } from 'react-router-dom'

export default function Content() {
  const navigation = useNavigation()
  return (
    <Box filter={'auto'} blur={navigation.state === 'loading' ? '2px' : ''}>
      <Outlet/>
    </Box>
  )
}
