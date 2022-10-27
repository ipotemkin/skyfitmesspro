import { useAppSelector } from '../../hooks/appHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { Navigation } from '../../components/Navigation/Header'
import { User as UserNav } from '../../components/User/User'

import styles from './style.module.css'
import { CourseTable } from '../../components/AdminCourses/CourseTable'

export const AdminPage = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className={styles.adminPage}>
      <div className={styles.wrapper}>
        <Navigation>
          <UserNav user={currentUser} />
        </Navigation>
        <h1 className={styles.heading}>Управление курсами</h1>
        {currentUser.localId && <CourseTable uid={currentUser.localId} />}
      </div>
    </div>
  )
}
