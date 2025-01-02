test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const dependencies = await responseBody.dependencies.database;

  expect(response.status).toBe(200);
  expect(dependencies.timestamp).toBe(
    new Date(dependencies.timestamp).toISOString()
  );
  expect(dependencies.postgres_version).toBe("17.2");
  expect(dependencies.max_connections).toBe("100");
  expect(dependencies.activity_connections).toEqual(1);
});
