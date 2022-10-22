import React, { FC, useEffect, useState } from 'react'
import { Exercise, Workout } from '../../types'
import { Button } from '../Button/Button'

import { ProgressInput } from './ProgressInput'

import styles from './style.module.css'

type ProgressModalProps = {
  setIsOpened: Function
  exercises: Workout['exercises']
  onClick?: VoidFunction
}

type Form = {
  exercises?: Exercise[]
}

export const ProgressModal: FC<ProgressModalProps> = ({
  setIsOpened,
  exercises,
  onClick,
}) => {
  const [form, setForm] = useState<Form>({ exercises: [] })

  useEffect(() => {
    setForm({ exercises })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newExercises: Exercise[] = [...(form.exercises || [])]
    newExercises[index].userProgress = Math.max(
      0,
      Math.min(Number(e.target.value), newExercises[index].retriesCount)
    )
    setForm({ exercises: newExercises })
  }

  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Мой прогресс</h2>
        <div className={styles.fields}>
          {form.exercises?.map((exercise, index) => (
            <ProgressInput
              key={exercise.id}
              name={exercise.name}
              value={exercise?.userProgress || ''}
              amount={exercise.retriesCount}
              onChange={(e) => handleInput(e, index)}
            />
          ))}
        </div>
        <Button onClick={onClick}>Отправить</Button>
      </div>
    </div>
  )
}
