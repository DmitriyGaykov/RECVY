import {getTime} from "./get-time.ts";

export const getDateTime = (date: Date): string => {
  try {
    return `${date.toLocaleDateString()} ${getTime(date)}`;
  } catch {
    return ""
  }
}