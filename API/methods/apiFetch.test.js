const apiFetch = require("./apiFetch");
const {
  todoSchema,
  todoSchemaSingle,
  todoSchemaSingleDeleted,
} = require("./schema");
const chai = require("chai");
chai.use(require("chai-json-schema-ajv"));
const { expect } = require("chai");

describe("API Test", () => {
  describe("Get all todo", () => {
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
      expect(res.body).have.jsonSchema(todoSchema);
    });
    it("Todos length is 30", async () => {
      const res = await apiFetch("/todos");
      expect(res.body.todos.length).is.equal(30);
    });
  });

  describe("Get a single todo", () => {
    const id = 5;
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos/" + id);
      expect(res.body).have.jsonSchema(todoSchemaSingle);
    });
    it("Todos id is " + id, async () => {
      const res = await apiFetch("/todos/" + id);
      expect(res.body.id).is.equal(id);
    });
  });

  describe("Get a random todo", () => {
    const param = "random";
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos/" + param);
      expect(res.body).have.jsonSchema(todoSchemaSingle);
    });
  });

  describe("Limit and skip todos", () => {
    const limit = 4;
    const skip = 6;
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos?limit=" + limit + "&skip=" + skip);
      expect(res.body).have.jsonSchema(todoSchema);
    });
    it("Todos length is " + limit, async () => {
      const res = await apiFetch("/todos?limit=" + limit + "&skip=" + skip);
      expect(res.body.todos.length).is.equal(limit);
    });
    it("Todos begin from id " + (skip + 1), async () => {
      const res = await apiFetch("/todos?limit=" + limit + "&skip=" + skip);
      expect(res.body.todos[0].id).is.equal(skip + 1);
    });
    it("Todos end with id " + (skip + limit), async () => {
      const res = await apiFetch("/todos?limit=" + limit + "&skip=" + skip);
      expect(res.body.todos[limit - 1].id).is.equal(skip + limit);
    });
  });

  describe("Get all todos by user id", () => {
    const userId = 1;
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos/user/" + userId);
      expect(res.body).have.jsonSchema(todoSchema);
    });
    it("Todos user ID is " + userId, async () => {
      const res = await apiFetch("/todos/user/" + userId);
      // akan mempengaruhi performance jika ada banyak object member
      for (x in res.todos) {
        expect(res.body.todos[x].userId).is.equal(userId);
      }
    });
  });

  describe("Add a new todo", () => {
    const newItem = {
      id: 151,
      todo: "Add new Todo",
      userId: 14,
      completed: true,
    };
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos/add", "POST", newItem);
      expect(res.body).have.jsonSchema(todoSchemaSingle);
    });
    it("Data sent is correct", async () => {
      const res = await apiFetch("/todos/add", "POST", newItem);
      // akan mempengaruhi performance jika ada banyak object member
      for (x in res.body) {
        expect(res.body[x]).is.equal(newItem[x]);
      }
    });
  });

  describe("Update a todo", () => {
    const id = 10;
    const updateItem = {
      todo: "Change Todo",
      completed: false,
    };
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Schema is valid with PUT", async () => {
      const res = await apiFetch("/todos/" + id, "PUT", updateItem);
      expect(res.body).have.jsonSchema(todoSchemaSingle);
    });
    it("Schema is valid with PATCH", async () => {
      const res = await apiFetch("/todos/" + id, "PATCH", updateItem);
      expect(res.body).have.jsonSchema(todoSchemaSingle);
    });
    it("Data is updated", async () => {
      const res = await apiFetch("/todos/" + id, "PUT", updateItem);
      expect(res.body.todo).is.equal(updateItem.todo);
      expect(res.body.completed).is.equal(updateItem.completed);
    });
  });

  describe("Delete a todo", () => {
    const id = 10;
    let originalData = { isDeleted: true };
    it("Status is 200", async () => {
      const res = await apiFetch("/todos");
      expect(res.status).is.equal(200);
    });
    it("Get original data for comparison", async () => {
      const res = await apiFetch("/todos/" + id);
      originalData = { ...res.body, ...originalData };
      expect(res.body.id).is.equal(id);
    });
    it("Schema is valid", async () => {
      const res = await apiFetch("/todos/" + id, "DELETE");
      expect(res.body).have.jsonSchema(todoSchemaSingleDeleted);
    });
    it("Deleted data = Original data", async () => {
      const res = await apiFetch("/todos/" + id, "DELETE");
      expect(res.body.id).is.equal(originalData.id);
      expect(res.body.todo).is.equal(originalData.todo);
      expect(res.body.completed).is.equal(originalData.completed);
      expect(res.body.userId).is.equal(originalData.userId);
      expect(res.body.isDeleted).is.true;
    });
  });
});
