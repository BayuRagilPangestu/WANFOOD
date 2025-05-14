import express from 'express'
import { protectedMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js'
import { CreateOrder, AllOrder, DetailOrder, CurrentUserOrder, callbackPayment } from '../controllers/OrderController.js'

const router =  express.Router()

// post /api/v1/order
// cuman diakses user auth
router.post('/', protectedMiddleware, CreateOrder)

// get /api/v1/order
// cuman diakses oleh user role owner
router.get('/', protectedMiddleware, ownerMiddleware, AllOrder)

// get /api/v1/order/:id
// cuman bisa diakses oleh user role owner
router.get('/:id', protectedMiddleware, ownerMiddleware, DetailOrder)

// get /api/v1/order/current/user
// cuman bisa diakses oleh user yang auth
router.get('/current/user', protectedMiddleware, CurrentUserOrder)

// post /api/v1/order/callback/midtrans
router.post('/callback/midtrans', callbackPayment)

export default router