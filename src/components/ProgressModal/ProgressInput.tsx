import React, { FC } from 'react'

import styles from './style.module.css'

type ProgressInputProps = {
  name: string
  value: number | string
  amount: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProgressInput: FC<ProgressInputProps> = ({
  name,
  value,
  amount,
  onChange,
}) => {
  return (
    <label className={styles.text}>
      Сколько раз вы сделали "{name}"? ({amount}&nbsp;повторений)
      <input
        className={styles.input}
        placeholder="Введите значение"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
