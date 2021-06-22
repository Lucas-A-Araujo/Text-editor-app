import pg from 'pg'
import db from './connecting'


async function getUser(user: any): Promise<any>{
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{
    
    const queryGetUser: string = "SELECT * FROM users WHERE (name=($1) OR email= ($1)) AND password=($2)"

    let result: any = await db.query(queryGetUser, [user.name, user.password])

    return result.rows
    }

}

export default getUser