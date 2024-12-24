import Identification from '../Entities/Identification.js';
import Observation from '../Entities/Observation.js'
import Taxon from '../Entities/Taxon.js';
import User from '../Entities/User.js'
import { Op } from 'sequelize';

export async function createObservation(user, observation_info) {
    let data = {
        author: user.login,
        date: observation_info.date,
        x: observation_info.x, 
        y: observation_info.y, 
        description: observation_info.description,
        count: observation_info.count
    }
    
    await Observation.create(data);

    return {};
}

export async function getObservation(user, obsId) {
    const obs = await Observation.findOne({where: {id: obsId}})
    if(!obs) return {err: "Наблюдение не найдено",  code: 404}
    return {observation_info: obs, is_owner: obs.author == user}
}

export async function getObservations(filter) {
    let whereConditions = {};

    if (filter.taxon) {
        whereConditions.taxon_id = filter.taxon;
    }

    if (filter.date_start && filter.date_end) {
        whereConditions.date = {
            [Op.between]: [filter.date_start, filter.date_end],
        };
    } else if (filter.date_start) {
        whereConditions.date = {
            [Op.gte]: filter.date_start,
        };
    } else if (filter.date_end) {
        whereConditions.date = {
            [Op.lte]: filter.date_end,
        };
    }


    let obs = await Observation.findAll({
        where: whereConditions,
    });

    let final_obs = [];
    if (filter.point && filter.radius) {
        const [centerX, centerY] = filter.point;
        const radius = filter.radius; 

        obs.forEach((element) => {
            const { geo_x, geo_y } = element;
            const distance = Math.sqrt(Math.pow(geo_x - centerX, 2) + Math.pow(geo_y - centerY, 2));
            if (distance <= radius) {
                final_obs.push(element);
            }
        })
    } else {
        final_obs = obs;
    }
    return final_obs
}

export async function deleteObservation(userId, obsId) {
    const obs = await Observation.findOne({where: {id: obsId}})
    const user = await User.findOne({where: {id: userId}})
    if(userId != obs.author_id && !user.is_admin) {
        return {err: "Это не ваше наблюдение", code: 403}
    }

    Observation.destroy({where: {id: obsId}})

    return {}
}

export async function getIdentifications(obsId) {
    let res = await Identification.findAll({where: {observation_id: obsId}});
    return res
}

export async function createIdentification(user, iden_info) {
    let data = {
        author: user.login,
        observation_id: iden_info.observation_id,
        taxon_id: iden_info.taxon_id
    }

    await Identification.create(data)

    return {}
}


export async function getTaxons() {
    return await Taxon.findAll()
}

export async function getTaxonById(id) {
    return await Taxon.findOne({where: {id: id}})
}