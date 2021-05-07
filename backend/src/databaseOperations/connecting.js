import pg from 'pg'

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'docEditorTests',
  password: '1234',
  port: 5432,
})
 client.connect()

export default client
