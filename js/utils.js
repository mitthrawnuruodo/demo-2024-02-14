console.clear();
const out = document.querySelector("ul#amiiboList");
const h1 = document.querySelector("h1");
const originalH1 = h1.innerHTML;

export let collection = [];

const listItemTemplate = (amiibo) => {
    return `
    <li>
        <a href="details.html?id=${amiibo.head + amiibo.tail}">
            ${amiibo.name}
        </a>
    </li>`;
}

export const listData = (list) => {
    //console.log(list.length);
    h1.innerHTML = `${originalH1} (${list.length})`;

    let output = "";
    for (let item of list) {
        //console.log(item);
        output += listItemTemplate(item);
    }
    if (output) {
        out.innerHTML = output; 
    } else {
        out.innerHTML = "<li>No amiibos to list...</li>";
    }
}

export const getAllAmiibos = async () => {
    const api = "https://www.amiiboapi.com/api/amiibo/";

    try {
        const response = await fetch(api); 
        if (!response.ok) throw response.statusText;
        const data = await response.json();
        //console.log (data.amiibo);
        collection = [...data.amiibo.sort((a, b)=>
            Intl.Collator().compare(a.name, b.name)
        )]; // Sort and set collection global
        listData(collection); // List all
    } catch (error) {
        console.error("Error message: "+error);
    }
}


export const getAll = async (type) => {
    const api = `https://www.amiiboapi.com/api/${type}`;
    console.log(api);
    try {
        const response = await fetch(api); 
        if (!response.ok) throw response.statusText;
        const data = await response.json();
        //console.log (data.amiibo);
        const unique = [];
        data.amiibo.forEach(element => {
            //console.log (element.name);
            let n = element.name;
            if (!unique.includes(n)) unique.push(n);
        });
        //console.log(unique);
        unique.sort();
        return unique;
    } catch (error) {
        console.error("Error message: "+error);
    }
};