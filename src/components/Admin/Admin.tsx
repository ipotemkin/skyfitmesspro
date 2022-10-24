import { useAppSelector } from '../../hooks/appHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { UserGallery } from '../PUserGallery/PUserGallery'

import styles from './style.module.css'

export const Admin = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: 200,
          margin: 20,
        }}
      >
        <h3>Администрирование</h3>
      </div> 
      {currentUser.localId && <UserGallery uid={currentUser.localId} />}
    </div>
  )
}
