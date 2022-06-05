import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import Logo from "../components/Logo";

const SignUp = () => {
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
            <FormInput label="Name" type="text" placeholder="Enter your name" />
            <FormInput
              label="Email"
              type="text"
              placeholder="Enter your email"
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <Button width="w-full" margin="mt-6">
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
