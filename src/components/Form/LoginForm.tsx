import styles from './style.module.css'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormData } from '../../types'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import classNames from 'classnames'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    reset()
  }

  const clickHandler = () => {
    navigate('/register')
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
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: validEmail,
                message: 'Email should be valid',
              },
            })}
          />
          <p className={styles.error}>
            {errors.email && <span>{errors.email.message}</span>}
          </p>

          <input
            className={inputPasswordStyle}
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Password is required!',
              minLength: {
                value: validPasswordLength,
                message: `Password should be at least ${validPasswordLength} characters`,
              },
            })}
          />
          <p className={styles.error}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>
        </div>
        <div className={styles.buttons}>
          <Button buttonText="Войти" />
          <Button
            buttonText="Зарегистрироваться"
            type="outlined"
            btnType="button"
            onClick={clickHandler}
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
