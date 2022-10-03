import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, getDoc, doc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { projectId } from '../env';

// console.log('projectID -->', projectId);

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId: projectId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Get a list of courses from the database
export async function getCourses(db: Firestore) {
  // console.log('db type -->', typeof db);
  const coursesCol = collection(db, 'courses');
  const coursesSnapshot = await getDocs(coursesCol);
  const courseList = coursesSnapshot.docs.map(doc => ({
    // 'id': doc.data()._id,
    'name': doc.data().name,
    'coverUrl': doc.data().coverUrl
  }));
  // const courseList = coursesSnapshot.docs.map(doc => doc.data());
  console.log(courseList);
  return courseList;
}

// Get a list of courses from the database
export async function getCourseById(db: Firestore, courseId: number) {
  const docRef = doc(db, 'courses', String(courseId));
  const courseSnapshot = await getDoc(docRef);
  const course = courseSnapshot.data();
  console.log(course);
  return course;
}
