import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const links = [
  { id: 1, url: "about", text: "about" },
  { id: 2, url: "products", text: "products" },
  { id: 3, url: "orders", text: "orders" },
  { id: 4, url: "checkout", text: "checkout" },
  { id: 4, url: "profile", text: "edit profile" },
];

const NavList = () => {
  const user = useSelector((state) => state.userState.user);

  // // Tambahkan link edit profile jika user login
  // const extendedLinks = [...links];
  // if (user) {
  //   extendedLinks.push({ id: 5, url: "profile", text: "edit profile" });
  // }
  
  return (
    <>
      {links.map((Link) => {
        const { id, url, text } = Link;
        
        // Sembunyikan link untuk halaman yang butuh login jika belum login
        if ((url === "orders" || url === "checkout") && !user) {
          return null;
        }

        // Sembunyikan "checkout" jika user adalah owner
        if (url === "checkout" && user?.role === "owner") {
          return null;
        }

        // Sembunyikan "edit profile" jika tidak login atau jika role owner
        if (url === "profile" && (!user || user.role === "owner")){
          return null;
        }

        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
