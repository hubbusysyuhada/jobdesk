const {Company} = require('../models')

class CompanyController {
    static async fetchAll (req, res, next) {
        try {
            const data = await Company.findAll({
                attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                })
            res.status(200).json(data)
        } catch (error) {
            next({
                name: 'custom error',
                code: 500,
                message: 'Internal server error'
            })
        }
    }
}

module.exports = CompanyController