import { FC } from 'react'
import classNames from 'classnames'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './style.module.css'
import { useManageUser } from '../../hooks/userHooks'
import { useNavigate } from 'react-router-dom'

type PasswordModalProps = {
  setIsOpened: Function
}

type PasswordData = {
  password: string
  confirmPassword: string
}

const validPasswordLength = 6

export const PasswordModal: FC<PasswordModalProps> = ({ setIsOpened }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordData>({ mode: 'onTouched' })
  const { updatePassword } = useManageUser()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<PasswordData> = (data) => {
    updatePassword(
      data.password,
      () => {
        setIsOpened(false)
      },
      () => {
        navigate('/login')
      }
    )
    console.log(data)
  }

  const inputPasswordStyle = classNames(styles.input, styles.inputPassword)

  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <form
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo />
        <h3 className={styles.title}>Новый пароль:</h3>
        <div className={styles.inputs}>
          <input
            className={inputPasswordStyle}
            placeholder="Пароль"
            type="password"
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: validPasswordLength,
                message: `Пароль должен быть не менее ${validPasswordLength} символов`,
              },
            })}
          />
          <p className={styles.error}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>

          <input
            className={inputPasswordStyle}
            placeholder="Повторите пароль"
            type="password"
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues()
                  return password === value || `Пароли не совпадают`
                },
              },
            })}
          />
          <p className={styles.error}>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </p>
        </div>

        <Button>Сохранить</Button>
      </form>
    </div>
  )
}
