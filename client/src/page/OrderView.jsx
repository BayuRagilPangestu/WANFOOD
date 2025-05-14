import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormat } from "../utils";
import customAPI from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }

  let orders;
  if (user.role !== "owner") {
    const { data } = await customAPI.get("/order/current/user");

    orders = data.data;
  } else {
    const { data } = await customAPI.get("/order");

    orders = data.data;
  }
  console.log(orders);

  return { orders };
};

const OrderView = () => {
  const { orders } = useLoaderData();
  if (!orders.length) {
    return (
      <h1 className="text-center text-primary font-bold text-3xl border-b border-secondary py-3">
        Orderan Anda Masih Kosong
      </h1>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>No .</td>
            <td>Order By</td>
            <td>Produk</td>
            <td>Alamat</td>
            <td>Total</td>
            <td>Status Pembayaran</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item._id} className="hover">
              <th>{index + 1}</th>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                <ul className="list-disc">
                  {item.itemsDetail.map((itemProduct) => (
                    <li key={itemProduct.product}>
                      {itemProduct.name} <br />
                      <span className="font-bold">
                        Jumlah {itemProduct.quantity} Produk
                      </span>{" "}
                      <br />
                      {priceFormat(itemProduct.price)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{item.address}</td>
              <td>{priceFormat(item.total)}</td>
              <td>
                {item.status === "pending" ? (
                  <span className="btn btn-accent">Pending</span>
                ) : item.status === "success" ? (
                  <span className="btn btn-secondary">Success</span>
                ) : (
                  <span className="btn btn-error">Failed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;
