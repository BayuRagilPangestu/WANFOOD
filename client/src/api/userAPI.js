import customAPI from "../api";

// Ambil data user saat ini
export const getCurrentUser = async () => {
  const res = await customAPI.get("/auth/getuser");
  return res.data.user;
};

// Update profil user (nama, email, password)
export const updateUserProfile = async (data) => {
  const res = await customAPI.put("/auth/profile", data);
  return res.data;
};