import { opcodeDictionary } from "./opcode.mjs";

export class UIHandler {
  constructor() {
    this.scriptContainer = document.querySelector(".script-execution");
    this.stackContainer = document.querySelector(".stack-container");

    // Initialize the positions and footer
    this.setStackPosition();
    this.setOperationPosition();
    this.updateFooter();

    // Ensure the toggleAltStackVisibility function is globally available
    globalThis.toggleAltStackVisibility = this.toggleAltStackVisibility;
    globalThis.updateFooter = this.updateFooter;
  }

  setStackPosition() {
    // Implementation for setting the initial position of the stack
    const stackContainer = document.querySelector(".stack-container");
    const rect = stackContainer.getBoundingClientRect();

    document.documentElement.style.setProperty("--stack-x", `${rect.left}px`);
    document.documentElement.style.setProperty("--stack-y", `${rect.top}px`);
    console.log(rect.left);
    console.log(rect.top);
    console.log("Setting stack position");
  }

  setOperationPosition() {
    // Implementation for setting the initial position of the operation container
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
    console.log("Setting operation position");
  }

  toggleAltStackVisibility() {
    const altStack = document.querySelector(".alt-stack-container");
    const checkbox = document.getElementById("toggleAltStack");

    if (checkbox.checked) {
      altStack.style.display = "flex"; // Show the Alt Stack
    } else {
      altStack.style.display = "none"; // Hide the Alt Stack
    }
  }

  updateFooter() {
    const footer = document.querySelector(".footer");
    footer.innerHTML = ""; // Clear previous labels

    // Extract all unique types from the opcodeDictionary
    const allTypes = [
      ...new Set(Object.values(opcodeDictionary).map((entry) => entry.type)),
    ];

    // Create a label for each type
    allTypes.forEach((type) => {
      const label = document.createElement("div");
      label.classList.add("label", type);
      label.innerText = type.replace("-", " "); // Replace hyphens with spaces for readability
      footer.appendChild(label);
    });

    console.log("Updating footer");
  }
}
