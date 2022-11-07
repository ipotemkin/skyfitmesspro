import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

type SpinnerType = {
  visible: boolean
  prefetch: boolean
  isLoading: boolean
}

const initialState: SpinnerType = {
  visible: false,
  prefetch: false,
  isLoading: false
}

export const SpinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showSpinner: (state) => {
      if (!state.prefetch) state.visible = true
    },
    // spinner при запросах, его нельзя отключить с помощью hideSpinner
    // он отключается только с помощью hideSpinnerForce
    showFetchSpinner: (state) => {
      if (!state.prefetch) {
        state.visible = true
        state.isLoading = true
      }
    },
    // spinner при запросах для обновлнния токенов, его нельзя отключить с помощью hideSpinner
    // он отключается только с помощью hideSpinnerForce
    showSpinnerForce: (state) => {
      state.visible = true
      state.isLoading = true
    },
    // закрывает spinner, если нет активной загрузки данных
    hideSpinner: (state) => {
      if (!state.isLoading)
        return state = { ...initialState }
    },
    // закрывает spinner в любом случае
    hideSpinnerForce: (state) => {
      return state = { ...initialState }
    },
    // используется для prefetch запросов, чтобы не показывать спиннер на экране
    // так как prefetch запросы идут в фоновом режиме
    setPrefetchSpinner: (state) => {
      state.prefetch = true
    },
  }
})

export const {
  showSpinner,
  showFetchSpinner,
  showSpinnerForce,
  hideSpinner,
  hideSpinnerForce,
  setPrefetchSpinner,
} = SpinnerSlice.actions

export const selectSpinner = (state: RootState) => state.spinner?.visible

export default SpinnerSlice.reducer
