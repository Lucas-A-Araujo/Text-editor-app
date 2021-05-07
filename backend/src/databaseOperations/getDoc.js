import db from './connecting.js'

async function getDoc(docData, ownerId){
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{

    let docId = docData.id.replace(/"/g, "")
    docId = Number(docId)
    
   
    const queryGetDoc = "SELECT * FROM documents WHERE id=($1)"

    let result = await db.query(queryGetDoc, [docId])

    return result.rows[0]
    }
}

async function getAllDocs(ownerId){
    try{
      await db.connect()
    }
    catch(err){
  
    }
    finally{
      
      const queryGetUser = "SELECT * FROM documents WHERE owner_id=($1)"
  
      let result = await db.query(queryGetUser, [ownerId])
    
      return result.rows
      }
  }

export default { getDoc, getAllDocs }