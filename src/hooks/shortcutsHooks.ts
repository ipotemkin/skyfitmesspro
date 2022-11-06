// SHORTCUT HOOKS

import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../routes'
import { deleteCurrentUser } from '../slices/currentUserSlice'
import { setMessage } from '../slices/messageSlice'
import { useAppDispatch } from './appHooks'

export const useGoToLoginWithMessage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const goToLoginWithMessage = (message: string = '') => {
    dispatch(deleteCurrentUser())
    dispatch(setMessage(message))
    navigate(ROUTES.login)
  }
  return goToLoginWithMessage
}
