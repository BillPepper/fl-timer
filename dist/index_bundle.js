!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.getElementById("timerDisplayNumber"),r=(document.getElementById("minmin"),document.getElementById("minpls"),document.getElementById("dispMin")),o=(document.getElementById("secmin"),document.getElementById("secpls"),document.getElementById("dispSec")),l=document.getElementById("timerSettings"),i=document.getElementById("triggerButton");let u=0,c=!1,a=null,s=null;const d=e=>e.toString().padStart(2,"0"),m=e=>{const t=Math.floor(e/60),r=e-60*t;n.innerText=`${d(t)}:${d(r)}`},p=()=>{c?v():g()},f=()=>{clearInterval(s),n.innerText="Done!",a=setInterval(()=>{document.querySelector("body").classList.toggle("negative")},1e3)},g=()=>{u=parseInt(o.value)+60*parseInt(r.value),l.classList.add("in"),i.innerText="Stop",c=!0,m(u),s=setInterval(()=>(u--,m(u),void(u<1&&f())),1e3)},v=()=>{l.classList.remove("in"),i.innerText="Start",c=!1,n.innerText="Stop!",clearInterval(a),clearInterval(s),document.querySelector("body").classList.remove("negative"),console.log(timer)};document.addEventListener("click",e=>(e=>{switch(e){case"minmin":dispMin.value>0&&r.value--;break;case"minpls":r.value++;break;case"secmin":dispSec.value>0&&o.value--;break;case"secpls":o.value++;break;case"triggerButton":p()}})(e.target.id))}]);