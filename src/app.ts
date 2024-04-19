import { Registration } from "./registration";

const recipeNameDOM =<HTMLInputElement>document.getElementById("recipeName");
const cookTimeDOM=<HTMLInputElement>document.getElementById("cookTime");
const descriptionDOM=<HTMLTextAreaElement>document.getElementById("description");
const addRegistrationButton=<HTMLButtonElement>document.getElementById("addRegistration");

const loadDataButton=<HTMLButtonElement>document.getElementById("loadData");
const dataTableBody=<HTMLElement>document.getElementById("dataTableBody");


const dataTable=<HTMLElement>document.getElementById("dataTable");
const editForm=<HTMLElement>document.getElementById("editForm");

let registrationData:Registration[];

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

const showData=()=>{
    dataTableBody.innerHTML="";
    registrationData.forEach((reg)=>{
        const tr=document.createElement("tr");

        const tdRecipeName=document.createElement("td");
        tdRecipeName.innerHTML=reg.recipeName;
        
        const tdCookTime=document.createElement("td");
        tdCookTime.innerHTML=reg.cookTime.toString();
    
        const tdDescription=document.createElement("td");
        tdDescription.innerHTML=reg.description;

        tr.appendChild(tdRecipeName);
        tr.appendChild(tdCookTime);
        // tr.appendChild(tdDescription);

        dataTableBody.appendChild(tr);

        tr.onclick=()=>{
            dataTable.style.display="none";
            editForm.style.display="block";
            (<HTMLInputElement>document.getElementById("recipeNameEdit")).value=reg.recipeName;
            (<HTMLInputElement>document.getElementById("cookTimeEdit")).value=reg.cookTime.toString();
            (<HTMLTextAreaElement>document.getElementById("descriptionEdit")).value=reg.description;


            (<HTMLButtonElement>document.getElementById("updateRegistration")).onclick=()=>{
                const upReg:Registration={
                    recipeName:(<HTMLInputElement>document.getElementById("recipeNameEdit")).value,
                    cookTime:(<HTMLInputElement>document.getElementById("cookTimeEdit")).valueAsNumber,
                    description:(<HTMLTextAreaElement>document.getElementById("descriptionEdit")).value,
                    
                }
                fetch(`https://receptai-4a520-default-rtdb.europe-west1.firebasedatabase.app/Receptai/${reg.id}.json`,{
                    method:"PUT",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(upReg)
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log("Įrašas atnaujintas");
                    console.log(data);
                    dataTable.style.display="block";
                    editForm.style.display="none";
                    loadData();
                })
            }      
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