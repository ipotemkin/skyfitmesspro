import { ref } from 'firebase/database'
import db from './db'


// ссылка на курсы
export const coursesRef = ref(db, '/courses')

// ссылка на пользователей
export const usersRef = ref(db, '/users')

// получить ссылку на курс с courseId
export const getCourseRef = (courseId: number) => {
    return ref(db, '/courses/' + courseId)
}

// получиь ссылку на курсы пользователя с uid
export const getUserCoursesRef = (uid: string) => {
    return ref(db, '/users/' + uid + '/courses')
}

// получить ссылку на курс пользователя
export const getUserCourseRef = (uid: string, courseId: number) => {
    return ref(db, '/users/' + uid + '/courses/' + courseId)
}

// получить ссылку на тренировки пользователя по указанному курсу
export const getUserCourseWorkoutsRef = (uid: string, courseId: number) => {
    return ref(db, '/users/' + uid + '/courses/' + courseId + '/workouts')
}
