import React, { FC } from 'react'

import styles from './style.module.css'

type ProgressInputProps = {
  id?: number | string
  name: string
  value: number | string
  amount: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProgressInput: FC<ProgressInputProps> = ({
  id,
  name,
  value,
  amount,
  onChange,
}) => {
  return (
    <label className={styles.text}>
      Сколько раз вы сделали "{name}"? ({amount}&nbsp;повторений)
      <input
        autoFocus={id === 1}
        className={styles.input}
        placeholder="Введите значение"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
