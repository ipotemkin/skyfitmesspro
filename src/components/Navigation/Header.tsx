import { FC, ReactNode } from 'react'

import { Logo } from '../Logo/Logo'

import styles from './style.module.css'

type NavigationProps = {
  logoColor?: string
  children?: ReactNode
}

export const Navigation: FC<NavigationProps> = ({ logoColor, children }) => {  
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Logo color={logoColor} />
        {children}
      </nav>
    </header>
  )
}
