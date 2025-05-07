import axios from "axios";
import { BASE_URL } from "../constants";

class AuthService {
  // Add this function to your AuthService class
  setAuthData(userId, accessToken, refreshToken = null) {
    console.log('[AuthService] Setting auth data:', {
      userId: userId,
      accessToken: accessToken ? 'EXISTS (not shown for security)' : 'NOT FOUND',
      hasRefreshToken: !!refreshToken
    });
    
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    // Dispatch a custom event that all components can listen for
    const authEvent = new CustomEvent('authStateChanged', {
      detail: { isAuthenticated: true }
    });
    console.log('[AuthService] Dispatching custom authStateChanged event');
    window.dispatchEvent(authEvent);
    
    // Also dispatch storage event for backward compatibility
    console.log('[AuthService] Dispatching storage event');
    window.dispatchEvent(new Event('storage'));
  }

  async login(username, password) {
    console.log('[AuthService] Manual login attempt:', { username });
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });