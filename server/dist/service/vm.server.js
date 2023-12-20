"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runVmCode = void 0;
var vm2_1 = require("vm2");
var runVmCode = function (code) {
    // Create a new VM instance
    var vm = new vm2_1.VM({
        sandbox: {
            console: {
                log: function (output) {
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
        var result = vm.output || 'No output';
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
};
exports.runVmCode = runVmCode;
