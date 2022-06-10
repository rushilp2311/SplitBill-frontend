import { Breadcrumb, ComboBox } from "components";
import Button from "components/Button";
import FormInput from "components/FormInput";
const AddGroup = () => {
  return (
    <div className="mt-4 flex-1 px-4 flex flex-col  sm:px-6 xl:max-w-6xl lg:mx-auto lg:px-8">
      {/* Page Header */}
      <div className="">
        <Breadcrumb
          paths={[
            { name: "Groups", to: "/groups" },
            { name: "Add Group", to: "/addgroup" },
          ]}
        />
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Add Group
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row justify-evenly items-center lg:justify-between">
        <div className="mt-4 w-3/4 mb-10 lg:mb-0 max-w-md">
          <FormInput
            label="Name*"
            name="groupName"
            type="text"
            placeholder="Enter Group Name"
          />
          <FormInput
            label="Description"
            name="groupName"
            type="text"
            placeholder="Enter Group Description (Optional)"
          />
          <p>Add Users</p>
          <ComboBox />
          <Button margin="mt-5" width="w-full">
            Add Group
          </Button>
        </div>
        <div className="w-2/4 lg:mt-6">
          <p className="text-xl font-bold">Added Members</p>
          <p>Rushil</p>
          <p>Rushil</p>
          <p>Rushil</p>
          <p>Rushil</p>
          <p>Rushil</p>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
