let transactions = [];
let cont = 0;

export function createTransaction(newTransaction){
    newTransaction.id = cont;
    transactions.push(newTransaction);
    cont++; 
    return newTransaction;
}

export function getTransactions(){ 
    return transactions;
}


export function updateTransaction(index, updatedTransaction){
    updatedTransaction.id = transactions[index].id;
    transactions[index] = updatedTransaction;
    return updatedTransaction;
}
