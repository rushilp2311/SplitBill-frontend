import { ToastProvider } from "contexts/ToastContext";
import Router from "./Router";

function App() {
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
