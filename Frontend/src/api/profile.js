// src/api/profile.js
import { API_URL } from "./apiconfig";
import { auth } from "../firebase";

export const createUserProfile = async (profileData) => {
  const user = auth.currentUser;
  if (!user) return { status: "error", message: "User not authenticated" };

  const token = await user.getIdToken();

  const res = await fetch(`${API_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });

  return await res.json();
};

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const token = await user.getIdToken();

  const res = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return await res.json();
};

export const updateUserProfile = async (profileData) => {
  const user = auth.currentUser;
  if (!user) return null;

  const token = await user.getIdToken();

  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });

  return await res.json();
};