import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name Product harus diisi"],
        unique: [true, "Nama sudah digunakan silahkan buat yang lain"]
    },
    price: {
        type: Number,
        required: [true, "Harga Product harus diisi"],
    },
    description: {
        type: String,
        required: [true, "Deskripsi Product harus diisi"],
    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: String,
        required: [true, "Kategori Product harus diisi"],
        enum: ["kanzler", "champ", "fiesta", "cedea", "so good", "belfoods", "kimbo", "golden farm"]
    },
    stock: {
        type: Number,
        default: 0
    }
});

const Product = mongoose.model("Product", productSchema)

export default Product