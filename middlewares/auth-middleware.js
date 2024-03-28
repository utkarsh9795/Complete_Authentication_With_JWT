import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

var checkUserAuth = async(req,res, next) => {
    let token 
    const { authorization } = req.headers
    if(authorization && authorization.startsWith('Bearer')){
       try {
        // Get token from header
        token = authorization.split(' ')[1]
        // console.log("token", token)
        // console.log("Authorization", authorization)

        // Verify token
        const {userID} =jwt.verify(token, process.env.JWT_SECRET_KEY)

        // get user from token
        req.user = await UserModel.findById(userID).select('-password')
        // console.log(req.user)
       //  console.log(req.user._id)
        next()
       } catch (error) {
        res.status(401).send({"status": "failed", "message": "Unauthorized User"})
       } 
    }
    if(!token){
        res.status(401).send({"status": "failed" , "message": "Unauthorized User, No Token"})
    }
}

export default checkUserAuth