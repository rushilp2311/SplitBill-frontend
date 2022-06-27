import { Loading } from "components";
import { ToastProvider } from "contexts/ToastContext";
import { useEffect, useState } from "react";
import { pingServer } from "services/authService";
import Router from "./Router";

function App() {
  const [isServerLoading, setIsServerLoading] = useState(true);

  useEffect(() => {
    const ping = async () => {
      const result = await pingServer();

      if (result) {
        setIsServerLoading(false);
      }
    };
    ping();
  }, []);

  if (isServerLoading) return <Loading isServerLoading={isServerLoading} />;

  return (
    <>
      {/* This is for routes */}
      <ToastProvider>
        <Router />
      </ToastProvider>
    </>
  );
}

export default App;
