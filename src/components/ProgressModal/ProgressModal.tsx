import React, { FC, useEffect, useState } from 'react'
import {
  ExercisePayload,
  useSetWorkoutStatusMutation,
  useUpdateUserExerciseProgressMutation,
  WorkoutArg,
  WorkoutStatusArg
} from '../../api/users.api'
import { useAppSelector } from '../../hooks/appHooks'
import { selectUser } from '../../slices/userSlice'
import { Exercise, Workout } from '../../types'
import { Button } from '../Button/Button'

import { ProgressInput } from './ProgressInput'

import styles from './style.module.css'

type ProgressModalProps = {
  setIsOpened: Function
  courseId: number
  workoutId: number
  exercises: Workout['exercises']
  onClick?: VoidFunction
}

type Form = {
  exercises?: Exercise[]  
}

export const ProgressModal: FC<ProgressModalProps> = ({
  setIsOpened, courseId, workoutId, exercises, onClick,
}) => {
  const [form, setForm] = useState<Form>({ exercises: [] })
  const user = useAppSelector(selectUser)
  const [updateProgress] = useUpdateUserExerciseProgressMutation()
  const [ setWorkoutStatus ] = useSetWorkoutStatusMutation()

  useEffect(() => {
    setForm({ exercises })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newExercises: Exercise[] = [...form.exercises || []]
    newExercises[index].userProgress = Math.max(
      0,
      Math.min(Number(e.target.value), newExercises[index].retriesCount)
    )
    setForm({ exercises: newExercises })
  }

  const handleSubmit = () => {
    let workoutStatus = true
    if (form.exercises) {
      const workoutArg: WorkoutArg = {
        uid: user.uid as string,
        courseId: courseId,
        workoutId: workoutId - 1,
      }
      form.exercises.forEach((item: Exercise, index: number) => {
        // проверяем, выполнены ли тренировки 
        workoutStatus &&= (item.userProgress === item.retriesCount)
        
        const updateData: ExercisePayload  = {
          arg: {
            ...workoutArg,
            exerciseId: index,
          },
          body: {
            userProgress: item.userProgress || 0
          }
        }
        updateProgress(updateData)
      })
      const workoutStatusArg: WorkoutStatusArg = {
        ...workoutArg,
        done: workoutStatus
      }
      setWorkoutStatus(workoutStatusArg)
    }
    if (onClick) onClick()
  }
  
  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Мой прогресс</h2>
        <div className={styles.fields}>
          {form.exercises?.map((exercise: Exercise, index: number) => (
            <ProgressInput
              name={exercise.name}
              value={exercise?.userProgress || 0}
              key={exercise.id}
              onChange={(e) => handleInput(e, index)}
            />
          ))}
        </div>
        <Button onClick={handleSubmit}>Отправить</Button>
      </div>
    </div>
  )
}
