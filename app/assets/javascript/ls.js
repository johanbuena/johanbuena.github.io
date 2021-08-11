(function () {
    let i = sessionStorage.getItem('loggedInUser') ?
        JSON.parse(sessionStorage.getItem('loggedInUser'))
        : {};

    sessionStorage.setItem('loggedInUser', JSON.stringify(i));

    let userArray = localStorage.getItem('dbUser') ?
        JSON.parse(localStorage.getItem('dbUser'))
        : [];

    let loanDataArray = localStorage.getItem('dbLoan') ?
        JSON.parse(localStorage.getItem('dbLoan'))
        : [];

    if (sessionStorage.getItem('loggedInUser') === "{}") {
        document.getElementById("navNoUser").classList.remove("d-none");
        document.getElementById("showcase").classList.remove("d-none");
        document.getElementById("eligibleToApply").classList.remove("d-none");
        document.getElementById("howToApplyALoan").classList.remove("d-none");
        document.getElementById("faqs").classList.remove("d-none");
        document.getElementById("contacts").classList.remove("d-none");
    } else {
        document.getElementById("navWithUser").classList.remove("d-none");
        document.getElementById("dashboard").classList.remove("d-none");
        document.getElementById("editFirstName").value = userArray[i].firstName
        document.getElementById("editLastName").value = userArray[i].lastName
        document.getElementById("editEmail").value = userArray[i].email
        for (let x = 0; x < loanDataArray.length; x++) {
            if (loanDataArray[x].email === userArray[i].email) {
                document.getElementById("loanAmount").innerHTML = loanDataArray[x].loanAmount;
            }
        }

    }
})();

function userSessionStorage() {
    let i = sessionStorage.getItem('loggedInUser') ?
        JSON.parse(sessionStorage.getItem('loggedInUser'))
        : {};

    let userArray = localStorage.getItem('dbUser') ?
        JSON.parse(localStorage.getItem('dbUser'))
        : [];

    sessionStorage.setItem('loggedInUser', JSON.stringify(i));

    return userArray[i];
}

function userLocalStorage() {
    let userArray = localStorage.getItem('dbUser') ?
        JSON.parse(localStorage.getItem('dbUser'))
        : [];

    localStorage.setItem('dbUser', JSON.stringify(userArray));

    return userArray;
}

function loanLocalStorage() {
    let loanDataArray = localStorage.getItem('dbLoan') ?
        JSON.parse(localStorage.getItem('dbLoan'))
        : [];

    localStorage.setItem("dbLoan", JSON.stringify(loanDataArray));

    return loanDataArray;
}

function paymentLocalStorage() {
    let paymentDataArray = localStorage.getItem('dbPayment') ?
        JSON.parse(localStorage.getItem('dbPayment'))
        : [];

    localStorage.setItem('dbPayment', JSON.stringify(paymentDataArray));

    return paymentDataArray;
}

