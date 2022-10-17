import React, { FC, useState } from 'react'

import styles from './style.module.css'

type ProgressInputProps = {
  name: string
  amount: number
}

export const ProgressInput: FC<ProgressInputProps> = ({ name, amount }) => {
  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    let inputValue = value.replace(/\D/gi, '')
    if (Number(inputValue) > amount) inputValue = amount.toString()
    setValue(inputValue)
  }

  return (
    <label className={styles.text}>
      Сколько раз вы сделали "{name}"?
      <input
        className={styles.input}
        placeholder="Введите значение"
        value={value}
        onChange={handleChange}
      />
    </label>
  )
}
