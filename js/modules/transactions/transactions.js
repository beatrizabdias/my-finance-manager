import { createTransaction, getTransactions } from './transaction-crud.js';
import { renderEmptyState, renderTransaction } from './transaction-render.js';

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

const confirmButton = document.querySelector('.add');
const cancelButton = document.querySelector('.cancel');


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

    const newTransaction = {
        description: descriptionInput.value,
        category: categoryInput.value,
        value: valueInput.value,
        date: dateInput.value,
        type: expenseButton.classList.contains('active-expense') ? 'expense' : 'income'
    };
    renderTransaction(createTransaction(newTransaction), emptyListContent, transactionsList);
    const transactions = getTransactions();
    renderEmptyState(transactions.length, emptyListContent);
    modalOverlay.classList.add('hidden');
    expenseButton.classList.remove('active-expense');
    incomeButton.classList.remove('active-income');
    confirmButton.classList.remove('ready');    
    modalForm.reset();

})