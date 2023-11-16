
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-80e97-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const item = ref(database, "Item");

const inputText = document.getElementById("input-text");
const inputBtn = document.getElementById("input-btn");

inputBtn.addEventListener("click", function () {
    let valueText = inputText.value;
    push(item, valueText);
    console.log(`${valueText} added to database`);

})