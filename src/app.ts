import { loginExec, registerExec } from "./auth.js";
import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";
import { showData } from "./showData.js";

const recipeNameDOM =<HTMLInputElement>document.getElementById("recipeName");
const cookTimeDOM=<HTMLInputElement>document.getElementById("cookTime");
const descriptionDOM=<HTMLTextAreaElement>document.getElementById("description");
const addRegistrationButton=<HTMLButtonElement>document.getElementById("addRegistration");

const loadDataButton=<HTMLButtonElement>document.getElementById("loadData");
const dataTableBody=<HTMLElement>document.getElementById("dataTableBody");


const dataTable=<HTMLElement>document.getElementById("dataTable");
const editForm=<HTMLElement>document.getElementById("editForm");

export const registrationData:Registration[] = [];

addRegistrationButton.onclick=()=>{

    const reg:Registration={
        recipeName: recipeNameDOM.value,
        cookTime: cookTimeDOM.valueAsNumber,
        description: descriptionDOM.value,
    }
    fetch("https://receptai-4a520-default-rtdb.europe-west1.firebasedatabase.app/Receptai.json",{
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(reg)
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log("Įrašas pridėtas");
        console.log(data);
    })
   
};

export const userInfo={
    email:"",
    idToken:"",
    loggedin:false,
};

(<HTMLElement>document.getElementById("loginSection")).style.display="block";
(<HTMLElement>document.getElementById("dataSection")).style.display="none";
(<HTMLElement>document.getElementById("loginError")).style.display="none";


loadDataButton.onclick=loadData;

(<HTMLButtonElement>document.getElementById("login")).onclick=loginExec;
(<HTMLButtonElement>document.getElementById("register")).onclick=registerExec;