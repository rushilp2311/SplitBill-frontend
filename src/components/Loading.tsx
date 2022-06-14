import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <CgSpinner className="animate-spin text-3xl" />
    </div>
  );
};

export default Loading;
