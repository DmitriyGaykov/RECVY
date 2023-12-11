import {useEffect, useState} from "react";

export type UseExistAnalyzeParams = {
  status: string;
}

export const useExistAnalyze = ({ status } : UseExistAnalyzeParams) => {
  const [isExist, setIsExist] = useState<boolean | null>(null);

  useEffect(() => {
    if(status === 'pending') return;
    setIsExist(status === 'fulfilled');
  }, [status]);

  return [ isExist, setIsExist ];
}