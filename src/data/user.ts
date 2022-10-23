// endpoints

// all users – GET /users
// список пользователей
export const mockUsers = {
  1: {
    id: 1,
    username: 'user1@example.com',
    password: 'MySecret12345',
    uid: 'kwtEgq2ylcZI0iUjgDAWlRqHixB3',
    courses: [
      {
        id: 1,
        name: 'Йога',
      },
    ],
  },
  2: {
    id: 2,
    username: 'user2@example.com',
    password: 'MySecret6789',
    uid: 'B8s8cplekcY11gSQtEsZfFO8hH93',
    courses: [
      {
        id: 1,
        name: 'Йога',
      },
      {
        id: 2,
        name: 'Стретчинг',
      },
    ],
  },
  3: {
    id: 3,
    username: 'user3@example.com',
    password: 'MySecret6789',
    uid: 'kmPXkGrE1dU4nviV9LRLM0V333H2',
    courses: [
      {
        id: 1,
        name: 'Йога',
        coverUrl: 'assets/images/card-violet.png',
      },
      {
        id: 2,
        name: 'Стретчинг',
        coverUrl: 'assets/images/card-blue.png',
      },
      {
        id: 3,
        name: 'Бодифлекс',
        coverUrl: 'assets/images/card-lightblue.png',
      },
      {
        id: 4,
        name: 'Танцевальный фитнес',
        coverUrl: 'assets/images/card-orange.png',
      },
      {
        id: 5,
        name: 'Степ-аэробика',
        coverUrl: 'assets/images/card-lightgreen.png',
      },
    ],
  },
}

// get the specified user – GET /users/id
// example: GET /users/1
// информация о пользователе
export const mockUserResponse = {
  id: 1,
  username: 'user1@example.com',
  password: 'MySecret12345',
  uid: 'kwtEgq2ylcZI0iUjgDAWlRqHixB3',
  courses: [
    {
      id: 1,
      name: 'Йога',
    },
  ],
}

// get all courses of the specified user – GET /users/id/courses
// курсы пользователя
export const mockUserCoursesResponse = [
  {
    id: 1,
    name: 'Йога',
    coverUrl: 'assets/images/card-violet.png',
  },
  {
    id: 2,
    name: 'Стретчинг',
    coverUrl: 'assets/images/card-blue.png',
  },
]
