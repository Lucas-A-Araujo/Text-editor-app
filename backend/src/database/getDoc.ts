import db from './connecting'

async function getDoc(docData: any, ownerId: number): Promise<any> {
  try{
    await db.connect()
  }
  catch(err){

  }
  finally{

    const docId: number = Number(docData.id.replace(/"/g, ""))
    
   
    const queryGetDoc: string = "SELECT * FROM documents WHERE id=($1)"

    let result: any = await db.query(queryGetDoc, [docId])

    return result.rows[0]
    }
}

async function getAllDocs(ownerId: number): Promise<any>{
    try{
      await db.connect()
    }
    catch(err){
  
    }
    finally{
      
      const queryGetUser: string = "SELECT * FROM documents WHERE owner_id=($1)"
  
      let result: any = await db.query(queryGetUser, [ownerId])
    
      return result.rows
      }
  }

export default { getDoc, getAllDocs }