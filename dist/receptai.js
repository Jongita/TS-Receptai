const recipeNameDOM = document.getElementById("recipeName");
const cookTimeDOM = document.getElementById("cookTime");
const ingredientsDOM = document.getElementById("ingredients");
const descriptionDOM = document.getElementById("description");
const loadDataButton = document.getElementById("loadData");
const returnButton = document.getElementById("return");
const dataTableBody = document.getElementById("dataTableBody");
const dataTable = document.getElementById("dataTable");
const editForm = document.getElementById("editForm");
let registrationData;
const showData = () => {
    dataTableBody.innerHTML = "";
    registrationData.forEach((reg) => {
        const tr = document.createElement("tr");
        const tdRecipeName = document.createElement("td");
        tdRecipeName.innerHTML = reg.recipeName;
        const tdCookTime = document.createElement("td");
        tdCookTime.innerHTML = reg.cookTime.toString();
        const tdIngredients = document.createElement("td");
        tdIngredients.innerHTML = reg.ingredients;
        const tdDescription = document.createElement("td");
        tdDescription.innerHTML = reg.description;
        tr.appendChild(tdRecipeName);
        tr.appendChild(tdCookTime);
        dataTableBody.appendChild(tr);
        tr.onclick = () => {
            dataTable.style.display = "none";
            editForm.style.display = "block";
            document.getElementById("recipeNameEdit").value = reg.recipeName;
            document.getElementById("cookTimeEdit").value = reg.cookTime.toString();
            document.getElementById("ingredientsEdit").value = reg.ingredients;
            document.getElementById("descriptionEdit").value = reg.description;
        };
        returnButton.onclick = () => {
            dataTable.style.display = "block";
            editForm.style.display = "none";
        };
    });
};
const loadData = () => {
    fetch("https://receptai-4a520-default-rtdb.europe-west1.firebasedatabase.app/Receptai.json", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        registrationData = [];
        Object.keys(data).forEach((k) => {
            registrationData.push(Object.assign({ id: k }, data[k]));
        });
        showData();
        console.log(registrationData);
    });
};
loadDataButton.onclick = loadData;
export {};
