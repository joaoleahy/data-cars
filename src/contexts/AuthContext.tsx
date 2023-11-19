import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useContext,
} from 'react';

import { User } from '~/models/User';
import login from '~/services/auth/login';
import signup from '~/services/auth/signup';

interface IAuthContext {
  user: User | null;
  login: (cpf: string) => Promise<void>;
  logout: () => void;
  signup: (payload: User) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authenticatedUserJson = sessionStorage.getItem('user');

    if (authenticatedUserJson) {
      setUser(JSON.parse(authenticatedUserJson) as User);
    }
  }, []);

  const handleLogin = async (cpf: string) => {
    const authenticatedUser = await login(cpf);

    setUser(authenticatedUser);

    sessionStorage.setItem('user', JSON.stringify(authenticatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const handleSignup = async (payload: User) => {
    await signup(payload);
  };

  const store = useMemo(
    () => ({
      user,
      login: handleLogin,
      logout: handleLogout,
      signup: handleSignup,
    }),
    [user]
  );

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
