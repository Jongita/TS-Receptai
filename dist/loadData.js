import { registrationData } from "./app.js";
import { fetchRegistrations } from "./fetchData.js";
import { showData } from "./showData.js";
export const loadData = () => {
    fetchRegistrations(`Receptai`, "GET", null)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        registrationData.splice(0, registrationData.length); //=[];
        Object.keys(data).forEach((k) => {
            registrationData.push(Object.assign({ id: k }, data[k]));
        });
        showData(registrationData);
    });
};
