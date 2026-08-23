import axiosInstance from './axiosInstance'

export const registerUser = async (username, email, password) => {
  const response = await axiosInstance.post('/auth/register', { username, email, password })
  return response.data
}

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password })
  return response.data
}

export const logoutUser = async () => {
  const response = await axiosInstance.get('/auth/logout')
  return response.data
}

export const getMe = async () => {
  const response = await axiosInstance.get('/auth/get-me')
  return response.data
}
