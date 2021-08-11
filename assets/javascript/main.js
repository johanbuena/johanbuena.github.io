function signUp() {
    let userArray = userLocalStorage();
    let newFirstName = document.getElementById("createFirstName").value;
    let newLastName = document.getElementById("createLastName").value;
    let newEmail = document.getElementById("createEmail").value;
    let newPassword = document.getElementById("createPassword").value;

    for (let i = 0; i < userArray.length; i++) {
        if (newEmail === userArray[i].email) {
            // alert("Email already exist!");
            const formSignUp = document.getElementById("formSignUp");
            const alertContainer = document.createElement("DIV");
            formSignUp.prepend(alertContainer);
            alertContainer.classList.add("alert", "alert-danger");
            alertContainer.innerHTML = "Email already exist!";
            setTimeout(() => alertContainer.remove(), 3000)
            return;
        }
    }

    let newUser = new User(newFirstName, newLastName, newEmail, 0, newPassword);
    newUser.saveUserData();
    alert("Account successfully created!");
}

function signIn() {
    let userArray = userLocalStorage();
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    for (let i = 0; i < userArray.length; i++) {
        if (userEmail === userArray[i].email &&
            userPassword === userArray[i].password) {
            let newUser = new User(userArray[i].firstName, userArray[i].lastName, userArray[i].email, userArray[i].balance, userArray[i].password);
            newUser.signInData();
            alert("Login successful!");
            window.location.reload();
            return;
        }
    }
    const formSignIn = document.getElementById("formSignIn");
    const alertContainer = document.createElement("DIV");
    formSignIn.prepend(alertContainer);
    alertContainer.classList.add("alert", "alert-danger");
    alertContainer.innerHTML = "Incorrect Email or Password!";
    setTimeout(() => alertContainer.remove(), 3000)
}

function signOut() {
    sessionStorage.clear();
    alert("Logout successful!");
    window.location.reload();
}

function userUpdate() {
    let userArray = userLocalStorage();
    let loggedInUser = userSessionStorage();

    let updatedFirstName = document.getElementById("editFirstName").value
    let updatedLastName = document.getElementById("editLastName").value
    let updatedEmail = document.getElementById("editEmail").value

    for (let i = 0; i < userArray.length; i++) {
        if (loggedInUser.email === userArray[i].email) {

            userArray[i].firstName = updatedFirstName;
            userArray[i].lastName = updatedLastName;
            userArray[i].email = updatedEmail;

            let currentUser = new User(userArray[i].firstName, userArray[i].lastName, userArray[i].email, userArray[i].balance, userArray[i].password);
            currentUser.updateUserData();

            alert("Account Updated");
            window.location.reload();
            return;
        }
    }
}

function addLoan() {
    let loggedInUser = userSessionStorage();
    let loanDataArray = loanLocalStorage();
    let newLoanAmount = document.getElementById("newLoanAmount").value;

    for (let i = 0; i < loanDataArray.length; i++) {
        if (loanDataArray[i].email === loggedInUser.email) {
            const formAddLoan = document.getElementById("formAddLoan");
            const alertContainer = document.createElement("DIV");
            formAddLoan.prepend(alertContainer);
            alertContainer.classList.add("alert", "alert-danger");
            alertContainer.innerHTML = "There is already an existing loan!";
            setTimeout(() => alertContainer.remove(), 3000)
            return;
        }
    }

    let newLoan = new Loan(loggedInUser.email, newLoanAmount);
    newLoan.saveLoanData();
    alert("Loan successfully created!");
    window.location.reload();
}

// function createPaymentMethod() {
//     const loggedInUser = userSessionStorage();
//     const cardName = document.getElementById('cardName').value;
//     const cardNumber = document.getElementById('cardNumber').value;
//     const cvv = document.getElementById('cvv').value;
//     const expMonth = parseInt(document.getElementById('expirationMonth').value);
//     const expYear = parseInt(document.getElementById('expirationYear').value);

//     const url = 'https://api.paymongo.com/v1/payment_methods';
//     const options = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
//         },
//         body: JSON.stringify({
//             data: {
//                 attributes: {
//                     details: { card_number: cardNumber, exp_month: expMonth, exp_year: expYear, cvc: cvv },
//                     billing: { name: cardName, email: loggedInUser.email },
//                     type: 'card'
//                 }
//             }
//         })
//     };

