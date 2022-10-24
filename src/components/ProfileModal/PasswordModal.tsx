import classNames from 'classnames'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useChangePasswordMutation } from '../../api/auth.api'
import { useAppCookies, useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { AppCookies } from '../../types'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

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
  const user = useAppSelector(selectCurrentUser)
  const [changePassword] = useChangePasswordMutation()
  const navigate = useNavigate()
  const { setCookies } = useAppCookies()


  const onSubmit: SubmitHandler<PasswordData> = async (data) => {
    if (!user.idToken) {
      navigate(ROUTES.login)
      return
    }

    try {
      const res = await changePassword({
        idToken: user.idToken, password: data.password
      }).unwrap()
      setCookies({ ...res } as AppCookies)
      setIsOpened(false)
    } catch (error) {
      console.error('Change password failed -->', error)
      navigate(ROUTES.login)
    }    
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
