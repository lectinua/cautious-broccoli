import './index.css'
import SignGoogle from '@/components/sign/google'
import { Box, Flex } from '@chakra-ui/react'
import { AtSignIcon } from '@chakra-ui/icons'

export default function Index() {
  return (
    <div>
      <Flex w="100%" bg="gray.100" p={4} alignItems="center">
        <AtSignIcon w={8} h={8}/>
        <Box flex="1"/>
        <SignGoogle/>
      </Flex>
    </div>
  )
}
