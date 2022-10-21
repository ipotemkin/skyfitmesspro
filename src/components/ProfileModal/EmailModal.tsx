import { FC } from 'react'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './style.module.css'
import { useManageUser } from '../../hooks/userHooks'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectUser, setUser } from '../../slices/userSlice'
import { useAppSelector } from '../../hooks/appHooks'

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
  const user = useAppSelector(selectUser)
  const { updateEmail } = useManageUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<EmailData> = (data) => {
    updateEmail(
      data.email,
      () => {
        dispatch(setUser({
          ...user,
          email: data.email,
        }))
        setIsOpened(false)
      },
      () => {
        navigate('/login')
      }
      )
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
