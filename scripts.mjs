import { Interpreter } from "./interpreter.mjs";
import { AnimationHandler } from "./animation.mjs";
import { UIHandler } from "./uiHandler.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const uiHandler = new UIHandler();
  const interpreter = new Interpreter(
    new AnimationHandler(uiHandler),
  );

  uiHandler.setStackPosition();
  uiHandler.setOperationPosition();
  uiHandler.updateFooter();

  // Bind parseAndExecute to globalThis for global access
  globalThis.parseAndExecute = interpreter.parseAndExecute.bind(interpreter);
});
