import db from './connecting'
import getsDocs from './getDoc'

async function documentRepeat(docData: any, docId: number, ownerId: number): Promise<boolean>{
     
   const queryGetDoc: string = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"
 
   let result: any = await db.query(queryGetDoc, [ownerId, docData.name])

   const repeat: any = result.rows[0]? result.rows[0].id : false
 
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

async function updateDoc(docData: any, ownerId: number, docId: number): Promise<void>{
    try{
        await db.connect()
        
    }
    catch(err){
        
    }
    finally{

      const docRepeat: boolean = await documentRepeat(docData, docId, ownerId)

      if(docRepeat){
        throw 'user already has a document with that name'
      }
        
      const queryUpdateUser: string = "UPDATE documents SET name=($1), document=($2) WHERE id=($3)"
            
      await db.query(queryUpdateUser, [docData.name, docData.document, docId])
      
    }
}

export default updateDoc