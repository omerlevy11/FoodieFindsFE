import { CredentialResponse } from "@react-oauth/google";
import { IUser, editUser } from "../types";
import apiClient from "./api-client";

export const loginUser = async (user: IUser) => {
  const { data } = await apiClient.post("/auth/login", user);

  return data;
};

export const refresh = async (token: string) => {
  const { data } = await apiClient.get("/auth/refresh", {
    headers: { Authorization: `JWT ${token}` },
  });

  return data;
};

export const registerUser = (user: IUser) => {
  return new Promise<IUser>((resolve, reject) => {
    apiClient
      .post("/auth/register", user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const googleSignin = (credentialResponse: CredentialResponse) => {
  return new Promise<IUser>((resolve, reject) => {
    apiClient
      .post("/auth/google", credentialResponse)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllUsers = async (currentUserId: string) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.get(`/user/allUsers/${currentUserId}`, {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const getCurrentUser = async (accessToken: string) => {
  const { data } = await apiClient.get("/user", {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const logout = async () => {
  const currentUser = localStorage.getItem("currentUser");
  const { refreshToken } = JSON.parse(currentUser);
  const { data } = await apiClient.get("/auth/logout", {
    headers: { Authorization: `JWT ${refreshToken}` },
  });

  return data;
};

export const editProfile = async (userId: string, editUser: editUser) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);

  return new Promise((resolve, reject) => {
    apiClient
      .put(
        `/user/${userId}`,
        { ...editUser },
        {
          headers: { Authorization: `JWT ${accessToken}` },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserByName = async (fullName: string) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.get(`/user/filter/${fullName}`, {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const getUserById = async (userId: string) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.get(`/user/${userId}`, {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};
