import db from './connecting.js'
import getsDoc from './getDoc.js'

async function getId(docData, ownerId){
       
     const queryGetDoc = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"
   
     let result = await db.query(queryGetDoc, [ownerId, docData.name])
   
     return result.rows[0].id
}

async function deleteDoc(doc, ownerId){
    try{
        await db.connect()

    }
    catch(err){

    }
    finally{
        const documentId = await getId(doc, ownerId)

        const queryDeleteDoc = "DELETE FROM documents WHERE name=($1) AND owner_id=($2)"
      
        await db.query(queryDeleteDoc, [doc.name, ownerId])

        const queryDeleteRelation = "DELETE FROM user_access_documents WHERE user_id=($1) AND document_id=($2)"
      
        await db.query(queryDeleteRelation, [ownerId, documentId])
        
    }
}

export default deleteDoc