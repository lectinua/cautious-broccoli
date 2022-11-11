import './index.css'

import { Box, Container, Stack, Text, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { WarningTwoIcon } from '@chakra-ui/icons'
import AnimButton from '@/components/animButton'

interface ErrorProps {
  text?: string
}

export default function Error(props: ErrorProps) {
  return (
    <Container maxW={'xl'}>
      <Stack as={Box}
             textAlign={'center'}
             spacing={{ base: 8, md: 14 }}
             py={{ base: 20, md: 36 }}>
        <Box textAlign="center" py={10} px={6}>
          <WarningTwoIcon boxSize={'50px'} color={'orange.300'}/>
          <Text color={'gray.500'} mt={4} mb={10}>
            {props.text}
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

Error.defaultProps = {
  text: '요청하신 페이지를 찾을 수 없습니다.'
}
