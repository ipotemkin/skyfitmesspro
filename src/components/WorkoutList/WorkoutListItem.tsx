import classNames from 'classnames'
import { FC } from 'react'

import { ReactComponent as Done } from './sberbank.svg'

import styles from './style.module.css'

type WorkoutListItemProps = {
  title: string
  text?: string
  done: boolean
}

export const WorkoutListItem: FC<WorkoutListItemProps> = ({
  title,
  text,
  done,
}) => {
  return (
    <li className={classNames(styles.listItem, done && styles.done)}>
      {done && <Done className={styles.icon} />}
      <h3 className={styles.title}>{title}</h3>
      {text && <span className={styles.text}>{text}</span>}
    </li>
  )
}
