import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Logo from "../components/Logo";
import { authService, userService } from "services";

type SignUpDataType = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [data, setData] = useState<SignUpDataType>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignUpDataType>({
    name: "",
    email: "",
    password: "",
  });

  const schema: any = {
    name: Joi.string().required().label("Name"),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const doSubmit = async () => {
    try {
      const response = await userService.registerUser(data);
      console.log(response);
      authService.loginWithJwt(response.headers["authorization"]);
      window.location.href = "/";
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrors({ ...errors, email: error.response.data });
      } else {
        setApiError(error.response.data);
      }
    }
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (errors) return;
    doSubmit();
  };

  const handleChange = ({ currentTarget: input }: any) => {
    setApiError(null);
    setErrors({
      name: "",
      email: "",
      password: "",
    });
    const errorMessage = validateProperty(input);
    // @ts-ignore
    if (errorMessage) errors[input.name] = errorMessage;
    // @ts-ignore
    else delete errors[input.name];

    setData({ ...data, [input.name]: input.value });
    setErrors(errors);
  };

  useEffect(() => {
    document.title = "SplitBill | SignUp";
  }, []);
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Logo />
        <div className="mt-8">
          <h1 className="font-bold text-3xl">Create your account</h1>

          <div className="mt-8">
            <FormInput
              label="Name"
              type="text"
              placeholder="Enter your name"
              name="name"
              error={errors ? errors.name : ""}
              onChange={handleChange}
            />
            <FormInput
              label="Email"
              type="text"
              placeholder="Enter your email"
              name="email"
              error={errors ? errors.email : ""}
              onChange={handleChange}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              error={errors ? errors.password : ""}
              onChange={handleChange}
            />

            <Button
              width="w-full"
              margin="mt-6"
              onClick={handleSubmit}
              disabled={validate() || apiError}
            >
              Create Account
            </Button>
          </div>
        </div>
        <Link to="/signin">
          <p className="mt-3 flex">
            Already have an account?{" "}
            <Button type="link" margin="ml-2">
              Sign in
            </Button>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
