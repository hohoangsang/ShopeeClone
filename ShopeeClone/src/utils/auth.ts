import { User } from "src/types/user.type";

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken); //Lưu vào local storage tức là lưu vào trong ổ cứng
};

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('profile');
};

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
}

export const getProfileFromLS = () => {
  const profileString = localStorage.getItem('profile');

  if (profileString) return JSON.parse(profileString)

  return null;
}

