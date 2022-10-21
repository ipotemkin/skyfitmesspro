import { FC } from 'react'
import classNames from 'classnames'
import { FormData } from '../../types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/userHooks'
import { Logo } from '../../components/Logo/Logo'
import { Button } from '../../components/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './style.module.css'
import { ROUTES } from '../../routes'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

export const LoginForm: FC = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    signIn(
      data.email,
      data.password,
      // при успехе
      () => {
        navigate(ROUTES.profile)
      },
      // при ошибке
      () => {
        console.log('Неверный логин или пароль')
        reset()
      }
    )
  }

  const clickHandler = () => {
    navigate(ROUTES.signup)
  }

  const inputPasswordStyle = classNames(styles.input, styles.inputPassword)

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.logo}>
          <Logo />
        </div>
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
        </div>
        <div className={styles.buttons}>
          <Button>Войти</Button>
          <Button type="outlined" btnType="button" onClick={clickHandler}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
