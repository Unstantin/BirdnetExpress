import User from './User.js';
import Observation from './Observation.js';
import Taxon from './Taxon.js';
import {DataTypes} from 'sequelize';
import db from '../db.js';

const Identification = db.define('Identifications', {
  author: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true
  },
  observation_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  taxon_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'identifications',
  timestamps: false
});



export default Identification