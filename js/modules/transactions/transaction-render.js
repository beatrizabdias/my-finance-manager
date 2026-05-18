export function renderTransaction(transaction, emptyListContent, transactionsList){
    let signal;
    let icon;

    if(transaction.type === 'expense'){
        signal =  '-';
        icon = `
        <svg  class="transaction-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-right-icon lucide-arrow-down-right">
            <path d="m7 7 10 10"/><path d="M17 7v10H7"/>
        </svg>`
    }else{
        signal = '+';
        icon = `
            <svg  class="transaction-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
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
    item.dataset.id = transaction.id;
    item.innerHTML = `
        <div class="transaction-details">
            ${icon}
            <div class="info">
                <h3>${transaction.description}</h3>
                <p>${transaction.category}</p>
            </div>
        </div>
        <div class="transaction-end-group">
            <div class="transaction-data">
                <p class="transaction-amount">${signal}${value}</p>
                <p class="transaction-date">${formattedDate}</p>
            </div>
            <div class="transaction-actions">
                <button type="button" class="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                    <path d="m15 5 4 4"/>
                </svg>
                </button>
                <button type="button" class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>`;
        
    transactionsList.appendChild(item);
}


export function renderUpdateTransaction(updateTransaction, item){
    let signal;
    let icon;

    if(updateTransaction.type === 'expense'){
        signal =  '-';
        icon = `
        <svg  class="transaction-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-right-icon lucide-arrow-down-right">
            <path d="m7 7 10 10"/><path d="M17 7v10H7"/>
        </svg>`
    }else{
        signal = '+';
        icon = `
            <svg  class="transaction-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
                <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
            </svg>`
    }

    const transformedvalue = parseFloat(updateTransaction.value);
    const value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(transformedvalue);

    const newDate = new Date(`${updateTransaction.date}T12:00:00`);
    const formattedDate = newDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
        });

    item.className = `transaction-item ${updateTransaction.type}`;
    item.dataset.id = updateTransaction.id;
    item.innerHTML = `
        <div class="transaction-details">
            ${icon}
            <div class="info">
                <h3>${updateTransaction.description}</h3>
                <p>${updateTransaction.category}</p>
            </div>
        </div>
        <div class="transaction-end-group">
            <div class="transaction-data">
                <p class="transaction-amount">${signal}${value}</p>
                <p class="transaction-date">${formattedDate}</p>
            </div>
            <div class="transaction-actions">
                <button type="button" class="edit-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                    <path d="m15 5 4 4"/>
                </svg>
                </button>
                <button type="button" class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>`;

}


export function renderEmptyState(transactions, emptyListContent){
    if(transactions === 0){
        emptyListContent.classList.remove('hidden');
    } else {
        emptyListContent.classList.add('hidden');
    }
}