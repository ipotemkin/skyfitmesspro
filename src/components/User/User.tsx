import { mockUserResponse } from '../../data/user'
import { ReactComponent as Arrow } from './arrow-down.svg'

import styles from './style.module.css'

export const User = () => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar} />
      <div className={styles.name}>{mockUserResponse.username}</div>
      <Arrow />
    </div>
  )
}
