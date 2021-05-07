import db from './connecting.js'
import getsDocs from './getDoc.js'
import updateDoc from './updateDoc.js'


async function documentRepeat(docData, ownerId){
    
  const queryGetDoc = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"

  let result = await db.query(queryGetDoc, [ownerId, docData.name])

  if(result.rows[0]){
    return true
  }
  else{
    return false
  }
}

async function docAlreadyExists(docId){
  const queryGetDoc = "SELECT * FROM documents WHERE id=($1)"

  let result = await db.query(queryGetDoc, [docId])

  if(result.rows[0]){
    return true
  }
  else{
    return false
  }
}

async function createNewDoc(docData, ownerId){

  const queryDoc = "INSERT INTO documents (owner_id, name, document) VALUES ($1, $2, $3)"
    await db.query(queryDoc, [ownerId, docData.name, docData.document])
    
    const queryGetDoc = "SELECT * FROM documents WHERE owner_id=($1) AND name=($2)"

    let result = await db.query(queryGetDoc, [ownerId, docData.name])
    result = result.rows[0]


    const queryRelationDoc = "INSERT INTO user_access_documents (user_id, document_id) VALUES ($1, $2)"
    await db.query(queryRelationDoc, [ ownerId, result.id])


    return result

}

async function updateOldDoc(docData, ownerId, docId){
  updateDoc(docData, ownerId, docId)
}

async function insertDoc(docData, ownerId){
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{

    let docId = docData.id.replace(/"/g, "")
    docId = Number(docId)


    const alreadyExists = await docAlreadyExists(docId)
    const docRepeat = await documentRepeat(docData, ownerId)

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