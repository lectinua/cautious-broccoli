import './index.css'

import { Box, Container, Stack, Text, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { WarningTwoIcon } from '@chakra-ui/icons'
import AnimButton from '@/components/animButton'

export default function Error() {
  return (
    <Container maxW={'xl'}>
      <Stack as={Box}
             textAlign={'center'}
             spacing={{ base: 8, md: 14 }}
             py={{ base: 20, md: 36 }}>
        <Box textAlign="center" py={10} px={6}>
          <WarningTwoIcon boxSize={'50px'} color={'orange.300'}/>
          <Text color={'gray.500'} mt={4} mb={10}>
            요청하신 페이지를 찾을 수 없습니다.
          </Text>
          <Link to={'/'}>
            <AnimButton>
              확인
            </AnimButton>
          </Link>
        </Box>
      </Stack>
    </Container>
  )
}
