import { FC } from "react"
import { useCookies } from "react-cookie"

type AuthMiddlewareType = {
  children: React.ReactElement
}

export const AuthMiddleware: FC<AuthMiddlewareType> = ({ children }) => {
  const [cookies] = useCookies()

  console.log('From middleware: cookies -->', cookies)
  
  return children
}
