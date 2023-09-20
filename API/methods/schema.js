const todoItem = {
  type: "object",
  properties: {
    id: { type: "number" },
    todo: { type: "string" },
    userId: { type: "number" },
    completed: { type: "boolean" },
  },
  required: ["id", "todo", "userId", "completed"],
};
const todoSchema = {
  type: "object",
  properties: {
    todos: {
      type: "array",
      items: todoItem,
    },
  },
};
const todoSchemaSingle = {
  type: "object",
  properties: {
    id: { type: "number" },
    todo: { type: "string" },
    userId: { type: "number" },
    completed: { type: "boolean" },
  },
  required: ["id", "todo", "userId", "completed"],
};
const todoSchemaSingleDeleted = {
  type: "object",
  properties: {
    id: { type: "number" },
    todo: { type: "string" },
    completed: { type: "boolean" },
    userId: { type: "number" },
    isDeleted: { type: "boolean" },
  },
  required: ["id", "todo", "userId", "completed", "isDeleted"],
};

module.exports = {
  todoItem,
  todoSchema,
  todoSchemaSingle,
  todoSchemaSingleDeleted,
};
