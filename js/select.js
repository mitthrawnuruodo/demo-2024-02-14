import { collection, getAllAmiibos, listData, getAll } from "./utils.js";

console.clear();

// const getAllAmiiboSeries = async () => {
//     const api = "https://www.amiiboapi.com/api/amiiboseries/";
//     try {
//         const response = await fetch(api); 
//         if (!response.ok) throw response.statusText;
//         const data = await response.json();
//         //console.log(data.amiibo);
//         const unique = [];
//         data.amiibo.forEach(element => {
//             //console.log (element.name);
//             let n = element.name;
//             if (!unique.includes(n)) unique.push(n);
//         });
//         unique.sort();
//         //console.log(unique);
//         return unique;
//     } catch (error) {
//         console.error("Error message: "+error.message);
//     }
// };

const getAmiibosByAmiiboSeries = async (serie) => {
    //console.log(serie);
    // const api = `https://www.amiiboapi.com/api/amiibo/?amiiboSeries=${serie}`;
    // try {
    //     const response = await fetch(api); 
    //     if (!response.ok) throw response.statusText;
    //     const data = await response.json();
    //     console.log (data.amiibo);
    //     listData(data.amiibo);
    // } catch (error) {
    //     console.error("Error message: "+error);
    // } 
    const filtered = collection.filter((item)=>{
        //console.log(item.amiiboSeries, serie);
        return item.amiiboSeries === serie;
    });
    listData(filtered); // List filtered
}

const makeSelectItems = async () => {
    const selectElement = document.querySelector("select#amiiboSeries");
    //console.log(selectElement);
    let elements = await getAll("amiiboseries");
    //console.log(elements);

    let options = "";
    for (const el of elements) {
        options += `<option>${el}</option>`;
    }
    selectElement.innerHTML += options;
    selectElement.removeAttribute("disabled");

    selectElement.addEventListener("change", () => {
        const chosenOne = selectElement.value;
        //console.log(chosenOne);
        if (chosenOne !== "none") {
            getAmiibosByAmiiboSeries(chosenOne); 
        }  else {
            // Show all
            listData(collection);  // List all
        }
    });
}

window.addEventListener("load", () => {
    getAllAmiibos();
    makeSelectItems();
});