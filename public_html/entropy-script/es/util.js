import{Node}from"./nodes.js";import{ESPrimitive}from"./primitiveTypes.js";export function deepClone(e,t=new WeakMap){if(Object(e)!==e||e instanceof Function)return e;if(t.has(e))return t.get(e);try{var r=new e.constructor}catch(t){r=Object.create(Object.getPrototypeOf(e))}return e instanceof Map?Array.from(e,(([e,n])=>r.set(deepClone(e,t),deepClone(n,t)))):e instanceof Set&&Array.from(e,(e=>r.add(deepClone(e,t)))),t.set(e,r),Object.assign(r,...Object.keys(e).map((r=>({[r]:deepClone(e[r],t)}))))}export function str(e,t=0){if("string"==typeof e)return e;if(t>20)return"...";let r="";if(void 0===e)return"undefined";if(e instanceof ESPrimitive)return e.str().valueOf();if(e instanceof Node)return`<RunTimeNode: ${e.constructor.name}>`;switch(typeof e){case"object":if(Array.isArray(e)){r+="[";for(let n of e)try{r+=str(n,t+1)+", "}catch(e){r+="<large property>, "}e.length&&(r=r.substring(0,r.length-2)),r+="]"}else{try{r+=e.constructor.name}catch(e){r+="UNKNOWN_CONSTRUCTOR"}r+=": {\n";let n=0;for(let o in e)n++,e.hasOwnProperty&&e.hasOwnProperty(o)&&(["this","this_","constructor","self"].includes(o)||(r+=`  ${o}: ${str(e[o],t+1)||""}, \n`));n>0&&(r=r.substring(0,r.length-3)),r+="\n}\n"}break;case"string":r=`'${e}'`;break;case"bigint":case"number":case"boolean":r=`${e}`;break;case"undefined":r="<NativeUndefined>";break;case"function":r=`<NativeFunction ${e.name}>`}return r}export const sleep=e=>new Promise((t=>setTimeout(t,e)));