import db from './connecting.js'
import getsDocs from './getDoc.js'

async function documentRepeat(docData, docId, ownerId){
     
   const queryGetDoc = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"
 
   let result = await db.query(queryGetDoc, [ownerId, docData.name])

   const repeat = result.rows[0]? result.rows[0].id : false
 
   if(!repeat){
     return false
   }
   if(repeat != docId){
     return true
   }
   else{
     return false
   }
 }

async function updateDoc(docData, ownerId, docId){
    try{
        await db.connect()
        
    }
    catch(err){
        
    }
    finally{

      const docRepeat = await documentRepeat(docData, docId, ownerId)

      if(docRepeat){
        throw 'user already has a document with that name'
      }
        
      const queryUpdateUser = "UPDATE documents SET name=($1), document=($2) WHERE id=($3)"
            
      await db.query(queryUpdateUser, [docData.name, docData.document, docId])
      
    }
}

export default updateDoc