import { CheckIcon } from "@heroicons/react/outline";
import { SearchInput } from "components";
import Button from "components/Button";
import Joi from "joi";
import { MemberType } from "pages/Groups/AddGroup";
import { useState } from "react";
import { findUserByEmail } from "services/userService";

type SearchMemberProps = {
  memberList: MemberType[];
  setMemberList: any;
};

const SearchMember = ({ memberList, setMemberList }: SearchMemberProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null | undefined>("");
  const [foundUser, setFoundUser] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<any>();

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

  // TODO: update the error messages
  const handleAddMember = (e: any) => {
    if (memberList.length === 5) {
      console.log("Max 5 members");
    }
    if (memberList.find((member) => member.email === searchedUser.email)) {
      console.log("user already added");
    } else {
      setMemberList([...memberList, searchedUser]);
      setSearchedUser({});
      setFoundUser(false);
      setEmail("");
    }
  };

  console.log(emailError);

  return (
    <>
      <div className="flex items-center">
        <SearchInput
          name="email"
          placeholder="Search member by email"
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
        <div className="text-green-700">
          Do you want to add this user to the group?
        </div>
      )}
    </>
  );
};

export default SearchMember;
