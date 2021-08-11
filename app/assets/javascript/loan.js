class Loan {
    constructor(email, loanAmount) {
        this.email = email;
        this.loanAmount = loanAmount;
    }

    saveLoanData() {
        let loanDataArray = localStorage.getItem('dbLoan') ?
            JSON.parse(localStorage.getItem('dbLoan'))
            : [];

        localStorage.setItem("dbLoan", JSON.stringify(loanDataArray));
        loanDataArray.push(this);
        localStorage.setItem("dbLoan", JSON.stringify(loanDataArray));
    }
}