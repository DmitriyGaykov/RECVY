import {useEffect, useState} from "react";
import {decrypt} from "../cryptor";

export const useDecryptor = (message: string, keys?: string[]) : string => {
  const [decrMsg, setDecrMsg] = useState("");

  useEffect(() => {
    setDecrMsg(decrypt(message, keys));
  }, [message]);

  return decrMsg;
}