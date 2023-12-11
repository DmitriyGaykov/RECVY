import {UseSubscribingCheckParams} from "./use-subscribing-check.ts";
import {useIsFriendshipExistQuery} from "../../store";
import {useEffect, useState} from "react";
import {useExistAnalyze} from "./use-exist-analyze.ts";
import {useCheckDepsAndRefetch} from "./use-check-deps-and-refetch.ts";

export type UseFriendshipCheckParams = UseSubscribingCheckParams;

export const useFriendshipCheck = ({ who, whom } : UseFriendshipCheckParams) : [null | boolean, () => void, boolean] => {
  const { status, isLoading, refetch } = useIsFriendshipExistQuery({ who, whom });
  const [isExist, setIsExist] = useExistAnalyze<boolean | null>({status});

  useCheckDepsAndRefetch(refetch, [who, whom]);

  const setNull = () => setIsExist(null);

  return [ isExist, setNull, isLoading ];
}