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

    const step = document.createElement("div");
    step.classList.add("step", `step${index + 1}`, type);
    step.style.setProperty("--index", index);
    step.style.setProperty(
      "--y-offset",
      `calc(var(--container-height) * ${index - 1} - var(--container-height))`,
    );
    step.style.animationDelay = `${index * 2}s`;
    step.innerText = opcode;
    // Trigger the appearance of the stack item immediately after adding to the DOM
    requestAnimationFrame(() => {
      stack.classList.add("appear");
    });
    const stack = document.createElement("div");
    stack.classList.add("stack-item", `item-${index + 1}`, type);
    stack.innerText = opcode;
    stack.style.animationDelay = `${(index + 1) * 2}s`;

    scriptContainer.appendChild(step);
    stackContainer.appendChild(stack);
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

  // Example usage:
  //   animateOpcodes(
  //     "OP_DUP OP_HASH160 OP_EQUAL OP_CHECKSIG OP_VERIFY OP_0 OP_CAT OP_ADD pk(A)",
  //   );
  // });

  // Define global handlers for them to be available in the html
  globalThis.animateOpcodes = animateOpcodes;
  globalThis.toggleAltStackVisibility = toggleAltStackVisibility;
});
