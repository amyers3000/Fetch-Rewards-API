# Fetch Rewards API
This is a simple API to satisfy the Backend-Apprenticship coding challenge. The challenge had three requirments: 

1. Add transactions for a specific payer and date
2. Spend points using the rules outlined in the assignment ( a payer's balance can not go negative and the points with the oldest timestamp should be spent first )
3. Return all payer point balances

| Type | Route | Description |
|------ | ------ | ------------ |
| GET | /points | Fetches all payers with their respective point balances |
| POST | /points | Creates a new transaction to appencd to the list. All transactions require a 'payer', 'points' and a 'timestamp' |
| POST | /points/spend | Deducts points starting at the transaction with the oldest timestamp |