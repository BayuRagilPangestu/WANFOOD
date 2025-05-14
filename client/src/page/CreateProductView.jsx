import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import { toast } from "react-toastify";
import { useNavigate, redirect } from "react-router-dom";
import customAPI from "../api";

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

const CreateProductView = () => {
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
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);

    try {
      // upload file
      const responseFileUpload = await customAPI.post(
        "/product/file-upload",
        {
          image: data.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // create product
      await customAPI.post("/product", {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
        image: responseFileUpload.data.url,
      });

      toast.success("Berhasil Tambah Product");
      navigate("/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label className="form-control">
        <label className="label">
          <span className="label-text capitalize">Image</span>
        </label>
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
      </label>
      <FormSelect name="category" Label="Select Category" List={categories} />
      <FormInput name="name" Label="Product Name" type="text" />
      <FormInput name="price" Label="Product Price" type="number" />
      <FormInput name="stock" Label="Product Stock" type="number" />
      <FormTextArea name="description" Label="Product Description" />
      <input
        type="submit"
        value="Tambah"
        className="btn btn-primary btn-block mt-5 btn-md"
      />
    </form>
  );
};

export default CreateProductView;
