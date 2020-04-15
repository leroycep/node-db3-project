const knex = require("knex");
const knexfile = require("../knexfile.js");

const database = knex(knexfile.development);

function find() {
  return database("schemes").select();
}

module.exports = {
  find,
};
