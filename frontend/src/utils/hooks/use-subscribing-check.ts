import {RelationButtonProps} from "../../components";
import {useIsSubscribingExistQuery} from "../../store";
import {useEffect, useState} from "react";
import {useExistAnalyze} from "./use-exist-analyze.ts";
import {useCheckDepsAndRefetch} from "./use-check-deps-and-refetch.ts";

export type UseSubscribingCheckParams = RelationButtonProps;

export const useSubscribingCheck = ({ who, whom } : UseSubscribingCheckParams) : [null | boolean, () => void, boolean] => {
  const { status, isLoading, refetch } = useIsSubscribingExistQuery({ who, whom });
  const [isExist, setIsExist] = useExistAnalyze<boolean | null>({status});
  useCheckDepsAndRefetch(refetch, [who, whom]);
  const setNull = () => setIsExist(null);

  return [ isExist, setNull, isLoading ];
}