import Identification from './Identification.js';
import {DataTypes} from 'sequelize';
import db from '../db.js';

const User = db.define('User', {
    login: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  }
);

//User.hasMany(Identification, { foreignKey: 'author' });

export default User;