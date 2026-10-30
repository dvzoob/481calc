// Calculator state
let current = "";      // number being typed
let previous = null;   // number stored before an operator
let operator = null;   // "+", "-", "*", "/"
let startNew = false;  // true when the next digit should start a new number

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = current;
}

// Do the math for two numbers and an operator
function calculate(a, b, op) {
  let result;
  switch (op) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
      if (b === 0) return "Error";
      result = a / b;
      break;
    default: return String(b);
  }
  // Fix floating point issues like 10 / 3 * 3
  return String(parseFloat(result.toPrecision(12)));
}

function inputNumber(num) {
  if (current === "Error" || startNew) {
    current = num;
    startNew = false;
  } else {
    current = current === "0" ? num : current + num;
  }
}

function chooseOperator(op) {
  if (current === "" || current === "Error") return;
  // Finish the waiting math first (e.g. 2 + 3 + ...)
  if (operator && !startNew) {
    current = calculate(parseFloat(previous), parseFloat(current), operator);
  }
  previous = current;
  operator = op;
  startNew = true;
}

function equals() {
  if (!operator || current === "Error") return;
  current = calculate(parseFloat(previous), parseFloat(current), operator);
  previous = null;
  operator = null;
  startNew = true;
}

function clearAll() {
  current = "";
  previous = null;
  operator = null;
  startNew = false;
}

// Button clicks
document.querySelector(".buttons").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.num !== undefined) inputNumber(btn.dataset.num);
  else if (btn.dataset.op) chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "equals") equals();
  else if (btn.dataset.action === "clear") clearAll();

  updateDisplay();
});


updateDisplay();