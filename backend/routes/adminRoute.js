import express from 'express'
const router = express.Router()
import { authAdmin,logoutAdmin,getUsers,deleteUser } from '../controller/adminController.js'
import { adminProtect } from '../middleware/adminAuth.js'
router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.delete('/users/delete',adminProtect,deleteUser)
router.get('/users', adminProtect, getUsers);

export default router