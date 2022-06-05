import React from "react";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import Button from "./Button";

type InputTypeType = "text" | "email" | "password";

type FormType = {
  children?: any;
  label?: string;
  placeholder?: string;
  type?: InputTypeType;
  value?: string | number;
  error?: string;
  formikProps?: any;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
};
const FormInput = ({
  children,
  label,
  type,
  placeholder,
  onChange,
  value,
  error,
  formikProps,
  ...props
}: FormType) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex flex-col max-w-80 w-full my-2">
      <label htmlFor={type}>{label}</label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : type}
          id={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          {...formikProps}
          className={`form-input w-full px-2 py-2 md:px-3 mt-1 rounded border border-zinc-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200  focus:ring-offset-0 
        ${
          error
            ? "border-red-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200  focus:ring-offset-0"
            : " border-zinc-400"
        }`}
          {...props}
        />
        {type === "password" && !error && (
          <span className="absolute inset-y-2 right-1 text-zinc-500 ">
            <Button type="icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </Button>
          </span>
        )}
        {error && (
          <span className="absolute inset-y-2 p-2 right-1 text-lg text-red-600">
            <FiAlertCircle />
          </span>
        )}
      </div>
      {error && (
        <p className="mt-2 flex  items-center text-red-600">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default FormInput;
