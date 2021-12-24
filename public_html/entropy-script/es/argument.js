import{ESPrimitive,ESType}from"./primitiveTypes.js";import{TypeError}from"./errors.js";import{Position}from"./position.js";export function interpretArgument(r,e){var t;let i;const n=r.type.interpret(e);if(n.error)return n.error;if(!(n.val instanceof ESType))return new TypeError(Position.unknown,"Type",typeof n.val,n.val,"Argument can't be undefined");let o;if(i=n.val,r.defaultValue){let i=null===(t=r.defaultValue)||void 0===t?void 0:t.interpret(e);if(i.error)return i.error;i.val instanceof ESPrimitive&&(o=i.val)}return{name:r.name,type:i,defaultValue:o}}