import { cn } from '@bem-react/classname';
import { FC } from 'react';
import { CourseMainData } from '../../types';

import './Card.css';

const cnCard = cn('Card');

type Props = { item: CourseMainData };

export const Card: FC<Props> = ({ item }) => {
  console.log(item);
  return (
    <div
      className={cnCard()}
      style={{ backgroundImage: `url(${item.coverUrl})` }}
    >
      <p className={cnCard('Title')}>{item.name}</p>
    </div>
  );
};
