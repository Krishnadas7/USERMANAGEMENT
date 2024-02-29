import express from 'express'
const router = express.Router()
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import { upload } from '../middleware/imageUpload.js'
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    setUserProfile
 } from '../controller/userController.js'
import {protect} from '../middleware/authMiddleware.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname
      cb(null, name)
    }
  })
  

 const upload = multer({ storage: storage });

router.post('/',registerUser)   
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
// router.post('/add-profile',upload.single('image'),setUserProfile)
router.post('/add-profile', upload.single('image'), setUserProfile);

export default router