import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false)
      } else {
        setUser(null);
        setIsLoading(false)
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, AuthContext };
