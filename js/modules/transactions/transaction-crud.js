
let transactions = [];

export function createTransaction(newTransaction){
    transactions.push(newTransaction);
    return newTransaction;
}

export function getTransactions(){ 
    return transactions;
}