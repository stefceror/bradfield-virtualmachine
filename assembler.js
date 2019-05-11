const instructions = {
  load_word: 0x01,
  store_word: 0x02,
  add: 0x03,
  sub: 0x04,
  halt: 0xff
};

const locations = {
  r1: 0x01,
  r2: 0x10,
  input1: 0x10,
  input2: 0x12,
  output: 0x0e
};

function assemble(inputProgram) {
  let program = [];
  program = inputProgram.map(instruction => {
    return instructions[instruction] || locations[instruction];
  });
  return program;
}

const sampleProgram = [
  "load_word",
  "r1",
  "input1",
  "load_word",
  "r2",
  "input2",
  "add",
  "r1",
  "r2",
  "store_word",
  "r1",
  "output",
  "halt"
];
