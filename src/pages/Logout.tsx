import { useEffect } from "react";
import { authService } from "../services";

const Logout = () => {
  useEffect(() => {
    authService.logout();
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;
