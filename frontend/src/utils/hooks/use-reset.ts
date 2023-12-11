import {useEffect} from "react";

export const useReset = (resetFunction: () => void, dependencies: unknown[]) => {
  useEffect(() => {
    resetFunction?.();
  }, dependencies);
}