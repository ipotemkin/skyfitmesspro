import { onAuthStateChanged } from "firebase/auth"
import { DataSnapshot, onValue } from "firebase/database"
import { useEffect, useState } from "react"
import { auth } from "../../api/firebase.api"
import { useAuth, useUserCourses } from "../../hooks/userHooks"
import UserDataService from "../../services/UserDataService"
import { UserData } from "../../types"
import { UserGallery } from "../PUserGallery/PUserGallery"
import { UserList } from "../PUserList/PUserList"

import { off } from 'firebase/database'

type FormData = {
  username: string
  password: string
}

export const Admin = () => {
  const [form, setForm] = useState<FormData>({ username: '', password: ''})
  const [uid, setUid] = useState<string | undefined>()
  const userCourses = useUserCourses(uid || '')
  const { signUp, signIn, logOut } = useAuth()
  const [users, setUsers] = useState<UserData[]>()

  // console.log('AuthDebug: users -->', users)
  
  // console.log(mockCourses[2].coverUrl)

  const onDataChange = (items: DataSnapshot) => {
    const usersFromDB = items.val()
    console.log('AuthDebug: usersFromDB -->', usersFromDB)
    setUsers(usersFromDB)
  }

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) setUid(user.uid)
      else setUid(undefined)
    })
    
    onValue(UserDataService.getAll(), onDataChange)
    
    return () => {
      listener()
      off(UserDataService.getAll(), 'value', onDataChange)
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
    {users && <UserList users={users}/>}
    {uid && <UserGallery uid={uid}/>}
  </>
}
