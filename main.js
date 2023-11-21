
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

    if (snapshot.exists()) {
        let objectInArray = Object.entries(snapshot.val());
        clearAppedItem();

        for (let i = 0; i < objectInArray.length; i++) {
            let newValue = objectInArray[i];

            appendItem(newValue);
        }

    } else {
        ulItem.innerHTML = "No items here... yet"
    }


})

function clearValue() {
    inputText.value = "";
}

function clearAppedItem() {
    ulItem.innerHTML = "";

}

function appendItem(value) {
    let itemIdInDb = value[0];
    let itemToDb = value[1];
    let newIl = document.createElement("li");
    newIl.textContent = itemToDb;

    newIl.addEventListener("click", function () {
        let exactLocationId = ref(database, `Item/${itemIdInDb}`);
        remove(exactLocationId);
    })
    ulItem.append(newIl);
}