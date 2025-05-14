import React from "react";
import customAPI from "../api";
import { Link, useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CartProduct from "../components/CartProduct";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const { data } = await customAPI.get("/product", { params: params });

  // console.log(params);
  const products = data.data;
  // console.log(products);
  const pagination = data.pagination;

  return { products, params, pagination };
};

const ProductView = () => {
  const user = useSelector((state) => state.userState.user);
  const { products, pagination } = useLoaderData();
  console.log(products);
  return (
    <>
      <Filter />
      {user && user.role === "owner" && (
        <div className="flex justify-end">
          <Link to="/product/create" className="btn btn-secondary mt-5">
            Tambah Produk
          </Link>
        </div>
      )}

      <h3 className="text-1xl text-primary font-bold text-right my-3">
        Total : {pagination.totalProduct} Produk
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {!products.length ? (
          <h1 className="text-3xl font-bold mt-5">
            Tidak ada Produk yang dicari
          </h1>
        ) : (
          products.map((item) => <CartProduct item={item} key={item._id} user={user} />)
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  );
};

export default ProductView;
