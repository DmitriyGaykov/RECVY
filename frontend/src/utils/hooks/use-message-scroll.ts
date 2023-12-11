import {useEffect, useRef} from "react";

export const useMessageScroll = () => {
  const messageWrapperRef = useRef<HTMLDivElement>(null);

  const scroll = (value: number = 10000) => {
    if(!messageWrapperRef.current) return;
    messageWrapperRef.current.scrollTo({
      top: value,
      behavior: 'smooth'
    });
  }

  return [messageWrapperRef, scroll];
}