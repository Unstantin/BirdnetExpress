import {DataTypes} from 'sequelize';
import db from '../db.js';


const Observation = db.define('Observations', {
  id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
  },
  author: {
      type: DataTypes.STRING(10),
      allowNull: false
  },
  date: {
      type: DataTypes.DATE,
      allowNull: true
  },
  x: {
      type: DataTypes.DECIMAL,
      allowNull: true
  },
  y: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: true
  },
  count: {
      type: DataTypes.INTEGER,
      allowNull: true
  }
}, {
  tableName: 'observations',
  timestamps: false
});




export default Observation