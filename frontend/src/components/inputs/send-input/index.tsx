import React, {FC, HTMLProps, memo, SetStateAction} from "react";
import styles from './send-input.module.scss'

export type SendInputProps = {
  placeholder: string;
  onChange: (value: string) => void | React.Dispatch<SetStateAction<string>>;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}

export const SendInput : FC<SendInputProps> = memo(({placeholder, onChange, onKeyPress, value}) => {
  return (
    <input
      type="text"
      value={value}
      className={`flex-1 text-white ${styles.sendInput}`}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={onKeyPress}
    />
  )
})