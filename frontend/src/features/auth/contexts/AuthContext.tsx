import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "../api/login";
import { getCurrentUser } from "../api/getCurrentUser";
import { LoginCredentials, User } from "../types";
import storage from "../../../utils/storage";

interface IAuthContext {
  loading: boolean;
  user?: User;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
}

const authContext = createContext<IAuthContext>({
  loading: false,
  login: () =>
    Promise.resolve({
      _id: "",
      email: "",
      firstName: "",
      lastName: "",
      items: [],
    }),
  logout: () => {},
});

const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<{
    loading: boolean;
    user?: User;
  }>({ loading: true });

  useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
    onSuccess: ({ data }) => {
      setAuthInfo({
        loading: false,
        user: data.currentUser,
      });
    },
    onError: () => {
      setAuthInfo({
        loading: false,
      });
    },
    useErrorBoundary: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...authInfo,
    login: async ({ email, password }: LoginCredentials) => {
      const { data } = await loginWithEmailAndPassword({ email, password });
      storage.setToken(data.token);

      setAuthInfo({
        loading: false,
        ...data,
        user: data.user,
      });

      return data.user;
    },
    logout: () => {
      setAuthInfo({ loading: false });
    },
  };
};

interface IProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: IProviderProps) => {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      <div />
      {children}
    </authContext.Provider>
  );
};

const AuthConsumer = () => useContext(authContext);

export { AuthConsumer as useAuth };
