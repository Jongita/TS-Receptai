import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
export const showData = (registrationData) => {
    let dataTableBody = document.getElementById("dataTableBody");
    dataTableBody.innerHTML = "";
    registrationData.forEach((reg) => {
        const tr = document.createElement("tr");
        const tdRecipeName = document.createElement("td");
        tdRecipeName.innerHTML = reg.recipeName;
        const tdCookTime = document.createElement("td");
        tdCookTime.innerHTML = reg.cookTime.toString();
        const tdDescription = document.createElement("td");
        tdDescription.innerHTML = reg.description;
        tr.appendChild(tdRecipeName);
        tr.appendChild(tdCookTime);
        dataTableBody.appendChild(tr);
        tr.onclick = () => {
            document.getElementById("dataTable").style.display = "none";
            document.getElementById("editForm").style.display = "block";
            document.getElementById("recipeNameEdit").value = reg.recipeName;
            document.getElementById("cookTimeEdit").value = reg.cookTime.toString();
            document.getElementById("descriptionEdit").value = reg.description;
            document.getElementById("updateRegistration").onclick = () => {
                const upReg = {
                    recipeName: document.getElementById("recipeNameEdit").value,
                    cookTime: document.getElementById("cookTimeEdit").valueAsNumber,
                    description: document.getElementById("descriptionEdit").value,
                };
                fetchRegistrations(`Receptai/${reg.id}`, "PUT", upReg)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    document.getElementById("dataTable").style.display = "block";
                    document.getElementById("editForm").style.display = "none";
                    loadData();
                });
            };
            document.getElementById("deleteRegistration").onclick = () => {
                fetchRegistrations(`Receptai/${reg.id}`, "DELETE", null)
                    .then((response) => {
                    return response.json();
                })
                    .then((data) => {
                    document.getElementById("dataTable").style.display = "block";
                    document.getElementById("editForm").style.display = "none";
                    loadData();
                });
            };
        };
    });
};
