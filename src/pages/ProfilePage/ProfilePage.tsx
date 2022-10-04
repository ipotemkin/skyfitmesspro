import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

import { LOGO_COLOR_DARK } from '../../constants';
import { Logo } from '../../components/Logo/Logo';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { mockUserResponse } from '../../data/user';
import { UserCourses } from '../../components/UserCourses/UserCourses';

import './ProfilePage.css';

const cnProfilePage = cn('ProfilePage');
const cnNav = cn('Nav');

export const ProfilePage: FC = () => (
  <div className={cnProfilePage()}>
    <div className={cnProfilePage('Wrapper')}>
      <nav className={cnProfilePage('Nav', [cnNav()])}>
        <Logo color={LOGO_COLOR_DARK} />
        <div className={cnNav('User')}>
          <div className={cnNav('UserAvatar')}/>
          <div className={cnNav('UserName')}>{mockUserResponse.username}</div>
        </div>
      </nav>
      <UserInfo/>
      <UserCourses/>
    </div>
  </div>
);
