import './index.css'

import { Box, Button, Container, Heading, Stack, Text, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <>
      <Container maxW={'xl'}>
        <Stack as={Box}
               textAlign={'center'}
               spacing={{ base: 8, md: 14 }}
               py={{ base: 20, md: 36 }}>
          <Heading fontWeight={600}
                   fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                   lineHeight={'110%'}
                   color={'gray.400'}>
            404
          </Heading>
          <Text color={'gray.500'}>
            요청하신 페이지를 찾을 수 없습니다.
          </Text>
          <Stack direction={'column'}
                 spacing={3}
                 align={'center'}
                 alignSelf={'center'}
                 position={'relative'}>
            <Link to={'/'}>
              <Button bg={'gray.400'}
                      rounded={'full'}
                      px={6}
                      _hover={{ bg: 'gray.500' }}>
                확인
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
