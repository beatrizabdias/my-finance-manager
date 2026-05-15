const menu = document.getElementById('menu');
const sidebar = document.querySelector('.sidebar');
const filtros = document.querySelectorAll('.filters button');
const addTransacao = document.querySelectorAll('.open-modal');
const modal = document.querySelector('.modal-overlay');
const expenseBtn = document.getElementById('expense-btn');
const incomeBtn = document.getElementById('income-btn');
const cancelar = document.querySelector('.cancel');

let menuAberto = false;

menu.addEventListener('click' , () => {
    menuAberto = !menuAberto;
    sidebar.classList.toggle('hidden');

    if(menuAberto === true){
        menu.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/>
        <path d="m6 6 12 12"/>
        </svg> `;

    } else{
        menu.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu">
            <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
        </svg>`;
    }

});

filtros.forEach((button) => {
    button.addEventListener('click', () => {
        filtros.forEach(btn => btn.classList.remove('active-filter'));
        button.classList.add('active-filter');
    });
});

addTransacao.forEach((btn)=>{
    btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    }); 
});


expenseBtn.addEventListener('click', () => {
    incomeBtn.classList.remove('active-income');
    expenseBtn.classList.add('active-expense');
});

incomeBtn.addEventListener('click', () => {
    expenseBtn.classList.remove('active-expense');
    incomeBtn.classList.add('active-income');
});

cancelar.addEventListener('click', () => {
    modal.classList.add('hidden');
})