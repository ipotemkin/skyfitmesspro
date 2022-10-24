import { useAppSelector } from '../../hooks/appHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { Navigation } from '../Navigation/Header'
import { UserGallery } from '../PUserGallery/PUserGallery'
import { User as UserNav } from '../../components/User/User'

import styles from './style.module.css'

export const Admin = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className={styles.adminPage}>
      <div className={styles.wrapper}>
        <Navigation>
          <UserNav user={currentUser} />
        </Navigation>
        <h1 className={styles.heading}>Управление курсами</h1>


        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: 200,
            margin: 20,
          }}
        >
          <h3>Администрирование</h3>
        </div> */}
        {currentUser.localId && <UserGallery uid={currentUser.localId} />}
      </div>
    </div>
  )
}
