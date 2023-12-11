import {FC} from "react";
import styles from './admin-note.module.scss';

export type AdminNoteProps = {
  text?: string;
  className?: string;
}

export const AdminNote: FC<AdminNoteProps> = ({ text, className }) => {
  return <span className={`white-text-with-red-glow ${className || ""} ${styles.adminNote}`}>{text || "Admin"}</span>
}