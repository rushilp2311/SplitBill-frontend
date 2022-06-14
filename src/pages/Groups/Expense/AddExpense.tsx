import { Breadcrumb } from "components";
import Joi from "joi";
import Button from "components/Button";
import FormInput from "components/FormInput";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { authService, expenseService } from "services";
import ToastContext from "contexts/ToastContext";

const AddExpense = ({ group }: any) => {
  const { groupId } = useParams();
  const currentUser: any = authService.getCurrentUser();

  const { showToast } = useContext(ToastContext);

  const [data, setData] = useState({
    description: "",
    amount: "",
    groupId: groupId,
    paidBy: currentUser.id,
  });
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
  });

  const schema: any = {
    description: Joi.string().required().label("Description"),
    amount: Joi.string().required().label("Amount"),
    groupId: Joi.string().required().label("Group Id"),
    paidBy: Joi.string().required().label("Paid By"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate(data, options);
    if (!error) return null;
    const errors: any = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }: any) => {
    const obj = { [name]: value };
    const Joischema = { [name]: schema[name] };
    const { error } = Joi.object(Joischema).validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setErrors({
      description: "",
      amount: "",
    });
    const errorMessage = validateProperty(input);
    // @ts-ignore
    if (errorMessage) errors[input.name] = errorMessage;
    // @ts-ignore
    else delete errors[input.name];

    setData({ ...data, [input.name]: input.value });
    setErrors(errors);
  };

  const handleAddExpense = async (e: any) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) return;
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      const result = await expenseService.addExpense(data);
      if (result) {
        showToast("Expense added successfully", "success");
        window.location.href = `/group/detail/${groupId}`;
      }
    } catch (error: any) {
      if (error.response) {
        setErrors({ ...errors });
      }
    }
  };

  return (
    <div className="mt-4 h-full flex-1 px-4 flex flex-col  sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
      <Breadcrumb
        paths={[
          { name: "Groups", to: "/groups" },
          { name: "Group Detail", to: `/group/detail/${groupId}` },
          { name: "Add Expense", to: `/group/${groupId}/addexpense` },
        ]}
      />
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Add Expense
          </h2>
        </div>
      </div>

      <div className="max-w-lg mt-6">
        <FormInput
          label="Description"
          name="description"
          placeholder="Enter description"
          value={data.description}
          onChange={handleChange}
          error={errors ? errors.description : ""}
        />
        <FormInput
          label="Amount"
          name="amount"
          placeholder="0.00"
          type="number"
          showLeadingIcon
          value={data.amount}
          onChange={handleChange}
          error={errors ? errors.amount : ""}
        />

        <p className="mt-3 max-w-fit border border-green-600 px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full text-sm">
          Split Equally
        </p>

        <Button
          margin="mt-6"
          width="w-full"
          disabled={validate()}
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
