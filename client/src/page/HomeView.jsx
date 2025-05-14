import CartProduct from "../components/CartProduct.jsx";
import customAPI from "../api.js";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero.jsx";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/api/v1/product?limit=3");

  console.log(request);

  const products = data.data;
  return { products };
};

const HomeView = () => {
  const { products } = useLoaderData();
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {products.map((item) => (
          <CartProduct item={item} key={item._id} />
        ))}
      </div>
    </>
  );
};

export default HomeView;
