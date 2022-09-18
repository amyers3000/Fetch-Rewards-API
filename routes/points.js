const router = require('express').Router()
const PointController = require('../controllers/points')

// Route to get points
router.get('/', PointController.getPoints)
// Route to add Transactions
router.post('/', PointController.addTransaciton)
// Route to spend points
router.post('/spend', PointController.spendPoints)

module.exports = router