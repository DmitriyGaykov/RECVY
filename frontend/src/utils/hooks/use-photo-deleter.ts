import {useDeletePhotoMutation} from "../../store";

export type UsePhotoDeleterProps = {
  onSuccess?: (string) => void
}

export const usePhotoDeleter = ({onSuccess}: UsePhotoDeleterProps) => {
  const [dellPhotoMutation] = useDeletePhotoMutation();

  const dellPhoto = async (photoName: string) => {
    const res = await dellPhotoMutation(photoName.split('/').at(-1));
    if(res.error) return;
    onSuccess?.(photoName);
  }

  return dellPhoto
}