import { createTransaction, getTransactions, updateTransaction } from './transaction-crud.js';
import { renderEmptyState, renderTransaction, renderUpdateTransaction} from './transaction-render.js';

const menuButton = document.getElementById('menu');
const sidebarElement = document.querySelector('.sidebar');
const filterButtons= document.querySelectorAll('.filters button');
const openModalButtons = document.querySelectorAll('.open-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const expenseButton = document.getElementById('expense-btn');
const incomeButton = document.getElementById('income-btn');
const modalForm = document.querySelector('.modal-content');

const emptyListContent = document.querySelector('.empty-list-content');
const transactionsList = document.querySelector('.transactions-list');

const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const valueInput = document.getElementById('value');
const dateInput= document.getElementById('date');

const confirmButton = document.querySelector('.add-or-update');
const cancelButton = document.querySelector('.cancel');

const editButton = document.querySelector('.edit-button');
const deleteButton = document.querySelector('.delete-button');

let itemEdited = null;


function validateForm(){
    const descriptionValue = descriptionInput.value;
    const categoryValue = categoryInput.value;
    const valueValue = valueInput.value;
    const dateValue = dateInput.value;

    const transactionType = 
        expenseButton.classList.contains('active-expense') ||
        incomeButton.classList.contains('active-income')
    

    if(descriptionValue && categoryValue && valueValue && dateValue && transactionType){
        confirmButton.classList.add('ready');        
    }else{
        confirmButton.classList.remove('ready');
    }

}

let isMenuOpen = false;

menuButton.addEventListener('click' , () => {
    isMenuOpen = !isMenuOpen;
    sidebarElement.classList.toggle('hidden');

    if(isMenuOpen === true){
        menuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg> `;

    } else{
        menuButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu">
            <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
        </svg>`;
    }

});

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active-filter'));
        button.classList.add('active-filter');
    });
});


openModalButtons.forEach((btn)=>{
    btn.addEventListener('click', () => {
        modalOverlay.classList.remove('hidden');
    }); 
});


expenseButton.addEventListener('click', () => {
    incomeButton.classList.remove('active-income');
    expenseButton.classList.add('active-expense');
    validateForm();
});

incomeButton.addEventListener('click', () => {
    expenseButton.classList.remove('active-expense');
    incomeButton.classList.add('active-income');
    validateForm();
});

[descriptionInput, categoryInput, valueInput, dateInput].forEach(input => {
    input.addEventListener('input', validateForm); 
});

cancelButton.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
    expenseButton.classList.remove('active-expense');
    incomeButton.classList.remove('active-income');

})

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const transactions = getTransactions();


    const newTransaction = {
        description: descriptionInput.value,
        category: categoryInput.value,
        value: valueInput.value,
        date: dateInput.value,
        type: expenseButton.classList.contains('active-expense') ? 'expense' : 'income'
    };

    if(itemEdited){
        for(let i = 0; i < transactions.length; i++){
            if(transactions[i].id === Number(itemEdited.dataset.id)){
                updateTransaction(i, newTransaction);
                renderUpdateTransaction(transactions[i], itemEdited);
                itemEdited = null; 
                break;
            }
        }
        confirmButton.textContent = '+ Adicionar'


    }else{
        renderTransaction(createTransaction(newTransaction), emptyListContent, transactionsList);
    }
    renderEmptyState(transactions.length, emptyListContent);
    modalOverlay.classList.add('hidden');
    expenseButton.classList.remove('active-expense');
    incomeButton.classList.remove('active-income');
    confirmButton.classList.remove('ready');    
    modalForm.reset();

})

transactionsList.addEventListener('click', (e) => {
    const editButton = e.target.closest('.edit-button');
    const deleteButton = e.target.closest('.delete-button');


    if (editButton) {
        modalOverlay.classList.remove('hidden');
        confirmButton.textContent = 'Atualizar';
        const transactionItem = editButton.closest('.transaction-item');
        const transactionType = editButton.closest('.transaction-item').classList.contains('expense') ? 'expense' : 'income';
        if(transactionType === 'expense'){
            expenseButton.classList.add('active-expense');

        }else{
            incomeButton.classList.add('active-income');
        }                                           
        const id = transactionItem.dataset.id;                              
        const description = transactionItem.querySelector('.info h3').textContent;
        const category = transactionItem.querySelector('.info p').textContent;
        const date = transactionItem.querySelector('.transaction-date').textContent;
        const value = transactionItem.querySelector('.transaction-amount').textContent;
        const formattedValue = value.replace('-', '').replace('R$', ''). replace('+', '')
                                .replaceAll(' ', ''). replaceAll('.', ''). replace(',', '.');
        descriptionInput.value = description;
        categoryInput.value = category;
        valueInput.value = formattedValue;
        const [day, month, year] = date.split('/');
        dateInput.value = `${year}-${month}-${day}`;

        itemEdited = transactionItem;
        validateForm();
    }

    if (deleteButton) {
        console.log('Deletar Transação');
    }
});