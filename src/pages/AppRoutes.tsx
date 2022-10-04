import { Route, Routes } from 'react-router'
import { Main } from './Main/Main'
import Login from './Authorization/Login'
import SignUp from './Authorization/SignUp'
import NotFound from './NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
