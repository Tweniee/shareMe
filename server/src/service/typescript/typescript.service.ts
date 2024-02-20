import ts from 'typescript';
import { runVmCode } from '../vm.server';

export const compileTypescriptCode = (sourceCode:string,options?: any) => {
  // Compile the TypeScript code
  const result = ts.transpileModule(sourceCode, {
    compilerOptions: options || {},
  });
  runVmCode(result.outputText)
  return result.outputText;
};
