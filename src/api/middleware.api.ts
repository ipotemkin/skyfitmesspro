import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'


// const getErrorMsg = (action: any) => {
//     if (
//         'payload' in action
//         && 'data' in action.payload
//         && 'error' in action.payload.data
//         && 'message' in action.payload.data.error
//     ) return action.payload.data.error.message
    
//     return 'UNKNOWN_ERROR'
// }

// выводим ошибку авторизации в консоль
// TODO убрать на проде
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      console.log('action -->', action)
    }
    return next(action)
  }
