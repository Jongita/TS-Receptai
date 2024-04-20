import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";

export const showData=(registrationData:Registration[])=>{
    let dataTableBody=<HTMLElement>document.getElementById("dataTableBody");
    dataTableBody.innerHTML="";
    registrationData.forEach((reg)=>{
        const tr=document.createElement("tr");

        const tdRecipeName=document.createElement("td");
        tdRecipeName.innerHTML=reg.recipeName;
        
        const tdCookTime=document.createElement("td");
        tdCookTime.innerHTML=reg.cookTime.toString();
    
        const tdIngredients=document.createElement("td");
        tdIngredients.innerHTML=reg.ingredients;

        const tdDescription=document.createElement("td");
        tdDescription.innerHTML=reg.description;

        tr.appendChild(tdRecipeName);
        tr.appendChild(tdCookTime);
      
       

        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            (<HTMLElement>document.getElementById("dataTable")).style.display="none";
            (<HTMLElement>document.getElementById("editForm")).style.display="block";
        
            (<HTMLInputElement>document.getElementById("recipeNameEdit")).value=reg.recipeName;
            (<HTMLInputElement>document.getElementById("cookTimeEdit")).value=reg.cookTime.toString();
            (<HTMLTextAreaElement>document.getElementById("ingredientsEdit")).value=reg.ingredients;
            (<HTMLTextAreaElement>document.getElementById("descriptionEdit")).value=reg.description;


            (<HTMLButtonElement>document.getElementById("updateRegistration")).onclick=()=>{
                const upReg:Registration={
                    recipeName:(<HTMLInputElement>document.getElementById("recipeNameEdit")).value,
                    cookTime:(<HTMLInputElement>document.getElementById("cookTimeEdit")).valueAsNumber,
                    ingredients:(<HTMLTextAreaElement>document.getElementById("ingredientsEdit")).value,
                    description:(<HTMLTextAreaElement>document.getElementById("descriptionEdit")).value,
                    
                }
                fetchRegistrations(`Receptai/${reg.id}`, "PUT", upReg)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    (<HTMLElement>document.getElementById("dataTable")).style.display="block";
                    (<HTMLElement>document.getElementById("editForm")).style.display="none";
                    loadData();
                })
            } 
              (<HTMLButtonElement>document.getElementById("deleteRegistration")).onclick=()=>{ 

                fetchRegistrations(`Receptai/${reg.id}`, "DELETE", null)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    (<HTMLElement>document.getElementById("dataTable")).style.display="block";
                    (<HTMLElement>document.getElementById("editForm")).style.display="none";
                    loadData();
                });    
            }
        }
    })


}