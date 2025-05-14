import React from "react";
import { Link } from "react-router-dom";
import { priceFormat } from "../utils";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";

const CartProduct = ({ item, user }) => {
  const { revalidate } = useRevalidator();
  return (
    <>
      <div className="card bg-base-300 shadow-xl" key={item._id}>
        <figure>
          <div className="relative">
            <img src={item.image} alt={item.name} />
            {item.stock < 1 && (
              <span className="absolute top-0 right-0 bg-error font-bold text-3xl">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          {user && user.role === "owner" && (
            <div className="flex justify-end gap-x-3">
              <FaTrash
                onClick={async () => {
                  await customAPI.delete(`/product/${item._id}`);
                  toast.info("Delete Berhasil");
                  revalidate();
                }}
                className="text-red-500 cursor-pointer"
              />
              <Link to={`/product/${item._id}/edit`}>
                <FaPencilAlt className="text-info cursor-pointer" />
              </Link>
            </div>
          )}
          <h2 className="card-title text-primary">{item.name}</h2>
          <p className="font-bold text-accent">{priceFormat(item.price)}</p>
          <p>{item.description.substring(0, 200)}</p>
          <div className="card-actions justify-end">
            <Link to={`/product/${item._id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
