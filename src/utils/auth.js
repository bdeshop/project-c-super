// Authentication utility functions

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

/**
 * Get stored user data
 * @returns {object|null}
 */
export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

/**
 * Get auth token
 * @returns {string|null}
 */
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

/**
 * Logout user - clear all stored data
 */
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  // You can add redirect logic here if needed
  // window.location.href = '/';
};

/**
 * Get user balance from stored data
 * @returns {number|null}
 */
export const getUserBalance = () => {
  const userData = getUserData();
  return userData?.balance || null;
};

/**
 * Get username from stored data
 * @returns {string|null}
 */
export const getUsername = () => {
  const userData = getUserData();
  return userData?.username || userData?.name || null;
};

/**
 * Check if token is expired (optional - if your API provides token expiry)
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  // For now, just return false (assume token is valid)
  // You can implement JWT token expiry check here later
  return false;
};
