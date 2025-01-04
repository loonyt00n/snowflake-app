// backend/controllers/roleController.js
const snowflake = require('snowflake-sdk');
const config = require('../config/snowflakeConfig');

const connectToSnowflake = () => {
  return new Promise((resolve, reject) => {
    const connection = snowflake.createConnection(config);
    connection.connect((err, conn) => {
      if (err) {
        reject('Unable to connect: ' + err.message);
      } else {
        resolve(conn);
      }
    });
  });
};

const getRoleHierarchy = async (req, res) => {
  try {
    const connection = await connectToSnowflake();
    connection.execute({
      sqlText: 'SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES;', // Adjust this query to your needs
      complete: (err, stmt, rows) => {
        if (err) {
          console.error('Error executing query: ' + err.message);
          res.status(500).send('Error');
        } else {
          res.json(rows);
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to Snowflake');
  }
};

module.exports = { getRoleHierarchy };
