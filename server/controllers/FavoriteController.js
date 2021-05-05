const {UserFavoriteCompany} = require('../models')

class FavoriteController {
    static async fetchAll (req, res, next) {
        try {
            let data = await UserFavoriteCompany.findAll({
                where: {UserId: req.loggedUser.id},
                include: ['Company'],
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

    static async newFavorite (req, res, next) {
        try {
            const {id} = req.loggedUser
            const CompanyId = req.params.id
            const currentFavorites = await UserFavoriteCompany.findAll({where: {UserId : id}})
            let checker = true
            currentFavorites.forEach(el => {
                if (el.UserId === id && el.CompanyId === +CompanyId) {
                    checker = false
                }
            })
            if (!checker) throw {
                name: 'custom error',
                code: 400,
                message: 'already in favorite'
            }
            else if (!CompanyId) throw {
                name: 'custom error',
                code: 400,
                message: 'Bad Request'
            }
            else {
                console.log('masuk else');
                const response = await UserFavoriteCompany.create({UserId: id, CompanyId})
                res.status(201).json({message : `Company Id ${CompanyId} successfully added to favorite`, response})
            }
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') next({
                name: 'custom error',
                code: 404,
                message: 'Not found'
            })
            error ? next(error) : next({
                name: 'custom error',
                code: 500,
                message: 'Internal server error'
            })
        }

    }

    static async deleteFavorites (req, res, next) {
        try {
            const {id} = req.loggedUser
            const CompanyId = req.params.id
            const response = await UserFavoriteCompany.destroy({where: {UserId: id, CompanyId}, returning: true})
            if (response === 0) throw ({
                name: 'custom error',
                code: 404,
                message: 'Not found'
            })
            else res.status(200).json({message: 'successfully removed from favorites'})
        } catch (error) {
            error ? next(error) : next({
                name: 'custom error',
                code: 500,
                message: 'Internal server error'
            }) 
        }
    }
}

module.exports = FavoriteController