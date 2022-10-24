import { FC } from 'react'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { useChangeEmailMutation } from '../../api/auth.api'
import { useAppCookies } from '../../hooks/userHooks'

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

  const onSubmit: SubmitHandler<EmailData> = async (data) => {
    if (!user.idToken) {
      navigate(ROUTES.login)
      return
    }

    try {
      const res = await changeEmail({ idToken: user.idToken, email: data.email }).unwrap()
      setCookies({ ...res })
      setIsOpened(false)
    } catch (error) {
      console.error('Change email failed -->', error)
      navigate(ROUTES.login)
    }

    console.log(data)
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
        </div>

        <Button>Сохранить</Button>
      </form>
    </div>
  )
}
