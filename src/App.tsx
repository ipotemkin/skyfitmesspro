import { useEffect } from 'react'

import { useLoadCredentialsFromCookies } from './hooks/authHooks'
import { AppRoutes } from './routes'

function App() {
  const { loadCredentials } = useLoadCredentialsFromCookies()

  useEffect(() => {
    loadCredentials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AppRoutes />
}

export default App
