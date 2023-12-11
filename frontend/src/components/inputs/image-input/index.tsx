import React from "react";
import {useFile} from "../../../utils";

export const ImageInput = () => {
  const [file, onFileChange] = useFile();

  return (
    <div className='d-flex justify-content-start gap-3 align-items-center'>
      <img className='light-purple p-2 img-thumbnail' style={{width: '130px', height: '130px', borderRadius: 1200}} src={file && URL.createObjectURL(file)}/>
      <input type='file' className='form-control w-50' name='photo' onChange={onFileChange}/>
    </div>
  );
}