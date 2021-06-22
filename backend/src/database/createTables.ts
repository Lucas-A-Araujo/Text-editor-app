import db from './connecting'

async function createTables(): Promise<void> {

  await db.query(`CREATE TABLE IF NOT EXISTS users(
   id serial PRIMARY KEY,
   name VARCHAR (255) UNIQUE NOT NULL,
   email VARCHAR (255) UNIQUE NOT NULL,
   password VARCHAR (255) UNIQUE NOT NULL
  )`)

  await db.query(`CREATE TABLE IF NOT EXISTS documents(
    id serial PRIMARY KEY,
    owner_id integer NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id),
    name VARCHAR (255) NOT NULL,
    document TEXT
   )`)

   await db.query(`CREATE TABLE IF NOT EXISTS user_access_documents(
    user_id integer NOT NULL,
    document_id integer NOT NULL
   )`)

  await db.end()

  console.log("Tabelas Criadas");
}

createTables()