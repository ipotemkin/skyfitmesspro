import { FC } from 'react'

import { CourseMainData } from '../../types'

import styles from './style.module.css'

type Props = { item: CourseMainData }

export const Card: FC<Props> = ({ item }) => {
  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(${item.coverUrl})` }}
    >
      <p className={styles.title}>{item.name}</p>
    </div>
  )
}
