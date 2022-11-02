import { FC } from 'react'

import styles from './style.module.css'

type Props = { text: string }

export const Warning: FC<Props> = ({ text }) => {
  return <p className={styles.message}>{text}</p>
}
