"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiRequest, ApiError, AUTH_TOKEN_KEY } from "../../lib/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "mom" | "doctor" | "admin";
};

type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "error";

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

    if (!token) {
      queueMicrotask(() => {
        if (!cancelled) setStatus("unauthenticated");
      });
      return () => {
        cancelled = true;
      };
    }

    apiRequest<{ user: AuthUser }>("/api/v1/me")
      .then(({ user: currentUser }) => {
        if (cancelled) return;
        setUser(currentUser);
        setStatus("authenticated");
      })
      .catch((requestError: unknown) => {
        if (cancelled) return;
        if (
          requestError instanceof ApiError &&
          requestError.status === 401
        ) {
          window.localStorage.removeItem(AUTH_TOKEN_KEY);
          setStatus("unauthenticated");
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "تعذر التحقق من الحساب.",
        );
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const saveSession = useCallback((token: string, nextUser: AuthUser) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    setUser(nextUser);
    setError(null);
    setStatus("authenticated");
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await apiRequest<{ token: string; user: AuthUser }>(
        "/api/v1/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
      );
      saveSession(result.token, result.user);
    },
    [saveSession],
  );

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await apiRequest<{ token: string; user: AuthUser }>(
        "/api/v1/signup",
        {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        },
      );
      saveSession(result.token, result.user);
    },
    [saveSession],
  );

  const signOut = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    setError(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo(
    () => ({ user, status, error, signIn, signUp, signOut }),
    [user, status, error, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
