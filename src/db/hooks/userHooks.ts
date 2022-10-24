import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth'

import auth from "../auth"
import { useDispatch } from 'react-redux'
import { initialState, setUser } from '../../slices/userSlice'

export const useAuth = () => {
  const noop = () => {}  // заглушка для колбэков
  const dispatch = useDispatch()

  // залогиниться
  const signIn = (
    username: string,
    password: string,
    successCallback = noop,
    errorCallback = noop
    ) => {
    dispatch(setUser({ ...initialState }))
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in: ', user)
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isLoading: false
        }))
        successCallback() // на всякий случай
      })
      .catch((error) => {
        console.error(
          `sign-in failed: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback() // на всякий случай
      })   
  }

  // разлогиниться
  const logOut = (successCallback = noop, errorCallback = noop) => {
    signOut(auth).then(() => {
      console.log('Sign-out successful!')
      successCallback() // на всякий случай
    }).catch((error) => {
      console.error('Sign-out failed!')
      errorCallback() // на всякий случай
    })
  }

  // зарегистировать нового пользователя
  const signUp = (
    username: string,
    password: string,
    successCallback = noop,
    errorCallback = noop
    ) => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User created -->', user)
        successCallback() // на всякий случай
      })
      .catch((error) => {
        console.error(
          `Error creating a user: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback() // на всякий случай
      })
  }

  return { signIn, logOut, signUp }
}

export const useManageUser = () => {
  const noop = () => {}  // заглушка для колбэков

  const updateEmail = (
    newEmail: string,
    successCallback = noop,
    errorCallback = noop
  ) => {
    if (auth.currentUser) {
      firebaseUpdateEmail(auth.currentUser, newEmail).then(() => {
        console.log('Email updated')
        successCallback()
      }).catch((error) => {
        console.error(
          `update email failed: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback()
      })
    }
  }

  const updatePassword = (
    newPassword: string,
    successCallback = noop,
    errorCallback = noop
  ) => {
    if (auth.currentUser) {
      firebaseUpdatePassword(auth.currentUser, newPassword).then(() => {
        console.log('Password updated')
        successCallback()
      }).catch((error) => {
        console.error(
          `update password failed: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback()
      })
  
    }
  }
  
  return { updateEmail, updatePassword }
}
