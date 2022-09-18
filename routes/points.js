const router = require('express').Router()
const PointController = require('../controllers/points')

router.get('/', PointController.getPoints)
router.post('/add', PointController.addPoints)
router.post('/spend', PointController.spendPoints)

module.exports = router