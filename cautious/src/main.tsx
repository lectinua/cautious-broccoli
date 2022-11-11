import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import v1 from '@/pages/v1'
import Index from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index/>,
    children: v1
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </ChakraProvider>
)
