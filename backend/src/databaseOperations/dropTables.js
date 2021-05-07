import db from './connecting.js'

async function dropTables(){
  await db.connect()
  await db.query(`DROP TABLE evento CASCADE`)
  await db.query(`DROP TABLE participante CASCADE`)
  await db.query(`DROP TABLE evento_participante CASCADE`)      //O 'CASCADE' está sendo usado por causa que a tabela evento_participante tem ids que referenciam as outras duas tabelas  
  await db.end()

  console.log("Tabelas removidas");
}

dropTables()
