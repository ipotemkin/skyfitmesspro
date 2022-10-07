import { ref } from 'firebase/database'
import db from './db'

export const coursesRef = ref(db, '/courses')

export const usersRef = ref(db, '/users')

export const getCourseRef = (courseId: number) => {
    return ref(db, '/courses/' + courseId)
}

export const getUserCoursesRef = (uid: string) => {
    return ref(db, '/users/' + uid + '/courses')
}

export const getUserCourseRef = (uid: string, courseId: number) => {
    return ref(db, '/users/' + uid + '/courses/' + courseId)
}

export const getUserCourseWorkoutsRef = (uid: string, courseId: number) => {
    return ref(db, '/users/' + uid + '/courses/' + courseId + '/workouts')
}
