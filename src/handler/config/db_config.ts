import mysql, { PoolOptions } from 'mysql2';

const access: PoolOptions = {
  user: 'root',
  database: 'traveler_hub',
};

const connection = mysql.createPool(access);
export default connection;
