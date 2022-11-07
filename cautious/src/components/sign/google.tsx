import { FormEvent, useState } from 'react'
import { supabase } from '@/apis'
import userStore from '@/store/user'
import { Button, Center, Flex } from '@chakra-ui/react'

export default function SignGoogle() {
  const [signed, setSigned] = useState(false)
  const [email, setEmail] = useState('')

  const signInWithGoogle = async (e: FormEvent) => {
    e.preventDefault()

    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    userStore.reset()
  }

  userStore.connect(user => {
    setSigned(user != null)
    if (user != null)
      setEmail(user.email)
  })

  return (
    <Flex>
      {signed && <Center mr={2}>{email}</Center>}
      {
        signed
          ? (<Button onClick={signOut}>로그아웃</Button>)
          : (<Button onClick={signInWithGoogle}>로그인</Button>)
      }
    </Flex>
  )
}
