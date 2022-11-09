import { FormEvent, useState } from 'react'
import { supabase } from '@/apis'
import userStore from '@/store/user'
import { Button, Center, Flex, useToast } from '@chakra-ui/react'
import { signIn } from '@/apis/user'

export default function SignGoogle() {
  const [signed, setSigned] = useState(false)
  const [email, setEmail] = useState('')
  const toast = useToast()

  const signInWithGoogle = async (e: FormEvent) => {
    e.preventDefault()

    userStore.trySign(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }

  const signOut = async () => {
    setSigned(false)
    setEmail('')
    userStore.reset()
    await supabase.auth.signOut()
  }

  if ( userStore.isSignTried() ) {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if ( user !== null ) {
        setSigned(true)
        setEmail(user.email ?? '')
        signIn(user)
        toast({
          title: '로그인 성공',
          description: `환영합니다. ${user.email}.`,
          status: 'success',
          duration: 3500,
          isClosable: true,
        })
      }
    })
  }

  if ( !signed ) {
    const user = userStore.get()
    if ( user !== null ) {
      setSigned(true)
      setEmail(user.email)
    }
  }

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
