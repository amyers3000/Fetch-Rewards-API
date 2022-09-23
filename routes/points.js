const router = require('express').Router()
const { getAllBalances, addOneTransaciton, spendPoints} = require('../controllers/points')

// Route to get points
router.get('/', getAllBalances)
// Route to add Transactions
router.post('/', addOneTransaciton)
// Route to spend points
router.post('/spend', spendPoints)

module.exports = router