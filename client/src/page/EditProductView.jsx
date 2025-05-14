import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import customAPI from "../api";
import Loading from "../components/Loading";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Anda Harus Login Dulu");
    return redirect("/login");
  }
  if (user.role !== "owner") {
    toast.warn("Anda tidak bisa mengakses halaman ini");
    return redirect("/");
  }
  return null;
};

const EditProductView = () => {
  const [product, setProduct] = useState(null);
  const categories = [
    "kanzler",
    "champ",
    "fiesta",
    "cedea",
    "so good",
    "belfoods",
    "kimbo",
    "golden farm",
  ];
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductId = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);

    try {
      // create product
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
      });

      toast.info("Berhasil Update Product");
      navigate("/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getProductId();
  }); //[]

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormSelect
            name="category"
            Label="Select Category"
            List={categories}
            defaultValue={product.category}
          />
          <FormInput
            name="name"
            Label="Product Name"
            type="text"
            defaultValue={product.name}
          />
          <FormInput
            name="price"
            Label="Product Price"
            type="number"
            defaultValue={product.price}
          />
          <FormInput
            name="stock"
            Label="Product Stock"
            type="number"
            defaultValue={product.stock}
          />
          <FormTextArea
            name="description"
            Label="Product Description"
            defaultValue={product.description}
          />
          <input
            type="submit"
            value="Edit Produk"
            className="btn btn-primary btn-block mt-5 btn-md"
          />
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditProductView;
