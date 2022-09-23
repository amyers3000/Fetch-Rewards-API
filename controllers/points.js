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
    // Return all payer point balances
    function getAllPoints (req,res){
       try {
        res.json(payers)
       } catch (err) {
        res.status(500).json({message: err})
       }
    }
    // Add transactions for a specific payer and date 
    function addOneTransaciton(req, res){
        try {
            const{ payer, points, timestamp } = req.body
            if( !payer || !points || !timestamp ){
                return res.status(400).json({message : "Points, payer and timestamp information are required"})
            }else if(typeof payer !== "string" ){
                return res.status(400).json({message : 'Payer must be a string'})
            }else if(typeof points !== "number" ){
                return res.status(400).json({message : 'Points must be a number'})
            }else if(typeof timestamp !== 'string' ){
                return res.status(400).json({message : `Timestamp must be a string`})
            }
            // Calculates total balance of payer
            !payers[payer] ? payers[payer] = points : payers[payer] += points
            // Adds transaction to transaction list
            transactions.push({"payer": payer, "points": points, "timestamp": timestamp})
            // calculate balance
            balance += points
            transactions.sort((x, y) => {
                return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
            }).reverse()
            res.json(transactions)
        } catch (err) {
            res.status(500).json({message: err})
        }
        
    }
    // Spend points; start with oldest transaction and make sure no payer has a negative balance
    function spendPoints(req, res){
            console.log(transactions)
            try {
                let { points } = req.body
                // object to keep track of how much is taken from each account
                let spendingPayers = {}
                if(typeof points !== 'number'){
                    return res.status(400).json({message : "Points must be a number"})
                } else if( points < 0){
                    return res.status(400).json({message : "Point value must be above zero"})
                } else if( points > balance){
                    return res.status(400).json({message : "Insuffcient point balance"})
                }
                balance -= points
                console.log(transactions)
                // loop through array updating the spendingPayers object to keep track of how much is taken from each payer
                for( let i = 0 ; i < transactions.length; i++ ){
                     if( transactions[i].points === points ){
                        updatePayerBalances(transactions[i].payer, points, spendingPayers, payers)
                        // both transaction points and points would be used up
                        transactions[i].points = 0
                        points = 0
                        break
                     } else if ( transactions[i].points < points ){
                        updatePayerBalances(transactions[i].payer, transactions[i].points, spendingPayers, payers)
                        // if points are greater, all transaction points will be used and points will be updated to have remainder
                        points -= transactions[i].points
                        transactions[i].points = 0
                     } else if( transactions[i].points > points ) {
                        updatePayerBalances(transactions[i].payer, points, spendingPayers, payers)
                        // if points are less, we will have spent the necessary points and the transaction will be updated
                        transactions[i].points -= points
                        points = 0
                     }
                     
                }
                console.log(transactions)
                res.json(spendingPayers)
            } catch (error) {
                res.status(500).json({message: error})
            }
    }
    // updates the Spending Payers object and Payers object
    function updatePayerBalances(payer, points, spendingPayers){
        !spendingPayers[payer] ? spendingPayers[payer] = points * -1 : spendingPayers[payer] -= points
        payers[payer] -= points
     
    }
module.exports = { addOneTransaciton, getAllPoints, spendPoints}