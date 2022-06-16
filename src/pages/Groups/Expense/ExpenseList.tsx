import { ChevronRightIcon, CurrencyRupeeIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { authService } from "services";
import ExpenseDetailModal from "./ExpenseDetailModal";

type ExpenseProps = {
  expenseList: any[];
};

const ExpenseList = ({ expenseList }: ExpenseProps) => {
  const [showExpenseDetail, setShowExpenseDetail] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>();
  const currentUser: any = authService.getCurrentUser();

  return (
    <>
      {expenseList && expenseList.length > 0 ? (
        <div className="border divide-y rounded mt-2 shadow overflow-y-auto">
          {expenseList.map((expense: any) => (
            <>
              <div
                key={expense._id}
                className=" grid grid-cols-3 sm:grid-cols-5 items-center px-3 py-1 hover:bg-gray-50 hover:cursor-pointer"
                onClick={() => {
                  setShowExpenseDetail(true);
                  setSelectedExpense(expense);
                }}
              >
                <div className="pl-2">
                  <p className="text-lg text-blue-600 font-semibold mt-1 ">
                    {expense.description}
                  </p>
                  <p className="text-md font-medium text-gray-500">
                    $ {Number(expense.amount).toFixed(2)}
                  </p>
                </div>
                <div className="text-gray-500 hidden sm:block col-span-2 text-sm justify-self-center">
                  <p>
                    Paid by{" "}
                    <span className="text-gray-600 font-medium">
                      {expense.paidBy._id === currentUser._id
                        ? "You"
                        : expense.paidBy.name}
                    </span>
                  </p>
                  <p>
                    on{" "}
                    <span className="text-gray-600 font-medium">
                      {new Date(expense.date).toUTCString().slice(0, 17)}
                    </span>
                  </p>
                </div>
                {expense.paidBy._id === currentUser.id ? (
                  <div className="text-green-600 font-semibold text-sm justify-self-center">
                    <p>You Lent</p>
                    <p>
                      ${" "}
                      {
                        expense?.membersBalance?.find(
                          (member: any) =>
                            member?.memberId?.toString() === currentUser.id
                        ).balance
                      }
                    </p>
                  </div>
                ) : (
                  <div className="text-red-500 font-semibold text-sm justify-self-center">
                    <p>You Owe</p>
                    <p>
                      ${" "}
                      {
                        expense?.membersBalance
                          ?.find(
                            (member: any) =>
                              member?.memberId?.toString() === currentUser.id
                          )
                          .balance.split("-")[1]
                      }
                    </p>
                  </div>
                )}
                <div className="justify-self-end text-gray-400">
                  <ChevronRightIcon className="w-5" />
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className="text-center p-2 border-2 rounded border-dashed">
          <div className="flex justify-center">
            <CurrencyRupeeIcon className="w-10 stroke-slate-600 stroke-1" />
          </div>
          <h3 className="mt-2 text font-medium text-gray-900">No Expenses</h3>
          <p className="mt-1 text text-gray-500">
            Add expenses by clicking the + button.
          </p>
        </div>
      )}
      <ExpenseDetailModal
        expense={selectedExpense}
        open={showExpenseDetail}
        setOpen={setShowExpenseDetail}
      />
    </>
  );
};

export default ExpenseList;
