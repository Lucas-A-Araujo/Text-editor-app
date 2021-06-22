import db from './connecting'
import getUser from './getUser'
import { queryOperation } from '../protocols/db'

export class InsertUser implements queryOperation{
  constructor(){}
  async insertData(user: any): Promise<any>{
    try{
      const queryUser: string = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)"
      await db.query(queryUser, [user.name, user.email, user.password])
    
      const result: any = await getUser(user)
    
      return result
    }
    catch(err){
      return 500
    }
    
  }
}
