import { Stack } from "./stack.mjs"; // Import the Stack class
import { getOpcodeType, updateFooter } from "./opcode.mjs";

function animateOpcodes(opcodeString) {
  const myStack = new Stack();

  const opcodes = opcodeString.split(" ");
  const scriptContainer = document.querySelector(".script-execution");
  const stackContainer = document.querySelector(".stack-container");

  // Clear previous elements
  scriptContainer.innerHTML = "";
  stackContainer.innerHTML = "";

  opcodes.forEach((opcode, index) => {
    const type = getOpcodeType(opcode);

    // Create the execution step element
    const step = document.createElement("div");
    step.classList.add("step", `step${index + 1}`, type);
    step.style.setProperty("--index", index);
    step.innerText = opcode;

    // Add the step to the script execution container
    scriptContainer.appendChild(step);

    // Animate the step element
    step.style.animationDelay = `${index * 2}s`;

    // Create the stack element
    const stack = document.createElement("div");
    stack.classList.add("stack-item", `item-${index + 1}`, type);
    stack.innerText = opcode;

    // Schedule the move to stack and stack appear animations
    setTimeout(() => {
      // Move the step to the stack and make it disappear from execution
      step.style.opacity = "0";
      stackContainer.appendChild(stack);

      // Trigger the stack appear animation
      requestAnimationFrame(() => {
        stack.classList.add("appear");
      });
    }, index * 2000 + 1800); // Adjust timing to ensure smooth transition

    myStack.push(opcode);
  });
  myStack.printStack();
}

function toggleAltStackVisibility() {
  const altStack = document.querySelector(".alt-stack-container");
  const checkbox = document.getElementById("toggleAltStack");

  if (checkbox.checked) {
    altStack.style.display = "flex"; // Show the Alt Stack
  } else {
    altStack.style.display = "none"; // Hide the Alt Stack
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the footer with all possible types
  updateFooter();
  globalThis.animateOpcodes = animateOpcodes;
  globalThis.toggleAltStackVisibility = toggleAltStackVisibility;
});

// Example script
// OP_1 OP_2 OP_SWAP OP_1 OP_CAT OP_CHECKSIGVERIFY OP_AND OP_ADD
