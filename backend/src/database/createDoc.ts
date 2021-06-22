import db from './connecting'
import getsDocs from './getDoc'
import updateDoc from './updateDoc'


async function documentRepeat(docData: any, ownerId: number): Promise<boolean> {
    
  const queryGetDoc: string = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"

  let result: any = await db.query(queryGetDoc, [ownerId, docData.name])

  if(result.rows[0]){
    return true
  }
  else{
    return false
  }
}

async function docAlreadyExists(docId: number): Promise<boolean> {
  const queryGetDoc: string = "SELECT * FROM documents WHERE id=($1)"

  let result: any = await db.query(queryGetDoc, [docId])

  if(result.rows[0]){
    return true
  }
  else{
    return false
  }
}

async function createNewDoc(docData: any, ownerId: number): Promise<any>{

  const queryDoc : string = "INSERT INTO documents (owner_id, name, document) VALUES ($1, $2, $3)"
    await db.query(queryDoc, [ownerId, docData.name, docData.document])
    
    const queryGetDoc: string = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"

    let result: any = await db.query(queryGetDoc, [ownerId, docData.name])
    result = result.rows[0]


    const queryRelationDoc: string = "INSERT INTO user_access_documents (user_id, document_id) VALUES ($1, $2)"
    await db.query(queryRelationDoc, [ ownerId, result.id])


    return result

}

async function updateOldDoc(docData: any, ownerId: number, docId: number): Promise<void>{
  updateDoc(docData, ownerId, docId)
}

async function insertDoc(docData: any, ownerId: number): Promise<any>{
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{

    let docId: number = docData.id.replace(/"/g, "")
    docId = Number(docId)


    const alreadyExists: boolean = await docAlreadyExists(docId)
    const docRepeat: boolean = await documentRepeat(docData, ownerId)

    if(alreadyExists){
      updateOldDoc(docData, ownerId, docId)
      return "Sucesso"
    }
    else if(docRepeat){
      throw 'user already has a document with that name'
    }
    else{
      return createNewDoc(docData, ownerId)
    }

  }
}

export default insertDoc