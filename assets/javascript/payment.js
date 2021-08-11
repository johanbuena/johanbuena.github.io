class Payment {
    constructor(email, paymentID) {
        this.email = email;
        this.paymentID = paymentID;
    }

    savePaymentData() {
        let paymentDataArray = localStorage.getItem('dbPayment') ?
            JSON.parse(localStorage.getItem('dbPayment'))
            : [];

        localStorage.setItem('dbPayment', JSON.stringify(paymentDataArray));
        paymentDataArray.push(this);
        localStorage.setItem('dbPayment', JSON.stringify(paymentDataArray));
    }
}