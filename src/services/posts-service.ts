import { Post } from "../types";
import apiClient from "./api-client";

export const getAllUserPosts = async (userId: string) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.get(`/userPost/user/allPosts/${userId}`, {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const createPost = async (post: Post) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.post(
    "/userPost",
    { ...post },
    {
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );

  return data;
};

export const editPost = async (post: Post) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.put(
    `/userPost/${post._id}`,
    { ...post },
    {
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );

  return data;
};

export const deletePost = async (post: Post) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken } = JSON.parse(currentUser);
  const { data } = await apiClient.delete(`/userPost/${post._id}`, {
    headers: { Authorization: `JWT ${accessToken}` },
  });

  return data;
};

export const createComment = async (postId: string, content: string) => {
  const currentUser = localStorage.getItem("currentUser");
  const { accessToken, imgUrl, username } = JSON.parse(currentUser);
  const { data } = await apiClient.put(
    `/userPost/addComment/${postId}`,
    { userImgUrl: imgUrl, content, username },
    {
      headers: { Authorization: `JWT ${accessToken}` },
    }
  );

  return data;
};
