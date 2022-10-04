// import { db, getCourses, getCourseById } from './api/firebase.api';
import { api } from './api/firebase2.api';
import './App.css';
import { Main } from './pages/Main/Main';

function App() {
  // getCourses(db)
  // getCourseById(db, 3)

  api.getCourses();

  return <Main></Main>;
}

export default App;

