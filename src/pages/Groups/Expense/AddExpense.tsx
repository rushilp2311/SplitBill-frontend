import { Breadcrumb } from "components";

const AddExpense = ({ group }: any) => {
  return (
    <div>
      <Breadcrumb
        paths={[
          { name: "Groups", to: "/groups" },
          { name: "Group Detail", to: `/group/details/${group._id}` },
        ]}
      />
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Add Expense
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
