import db from './connecting'

async function deleteUser(user: any): Promise<void>{
    try{
        await db.connect()

    }
    catch(err){

    }
    finally{
        const queryDeleteUser: string = "DELETE FROM users WHERE (name=($1) OR email= ($2)) AND password=($3)"
      
        await db.query(queryDeleteUser, [user.name, user.email, user.password])
        
    }
}

export default deleteUser