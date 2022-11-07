import classNames from 'classnames'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useChangePasswordMutation } from '../../api/auth.api'
import { EXP_MESSAGE } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { useEscapeKey } from '../../hooks/formHooks'
import { useGoToLoginWithMessage } from '../../hooks/shortcutsHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { hideSpinner, showSpinner } from '../../slices/spinnerSlice'
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
  useEscapeKey(() => setIsOpened(false))
  const user = useAppSelector(selectCurrentUser)
  const goToLoginWithMessage = useGoToLoginWithMessage()
  const [changePassword] = useChangePasswordMutation()
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordData>({ mode: 'onTouched' })

  const onSubmit: SubmitHandler<PasswordData> = async (data) => {
    if (!user.idToken) {
      goToLoginWithMessage(EXP_MESSAGE)
      return
    }

    try {
      dispatch(showSpinner())
      await changePassword({
        idToken: user.idToken,
        password: data.password,
      }).unwrap()
      dispatch(hideSpinner())
      setIsOpened(false)
    } catch (error) {
      dispatch(hideSpinner())
      goToLoginWithMessage(EXP_MESSAGE)
    }
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
