const db = require('../db.js');

class View {
  static async generateScenario() {
    try {
      // Function for genearting scenarios for now it is just returning and object
      let genScenario = {
        genShipsAfloat: [
          {
            position: ['Point', 500, 500],
            vecEnd: ['Point', 502.20054, 499.95429],
            type: 'Own Ship',
            vector: ['Point', -2.20054, 0.04571],
            posSelected: false,
            vecSelected: false,
            course: 6.262416037348703,
            speed: 22.010179396611118,
          },
          {
            position: ['Point', 511.66667, 495.99713],
            vecEnd: ['Point', 511.56726, 495.7051],
            vector: ['Point', 0.09941, 0.29203],
            speed: 3.084850485268065,
            course: 4.3842766658759285,
            type: 'NUC',
            posSelected: false,
            vecSelected: false,
            targetSelected: true,
            editSelected: false,
            vecOwnShip: ['Point', 11.66667, -4.00287],
            OwnShipAngle: -18.937272977075995,
            relposX: 11.66666758096028,
            relposY: -4.0028742571012685,
            range: 12.334266689300732,
            name: '001',
            rules: [],
            bearings: [],
            bearingsTaken: [],
            selectCount: 0,
            toBeReported: false,
            tcpa: 29,
            posAtCPA: ['Point', 511.18643, 494.58641],
            ownPosAtCPA: ['Point', 510.6303, 499.77918],
            vecToCPA: ['Point', -0.55613, 5.19278],
            USNRelAtCPA: 97.30288785807221,
            cpa: 5.2224725909435685,
          },
          {
            position: ['Point', 497.18378, 508.34468],
            vecEnd: ['Point', 497.41772, 508.52847],
            vector: ['Point', -0.23394, -0.18379],
            speed: 2.975033926957108,
            course: 0.6659269116376476,
            type: 'RAM',
            posSelected: false,
            vecSelected: false,
            targetSelected: false,
            editSelected: false,
            vecOwnShip: ['Point', -2.81622, 8.34468],
            OwnShipAngle: 108.64884048350584,
            relposX: -2.816215632695446,
            relposY: 8.344678263162734,
            range: 8.80708384231346,
            name: '002',
            rules: [],
            bearings: [],
            bearingsTaken: [],
            selectCount: 0,
            toBeReported: false,
            tcpa: -11.4,
            posAtCPA: ['Point', 496.73899, 507.99523],
            ownPosAtCPA: ['Point', 495.81608, 500.08691],
            vecToCPA: ['Point', -0.92291, -7.90832],
            USNRelAtCPA: 264.5336312275437,
            cpa: 7.961989142931131,
          },
          {
            position: ['Point', 507.90916, 499.69754],
            vecEnd: ['Point', 507.27624, 499.71069],
            vector: ['Point', 0.63292, -0.01315],
            speed: 6.330586859002527,
            course: 3.1208233837589074,
            type: 'PDV',
            posSelected: false,
            vecSelected: false,
            targetSelected: false,
            editSelected: false,
            vecOwnShip: ['Point', 7.90916, -0.30246],
            OwnShipAngle: -2.189991504878158,
            relposX: 7.909163349628784,
            relposY: -0.30245579599267103,
            range: 7.91494437122844,
            name: '003',
            rules: ['14'],
            bearings: [],
            bearingsTaken: [],
            selectCount: 0,
            toBeReported: true,
            tcpa: 16.8,
            posAtCPA: ['Point', 506.14182, 499.73426],
            ownPosAtCPA: ['Point', 506.14469, 499.87236],
            vecToCPA: ['Point', 0.00287, 0.13811],
            USNRelAtCPA: 90.00000000000767,
            cpa: 0.13813482609517702,
          },
        ],
        elevation: 3,
        resVis: false,
        center: ['Point', 500, 500],
      };
      return genScenario;
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