//     fetch(url, options)
//         .then(res => res.json())
//         .then(function (data) {
//             return data;
//         })
//         .catch(err => console.error('error:' + err));
// }

// function createPaymentIntent() {
//     let paymentAmount = parseInt(document.getElementById('paymentAmt').value * 100);

//     const url = 'https://api.paymongo.com/v1/payment_intents';
//     const options = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
//         },
//         body: JSON.stringify({
//             data: {
//                 attributes: {
//                     amount: paymentAmount,
//                     payment_method_allowed: ['card'],
//                     payment_method_options: { card: { request_three_d_secure: 'any' } },
//                     currency: 'PHP'
//                 }
//             }
//         })
//     };

//     fetch(url, options)
//         .then(res => res.json())
//         .then(function (data) {
//             return data;
//         })
//         .catch(err => console.error('error:' + err));
// }

// function attachPaymentIntent() {
//     let paymentMethod = createPaymentMethod();
//     let paymentIntent = createPaymentIntent();
//     console.log(paymentIntent);
//     console.log(paymentMethod);
//     let paymentIntentID = paymentIntent.data.id;
//     const url = `https://api.paymongo.com/v1/payment_intents/${paymentIntentID}/attach`;
//     const options = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
//         },
//         body: JSON.stringify({ data: { attributes: { payment_method: paymentMethod.data.id } } })
//     };

//     fetch(url, options)
//         .then(res => res.json())
//         .then(json => console.log(json))
//         .catch(err => console.error('error:' + err));
// }

function createPayment() {
    let loggedInUser = userSessionStorage();
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cvv = document.getElementById('cvv').value;
    const expMonth = parseInt(document.getElementById('expirationMonth').value);
    const expYear = parseInt(document.getElementById('expirationYear').value);

    const url = 'https://api.paymongo.com/v1/payment_methods';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    details: { card_number: cardNumber, exp_month: expMonth, exp_year: expYear, cvc: cvv },
                    billing: { name: cardName, email: loggedInUser.email },
                    type: 'card'
                }
            }
        })
    };

    fetch(url, options)
        .then(res => res.json())
        .then(paymentMethod => {
            let paymentMethodID = paymentMethod.data.id;
            let paymentAmount = parseInt(document.getElementById('paymentAmt').value * 100);

            const url = 'https://api.paymongo.com/v1/payment_intents';
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
                },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            amount: paymentAmount,
                            payment_method_allowed: ['card'],
                            payment_method_options: { card: { request_three_d_secure: 'any' } },
                            currency: 'PHP'
                        }
                    }
                })
            };

            fetch(url, options)
                .then(res => res.json())
                .then(paymentIntent => {
                    let paymentIntentID = paymentIntent.data.id;
                    const url = `https://api.paymongo.com/v1/payment_intents/${paymentIntentID}/attach`;
                    const options = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
                        },
                        body: JSON.stringify({ data: { attributes: { payment_method: paymentMethodID } } })
                    };

                    fetch(url, options)
                        .then(res => res.json())
                        .then(payment => {
                            let paymentID = payment.data.id;
                            let newPayment = new Payment(loggedInUser.email, paymentID);
                            newPayment.savePaymentData();
                            alert('Payment successfully created!');
                            window.location.reload();
                        })
                        .catch(err => console.error('error:' + err));
                })
                .catch(err => console.error('error:' + err));
        })
        .catch(err => console.error('error:' + err));
}

function listAllPayments() {
    let loggedInUser = userSessionStorage();

    const url = 'https://api.paymongo.com/v1/payments?limit=20';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2tfdGVzdF91S3NzMkRycVJKQzdHdzVLYlk5TlNzZlc6'
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let paymentDataArray = paymentLocalStorage();
            for (let i = 0; i < json.data.length; i++)
                if (json.data[i].attributes.billing.email === loggedInUser.email) {
                    console.log(json.data[i].attributes.billing.email);
                    for (let x = 0; x < paymentDataArray.length; x++) {
                        if (json.data[i].id === paymentDataArray[x].paymentID) {
                            console.log(paymentDataArray[x].paymentID)
                        }
                    }

                }
        })
        .catch(err => console.error('error:' + err));
}