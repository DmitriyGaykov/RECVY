import {useEffect, useState} from "react";

export type UseIterationParams = {
  maxValue: number;
  startFrom?: number;
};

export const useIteration = ({ maxValue, startFrom } : UseIterationParams) => {
  const [i, setI] = useState(startFrom || 0);
  const addOne = () => setI(i + 1 >= maxValue ? 0 : i + 1);
  const setIter = (i: number) => setI((i < maxValue && i > 0) ? i : 0);

  useEffect(() => {
    if(startFrom == null) return;
    setI(startFrom);
  }, [startFrom]);

  return [i, addOne, setIter];
}