const instructions = {
  0x01: "load_word",
  0x02: "store_word",
  0x03: "add",
  0x04: "sub",
  0xff: "halt"
};

function main(memory) {
  let registers = {
    0x00: 0,
    0x01: 0,
    0x02: 0
  };

  let halted = false;

  while (!halted) {
    //fetch
    let pc = registers[0x00];
    let opcode = memory[pc];

    //decode
    switch (instructions[opcode]) {
      case "load_word":
        break;

      case "add":
        //read two more memory slots for arg
        let arg1 = memory[pc + 1];
        let arg2 = memory[pc + 2];
        //arg 1 += arg 2
        registers[arg1] += registers[arg2];
        //increment reg 0 by 3
        registers[0x00] += 3;
        break;

      case "halt":
        halted = true;
        break;
    }

    //execute
  }
}
