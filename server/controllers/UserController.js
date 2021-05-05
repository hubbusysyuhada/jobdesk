const {User} = require('../models')
const {validatePassword} = require('../helpers/bcrypt')
const {encoding, encodeConfirmationLink, decodeConfirmationLink} = require('../helpers/jwt')
const {sendConfirmationEmail} = require('../helpers/confirmation')

class UserController {
    static login (req, res, next) {
        const {Email, Password} = req.body
        User.findOne({where: {Email}})
        .then(data => {
            const check = validatePassword(Password, data.Password)
            if (data && data.Confirmation === "false") next ({
                name: 'custom error',
                code: 403,
                message: 'please verify your email first'
            })
            else if (data && check) {
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
                message: 'Invalid email/password'
            })
        })
    }
    
    static async register (req, res, next) {
        try {
            const {Username, Password, Email} = req.body
            // console.log(req.body, '<<< body');
            if (!Username || !Password || !Email) throw ({
                name: 'custom error',
                code: 400,
                message: 'All field are required'
            })
            const response = await User.create({Username, Password, Email, Confirmation: 'false'})
            if (response) {
                const token = encodeConfirmationLink({Username, Email})
                sendConfirmationEmail(Email, token)
                res.status(201).json({
                    Username: Username,
                    Email: Email,
                    Message: 'Please check your email for verification'
                })
            }
            else throw ({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        } catch (err) {
            if (err.errors) next({
                name: 'custom error',
                code: 400,
                message: err.errors[0].message
            })
            else next(err)
        }
    }

    static async confirm (req, res, next) {
        try {
            const {token} = req.params
            const account = decodeConfirmationLink(token)
            const response = await User.update({Confirmation: 'true'}, {where: {Email: account.Email}, returning: true})
            res.status(200).json({message: 'Email verified'})
        } catch (error) {
            next({
                name: 'custom error',
                code: 500,
                message: 'Internal server error'
            })
        }
    }
}

module.exports = UserController