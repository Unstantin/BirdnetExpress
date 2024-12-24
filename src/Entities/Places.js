import {DataTypes} from 'sequelize';
import db from '../db.js';

const Place = db.define('Places', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    polygon: {
        type: DataTypes.GEOMETRY('POLYGON'),
        allowNull: false
    }
}, {
    tableName: 'places', 
    timestamps: false 
});

export default Place