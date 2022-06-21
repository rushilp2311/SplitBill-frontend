import { ChevronRightIcon, CurrencyRupeeIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { authService } from "services";
import ExpenseDetailModal from "./ExpenseDetailModal";

type ExpenseProps = {
  expenseList: any[];
  settled?: boolean;
};

const ExpenseList = ({ expenseList, settled = false }: ExpenseProps) => {
  const [showExpenseDetail, setShowExpenseDetail] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>();
  const currentUser: any = authService.getCurrentUser();

  return (
    <>
      {expenseList && expenseList.length > 0 ? (
        <div className="mt-2 divide-y overflow-y-auto rounded border shadow">
          {expenseList.map((expense: any) => (
            <div
              key={expense._id}
              className=" grid grid-cols-3 items-center px-3 py-1 hover:cursor-pointer hover:bg-gray-50 sm:grid-cols-5"
              onClick={() => {
                setShowExpenseDetail(true);
                setSelectedExpense(expense);
              }}
            >
              <div className="pl-2">
                <p className="mt-1 text-lg font-semibold text-blue-600 ">
                  {expense.description}
                </p>
                <p className="text-md font-medium text-gray-500">
                  $ {Number(expense.amount).toFixed(2)}
                </p>
              </div>
              <div className="col-span-2 hidden justify-self-center text-sm text-gray-500 sm:block">
                <p>
                  Paid by{" "}
                  <span className="font-medium text-gray-600">
                    {expense.paidBy._id === currentUser._id
                      ? "You"
                      : expense.paidBy.name}
                  </span>
                </p>
                <p>
                  on{" "}
                  <span className="font-medium text-gray-600">
                    {new Date(expense.date).toUTCString().slice(0, 17)}
                  </span>
                </p>
              </div>
              {expense.paidBy._id === currentUser.id ? (
                <div className="justify-self-center text-sm font-semibold text-green-600">
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
                <div
                  className={`${
                    settled ? "text-green-600" : "text-red-500"
                  } justify-self-center text-sm font-semibold`}
                >
                  {settled ? <p>You Paid</p> : <p>You Owe</p>}
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
          ))}
        </div>
      ) : (
        <div className="rounded border-2 border-dashed p-2 text-center">
          <div className="flex justify-center">
            <CurrencyRupeeIcon className="w-10 stroke-slate-600 stroke-1" />
          </div>
          <h3 className="text mt-2 font-medium text-gray-900">
            {settled ? "Nothing to Show" : "No Active Expenses"}
          </h3>
          <p className="text mt-1 text-gray-500">
            Add expenses by clicking the + button.
          </p>
        </div>
      )}
      <ExpenseDetailModal
        expense={selectedExpense}
        settled={settled}
        open={showExpenseDetail}
        setOpen={setShowExpenseDetail}
      />
    </>
  );
};

export default ExpenseList;
