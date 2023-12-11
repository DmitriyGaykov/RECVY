import {useEffect, useRef, useState} from "react";

export const useVoiceEventer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVoiceStarted, setIsVoiceStarted] = useState<boolean>(false);

  useEffect(() => {
    if(!audioRef.current) return;
    audioRef.current.style.display = 'none';
  }, [audioRef]);

  const onVoice = () => setIsVoiceStarted(!isVoiceStarted);

  useEffect(() => {
    const audio = audioRef.current;
    if(!audio) return;

    const actionAsync = async () => {
      if(isVoiceStarted) {
        audio.onended = () => {
          setIsVoiceStarted(false);
        }
        await audio.play();
      } else if(!audio.paused && !audio.ended) {
        await audio.pause();
      } else {
        await audio.load();
      }
    }

    actionAsync();
  }, [isVoiceStarted]);

  return { isVoiceStarted, onVoice, audioRef }
}