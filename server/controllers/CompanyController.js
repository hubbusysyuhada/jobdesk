const {Company} = require('../models')

class CompanyController {
    static async fetchAll (req, res, next) {
        const data = await Company.findAll()
        res.status(200).json(data)
    }
}

module.exports = CompanyController