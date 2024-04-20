import { loginExec, registerExec } from "./auth.js";
import { loadData } from "./loadData.js";
const recipeNameDOM = document.getElementById("recipeName");
const cookTimeDOM = document.getElementById("cookTime");
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
        description: descriptionDOM.value,
    };
    fetch("https://receptai-4a520-default-rtdb.europe-west1.firebasedatabase.app/Receptai.json", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reg)
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log("Įrašas pridėtas");
        console.log(data);
    });
};
export const userInfo = {
    email: "",
    idToken: "",
    loggedin: false,
};
document.getElementById("loginSection").style.display = "block";
document.getElementById("dataSection").style.display = "none";
document.getElementById("loginError").style.display = "none";
loadDataButton.onclick = loadData;
document.getElementById("login").onclick = loginExec;
document.getElementById("register").onclick = registerExec;
