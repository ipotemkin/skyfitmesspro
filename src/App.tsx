import { useEffect } from 'react'
import { httpOnlyProxy } from './env'

import { useLoadCredentialsFromCookies } from './hooks/authHooks'
import { AppRoutes } from './routes'

function App() {
  console.log('httpOnlyProxy -->', httpOnlyProxy)
  
  const { loadCredentials } = useLoadCredentialsFromCookies()

  useEffect(() => {
    loadCredentials()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AppRoutes />
}

export default App
