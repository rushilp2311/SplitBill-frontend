import { SearchIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";

type SearchInputType = {
  children?: any;
  label?: string;
  placeholder?: string;
  value?: string | number;
  error?: string;
  name?: string;
  foundUser?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = ({
  children,
  label,
  placeholder,
  onChange,
  value,
  error,
  name,
  foundUser,
  ...props
}: SearchInputType) => {
  useEffect(() => {}, [foundUser]);
  return (
    <div className="flex flex-col  w-3/4">
      <label htmlFor="search">{label}</label>
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          className={`form-input w-full px-2 py-2 md:px-3 rounded border border-zinc-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200  focus:ring-offset-0
                  ${
                    error
                      ? "border-red-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200  focus:ring-offset-0"
                      : " border-zinc-400"
                  }
                
                ${
                  foundUser
                    ? "border-green-600 focus:border-green-500 focus:outline-none ring-2 ring-green-200  focus:ring-offset-0"
                    : " border-zinc-400"
                }
                `}
          {...props}
        />
        {!error && !foundUser && (
          <span className="absolute inset-y-1 p-2 right-1 text-zinc-500 ">
            <SearchIcon className="w-5" />
          </span>
        )}
        {!error && foundUser && (
          <span className="absolute inset-y-1 p-2 right-1 text-zinc-500 ">
            <CheckCircleIcon className="w-5 text-green-600" />
          </span>
        )}
        {error && (
          <span className="absolute inset-y-1 p-2 right-1 text-lg text-red-600">
            <FiAlertCircle />
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 flex  items-center text-red-600">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default SearchInput;
