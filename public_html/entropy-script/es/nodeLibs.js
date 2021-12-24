import{global}from"./constants.js";import{Context}from"./context.js";import{ESError}from"./errors.js";import{ESFunction,ESObject,ESString,types}from"./primitiveTypes.js";function addNodeLibs(e,t,o,n){global.set("nodeHTTPS",e),global.set("nodeHTTP",t),global.set("https",new ESObject({createServer:new ESFunction(((o,n)=>{let r=o.valueOf(),l=n.valueOf();r=Object.assign({port:3e3,secure:!1,debug:!1},r);const s=(e,t)=>{r.corsOrigin&&t.setHeader("Access-Control-Allow-Origin",r.corsOrigin);const o=e.url||"/";if(r.debug&&console.log(`Got request at ${o}`),l.hasOwnProperty(o)){let n="";e.on("data",(e=>{n+=e})),e.on("end",(()=>{t.writeHead(200);let s={};try{s=JSON.parse(null!=n?n:"{}")}catch(t){return void console.log(`Error parsing JSON data from URL ${e.url} with JSON ${n}: ${t}`)}const i=l[o];if(!i)return void console.error(`Not handler found for url '${o}'`);const a=new Context;a.parent=global,a.set("body",new ESObject(s));const c=i.__call__([],a);if(c instanceof ESError)return void console.log(c.str);let u="";try{-1!==["String","Number"].indexOf(c.typeOf().valueOf())&&(c.val={value:c.val}),u=JSON.stringify(c)}catch(e){return console.log(`Incorrect return value for handler of ${o}. Must be JSONifyable.`),void(r.debug&&console.log(`Detail: Expected type (object|undefined) but got value ${c.valueOf()} of type ${c.typeOf()}`))}r.debug&&console.log(`Response: ${u}`),t.end(u)}))}else t.writeHead(404),t.end("{}")};if(r.secure){const t=e.createServer({key:r.key,cert:r.cert},s);r.hostname?t.listen(r.port,r.hostname,(()=>{console.log(`Server running at https://${r.hostname}:${r.port}`)})):t.listen(r.port,(()=>{console.log(`Server running on port ${r.port}`)}))}else t.createServer(s).listen(r.port,r.hostname,(()=>{console.log(`Server running at http://${r.hostname}:${r.port}`)}))}))})),global.set("open",new ESFunction(((e,t)=>{const n=e.valueOf(),r=(null==t?void 0:t.valueOf())||"utf-8";return new ESObject({str:new ESFunction((()=>new ESString(o.readFileSync(n,r))),[],"str",void 0,types.string),write:new ESFunction((e=>{o.writeFileSync(n,e.str().valueOf())})),append:new ESFunction((e=>{o.appendFileSync(n,e.str().valueOf())}))})}))),global.set("mysql",new ESFunction((e=>{const t=e.valueOf(),o=new n(t);return new ESFunction((e=>o.query(e.valueOf())),[],"queryMySQL")})))}export default addNodeLibs;