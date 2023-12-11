import {useEffect} from "react";

export const useCheckDepsAndRefetch = (refetch, depends: unknown[]) => {
  useEffect(() => {
    if(!depends) return;
    refetch();
  }, [...depends]);
}