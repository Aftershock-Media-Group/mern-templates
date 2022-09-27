import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/toast'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { useStores } from './store/rootStore'
import { darkTheme } from './theme/darkTheme'
const { ToastContainer, toast } = createStandaloneToast({ theme: darkTheme })

const App = observer(() => {
  const root = useStores()
  root.toast = toast

  useEffect(() => {
    ;(async function () {
      const loggedIn = await root.checkLogin()
      if (!loggedIn) {
        const url = new URL(window.location.href)
        let token = url.searchParams.get('token')

        if (token) {
          root.handleLogin(token)
        } else if (window.location.href.includes('error')) {
          root.showToast(
            'Unauthorized',
            'The gmail account you used is not authorized. Please use the correct gmail account.',
            'error'
          )
        }
        window.history.replaceState({}, '', `/`)
      }
    })()
  }, [])

  return (
    <ChakraProvider theme={darkTheme}>
      {root.isLoggedIn ? <Home /> : <Login />}
      <ToastContainer />
    </ChakraProvider>
  )
})

export default App
