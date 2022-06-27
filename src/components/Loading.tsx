import { CgSpinner } from "react-icons/cg";

import LoadingGIF from "../images/loading.gif";

const Loading = ({
  isServerLoading = false,
}: {
  isServerLoading?: boolean;
}) => {
  return (
    <>
      {isServerLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <img src={LoadingGIF} alt="loading" className="h-64" />
          <p className="mt-8 animate-pulse text-center align-middle text-xl font-semibold">
            Connecting to Server...
          </p>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <CgSpinner className="animate-spin text-3xl" />
        </div>
      )}
    </>
  );
};

export default Loading;
