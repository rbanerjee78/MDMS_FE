import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState({});

  return {
    user,
    setUser
  };
};
