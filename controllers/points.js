
const transactions = [ 
{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
{ "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
]

// Payer and balances
let payers = {
    "DANNON": 1000,
    "UNILEVER" : 0,
    "MILLER COORS": 5300
}


const PointController = {

    // Return all payer point balances
    getPoints : async (req,res) => {
       res.json(payers)
    },
    // Add transactions for a specific payer and date 
    addPoints : async (req, res) => {
        res.send('Add Points')
    },
    // Spend points using rules and return list of {"payer": <string> , "points": <integer}
    // Rules:
    // We want the oldest points to be spent first (oldest based on transaction timestamp, not the order they’re received)
    // We want no payer's points to go negative.
    spendPoints : async (req, res) => {
        res.send('Spend Points')
    }


}


module.exports = PointController