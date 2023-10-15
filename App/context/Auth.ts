import React from 'react';

interface Context {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  accountData: Array<{
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
  }>;
  setAccountData: React.Dispatch<React.SetStateAction<never[]>>;
}

export const initialAuthContext: Context = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  accountData: [],
  setAccountData: () => null,
};

const AuthContext = React.createContext<Context>(initialAuthContext);
export default AuthContext;
