import {useEffect, useRef, useState} from "react";

export const useComeBackState = <T extends HTMLElement> (stateToComeBack: unknown, dependency: boolean) => {
  const htmlRef = useRef<T>(null);

  const [state, setState] = useState<unknown>(null);

  useEffect(() => {
    setState(stateToComeBack);
  }, [stateToComeBack]);

  useEffect(() => {
    return () => {
      if(dependency || !htmlRef.current) return;
      htmlRef.current.innerHTML = state;
    }
  }, [dependency]);

  useEffect(() => {
    if(!state || !dependency || !htmlRef.current) return;
    htmlRef.current.innerHTML = state;
  }, [state])

  return htmlRef;
}