import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

type SpinnerType = {
  visible: boolean
  prefetch: boolean
}

const initialState: SpinnerType = {
  visible: false,
  prefetch: false
}

export const SpinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showSpinner: (state) => {
      if (!state.prefetch) state.visible = true
    },
    showSpinnerForce: (state) => {
      state.visible = true
    },
    hideSpinner: (state) => {
      return state = { ...initialState }
    },
    setPrefetchSpinner: (state) => {
      state.prefetch = true
    },
  }
})

export const {
  showSpinner,
  showSpinnerForce,
  hideSpinner,
  setPrefetchSpinner,
} = SpinnerSlice.actions

export const selectSpinner = (state: RootState) => state.spinner?.visible

export default SpinnerSlice.reducer
