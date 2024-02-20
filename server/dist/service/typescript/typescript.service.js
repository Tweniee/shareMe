"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTypescriptCode = void 0;
var typescript_1 = __importDefault(require("typescript"));
var vm_server_1 = require("../vm.server");
var compileTypescriptCode = function (sourceCode, options) {
    // Compile the TypeScript code
    var result = typescript_1.default.transpileModule(sourceCode, {
        compilerOptions: options || {},
    });
    (0, vm_server_1.runVmCode)(result.outputText);
    return result.outputText;
};
exports.compileTypescriptCode = compileTypescriptCode;
