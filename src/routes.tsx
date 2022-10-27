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
import { selectCurrentUser } from './slices/currentUserSlice'
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
  const user = useAppSelector(selectCurrentUser)
  
  // если поставить false, то даже если в куках есть данные, перенаправляет на /
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    if (user.idToken) {
      console.log('AppRoutes: user.idToken present -->', user.idToken)
      setIsLoggedIn(true)
    } 
    else {
      console.log('AppRoutes: no user.idToken -->', user.idToken)
      setIsLoggedIn(false)
    }
  }, [user.idToken])

  return (
    <Routes>
      <Route path={ROUTES.home} element={<Main />} />
      <Route path={ROUTES.login} element={<LoginForm />} />
      <Route path={ROUTES.signup} element={<SignUpForm />} />
      <Route path={`${ROUTES.aboutCourse}/:id`} element={<AboutCourse />} />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={ROUTES.admin} element={<Admin />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route path={formatString(ROUTES.workout, [':id', ':day'])} element={<Workout />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
