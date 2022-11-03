import { useEffect, useState } from 'react'
import { SpinnerModal } from './components/SpinnerModal/SpinnerModal'

import { useLoadCredentialsFromCookies } from './hooks/authHooks'
import { AppRoutes } from './routes'

function App() {
  const { loadCredentials } = useLoadCredentialsFromCookies()
  const [isSpinnerActive, setIsSpinnerActive] = useState(true)

  useEffect(() => {
    loadCredentials()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppRoutes />
      {isSpinnerActive && <SpinnerModal />}
    </>
  )
}

export default App
