import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

import { mockUserCoursesResponse } from '../../data/user';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';

import './UserCourses.css';

const cnUserCourses = cn('UserCourses');

export const UserCourses: FC = () => (
  <div className={cnUserCourses()}>
    <h4 className={cnUserCourses('Title')}>Мои курсы</h4>
    <div className={cnUserCourses('Gallery')}>
    {mockUserCoursesResponse.map((item) => (
      <div className={cnUserCourses('Wrapper')} key={item.id}>
        <Card item={item} key={item.id} />
        <div className={cnUserCourses('Button')}>
          <Button buttonText='Перейти →' type='secondary' size='m'/>
        </div>
      </div>
    ))}
    </div>
  </div>
);
