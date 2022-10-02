// endpoints

// all users – GET /users
// список пользователей
export const mockUsers = {
  1 : {
    id: 1,
    username: "user1@example.com",
    password: "MySecret12345",
    courses: [ 
      {
        id: 1,
        name: "Йога"
      }
    ]
  },
  2 : {
    id: 2,
    username: "user2@example.com",
    password: "MySecret6789",
    courses: [ 
      {
        id: 1,
        name: "Йога"
      },
      {
        id: 2,
        name: "Стретчинг"
      }
    ]
  },
}

// get the specified user – GET /users/id
// example: GET /users/1
// информация о пользователе
export const mockUserResponse = {
  id: 1,
  username: "user1@example.com",
  password: "MySecret12345",
  courses: [ 
    {
      id: 1,
      name: "Йога"
    }
  ]
}

// get all courses of the specified user – GET /users/id/courses
// курсы пользователя
export const mockUserCoursesResponse = [
  { 
    id: 1,
    name: "Йога",
    coverUrl: "assets/images/card-violet.png", 
  },
  {
    id: 2,
    name: "Стретчинг",
    coverUrl: "assets/images/card-blue.png",
  }
]
