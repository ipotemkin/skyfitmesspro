import { FC } from "react"
import { UserData } from "../../types"

type Props = {
  users: UserData[]
}

export const UserList: FC<Props> = ({ users }) => {
  return <>
    {Object.values(users).map((user: UserData) => <p key={user.uid}>user uid: {user.uid};
      userProgress: {user.courses![0].workouts![0].exercises![0].userProgress}</p>)}
  </>
}
