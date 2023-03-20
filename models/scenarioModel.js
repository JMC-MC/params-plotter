const db = require('../db.js');

class Scenario {
  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM scenarios WHERE id = $1', [
        id,
      ]);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Could not get scenario');
    }
  }

  static async create(body) {
    try {
      const result = await db.query(
        'INSERT INTO scenarios (scenario_object, staff_answer, tags) VALUES ($1, $2, $3) RETURNING *',
        [body.scenarioObject, body.staffAnswer, body.tags]
      );
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Could not create scenario');
    }
  }

  static async getByIdAndUpdate(id, body) {
    try {
      const setClause = Object.keys(body)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(', ');

      const query = `UPDATE scenarios SET ${setClause} WHERE id = $${
        Object.keys(body).length + 1
      } RETURNING *`;
      const values = [...Object.values(body), id];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Could not update scenario');
    }
  }
}

module.exports = Scenario;
