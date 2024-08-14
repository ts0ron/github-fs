import React from 'react';
import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';

function isTokenExpired(token: string | null) {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp && decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
}
    

function useIsLoggedIn() {
    return !isTokenExpired(window.sessionStorage.getItem('token'));
}

export default useIsLoggedIn;