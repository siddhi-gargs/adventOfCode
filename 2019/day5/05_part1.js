import { input } from "./input.js";

const addOperation = (a, b) => a + b;
const mulOperation = (a, b) => a * b;

const handleInput = (intCode, loc) => {
  const userChoice = +prompt();
  const nextIndex = loc + 1;
  const address = intCode[nextIndex];
  intCode[address] = userChoice;

  return loc + 2;
};

const handleImediateOutputMode = (intCode, loc, modes) => {
  const mode = modes.at(-1);
  const nextIndex = loc + 1;
  const address = intCode[nextIndex];
  const valueShouldCome = +mode ? address : intCode[address];
  console.log(valueShouldCome);

  return loc + 2;
};

const addAndSubOnModes = (intCode, loc, modes, command) => {
  const [srcIn1, srcIn2, desIn] = [loc + 1, loc + 2, loc + 3];
  const [val1, val2, dest] = [intCode[srcIn1], intCode[srcIn2], intCode[desIn]];

  const [src2, src1] = [...modes];
  const actualvalueOfsrc1 = +src1 ? val1 : intCode[val1];
  const actualvalueOfsrc2 = +src2 ? val2 : intCode[val2];

  const decideOperation = command === 1 ? addOperation : mulOperation;
  intCode[dest] = decideOperation(actualvalueOfsrc1, actualvalueOfsrc2);

  return loc + 4;
};

const processInstructionWithModes = (intCode, loc, func, opCode, modes) => {
  // console.log("what is coming as function", func, "opcode", opCode);
  return func(intCode, loc, modes, opCode);
};

const executeInstruction = (command, intCode, loc) => {
  const addModesInCommand = command.toString().padStart(4, "0");
  const opCode = Number(addModesInCommand.slice(-2));
  const modes = addModesInCommand.slice(0, 2);

  const arrayOfOpCode = [
    addAndSubOnModes,
    addAndSubOnModes,
    handleInput,
    handleImediateOutputMode,
  ];

  return processInstructionWithModes(
    intCode,
    loc,
    arrayOfOpCode[opCode - 1],
    opCode,
    modes
  );
};

const runProgram = (input) => {
  const program = input;

  let location = 0;
  while (program[location] !== 99 || location > program.length) {
    location = executeInstruction(program[location], program, location);
  }

  return program;
};

// console.log(runProgram([1002, 4, 3, 4, 33]));
console.log(runProgram(input));

// console.log(runProgram([1, 3, 0, 3, 3, 2, 99]));
// console.log(runProgram([3, 4, 2, 4, 0, 3, 4, 3, 99]));
// console.log(runProgram([3, 4, 2, 4, 0, 3, 99]));
// console.log(runProgram([104, 4, 99]));

// console.log(runProgram([1002, 2, 4, 0, 99]));
