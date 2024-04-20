import { Registration } from "./registration.js";

const recipeNameDOM =<HTMLInputElement>document.getElementById("recipeName");
const cookTimeDOM=<HTMLInputElement>document.getElementById("cookTime");
const ingredientsDOM=<HTMLTextAreaElement>document.getElementById("ingredients");
const descriptionDOM=<HTMLTextAreaElement>document.getElementById("description");

const loadDataButton=<HTMLButtonElement>document.getElementById("loadData");
const dataTableBody=<HTMLElement>document.getElementById("dataTableBody");

const dataTable=<HTMLElement>document.getElementById("dataTable");
const editForm=<HTMLElement>document.getElementById("editForm");

let registrationData:Registration[];


const showData=()=>{
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
            dataTable.style.display="none";
            editForm.style.display="block";
             (<HTMLInputElement>document.getElementById("recipeNameEdit")).value=reg.recipeName;
            (<HTMLInputElement>document.getElementById("cookTimeEdit")).value=reg.cookTime.toString();
            (<HTMLTextAreaElement>document.getElementById("ingredientsEdit")).value=reg.ingredients;
            (<HTMLTextAreaElement>document.getElementById("descriptionEdit")).value=reg.description;
          }
    })

}


const loadData=()=>{
    fetch("https://receptai-4a520-default-rtdb.europe-west1.firebasedatabase.app/Receptai.json", {
        method: "GET",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data: {[key:string]:Registration})=>{
    
        registrationData=[];
        Object.keys(data).forEach((k)=>{
            registrationData.push({id:k,...data[k]});
        })
        showData();
        console.log(registrationData);
    });
}


loadDataButton.onclick=loadData;