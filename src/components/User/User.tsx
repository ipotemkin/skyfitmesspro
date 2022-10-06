import { FC } from "react";
import { UserData } from "../../types";


export const User: FC<UserData> = ({ uid }) => {
  return <>
    <p>
      Код пользователя: {uid}
    </p>    
  </>
}
