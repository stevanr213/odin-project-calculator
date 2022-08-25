const numbers = document.querySelectorAll(".number");
const input = document.querySelector("#input");
const equation = document.querySelector("#equation");
const delButton = document.querySelector("#del");
const clcButton = document.querySelector("#clc");
const operators = document.querySelectorAll(".ops");
const equal = document.querySelector("#equal");
const dot = document.querySelector("#dot");

// numpad
function typeNumber() {
  if (equalPressed === 0) {
    if (input.textContent == "0") {
      input.textContent = `${this.textContent}`;
    } else {
      if (input.textContent.length <= 16) {
        input.textContent += `${this.textContent}`;
      }
    }
  }
}
numbers.forEach((number) => number.addEventListener("click", typeNumber));

// delete and clear button
function deleteContent() {
  if (input.textContent != "") {
    if (equalPressed === 0) {
      input.textContent = input.textContent.slice(0, -1);
    }
  }
}
delButton.addEventListener("click", deleteContent);
clcButton.addEventListener("click", () => {
  input.textContent = "";
  equation.textContent = "";
  eqArray = [];
  result = 0;
  equalPressed = 0;
  equalPressedOld = 0;
  dotPressed = 1;
});

// math operators
let eqArray = [];
function operation() {
  if (input.textContent != "" && input.textContent != "-") {
    if (equalPressed === 1) {
      input.textContent = "";
      equation.textContent = `${result}${this.textContent}`;
      eqArray = [];
      eqArray.push(result);
      eqArray.push(this.textContent);
      equalPressed = 0;
      equalPressedOld = equalPressed;
      if (!dotPressed) {
        dotPressed = 1;
      }
    } else {
      if (dotPressed) {
        eqArray.push(parseInt(input.textContent));
      } else {
        eqArray.push(parseFloat(input.textContent));
        dotPressed = 1;
      }
      eqArray.push(this.textContent);
      equation.textContent += `${input.textContent}${this.textContent}`;
      input.textContent = "";
    }
  } else {
    if (this.textContent === "-") {
      input.textContent = "-";
    }
  }
}
operators.forEach((operator) => operator.addEventListener("click", operation));

// decimal
let dotPressed = 1;
function decimal() {
  if (dotPressed) {
    if (!equalPressed) {
      if (input.textContent === "") {
        input.textContent = `0${this.textContent}`;
      } else if (input.textContent === "-") {
        input.textContent += `0${this.textContent}`;
      } else if (input.textContent !== "") {
        input.textContent += `${this.textContent}`;
      }
    }
  }
  dotPressed = 0;
}
dot.addEventListener("click", decimal);

// evaluate equation
let result = 0;
let equalPressed = 0;
let equalPressedOld = 0;
function evaluate() {
  equalPressed = 1;
  if (equalPressed == 1 && equalPressedOld == 0) {
    equalPressedOld = equalPressed;
    if (input.textContent != "") {
      if (input.textContent != "") {
        if (dotPressed) {
          eqArray.push(parseInt(input.textContent));
        } else {
          eqArray.push(parseFloat(input.textContent));
          dotPressed = 1;
        }
        eqArray.push(this.textContent);
        equation.textContent += `${input.textContent}${this.textContent}`;
        input.textContent = "";
      }
      let firstOrder = [];
      eqArray.filter((e, i) => {
        if (e === "*" || e === "/") {
          firstOrder.push(i);
        }
      });
      // evaluate * and /
      let i = firstOrder.length - 1;
      while (i >= 0) {
        if (eqArray[firstOrder[i]] === "*") {
          eqArray[firstOrder[i] - 1] =
            eqArray[firstOrder[i] - 1] * eqArray[firstOrder[i] + 1];
        } else {
          eqArray[firstOrder[i] - 1] =
            eqArray[firstOrder[i] - 1] / eqArray[firstOrder[i] + 1];
        }
        eqArray = eqArray
          .slice(0, firstOrder[i])
          .concat(eqArray.slice(firstOrder[i] + 2));
        i--;
      }
      // evaluate final result
      eqArray.pop();
      let mathOperator = "";
      for (let i = 0; i < eqArray.length; i++) {
        if (eqArray[i] === "+" || eqArray[i] === "-") {
          mathOperator = eqArray[i];
        } else {
          if (mathOperator === "") {
            result = eqArray[i];
          } else if (mathOperator === "+") {
            result += eqArray[i];
          } else if (mathOperator === "-") {
            result -= eqArray[i];
          }
        }
      }
      input.textContent = `${result}`;
    }
  }
}
equal.addEventListener("click", evaluate);
