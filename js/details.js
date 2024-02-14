console.clear();

// get the query string
const queryString = document.location.search;
// create an object that will allows us to access all the query string parameters
const params = new URLSearchParams(queryString);
// get the id parameter from the query string
const id = params.get("id");   
console.log(id);

const out = document.querySelector("div#amiibo");
let ref = document.referrer;
console.log(ref);

const listData = (amiibo) => {
    console.log(amiibo);
    //document.title = amiibo.character; 
    document.title = amiibo.name; 
    let newDiv = `
        <h1>${amiibo.character}</h1>
        <img src="${amiibo.image}" alt="${amiibo.character}">
        <p>Name: <strong>${amiibo.name}</strong></p>
        <p>Amiibo Series: ${amiibo.amiiboSeries}</p>
        <p>Game Series: ${amiibo.gameSeries}</p>
        <p>Released (in Japan): ${amiibo.release.jp}
        <p>Type: ${amiibo.type}</p>
        <p><a href="${ref}">&lt; &lt; &lt; Back</a></p>
    `;
    out.innerHTML = newDiv;
}

const getAllAmiibos = async () => {
    const api = `https://www.amiiboapi.com/api/amiibo/?id=${id}`;
    try {
        const response = await fetch(api); 
        if (!response.ok) throw response.statusText;
        const data = await response.json();
        //console.log (data.amiibo);
        listData(data.amiibo);
    } catch (error) {
        console.error("Error message: "+error);
    }
}

getAllAmiibos();