import { FC, useEffect, useState } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { AdminPage } from './pages/AdminPage/AdminPage'
import { useAppSelector } from './hooks/appHooks'
import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { LoginForm } from './pages/AuthForm/LoginForm'
import { SignUpForm } from './pages/AuthForm/SignUpForm'
import { Main } from './pages/Main/Main'
import { NotFound } from './pages/NotFound/NotFound'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { Workout } from './pages/WorkoutPage/Workout'
import { selectCurrentUser } from './slices/currentUserSlice'
import { checkJWTExpTime, formatString } from './utils'
import { useDispatch } from 'react-redux'
import { setMessage } from './slices/messageSlice'
import { accessTokenName, EXP_MESSAGE } from './constants'

export const ROUTES = {
  home: '/',
  login: '/login',
  signup: '/signup',
  admin: '/admin',
  aboutCourse: '/aboutcourse',
  profile: '/profile',
  workout: '/courses/{}/workouts/{}', // '/courses/:id/workouts/:day'
}

type ProtectedRouteProps = {
  redirectPath?: string
  isAllowed?: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  redirectPath = ROUTES.home,
  isAllowed,
}) => {
  if (isAllowed === undefined) redirectPath = ROUTES.login

  if (!isAllowed) return <Navigate to={redirectPath} replace={true} />

  return <Outlet />
}

export const AppRoutes = () => {
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useDispatch()

  // если поставить false, то даже если в куках есть данные, перенаправляет на home page
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(true)

  const isTokenValid = user.idToken ? checkJWTExpTime(user.idToken) : false

  useEffect(() => {
    // просим пользователя перезайти
    if (user.needRelogin) {
      dispatch(setMessage(EXP_MESSAGE))
      Cookies.remove(accessTokenName)
      setIsLoggedIn(undefined)
    }
    // если токен валиден, редиректим на заданную страницу
    else if (isTokenValid || (user.idToken && !user.needRelogin))
      setIsLoggedIn(true)
    // если токена нет, редиректим на home page
    else setIsLoggedIn(false)
  }, [user.idToken, user.needRelogin, isTokenValid, dispatch])

  return (
    <Routes>
      <Route path={ROUTES.home} element={<Main />} />
      <Route path={ROUTES.login} element={<LoginForm />} />
      <Route path={ROUTES.signup} element={<SignUpForm />} />
      <Route path={`${ROUTES.aboutCourse}/:id`} element={<AboutCourse />} />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={ROUTES.admin} element={<AdminPage />} />
        <Route path={ROUTES.profile} element={<ProfilePage />} />
        <Route
          path={formatString(ROUTES.workout, [':id', ':day'])}
          element={<Workout />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
