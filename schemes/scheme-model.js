const knex = require("knex");
const knexfile = require("../knexfile.js");

const database = knex(knexfile.development);

function find() {
  return database("schemes").select();
}

function findById(scheme_id) {
  return database("schemes").select().where({ id: scheme_id }).first();
}

function findSteps(scheme_id) {
  return database("steps")
    .select("steps.id as id", "scheme_name", "step_number", "instructions")
    .where({ scheme_id })
    .join("schemes", { "steps.scheme_id": "schemes.id" });
}

module.exports = {
  find,
  findById,
  findSteps,
};
