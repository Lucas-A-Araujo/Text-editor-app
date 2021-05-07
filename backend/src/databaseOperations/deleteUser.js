import db from './connecting.js'

async function deleteUser(user){
    try{
        await db.connect()

    }
    catch(err){

    }
    finally{
        const queryDeleteUser = "DELETE FROM users WHERE (name=($1) OR email= ($2)) AND password=($3)"
      
        await db.query(queryDeleteUser, [user.name, user.email, user.password])
        
    }
}

export default deleteUser