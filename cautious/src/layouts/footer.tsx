import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  VisuallyHidden
} from '@chakra-ui/react'
import { ReactEventHandler, ReactNode, useState } from 'react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'
import { supabase } from '@/apis'
import userStore from '@/store/user'

const FooterButton = ({ children, label, onClick }: {
  children: ReactNode
  label: string
  onClick: ReactEventHandler
}) => {
  return (
    <Button bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            onClick={onClick}
            _hover={{
              bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [signed, setSigned] = useState(false)

  const handleClick = () => toggleColorMode()
  const handleSignIn = () => {
    if ( !signed ) {
      userStore.trySign()
      supabase.auth.signInWithOAuth({
        provider: 'google'
      })
    }
    else {
      supabase.auth.signOut()
    }
  }

  const toast = useToast()

  if ( userStore.isSignTried() ) {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if ( user !== null ) {
        setSigned(true)
        userStore.set(user)
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
    }
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack}
                 maxW={'100vw'}
                 py={4}
                 direction={'row'}
                 spacing={4}
                 justify={'space-between'}
                 align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
        <Stack direction={'row'} spacing={2}>
          <FooterButton label={'dark mode'} onClick={handleClick}>
            {colorMode === 'light'
              ? <MoonIcon/>
              : <SunIcon/>
            }
          </FooterButton>
          <FooterButton label={'sign in'} onClick={handleSignIn}>
            {signed
              ? <FaSignOutAlt/>
              : <FaUser/>
            }
          </FooterButton>
        </Stack>
      </Container>
    </Box>
  )
}
