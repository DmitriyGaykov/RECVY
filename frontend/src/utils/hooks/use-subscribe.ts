import {useCallback} from "react";
import {useDescribeMutation, useSubscribeMutation} from "../../store";
import {useRelationUpdate} from "./use-relation-update.ts";

export const useSubscribe = (whom: string) => {
  const [subscribeMutation] = useSubscribeMutation();
  const [describeMutation] = useDescribeMutation();
  const update = useRelationUpdate();

  const subscribe = useCallback(async () => {
    const res = await subscribeMutation(whom);
    success(res);
  }, [whom]);

  const describe = useCallback(async () => {
    const res = await describeMutation(whom);
    success(res);
  }, [whom]);

  const success = (res) => {
    if('error' in res) return;
    update();
  }

  return { subscribe, describe }
}