function animateOpcodes(opcodeString) {
    const opcodes = opcodeString.split(' ');
    const scriptContainer = document.querySelector('.script-container');
    const stackContainer = document.querySelector('.stack-container');

    // Clear previous elements
    scriptContainer.innerHTML = '';
    stackContainer.innerHTML = '';

    opcodes.forEach((opcode, index) => {
        const step = document.createElement('div');
        step.classList.add('step', `step${index + 1}`);
        step.style.setProperty('--y-offset', `calc(var(--container-height) * ${index} - var(--container-height))`);
        step.style.animationDelay = `${index * 2}s`; // Adjust delay for each step
        step.innerText = opcode;

        const stack = document.createElement('div');
        stack.classList.add('stack', `stack${index + 1}`);
        stack.innerText = opcode;
        stack.style.animation = `stackAppear 2s ${(index + 1) * 2}s forwards`;

        scriptContainer.appendChild(step);
        stackContainer.appendChild(stack);
    });
}

// Function to trigger the animation when the button is clicked
function triggerAnimation() {
    const opcodeInput = document.getElementById('opcodeInput').value;
    animateOpcodes(opcodeInput);
}

