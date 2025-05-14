import express from 'express'
import { protectedMiddleware, ownerMiddleware } from '../middlewares/authMiddleware.js'
import {
    CreateProduct, AllProduct, detailProduct, updateProduct, deleteProduct, 
    Fileupload
} from '../controllers/ProductController.js'
import { upload } from '../utils/uploadFileHandler.js'

const router =  express.Router()

// CRUD Product

// Create Data Product
// Post /api/v1/product
// middleware owner
router.post('/', protectedMiddleware, ownerMiddleware, CreateProduct)

// Read Data Product
// get /api/v1/product
router.get('/', AllProduct)

// Detail Data Product
// get /api/v1/product/:id
router.get('/:id', detailProduct)

// Update Data Product
// put /api/v1/product/:id
router.put('/:id', protectedMiddleware, ownerMiddleware, updateProduct)

// Delete Data Product
// delete /api/v1/product/:id
router.delete('/:id', protectedMiddleware, ownerMiddleware, deleteProduct)

// File Upload Data Product
// post /api/v1/product/file-upload
router.post('/file-upload', protectedMiddleware, ownerMiddleware, upload.single('image'), Fileupload)

export default router