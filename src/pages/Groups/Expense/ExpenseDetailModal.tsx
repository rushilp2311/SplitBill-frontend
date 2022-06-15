import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import { Fragment } from "react";

type ModalProps = {
  children?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  expense: any;
};

const ExpenseDetailModal = ({
  children,
  open = false,
  setOpen,
  expense,
}: ModalProps) => {
  return (
    <>
      {expense ? (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-2 pb-4 sm:px-6 sm:pt-3 sm:pb-4">
                      <div className="w-full flex justify-end">
                        <Button type="icon" onClick={() => setOpen(false)}>
                          <XIcon className="w-5 text-gray-600" />
                        </Button>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-semibold leading-5 text-gray-700">
                            {expense.description}
                          </p>
                          <p className="mt-2 leading-5 text-gray-500">
                            Paid by{" "}
                            <span className="text-gray-600 font-medium">
                              {expense.paidBy.name}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-3xl font-semibold mt-2 leading-5 text-gray-700">
                            $ {Number(expense.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
};

export default ExpenseDetailModal;
