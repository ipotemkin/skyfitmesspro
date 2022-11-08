import { BrowserHistory, createBrowserHistory, Update } from 'history'
import { FC, useEffect, useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Router } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/appHooks'
import { hideSpinner, showSpinner } from '../../slices/spinnerSlice'
import { getPath } from './utils'

type Props = {
  basename?: string
  children?: React.ReactNode
  window?: Window
}

// храним страницы, для которых уже загружен код
const loadedPages: string[] = []

// не переключает на новую страницу, пока она не готова
export const SuspenseRouter: FC<Props> = ({ basename, children, window }) => {
  const historyRef = useRef<BrowserHistory | null>(null)
  const [isPending, startTransition] = useTransition()
  const dispatch = useAppDispatch()

  if (historyRef.current === null) {
    historyRef.current = createBrowserHistory({ window })
    if (loadedPages.length === 0) {
      const newLoc = getPath(historyRef.current.location.pathname)  
      if (newLoc) loadedPages.push(newLoc)
    }
  }

  const history = historyRef.current
  const { action, location } = history
  const [state, setState] = useState({ action, location })

  const setStateAsync = (update: Update) => {
    const newLoc = getPath(update.location.pathname)
    
    // если код страницы еще не загружен, добавляем её в список и показываем спиннер
    if (newLoc && !loadedPages.includes(newLoc)) {
      loadedPages.push(newLoc)
      dispatch(showSpinner())
    }
    startTransition(() => setState(update))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => { history.listen(setStateAsync) }, [history])

  useEffect(() => {
    if (!isPending) dispatch(hideSpinner())
  }, [dispatch, isPending])

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}
