import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, Firestore, getDoc, doc } from 'firebase/firestore/lite'
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import {
  projectId,
  apiKey,
  databaseURL,
  authDomain,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} from '../env'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { get, getDatabase, onValue, ref, set } from "firebase/database"

// console.log('projectID -->', projectId);

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  projectId,
  apiKey,
  databaseURL,
  authDomain,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);

// const user = auth.currentUser;
// console.log('user -->', user);

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


export const db_rtime = getDatabase(app)


const coursesRef = ref(db_rtime, 'users/123')
onValue(coursesRef, (snapshot) => {
  const data = snapshot.val()
  console.log('data -->', data)
})

export const getUserWorkoutStatus = (uid: string, courseId: number, workoutId: number) => {
  const workoutRef = ref(db_rtime, `users/${uid}/courses/${courseId}/workouts/${workoutId}/done`)
  get(workoutRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val())
    } else {
      console.log("No data available")
    }
  }).catch((error) => {
    console.error(error)
  })
}

export const getUserWorkoutStatusAsync = async (uid: string, courseId: number, workoutId: number) => {
  const workoutRef = ref(db_rtime, `users/${uid}/courses/${courseId}/workouts/${workoutId}/done`)
  try {
    const snapshot = await get(workoutRef)
    if (snapshot.exists()) {
      console.log(snapshot.val())
    } else {
      console.log("No data available")
    }
  } catch (error) {
    console.error(error)
  }
}

// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
