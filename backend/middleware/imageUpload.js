import express from 'express'
import multer from "multer";
import path from 'path'

const app=express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname
      cb(null, name)
    }
  })
  

export const upload = multer({ storage: storage });