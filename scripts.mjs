import { Interpreter } from "./interpreter.mjs";
import { UIHandler } from "./uiHandler.mjs";
import { AnimationHandler } from "./animation.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // Create instances of Interpreter and AnimationHandler
  const uiHandler = new UIHandler();
  const animationHandler = new AnimationHandler(uiHandler);
  const interpreter = new Interpreter(animationHandler);

  // Set initial UI state
  uiHandler.setStackPosition();
  uiHandler.setOperationPosition();
  uiHandler.updateFooter();

  // Bind the animations to the stack events
  interpreter.bindAnimations(animationHandler);

  const script = "pk(A) OP_DUP OP_HASH160 pk(B) OP_EQUALVERIFY";
  // Now you can execute scripts and the animations will trigger correctly
  interpreter.parseAndExecute(script);
});

// Example script
// OP_1 OP_2 OP_SWAP OP_1 OP_CAT OP_CHECKSIGVERIFY OP_AND OP_ADD
