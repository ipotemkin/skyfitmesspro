import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore/lite";
import { ReactEventHandler, ReactHTML, ReactHTMLElement, useEffect, useState } from "react";
import { auth } from "../../api/firebase.api";
import { useGetUserCoursesQuery } from "../../api/users.api";
import { mockCourses } from "../../data/course";
import { useAuth, useUserCourses } from "../../hooks/userHooks";
import { UserGallery } from "../UserGallery/UserGallery";

type FormData = {
  username: string
  password: string
}

export const AuthDebug = () => {
  const [form, setForm] = useState<FormData>({ username: '', password: ''})
  const [uid, setUid] = useState<string | undefined>()
  const userCourses = useUserCourses(uid || '')
  const { signUp, signIn, logOut } = useAuth()
  
  console.log(mockCourses[2].coverUrl)

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) setUid(user.uid)
      else setUid(undefined)
    })
  
    return () => {
      listener()
    }
  }, [])  

  const handleSignIn = () => {
    signIn(form.username, form.password)
  }
  
  const handleLogout = () => {
    logOut()
  }

  const handleSignup = () => {
    signUp(form.username, form.password)
  }

  const handleCurrentUser = () => {
    console.log('handleCurrentUser')
    console.log(auth.currentUser)
  }

  const handleCurrentUserCourses = () => {
   const user = auth.currentUser
   if (user) {
    console.log('current user uid -->', user.uid)
    console.log('user courses -->', userCourses)
   }
  }

  // useEffect(() => {
  //   if (userCourses) console.log('useEffect: userCourses -->', userCourses)
  // }, [userCourses])

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    setForm(prev => ({...prev, username}))
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setForm(prev => ({...prev, password}))
  }
  
  return <>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 200, margin: 20 }}>
      <h3>Auth debug console</h3>
      <input type="text"
        placeholder="username (email)"
        value={form?.username}
        onChange={handleChangeUsername}
      ></input>
      <input type="text"
        placeholder="password"
        value={form?.password}
        onChange={handleChangePassword}
      ></input>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleSignup}>Sign Up!</button>
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <button onClick={handleCurrentUser}>Get current user</button>
      <button onClick={handleCurrentUserCourses}>Get current user courses</button>
    </div>
    {uid && <UserGallery uid={uid}/>}
    {/* {<UserGallery uid={'123'}/>} */}
  </>
}
