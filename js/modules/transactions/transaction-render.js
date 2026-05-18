export function renderTransaction(transaction, emptyListContent, transactionsList){
    let signal;
    let icon;

    if(transaction.type === 'expense'){
        signal =  '-';
        icon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-right-icon lucide-arrow-down-right">
            <path d="m7 7 10 10"/><path d="M17 7v10H7"/>
        </svg>`
    }else{
        signal = '+';
        icon = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>`
    }

    const transformedvalue = parseFloat(transaction.value);
    const value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(transformedvalue);

    const newDate = new Date(`${transaction.date}T12:00:00`);
    const formattedDate = newDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        });

    const item = document.createElement('div');
    item.classList.add('transaction-item', transaction.type);
    item.innerHTML = `
        <div class="transaction-details">
            ${icon}
            <div class="info">
                <h3>${transaction.description}</h3>
                <p>${transaction.category}</p>
            </div>
        </div>
        <div class="transaction-data">
            <p class="transaction-amount">${signal}${value}</p>
            <p>${formattedDate}</p>
        </div>`;
    transactionsList.appendChild(item);
}


export function renderEmptyState(transactions, emptyListContent){
    if(transactions === 0){
        emptyListContent.classList.remove('hidden');
    } else {
        emptyListContent.classList.add('hidden');
    }
}