import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './App'

import './index.css'
import { AuthMiddleware } from './middleware/AuthMiddleware'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthMiddleware>
        <App />
      </AuthMiddleware>
    </Provider>
  </BrowserRouter>
)
