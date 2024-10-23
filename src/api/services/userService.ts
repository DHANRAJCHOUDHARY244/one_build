import apiClient from '../apiClient';

import { FetchUserInfo, User, UserByIdResponseData, UserInfo, UserToken } from '#/entity';

export interface SignInReq {
  email: string;
  password: string;
}

export interface FetchUserParams {
  search?: string;
  page_size?: number;
  page?: number;
  month?:string;
}

export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
  SignIn = '/admin/auth/admin-login',
  Logout = '/auth/logout',
  User = '/user',
  Create_User = '/auth/create-user-id',
  FetchUser = '/admin/auth/all-users',
  GetUserID = '/admin/auth/get-user',
}

// Sign-in request
const signin = (data: SignInReq) => apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
const fetchUser = (params?: FetchUserParams | null) => {
  return  apiClient.get<FetchUserInfo>({
    url: UserApi.FetchUser,
    params: params || {},
  });
};
const getUserById = (id: any) => {
  return apiClient.get<UserByIdResponseData>({
    url: UserApi.GetUserID,
    params: { id },
  });
};

// Logout request
const logout = () => apiClient.get({ url: UserApi.Logout });

// Find user by ID
const findById = (id: string) => apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });

// Create a new user
const createUser = (data: User) => apiClient.post<User>({ url: UserApi.Create_User, data });

export default {
  signin,
  fetchUser,
  findById,
  logout,
  createUser,
  getUserById,
};
