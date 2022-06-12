import { Fragment, useContext } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import ToastContext from "contexts/ToastContext";
import Button from "./Button";

const ToastStyle: any = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
};

const ToastIcon: any = {
  success: <CheckCircleIcon className="mt-1 h-5 w-5 text-green-500" />,
  error: <ExclamationCircleIcon className="mt-1 h-5 w-5 text-red-500" />,
  warning: <ExclamationIcon className="mt-1 h-5 w-5 text-yellow-500" />,
  info: <InformationCircleIcon className="mt-1 h-5 w-5 text-blue-500" />,
};

export default function Toast() {
  const { show, hideToast, toast } = useContext(ToastContext);
  return (
    <>
      <div
        aria-live="assertive"
        className="z-10 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`max-w-sm w-full shadow-lg
                ${ToastStyle[toast.variant]}
              bg-white rounded pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {ToastIcon[toast.variant]}
                    </div>
                    <div className="ml-3 flex-1 w-full pt-0.5">
                      <p className="text-sm font-medium ">{toast.message}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <Button type="icon" onClick={hideToast}>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
