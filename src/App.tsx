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
      console.log('App: onAuthStateChanged')
      // dispatch(setUser({
      //   ...initialState
      // }))
      
      if (user) {
        console.log('App: onAuthStateChanged: user -->', user)
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isLoading: false
        }))
      }
      else {
        console.log('App: onAuthStateChanged: no user -->', user)
        dispatch(deleteUser())
        dispatch(setUser({
          ...initialState, isLoading: false
        }))
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
