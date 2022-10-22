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
import { formatString } from './utils'

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  admin: '/admin',
  aboutCourse: '/aboutcourse',
  profile: '/profile',
  workout: '/courses/{}/workouts/{}',  // '/courses/:id/workouts/:day'
}

type ProtectedRouteProps = {
  redirectPath?: string;
  isAllowed: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = ROUTES.home, isAllowed }) => {
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
      <Route path={ROUTES.home} element={<Main />} />
      <Route path={ROUTES.login} element={<LoginForm />} />
      <Route path={ROUTES.signup} element={<SignUpForm />} />
      <Route path={ROUTES.admin} element={<Admin />} />
      <Route path={`${ROUTES.aboutCourse}/:id`} element={<AboutCourse />} />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={formatString(ROUTES.workout, [':id', ':day'])} element={<Workout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
