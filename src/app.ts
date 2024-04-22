import { loadUser, loginExec, registerExec, showLogin, changeExec, changeEmailExec } from "./auth.js";
import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";
import { showData } from "./showData.js";
import { User } from "./user.js";

const recipeNameDOM =<HTMLInputElement>document.getElementById("recipeName");
const cookTimeDOM=<HTMLInputElement>document.getElementById("cookTime");
const ingredientsDOM=<HTMLTextAreaElement>document.getElementById("ingredients");
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
        ingredients: ingredientsDOM.value,
        description: descriptionDOM.value,
    }
    fetchRegistrations('Receptai','POST', reg)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log("Įrašas pridėtas");
        console.log(data);
    })
    recipeNameDOM.value = '';
    cookTimeDOM.value = '';
    ingredientsDOM.value = '';
    descriptionDOM.value = '';

};

export const userInfo={
    email:"",
    idToken:"",
    loggedin:false,
};

showLogin();

loadUser();

loadDataButton.onclick=loadData;

(<HTMLButtonElement>document.getElementById("login")).onclick=loginExec;
(<HTMLButtonElement>document.getElementById("register")).onclick=registerExec;
(<HTMLButtonElement>document.getElementById("changePassword")).onclick=changeExec;
(<HTMLButtonElement>document.getElementById("changeEmail")).onclick=changeEmailExec;
