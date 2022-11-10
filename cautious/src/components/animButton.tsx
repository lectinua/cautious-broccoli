import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react'

export default function AnimButton(props: ButtonProps) {
  return (
    <Button px={8}
            bg={useColorModeValue('gray.300', 'gray.600')}
            color={useColorModeValue('black', 'white')}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
              bg: 'gray.500',
              color: 'white'
            }}
            {...props}>
      {props.children}
    </Button>
  )
}
