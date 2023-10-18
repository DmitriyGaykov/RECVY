import {FC} from "react";

export type FormLabelInputType = {
  labelText?: string;
  name?: string;
  type?: string;
};

export const FormLabelInput : FC<FormLabelInputType> = ({labelText, name, type}) => {
  return (
    <div className="form-group p-2 d-flex align-items-center">
      <label htmlFor={name} className="w-25 text-white form-label" style={{ fontSize: '18px' }}>{ labelText }</label>
      <input type={type || 'text'} className="form-control border-0" name={name} />
    </div>
  )
}