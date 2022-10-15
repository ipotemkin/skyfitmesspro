import { FC } from 'react'

import { User } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'
import { Warning } from '../../components/Warning/Warning'
import { FirebaseUser } from '../../types'

import styles from './style.module.css'

type Props = {
  user: FirebaseUser
  text: string
}

export const WarningPage: FC<Props> = ({ user, text }) => {
  return (
    <div className={styles.container}>
      <Navigation children={!!user.uid && <User user={user} />} />
      <Warning text={text} />
    </div>
  )
}
