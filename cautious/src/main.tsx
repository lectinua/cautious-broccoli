import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Error from '@/pages/error'
import v1 from '@/pages/v1'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'}
           element={<Index/>}
           errorElement={<Error/>}
    >
      {v1}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </ChakraProvider>
)
