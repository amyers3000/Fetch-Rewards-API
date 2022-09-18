const PointController = {

    // Return all payer point balances
    getPoints : async (req,res) => {
        res.send('Get Points')
    },

    addPoints : async (req, res) => {
        res.send('Add Points')
    },

    spendPoints : async (req, res) => {
        res.send('Spend Points')
    }


}


module.exports = PointController