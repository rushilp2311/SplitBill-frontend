import { Dialog, Transition } from "@headlessui/react";
import { XIcon, ReplyIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import GroupContext from "contexts/GroupContext";
import ToastContext from "contexts/ToastContext";
import { Fragment, useContext } from "react";
import { authService, expenseService } from "services";

type ModalProps = {
  children?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  expense: any;
  settled?: boolean;
};

const ExpenseDetailModal = ({
  children,
  open = false,
  setOpen,
  expense,
  settled = false,
}: ModalProps) => {
  const currentUser: any = authService.getCurrentUser();

  const { showToast } = useContext(ToastContext);
  const { fetchExpenses } = useContext(GroupContext);
  const handleSettleExpense = async () => {
    const response = await expenseService.settleExpense(
      expense._id,
      currentUser.id
    );
    if (response) {
      showToast("Expense settled", "success");
      setOpen(false);
      await fetchExpenses(expense.group);
    }
  };
  const handleRevertExpense = async () => {
    const response = await expenseService.revertExpense(
      expense._id,
      currentUser.id
    );

    if (response) {
      showToast("Expense reverted", "success");
      setOpen(false);
      await fetchExpenses(expense.group);
    }
  };
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
                    <div className="bg-white px-4 pt-2 pb-4 sm:px-6 sm:pt-3 sm:pb-4 w-80 sm:w-auto">
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
                          <p className="text-xl sm:text-3xl font-semibold mt-2 leading-5 text-gray-700">
                            $ {Number(expense.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        {expense.paidBy._id === currentUser.id ? (
                          <div className="text-green-600 font-semibold text-lg justify-self-center">
                            <p>
                              You Lent{" "}
                              <span>
                                ${" "}
                                {
                                  expense?.membersBalance?.find(
                                    (member: any) =>
                                      member?.memberId?.toString() ===
                                      currentUser.id
                                  ).balance
                                }
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div
                            className={`${
                              settled ? "text-green-600" : "text-red-500"
                            } font-semibold text-lg justify-self-center`}
                          >
                            <p>
                              {settled ? "Settled" : "You Owe"}{" "}
                              <span>
                                ${" "}
                                {
                                  expense?.membersBalance
                                    ?.find(
                                      (member: any) =>
                                        member?.memberId?.toString() ===
                                        currentUser.id
                                    )
                                    .balance.split("-")[1]
                                }
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {expense.paidBy._id !== currentUser.id && !settled && (
                      <div className="mt-3 p-3 flex justify-end border-t bg-gray-100">
                        <Button type="success" onClick={handleSettleExpense}>
                          Settle Up
                        </Button>
                      </div>
                    )}

                    {settled && (
                      <div className="mt-3 p-3 flex justify-end border-t bg-gray-100">
                        <Button
                          type="danger"
                          onClick={handleRevertExpense}
                          leftIcon={<ReplyIcon className="w-5 mr-1" />}
                        >
                          Revert
                        </Button>
                      </div>
                    )}
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
