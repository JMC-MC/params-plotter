const db = require('../db.js');
const axios = require('axios');
class View {
  static async generateScenario() {
    const scenario_context = 'TSS';
    const scenario_environment = 'day';
    const traffic_level = 1;
    // const id = '2fbf682a-fb45-4c62-ac79-642d38324b11';
    try {
      // Send a GET request to the external API with the query parameters
      const response = await axios.get(
        `http://127.0.0.1:3000?scenario_context=${scenario_context}&scenario_environment=${scenario_environment}&traffic_level=${traffic_level}`
      );
      console.log(response.data.message);
      return response.data.message;
    } catch (err) {
      console.error(err);
      throw new Error('Could not generate scenario');
    }
  }
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
