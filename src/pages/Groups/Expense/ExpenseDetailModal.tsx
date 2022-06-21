import { Dialog, Transition } from "@headlessui/react";
import { XIcon, ReplyIcon, CheckCircleIcon } from "@heroicons/react/outline";
import Button from "components/Button";
import GroupContext from "contexts/GroupContext";
import ToastContext from "contexts/ToastContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, expenseService, userService } from "services";

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

  const navigate = useNavigate();

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

  const [settledMembers, setSettledMembers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUser() {
      const result = await userService.fetchUsersByIds(expense.settledMembers);
      setSettledMembers(result);
    }

    if (expense && expense.settledMembers.length > 0) {
      fetchUser();
    }
  }, [expense]);

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

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="w-80 bg-white px-4 pt-2 pb-4 sm:w-auto sm:px-6 sm:pt-3 sm:pb-4">
                      <div className="flex w-full justify-end">
                        <Button type="icon" onClick={() => setOpen(false)}>
                          <XIcon className="w-5 text-gray-600" />
                        </Button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-semibold leading-5 text-gray-700">
                            {expense.description}
                          </p>
                          <p className="mt-2 leading-5 text-gray-500">
                            Paid by{" "}
                            <span className="font-medium text-gray-600">
                              {expense.paidBy.name}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="mt-2 text-xl font-semibold leading-5 text-gray-700 sm:text-3xl">
                            $ {Number(expense.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        {expense.paidBy._id === currentUser.id ? (
                          <div className="justify-self-center text-lg font-semibold text-green-600">
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
                            } justify-self-center text-lg font-semibold`}
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

                      <div className="mt-6">
                        {settledMembers.length > 0 ? (
                          <div>
                            <p className="my-2 border-b pb-1 font-semibold uppercase text-gray-700">
                              Settled By{" "}
                            </p>

                            {settledMembers.map((member) => {
                              return (
                                <p
                                  className="flex items-center"
                                  key={member._id}
                                >
                                  <span className="mr-1 rounded-full bg-emerald-500">
                                    <CheckCircleIcon className="w-5 text-white" />
                                  </span>
                                  <span>{member.name}</span>
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-semibold uppercase text-gray-700">
                              No one settled yet
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {expense.paidBy._id !== currentUser.id && !settled && (
                      <div className="mt-3 flex justify-end border-t bg-gray-100 p-3">
                        <Button type="success" onClick={handleSettleExpense}>
                          Settle Up
                        </Button>
                      </div>
                    )}

                    {settled && (
                      <div className="mt-3 flex justify-end border-t bg-gray-100 p-3">
                        <Button
                          type="danger"
                          onClick={handleRevertExpense}
                          leftIcon={<ReplyIcon className="mr-1 w-5" />}
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
