import pg from "pg";

async function query(queryObject) {
  const client = new pg.Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
  });
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    return console.error("-- Erro: " + error);
  } finally {
    client.end();
  }
}

export default { query: query };
