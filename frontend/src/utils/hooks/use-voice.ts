import {useCallback, useEffect, useState} from "react";

export const useVoice = (onSended?: (buffer: Blob) => void) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
  const [wasRecordingStarted, setWasRecordingStarted] = useState(false);

  useEffect(() => {
    return () => {
      mediaRecorder?.stop();
    }
  }, []);

  const onVoiceMessage = useCallback(() => {
    !wasRecordingStarted ? startRecording() : stopRecording()
  }, [mediaRecorder, wasRecordingStarted, onSended]);

  const startRecording = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    const recorder = new MediaRecorder(stream);
    const audioBuffer: Blob[] = [];

    let setTimeoutHandle: NodeJS.Timeout;

    recorder.onstart = () => {
      setTimeoutHandle = setTimeout(() => {
        setWasRecordingStarted(false);
        recorder.stop();
        alert("Максимальное время записи голосового — 30 секунд");
      }, 30_000);
    }

    recorder.ondataavailable = ({data}) => {
      data.size > 0 && audioBuffer.push(data);
    }

    recorder.onstop = () => {
      clearTimeout(setTimeoutHandle);
      typeof onSended === 'function' && onSended(new Blob(audioBuffer));
    }

    recorder.start(0);

    setWasRecordingStarted(true);
    setMediaRecorder(recorder);
  }

  const stopRecording = useCallback(() => {
    mediaRecorder?.stop();
    setWasRecordingStarted(false);
  }, [mediaRecorder, setWasRecordingStarted])

  return {wasRecordingStarted, onVoiceMessage}
}