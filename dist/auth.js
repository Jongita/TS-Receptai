import { userInfo } from "./app.js";
import { loadData } from "./loadData.js";
function authExec(method) {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value,
            returnSecureToken: true,
        })
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        if (typeof data.error !== "undefined") {
            if (data.error.message == "EMAIL_EXISTS") {
                throw new Error("Toks el. pašto adresas jau egzistuoja");
            }
            if (data.error.message == "WEAK_PASSWORD : Password should be at least 6 characters") {
                throw new Error("Per silpnas slaptažodis");
            }
            throw new Error("Vartotojo vardas arba slaptažodis neteisingas");
        }
        console.log(data);
        userInfo.email = data.email;
        userInfo.idToken = data.idToken;
        userInfo.loggedin = true;
        saveUser();
        hideLogin();
        loadData();
    })
        .catch((err) => {
        let errorDiv = document.getElementById("loginError");
        errorDiv.style.display = "block";
        errorDiv.innerHTML = err.message;
    });
}
export function loginExec() {
    authExec("signInWithPassword");
}
export function registerExec() {
    authExec("signUp");
}
export function saveUser() {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}
export function loadUser() {
    const userStr = localStorage.getItem("userInfo");
    if (userStr != null) {
        const user = JSON.parse(userStr);
        userInfo.email = user.email;
        userInfo.idToken = user.idToken;
        userInfo.loggedin = user.loggedin;
        loadData();
        hideLogin();
    }
}
export function showLogin() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("dataSection").style.display = "none";
}
export function hideLogin() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dataSection").style.display = "block";
}
export function logOut() {
    localStorage.removeItem("userInfo");
    showLogin();
}
export function deleteAccount() {
    console.log(userInfo.idToken);
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //Abiem atvejais siunčiame el. paštą paimtą iš formos ir slaptažodį taip pat paimtą iš formos
        body: JSON.stringify({
            idToken: userInfo.idToken
        })
    })
        .then((result) => {
        return result.json();
    })
        .then((data) => {
        logOut();
    });
}
export function changeExec() {
    document.getElementById("newLoginPassword").style.display = "block";
    document.getElementById("change").style.display = "block";
    document.getElementById("change").onclick = () => {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: userInfo.idToken,
                password: document.getElementById("newLoginPassword").value,
                returnSecureToken: true,
            })
        })
            .then((response) => {
            return response.json();
        })
            .then((data) => {
            showLogin();
        });
    };
}
export function changeEmailExec() {
    document.getElementById("newLoginEmail").style.display = "block";
    document.getElementById("changeE").style.display = "block";
    document.getElementById("changeE").onclick = () => {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: userInfo.idToken,
                email: document.getElementById("newLoginEmail").value,
                returnSecureToken: true,
            })
        })
            .then((response) => {
            return response.json();
        })
            .then((data) => {
            showLogin();
        });
    };
}
document.getElementById("loginError").style.display = "none";
document.getElementById("logOut").onclick = logOut;
document.getElementById("deleteAccount").onclick = deleteAccount;
