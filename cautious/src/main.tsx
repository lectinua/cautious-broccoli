import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/store/user'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <PersistGate persistor={persistor}>
      <Index/>
    </PersistGate>
  </ChakraProvider>
)
