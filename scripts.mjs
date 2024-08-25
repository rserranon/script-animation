import { getOpcodeType, updateFooter } from "./opcode.mjs";
import { Stack } from "./stack.mjs"; // Import the Stack class import { getOpcodeType, updateFooter } from "./opcode.mjs";
import { AnimationHandler } from "./animation.mjs";
import { Interpreter } from "./interpreter.mjs";

export class Animation {
  myStack = new Stack();
  opcodes = opcodeString.split(" ");
  scriptContainer = document.querySelector(".script-execution");
  stackContainer = document.querySelector(".stack-container");

  constructor() {
    // Clear previous elements
    scriptContainer.innerHTML = "";
    stackContainer.innerHTML = "";
  }

  setOperationPosition() {
    const operationDiv = document.querySelector(".operation-result");
    const rect = operationDiv.getBoundingClientRect();

    document.documentElement.style.setProperty(
      "--operation-x",
      `${rect.left}px`,
    );
    document.documentElement.style.setProperty(
      "--operation-y",
      `${rect.bottom}px`,
    );
    console.log(rect.left);
    console.log(rect.bottom);
  }

  setStackPosition() {
    const stackContainer = document.querySelector(".stack-container");
    const rect = stackContainer.getBoundingClientRect();

    document.documentElement.style.setProperty("--stack-x", `${rect.left}px`);
    document.documentElement.style.setProperty("--stack-y", `${rect.top}px`);
    console.log(rect.left);
    console.log(rect.top);
  }

  animate_push_to_stack(opcode) {
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
  }
}

function animateOpcodes(opcodeString) {
  opcodes.forEach((opcode, index) => {
    const type = getOpcodeType(opcode);

    // Create the execution step element
    const step = document.createElement("div");
    step.classList.add("step", `step${index + 1}`, type);
    step.style.setProperty("--index", index);
    step.innerText = opcode;

    // Add the step to the script execution container
    scriptContainer.appendChild(step);

    // Push the opcode to the stack
    animate_push_to_stack(opcode);
    myStack.push(opcode);
  });
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
  // this.setStackPosition();
  // this.setOperationPosition();
  // Initialize the footer with all possible types
  // globalThis.updateFooter = updateFooter;
  // globalThis.animateOpcodes = animateOpcodes;
  // globalThis.toggleAltStackVisibility = toggleAltStackVisibility;

  // Create instances of Interpreter and AnimationHandler
  const interpreter = new Interpreter();
  const animationHandler = new AnimationHandler();

  // Bind the animations to the stack events
  interpreter.bindAnimations(animationHandler);

  // Define a simple script with push, pop, and accessAt operations
  const myScript = [
    { type: "PUSH", value: "Element 1" },
    { type: "PUSH", value: "Element 2" },
    { type: "ACCESS_AT", position: -2 },
    { type: "POP" },
  ];

  // Now you can execute scripts and the animations will trigger correctly
  interpreter.executeScript(myScript);
});

// Example script
// OP_1 OP_2 OP_SWAP OP_1 OP_CAT OP_CHECKSIGVERIFY OP_AND OP_ADD
