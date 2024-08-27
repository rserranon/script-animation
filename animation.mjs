import { getOpcodeType } from "./opcode.mjs";

export class AnimationHandler {
  constructor(uiHandler) {
    this.uiHandler = uiHandler;
    this.currentIndex = 0; // Start with the first element

    // Bind interpreter events to animations
    // this.interpreter.on("startScript", this.onStartScript.bind(this));
    // this.interpreter.on("executeOpcode", this.onExecuteOpcode.bind(this));
    // this.interpreter.on("endScript", this.onEndScript.bind(this));
  }

  resetIndex() {
    this.currentIndex = 0;
  }

  onMoveToExecution({ element, index }) {
    const scriptContainer = this.uiHandler.scriptContainer;

    const step = document.createElement("div");
    step.classList.add("step", `step${index + 1}`, "execution-step");
    step.style.setProperty("--index", index);
    step.innerText = element;

    // Store the index as a data attribute for future reference
    step.setAttribute("data-index", index);

    scriptContainer.appendChild(step);

    // Additional animations can be applied here if needed
  }

  onStartScript(event) {
    const scriptContainer = this.uiHandler.scriptContainer;
    scriptContainer.innerHTML = ""; // Clear previous script
    event.script.forEach((element, index) => {
      const step = document.createElement("div");
      step.classList.add("step");
      step.innerText = element;
      scriptContainer.appendChild(step);
    });
  }

  onExecuteOpcode(event) {
    const step = this.uiHandler.scriptContainer.children[event.index];
    step.classList.add("executing");
    console.log(`Executing: ${event.element}`);
    // You can add additional animation logic here
  }

  onEndScript(event) {
    console.log("Script execution finished.");
    // Add any cleanup or end-of-execution animations here
  }

  onPush(event) {
    // Retrieve the corresponding element from the script-execution section
    const step = this.uiHandler.scriptContainer.querySelector(
      `[data-index="${this.currentIndex}"]`,
    );

    if (step) {
      // Schedule the move to stack and stack appear animations
      setTimeout(() => {
        // Move the step to the stack and make it disappear from execution
        step.style.opacity = "0";
        this.uiHandler.stackContainer.appendChild(step);

        // Trigger the stack appear animation
        requestAnimationFrame(() => {
          stack.classList.add("appear");
        });
      }, index * 2000 + 1800); // Adjust timing to ensure smooth transition

      this.currentIndex++;

      // Apply animations here
      console.log(
        `Animating push for element at index ${this.currentIndex - 1}:`,
        event,
      );
    }
  }

  onPop(event) {
    // Implement the animation for the 'pop' operation
    console.log("Animating pop:", event);
    // Example: animate removing an element from the visual stack
  }

  onPeek(event) {
    // Implement the animation for the 'pop' operation
    console.log("Animating pop:", event);
    // Example: animate removing an element from the visual stack
  }

  onAccessAt(event) {
    // Implement the animation for the 'query' operation
    console.log("Animating query:", event);
    // Example: animate showing the current state of the stack
  }
}
