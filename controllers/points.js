
let balance = 0
let transactions = [ 
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
       try {
        res.json(payers)
       } catch (err) {
        res.status(500).json({message: err})
       }
    },
    // Add transactions for a specific payer and date 
    addTransaciton : async (req, res) => {
        try {
            const{ payer, points, timestamp } = req.body
            if( !payer || !points || !timestamp ){
                return res.status(400).json({message : "Points, payer and timestamp information are required"})
            }else if( payer === undefined || payer === null ){
                return res.status(400).json({message : `Payer is ${payer}`})
            }else if( points === undefined || points === null ){
                return res.status(400).json({message : `Points are ${points}`})
            }else if( timestamp === undefined || timestamp === null ){
                return res.status(400).json({message : `Timestamp is ${timestamp}`})
            }

            !payers[payer] ? payers[payer] = points : payers[payer] += points
            
            transactions.push({"payer": payer, "points": points, "timestamp": timestamp})
            
            res.send("Transaction added succesfully!")
        } catch (err) {
            res.status(500).json({message: err})
        }
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