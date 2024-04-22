import { userInfo } from "./app.js";
import { loadData } from "./loadData.js";
import { User } from "./user.js";

function authExec(method:string){
   
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`,{
         method:"POST",
         headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
         },
         body: JSON.stringify({
            email:(<HTMLInputElement>document.getElementById("loginEmail")).value,
            password:(<HTMLInputElement>document.getElementById("loginPassword")).value,
            returnSecureToken:true,
         })
     })
     .then((response)=>{
       return response.json();
     })
     .then((data)=>{
        if (typeof data.error !== "undefined"){
            if (data.error.message=="EMAIL_EXISTS"){
                throw new Error("Toks el. pašto adresas jau egzistuoja");
            }
            if (data.error.message=="WEAK_PASSWORD : Password should be at least 6 characters"){
                throw new Error("Per silpnas slaptažodis");
            }
            throw new Error("Vartotojo vardas arba slaptažodis neteisingas");
        }
        console.log(data);
        userInfo.email=data.email;
        userInfo.idToken=data.idToken;
        userInfo.loggedin=true;
        saveUser();
        hideLogin();
        loadData();
     })
    .catch((err:Error)=>{
       let errorDiv= (<HTMLElement>document.getElementById("loginError"));
       errorDiv.style.display="block";
       errorDiv.innerHTML=err.message;
    });
}

export function loginExec(){
    authExec("signInWithPassword");
} 

export function registerExec(){
    authExec("signUp");
} 

export function saveUser(){
    localStorage.setItem("userInfo", JSON.stringify( userInfo) );
}

export function loadUser(){
    const userStr=localStorage.getItem("userInfo");
    if (userStr!=null){
        const user:User=JSON.parse(userStr);
        userInfo.email=user.email;
        userInfo.idToken=user.idToken;
        userInfo.loggedin=user.loggedin;
        loadData();
        hideLogin();
    }
}

export function showLogin(){
    (<HTMLElement>document.getElementById("loginSection")).style.display="block";
    (<HTMLElement>document.getElementById("dataSection")).style.display="none";
}

export function hideLogin(){
    (<HTMLElement>document.getElementById("loginSection")).style.display="none";
    (<HTMLElement>document.getElementById("dataSection")).style.display="block";
}

export function logOut(){
    localStorage.removeItem("userInfo");
    showLogin();
}

export function deleteAccount(){
    console.log(userInfo.idToken);
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`,{
        method:"POST",
        headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        
        //Abiem atvejais siunčiame el. paštą paimtą iš formos ir slaptažodį taip pat paimtą iš formos
        body: JSON.stringify({
            idToken:userInfo.idToken
        })
    })
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        logOut();
    })
}

export function changeExec(){
    (<HTMLInputElement>document.getElementById("newLoginPassword")).style.display="block";
    (<HTMLButtonElement>document.getElementById("change")).style.display="block";

    (<HTMLButtonElement>document.getElementById("change")).onclick=()=>{
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`,{
         method:"POST",
         headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
         },
         body: JSON.stringify({
            idToken:userInfo.idToken,
            password:(<HTMLInputElement>document.getElementById("newLoginPassword")).value,
            returnSecureToken:true,
         })
     })
     .then((response)=>{
       return response.json();
     })
     .then((data)=>{
        showLogin();
    }) 
    }
}

export function changeEmailExec(){
    (<HTMLInputElement>document.getElementById("newLoginEmail")).style.display="block";
    (<HTMLButtonElement>document.getElementById("changeE")).style.display="block";

    (<HTMLButtonElement>document.getElementById("changeE")).onclick=()=>{
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD_wcdFJeqAw2f0DpY5k_OU3lHf37PVbic`,{
         method:"POST",
         headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
         },
         body: JSON.stringify({
            idToken:userInfo.idToken,
            email:(<HTMLInputElement>document.getElementById("newLoginEmail")).value,
            returnSecureToken:true,
         })
     })
     .then((response)=>{
       return response.json();
     })
     .then((data)=>{
        showLogin();
    }) 
    }
}

(<HTMLElement>document.getElementById("loginError")).style.display="none";
(<HTMLElement>document.getElementById("logOut")).onclick=logOut;
(<HTMLElement>document.getElementById("deleteAccount")).onclick=deleteAccount;



