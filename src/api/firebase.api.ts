import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, getDoc, doc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { projectId } from '../env';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// console.log('projectID -->', projectId);

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId: projectId,
  apiKey: "AIzaSyADzEwdRjcwMitDfmmBd9GdSvKwSQlc9hQ",
  authDomain: "skyfitnesspro-202210.firebaseapp.com",
  storageBucket: "skyfitnesspro-202210.appspot.com",
  messagingSenderId: "145031793249",
  appId: "1:145031793249:web:1a74ded7242c3bb89e3820",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
const user = auth.currentUser;
console.log('user -->', user);

onAuthStateChanged(auth, (user) => {
  console.log('onAuthStateChanged')
  if (user) {
    console.log('user -->', user)
  } else console.log(user)
})

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
