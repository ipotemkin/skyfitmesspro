import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { Main } from './pages/Main/Main'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'

function App() {
  return (
    <>
      <Main />
      <AboutCourse id={1} />
      <ProfilePage />
    </>
  )
}

export default App
