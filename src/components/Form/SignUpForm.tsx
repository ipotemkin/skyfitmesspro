import styles from './style.module.css'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormData } from '../../types'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import classNames from 'classnames'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

const SignUpForm = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    reset()
  }

  const clickHandler = () => {
    isValid && navigate('/')
  }

  const inputPasswordStyle = classNames(styles.formInput, {
    [styles.password]: styles.password,
  })

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formLogo}>
          <Logo />
        </div>
        <div className={styles.formInputs}>
          <input
            className={styles.formInput}
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: validEmail,
                message: 'Email should be valid',
              },
            })}
          />
          <p className={styles.formError}>
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
          <p className={styles.formError}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>

          <input
            className={inputPasswordStyle}
            placeholder="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm password!',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues()
                  return password === value || `Passwords don't match!`
                },
              },
            })}
          />
          <p className={styles.formError}>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </p>
        </div>
        <div className={styles.formButtons}>
          <Button buttonText="Зарегистрироваться" onClick={clickHandler} />
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
