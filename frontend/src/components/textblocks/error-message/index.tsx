import {FC, HTMLProps} from "react";

export const ErrorMessage : FC<HTMLProps<HTMLSpanElement>> = ({ children }) => {
  if(!children) {
    return <></>
  }

  return (
    <div className="p-2 bg-danger bg-opacity-25 w-100 fs-14px fw-semibold" style={{ color: "#ffffffee" }}>
      { children }
    </div>
  );
}