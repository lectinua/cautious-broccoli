import React, { ReactNode } from 'react'
import {
  Box,
  BoxProps,
  CloseButton,
  ComponentWithAs,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, IconProps } from '@chakra-ui/icons'
import { FaHome } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface LinkItemProps {
  name: string
  icon: ComponentWithAs<'svg', IconProps> | IconType
  href: string
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FaHome, href: '#' },
]

export default function Sidebar({ children, logo }: { children: ReactNode, logo: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="calc(100vh - 64px)" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent logo={logo} onClose={onClose}/>
        </DrawerContent>
      </Drawer>
      <MobileNav logo={logo} onOpen={onOpen}/>
      <Box p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  logo: string
}

const SidebarContent = ({ onClose, logo, ...rest }: SidebarProps) => {
  return (
    <Box bg={useColorModeValue('white', 'gray.900')}
         borderRight="1px"
         borderRightColor={useColorModeValue('gray.200', 'gray.700')}
         w="full"
         pos="fixed"
         h="full"
         {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {logo}
        </Text>
        <CloseButton onClick={onClose}/>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: ComponentWithAs<'svg', IconProps> | IconType
  children: string | number
  href: string
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: 'cyan.400',
              color: 'white',
            }}
            {...rest}>
        {icon && (
          <Icon mr="4"
                fontSize="16"
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
  logo: string
}

const MobileNav = ({ onOpen, logo, ...rest }: MobileProps) => {
  return (
    <Flex px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          justifyContent="flex-start"
          {...rest}>
      <IconButton variant="outline"
                  onClick={onOpen}
                  aria-label="open menu"
                  icon={<HamburgerIcon/>}
      />
      <Text fontSize="2xl" ml="8" fontWeight="bold">
        {logo}
      </Text>
    </Flex>
  )
}
