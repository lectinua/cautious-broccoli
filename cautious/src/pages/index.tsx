import './index.css'
import { supabase } from '@/apis'
import userStore from '@/store/user'
import SignGoogle from '@/components/sign/google'
import { Box, Flex } from '@chakra-ui/react'
import { AtSignIcon } from '@chakra-ui/icons'

export default function Index() {
  supabase.auth.getSession().then(({ data }) => {
    const user = data.session?.user
    if (user && user.email !== undefined)
      userStore.set({ email: user.email })
  })

  return (
    <div>
      <Flex w="100%" bg="gray.100" p={4} alignItems='center'>
        <AtSignIcon w={8} h={8}/>
        <Box flex="1"/>
        <SignGoogle/>
      </Flex>
    </div>
  )
}
