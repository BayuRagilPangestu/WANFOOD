import mongoose from 'mongoose';
const { Schema } = mongoose;

const singleProduct = Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }
})

const ordertSchema = new Schema({
    total: {
        type: Number,
        required: [true, "Total harga harus diisi"]
    },
    itemsDetail: [singleProduct],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "success"],
        default: "pending"
    },
    firstName : {
        type: String,
        required: [true, "Nama Depan Harus diisi"]
    },
    lastName: {
        type: String,
        required: [true, "Nama Belakang Harus diisi"]
    },
    phone: {
        type: String,
        required: [true, "Nomor Telepon Harus diisi"]
    },
    email: {
        type: String,
        required: [true, "Email Harus diisi"]
    },
    address: {
        type: String,
        required: [true, "Alamat harus diisi"]
    },
});

const Order = mongoose.model("Order", ordertSchema)

export default Order