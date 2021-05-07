import jwt from 'jsonwebtoken'
import secret from '../config/auth.js'
import getUser from '../databaseOperations/getUser.js'

export default (req, res, next) => {
    const token = req.headers['authorization']

     jwt.verify(token, secret, (err, decoded) => {
        
        if (!token || decoded === undefined){
            req.userId = 0
            return next()
        } 
        

        const decode = jwt.verify(token, secret)

        
        req.userId = decoded.id

        return next()
    }) 

}