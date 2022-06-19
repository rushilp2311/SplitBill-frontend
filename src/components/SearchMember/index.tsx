import { CheckIcon } from "@heroicons/react/outline";
import { SearchInput } from "components";
import Button from "components/Button";
import Joi from "joi";
import { MemberType } from "pages/Groups/AddGroup";
import ToastContext from "contexts/ToastContext";
import { useState, useContext } from "react";
import { findUserByEmail } from "services/userService";

type SearchMemberProps = {
  memberList: MemberType[];
  setMemberList?: any;
  handleAdd: ((memberId?: string) => Promise<void>) | null;
};

const SearchMember = ({
  memberList,
  setMemberList,
  handleAdd,
}: SearchMemberProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null | undefined>("");
  const [foundUser, setFoundUser] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<any>();

  const { showToast } = useContext(ToastContext);

  const schema: any = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
  };

  const validate = (): any => {
    const options = { abortEarly: false };
    const { error } = Joi.object(schema).validate({ email }, options);
    if (!error) return null;

    return error;
  };

  const validateProperty = ({ name, value }: any) => {
    const obj = { [name]: value };
    const Joischema = { [name]: schema[name] };
    const { error } = Joi.object(Joischema).validate(obj);
    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setEmailError("");
    setFoundUser(false);
    const errorMessage = validateProperty(input);
    // @ts-ignore
    setEmail(input.value);
    setEmailError(errorMessage);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    const error = validate();
    setEmailError(error?.details[0].message);
    if (error) return;
    doSearch();
  };

  const doSearch = async () => {
    try {
      const result = await findUserByEmail(email);
      if (result) {
        setSearchedUser(result);
        setFoundUser(true);
      }
    } catch (error: any) {
      if (error.response) {
        setEmailError(error.response.data);
      }
    }
  };

  const handleAddMember = (e: any) => {
    if (memberList.length === 5) {
      showToast("Maximum 5 members are allowed in the group", "warning");
      return;
    }
    if (memberList.find((member) => member.email === searchedUser.email)) {
      showToast("Member already added", "error");
      setSearchedUser({});
      setFoundUser(false);
      setEmail("");
    } else {
      setMemberList([...memberList, searchedUser]);
      if (handleAdd) {
        handleAdd(searchedUser.id);
      }
      showToast("Member added", "success");
      setSearchedUser({});
      setFoundUser(false);
      setEmail("");
    }
    return;
  };

  return (
    <>
      <div className="flex items-start">
        <SearchInput
          name="email"
          placeholder="Search by email"
          onChange={handleChange}
          value={email}
          error={emailError ? emailError : ""}
          foundUser={foundUser}
        />

        <div className="ml-5">
          {foundUser ? (
            <Button
              leftIcon={<CheckIcon className="w-5 " />}
              onClick={handleAddMember}
              disabled={validate() || memberList.length === 5}
            >
              Add
            </Button>
          ) : (
            <Button
              type="secondary"
              onClick={handleSearch}
              disabled={validate()}
            >
              Search
            </Button>
          )}
        </div>
      </div>
      {foundUser && (
        <div className="mt-1 text-green-700">
          Do you want to add this user to the group?
        </div>
      )}
    </>
  );
};

export default SearchMember;
