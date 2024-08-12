function getOpcodeType(opcode) {
    const constants = [
        'OP_0', 'OP_FALSE', 'OP_PUSHDATA1', 'OP_PUSHDATA2', 'OP_PUSHDATA4', 'OP_1NEGATE',
        'OP_1', 'OP_TRUE', 'OP_2', 'OP_3', 'OP_4', 'OP_5', 'OP_6', 'OP_7', 'OP_8', 'OP_9', 'OP_10',
        'OP_11', 'OP_12', 'OP_13', 'OP_14', 'OP_15', 'OP_16'
    ];

    const flowControl = [
        'OP_NOP', 'OP_IF', 'OP_NOTIF', 'OP_ELSE', 'OP_ENDIF', 'OP_VERIFY', 'OP_RETURN'
    ];

    const stackOpcode = [ // Renamed from 'stack' to 'stackOpcode'
        'OP_TOALTSTACK', 'OP_FROMALTSTACK', 'OP_IFDUP', 'OP_DEPTH', 'OP_DROP', 'OP_DUP', 
        'OP_NIP', 'OP_OVER', 'OP_PICK', 'OP_ROLL', 'OP_ROT', 'OP_SWAP', 'OP_TUCK', 
        'OP_2DROP', 'OP_2DUP', 'OP_3DUP', 'OP_2OVER', 'OP_2ROT', 'OP_2SWAP'
    ];

    const splice = [
        'OP_CAT', 'OP_SUBSTR', 'OP_LEFT', 'OP_RIGHT', 'OP_SIZE'
    ];

    const bitwise = [
        'OP_INVERT', 'OP_AND', 'OP_OR', 'OP_XOR', 'OP_EQUAL', 'OP_EQUALVERIFY'
    ];

    const arithmetic = [
        'OP_1ADD', 'OP_1SUB', 'OP_2MUL', 'OP_2DIV', 'OP_NEGATE', 'OP_ABS', 'OP_NOT', 
        'OP_0NOTEQUAL', 'OP_ADD', 'OP_SUB', 'OP_MUL', 'OP_DIV', 'OP_MOD', 'OP_LSHIFT', 
        'OP_RSHIFT', 'OP_BOOLAND', 'OP_BOOLOR', 'OP_NUMEQUAL', 'OP_NUMEQUALVERIFY', 
        'OP_NUMNOTEQUAL', 'OP_LESSTHAN', 'OP_GREATERTHAN', 'OP_LESSTHANOREQUAL', 
        'OP_GREATERTHANOREQUAL', 'OP_MIN', 'OP_MAX', 'OP_WITHIN'
    ];

    const crypto = [
        'OP_RIPEMD160', 'OP_SHA1', 'OP_SHA256', 'OP_HASH160', 'OP_HASH256', 
        'OP_CODESEPARATOR', 'OP_CHECKSIG', 'OP_CHECKSIGVERIFY', 'OP_CHECKMULTISIG', 
        'OP_CHECKMULTISIGVERIFY', 'OP_CHECKSIGADD'
    ];

    const locktime = [
        'OP_CHECKLOCKTIMEVERIFY', 'OP_CHECKSEQUENCEVERIFY'
    ];

    const keys = [
        'pk(A)', 'pk(B)', 'pk(C)', 'pk(D)', 'pk(E)' // Example public keys
    ];

    if (constants.includes(opcode)) return 'constants';
    if (flowControl.includes(opcode)) return 'flow-control';
    if (stackOpcode.includes(opcode)) return 'stack-opcode'; // Use 'stack-opcode'
    if (splice.includes(opcode)) return 'splice';
    if (bitwise.includes(opcode)) return 'bitwise';
    if (arithmetic.includes(opcode)) return 'arithmetic';
    if (crypto.includes(opcode)) return 'crypto';
    if (locktime.includes(opcode)) return 'locktime';
    if (keys.includes(opcode)) return 'keys';
    return 'unknown'; // Default case
}

function updateFooter() {
    const footer = document.querySelector('.footer');
    footer.innerHTML = ''; // Clear previous labels

    // List of all possible types
    const allTypes = [
        'constants', 'flow-control', 'stack-opcode', 'splice', // Updated from 'stack' to 'stack-opcode'
        'bitwise', 'arithmetic', 'crypto', 'locktime', 'keys'
    ];

    // Create a label for each type
    allTypes.forEach(type => {
        const label = document.createElement('div');
        label.classList.add('label', type);
        label.innerText = type.replace('-', ' '); // Replace hyphens with spaces for readability
        footer.appendChild(label);
    });
}


function animateOpcodes(opcodeString) {
    const myStack = new Stack();

    const opcodes = opcodeString.split(' ');
    const scriptContainer = document.querySelector('.script-container');
    const stackContainer = document.querySelector('.stack-container');
    
    const opcodeTypes = [];

    // Clear previous elements
    scriptContainer.innerHTML = '';
    stackContainer.innerHTML = '';

    opcodes.forEach((opcode, index) => {
        const type = getOpcodeType(opcode);
        opcodeTypes.push(type);

        const step = document.createElement('div');
        step.classList.add('step', `step${index + 1}`, type);
        step.style.setProperty('--y-offset', `calc(var(--container-height) * ${index-1} - var(--container-height))`);
        step.style.animationDelay = `${index * 2}s`;
        step.innerText = opcode;

        const stack = document.createElement('div');
        stack.classList.add('stack', `stack${index + 1}`, type);
        stack.innerText = opcode;
        stack.style.animation = `stackAppear 2s ${(index + 1) * 2}s forwards`;

        scriptContainer.appendChild(step);
        stackContainer.appendChild(stack);
        myStack.push(opcode); 
    });
    myStack.printStack()
}
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the footer with all possible types
    updateFooter();

    // Example usage:
    animateOpcodes('OP_DUP OP_HASH160 OP_EQUAL OP_CHECKSIG OP_VERIFY OP_0 OP_CAT OP_ADD pk(A)');
});

