import db from './connecting.js'
import getUsers from './getUser.js'

async function updateUser(newUser){
    try{
        await db.connect()
        
    }
    catch(err){
        
    }
    finally{
        
        if(getUsers(newUser)){
            const queryUpdateUser = "UPDATE users SET name=($1), email=($2), password=($3) WHERE (name=($4) OR email= ($5)) AND password=($6)"
            
            await db.query(queryUpdateUser, [newUser.newName, newUser.newEmail, newUser.newPassword, newUser.name, newUser.email, newUser.password])
      
        }
        else{
            console.log("Erro")
        }
    }
}

export default updateUser