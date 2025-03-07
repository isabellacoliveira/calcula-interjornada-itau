import { ReactNode, createContext, useContext, useState } from "react";
import { Api } from "../services/api";

interface PasswordProviderProps {
  children: ReactNode;
}

export interface PasswordContextType {
  postPassword: (password: string) => Promise<void>;
  passwordStatus: string | null;
  setPasswordStatus: React.Dispatch<React.SetStateAction<string | null>>;
  passwordMessage: string | null;
  setPasswordMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const PasswordContext = createContext({} as PasswordContextType);
PasswordContext.displayName = "Password Context";

export function usePassword() {
  return useContext(PasswordContext);
}

export function PasswordProvider({ children }: PasswordProviderProps) {
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  async function postPassword(password: string) {
    try {
      const response = await Api.post(`/password-check`, {
        password
      });

      setPasswordStatus(response.data.response);
      setPasswordMessage(response.data)
    } catch (error: any) {
      console.error("Erro ao definir a senha:", error.response.data.message);
      setPasswordMessage(error.response.data.message); 
    }
  }

  return (
    <PasswordContext.Provider value={{ 
        postPassword, 
        passwordStatus, 
        setPasswordStatus,
        passwordMessage,
        setPasswordMessage
      }}>
      {children}
    </PasswordContext.Provider>
  );
}
