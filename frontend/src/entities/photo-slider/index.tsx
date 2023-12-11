import {FC, useEffect, useState} from "react";
import {useIteration, usePhoto} from "../../utils";

export type PhotoSliderProps = {
  photos: string[],
  className?: string;
  children?: never;
  setCurrentPhoto?: (string) => void;
}

export const PhotoSlider: FC<PhotoSliderProps> = ({photos, className, children, setCurrentPhoto}) => {
  const [i, addIter] = useIteration({
    maxValue: photos?.length || 0,
    startFrom: photos?.length - 1
  });

  const photo = usePhoto(photos?.at(i), true);

  useEffect(() => {
    setCurrentPhoto?.(photos?.at(i));
  }, [i]);

  return (
    <div className={`width-height-120 rounded-5 ${className || ""}`}>
      <img src={photo} alt="" className="width-height-120 border-radius-1500" onClick={addIter}/>
      { children || "" }
    </div>
  )
};