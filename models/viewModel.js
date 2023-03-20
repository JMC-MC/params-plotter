const db = require('../db.js');

class View {
  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM scenarios WHERE id = $1', [
        id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error('Could not get scenario');
    }
  }
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT id, staff_answer, tags, to_char(created_at, 'YYYY-MM-DD HH24:MI:SS') AS created_at,  to_char(last_update, 'YYYY-MM-DD HH24:MI:SS') AS last_update FROM scenarios"
      );
      return result.rows;
    } catch (err) {
      console.log(err);
      throw new Error('Could not get scenarios');
    }
  }
}

module.exports = View;
