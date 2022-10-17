import React, { FC } from 'react'
import { Workout } from '../../types'
import { Button } from '../Button/Button'

import { ProgressInput } from './ProgressInput'

import styles from './style.module.css'

type ProgressModalProps = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  exercises: Workout['exercises']
  onClick?: VoidFunction
}

export const ProgressModal: FC<ProgressModalProps> = ({
  setIsOpened,
  exercises,
  onClick,
}) => {
  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Мой прогресс</h2>
        <div className={styles.fields}>
          {exercises?.map((exercise) => (
            <ProgressInput
              name={exercise.name}
              amount={exercise.retriesCount}
            />
          ))}
        </div>
        <Button onClick={onClick}>Отправить</Button>
      </div>
    </div>
  )
}
