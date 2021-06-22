import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import secret from '../config/auth'
import getUser from '../database/getUser'

export default (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers['authorization']

     jwt.verify(token, secret, (err: any, decoded: any) => {
        
        if (!token || decoded === undefined){
            req.body.userId = 0
            return next()
        } 

        const decode = jwt.verify(token, secret)

        
        req.body.userId = decoded.id

        return next()
    }) 

}