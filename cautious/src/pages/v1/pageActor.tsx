import ProfileCard from '@/components/actor/profile_card'
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { Actor, deleteActor, saveActor, selectActors } from '@/apis/actor'
import { ChangeEvent, useEffect, useState } from 'react'
import AnimButton from '@/components/animButton'
import { Form } from 'react-router-dom'
import { deepCopy } from '@/utils/api'

export default function PageActor() {
  const initialState: Actor = {
    name: '',
    description: ''
  }

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modifyMode, setModifyMode] = useState(false)
  const [actors, setActors] = useState<Actor[]>([])
  const [actor, setActor] = useState<Actor>(deepCopy<Actor>(initialState))

  const refresh = async () => {
    const list = await selectActors()
    setActors(list)
  }
  useEffect(() => void (refresh()), [])

  const handleClick = (actor: Actor) => {
    setActor(actor)
    setModifyMode(true)
    onOpen()
  }

  const handleCreate = () => {
    setActor(deepCopy<Actor>(initialState))
    setModifyMode(false)
    onOpen()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setActor({ ...actor, [name]: value })
  }

  const handleSave = async () => {
    await saveActor({
      ...actor,
      updated_at: new Date()
    })

    await refresh()

    onClose()

    toast({
      title: '저장 완료',
      description: '저장되었습니다.',
      status: 'success',
      duration: 3500,
      isClosable: true,
    })
  }

  const handleDelete = async () => {
    if ( actor.id === undefined ) return

    await deleteActor(actor.id)

    await refresh()

    onClose()

    toast({
      title: '삭제 완료',
      description: '삭제되었습니다.',
      status: 'success',
      duration: 3500,
      isClosable: true,
    })
  }

  return (
    <>
      <Box w={'full'}
           bg={useColorModeValue('gray.50', 'gray.800')}
           borderColor={useColorModeValue('gray.200', 'gray.700')}
           borderWidth={'1px'}
           boxShadow={'2xl'}
           rounded={'md'}
           display={'flex'}
           justifyContent={'space-between'}
           alignItems={'center'}
           p={4}
           mb={3}>
        <Box fontWeight={'semibold'}
             fontSize={'sm'}>
          총 {actors.length}건
        </Box>
        <Box>
          <AnimButton size={'sm'}
                      onClick={handleCreate}>
            등록
          </AnimButton>
        </Box>
      </Box>
      <Grid gap={4}
            templateColumns={{ xl: 'repeat(5, 1fr)', md: 'repeat(3, 1fr)', sm: 'repeat(1, 1fr)' }}>
        {actors.map(actor => <ProfileCard key={actor.id} actor={actor} handleClick={() => handleClick(actor)}/>)}
      </Grid>
      <Modal closeOnOverlayClick={false}
             isOpen={isOpen}
             onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Actor</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Form>
              <Flex gap={2}
                    direction={'column'}>
                <label>
                  <Text fontSize={'sm'}>이름</Text>
                  <Input name={'name'}
                         placeholder={'이름'}
                         value={actor.name}
                         onChange={handleChange}/>
                </label>
                <label>
                  <Text fontSize={'sm'}>설명</Text>
                  <Input name={'description'}
                         placeholder={'설명'}
                         value={actor.description}
                         onChange={handleChange}/>
                </label>
              </Flex>
            </Form>
          </ModalBody>

          <ModalFooter display={'flex'}
                       justifyContent={'space-between'}>
            <Box>
              {
                modifyMode ?
                  <Button colorScheme="red"
                          mr={3}
                          onClick={handleDelete}>
                    삭제
                  </Button>
                  : ''
              }
            </Box>
            <Box>
              <Button colorScheme="orange"
                      mr={3}
                      onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="green"
                      onClick={handleSave}>
                {modifyMode ? '수정' : '등록'}
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
