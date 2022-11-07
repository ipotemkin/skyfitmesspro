import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useChangeEmailMutation } from '../../api/auth.api'
import { EXP_MESSAGE } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks'
import { useEscapeKey } from '../../hooks/formHooks'
import { useGoToLoginWithMessage } from '../../hooks/shortcutsHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { hideSpinner, showSpinner } from '../../slices/spinnerSlice'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

type EmailModalProps = {
  setIsOpened: Function
}

type EmailData = {
  email: string
}

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)

export const EmailModal: FC<EmailModalProps> = ({ setIsOpened }) => {
  useEscapeKey(() => setIsOpened(false))
  const user = useAppSelector(selectCurrentUser)
  const goToLoginWithMessage = useGoToLoginWithMessage()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({ mode: 'onTouched' })

  const [changeEmail] = useChangeEmailMutation()
  const [email, setEmail] = useState(user.email || 'E-mail')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit: SubmitHandler<EmailData> = async (data) => {
    if (!user.idToken) {
      goToLoginWithMessage(EXP_MESSAGE)
      return
    }

    try {
      dispatch(showSpinner())
      await changeEmail({
        idToken: user.idToken,
        email: data.email,
      }).unwrap()
      dispatch(hideSpinner())
      setIsOpened(false)
    } catch {
      dispatch(hideSpinner())
      goToLoginWithMessage(EXP_MESSAGE)
    }
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
            placeholder={user.email || 'E-mail'}
            value={email}
            {...register('email', {
              required: 'Введите e-mail',
              pattern: {
                value: validEmail,
                message: 'Введите корректный e-mail',
              },
              onChange: handleChange,
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
