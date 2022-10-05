import React, { FC } from 'react'

import { LOGO_COLOR_DARK } from '../../constants'
import { Logo } from '../../components/Logo/Logo'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { mockUserResponse } from '../../data/user'
import { UserCourses } from '../../components/UserCourses/UserCourses'
import { ReactComponent as ReactLogo } from './assets/arrow.svg'

import styles from './ProfilePage.module.css'

export const ProfilePage: FC = () => (
  <div className={styles.profilePage}>
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <Logo color={LOGO_COLOR_DARK} />
        <div className={styles.navUser}>
          <div className={styles.navUserAvatar} />
          <div className={styles.navUserName}>{mockUserResponse.username}</div>
          <ReactLogo />
        </div>
      </nav>
      <UserInfo />
      <UserCourses />
    </div>
  </div>
)
