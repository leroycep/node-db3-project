const knex = require("knex");
const knexfile = require("../knexfile.js");

const database = knex(knexfile.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
};

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

function add(scheme) {
  return database("schemes")
    .insert(scheme, "id")
    .then((new_ids) => {
      const id = new_ids[0];
      return database("schemes").select().where({ id }).first();
    });
}

function update(changes, id) {
  return database("schemes")
    .where({ id })
    .update(changes)
    .then((_num_updated) => {
      return database("schemes").select().where({ id }).first();
    });
}

