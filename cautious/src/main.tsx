import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Index/>
      </PersistGate>
    </Provider>
  </ChakraProvider>
)
