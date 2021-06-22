import db from './connecting'
import getsDoc from './getDoc'

async function getId(docData: any, ownerId: number): Promise<any>{
       
     const queryGetDoc: string = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"
   
     let result: any = await db.query(queryGetDoc, [ownerId, docData.name])
   
     return result.rows[0].id
}

async function deleteDoc(doc, ownerId): Promise<void>{
    try{
        await db.connect()

    }
    catch(err){

    }
    finally{
        const documentId: any = await getId(doc, ownerId)

        const queryDeleteDoc: string = "DELETE FROM documents WHERE name=($1) AND owner_id=($2)"
      
        await db.query(queryDeleteDoc, [doc.name, ownerId])

        const queryDeleteRelation: string = "DELETE FROM user_access_documents WHERE user_id=($1) AND document_id=($2)"
      
        await db.query(queryDeleteRelation, [ownerId, documentId])
        
    }
}

export default deleteDoc