import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

type SpinnerType = {
  visible?: boolean
}

const initialState: SpinnerType = {
  visible: false
}

export const SpinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showSpinner: (state) => {
      state.visible = true
    },
    hideSpinner: (state) => {
      return state = { ...initialState }
    }
  }
})

export const {
  showSpinner,
  hideSpinner
} = SpinnerSlice.actions

export const selectSpinner = (state: RootState) => state.spinner?.visible

export default SpinnerSlice.reducer
