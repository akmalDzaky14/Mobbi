const request = require("supertest")("https://dummyjson.com");

async function apiFetch(destination, method = "GET", data = null) {
  if (method === "GET") {
    return await request.get(destination);
  }
  if (method === "POST") {
    return await request
      .post(destination)
      .send(data)
      .set("Accept", "application/json");
  }
  if (method === "PUT") {
    return await request
      .put(destination)
      .send(data)
      .set("Accept", "application/json");
  }
  if (method === "PATCH") {
    return await request
      .patch(destination)
      .send(data)
      .set("Accept", "application/json");
  }
  if (method === "DELETE") {
    return await request.delete(destination);
  }
}

module.exports = apiFetch;
