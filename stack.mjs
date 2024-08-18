// stack.js
export class Stack {
  constructor() {
    this.items = []; // Initialize an empty array to store stack elements
  }

  // Push an element onto the stack
  push(element) {
    this.items.push(element);
  }

  // Pop an element off the stack (removes the last element)
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Peek at the top element of the stack without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size() {
    return this.items.length;
  }

  // Clear the stack
  clear() {
    this.items = [];
  }

  // Print the stack elements
  printStack() {
    console.log(this.items.join(" "));
  }
}
