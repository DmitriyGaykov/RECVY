import {useAddPhotoMutation} from "../../store";
import {useEffect} from "react";

export type UseAddPhotoParams = {
  onSuccess?: (data: string) => void
}

export const useAddPhoto = ({ onSuccess }: UseAddPhotoParams) => {
  const [add, { data, error }] = useAddPhotoMutation();

  const addPhoto = (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = () => {
      const formData = new FormData();
      formData.append('photo', input.files[0]);
      add(formData);
    }
  }

  useEffect(() => {
    if(
      (error && error.originalStatus !== 201) ||
      (data == error && data == null)
    ) return;
    typeof onSuccess === 'function' && onSuccess(data || error.data);
  }, [data, error]);

  return addPhoto
}