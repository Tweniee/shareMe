import { VM } from 'vm2';

export const runVmCode = (code: string) => {
  // Create a new VM instance
  const vm: any = new VM({
    sandbox: {
      console: {
        log: (output: string) => {
          // Instead of logging to console, store the output in a variable
          vm.output = (vm.output || '') + output + '\n';
        },
      },
    },
  });
  try {
    // Execute the code in a sandboxed environment
    vm.run(code);

    // Send the captured output back as the result
    const result = vm.output || 'No output';
    console.log(result);
    return result
  } catch (error) {
    console.log(error);
  }
};
