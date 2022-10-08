import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { FormData } from '../../types'
import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'

import styles from './style.module.css'
import { useAuth } from '../../hooks/userHooks'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

export const LoginForm: FC = () => {
  const { signIn } = useAuth()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    signIn(data.email, data.password)
    reset()
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
              required: 'Введите адрес эл. почты',
              pattern: {
                value: validEmail,
                message: 'Введите корректный адрес',
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
          <Link to="/profile">
            <Button>{'Войти'}</Button>
          </Link>
          <Link to="/signup">
            <Button type="outlined" btnType="button">
              {'Зарегистрироваться'}
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
