const CompanyController = require('../controllers/CompanyController')
const FavoriteController = require('../controllers/FavoriteController')
const errorHandler = require('../middlewares/errorHandler')
const {authentication, authorization} = require('../middlewares/auth')
const UserController = require('../controllers/UserController')
const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.send('Hello world from router')
})
// user routes
router.post('/login', UserController.login, errorHandler)
router.post('/register', UserController.register, errorHandler)

router.use(authentication)
// company routes
router.get('/company', CompanyController.fetchAll)

// favorite routes
router.use(authorization)
router.get('/favorites', FavoriteController.fetchAll)
router.post('/favorites/:id', FavoriteController.newFavorite)
router.delete('/favorites/:id', FavoriteController.deleteFavorites)


router.use(errorHandler)

module.exports = router