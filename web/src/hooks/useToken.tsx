import React, { useEffect, useRef, useState } from "react";

import { jwtDecode } from "jwt-decode";
import authService from "../services/auth/authService";
import { Redirect } from "react-router-dom";
import { isToken } from "typescript";
import { LOGGIN_ROUTE_URL, LOGOUT_ROUTE_URL, REGISTRATION_URL } from "../routes/routes";

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return !!decodedToken.exp && decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}

export interface TokenUtils {
  clearToken: () => void;
  setToken: (token: string) => void;
  getToken: () => string;
  isTokenExpired: boolean;
}

function useToken(): TokenUtils {
  const [isExpired, setIsExpired] = useState<boolean>(
    isTokenExpired(getToken())
  );
  const ref = useRef<NodeJS.Timer>();


  function tokenExpired(): void {
    if (isTokenExpired(getToken())) {

      setIsExpired(true);
    }
  }

  useEffect(() => {
    if (isExpired) {
      deleteToken();
      if (window.location.pathname !== LOGGIN_ROUTE_URL && window.location.pathname !== REGISTRATION_URL) {
        window.location.href = LOGGIN_ROUTE_URL;
      }
    }
  }, [isExpired]);

  useEffect(() => {
    ref.current = setInterval(tokenExpired, 5 * 60 * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  function deleteToken() {
    localStorage.removeItem("token");
    setIsExpired(true);
  }

  function setToken(token: string) {
    localStorage.setItem("token", token);
    setIsExpired(isTokenExpired(token));
  }

  function getToken(): string | null {
    return localStorage.getItem("token");
  }

  function fetchToken(
    username: string,
    password: string
  ): Promise<string | null> {
    return authService.fetchToken(username, password);
  }

  return {
    clearToken: deleteToken,
    setToken,
    getToken,
    fetchToken,
    isTokenExpired: isExpired,
  } as TokenUtils;
}

export default useToken;
