import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { AppCookies, FormData } from '../../types'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo/Logo'
import { Button } from '../../components/Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './style.module.css'
import { ROUTES } from '../../routes'
import { useSignInMutation } from '../../api/auth.api'
import { getErrorMessage } from '../../utils'
import { useAppCookies, useAppSelector } from '../../hooks/appHooks'
import { selectMessage, clearMessage } from '../../slices/messageSlice'
import { useDispatch } from 'react-redux'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)
const validPasswordLength = 6

export const LoginForm: FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [login] = useSignInMutation()
  const { setCookies } = useAppCookies()
  const message = useAppSelector(selectMessage)
  const [formMessage, setFormMessage] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (message) {
      setFormMessage(message)
      dispatch(clearMessage())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsBlocked(true)
    setError('')

    try {
      const res = await login({ email: data.email, password: data.password }).unwrap()
      setCookies({
        localId: res?.localId,
        idToken: res?.idToken,
        refreshToken: res?.refreshToken
      })
      navigate(ROUTES.profile)
    } catch (error: any) { // TODO выяснить, какой тип сюда вписать
      setError(getErrorMessage(error))
      setIsBlocked(false)
    }
  }

  const focusHandler = () => {
    setError('')
  }

  const clickHandler = () => {
    navigate(ROUTES.signup)
  }

  const inputPasswordStyle = classNames(styles.input, styles.inputPassword)

  return (
    <div className={styles.formWrapper}>
      {formMessage &&<h2 style={{ color: 'white' }}>{formMessage}</h2>}
      {/* {<h2 style={{ color: 'white' }}>Войдите в систему!</h2>} */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.inputs}>
          <input
            onFocus={focusHandler}
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
            onFocus={focusHandler}
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
        <p className={classNames(styles.error, styles.back)}>
          {error && <span>{error}</span>}
        </p>
        <div className={styles.buttons}>
          <Button buttonStatus={isBlocked ? 'disabled' : 'normal'}>
            Войти
          </Button>
          <Button
            type="outlined"
            btnType="button"
            onClick={clickHandler}
            buttonStatus={isBlocked ? 'disabled' : 'normal'}
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </div>
  )
}
