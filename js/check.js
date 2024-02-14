import { collection, getAllAmiibos, listData } from "./utils.js";
console.clear();

const clearAll = () => {
    for (let el of checkBoxes) {
        //console.log(el);
        el.checked = false;
    }
}

const getAllCheckedBoxes = () => {
    //console.log(checkBoxes);
    const checkedList = [];
    for (let el of checkBoxes) {
        //console.log(el, el.checked);
        if (el.checked) checkedList.push(el.id)
    }
    console.log(checkedList);
    const filtered = collection.filter((item)=>{
        //console.log(item.character + " in " + checkedList + "?");
        return (checkedList.includes(item.character.toLowerCase()));
    });
    console.log (filtered);
    if (checkedList.length > 0) {
        listData(filtered); // List filtered
    } else {
        listData(collection); // List all if noone is checked
    }
}

const prepareCheckboxes = () => {
    //console.log(checkBoxes);
    for (let el of checkBoxes) {
        el.addEventListener("change", () => {
            getAllCheckedBoxes();
        });
    }
    //console.log("Preparing...");
    clearAll();
}

const selectAllBtn = document.querySelector("button#selectAll");
const clearAllBtn = document.querySelector("button#clearAll");
const checkBoxes = document.querySelectorAll("input[name='checkbox-type']");
//console.log({selectAllBtn, clearAllBtn, checkBoxes});

selectAllBtn.addEventListener("click", () => {
    //console.log("Select all of "+checkBoxes);
    for (let el of checkBoxes) {
        //console.log(el);
        el.checked = true;
    }
    getAllCheckedBoxes();
});

clearAllBtn.addEventListener("click", () => {
    //console.log("Clear all of "+checkBoxes);
    clearAll();
    getAllCheckedBoxes();
});

window.addEventListener("load", () => {
    getAllAmiibos();
    prepareCheckboxes();
});