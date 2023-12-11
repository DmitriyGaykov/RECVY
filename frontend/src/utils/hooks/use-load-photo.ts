export const useLoadPhoto = (onPhoto: (FileList) => void) => {
  return (): void => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();

    input.onchange = () => {
      onPhoto?.(input?.files);
    }
  };
}