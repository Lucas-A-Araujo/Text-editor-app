import { Router } from 'express'
import { User } from '../app/models'

import jwt from 'jsonwebtoken'

import secret from '../config/auth'

import { InsertUser } from '../database/insertTables'
import getUser from '../database/getUser'
import deleteUser from '../database/deleteUser'
import deleteDoc from '../database/deleteDoc'
import updateUser from '../database/updateUser'
import updateDoc from '../database/updateDoc'
import insertDoc from '../database/createDoc'
import document from '../database/getDoc'

const routes = Router()

function generateToken(params: any = {}): any {
  const dayInMilliseconds = 86400

  return jwt.sign(params, secret, { expiresIn: dayInMilliseconds})
}

routes.get('/', (req: any, res: any): any => {
  res.send({ ok: true , user: req.userId })
})

routes.get('/users', (req: any, res: any): any => {
  return null
})

routes.post('/users', (req: any, res: any): any => {
  const user = req.body
  const insertUser = new InsertUser()

  insertUser.insertData(user)
  return null
})

routes.post('/create', async (req: any, res: any): Promise<any> => {
  try{
      const insertUser = new InsertUser()
      const user: any = await insertUser.insertData(req.body)
      res.status(200).send({ user, token: generateToken({ id: user.id }) })
  }
  catch(err){
      console.log(err)
      return res.status(400).send({ message: "create failed" })
  }

})

routes.post('/createDocument', async (req: any, res: any): Promise<any> => {
  try{
      const doc: any = await insertDoc(req.body, req.userId)
      res.status(200).send({doc})
  }
  catch(err){
      console.log(err)
      return res.status(400).send({ message: "create document failed" })
  }

})

routes.post('/document', async (req: any, res: any): Promise<any> => {
  try{
      const doc: any = await document.getDoc(req.body, req.userId)
      res.status(200).send({doc})
  }
  catch(err){
      console.log(err)
      return res.status(400).send({ message: "Document error" })
  }

})

routes.post('/allDocument', async (req: any, res: any): Promise<any> => {
  try{
      const allDocs = await document.getAllDocs(req.userId)
      res.status(200).send({allDocs})
  }
  catch(err){
      console.log(err)
      return res.status(400).send({ message: "Documents error" })
  }

})

routes.post('/authenticate', async (req: any, res: any): Promise<any> => {
  
  const user = req.body

  let userAuthenticate = await getUser(user)
  userAuthenticate = userAuthenticate[0]

  if(!userAuthenticate){
      return res.sendStatus(400)
  }

  res.send({ token: generateToken({ id: userAuthenticate.id }) })
})

routes.post('/update', async (req: any, res: any): Promise<any> => {
  const user = req.body
  await updateUser(user)

  res.send({ message: "Update successful" })
})

routes.post('/updateDoc', async (req: any, res: any): Promise<any> => {
  const doc = req.body
  try{
      await updateDoc(doc, req.userId, 0)

      res.send({ message: "Update successful" })
  }
  catch(err){
      res.send({ message: "Update failed" })
  }
})

routes.delete('/users', (req: any, res: any): any => {
  const user = req.body
  try{
      deleteUser(user)
  
      return res.status(200).send({ message: "User deleted successful"})
  }
  catch(err){
      console.log(err)

      return res.status(400).send({ message: "Delete failed" })
  }
})

routes.delete('/document', async (req: any, res: any): Promise<any> => {
  const doc = req.body
  try{
      await deleteDoc(doc, req.userId)
  
      return res.status(200).send({ message: "Document deleted successful"})
  }
  catch(err){
      console.log(err)

      return res.status(400).send({ message: "Delete failed" })
  }
})

/* User.Create({
  name: "Diego",
  email: "diego@rocktseat.com.br",
  password: "123456789"
}) */

export default routes