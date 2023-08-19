import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase-config";
import Loader from "../components/Loader";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
    },[]);
    if (loading) {
      return <Loader/>; // Render loading indicator
    }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
