import { FC } from 'react'
import { User as FirebaseUser } from 'firebase/auth'

import { ReactComponent as Arrow } from './arrow-down.svg'

import styles from './style.module.css'

type Props = {
  user: FirebaseUser
}

export const User: FC<Props> = ({ user }) => {
  return (
    <div className={styles.user}>
      <div className={styles.avatar} />
      <div className={styles.name}>{user.displayName || user.email }</div>
      <Arrow />
    </div>
  )
}
