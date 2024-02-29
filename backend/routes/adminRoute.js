import express from 'express'
const router = express.Router()
import { authAdmin,
    logoutAdmin,
    getUsers,
    deleteUser,
    addUser,
    updateUserProfile,
} from '../controller/adminController.js'
import { adminProtect } from '../middleware/adminAuth.js'
router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.post('/add-user',adminProtect,addUser)
router.delete('/users/delete',adminProtect,deleteUser)
router.get('/users', adminProtect, getUsers);
router.put('/users/update-user', updateUserProfile);
// router.get('users/get-edit-user',getUserEditData)
export default router