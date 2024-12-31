import database from "../../../../infra/database.js";

export default async function status(request, response) {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result.rows[0]);
  response.status(200).send(result.rows[0]);
}
