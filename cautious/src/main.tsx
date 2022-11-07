import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Index/>
    </ChakraProvider>
  </React.StrictMode>
)
