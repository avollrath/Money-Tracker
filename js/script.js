const descInput = document.querySelector('.description-input');
const amountInput = document.querySelector('.amount-input');
const addBtn = document.querySelector('button');
const clearBtn = document.querySelector('.clear-button');
let accBalance = 0;
let transactions = [['Sold House', 210099, '22/05/1988'],['Sold Car', 7360, '28/11/1985'], ['Taxes', -4821, '31/12/1999'], ['Bought Yacht', -19000, '01/06/2000']];


function arrayToStorage(arr) {
    let arrJSON = JSON.stringify(arr, undefined, 2);
    localStorage.setItem('transactions', arrJSON);
}

function getFromStorage() {
 
    if (localStorage.getItem('transactions') === null) transactions = [['Sold House', 210099, '22/05/1988'],['Sold Car', 7360, '28/11/1985'], ['Taxes', -4821, '31/12/1999'], ['Bought Yacht', -19000, '01/06/2000']];
    else transactions = JSON.parse(localStorage.getItem('transactions'))
    
}

function createTransaction() {
    if (descInput.value != '' && amountInput.value != 0) {
    let checkbox = document.querySelector('.onoffswitch-checkbox');
    let transaction;
    if (!checkbox.checked)  {
        transaction = [descInput.value, Number(amountInput.value) * -1, currentDate()];
    } else {
        transaction = [descInput.value, Number(amountInput.value), currentDate()];
    };  
    transactions.push(transaction);
    arrayToStorage(transactions);
    }
    else alert('Please enter a description and a amount!');
}

getFromStorage();
renderTransactions(transactions);

function renderTransactions(transactions) {

    document.querySelector('.balance-container').innerHTML = ''; 
    let balanceInfo = document.createElement('div');
    balanceInfo.className = 'balance';
    balanceInfo.innerHTML = 'Account Balance: <span>' + (calcBalance()).toLocaleString() + '<span> €';
    document.querySelector('.balance-container').appendChild(balanceInfo);
    transactions.forEach(function(transaction) {
        let transactionBox = document.createElement('div');
        transactionBox.className = 'transaction';
        if (transaction[1] > 0) {
            transactionBox.innerHTML = `
            <div class="trans-description">${transaction[0]}</div>
            <div class="trans-date">${transaction[2]}</div>
            <div class="trans-amount positive">${transaction[1].toLocaleString()} €</div>`;

        }
        else {
        transactionBox.innerHTML = `
                                    <div class="trans-description">${transaction[0]}</div>
                                    <div class="trans-date">${transaction[2]}</div>
                                    <div class="trans-amount negative">${transaction[1].toLocaleString()} €</div>`};
        document.querySelector('.balance-container').appendChild(transactionBox);

    })
}

function currentDate() {
    var currentDate = new Date();
    day = "00" + currentDate.getDate();
    day = day.substr(-2);
    month = "00" + (currentDate.getMonth() + 1);
    month = month.substr(-2);
    year = "0000" + currentDate.getFullYear();
    year = year.substr(-4);
    return `${day}/${month}/${year}`
}

function calcBalance() {
    let balanceSum = 0;
    transactions.forEach(function(transaction) {
        balanceSum += transaction[1];
    })
    return balanceSum;
}

addBtn.addEventListener('click', e => {
    createTransaction();
    renderTransactions(transactions);
})

function clearStorage() {
    localStorage.clear();
    getFromStorage();
    renderTransactions(transactions);
}

clearBtn.addEventListener('click', e => {
    clearStorage();
})
