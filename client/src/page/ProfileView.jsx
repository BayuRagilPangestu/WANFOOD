import React from "react";
import { useEffect, useState } from "react";
import { getCurrentUser, updateUserProfile } from "../api/userAPI";
import { useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }

  if (user.role === "owner") {
    toast.warn("Owner tidak dapat mengakses halaman ini ");
    return redirect("/");
  }
  return null;
};

const ProfileView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();

        if (user.role === "owner") {
          // Redirect jika role owner
          navigate("/");
          return;
        }

        setFormData((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
        }));
      } catch {
        setMessage("Gagal mengambil data user");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setMessage("Profil berhasil diperbarui");
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
      }));
    } catch (err) {
      setMessage(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-base-300 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        {message && (
          <p className="mb-4 text-sm text-center text-info">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password Lama
            </label>
            <input
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Password Lama"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password Baru
            </label>
            <input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Password Baru"
              className="input input-bordered w-full"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary mt-4">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileView;
