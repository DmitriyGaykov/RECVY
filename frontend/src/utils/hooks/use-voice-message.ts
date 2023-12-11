import {useGetVoiceQuery} from "../../store";
import {useEffect, useState} from "react";
import {URLType} from "../../entities";

export const useVoiceMessage = (messageid: string)  => {
  const { data, error, isLoading, status } = useGetVoiceQuery(messageid);
  const [buffer, setBuffer] = useState<Int8Array | null>(null);
  const [audio, setAudio] = useState<URLType>(null);

  useEffect(() => {
    data && !error && setBuffer(new Int8Array(data.data));
  }, [data]);

  useEffect(() => {
    if(!buffer) return;
    const blob = new Blob([buffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    setAudio(url);
  }, [buffer]);

  return { audio, isLoading, error };
}