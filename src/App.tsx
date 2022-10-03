import { db, getCourses, getCourseById } from './api/firebase.api';
import './App.css';
import { Main } from './pages/Main/Main';

function App() {
  getCourses(db)
  getCourseById(db, 3)

  return <Main></Main>;
}

export default App;

