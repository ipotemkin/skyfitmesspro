import { FC } from 'react'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './style.module.css'

type EmailModalProps = {
  setIsOpened: Function
}

type EmailData = {
  email: string
}

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)

export const EmailModal: FC<EmailModalProps> = ({ setIsOpened }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<EmailData> = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <form
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo />
        <h3 className={styles.title}>Новый e-mail:</h3>
        <div className={styles.inputs}>
          <input
            className={styles.input}
            placeholder="E-mail"
            {...register('email', {
              required: 'Введите e-mail',
              pattern: {
                value: validEmail,
                message: 'Введите корректный e-mail',
              },
            })}
          />
          <p className={styles.error}>
            {errors.email && <span>{errors.email.message}</span>}
          </p>
        </div>

        <Button>Сохранить</Button>
      </form>
    </div>
  )
}
