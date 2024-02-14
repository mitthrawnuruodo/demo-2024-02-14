import { collection, getAllAmiibos, listData, getAll } from "./utils.js";
console.clear();

// const getAllTypes = async () => {
//     const api = "https://www.amiiboapi.com/api/type/";
//     try {
//         const response = await fetch(api); 
//         if (!response.ok) throw response.statusText;
//         const data = await response.json();
//         console.log (data.amiibo);
//         const unique = [];
//         data.amiibo.forEach(element => {
//             //console.log (element.name);
//             let n = element.name;
//             if (!unique.includes(n)) unique.push(n);
//         });
//         console.log(unique);
//         unique.sort();
//         return unique;
//     } catch (error) {
//         console.error("Error message: "+error);
//     }
// };

const getAmiibosByType = (type) => {
    const filtered = collection.filter((item)=>{
        //console.log(item);
        return item.type === type;
    });
    listData(filtered); // List filtered
}

const makeRadioButtons = async () => {
    const radioBtnsContainer = document.querySelector("div#radio-buttons");
    //console.log(radioBtnsContainer);
    let types = await getAll("type");
    //console.log (types);
    let radioButtons = [];
    for (let el of types) {
        //console.log (el);
        const label = document.createElement("label");
        label.setAttribute("for", el);
        label.innerHTML = `${el}:`;
        const radioBtn = document.createElement("input");
        radioBtn.setAttribute("type", "radio");
        radioBtn.setAttribute("id", el);
        radioBtn.setAttribute("name", "radio-type");

        radioBtn.addEventListener("change", ()=>{
            const chosenOne = radioBtn.id;
            //console.log(chosenOne);
            if (chosenOne !== "none") {
                getAmiibosByType(chosenOne); 
            } else {
                listData(collection); // List all
            }
        });

        radioButtons.push(radioBtn);
        radioBtnsContainer.appendChild(label);
        radioBtnsContainer.appendChild(radioBtn);
    }
    const clearSelection = document.createElement("button");
    clearSelection.innerHTML = "Clear Selection";
    clearSelection.addEventListener("click", ()=>{
        for (let rb of radioButtons) {
            console.log(rb.checked);
            rb.checked = false;
        }
        listData(collection); // List all
    });
    radioBtnsContainer.appendChild( clearSelection ); 
}

window.addEventListener("load", () => {
    getAllAmiibos();
    makeRadioButtons();
});