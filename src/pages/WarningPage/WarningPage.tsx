import { FC } from 'react'

import { Navigation } from '../../components/Navigation/Header'
import { User } from '../../components/User/User'
import { Warning } from '../../components/Warning/Warning'
import { FirebaseUserRESTAPI } from '../../types'

import styles from './style.module.css'

type Props = {
  text: string
  user?: FirebaseUserRESTAPI
}

export const WarningPage: FC<Props> = ({ user, text }) => {
  return (
    <div className={styles.container}>
      <Navigation children={!!user?.localId && <User user={user} />} />
      <Warning text={text} />
    </div>
  )
}
