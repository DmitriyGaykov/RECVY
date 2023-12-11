import {User} from "../../../models";


export const isAdmin = (user: User) : boolean => {
  return user?.role?.includes("admin") === true || user?.role?.includes("mainadmin") === true;
}

export const isMainAdmin = (user: User) : boolean => {
  return user?.role?.includes("mainadmin") === true;
}