import {readFileSync,existsSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
export function websiteLoader(mocks:Record<string,unknown>={},env:Record<string,string>={},globals:Record<string,unknown>={}){
 const native=createRequire(import.meta.url),cache=new Map<string,Record<string,unknown>>();
 function load(file:string):Record<string,unknown>{
  file=resolve(file);if(cache.has(file))return cache.get(file)!;const module={exports:{} as Record<string,unknown>};cache.set(file,module.exports);
  function dependency(key:string):unknown{
   if(key in mocks)return mocks[key];if(key==='server-only'||key.endsWith('.css'))return {};
   let target=key.startsWith('@/')?resolve('src',key.slice(2)):key.startsWith('.')?resolve(dirname(file),key):null;
   if(target){if(!existsSync(target))target+=existsSync(target+'.ts')?'.ts':'.tsx';return load(target);}
   return native(key);
  }
  const code=ts.transpileModule(readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
  runInNewContext(code,{module,exports:module.exports,require:dependency,process:{env},URL,URLSearchParams,AbortSignal,Buffer,Date,Response,Request,Headers,fetch:()=>{throw Error('Ambient network prohibited');},...globals});return module.exports;
 }
 return load;
}
