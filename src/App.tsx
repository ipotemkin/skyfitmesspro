import { AboutCourse } from './pages/AboutCourse/AboutCourse'
import { Main } from './pages/Main/Main'
import { Workout } from './pages/WorkoutPage/Workout'

function App() {
  return (
    <>
      <Main />
      <AboutCourse id={1} />
      <Workout courseId={1} day={2} />
    </>
  )
}

export default App
