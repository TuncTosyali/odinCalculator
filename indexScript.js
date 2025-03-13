/* const button0=document.querySelector("#button0");
const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const button4=document.querySelector("#button4");
const button5=document.querySelector("#button5");
const button6=document.querySelector("#button6");
const button7=document.querySelector("#button7");
const button8=document.querySelector("#button8");
const button9=document.querySelector("#button9"); */
const numButtons = document.querySelectorAll(".numButton");
/* const divButton=document.querySelector("#divButton");
const multButton=document.querySelector("#multButton");
const subtButton=document.querySelector("#subtButton");
const addButton=document.querySelector("#addButton"); */
const oprButtons = document.querySelectorAll(".oprButton");

const history = document.querySelector("#history");
const display = document.querySelector("#display");
const clearButton = document.querySelector("#clearButton");
const delButton = document.querySelector("#delButton");
const decButton = document.querySelector("#decButton");
const equButton = document.querySelector("#equButton");
let currArg = "";
let prevArg = "";
let currOpr = "";

numButtons.forEach((numButton) => {
    numButton.addEventListener("click", (evnt) => {
        if (currArg.length > 12) return;
        currArg += numButton.value;
        display.textContent = currArg;
    })
});

oprButtons.forEach((oprButton) => {
    oprButton.addEventListener("click", (evnt) => {
        if (prevArg !== "" && currArg === "") {
            // clicking an opr b4 entering a second arg swaps for the new opr
            currOpr = oprButton.value;
            history.textContent = prevArg + " " + currOpr;
            return;
        } else if (currArg !== "" && currOpr === "") {
            //usual scenario where user inputs a num then an operator
            prevArg = currArg;
            currArg = "";
            currOpr = oprButton.value;
            history.textContent = prevArg + " " + currOpr;
            display.textContent = "";
            return;
        } else if (prevArg !== "" && currOpr !== "" && currArg !== "") {
            //calculate first existing result and use it as previous Arg
            prevArg = doCalc();
            currArg = "";
            currOpr = oprButton.value;
            history.textContent = prevArg + " " + currOpr;
            display.textContent = "";
        }
    })
});

clearButton.addEventListener("click", (evnt) => {
    currArg = "";
    prevArg = "";
    currOpr = "";
    history.textContent = "";
    display.textContent = "";
});

delButton.addEventListener("click", (evnt) => {
    if (currArg !== "") {
        currArg = currArg.slice(0, -1);
        display.textContent = currArg;
    }
});

const doCalc = function () {
    if (currArg === "" || prevArg === "" || currOpr === "") return "notYet";
    let currArgNum = Number(currArg);
    let prevArgNum = Number(prevArg);
    if (currOpr === "+") {
        return (Math.round((prevArgNum + currArgNum) * 1000000000) / 1000000000).toString();
    } else if (currOpr === "-") {
        return (Math.round((prevArgNum - currArgNum) * 1000000000) / 1000000000).toString();
    } else if (currOpr === "*") {
        return (Math.round((prevArgNum * currArgNum) * 1000000000) / 1000000000).toString();
    } else if (currOpr === "/") {
        return (Math.round((prevArgNum / currArgNum) * 1000000000) / 1000000000).toString();
    }
}

equButton.addEventListener("click", function (evnt) {
    let result = doCalc();
    if (result === "notYet") return;
    history.textContent += " " + currArg + " " + "=";
    display.textContent = result;
    currArg = "";
    prevArg = "";
    currOpr = "";
});

decButton.addEventListener("click", function (evnt) {
    if (currArg === "") return;
    let currArgNum = Number(currArg);
    if(!Number.isInteger(currArgNum)) return;
    currArg+=".";
});