import { onAuthStateChanged, User } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import auth from './db/auth'
import { AppRoutes } from './routes'
import { deleteUser, initialState, setUser } from './slices/userSlice'

function App() {
  const dispatch = useDispatch()
  
  // устанавливаем слушателя для событий login/logout
  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user: User | null) => {
      dispatch(setUser({
        ...initialState, isLoading: true
      }))
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isLoading: false
        }))
      }
      else {
        dispatch(deleteUser())
      }
    })

    return () => {
      listener()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AppRoutes />
}

export default App
