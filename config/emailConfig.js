import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port:  process.env.EMAIL_PORT,
    ssecure : false,
    auth : {
        user: process.env.EMAIL_USER, // admin gmail id
        pass : process.env.EMAIL_PASS, // admin gmail password
    },
})

export default transporter