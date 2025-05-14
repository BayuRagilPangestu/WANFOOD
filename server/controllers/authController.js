import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import asyncHandler from "../middlewares/asyncHandler.js";

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '6d'
    })
}

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const isDev = process.env.NODE_ENV === 'development' ? false : true

    const cookieOption = {
        expire : new Date(
            Date.now() + 6 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        security: isDev
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        data: user
    })
}

export const registerOwner = asyncHandler(async(req, res) => {
    // Hanya 'owner' lain yang bisa buat akun owner baru
    if (req.user.role !== 'owner') {
        res.status(403)
        throw new Error("Hanya owner yang bisa menambahkan owner baru")
    }

    const newOwner = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "owner"
    })

    createSendResToken(newOwner, 201, res)
})

export const registerUser = asyncHandler(async(req, res) => {
    const isOwner = (await User.countDocuments())=== 0

    const role = isOwner ? 'owner' : "user"

    const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role
    })

    createSendResToken(createUser, 201, res)
})

export const loginUser = asyncHandler(async(req, res) => {
    //Tahap 1 kita buat validasi
    if(!req.body.email || !req.body.password){
        res.status(400)
        throw new Error("Inputan email/password tidak boleh kosong")
    }

    //Tahap 2 cek apakah email yang dimasukan ada di db atau tidak
    const userData = await User.findOne({
        email: req.body.email
    })

    //Tahap 3 cek password

    if(userData && (await userData.comparePassword(req.body.password))){
        createSendResToken(userData, 200, res)
    }else{
        res.status(400)
        throw new Error("Invalid User")
    }
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User .findById(req.user._id).select("-password")

    if (user) {
        return  res.status(200).json({
            user
        })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

export const logoutUser = async(req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(200).json({
        message: "Logout Berhasil"
    })
}

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Ganti password jika disediakan
    if (req.body.oldPassword && req.body.newPassword) {
        const isMatch = await user.comparePassword(req.body.oldPassword);
        if (!isMatch) {
            res.status(400);
            throw new Error("Password lama salah");
        }
        user.password = req.body.newPassword; // akan otomatis di-hash oleh pre save hook
    }

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
    });
});