// stack.js
export class Stack {
  constructor() {
    this.stack = []; // Initialize an empty array to store stack elements
    this.listeners = {}; // To store event listeners
  }
  // Add an event listener for stack operations
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  // Emit an event
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }
  // Push an element onto the stack
  push(element) {
    this.stack.push(element);
    this.emit("push", { stack: this.stack.slice(), value: element }); // Use 'element' instead of 'value'
  }

  // Pop an element off the stack (removes the last element)
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const value = this.stack.pop();
    this.emit("pop", { stack: this.stack.slice(), value }); // Trigger 'pop' event
    return value;
  }

  // Peek the element on the top of the stack without removing it
  peek() {
    const value = this.accessAt(-1);
    const position = -1;
    this.emit("accessAt", { stack: this.stack.slice(), value, position }); // Trigger 'pop' event
    return value;
  }

  // Peek at the top element of the stack without removing it.
  // In Bitcoin Core's interpreter.cpp, the stack is managed in a
  // way where the index provided can be negative.
  // The function stacktop(-6) means accessing the 6th element
  // from the top of the stack. Here, -1 would refer to
  // the topmost element, -2 would refer to the element below it,
  // and so on.
  //
  accessAt(position = -1) {
    if (position > 0 || Math.abs(position) > this.stack.length) {
      throw new Error("Invalid index");
    }
    const value = this.stack[this.stack.length + position];
    this.emit("accessAt", { stack: this.stack.slice(), value, position });
    return value;
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }

  // Get the size of the stack
  size() {
    return this.stack.length;
  }

  // Clear the stack
  clear() {
    this.stack = [];
  }

  // Print the stack elements
  printStack() {
    console.log(this.stack.join(" "));
  }
}
