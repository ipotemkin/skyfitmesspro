import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './App'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'

import './index.css'
import { SpinnerModal } from './components/SpinnerModal/SpinnerModal'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />
      <App />
      <SpinnerModal />
    </Provider>
  </BrowserRouter>
)
