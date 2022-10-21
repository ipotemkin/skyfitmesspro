import { FC, useEffect, useState } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'

import { Admin } from './components/Admin/Admin'
import { useAppSelector } from './hooks/appHooks'
import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { LoginForm } from './pages/AuthForm/LoginForm'
import { SignUpForm } from './pages/AuthForm/SignUpForm'
import { Main } from './pages/Main/Main'
import { NotFound } from './pages/NotFound/NotFound'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { Workout } from './pages/WorkoutPage/Workout'
import { selectUser } from './slices/userSlice'


type ProtectedRouteProps = {
  redirectPath?: string;
  isAllowed: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = '/', isAllowed }) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace={true} />
  return <Outlet />
}


export const AppRoutes = () => {
  const user = useAppSelector(selectUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (user.uid && !user.isLoading) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user.uid, user.isLoading])

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/admin" element={<Admin />} />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path="/aboutcourse/:id" element={<AboutCourse />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/courses/:id/workouts/:day" element={<Workout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
