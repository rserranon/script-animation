import { opcodeDictionary } from "./opcode.mjs";
import { Stack } from "./stack.mjs";

export class Interpreter {
  constructor(animationHandler) {
    this.stack = new Stack();

    this.animationHandler = animationHandler;
  }

  parseAndExecute(script) {
    const scriptArray = script.split(" ");

    scriptArray.forEach((element) => {
      const entry = opcodeDictionary[element];

      if (entry) {
        if (entry.isOpcode) {
          this.processOpcode(element);
        } else if (entry.type === "keys") {
          this.processDataPush(element);
        } else {
          throw new Error(`Unrecognized script element: ${element}`);
        }
      } else {
        throw new Error(`Unrecognized script element: ${element}`);
      }
    });
  }

  processDataPush(data) {
    this.stack.push(data);
  }

  processOpcode(opcode) {
    switch (opcode) {
      case "OP_DUP": {
        const topElement = this.stack.peek();
        this.stack.push(topElement);
        break;
      }

      case "OP_HASH160": {
        const element = this.stack.pop();
        const hash = this.hash160(element);
        this.stack.push(hash);
        break;
      }

      case "OP_EQUAL", "OP_EQUALVERIFY": {
        const first = this.stack.pop();
        const second = this.stack.pop();
        const isEqual = first === second;
        if (opcode === "OP_EQUALVERIFY" && !isEqual) {
          throw new Error("OP_EQUALVERIFY failed");
        }
        this.stack.push(isEqual ? "1" : "0");
        break;
      }

      // Handle other opcodes...
      default:
        throw new Error(`Unknown opcode: ${opcode}`);
    }
  }

  // method to bind animations
  //
  bindAnimations(animationHandler) {
    if (this.animationsBound) return; // Prevent rebinding
    this.stack.on("push", animationHandler.onPush.bind(animationHandler));
    this.stack.on("pop", animationHandler.onPop.bind(animationHandler));
    this.stack.on(
      "accessAt",
      animationHandler.onAccessAt.bind(animationHandler),
    );
    this.stack.on("peek", animationHandler.onPeek.bind(animationHandler));
    this.animationsBound = true; // Set the flag
  }
}
