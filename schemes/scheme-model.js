const knex = require("knex");
const knexfile = require("../knexfile.js");

const database = knex(knexfile.development);

function find() {
  return database("schemes").select();
}

function findById(scheme_id) {
  return database("schemes").select().where({ id: scheme_id }).first();
}

module.exports = {
  find,
  findById,
};
