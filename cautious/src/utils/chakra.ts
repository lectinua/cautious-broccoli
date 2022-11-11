import { CreateToastFnReturn } from '@chakra-ui/react'

export const toast = (useToast: CreateToastFnReturn, title: string, description: string) => {
  useToast({
    title,
    description,
    status: 'success',
    duration: 3500,
    isClosable: true,
  })
}
