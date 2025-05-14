import express from 'express'
import { registerUser, registerOwner, loginUser, getCurrentUser, logoutUser, updateUserProfile } from '../controllers/authController.js'
import { protectedMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js'

const router =  express.Router()

//post /api/v1/auth/register
router.post('/register', registerUser)

//post /api/v1/auth/register-owner
router.post('/register-owner', protectedMiddleware, ownerMiddleware, registerOwner)

//post /api/v1/auth/Login
router.post('/login', loginUser)

//get /api/v1/auth/logout
router.get('/logout', protectedMiddleware, logoutUser)

//get /api/v1/auth/getUser
router.get('/getuser', protectedMiddleware, getCurrentUser)

//put /api/v1/auth/profile
router.put('/profile', protectedMiddleware, updateUserProfile)

export default router