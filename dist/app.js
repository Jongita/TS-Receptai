import { loadUser, loginExec, registerExec, showLogin, changeExec, changeEmailExec } from "./auth.js";
import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
const recipeNameDOM = document.getElementById("recipeName");
const cookTimeDOM = document.getElementById("cookTime");
const ingredientsDOM = document.getElementById("ingredients");
const descriptionDOM = document.getElementById("description");
const addRegistrationButton = document.getElementById("addRegistration");
const loadDataButton = document.getElementById("loadData");
const dataTableBody = document.getElementById("dataTableBody");
const dataTable = document.getElementById("dataTable");
const editForm = document.getElementById("editForm");
export const registrationData = [];
addRegistrationButton.onclick = () => {
    const reg = {
        recipeName: recipeNameDOM.value,
        cookTime: cookTimeDOM.valueAsNumber,
        ingredients: ingredientsDOM.value,
        description: descriptionDOM.value,
    };
    fetchRegistrations('Receptai', 'POST', reg)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log("Įrašas pridėtas");
        console.log(data);
    });
    recipeNameDOM.value = '';
    cookTimeDOM.value = '';
    ingredientsDOM.value = '';
    descriptionDOM.value = '';
};
export const userInfo = {
    email: "",
    idToken: "",
    loggedin: false,
};
showLogin();
loadUser();
loadDataButton.onclick = loadData;
document.getElementById("login").onclick = loginExec;
document.getElementById("register").onclick = registerExec;
document.getElementById("changePassword").onclick = changeExec;
document.getElementById("changeEmail").onclick = changeEmailExec;
