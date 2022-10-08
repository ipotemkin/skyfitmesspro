import { AuthDebug } from './components/PAuthDebug/PAuthDebug'
import { LoginForm } from './components/AuthForm/LoginForm'
import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { Main } from './pages/Main/Main'

function App() {
  return (
    <>
      <Main />
      <AboutCourse id={0} />
      <AuthDebug/>
      <LoginForm/>
    </>
  )
}

export default App
