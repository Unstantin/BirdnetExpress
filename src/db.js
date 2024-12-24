import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('birdnet', 'main_user', 'pass', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    port: 5432
  });


export default sequelize