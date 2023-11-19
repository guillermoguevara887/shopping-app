
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-80e97-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemToDb = ref(database, "Item");

const inputText = document.getElementById("input-text");
const inputBtn = document.getElementById("input-btn");
const ulItem = document.getElementById("ul-item");

inputBtn.addEventListener("click", function () {
    let valueText = inputText.value;
    push(itemToDb, valueText);
    console.log(`${valueText} added to database`);
    clearValue();




})

onValue(itemToDb, function (snapshot) {
    let objectInArray = Object.values(snapshot.val());
    clearAppedItem();

    for (let i = 0; i < objectInArray.length; i++) {
        let newValue = objectInArray[i];
        appendItem(newValue);
    }

})

function clearValue() {
    inputText.value = "";
}

function clearAppedItem() {
    ulItem.innerHTML = "";

}

function appendItem(value) {
    ulItem.innerHTML += `<li>${value}</li>`;
}