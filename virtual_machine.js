const instructions = {
  0x01: "load_word",
  0x02: "store_word",
  0x03: "add",
  0x04: "subtract",
  0xff: "halt"
};

function main(memory) {
  let registers = {
    0x00: 0,
    0x01: 513,
    0x02: 0
  };

  let halted = false;

  while (!halted) {
    console.log("registers:", registers, "memory:", memory);
    //fetch
    let pc = registers[0x00];
    let opcode = memory[pc];

    //decode
    let arg1, arg2;
    switch (instructions[opcode]) {
      case "load_word":
        //read arg 1 for destination
        arg1 = memory[pc + 1];
        //read arg 2 for source
        arg2 = memory[pc + 2];
        // do endianness
        //assign source value to destination
        registers[arg1] = memory[arg2 + 1] * 256 + memory[arg2];

        //increment pc by 3
        registers[0x00] += 3;
        break;

      case "store_word":
        //read arg 1 for source
        arg1 = memory[pc + 1];
        //read arg 2 for destination
        arg2 = memory[pc + 2];
        //do endianness
        let a = registers[arg1] % 256;
        let b = Math.floor(registers[arg1] / 256);
        //assign source value to destination
        memory[arg2] = a;
        memory[arg2 + 1] = b;

        //increment pc by 3
        registers[0x00] += 3;
        break;

      case "add":
        //read two more memory slots for arg
        arg1 = memory[pc + 1];
        arg2 = memory[pc + 2];
        //arg 1 += arg 2
        registers[arg1] += registers[arg2];
        //increment reg 0 by 3
        registers[0x00] += 3;
        break;

      case "subtract":
        //read two more memory slots for arg
        arg1 = memory[pc + 1];
        arg2 = memory[pc + 2];
        //arg 1 -= arg 2
        registers[arg1] -= registers[arg2];
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

let testMemory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let program = [
  0x01,
  0x01,
  0x10,
  0x01,
  0x02,
  0x12,
  0x03,
  0x01,
  0x02,
  0x02,
  0x01,
  0x0e,
  0xff,
  0x00,
  0x00,
  0x00,
  0xa1,
  0x14,
  0x0c,
  0x00
];

main(program);
