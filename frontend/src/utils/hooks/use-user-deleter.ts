import {setPeople, useAppDispatch, useDeleteUserMutation, useSocket, useStoredPeople} from "../../store";
import {useCallback} from "react";

export const useUserDeleter = () => {
  const [dell] = useDeleteUserMutation();
  const people = useStoredPeople();
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const clearUsers = useCallback((userid: string) => {
    dispatch(setPeople(people.filter(el => el.id !== userid)))
    socket?.emit('delete-user', userid);
  }, [dispatch, setPeople, people, socket]);

  return useCallback(async (userid: string) => {
    const agree = confirm("Вы уверены, что хотите удалить этого пользователя");
    if(!agree) return;

    const resp = await dell(userid);
    if ('error' in resp) return alert('Ошибка при удалении пользователя!');
    clearUsers(userid);
  }, [dell]);
}