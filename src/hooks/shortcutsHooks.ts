// SHORTCUT HOOKS

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../routes'
import { deleteCurrentUser } from '../slices/currentUserSlice'
import { setMessage } from '../slices/messageSlice'

export const useGoToLoginWithMessage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToLoginWithMessage = (message: string = '') => {
    dispatch(deleteCurrentUser())
    dispatch(setMessage(message))
    navigate(ROUTES.login)
  }
  return goToLoginWithMessage
}
