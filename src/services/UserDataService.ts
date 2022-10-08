import { child, get, ref } from "firebase/database"
import db from '../db/db'

const users = ref(db, '/users')

export class UsersDataService {
  getAll() {
    return users
  }
  // create(user) {
  //   return users.push(user)
  // }
  
}

export const getUserExerciseProgress = (uid: string, courseId: number, workoutsId: number) => {

}


export const getUserCourse = (uid: string, courseId: number) => {
  const usersRef = ref(db, '/users')
  // /${uid}/courses/${courseId}`)

  get(child(usersRef, `${uid}/courses/${courseId}`))
  .then(snapshot => {
    if(snapshot.exists()) {
      console.log('getUserCourse')
      console.log(snapshot.val())
    } else {
      console.log('No data found')
    }
  })
  .catch(err => {
    console.error(err)
  })
}

export default new UsersDataService()
