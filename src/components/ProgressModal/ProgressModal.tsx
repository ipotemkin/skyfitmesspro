import { FC, useEffect, useState } from 'react'

import { WorkoutArg } from '../../api/users.api'
import { useUpdateProgressAndWorkoutStatus } from '../../hooks/userCourseHooks'
import { Exercise } from '../../types'
import { Button } from '../Button/Button'
import { Modal } from '../Modal/Modal'
import { ProgressInput } from './ProgressInput'
import { validateInput } from './validator'

import styles from './style.module.css'

type ProgressModalProps = {
  setIsOpened: Function
  workoutArg: WorkoutArg
  exercises?: Exercise[]
  onClick?: VoidFunction
}

type Form = {
  exercises?: Exercise[]
}

export const ProgressModal: FC<ProgressModalProps> = ({
  setIsOpened,
  workoutArg,
  exercises,
  onClick,
}) => {
  const [form, setForm] = useState<Form>({ exercises: [] })
  const updateProgressAndWorkoutStatus = useUpdateProgressAndWorkoutStatus()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setForm({ exercises }) }, [])

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const exercises = [...form.exercises || []]
    exercises[index].userProgress = validateInput(exercises[index], e.target.value)
    setForm({ exercises })
  }

  const handleSubmit = async () => {
    if (form.exercises) await updateProgressAndWorkoutStatus(form.exercises, workoutArg)
    if (onClick) onClick()
  }

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') handleSubmit()
  }

  return (
    <Modal isOpen={() => setIsOpened(false)}>
      <div
        className={styles.content}
        onKeyDown={handleKeydown}
        data-cy="progress-modal"
      >
        <h2 className={styles.title}>Мой прогресс</h2>
        <div className={styles.fields}>
          {form.exercises?.map((exercise: Exercise, index: number) => (
            <ProgressInput
              id={exercise.id}
              key={exercise.id}
              name={exercise.name}
              value={exercise?.userProgress || ''}
              amount={exercise.retriesCount}
              onChange={(e) => handleInput(e, index)}
            />
          ))}
        </div>
        <Button onClick={handleSubmit}>Отправить</Button>
      </div>
    </Modal>
  )
}
