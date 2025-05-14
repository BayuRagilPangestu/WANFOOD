import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import customAPI from "../api";
import { toast } from "react-toastify";
import { clearCartItem } from "../features/cartSlice";
import { useNavigate, redirect } from "react-router-dom";
import FormTextArea from "../components/Form/FormTextArea";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

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

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.CartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);

    const data = Object.fromEntries(formdata);

    const newArrayKeranjang = carts.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      };
    });

    try {
      const response = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        address: data.address,
        cartItem: newArrayKeranjang,
      });

      const snapToken = response.data.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          dispatch(clearCartItem());
          navigate("/orders");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("Pending");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          alert("Error");
        },
      });
      toast.success("Berhasil Order");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
      </div>
      <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
        {/* form */}
        <div className="lg:col-span-8">
          <form
            method="POST"
            className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
            onSubmit={handleCheckout}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput Label="first name" type="name" name="firstname" />
              <FormInput Label="last name" type="name" name="lastname" />
            </div>
            <FormInput
              Label="email"
              type="email"
              name="email"
              defaultValue={user.email}
            />
            <FormInput Label="phone" type="name" name="phone" />
            <FormTextArea Label="alamat lengkap" type="name" name="address" />
            <button type="submit" className="btn btn-primary mt-8">
              Bayar
            </button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
};

export default CheckoutView;
