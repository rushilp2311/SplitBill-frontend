import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

type AlertType = {
  variant: "success" | "error" | "warning" | "info";
  message?: string;
  children?: any;
};

const AlertStyles = {
  success: "",
  error: "border border-red-600 p-2 rounded text-red-600 bg-red-100",
  warning: "",
  info: "",
};

const icons = {
  success: <CheckCircleIcon />,
  error: <ExclamationCircleIcon />,
  warning: <ExclamationCircleIcon />,
  info: <InformationCircleIcon />,
};

const Alert = ({ variant, message }: AlertType) => {
  return (
    <div className={`flex justify-center items-center ${AlertStyles[variant]}`}>
      <div className="w-5 h-5 mr-2">{icons[variant]}</div>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
