import { AuthDebug } from './components/AuthDebug/AuthDebug'
import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { Main } from './pages/Main/Main'

function App() {
  return (
    <>
      <Main />
      <AboutCourse id={0} />
      <AuthDebug/>
    </>
  )
}

export default App
