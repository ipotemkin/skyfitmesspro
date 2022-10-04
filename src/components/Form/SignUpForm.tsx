import './Form.css'

import block from 'bem-cn-lite'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormData } from '../../types'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'

const form = block('form')

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.\w{2,3}$/i)
const validPasswordLength = 6

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <div className="form-wrapper">
      <form className={form()} onSubmit={handleSubmit(onSubmit)}>
        <div className={form('logo')}>
          <Logo />
        </div>
        <div className={form('inputs')}>
          <input
            className={form('input', { email: true })}
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: validEmail,
                message: 'Email should be valid',
              },
            })}
          />
          <p className={form('error')}>
            {errors.email && <span>{errors.email.message}</span>}
          </p>

          <input
            className={form('input', { password: true })}
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
          <p className={form('error')}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>

          <input
            className={form('input', { password: true })}
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
          <p className={form('error')}>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </p>
        </div>
        <div className={form('buttons')}>
          <Button buttonText="Зарегистрироваться" />
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
