import makersDAO from "../dao/makersDAO.js"

export default class MakersController {
    static async apiGetMakers(req, res, next) {
        const makersPerPage = req.query.makersPerPage ? parseInt(req.query.makersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.clothesItem) {
            filters.clothesItem = req.query.clothesItem
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        } 

        const { makersList, totalNumMakers } = await makersDAO.getMakers({
            filters,
            page,
            makersPerPage,
        })
        let response = {
            makers: makersList,
            page: page,
            filters: filters,
            entries_per_page: makersPerPage,
            total_results: totalNumMakers,
        }
        res.json(response)
    }
    static async apiGetMakersById(req, res, next) {
        try {
            let id = req.params.id || {}
            let maker = await makersDAO.getMakerById(id)
            if (!maker) {
                res.status(404).json({ error: " not found" })
                return
            }
            res.json(maker)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetMakersClothes(req, res, next) {
        try {
            let clothes = await makersDAO.getClothes()
            res.json(clothes)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}