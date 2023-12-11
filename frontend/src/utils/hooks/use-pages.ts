import {useState} from "react";

export const usePages = (startValue: number = 0) => {
  const [page, setPage] = useState(startValue);
  const [isAllData, setIsAllData] = useState(false);

  const getYet = () => setPage(page + 1);

  const setDefault = () => {
    setPage(startValue);
    setIsAllData(false);
  }

  return { page, getYet, setDefault, isAllData, setIsAllData }
}