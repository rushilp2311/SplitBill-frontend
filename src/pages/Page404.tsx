import Button from "components/Button";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="min-h-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col items-center">
        <p className="align-middle text-xl font-semibold text-gray-600">
          PAGE NOT FOUND
        </p>
        <p className="text-9xl text-red-700  font-mono font-bold">404</p>
      </div>
      <div className="mt-8">
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
