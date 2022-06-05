import * as React from "react";
import { CgSpinner } from "react-icons/cg";

type ButtonType = {
  children?: any;
  type?: ButtonTypeType;
  isLoading?: boolean;
  loadingText?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  disabled?: boolean;
  leftIcon?: JSX.IntrinsicElements["svg"] | any;
  rightIcon?: JSX.IntrinsicElements["svg"] | any;
  onClick?: () => void;
};

type ButtonTypeType =
  | "primary"
  | "secondary"
  | "danger"
  | "secondaryDanger"
  | "icon"
  | "link"
  | "ghost";

type StyleType = {
  [key: string]: string;
};

const ButtonTypeStyle: StyleType = {
  primary:
    "cursor-pointer px-4 py-2 md:px-6 rounded font-medium active:ring-2 ring-brand-200 text-white bg-brand-600 hover:bg-brand-700",
  secondary:
    "cursor-pointer  px-4 py-2 md:px-6 border rounded font-medium active:ring-2 border-zinc-300 text-zinc-900 hover:bg-zinc-100 ring-zinc-100",
  ghost:
    "cursor-pointer  px-4 py-2 md:px-6 border rounded font-medium active:ring-2 border-brand-100 active:border-brand-200  bg-brand-100 text-brand-700 hover:bg-brand-200 ring-brand-100",
  danger:
    "cursor-pointer px-4 py-2 md:px-6 rounded font-medium active:ring-2 ring-red-200 text-white bg-red-600 hover:bg-red-700",
  secondaryDanger:
    "cursor-pointerpx-4 py-2 md:px-6 border rounded font-medium active:ring-2 border-red-100 active:border-red-200 bg-red-100 text-red-700 hover:bg-red-200 ring-red-100",
  icon: "p-2 active:ring-2 ring-zinc-200 duration-150 ease-in-out rounded-full text-xl hover:bg-zinc-100",
  loading:
    "flex items-center justify-center pointer-events-none cursor-not-allowed opacity-80",
  link: "cursor-pointer font-medium text-brand-600  hover:text-brand-700 hover:underline",
  disabled: "pointer-events-none cursor-not-allowed opacity-70",
};

const Button = ({
  children,
  type = "primary",
  isLoading,
  loadingText = "Loading...",
  width = "",
  height = "",
  margin = "",
  padding = "",
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: ButtonType) => {
  return (
    <button
      className={`flex items-center justify-between ${ButtonTypeStyle[type]} ${
        isLoading && ButtonTypeStyle.loading
      } ${
        disabled && ButtonTypeStyle.disabled
      } ${width} ${height} ${margin} ${padding}`}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="text-lg">
        {isLoading && <CgSpinner className="animate-spin mr-2" />}
        {leftIcon && !isLoading && leftIcon}
      </span>
      <span className={(leftIcon || rightIcon) && "mx-1"}>
        {isLoading ? loadingText : children}
      </span>
      <span className="text-lg">{rightIcon && !isLoading && rightIcon}</span>
    </button>
  );
};

export default Button;
