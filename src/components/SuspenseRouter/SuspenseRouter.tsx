import { BrowserHistory, createBrowserHistory, Update } from 'history'
import { FC, useLayoutEffect, useRef, useState, useTransition } from 'react'
import { Router } from 'react-router-dom'

type Props = {
  basename?: string
  children?: React.ReactNode
  window?: Window
}

// не переключает на новую страницу, пока она не готова
export const SuspenseRouter: FC<Props> = ({ basename, children, window }) => {
  const historyRef = useRef<BrowserHistory>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()

  if (historyRef.current == null)
    historyRef.current = createBrowserHistory({ window })

  const history = historyRef.current
  const { action, location } = history
  const [state, setState] = useState({ action, location })

  const setStateAsync = (update: Update) => startTransition(() => setState(update))

  useLayoutEffect(() => history.listen(setStateAsync), [history])

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
