export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken); //Lưu vào local storage tức là lưu vào trong ổ cứng
};

export const removeAccessTokenFromLS = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';
