import React, {useState} from "react";

export const useFile = () => {
  const [file, setFile] = useState<File>(null);
  const onFileChange = (event: React.ChangeEventHandler<HTMLInputElement>) : void => {
    const file = event?.target?.files?.item(0);
    setFile(file);
  }
  return [file, onFileChange] as const;
}