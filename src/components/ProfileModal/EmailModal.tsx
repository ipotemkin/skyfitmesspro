import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useChangeEmailMutation } from '../../api/auth.api'
import { useAppCookies, useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { setMessage } from '../../slices/messageSlice'
import { AppCookies } from '../../types'
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailData>({ mode: 'onTouched' })
  const user = useAppSelector(selectCurrentUser)
  const [changeEmail] = useChangeEmailMutation()
  const navigate = useNavigate()
  const { setCookies } = useAppCookies()
  const [email, setEmail] = useState(user.email || "E-mail") 
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  
  const onSubmit: SubmitHandler<EmailData> = async (data) => {
    if (!user.idToken) {
      navigate(ROUTES.login)
      return
    }

    try {
      const res = await changeEmail({ idToken: user.idToken, email: data.email }).unwrap()
      setCookies({ ...res } as AppCookies)
      setIsOpened(false)
    } catch (error) {
      console.error('Change email failed -->', error)
      dispatch(setMessage('Ваша сессия истекла. Пожалуйста, войдите в систему!'))
      navigate(ROUTES.login)
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
            placeholder={user.email || "E-mail"}
            value={email}
            {...register('email', {
              required: 'Введите e-mail',
              pattern: {
                value: validEmail,
                message: 'Введите корректный e-mail',
              },
              onChange: handleChange
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
