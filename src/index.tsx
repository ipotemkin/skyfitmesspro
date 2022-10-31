import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './App'
import { AuthMiddleware } from './middleware/AuthMiddleware'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'

import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />
      <AuthMiddleware>
        <App />
      </AuthMiddleware>
    </Provider>
  </BrowserRouter>
)
