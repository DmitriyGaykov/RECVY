import {useSubscribingCheck, UseSubscribingCheckParams} from "./use-subscribing-check.ts";
import {useFriendshipCheck} from "./use-friendship-check.ts";
import {useEffect, useState} from "react";

export type UseRelationDefinerParams = UseSubscribingCheckParams;
export enum RelationStatus {
  subscriber = 1,
  subscribed,
  friend,
  stranger
}

export const useRelationDefiner = ({ who, whom }: UseRelationDefinerParams): RelationStatus => {
  const [whoSubOfWhom, setNullWhoSubShom] = useSubscribingCheck({ who, whom });
  const [whomSubOfWho, setNullWhomSubWho] = useSubscribingCheck({ who: whom, whom: who });
  const [whoFriendOfWhom, setNullFriends] = useFriendshipCheck({ who, whom });

  const [relationStatus, setRelationStatus] = useState<RelationStatus>(RelationStatus.stranger);

  useEffect(() => {
    if(whoSubOfWhom == null || whomSubOfWho == null || whoFriendOfWhom == null) return;

    if(whoSubOfWhom) {
      setRelationStatus(RelationStatus.subscriber);
    } else if (whomSubOfWho) {
      setRelationStatus(RelationStatus.subscribed);
    } else if(whoFriendOfWhom) {
      setRelationStatus(RelationStatus.friend);
    } else {
      setRelationStatus(RelationStatus.stranger);
    }

    setNullWhoSubShom();
    setNullWhomSubWho();
    setNullFriends();
  }, [whoSubOfWhom, whomSubOfWho, whoFriendOfWhom]);

  return relationStatus;
}