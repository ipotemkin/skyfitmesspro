import { Routes, Route } from 'react-router-dom'

import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { LoginForm } from './pages/AuthForm/LoginForm'
import { SignUpForm } from './pages/AuthForm/SignUpForm'
import { Main } from './pages/Main/Main'
import { NotFound } from './pages/NotFound/NotFound'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { Workout } from './pages/WorkoutPage/Workout'
import { Admin } from './components/Admin/Admin'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/aboutcourse/:id" element={<AboutCourse />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/workout/:id/:day" element={<Workout />} />
      <Route path="/admin" element={<Admin />} />      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
