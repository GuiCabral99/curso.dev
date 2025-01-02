import database from "../../../../infra/database.js";

export default async function status(request, response) {
  const timestamp = new Date().toISOString();
  const maxConnections = await database.query("SHOW max_connections;");
  const posgresVersion = await database.query("SHOW server_version;");
  const activityConnections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });
  const responseBody = {
    timestamp,
    postgres_version: posgresVersion.rows[0].server_version,
    max_connections: maxConnections.rows[0].max_connections,
    activity_connections: parseInt(activityConnections.rows[0].count),
  };

  return response
    .status(200)
    .json({ dependencies: { database: responseBody } });
}
