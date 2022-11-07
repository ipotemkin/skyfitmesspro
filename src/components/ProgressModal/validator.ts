import { Exercise } from "../../types"

export const validateInput = (exercise: Exercise, inputValue: string) => {
  return Math.max(
    0,
    Math.min(Number(inputValue), exercise.retriesCount)
  )
}
