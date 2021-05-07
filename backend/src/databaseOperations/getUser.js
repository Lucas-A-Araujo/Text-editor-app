import pg from 'pg'
import db from './connecting.js'

async function getUser(user){
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{
    
    const queryGetUser = "SELECT * FROM users WHERE (name=($1) OR email= ($1)) AND password=($2)"

    let result = await db.query(queryGetUser, [user.name, user.password])

    return result.rows
    }

}

export default getUser