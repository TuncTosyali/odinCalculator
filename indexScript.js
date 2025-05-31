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
            let result = doCalc(); // Calculate before setting new operator
            if (result === "notYet" && display.textContent.startsWith("Error:")) {
                // If calculation resulted in an error (like div by zero),
                // don't proceed with setting new operator based on error message.
                // State should have been reset by doCalc in this case.
                return;
            }
            prevArg = result;
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
        if (currArgNum === 0) { // Check if the divisor is zero
            history.textContent = prevArgNum + " " + currOpr + " " + currArgNum + " ="; // Show the attempted operation in history
            display.textContent = "Error: Cannot divide by zero"; // Display error message
            // Reset state to prevent further calculation with the error
            currArg = "";
            prevArg = ""; // Clear prevArg as well, operation failed.
            currOpr = "";
            return "notYet"; // Indicate that a valid calculation wasn't performed
        }
        return (Math.round((prevArgNum / currArgNum) * 1000000000) / 1000000000).toString();
    }
}

equButton.addEventListener("click", function (evnt) {
    // If user hits equals again without new input after a calculation or error, do nothing.
    if (prevArg !== "" && currArg === "" && currOpr === "" && display.textContent !== "") {
         // This condition means a result (or error) is already on display, and no new currArg or currOpr.
        return;
    }
    // If input is incomplete for a new calculation, also do nothing.
    if (currArg === "" || prevArg === "" || currOpr === "") {
        // Allow if only currArg is present and prevArg is not (e.g. "5=") which is not standard
        // but current logic implies an operation is needed. For now, we require all parts.
        return;
    }

    let originalCurrArg = currArg; // Keep a copy for history if calculation is successful
    let result = doCalc();

    if (result === "notYet") {
        // If doCalc returned "notYet", it means either incomplete input (already checked)
        // or an error like division by zero, which doCalc would have handled by setting display.
        // History for errors is set within doCalc.
        return;
    }

    history.textContent = prevArg + " " + currOpr + " " + originalCurrArg + " " + "=";
    display.textContent = result;
    prevArg = result; // Store the result as prevArg for potential chaining
    currArg = "";
    currOpr = ""; // Clear operator after calculation
});

decButton.addEventListener("click", function (evnt) {
    if (currArg.includes(".")) return; // Prevent multiple decimal points
    if (currArg === "") { // If currArg is empty, start with "0."
        currArg="0.";
    } else {
        currArg+=".";
    }
    display.textContent=currArg;
});
