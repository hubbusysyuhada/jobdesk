const {User} = require('../models')
const {validatePassword} = require('../helpers/bcrypt')
const {encoding} = require('../helpers/jwt')

class UserController {
    static login (req, res, next) {
        const {Email, Password} = req.body
        User.findOne({where: {Email}})
        .then(data => {
            const check = validatePassword(Password, data.Password)
            if (data && check) {
                const access_token = encoding({id: data.id, Email: data.Email, Username: data.Username})
                res.status(200).json({access_token})
            } else {
                throw err
            }
        })
        .catch(err => {
            next({
                name: 'custom error',
                code: 400,
                message: 'invalid username/password'
            })
        })
    }
    
    static async register (req, res, next) {
        try {
            const {Username, Password, Email} = req.body
            console.log(req.body, '<<< body');
            if (!Username || !Password || !Email) throw ({
                name: 'custom error',
                code: 400,
                message: 'All field are required'
            })
            const response = await User.create({Username, Password, Email})
            if (response) res.status(201).json({
                Username: data.Username,
                Password: data.Password,
                Email: data.Email
            })
            else throw ({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController