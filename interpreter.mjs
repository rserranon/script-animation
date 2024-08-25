import { Stack } from "./stack.mjs";

export class Interpreter {
  constructor() {
    this.stack = new Stack();
  }

  // Example of how the interpreter might execute a script
  executeScript(script) {
    script.forEach((instruction) => {
      switch (instruction.type) {
        case "PUSH":
          this.stack.push(instruction.value);
          break;
        case "POP":
          this.stack.pop();
          break;
        case "ACCESS_AT":
          this.stack.accessAt(instruction.position);
          break;
        // Handle other Bitcoin Script operations here
        default:
          throw new Error(`Unknown instruction: ${instruction}`);
      }
    });
  }

  // method to bind animations
  //
  bindAnimations(animationHandler) {
    if (this.animationsBound) return; // Prevent rebinding
    this.stack.on("push", animationHandler.onPush.bind(animationHandler));
    this.stack.on("pop", animationHandler.onPop.bind(animationHandler));
    this.stack.on(
      "accessAt",
      animationHandler.accessAt.bind(animationHandler),
    );
    this.animationsBound = true; // Set the flag
  }
}
