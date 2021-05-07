import db from './connecting.js'
import getUser from './getUser.js'

async function insertData(user){
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{

    const queryUser = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)"
    await db.query(queryUser, [user.name, user.email, user.password])

    const result = await getUser(user)

    return result
  }
}

export default insertData