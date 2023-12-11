import {FC} from "react";
import {RelationStatus, useRelationAction, useRelationDefiner} from "../../../utils";

export type RelationButtonProps = {
  who: string;
  whom: string;
}

export const RelationButton: FC<RelationButtonProps> = ({who, whom}) => {
  const relation = useRelationDefiner({who, whom});
  const {subscribe, describe, addFriend, removeFriend} = useRelationAction({who, whom});

  switch (relation) {
    case RelationStatus.friend:
      return <button className="btn btn-danger fw-bold fs-10px" onClick={removeFriend}>Удалить из друзей</button>
    case RelationStatus.subscriber:
      return <button className="btn btn-light fw-bold fs-10px" onClick={describe}>Отписаться</button>
    case RelationStatus.stranger:
      return <button className="btn btn-primary fw-bold fs-10px" onClick={subscribe}>Подписаться</button>
    case RelationStatus.subscribed:
      return <button className="btn btn-success fw-bold fs-10px" onClick={addFriend}>Добавить в друзья</button>
  }
}