import { getOpcodeType } from "./opcode.mjs";

export class AnimationHandler {
  constructor(uiHandler) {
    // to be deleted
    globalThis.animateOpcodes = this.animateOpcodes.bind(this);

    // Store the UIHandler instance to access its properties
    this.uiHandler = uiHandler;
  }

  moveElementToExecutionScript() {
  }

  animateOpcodes(opcodeString) {
    const scriptContainer = this.uiHandler.scriptContainer;
    const opcodes = opcodeString.split(" ");
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
      myStack.push(opcode);
    });
  }

  onPush(event) {
    // Implement the animation for the 'push' operation
    console.log("Animating push:", event);
    // Example: animate adding an element to the visual stack
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
