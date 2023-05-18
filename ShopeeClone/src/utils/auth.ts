export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};

export const remoteAccessTokenFromLS = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token');
