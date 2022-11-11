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
import { ReactEventHandler, ReactNode, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { supabase } from '@/apis'
import { userActions } from '@/store/user'
import { IconContext } from 'react-icons'
import { signIn } from '@/apis/user'
import { menuActions } from '@/store/menu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { signActions } from '@/store/sign'
import { useNavigate } from 'react-router-dom'

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
  const dispatch = useDispatch()
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user.value)
  const sign = useSelector((state: RootState) => state.sign.value)

  const handleSignIn = () => {
    dispatch(signActions.set(true))
    supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }
  const handleSignOut = () => {
    dispatch(userActions.set(null))
    dispatch(menuActions.set([]))
    supabase.auth.signOut()

    navigate('/')

    toast({
      title: '로그아웃 성공',
      description: `로그아웃되었습니다.`,
      status: 'success',
      duration: 3500,
      isClosable: true,
    })
  }

  useEffect(() => {
    if ( sign ) {
      dispatch(signActions.set(false))

      signIn(dispatch).then((user) => {
        if ( user !== null ) {
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
  }, [])

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderTopWidth="1px"
      borderTopColor={useColorModeValue('gray.200', 'gray.700')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack}
                 maxW={'100vw'}
                 py={4}
                 direction={'row'}
                 spacing={4}
                 justify={'space-between'}
                 align={{ base: 'center', md: 'center' }}>
        <Text></Text>
        <Stack direction={'row'} spacing={2}>
          <FooterButton label={'dark mode'} onClick={toggleColorMode}>
            {colorMode === 'light'
              ? <MoonIcon/>
              : <SunIcon/>
            }
          </FooterButton>
          <IconContext.Provider value={{ className: 'icon-75' }}>
            {user !== null ?
              <FooterButton label={'sign out'} onClick={handleSignOut}>
                <FaSignOutAlt/>
              </FooterButton>
              :
              <FooterButton label={'sign in'} onClick={handleSignIn}>
                <FaUser/>
              </FooterButton>
            }
          </IconContext.Provider>
        </Stack>
      </Container>
    </Box>
  )
}
