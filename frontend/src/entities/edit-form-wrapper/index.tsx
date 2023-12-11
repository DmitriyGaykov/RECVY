import {FC} from "react";
import {EditForm} from "../edit-form";

export type EditFormWrapperProps = {
  exit?: () => void;
}

export const EditFormWrapper: FC<EditFormWrapperProps> = ({exit}) => {
  return (
    <div className="position-fixed top-0 min-vh-100 min-vw-100 bg-black bg-opacity-50 d-flex justify-content-center align-items-center" style={{left: 0}}>
      <EditForm exit={exit}/>
    </div>
  )
}