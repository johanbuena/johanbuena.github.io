class User {
    constructor(firstName, lastName, email, balance, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.balance = 0;
        this.password = password;
    }

    saveUserData() {
        let userArray = localStorage.getItem('dbUser') ?
            JSON.parse(localStorage.getItem('dbUser'))
            : [];

        localStorage.setItem("dbUser", JSON.stringify(userArray));
        userArray.push(this);
        localStorage.setItem("dbUser", JSON.stringify(userArray));
    }

    signInData() {
        let userArray = localStorage.getItem('dbUser') ?
            JSON.parse(localStorage.getItem('dbUser'))
            : [];
        let userIndex = userArray.indexOf(userArray.find(({ email }) => email === this.email));

        sessionStorage.setItem("loggedInUser", JSON.stringify(userIndex));
    }

    updateUserData() {
        let userArray = localStorage.getItem('dbUser') ?
            JSON.parse(localStorage.getItem('dbUser'))
            : [];
        let userIndex = userArray.indexOf(userArray.find(({ email }) => email === this.email));

        userArray.splice(userIndex, 1, this);
        localStorage.setItem("dbUser", JSON.stringify(userArray));
    }
}