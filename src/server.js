import express from 'express'
import * as UserService from "./Services/UserService.js"
import * as ObservationService from "./Services/ObservationService.js"
import authenticateToken from './authenticateToken.js';
import Observation from './Entities/Observation.js';


const app = express()
const PORT = process.env.PORT || 3000
const BASE_URL = '/api/'

async function main() {
    app.use(express.json())

    app.post(BASE_URL + 'reg', async function(req, res) {
        const result = await UserService.registration(req.body.username, req.body.login, req.body.password)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json({mes: "OK"})
        }
    })

    app.post(BASE_URL + 'auth', async function(req, res) {
        const result = await UserService.authentication(req.body.login, req.body.password)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.get(BASE_URL + 'observations', async function(req, res) {
        const result = await ObservationService.getObservations(req.query)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.post(BASE_URL + 'observations', authenticateToken, async function(req, res) {
        if(req.no_token) return res.status(403).json("Нет токена")
        const result = await ObservationService.createObservation(req.user, req.body)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json(result)
        }
    })

    app.get(BASE_URL + 'profile', authenticateToken, async function(req, res) {
        if(req.no_token) return res.status(403).json("Нет токена")
        const result = await UserService.getUserProfile(req.user.login)
        return res.status(200).json(result)    
    })

    app.get(BASE_URL + 'observations/:id', async function(req, res) {
        const result = await ObservationService.getIdentifications(req.params['id'])
        return res.status(200).json(result)   
    })

    app.post(BASE_URL + 'observations/:id', authenticateToken, async function(req, res) {
        const result = await ObservationService.createIdentification(req.user, req.body)
        if(result.err) {
            return res.status(result.code).json(result)
        } else {
            return res.status(200).json("ОК")
        }
    })

    app.get(BASE_URL + 'taxons', async function(req, res) {
        const result = await ObservationService.getTaxons()
        return res.status(200).json(result)
    })

    app.get(BASE_URL + 'taxons/:id', async function(req, res) {
        const result = await ObservationService.getTaxonById(req.params["id"])
        return res.status(200).json(result)
    })

    app.listen(PORT, () => {
        console.log("SERVER START AT 3000")
    })
}

main()