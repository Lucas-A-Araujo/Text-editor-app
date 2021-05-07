import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import secret from './config/auth.js'
import authMiddleware from './middlewares/auth.js'

import insertData from './databaseOperations/insertTables.js'
import getUser from './databaseOperations/getUser.js'
import deleteUser from './databaseOperations/deleteUser.js'
import deleteDoc from './databaseOperations/deleteDoc.js'
import updateUser from './databaseOperations/updateUser.js'
import updateDoc from './databaseOperations/updateDoc.js'
import insertDoc from './databaseOperations/createDoc.js'
import document from './databaseOperations/getDoc.js'


const app = express()

app.use(express.json())
app.use(cors())
app.use(authMiddleware)

//require('./utils/projectController')(app)

const users = ['Brendon', 'Lara', 'Gregory', 'Hunter'];

function generateToken(params = {}){
    const dayInMilliseconds = 86400

    return jwt.sign(params, secret, { expiresIn: dayInMilliseconds})
}

app.get('/', (req, res)=> {
    res.send({ ok: true , user: req.userId })
})

app.get('/users', (req, res) => {
    return res.json(users)
})

app.post('/users', (req, res) => {
    const user = req.body

    insertData(user)
    return res.json(users)
})

app.post('/create', async (req, res) => {
    try{
        const user = await insertData(req.body)
        res.status(200).send({ user, token: generateToken({ id: user.id }) })
    }
    catch(err){
        console.log(err)
        return res.status(400).send({ message: "create failed" })
    }

})

app.post('/createDocument', async (req, res) => {
    try{
        const doc = await insertDoc(req.body, req.userId)
        res.status(200).send({doc})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({ message: "create document failed" })
    }

})

app.post('/document', async (req, res) => {
    try{
        const doc = await document.getDoc(req.body, req.userId)
        res.status(200).send({doc})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({ message: "Document error" })
    }

})

app.post('/allDocument', async (req, res) => {
    try{
        const allDocs = await document.getAllDocs(req.userId)
        res.status(200).send({allDocs})
    }
    catch(err){
        console.log(err)
        return res.status(400).send({ message: "Documents error" })
    }

})

app.post('/authenticate', async (req, res) => {
    
    const user = req.body

    let userAuthenticate = await getUser(user)
    userAuthenticate = userAuthenticate[0]

    if(!userAuthenticate){
        return res.sendStatus(400)
    }

    res.send({ token: generateToken({ id: userAuthenticate.id }) })
})

app.post('/update', async (req, res) => {
    const user = req.body
    await updateUser(user)

    res.send({ message: "Update successful" })
})

app.post('/updateDoc', async (req, res) => {
    const doc = req.body
    try{
        await updateDoc(doc, req.userId)

        res.send({ message: "Update successful" })
    }
    catch(err){
        res.send({ message: "Update failed" })
    }
})

app.delete('/users', (req, res) => {
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

app.delete('/document', async (req, res) => {
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


app.listen(4000)
