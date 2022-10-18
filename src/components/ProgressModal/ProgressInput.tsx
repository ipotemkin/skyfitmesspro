import React, { FC, useState } from 'react'
import { Exercise } from '../../types'

import styles from './style.module.css'

type ProgressInputProps = {
  name: string
  value: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProgressInput: FC<ProgressInputProps> = ({ name, value, onChange}) => {
  return (
    <label className={styles.text}>
      Сколько раз вы сделали "{name}"?
      <input
        className={styles.input}
        type="number"
        placeholder="Введите значение"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
