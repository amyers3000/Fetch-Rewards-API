let balance = 11300

let transactions = [ 
{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
{ "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
]

// Payer and balances
let payers = {
    "DANNON": 1100,
    "UNILEVER" : 200,
    "MILLER COORS": 10000
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
            }else if( payer === undefined || payer === null || typeof payer !== "string" ){
                return res.status(400).json({message : `Payer is ${payer}. If correct value is displayed please verify input type is correct`})
            }else if( points === undefined || points === null || typeof points !== "number" ){
                return res.status(400).json({message : `Points are ${points}. If correct value is displayed please verify input type is correct`})
            }else if( timestamp === undefined || timestamp === null || typeof timestamp !== 'string' ){
                return res.status(400).json({message : `Timestamp is ${timestamp}. If correct value is displayed please verify input type is correct`})
            }
            // Calculates total balance of payer
            !payers[payer] ? payers[payer] = points : payers[payer] += points
            // Adds transaction to transaction list
            transactions.push({"payer": payer, "points": points, "timestamp": timestamp})
            // calculate balance
            balance += points
            
            console.log(balance)
            console.log(transactions)
            console.log(payers)
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
        let { points } = req.body
        let spendingPayers = {}
        if( points === null || points === undefined || typeof points !== 'number'){
            return res.status(400).json({message : `${points} points. If correct value is displayed please verify input type is correct`})
        }
        if( points < 0){
            return res.status(400).json({message : "Point value must be above zero"})
        } else if( points > balance){
            return res.status(400).json({message : "Insuffcient point balance"})
        }
        balance -= points
        // sort array
        transactions.sort((x, y) => {
            return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
        }).reverse()
        console.log(transactions)
        console.log(payers)
        for( let i = 0 ; i < transactions.length; i++ ){
            console.log(points)
             if( transactions[i].points === points ){
                !spendingPayers[transactions[i].payer] ? spendingPayers[transactions[i].payer] = points * -1 : spendingPayers[transactions[i].payer] -= points
                payers[transactions[i].payer] -= points
                transactions[i].points = 0
                points = 0
                break
             } else if ( transactions[i].points < points ){
                !spendingPayers[transactions[i].payer] ? spendingPayers[transactions[i].payer] = transactions[i].points * -1 : spendingPayers[transactions[i].payer] -= transactions[i].points
                payers[transactions[i].payer] -= transactions[i].points
                points -= transactions[i].points
                transactions[i].points = 0
             } else if( transactions[i].points > points ) {
                !spendingPayers[transactions[i].payer] ? spendingPayers[transactions[i].payer] = points * -1 : spendingPayers[transactions[i].payer] -= points
                payers[transactions[i].payer] -= points
                transactions[i].points -= points
                points = 0
                
             }
             
        }

        res.send(spendingPayers)
    }


}


module.exports = PointController