import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  let element = useRoutes(routes);

  return(
    <>
    <ChakraProvider>
      {element}
        <Toaster
          position="bottom-right"
          reverserOrder = {false}
        />
    </ChakraProvider>
    </>
  )
}

export default App