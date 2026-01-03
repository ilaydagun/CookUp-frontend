// DEPRECATED: Firebase Auth kullaniliyor
// Bu dosya artik kullanilmiyor, AuthContext'ten useAuth() kullanin

export const getToken = () => {
  console.warn("getToken() deprecated. Use useAuth().getToken() instead.");
  return null;
};

export const setToken = () => {
  console.warn("setToken() deprecated. Firebase Auth handles tokens.");
};

export const clearToken = () => {
  console.warn("clearToken() deprecated. Use useAuth().logout() instead.");
};
