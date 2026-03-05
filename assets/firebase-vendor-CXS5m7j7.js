var e={};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=63&s|128):55296==(64512&s)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(s=65536+((1023&s)<<10)+(1023&e.charCodeAt(++r)),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=63&s|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=63&s|128)}return t},n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const t=e[s],i=s+1<e.length,o=i?e[s+1]:0,a=s+2<e.length,c=a?e[s+2]:0,u=t>>2,h=(3&t)<<4|o>>4;let l=(15&o)<<2|c>>6,d=63&c;a||(d=64,i||(l=64)),r.push(n[u],n[h],n[l],n[d])}return r.join("")},encodeString(e,n){return this.HAS_NATIVE_SUPPORT&&!n?btoa(e):this.encodeByteArray(t(e),n)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((31&s)<<6|63&i)}else if(s>239&&s<365){const i=((7&s)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[r++]=String.fromCharCode(55296+(i>>10)),t[r++]=String.fromCharCode(56320+(1023&i))}else{const i=e[n++],o=e[n++];t[r++]=String.fromCharCode((15&s)<<12|(63&i)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<e.length;){const t=n[e.charAt(i++)],o=i<e.length?n[e.charAt(i)]:0;++i;const a=i<e.length?n[e.charAt(i)]:64;++i;const c=i<e.length?n[e.charAt(i)]:64;if(++i,null==t||null==o||null==a||null==c)throw new r;const u=t<<2|o>>4;if(s.push(u),64!==a){const e=o<<4&240|a>>2;if(s.push(e),64!==c){const e=a<<6&192|c;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class r extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const s=function(e){return function(e){const r=t(e);return n.encodeByteArray(r,!0)}(e).replace(/\./g,"")},i=function(e){try{return n.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const o=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,a=()=>{try{return o()||(()=>{if("undefined"==typeof process)return;const t=e.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(n){return}const t=e&&i(e[1]);return t&&JSON.parse(t)})()}catch(t){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`)}},c=e=>{var t,n;return null==(n=null==(t=a())?void 0:t.emulatorHosts)?void 0:n[e]},u=()=>{var e;return null==(e=a())?void 0:e.config},h=e=>{var t;return null==(t=a())?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class l{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch(()=>{}),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function f(e){return(await fetch(e,{credentials:"include"})).ok}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p={};let m=!1;function g(e,t){if("undefined"==typeof window||"undefined"==typeof document||!d(window.location.host)||p[e]===t||p[e]||m)return;function n(e){return`__firebase__banner__${e}`}p[e]=t;const r="__firebase__banner",s=function(){const e={prod:[],emulator:[]};for(const t of Object.keys(p))p[t]?e.emulator.push(t):e.prod.push(t);return e}().prod.length>0;function i(){const e=document.createElement("span");return e.style.cursor="pointer",e.style.marginLeft="16px",e.style.fontSize="24px",e.innerHTML=" &times;",e.onclick=()=>{m=!0,function(){const e=document.getElementById(r);e&&e.remove()}()},e}function o(){const e=function(e){let t=document.getElementById(e),n=!1;return t||(t=document.createElement("div"),t.setAttribute("id",e),n=!0),{created:n,element:t}}(r),t=n("text"),o=document.getElementById(t)||document.createElement("span"),a=n("learnmore"),c=document.getElementById(a)||document.createElement("a"),u=n("preprendIcon"),h=document.getElementById(u)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(e.created){const t=e.element;!function(e){e.style.display="flex",e.style.background="#7faaf0",e.style.position="fixed",e.style.bottom="5px",e.style.left="5px",e.style.padding=".5em",e.style.borderRadius="5px",e.style.alignItems="center"}(t),function(e,t){e.setAttribute("id",t),e.innerText="Learn more",e.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",e.setAttribute("target","__blank"),e.style.paddingLeft="5px",e.style.textDecoration="underline"}(c,a);const n=i();!function(e,t){e.setAttribute("width","24"),e.setAttribute("id",t),e.setAttribute("height","24"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("fill","none"),e.style.marginLeft="-6px"}(h,u),t.append(h,o,c,n),document.body.appendChild(t)}s?(o.innerText="Preview backend disconnected.",h.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(h.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',o.innerText="Preview backend running in this workspace."),o.setAttribute("id",t)}"loading"===document.readyState?window.addEventListener("DOMContentLoaded",o):o()}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function v(){return!function(){var e;const t=null==(e=a())?void 0:e.forceEnvironment;if("node"===t)return!0;if("browser"===t)return!1;try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(n){return!1}}()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}class w extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,w.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_.prototype.create)}}class _{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],i=s?function(e,t){return e.replace(E,(e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`})}(s,n):"Error",o=`${this.serviceName}: ${i} (${r}).`;return new w(r,o,n)}}const E=/\{\$([^}]+)}/g;function T(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const n=e[s],i=t[s];if(I(n)&&I(i)){if(!T(n,i))return!1}else if(n!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function I(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function S(e){const t={};return e.replace(/^\?/,"").split("&").forEach(e=>{if(e){const[n,r]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(r)}}),t}function C(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}class A{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let r;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=k),void 0===r.error&&(r.error=k),void 0===r.complete&&(r.complete=k);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(e){}}),this.observers.push(r),s}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(n){"undefined"!=typeof console&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function k(){}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N(e){return e&&e._delegate?e._delegate:e}class R{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new l;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(n){}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=(null==e?void 0:e.optional)??!1;if(!this.isInitialized(t)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(n)return null;throw r}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:D})}catch(t){}for(const[e,n]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});n.resolve(e)}catch(t){}}}}clearInstance(e=D){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return null!=this.component}isInitialized(e=D){return this.instances.has(e)}getOptions(e=D){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,i]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(s)&&i.resolve(r)}return r}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(n)??new Set;r.add(e),this.onInitCallbacks.set(n,r);const s=this.instances.get(n);return s&&e(s,n),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const r of n)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=e,r===D?void 0:r),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}var r;return n||null}normalizeInstanceIdentifier(e=D){return this.component?this.component.multipleInstances?e:D:e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class P{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new O(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L,M;(M=L||(L={}))[M.DEBUG=0]="DEBUG",M[M.VERBOSE=1]="VERBOSE",M[M.INFO=2]="INFO",M[M.WARN=3]="WARN",M[M.ERROR=4]="ERROR",M[M.SILENT=5]="SILENT";const x={debug:L.DEBUG,verbose:L.VERBOSE,info:L.INFO,warn:L.WARN,error:L.ERROR,silent:L.SILENT},V=L.INFO,U={[L.DEBUG]:"log",[L.VERBOSE]:"log",[L.INFO]:"info",[L.WARN]:"warn",[L.ERROR]:"error"},F=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),s=U[t];if(!s)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[s](`[${r}]  ${e.name}:`,...n)};class j{constructor(e){this.name=e,this._logLevel=V,this._logHandler=F,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in L))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?x[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,L.DEBUG,...e),this._logHandler(this,L.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,L.VERBOSE,...e),this._logHandler(this,L.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,L.INFO,...e),this._logHandler(this,L.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,L.WARN,...e),this._logHandler(this,L.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,L.ERROR,...e),this._logHandler(this,L.ERROR,...e)}}let B,q;const z=new WeakMap,$=new WeakMap,H=new WeakMap,G=new WeakMap,K=new WeakMap;let W={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return $.get(e);if("objectStoreNames"===t)return e.objectStoreNames||H.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return J(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function Q(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(q||(q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(Y(this),t),J(z.get(this))}:function(...t){return J(e.apply(Y(this),t))}:function(t,...n){const r=e.call(Y(this),t,...n);return H.set(r,t.sort?t.sort():[t]),J(r)}}function X(e){return"function"==typeof e?Q(e):(e instanceof IDBTransaction&&function(e){if($.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",i),e.removeEventListener("abort",i)},s=()=>{t(),r()},i=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",s),e.addEventListener("error",i),e.addEventListener("abort",i)});$.set(e,t)}(e),t=e,(B||(B=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(e=>t instanceof e)?new Proxy(e,W):e);var t}function J(e){if(e instanceof IDBRequest)return function(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",s),e.removeEventListener("error",i)},s=()=>{t(J(e.result)),r()},i=()=>{n(e.error),r()};e.addEventListener("success",s),e.addEventListener("error",i)});return t.then(t=>{t instanceof IDBCursor&&z.set(t,e)}).catch(()=>{}),K.set(t,e),t}(e);if(G.has(e))return G.get(e);const t=X(e);return t!==e&&(G.set(e,t),K.set(t,e)),t}const Y=e=>K.get(e);const Z=["get","getKey","getAll","getAllKeys","count"],ee=["put","add","delete","clear"],te=new Map;function ne(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(te.get(t))return te.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=ee.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!s&&!Z.includes(n))return;const i=async function(e,...t){const i=this.transaction(e,s?"readwrite":"readonly");let o=i.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),s&&i.done]))[0]};return te.set(t,i),i}W=(e=>({...e,get:(t,n,r)=>ne(t,n)||e.get(t,n,r),has:(t,n)=>!!ne(t,n)||e.has(t,n)}))(W);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class re{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null}).filter(e=>e).join(" ")}}const se="@firebase/app",ie="0.14.6",oe=new j("@firebase/app"),ae="@firebase/app-compat",ce="@firebase/analytics-compat",ue="@firebase/analytics",he="@firebase/app-check-compat",le="@firebase/app-check",de="@firebase/auth",fe="@firebase/auth-compat",pe="@firebase/database",me="@firebase/data-connect",ge="@firebase/database-compat",ye="@firebase/functions",ve="@firebase/functions-compat",we="@firebase/installations",_e="@firebase/installations-compat",Ee="@firebase/messaging",Te="@firebase/messaging-compat",Ie="@firebase/performance",be="@firebase/performance-compat",Se="@firebase/remote-config",Ce="@firebase/remote-config-compat",Ae="@firebase/storage",ke="@firebase/storage-compat",Ne="@firebase/firestore",Re="@firebase/ai",De="@firebase/firestore-compat",Oe="firebase",Pe="[DEFAULT]",Le={[se]:"fire-core",[ae]:"fire-core-compat",[ue]:"fire-analytics",[ce]:"fire-analytics-compat",[le]:"fire-app-check",[he]:"fire-app-check-compat",[de]:"fire-auth",[fe]:"fire-auth-compat",[pe]:"fire-rtdb",[me]:"fire-data-connect",[ge]:"fire-rtdb-compat",[ye]:"fire-fn",[ve]:"fire-fn-compat",[we]:"fire-iid",[_e]:"fire-iid-compat",[Ee]:"fire-fcm",[Te]:"fire-fcm-compat",[Ie]:"fire-perf",[be]:"fire-perf-compat",[Se]:"fire-rc",[Ce]:"fire-rc-compat",[Ae]:"fire-gcs",[ke]:"fire-gcs-compat",[Ne]:"fire-fst",[De]:"fire-fst-compat",[Re]:"fire-vertex","fire-js":"fire-js",[Oe]:"fire-js-all"},Me=new Map,xe=new Map,Ve=new Map;function Ue(e,t){try{e.container.addComponent(t)}catch(n){oe.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Fe(e){const t=e.name;if(Ve.has(t))return oe.debug(`There were multiple attempts to register component ${t}.`),!1;Ve.set(t,e);for(const n of Me.values())Ue(n,e);for(const n of xe.values())Ue(n,e);return!0}function je(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Be(e){return null!=e&&void 0!==e.settings}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new _("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ze{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new R("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw qe.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $e="12.6.0";function He(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const r={name:Pe,automaticDataCollectionEnabled:!0,...t},s=r.name;if("string"!=typeof s||!s)throw qe.create("bad-app-name",{appName:String(s)});if(n||(n=u()),!n)throw qe.create("no-options");const i=Me.get(s);if(i){if(T(n,i.options)&&T(r,i.config))return i;throw qe.create("duplicate-app",{appName:s})}const o=new P(s);for(const c of Ve.values())o.addComponent(c);const a=new ze(n,r,o);return Me.set(s,a),a}function Ge(e=Pe){const t=Me.get(e);if(!t&&e===Pe&&u())return He();if(!t)throw qe.create("no-app",{appName:e});return t}function Ke(e,t,n){let r=Le[e]??e;n&&(r+=`-${n}`);const s=r.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const e=[`Unable to register library "${r}" with version "${t}":`];return s&&e.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&e.push("and"),i&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void oe.warn(e.join(" "))}Fe(new R(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We="firebase-heartbeat-store";let Qe=null;function Xe(){return Qe||(Qe=function(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(e,t),a=J(o);return r&&o.addEventListener("upgradeneeded",e=>{r(J(o.result),e.oldVersion,e.newVersion,J(o.transaction),e)}),n&&o.addEventListener("blocked",e=>n(e.oldVersion,e.newVersion,e)),a.then(e=>{i&&e.addEventListener("close",()=>i()),s&&e.addEventListener("versionchange",e=>s(e.oldVersion,e.newVersion,e))}).catch(()=>{}),a}("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)try{e.createObjectStore(We)}catch(n){console.warn(n)}}}).catch(e=>{throw qe.create("idb-open",{originalErrorMessage:e.message})})),Qe}async function Je(e,t){try{const n=(await Xe()).transaction(We,"readwrite"),r=n.objectStore(We);await r.put(t,Ye(e)),await n.done}catch(n){if(n instanceof w)oe.warn(n.message);else{const e=qe.create("idb-set",{originalErrorMessage:null==n?void 0:n.message});oe.warn(e.message)}}}function Ye(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new tt(t),this._heartbeatsCachePromise=this._storage.read().then(e=>(this._heartbeatsCache=e,e))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=et();if(null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)&&(this._heartbeatsCache=await this._heartbeatsCachePromise,null==(null==(t=this._heartbeatsCache)?void 0:t.heartbeats)))return;if(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(e=>e.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>30){const e=function(e){if(0===e.length)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(e,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){oe.warn(n)}}async getHeartbeatsHeader(){var e;try{if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null==(null==(e=this._heartbeatsCache)?void 0:e.heartbeats)||0===this._heartbeatsCache.heartbeats.length)return"";const t=et(),{heartbeatsToSend:n,unsentEntries:r}=function(e,t=1024){const n=[];let r=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(e){if(e.dates.push(s.date),nt(n)>t){e.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),nt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),i=s(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return oe.warn(t),""}}}function et(){return(new Date).toISOString().substring(0,10)}class tt{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!function(){try{return"object"==typeof indexedDB}catch(e){return!1}}()&&new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var e;t((null==(e=s.error)?void 0:e.message)||"")}}catch(n){t(n)}}).then(()=>!0).catch(()=>!1)}async read(){if(await this._canUseIndexedDBPromise){const e=await async function(e){try{const t=(await Xe()).transaction(We),n=await t.objectStore(We).get(Ye(e));return await t.done,n}catch(t){if(t instanceof w)oe.warn(t.message);else{const e=qe.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});oe.warn(e.message)}}}(this.app);return(null==e?void 0:e.heartbeats)?e:{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Je(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){if(await this._canUseIndexedDBPromise){const t=await this.read();return Je(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??t.lastSentHeartbeatDate,heartbeats:[...t.heartbeats,...e.heartbeats]})}}}function nt(e){return s(JSON.stringify({version:2,heartbeats:e})).length}var rt;function st(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}rt="",Fe(new R("platform-logger",e=>new re(e),"PRIVATE")),Fe(new R("heartbeat",e=>new Ze(e),"PRIVATE")),Ke(se,ie,rt),Ke(se,ie,"esm2020"),Ke("fire-js","");const it=st,ot=new _("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),at=new j("@firebase/auth");function ct(e,...t){at.logLevel<=L.ERROR&&at.error(`Auth (${$e}): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(e,...t){throw ft(e,...t)}function ht(e,...t){return ft(e,...t)}function lt(e,t,n){const r={...it(),[t]:n};return new _("auth","Firebase",r).create(t,{appName:e.name})}function dt(e){return lt(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ft(e,...t){if("string"!=typeof e){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return ot.create(e,...t)}function pt(e,t,...n){if(!e)throw ft(t,...n)}function mt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw ct(t),new Error(t)}function gt(e,t){e||mt(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.href)||""}function vt(){var e;return"undefined"!=typeof self&&(null==(e=self.location)?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(){return"undefined"==typeof navigator||!navigator||!("onLine"in navigator)||"boolean"!=typeof navigator.onLine||"http:"!==vt()&&"https:"!==vt()&&!function(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}()&&!("connection"in navigator)||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _t{constructor(e,t){this.shortDelay=e,this.longDelay=t,gt(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(y())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return wt()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(e,t){gt(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void mt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void mt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void mt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},bt=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],St=new _t(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function At(e,t,n,r,s={}){return kt(e,s,async()=>{let s={},i={};r&&("GET"===t?i=r:s={body:JSON.stringify(r)});const o=b({key:e.config.apiKey,...i}).slice(1),a=await e._getAdditionalHeaders();a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode);const c={method:t,headers:a,...s};return"undefined"!=typeof navigator&&"Cloudflare-Workers"===navigator.userAgent||(c.referrerPolicy="no-referrer"),e.emulatorConfig&&d(e.emulatorConfig.host)&&(c.credentials="include"),Tt.fetch()(await Rt(e,e.config.apiHost,n,o),c)})}async function kt(e,t,n){e._canInitEmulator=!1;const r={...It,...t};try{const t=new Ot(e),s=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const i=await s.json();if("needConfirmation"in i)throw Pt(e,"account-exists-with-different-credential",i);if(s.ok&&!("errorMessage"in i))return i;{const t=s.ok?i.errorMessage:i.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw Pt(e,"credential-already-in-use",i);if("EMAIL_EXISTS"===n)throw Pt(e,"email-already-in-use",i);if("USER_DISABLED"===n)throw Pt(e,"user-disabled",i);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw lt(e,a,o);ut(e,a)}}catch(s){if(s instanceof w)throw s;ut(e,"network-request-failed",{message:String(s)})}}async function Nt(e,t,n,r,s={}){const i=await At(e,t,n,r,s);return"mfaPendingCredential"in i&&ut(e,"multi-factor-auth-required",{_serverResponse:i}),i}async function Rt(e,t,n,r){const s=`${t}${n}?${r}`,i=e,o=i.config.emulator?Et(e.config,s):`${e.config.apiScheme}://${s}`;if(bt.includes(n)&&(await i._persistenceManagerAvailable,"COOKIE"===i._getPersistenceType())){return i._getPersistence()._getFinalTarget(o).toString()}return o}function Dt(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Ot{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(ht(this.auth,"network-request-failed")),St.get())})}}function Pt(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=ht(e,t,r);return s.customData._tokenResponse=n,s}function Lt(e){return void 0!==e&&void 0!==e.enterprise}class Mt{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Dt(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function xt(e,t){return At(e,"POST","/v1/accounts:lookup",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(t){}}function Ut(e){return 1e3*Number(e)}function Ft(e){const[t,n,r]=e.split(".");if(void 0===t||void 0===n||void 0===r)return ct("JWT malformed, contained fewer than 3 sections"),null;try{const e=i(n);return e?JSON.parse(e):(ct("Failed to decode base64 JWT payload"),null)}catch(s){return ct("Caught error parsing JWT payload as JSON",null==s?void 0:s.toString()),null}}function jt(e){const t=Ft(e);return pt(t,"internal-error"),pt(void 0!==t.exp,"internal-error"),pt(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bt(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof w&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}class qt{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vt(this.lastLoginAt),this.creationTime=Vt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(e){var t;const n=e.auth,r=await e.getIdToken(),s=await Bt(e,xt(n,{idToken:r}));pt(null==s?void 0:s.users.length,n,"internal-error");const i=s.users[0];e._notifyReloadListener(i);const o=(null==(t=i.providerUserInfo)?void 0:t.length)?Ht(i.providerUserInfo):[],a=(c=e.providerData,u=o,[...c.filter(e=>!u.some(t=>t.providerId===e.providerId)),...u]);var c,u;const h=e.isAnonymous,l=!(e.email&&i.passwordHash||(null==a?void 0:a.length)),d=!!h&&l,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new zt(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(e,f)}function Ht(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){pt(e.idToken,"internal-error"),pt(void 0!==e.idToken,"internal-error"),pt(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):jt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){pt(0!==e.length,"internal-error");const t=jt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(pt(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null):this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:r,expiresIn:s}=await async function(e,t){const n=await kt(e,{},async()=>{const n=b({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:s}=e.config,i=await Rt(e,r,"/v1/token",`key=${s}`),o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:o,body:n};return e.emulatorConfig&&d(e.emulatorConfig.host)&&(a.credentials="include"),Tt.fetch()(i,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,r,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:r,expirationTime:s}=t,i=new Gt;return n&&(pt("string"==typeof n,"internal-error",{appName:e}),i.refreshToken=n),r&&(pt("string"==typeof r,"internal-error",{appName:e}),i.accessToken=r),s&&(pt("number"==typeof s,"internal-error",{appName:e}),i.expirationTime=s),i}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gt,this.toJSON())}_performRefresh(){return mt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(e,t){pt("string"==typeof e||void 0===e,"internal-error",{appName:t})}class Wt{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId="firebase",this.proactiveRefresh=new qt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new zt(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Bt(this,this.stsTokenManager.getToken(this.auth,e));return pt(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=N(e),r=await n.getIdToken(t),s=Ft(r);pt(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i="object"==typeof s.firebase?s.firebase:void 0,o=null==i?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Vt(Ut(s.auth_time)),issuedAtTime:Vt(Ut(s.iat)),expirationTime:Vt(Ut(s.exp)),signInProvider:o||null,signInSecondFactor:(null==i?void 0:i.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=N(e);await $t(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(pt(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Wt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){pt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await $t(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Be(this.auth.app))return Promise.reject(dt(this.auth));const e=await this.getIdToken();return await Bt(this,
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){return At(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,r=t.email??void 0,s=t.phoneNumber??void 0,i=t.photoURL??void 0,o=t.tenantId??void 0,a=t._redirectEventId??void 0,c=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:h,emailVerified:l,isAnonymous:d,providerData:f,stsTokenManager:p}=t;pt(h&&p,e,"internal-error");const m=Gt.fromJSON(this.name,p);pt("string"==typeof h,e,"internal-error"),Kt(n,e.name),Kt(r,e.name),pt("boolean"==typeof l,e,"internal-error"),pt("boolean"==typeof d,e,"internal-error"),Kt(s,e.name),Kt(i,e.name),Kt(o,e.name),Kt(a,e.name),Kt(c,e.name),Kt(u,e.name);const g=new Wt({uid:h,auth:e,email:r,emailVerified:l,displayName:n,isAnonymous:d,photoURL:i,phoneNumber:s,tenantId:o,stsTokenManager:m,createdAt:c,lastLoginAt:u});return f&&Array.isArray(f)&&(g.providerData=f.map(e=>({...e}))),a&&(g._redirectEventId=a),g}static async _fromIdTokenResponse(e,t,n=!1){const r=new Gt;r.updateFromServerResponse(t);const s=new Wt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:n});return await $t(s),s}static async _fromGetAccountInfoResponse(e,t,n){const r=t.users[0];pt(void 0!==r.localId,"internal-error");const s=void 0!==r.providerUserInfo?Ht(r.providerUserInfo):[],i=!(r.email&&r.passwordHash||(null==s?void 0:s.length)),o=new Gt;o.updateFromIdToken(n);const a=new Wt({uid:r.localId,auth:e,stsTokenManager:o,isAnonymous:i}),c={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new zt(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash||(null==s?void 0:s.length))};return Object.assign(a,c),a}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt=new Map;function Xt(e){gt(e instanceof Function,"Expected a class definition");let t=Qt.get(e);return t?(gt(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Qt.set(e,t),t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Jt.type="NONE";const Yt=Jt;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(e,t,n){return`firebase:${e}:${t}:${n}`}class en{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:r,name:s}=this.auth;this.fullUserKey=Zt(this.userKey,r.apiKey,s),this.fullPersistenceKey=Zt("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if("string"==typeof e){const t=await xt(this.auth,{idToken:e}).catch(()=>{});return t?Wt._fromGetAccountInfoResponse(this.auth,t,e):null}return Wt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new en(Xt(Yt),e,n);const r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e);let s=r[0]||Xt(Yt);const i=Zt(n,e.config.apiKey,e.name);let o=null;for(const c of t)try{const t=await c._get(i);if(t){let n;if("string"==typeof t){const r=await xt(e,{idToken:t}).catch(()=>{});if(!r)break;n=await Wt._fromGetAccountInfoResponse(e,r,t)}else n=Wt._fromJSON(e,t);c!==s&&(o=n),s=c;break}}catch{}const a=r.filter(e=>e._shouldAllowMigration);return s._shouldAllowMigration&&a.length?(s=a[0],o&&await s._set(i,o.toJSON()),await Promise.all(t.map(async e=>{if(e!==s)try{await e._remove(i)}catch{}})),new en(s,e,n)):new en(s,e,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(on(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(nn(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(cn(t))return"Blackberry";if(un(t))return"Webos";if(rn(t))return"Safari";if((t.includes("chrome/")||sn(t))&&!t.includes("edge/"))return"Chrome";if(an(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function nn(e=y()){return/firefox\//i.test(e)}function rn(e=y()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function sn(e=y()){return/crios\//i.test(e)}function on(e=y()){return/iemobile/i.test(e)}function an(e=y()){return/android/i.test(e)}function cn(e=y()){return/blackberry/i.test(e)}function un(e=y()){return/webos/i.test(e)}function hn(e=y()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function ln(){return function(){const e=y();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()&&10===document.documentMode}function dn(e=y()){return hn(e)||an(e)||un(e)||cn(e)||/windows phone/i.test(e)||on(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(e,t=[]){let n;switch(e){case"Browser":n=tn(y());break;case"Worker":n=`${tn(y())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${$e}/${r}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,r)=>{try{n(e(t))}catch(s){r(s)}});n.onAbort=t,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const e of t)try{e()}catch(r){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==n?void 0:n.message})}}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){var t;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??6,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),void 0!==n.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),void 0!==n.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),void 0!==n.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),void 0!==n.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(null==(t=e.allowedNonAlphanumericCharacters)?void 0:t.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let n;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vn(this),this.idTokenSubscription=new vn(this),this.beforeStateQueue=new pn(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ot,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Xt(t)),this._initializationPromise=this.queue(async()=>{var n,r,s;if(!this._deleted&&(this.persistenceManager=await en.create(this,e),null==(n=this._resolvePersistenceManagerAvailable)||n.call(this),!this._deleted)){if(null==(r=this._popupRedirectResolver)?void 0:r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(i){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null==(s=this.currentUser)?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void(await this.currentUser.getIdToken())):void(await this._updateCurrentUser(e,!0)):void 0}async initializeCurrentUserFromIdToken(e){try{const t=await xt(this,{idToken:e}),n=await Wt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Be(this.app)){const e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null==(t=this.redirectUser)?void 0:t._redirectEventId,i=null==r?void 0:r._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==i||!(null==o?void 0:o.user)||(r=o.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return pt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(n){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await $t(e)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Be(this.app))return Promise.reject(dt(this));const t=e?N(e):null;return t&&pt(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&pt(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Be(this.app)?Promise.reject(dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Be(this.app)?Promise.reject(dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Xt(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await async function(e,t={}){return At(e,"GET","/v2/passwordPolicy",Ct(e,t))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this),t=new mn(e);null===this.tenantId?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new _("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await async function(e,t){return At(e,"POST","/v2/accounts:revokeToken",Ct(e,t))}(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null==(e=this._currentUser)?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Xt(e)||this._popupRedirectResolver;pt(t,this,"argument-error"),this.redirectPersistenceManager=await en.create(this,[Xt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),(null==(t=this._currentUser)?void 0:t._redirectEventId)===e?this._currentUser:(null==(n=this.redirectUser)?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=(null==(e=this.currentUser)?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};const s="function"==typeof t?t:t.next.bind(t);let i=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(pt(o,this,"internal-error"),o.then(()=>{i||s(this.currentUser)}),"function"==typeof t){const s=e.addObserver(t,n,r);return()=>{i=!0,s()}}{const n=e.addObserver(t);return()=>{i=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return pt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=fn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null==(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;if(Be(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await(null==(e=this.appCheckServiceProvider.getImmediate({optional:!0}))?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){at.logLevel<=L.WARN&&at.warn(`Auth (${$e}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function yn(e){return N(e)}class vn{constructor(e){this.auth=e,this.observer=null,this.addObserver=function(e,t){const n=new A(e,t);return n.subscribe.bind(n)}(e=>this.observer=e)}get next(){return pt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _n(e){return wn.loadJS(e)}class En{constructor(){this.enterprise=new Tn}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Tn{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const In="NO_RECAPTCHA";class bn{constructor(e){this.type="recaptcha-enterprise",this.auth=yn(e)}async verify(e="verify",t=!1){async function n(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{(async function(e,t){return At(e,"GET","/v2/recaptchaConfig",Ct(e,t))})(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0!==r.recaptchaKey){const n=new Mt(r);return null==e.tenantId?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))}).catch(e=>{n(e)})})}function r(t,n,r){const s=window.grecaptcha;Lt(s)?s.enterprise.ready(()=>{s.enterprise.execute(t,{action:e}).then(e=>{n(e)}).catch(()=>{n(In)})}):r(Error("No reCAPTCHA enterprise script loaded."))}if(this.auth.settings.appVerificationDisabledForTesting){return(new En).execute("siteKey",{action:"verify"})}return new Promise((e,s)=>{n(this.auth).then(n=>{if(!t&&Lt(window.grecaptcha))r(n,e,s);else{if("undefined"==typeof window)return void s(new Error("RecaptchaVerifier is only supported in browser"));let t=wn.recaptchaEnterpriseScript;0!==t.length&&(t+=n),_n(t).then(()=>{r(n,e,s)}).catch(e=>{s(e)})}}).catch(e=>{s(e)})})}}async function Sn(e,t,n,r=!1,s=!1){const i=new bn(e);let o;if(s)o=In;else try{o=await i.verify(n)}catch(c){o=await i.verify(n,!0)}const a={...t};if("mfaSmsEnrollment"===n||"mfaSmsSignIn"===n){if("phoneEnrollmentInfo"in a){const e=a.phoneEnrollmentInfo.phoneNumber,t=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const e=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Cn(e,t,n,r,s){var i;if(null==(i=e._getRecaptchaConfig())?void 0:i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await Sn(e,t,n,"getOobCode"===n);return r(e,s)}return r(e,t).catch(async s=>{if("auth/missing-recaptcha-token"===s.code){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const s=await Sn(e,t,n,"getOobCode"===n);return r(e,s)}return Promise.reject(s)})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function An(e,t,n){const r=yn(e);pt(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const s=!!(null==n?void 0:n.disableWarnings),i=kn(t),{host:o,port:a}=function(e){const t=kn(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const e=s[1];return{host:e,port:Nn(r.substr(e.length+1))}}{const[e,t]=r.split(":");return{host:e,port:Nn(t)}}}(t),c=null===a?"":`:${a}`,u={url:`${i}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator)return pt(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),void pt(T(u,r.config.emulator)&&T(h,r.emulatorConfig),r,"emulator-config-failed");r.config.emulator=u,r.emulatorConfig=h,r.settings.appVerificationDisabledForTesting=!0,d(o)?(f(`${i}//${o}${c}`),g("Auth",!0)):function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function kn(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Nn(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Rn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return mt("not implemented")}_getIdTokenResponse(e){return mt("not implemented")}_linkToIdToken(e,t){return mt("not implemented")}_getReauthenticationResolver(e){return mt("not implemented")}}async function Dn(e,t){return At(e,"POST","/v1/accounts:signUp",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(e,t){return Nt(e,"POST","/v1/accounts:signInWithPassword",Ct(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pn extends Rn{constructor(e,t,n,r=null){super("password",n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Pn(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Pn(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return Cn(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",On);case"emailLink":return async function(e,t){return Nt(e,"POST","/v1/accounts:signInWithEmailLink",Ct(e,t))}(e,{email:this._email,oobCode:this._password});default:ut(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Cn(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Dn);case"emailLink":return async function(e,t){return Nt(e,"POST","/v1/accounts:signInWithEmailLink",Ct(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:ut(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ln(e,t){return Nt(e,"POST","/v1/accounts:signInWithIdp",Ct(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends Rn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Mn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ut("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:r,...s}=t;if(!n||!r)return null;const i=new Mn(n,r);return i.idToken=s.idToken||void 0,i.accessToken=s.accessToken||void 0,i.secret=s.secret,i.nonce=s.nonce,i.pendingToken=s.pendingToken||null,i}_getIdTokenResponse(e){return Ln(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Ln(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ln(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=b(t)}return e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e){const t=S(C(e)),n=t.apiKey??null,r=t.oobCode??null,s=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(t.mode??null);pt(n&&r&&s,"argument-error"),this.apiKey=n,this.operation=s,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=function(e){const t=S(C(e)).link,n=t?S(C(t)).deep_link_id:null,r=S(C(e)).deep_link_id;return(r?S(C(r)).link:null)||r||n||t||e}(e);try{return new xn(t)}catch{return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(){this.providerId=Vn.PROVIDER_ID}static credential(e,t){return Pn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=xn.parseLink(t);return pt(n,"argument-error"),Pn._fromEmailAndCode(e,n.code,n.tenantId)}}Vn.PROVIDER_ID="password",Vn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",Vn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Un{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends Un{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends Fn{constructor(){super("facebook.com")}static credential(e){return Mn._fromParams({providerId:jn.PROVIDER_ID,signInMethod:jn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return jn.credentialFromTaggedObject(e)}static credentialFromError(e){return jn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return jn.credential(e.oauthAccessToken)}catch{return null}}}jn.FACEBOOK_SIGN_IN_METHOD="facebook.com",jn.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bn extends Fn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Mn._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Bn.credential(t,n)}catch{return null}}}Bn.GOOGLE_SIGN_IN_METHOD="google.com",Bn.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qn extends Fn{constructor(){super("github.com")}static credential(e){return Mn._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.GITHUB_SIGN_IN_METHOD="github.com",qn.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zn extends Fn{constructor(){super("twitter.com")}static credential(e,t){return Mn._fromParams({providerId:zn.PROVIDER_ID,signInMethod:zn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return zn.credentialFromTaggedObject(e)}static credentialFromError(e){return zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return zn.credential(t,n)}catch{return null}}}zn.TWITTER_SIGN_IN_METHOD="twitter.com",zn.PROVIDER_ID="twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,r=!1){const s=await Wt._fromIdTokenResponse(e,n,r),i=Hn(n);return new $n({user:s,providerId:i,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const r=Hn(n);return new $n({user:e,providerId:r,_tokenResponse:n,operationType:t})}}function Hn(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gn(e){var t;if(Be(e.app))return Promise.reject(dt(e));const n=yn(e);if(await n._initializationPromise,null==(t=n.currentUser)?void 0:t.isAnonymous)return new $n({user:n.currentUser,providerId:null,operationType:"signIn"});const r=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(e,t){return Nt(e,"POST","/v1/accounts:signUp",Ct(e,t))}(n,{returnSecureToken:!0}),s=await $n._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends w{constructor(e,t,n,r){super(t.code,t.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,Kn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,r){return new Kn(e,t,n,r)}}function Wn(e,t,n,r){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{if("auth/multi-factor-auth-required"===n.code)throw Kn._fromErrorAndOperation(e,n,t,r);throw n})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Qn(e,t,n=!1){if(Be(e.app))return Promise.reject(dt(e));const r="signIn",s=await Wn(e,r,t),i=await $n._fromIdTokenResponse(e,r,s);return n||await e._updateCurrentUser(i.user),i}function Xn(e,t,n){return Be(e.app)?Promise.reject(dt(e)):async function(e,t){return Qn(yn(e),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(N(e),Vn.credential(t,n)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&async function(e){const t=yn(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}(e),t})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Jn(e,{displayName:t,photoURL:n}){if(void 0===t&&void 0===n)return;const r=N(e),s={idToken:await r.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},i=await Bt(r,async function(e,t){return At(e,"POST","/v1/accounts:update",t)}(r.auth,s));r.displayName=i.displayName||null,r.photoURL=i.photoUrl||null;const o=r.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=r.displayName,o.photoURL=r.photoURL),await r._updateTokensIfNecessary(i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yn(e,t){return N(e).setPersistence(t)}function Zn(e,t,n,r){return N(e).onAuthStateChanged(t,n,r)}function er(e){return N(e).signOut()}const tr="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(tr,"1"),this.storage.removeItem(tr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends nr{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=dn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});const n=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},s=this.storage.getItem(n);ln()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}rr.type="LOCAL";const sr=rr;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir extends nr{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ir.type="SESSION";const or=ir;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ar{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;const n=new ar(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:r,data:s}=t.data,i=this.handlersMap[r];if(!(null==i?void 0:i.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const o=Array.from(i).map(async e=>e(t.origin,s)),a=await function(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function cr(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ar.receivers=[];class ur{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,i;return new Promise((o,a)=>{const c=cr("",20);r.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);i={messageChannel:r,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),o(t.data.response);break;default:clearTimeout(u),clearTimeout(s),a(new Error("invalid_response"))}}},this.handlers.add(i),r.port1.addEventListener("message",i.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{i&&this.removeMessageHandler(i)})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function lr(){return void 0!==hr().WorkerGlobalScope&&"function"==typeof hr().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const dr="firebaseLocalStorageDb",fr="firebaseLocalStorage",pr="fbase_key";class mr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function gr(e,t){return e.transaction([fr],t?"readwrite":"readonly").objectStore(fr)}function yr(){const e=indexedDB.open(dr,1);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(fr,{keyPath:pr})}catch(r){n(r)}}),e.addEventListener("success",async()=>{const n=e.result;n.objectStoreNames.contains(fr)?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase(dr);return new mr(e).toPromise()}(),t(await yr()))})})}async function vr(e,t,n){const r=gr(e,!0).put({[pr]:t,value:n});return new mr(r).toPromise()}function wr(e,t){const n=gr(e,!0).delete(t);return new mr(n).toPromise()}class _r{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await yr()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(n){if(t++>3)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return lr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ar._getInstance(lr()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}(),!this.activeServiceWorker)return;this.sender=new ur(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null==(e=n[0])?void 0:e.fulfilled)&&(null==(t=n[0])?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null==(t=null==navigator?void 0:navigator.serviceWorker)?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await yr();return await vr(e,tr,"1"),await wr(e,tr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>vr(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(t=>async function(e,t){const n=gr(e,!1).get(t),r=await new mr(n).toPromise();return void 0===r?null:r.value}(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(e=>{const t=gr(e,!1).getAll();return new mr(t).toPromise()});if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;if(0!==e.length)for(const{fbase_key:r,value:s}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!n.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const r of Array.from(n))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}_r.type="LOCAL";const Er=_r;new _t(3e4,6e4);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tr extends Rn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ln(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ln(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ln(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ir(e){return Qn(e.auth,new Tr(e),e.bypassAuthState)}function br(e){const{auth:t,user:n}=e;return pt(n,t,"internal-error"),
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t,n=!1){const{auth:r}=e;if(Be(r.app))return Promise.reject(dt(r));const s="reauthenticate";try{const i=await Bt(e,Wn(r,s,t,e),n);pt(i.idToken,r,"internal-error");const o=Ft(i.idToken);pt(o,r,"internal-error");const{sub:a}=o;return pt(e.uid===a,r,"user-mismatch"),$n._forOperation(e,s,i)}catch(i){throw"auth/user-not-found"===(null==i?void 0:i.code)&&ut(r,"user-mismatch"),i}}(n,new Tr(e),e.bypassAuthState)}async function Sr(e){const{auth:t,user:n}=e;return pt(n,t,"internal-error"),async function(e,t,n=!1){const r=await Bt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return $n._forOperation(e,"link",r)}(n,new Tr(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t,n,r,s=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:r,tenantId:s,error:i,type:o}=e;if(i)return void this.reject(i);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ir;case"linkViaPopup":case"linkViaRedirect":return Sr;case"reauthViaPopup":case"reauthViaRedirect":return br;default:ut(this.auth,"internal-error")}}resolve(e){gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){gt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=new _t(2e3,1e4);class kr extends Cr{constructor(e,t,n,r,s){super(e,t,r,s),this.provider=n,this.authWindow=null,this.pollId=null,kr.currentPopupAction&&kr.currentPopupAction.cancel(),kr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return pt(e,this.auth,"internal-error"),e}async onExecution(){gt(1===this.filter.length,"Popup operations only handle one event");const e=cr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null==(e=this.authWindow)?void 0:e.associatedEvent)||null}cancel(){this.reject(ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,kr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null==(n=null==(t=this.authWindow)?void 0:t.window)?void 0:n.closed)?this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ht(this.auth,"popup-closed-by-user"))},8e3):this.pollId=window.setTimeout(e,Ar.get())};e()}}kr.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Nr="pendingRedirect",Rr=new Map;class Dr extends Cr{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Rr.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=function(e){return Zt(Nr,e.config.apiKey,e.name)}(t),r=function(e){return Xt(e._redirectPersistence)}(e);if(!(await r._isAvailable()))return!1;const s="true"===await r._get(n);return await r._remove(n),s}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Rr.set(this.auth._key(),e)}return this.bypassAuthState||Rr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function Or(e,t){Rr.set(e._key(),t)}async function Pr(e,t,n=!1){if(Be(e.app))return Promise.reject(dt(e));const r=yn(e),s=
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return t?Xt(t):(pt(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}(r,t),i=new Dr(r,s,n),o=await i.execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return xr(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!xr(e)){const r=(null==(n=e.error.code)?void 0:n.split("auth/")[1])||"internal-error";t.onError(ht(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mr(e))}saveEventToCache(e){this.cachedEventUids.add(Mr(e)),this.lastProcessedEventTime=Date.now()}}function Mr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function xr({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ur=/^https?/;async function Fr(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return At(e,"GET","/v1/projects",t)}(e);for(const n of t)try{if(jr(n))return}catch{}ut(e,"unauthorized-domain")}function jr(e){const t=yt(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return""===s.hostname&&""===r?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&s.hostname===r}if(!Ur.test(n))return!1;if(Vr.test(e))return r===e;const s=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=new _t(3e4,6e4);function qr(){const e=hr().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}function zr(e){return new Promise((t,n)=>{var r,s,i;function o(){qr(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{qr(),n(ht(e,"network-request-failed"))},timeout:Br.get()})}if(null==(s=null==(r=hr().gapi)?void 0:r.iframes)?void 0:s.Iframe)t(gapi.iframes.getContext());else{if(!(null==(i=hr().gapi)?void 0:i.load)){const t=`__${"iframefcb"}${Math.floor(1e6*Math.random())}`;return hr()[t]=()=>{gapi.load?o():n(ht(e,"network-request-failed"))},_n(`${wn.gapiScript}?onload=${t}`).catch(e=>n(e))}o()}}).catch(e=>{throw $r=null,e})}let $r=null;
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Hr=new _t(5e3,15e3),Gr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Kr=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wr(e){const t=e.config;pt(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Et(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:$e},s=Kr.get(e.config.apiHost);s&&(r.eid=s);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${b(r).slice(1)}`}async function Qr(e){const t=await function(e){return $r=$r||zr(e),$r}(e),n=hr().gapi;return pt(n,e,"internal-error"),t.open({where:document.body,url:Wr(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gr,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});const s=ht(e,"network-request-failed"),i=hr().setTimeout(()=>{r(s)},Hr.get());function o(){hr().clearTimeout(i),n(t)}t.ping(o).then(o,()=>{r(s)})}))}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Jr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Yr(e,t,n,r=500,s=600){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c={...Xr,width:r.toString(),height:s.toString(),top:i,left:o},u=y().toLowerCase();n&&(a=sn(u)?"_blank":n),nn(u)&&(t=t||"http://localhost",c.scrollbars="yes");const h=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(function(e=y()){var t;return hn(e)&&!!(null==(t=window.navigator)?void 0:t.standalone)}(u)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new Jr(null);const l=window.open(t||"",a,h);pt(l,e,"popup-blocked");try{l.focus()}catch(d){}return new Jr(l)}const Zr="__/auth/handler",es="emulator/auth/handler",ts=encodeURIComponent("fac");async function ns(e,t,n,r,s,i){pt(e.config.authDomain,e,"auth-domain-config-required"),pt(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:$e,eventId:s};if(t instanceof Un){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",function(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries({}))o[e]=t}if(t instanceof Fn){const e=t.getScopes().filter(e=>""!==e);e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const h of Object.keys(a))void 0===a[h]&&delete a[h];const c=await e._getAppCheckToken(),u=c?`#${ts}=${encodeURIComponent(c)}`:"";return`${function({config:e}){if(!e.emulator)return`https://${e.authDomain}/${Zr}`;return Et(e,es)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${b(a).slice(1)}${u}`}const rs="webStorageSupport";const ss=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=or,this._completeRedirectFn=Pr,this._overrideRedirectResult=Or}async _openPopup(e,t,n,r){var s;gt(null==(s=this.eventManagers[e._key()])?void 0:s.manager,"_initialize() not called before _openPopup()");return Yr(e,await ns(e,t,n,yt(),r),cr())}async _openRedirect(e,t,n,r){await this._originValidation(e);return function(e){hr().location.href=e}(await ns(e,t,n,yt(),r)),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(gt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Qr(e),n=new Lr(e);return t.register("authEvent",t=>{pt(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(rs,{type:rs},n=>{var r;const s=null==(r=null==n?void 0:n[0])?void 0:r[rs];void 0!==s&&t(!!s),ut(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Fr(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return dn()||rn()||hn()}};var is="@firebase/auth",os="1.11.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class as{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null==(e=this.auth.currentUser)?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){pt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cs=h("authIdTokenMaxAge")||300;let us=null;function hs(e=Ge()){const t=je(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=je(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(T(n.getOptions(),t??{}))return e;ut(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:ss,persistence:[Er,sr,or]}),r=h("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){const e=new URL(r,location.origin);if(location.origin===e.origin){const t=(s=e.toString(),async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>cs)return;const r=null==t?void 0:t.token;us!==r&&(us=r,await fetch(s,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(e,t,n){N(e).beforeAuthStateChanged(t,n)}(n,t,()=>t(n.currentUser)),function(e,t,n,r){N(e).onIdTokenChanged(t,n,r)}(n,e=>t(e))}}var s;const i=c("auth");return i&&An(n,`http://${i}`),n}var ls;wn={loadJS:e=>new Promise((t,n)=>{const r=document.createElement("script");var s;r.setAttribute("src",e),r.onload=t,r.onerror=e=>{const t=ht("internal-error");t.customData=e,n(t)},r.type="text/javascript",r.charset="UTF-8",((null==(s=document.getElementsByTagName("head"))?void 0:s[0])??document).appendChild(r)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},ls="Browser",Fe(new R("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:i,authDomain:o}=n.options;pt(i&&!i.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:i,authDomain:o,clientPlatform:ls,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:fn(ls)},c=new gn(n,r,s,a);return function(e,t){const n=(null==t?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Xt);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Fe(new R("auth-internal",e=>{const t=yn(e.getProvider("auth").getImmediate());return new as(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ke(is,os,function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(ls)),Ke(is,os,"esm2020");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Ke("firebase","12.6.0","app");var ds,fs,ps="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e;
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */function t(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}function n(e,t,n){n||(n=0);const r=Array(16);if("string"==typeof t)for(var s=0;s<16;++s)r[s]=t.charCodeAt(n++)|t.charCodeAt(n++)<<8|t.charCodeAt(n++)<<16|t.charCodeAt(n++)<<24;else for(s=0;s<16;++s)r[s]=t[n++]|t[n++]<<8|t[n++]<<16|t[n++]<<24;t=e.g[0],n=e.g[1],s=e.g[2];let i,o=e.g[3];i=t+(o^n&(s^o))+r[0]+3614090360&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[1]+3905402710&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[2]+606105819&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[3]+3250441966&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[4]+4118548399&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[5]+1200080426&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[6]+2821735955&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[7]+4249261313&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[8]+1770035416&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[9]+2336552879&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[10]+4294925233&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[11]+2304563134&4294967295,i=t+(o^(n=s+(i<<22&4294967295|i>>>10))&(s^o))+r[12]+1804603682&4294967295,i=o+(s^(t=n+(i<<7&4294967295|i>>>25))&(n^s))+r[13]+4254626195&4294967295,o=t+(i<<12&4294967295|i>>>20),i=s+(n^o&(t^n))+r[14]+2792965006&4294967295,i=n+(t^(s=o+(i<<17&4294967295|i>>>15))&(o^t))+r[15]+1236535329&4294967295,i=t+(s^o&((n=s+(i<<22&4294967295|i>>>10))^s))+r[1]+4129170786&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[6]+3225465664&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[11]+643717713&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[0]+3921069994&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[5]+3593408605&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[10]+38016083&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[15]+3634488961&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[4]+3889429448&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[9]+568446438&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[14]+3275163606&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[3]+4107603335&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[8]+1163531501&4294967295,i=t+(s^o&((n=s+(i<<20&4294967295|i>>>12))^s))+r[13]+2850285829&4294967295,i=o+(n^s&((t=n+(i<<5&4294967295|i>>>27))^n))+r[2]+4243563512&4294967295,o=t+(i<<9&4294967295|i>>>23),i=s+(t^n&(o^t))+r[7]+1735328473&4294967295,i=n+(o^t&((s=o+(i<<14&4294967295|i>>>18))^o))+r[12]+2368359562&4294967295,i=t+((n=s+(i<<20&4294967295|i>>>12))^s^o)+r[5]+4294588738&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[8]+2272392833&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[11]+1839030562&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[14]+4259657740&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[1]+2763975236&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[4]+1272893353&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[7]+4139469664&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[10]+3200236656&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[13]+681279174&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[0]+3936430074&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[3]+3572445317&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[6]+76029189&4294967295,i=t+((n=s+(i<<23&4294967295|i>>>9))^s^o)+r[9]+3654602809&4294967295,i=o+((t=n+(i<<4&4294967295|i>>>28))^n^s)+r[12]+3873151461&4294967295,o=t+(i<<11&4294967295|i>>>21),i=s+(o^t^n)+r[15]+530742520&4294967295,i=n+((s=o+(i<<16&4294967295|i>>>16))^o^t)+r[2]+3299628645&4294967295,i=t+(s^((n=s+(i<<23&4294967295|i>>>9))|~o))+r[0]+4096336452&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[7]+1126891415&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[14]+2878612391&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[5]+4237533241&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[12]+1700485571&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[3]+2399980690&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[10]+4293915773&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[1]+2240044497&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[8]+1873313359&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[15]+4264355552&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[6]+2734768916&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[13]+1309151649&4294967295,i=t+(s^((n=s+(i<<21&4294967295|i>>>11))|~o))+r[4]+4149444226&4294967295,i=o+(n^((t=n+(i<<6&4294967295|i>>>26))|~s))+r[11]+3174756917&4294967295,o=t+(i<<10&4294967295|i>>>22),i=s+(t^(o|~n))+r[2]+718787259&4294967295,i=n+(o^((s=o+(i<<15&4294967295|i>>>17))|~t))+r[9]+3951481745&4294967295,e.g[0]=e.g[0]+t&4294967295,e.g[1]=e.g[1]+(s+(i<<21&4294967295|i>>>11))&4294967295,e.g[2]=e.g[2]+s&4294967295,e.g[3]=e.g[3]+o&4294967295}function r(e,t){this.h=t;const n=[];let r=!0;for(let s=e.length-1;s>=0;s--){const i=0|e[s];r&&i==t||(n[s]=i,r=!1)}this.g=n}!function(e,t){function n(){}n.prototype=t.prototype,e.F=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.D=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}(t,function(){this.blockSize=-1}),t.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0},t.prototype.v=function(e,t){void 0===t&&(t=e.length);const r=t-this.blockSize,s=this.C;let i=this.h,o=0;for(;o<t;){if(0==i)for(;o<=r;)n(this,e,o),o+=this.blockSize;if("string"==typeof e){for(;o<t;)if(s[i++]=e.charCodeAt(o++),i==this.blockSize){n(this,s),i=0;break}}else for(;o<t;)if(s[i++]=e[o++],i==this.blockSize){n(this,s),i=0;break}}this.h=i,this.o+=t},t.prototype.A=function(){var e=Array((this.h<56?this.blockSize:2*this.blockSize)-this.h);e[0]=128;for(var t=1;t<e.length-8;++t)e[t]=0;t=8*this.o;for(var n=e.length-8;n<e.length;++n)e[n]=255&t,t/=256;for(this.v(e),e=Array(16),t=0,n=0;n<4;++n)for(let r=0;r<32;r+=8)e[t++]=this.g[n]>>>r&255;return e};var s={};function i(e){return-128<=e&&e<128?function(e,t){var n=s;return Object.prototype.hasOwnProperty.call(n,e)?n[e]:n[e]=t(e)}(e,function(e){return new r([0|e],e<0?-1:0)}):new r([0|e],e<0?-1:0)}function o(e){if(isNaN(e)||!isFinite(e))return a;if(e<0)return d(o(-e));const t=[];let n=1;for(let r=0;e>=n;r++)t[r]=e/n|0,n*=4294967296;return new r(t,0)}var a=i(0),c=i(1),u=i(16777216);function h(e){if(0!=e.h)return!1;for(let t=0;t<e.g.length;t++)if(0!=e.g[t])return!1;return!0}function l(e){return-1==e.h}function d(e){const t=e.g.length,n=[];for(let r=0;r<t;r++)n[r]=~e.g[r];return new r(n,~e.h).add(c)}function f(e,t){return e.add(d(t))}function p(e,t){for(;(65535&e[t])!=e[t];)e[t+1]+=e[t]>>>16,e[t]&=65535,t++}function m(e,t){this.g=e,this.h=t}function g(e,t){if(h(t))throw Error("division by zero");if(h(e))return new m(a,a);if(l(e))return t=g(d(e),t),new m(d(t.g),d(t.h));if(l(t))return t=g(e,d(t)),new m(d(t.g),t.h);if(e.g.length>30){if(l(e)||l(t))throw Error("slowDivide_ only works with positive integers.");for(var n=c,r=t;r.l(e)<=0;)n=y(n),r=y(r);var s=v(n,1),i=v(r,1);for(r=v(r,2),n=v(n,2);!h(r);){var u=i.add(r);u.l(e)<=0&&(s=s.add(n),i=u),r=v(r,1),n=v(n,1)}return t=f(e,s.j(t)),new m(s,t)}for(s=a;e.l(t)>=0;){for(n=Math.max(1,Math.floor(e.m()/t.m())),r=(r=Math.ceil(Math.log(n)/Math.LN2))<=48?1:Math.pow(2,r-48),u=(i=o(n)).j(t);l(u)||u.l(e)>0;)u=(i=o(n-=r)).j(t);h(i)&&(i=c),s=s.add(i),e=f(e,u)}return new m(s,e)}function y(e){const t=e.g.length+1,n=[];for(let r=0;r<t;r++)n[r]=e.i(r)<<1|e.i(r-1)>>>31;return new r(n,e.h)}function v(e,t){const n=t>>5;t%=32;const s=e.g.length-n,i=[];for(let r=0;r<s;r++)i[r]=t>0?e.i(r+n)>>>t|e.i(r+n+1)<<32-t:e.i(r+n);return new r(i,e.h)}(e=r.prototype).m=function(){if(l(this))return-d(this).m();let e=0,t=1;for(let n=0;n<this.g.length;n++){const r=this.i(n);e+=(r>=0?r:4294967296+r)*t,t*=4294967296}return e},e.toString=function(e){if((e=e||10)<2||36<e)throw Error("radix out of range: "+e);if(h(this))return"0";if(l(this))return"-"+d(this).toString(e);const t=o(Math.pow(e,6));var n=this;let r="";for(;;){const s=g(n,t).g;let i=(((n=f(n,s.j(t))).g.length>0?n.g[0]:n.h)>>>0).toString(e);if(h(n=s))return i+r;for(;i.length<6;)i="0"+i;r=i+r}},e.i=function(e){return e<0?0:e<this.g.length?this.g[e]:this.h},e.l=function(e){return l(e=f(this,e))?-1:h(e)?0:1},e.abs=function(){return l(this)?d(this):this},e.add=function(e){const t=Math.max(this.g.length,e.g.length),n=[];let s=0;for(let r=0;r<=t;r++){let t=s+(65535&this.i(r))+(65535&e.i(r)),i=(t>>>16)+(this.i(r)>>>16)+(e.i(r)>>>16);s=i>>>16,t&=65535,i&=65535,n[r]=i<<16|t}return new r(n,-2147483648&n[n.length-1]?-1:0)},e.j=function(e){if(h(this)||h(e))return a;if(l(this))return l(e)?d(this).j(d(e)):d(d(this).j(e));if(l(e))return d(this.j(d(e)));if(this.l(u)<0&&e.l(u)<0)return o(this.m()*e.m());const t=this.g.length+e.g.length,n=[];for(var s=0;s<2*t;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(let t=0;t<e.g.length;t++){const r=this.i(s)>>>16,i=65535&this.i(s),o=e.i(t)>>>16,a=65535&e.i(t);n[2*s+2*t]+=i*a,p(n,2*s+2*t),n[2*s+2*t+1]+=r*a,p(n,2*s+2*t+1),n[2*s+2*t+1]+=i*o,p(n,2*s+2*t+1),n[2*s+2*t+2]+=r*o,p(n,2*s+2*t+2)}for(e=0;e<t;e++)n[e]=n[2*e+1]<<16|n[2*e];for(e=t;e<2*t;e++)n[e]=0;return new r(n,0)},e.B=function(e){return g(this,e).h},e.and=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)&e.i(r);return new r(n,this.h&e.h)},e.or=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)|e.i(r);return new r(n,this.h|e.h)},e.xor=function(e){const t=Math.max(this.g.length,e.g.length),n=[];for(let r=0;r<t;r++)n[r]=this.i(r)^e.i(r);return new r(n,this.h^e.h)},t.prototype.digest=t.prototype.A,t.prototype.reset=t.prototype.u,t.prototype.update=t.prototype.v,fs=t,r.prototype.add=r.prototype.add,r.prototype.multiply=r.prototype.j,r.prototype.modulo=r.prototype.B,r.prototype.compare=r.prototype.l,r.prototype.toNumber=r.prototype.m,r.prototype.toString=r.prototype.toString,r.prototype.getBits=r.prototype.i,r.fromNumber=o,r.fromString=function e(t,n){if(0==t.length)throw Error("number format error: empty string");if((n=n||10)<2||36<n)throw Error("radix out of range: "+n);if("-"==t.charAt(0))return d(e(t.substring(1),n));if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character');const r=o(Math.pow(n,8));let s=a;for(let a=0;a<t.length;a+=8){var i=Math.min(8,t.length-a);const e=parseInt(t.substring(a,a+i),n);i<8?(i=o(Math.pow(n,i)),s=s.j(i).add(o(e))):(s=s.j(r),s=s.add(o(e)))}return s},ds=r}).apply(void 0!==ps?ps:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var ms,gs,ys,vs,ws,_s,Es,Ts,Is="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/(function(){var e,t=Object.defineProperty;var n=function(e){e=["object"==typeof globalThis&&globalThis,e,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof Is&&Is];for(var t=0;t<e.length;++t){var n=e[t];if(n&&n.Math==Math)return n}throw Error("Cannot find global object")}(this);function r(e,r){if(r)e:{var s=n;e=e.split(".");for(var i=0;i<e.length-1;i++){var o=e[i];if(!(o in s))break e;s=s[o]}(r=r(i=s[e=e[e.length-1]]))!=i&&null!=r&&t(s,e,{configurable:!0,writable:!0,value:r})}}r("Symbol.dispose",function(e){return e||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(e){return e||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(e){return e||function(e){var t,n=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.push([t,e[t]]);return n}});
/** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  */
var s=s||{},i=this||self;function o(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}function a(e,t,n){return e.call.apply(e.bind,arguments)}function c(e,t,n){return(c=a).apply(null,arguments)}function u(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function h(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Ob=function(e,n,r){for(var s=Array(arguments.length-2),i=2;i<arguments.length;i++)s[i-2]=arguments[i];return t.prototype[n].apply(e,s)}}var l="undefined"!=typeof AsyncContext&&"function"==typeof AsyncContext.Snapshot?e=>e&&AsyncContext.Snapshot.wrap(e):e=>e;function d(e){const t=e.length;if(t>0){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function f(e,t){for(let r=1;r<arguments.length;r++){const t=arguments[r];var n=typeof t;if("array"==(n="object"!=n?n:t?Array.isArray(t)?"array":n:"null")||"object"==n&&"number"==typeof t.length){n=e.length||0;const r=t.length||0;e.length=n+r;for(let s=0;s<r;s++)e[n+s]=t[s]}else e.push(t)}}function p(e){i.setTimeout(()=>{throw e},0)}function m(){var e=_;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var g=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return this.h>0?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new y,e=>e.reset());class y{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}let v,w=!1,_=new class{constructor(){this.h=this.g=null}add(e,t){const n=g.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}},E=()=>{const e=Promise.resolve(void 0);v=()=>{e.then(T)}};function T(){for(var e;e=m();){try{e.h.call(e.g)}catch(n){p(n)}var t=g;t.j(e),t.h<100&&(t.h++,e.next=t.g,t.g=e)}w=!1}function I(){this.u=this.u,this.C=this.C}function b(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()},b.prototype.h=function(){this.defaultPrevented=!0};var S=function(){if(!i.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{const e=()=>{};i.addEventListener("test",e,t),i.removeEventListener("test",e,t)}catch(n){}return e}();function C(e){return/^[\s\xa0]*$/.test(e)}function A(e,t){b.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e&&this.init(e,t)}h(A,b),A.prototype.init=function(e,t){const n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;this.target=e.target||e.srcElement,this.g=t,(t=e.relatedTarget)||("mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement)),this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=e.pointerType,this.state=e.state,this.i=e,e.defaultPrevented&&A.Z.h.call(this)},A.prototype.h=function(){A.Z.h.call(this);const e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var k="closure_listenable_"+(1e6*Math.random()|0),N=0;function R(e,t,n,r,s){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ha=s,this.key=++N,this.da=this.fa=!1}function D(e){e.da=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function O(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function P(e){const t={};for(const n in e)t[n]=e[n];return t}const L="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function M(e,t){let n,r;for(let s=1;s<arguments.length;s++){for(n in r=arguments[s],r)e[n]=r[n];for(let t=0;t<L.length;t++)n=L[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function x(e){this.src=e,this.g={},this.h=0}function V(e,t){const n=t.type;if(n in e.g){var r,s=e.g[n],i=Array.prototype.indexOf.call(s,t,void 0);(r=i>=0)&&Array.prototype.splice.call(s,i,1),r&&(D(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function U(e,t,n,r){for(let s=0;s<e.length;++s){const i=e[s];if(!i.da&&i.listener==t&&i.capture==!!n&&i.ha==r)return s}return-1}x.prototype.add=function(e,t,n,r,s){const i=e.toString();(e=this.g[i])||(e=this.g[i]=[],this.h++);const o=U(e,t,r,s);return o>-1?(t=e[o],n||(t.fa=!1)):((t=new R(t,this.src,i,!!r,s)).fa=n,e.push(t)),t};var F="closure_lm_"+(1e6*Math.random()|0),j={};function B(e,t,n,r,s){if(Array.isArray(t)){for(let i=0;i<t.length;i++)B(e,t[i],n,r,s);return null}return n=W(n),e&&e[k]?e.J(t,n,o(r)?!!r.capture:!!r,s):function(e,t,n,r,s,i){if(!t)throw Error("Invalid event type");const a=o(s)?!!s.capture:!!s;let c=G(e);if(c||(e[F]=c=new x(e)),n=c.add(t,n,r,a,i),n.proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}const t=H;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)S||(s=a),void 0===s&&(s=!1),e.addEventListener(t.toString(),r,s);else if(e.attachEvent)e.attachEvent($(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}(e,t,n,!1,r,s)}function q(e,t,n,r,s){if(Array.isArray(t))for(var i=0;i<t.length;i++)q(e,t[i],n,r,s);else r=o(r)?!!r.capture:!!r,n=W(n),e&&e[k]?(e=e.i,(i=String(t).toString())in e.g&&((n=U(t=e.g[i],n,r,s))>-1&&(D(t[n]),Array.prototype.splice.call(t,n,1),0==t.length&&(delete e.g[i],e.h--)))):e&&(e=G(e))&&(t=e.g[t.toString()],e=-1,t&&(e=U(t,n,r,s)),(n=e>-1?t[e]:null)&&z(n))}function z(e){if("number"!=typeof e&&e&&!e.da){var t=e.src;if(t&&t[k])V(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent($(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=G(t))?(V(n,e),0==n.h&&(n.src=null,t[F]=null)):D(e)}}}function $(e){return e in j?j[e]:j[e]="on"+e}function H(e,t){if(e.da)e=!0;else{t=new A(t,this);const n=e.listener,r=e.ha||e.src;e.fa&&z(e),e=n.call(r,t)}return e}function G(e){return(e=e[F])instanceof x?e:null}var K="__closure_events_fn_"+(1e9*Math.random()>>>0);function W(e){return"function"==typeof e?e:(e[K]||(e[K]=function(t){return e.handleEvent(t)}),e[K])}function Q(){I.call(this),this.i=new x(this),this.M=this,this.G=null}function X(e,t){var n,r=e.G;if(r)for(n=[];r;r=r.G)n.push(r);if(e=e.M,r=t.type||t,"string"==typeof t)t=new b(t,e);else if(t instanceof b)t.target=t.target||e;else{var s=t;M(t=new b(r,e),s)}let i,o;if(s=!0,n)for(o=n.length-1;o>=0;o--)i=t.g=n[o],s=J(i,r,!0,t)&&s;if(i=t.g=e,s=J(i,r,!0,t)&&s,s=J(i,r,!1,t)&&s,n)for(o=0;o<n.length;o++)i=t.g=n[o],s=J(i,r,!1,t)&&s}function J(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();let s=!0;for(let i=0;i<t.length;++i){const o=t[i];if(o&&!o.da&&o.capture==n){const t=o.listener,n=o.ha||o.src;o.fa&&V(e.i,o),s=!1!==t.call(n,r)&&s}}return s&&!r.defaultPrevented}function Y(e){e.g=function(e,t){if("function"!=typeof e){if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=c(e.handleEvent,e)}return Number(t)>2147483647?-1:i.setTimeout(e,t||0)}(()=>{e.g=null,e.i&&(e.i=!1,Y(e))},e.l);const t=e.h;e.h=null,e.m.apply(null,t)}h(Q,I),Q.prototype[k]=!0,Q.prototype.removeEventListener=function(e,t,n,r){q(this,e,t,n,r)},Q.prototype.N=function(){if(Q.Z.N.call(this),this.i){var e=this.i;for(const t in e.g){const n=e.g[t];for(let e=0;e<n.length;e++)D(n[e]);delete e.g[t],e.h--}}this.G=null},Q.prototype.J=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Q.prototype.K=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};class Z extends I{constructor(e,t){super(),this.m=e,this.l=t,this.h=null,this.i=!1,this.g=null}j(e){this.h=arguments,this.g?this.i=!0:Y(this)}N(){super.N(),this.g&&(i.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ee(e){I.call(this),this.h=e,this.g={}}h(ee,I);var te=[];function ne(e){O(e.g,function(e,t){this.g.hasOwnProperty(t)&&z(e)},e),e.g={}}ee.prototype.N=function(){ee.Z.N.call(this),ne(this)},ee.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var re=i.JSON.stringify,se=i.JSON.parse,ie=class{stringify(e){return i.JSON.stringify(e,void 0)}parse(e){return i.JSON.parse(e,void 0)}};function oe(){}function ae(){}var ce={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ue(){b.call(this,"d")}function he(){b.call(this,"c")}h(ue,b),h(he,b);var le={},de=null;function fe(){return de=de||new Q}function pe(e){b.call(this,le.Ia,e)}function me(e){const t=fe();X(t,new pe(t))}function ge(e,t){b.call(this,le.STAT_EVENT,e),this.stat=t}function ye(e){const t=fe();X(t,new ge(t,e))}function ve(e,t){b.call(this,le.Ja,e),this.size=t}function we(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return i.setTimeout(function(){e()},t)}function _e(){this.g=!0}function Ee(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{const i=JSON.parse(t);if(i)for(e=0;e<i.length;e++)if(Array.isArray(i[e])){var n=i[e];if(!(n.length<2)){var r=n[1];if(Array.isArray(r)&&!(r.length<1)){var s=r[0];if("noop"!=s&&"stop"!=s&&"close"!=s)for(let e=1;e<r.length;e++)r[e]=""}}}return re(i)}catch(i){return t}}(e,n)+(r?" "+r:"")})}le.Ia="serverreachability",h(pe,b),le.STAT_EVENT="statevent",h(ge,b),le.Ja="timingevent",h(ve,b),_e.prototype.ua=function(){this.g=!1},_e.prototype.info=function(){};var Te,Ie={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},be={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"};function Se(){}function Ce(e){return encodeURIComponent(String(e))}function Ae(e){var t=1;e=e.split(":");const n=[];for(;t>0&&e.length;)n.push(e.shift()),t--;return e.length&&n.push(e.join(":")),n}function ke(e,t,n,r){this.j=e,this.i=t,this.l=n,this.S=r||1,this.V=new ee(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ne}function Ne(){this.i=null,this.g="",this.h=!1}h(Se,oe),Se.prototype.g=function(){return new XMLHttpRequest},Te=new Se;var Re={},De={};function Oe(e,t,n){e.M=1,e.A=rt(Ye(t)),e.u=n,e.R=!0,Pe(e,null)}function Pe(e,t){e.F=Date.now(),xe(e),e.B=Ye(e.A);var n=e.B,r=e.S;Array.isArray(r)||(r=[String(r)]),yt(n.i,"t",r),e.C=0,n=e.j.L,e.h=new Ne,e.g=rn(e.j,n?t:null,!e.u),e.P>0&&(e.O=new Z(c(e.Y,e,e.g),e.P)),t=e.V,n=e.g,r=e.ba;var s="readystatechange";Array.isArray(s)||(s&&(te[0]=s.toString()),s=te);for(let i=0;i<s.length;i++){const e=B(n,s[i],r||t.handleEvent,!1,t.h||t);if(!e)break;t.g[e.key]=e}t=e.J?P(e.J):{},e.u?(e.v||(e.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.B,e.v,e.u,t)):(e.v="GET",e.g.ea(e.B,e.v,null,t)),me(),function(e,t,n,r,s,i){e.info(function(){if(e.g)if(i){var o="",a=i.split("&");for(let e=0;e<a.length;e++){var c=a[e].split("=");if(c.length>1){const e=c[0];c=c[1];const t=e.split("_");o=t.length>=2&&"type"==t[1]?o+(e+"=")+c+"&":o+(e+"=redacted&")}}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+t+"\n"+n+"\n"+o})}(e.i,e.v,e.B,e.l,e.S,e.u)}function Le(e){return!!e.g&&("GET"==e.v&&2!=e.M&&e.j.Aa)}function Me(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?De:(n=Number(t.substring(n,r)),isNaN(n)?Re:(r+=1)+n>t.length?De:(t=t.slice(r,r+n),e.C=r+n,t))}function xe(e){e.T=Date.now()+e.H,Ve(e,e.H)}function Ve(e,t){if(null!=e.D)throw Error("WatchDog timer not null");e.D=we(c(e.aa,e),t)}function Ue(e){e.D&&(i.clearTimeout(e.D),e.D=null)}function Fe(e){0==e.j.I||e.K||Yt(e.j,e)}function je(e){Ue(e);var t=e.O;t&&"function"==typeof t.dispose&&t.dispose(),e.O=null,ne(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.dispose())}function Be(e,t){try{var n=e.j;if(0!=n.I&&(n.g==e||Ge(n.h,e)))if(!e.L&&Ge(n.h,e)&&3==n.I){try{var r=n.Ba.g.parse(t)}catch(h){r=null}if(Array.isArray(r)&&3==r.length){var s=r;if(0==s[0]){e:if(!n.v){if(n.g){if(!(n.g.F+3e3<e.F))break e;Jt(n),Bt(n)}Wt(n),ye(18)}}else n.xa=s[1],0<n.xa-n.K&&s[2]<37500&&n.F&&0==n.A&&!n.C&&(n.C=we(c(n.Va,n),6e3));He(n.h)<=1&&n.ta&&(n.ta=void 0)}else en(n,11)}else if((e.L||n.g==e)&&Jt(n),!C(t))for(s=n.Ba.g.parse(t),t=0;t<s.length;t++){let c=s[t];const h=c[0];if(!(h<=n.K))if(n.K=h,c=c[1],2==n.I)if("c"==c[0]){n.M=c[1],n.ba=c[2];const t=c[3];null!=t&&(n.ka=t,n.j.info("VER="+n.ka));const s=c[4];null!=s&&(n.za=s,n.j.info("SVER="+n.za));const h=c[5];null!=h&&"number"==typeof h&&h>0&&(r=1.5*h,n.O=r,n.j.info("backChannelRequestTimeoutMs_="+r)),r=n;const l=e.g;if(l){const e=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var i=r.h;i.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(i.j=i.l,i.g=new Set,i.h&&(Ke(i,i.h),i.h=null))}if(r.G){const e=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.wa=e,nt(r.J,r.G,e))}}n.I=3,n.l&&n.l.ra(),n.aa&&(n.T=Date.now()-e.F,n.j.info("Handshake RTT: "+n.T+"ms"));var o=e;if((r=n).na=nn(r,r.L?r.ba:null,r.W),o.L){We(r.h,o);var a=o,u=r.O;u&&(a.H=u),a.D&&(Ue(a),xe(a)),r.g=o}else Kt(r);n.i.length>0&&zt(n)}else"stop"!=c[0]&&"close"!=c[0]||en(n,7);else 3==n.I&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?en(n,7):jt(n):"noop"!=c[0]&&n.l&&n.l.qa(c),n.A=0)}me()}catch(h){}}ke.prototype.ba=function(e){e=e.target;const t=this.O;t&&3==xt(e)?t.j():this.Y(e)},ke.prototype.Y=function(e){try{if(e==this.g)e:{const c=xt(this.g),u=this.g.ya();this.g.ca();if(!(c<3)&&(3!=c||this.g&&(this.h.h||this.g.la()||Vt(this.g)))){this.K||4!=c||7==u||me(),Ue(this);var t=this.g.ca();this.X=t;var n=function(e){if(!Le(e))return e.g.la();const t=Vt(e.g);if(""===t)return"";let n="";const r=t.length,s=4==xt(e.g);if(!e.h.i){if("undefined"==typeof TextDecoder)return je(e),Fe(e),"";e.h.i=new i.TextDecoder}for(let i=0;i<r;i++)e.h.h=!0,n+=e.h.i.decode(t[i],{stream:!(s&&i==r-1)});return t.length=0,e.h.g+=n,e.C=0,e.h.g}(this);if(this.o=200==t,function(e,t,n,r,s,i,o){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+t+"\n"+n+"\n"+i+" "+o})}(this.i,this.v,this.B,this.l,this.S,c,t),this.o){if(this.U&&!this.L){t:{if(this.g){var r,s=this.g;if((r=s.g?s.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!C(r)){var o=r;break t}}o=null}if(!(e=o)){this.o=!1,this.m=3,ye(12),je(this),Fe(this);break e}Ee(this.i,this.l,e,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Be(this,e)}if(this.R){let t;for(e=!0;!this.K&&this.C<n.length;){if(t=Me(this,n),t==De){4==c&&(this.m=4,ye(14),e=!1),Ee(this.i,this.l,null,"[Incomplete Response]");break}if(t==Re){this.m=4,ye(15),Ee(this.i,this.l,n,"[Invalid Chunk]"),e=!1;break}Ee(this.i,this.l,t,null),Be(this,t)}if(Le(this)&&0!=this.C&&(this.h.g=this.h.g.slice(this.C),this.C=0),4!=c||0!=n.length||this.h.h||(this.m=1,ye(16),e=!1),this.o=this.o&&e,e){if(n.length>0&&!this.W){this.W=!0;var a=this.j;a.g==this&&a.aa&&!a.P&&(a.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),Qt(a),a.P=!0,ye(11))}}else Ee(this.i,this.l,n,"[Invalid Chunked Response]"),je(this),Fe(this)}else Ee(this.i,this.l,n,null),Be(this,n);4==c&&je(this),this.o&&!this.K&&(4==c?Yt(this.j,this):(this.o=!1,xe(this)))}else(function(e){const t={};e=(e.g&&xt(e)>=2&&e.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<e.length;r++){if(C(e[r]))continue;var n=Ae(e[r]);const s=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const i=t[s]||[];t[s]=i,i.push(n)}!function(e,t){for(const n in e)t.call(void 0,e[n],n,e)}(t,function(e){return e.join(", ")})})(this.g),400==t&&n.indexOf("Unknown SID")>0?(this.m=3,ye(12)):(this.m=0,ye(13)),je(this),Fe(this)}}}catch(c){}},ke.prototype.cancel=function(){this.K=!0,je(this)},ke.prototype.aa=function(){this.D=null;const e=Date.now();e-this.T>=0?(function(e,t){e.info(function(){return"TIMEOUT: "+t})}(this.i,this.B),2!=this.M&&(me(),ye(17)),je(this),this.m=2,Fe(this)):Ve(this,this.T-e)};var qe=class{constructor(e,t){this.g=e,this.map=t}};function ze(e){this.l=e||10,i.PerformanceNavigationTiming?e=(e=i.performance.getEntriesByType("navigation")).length>0&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(i.chrome&&i.chrome.loadTimes&&i.chrome.loadTimes()&&i.chrome.loadTimes().wasFetchedViaSpdy),this.j=e?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function $e(e){return!!e.h||!!e.g&&e.g.size>=e.j}function He(e){return e.h?1:e.g?e.g.size:0}function Ge(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ke(e,t){e.g?e.g.add(t):e.h=t}function We(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Qe(e){if(null!=e.h)return e.i.concat(e.h.G);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.G);return t}return d(e.i)}ze.prototype.cancel=function(){if(this.i=Qe(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}};var Xe=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Je(e){let t;this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1,e instanceof Je?(this.l=e.l,Ze(this,e.j),this.o=e.o,this.g=e.g,et(this,e.u),this.h=e.h,tt(this,vt(e.i)),this.m=e.m):e&&(t=String(e).match(Xe))?(this.l=!1,Ze(this,t[1]||"",!0),this.o=st(t[2]||""),this.g=st(t[3]||"",!0),et(this,t[4]),this.h=st(t[5]||"",!0),tt(this,t[6]||"",!0),this.m=st(t[7]||"")):(this.l=!1,this.i=new dt(null,this.l))}function Ye(e){return new Je(e)}function Ze(e,t,n){e.j=n?st(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function et(e,t){if(t){if(t=Number(t),isNaN(t)||t<0)throw Error("Bad port number "+t);e.u=t}else e.u=null}function tt(e,t,n){t instanceof dt?(e.i=t,function(e,t){t&&!e.j&&(ft(e),e.i=null,e.g.forEach(function(e,t){const n=t.toLowerCase();t!=n&&(pt(this,t),yt(this,n,e))},e)),e.j=t}(e.i,e.l)):(n||(t=it(t,ht)),e.i=new dt(t,e.l))}function nt(e,t,n){e.i.set(t,n)}function rt(e){return nt(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function st(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function it(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,ot),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function ot(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Je.prototype.toString=function(){const e=[];var t=this.j;t&&e.push(it(t,at,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.o)&&e.push(it(t,at,!0),"@"),e.push(Ce(n).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.u)&&e.push(":",String(n))),(n=this.h)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(it(n,"/"==n.charAt(0)?ut:ct,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.m)&&e.push("#",it(n,lt)),e.join("")},Je.prototype.resolve=function(e){const t=Ye(this);let n=!!e.j;n?Ze(t,e.j):n=!!e.o,n?t.o=e.o:n=!!e.g,n?t.g=e.g:n=null!=e.u;var r=e.h;if(n)et(t,e.u);else if(n=!!e.h){if("/"!=r.charAt(0))if(this.g&&!this.h)r="/"+r;else{var s=t.h.lastIndexOf("/");-1!=s&&(r=t.h.slice(0,s+1)+r)}if(".."==(s=r)||"."==s)r="";else if(-1!=s.indexOf("./")||-1!=s.indexOf("/.")){r=0==s.lastIndexOf("/",0),s=s.split("/");const e=[];for(let t=0;t<s.length;){const n=s[t++];"."==n?r&&t==s.length&&e.push(""):".."==n?((e.length>1||1==e.length&&""!=e[0])&&e.pop(),r&&t==s.length&&e.push("")):(e.push(n),r=!0)}r=e.join("/")}else r=s}return n?t.h=r:n=""!==e.i.toString(),n?tt(t,vt(e.i)):n=!!e.m,n&&(t.m=e.m),t};var at=/[#\/\?@]/g,ct=/[#\?:]/g,ut=/[#\?]/g,ht=/[#\?@]/g,lt=/#/g;function dt(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function ft(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(let n=0;n<e.length;n++){const r=e[n].indexOf("=");let s,i=null;r>=0?(s=e[n].substring(0,r),i=e[n].substring(r+1)):s=e[n],t(s,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}function pt(e,t){ft(e),t=wt(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function mt(e,t){return ft(e),t=wt(e,t),e.g.has(t)}function gt(e,t){ft(e);let n=[];if("string"==typeof t)mt(e,t)&&(n=n.concat(e.g.get(wt(e,t))));else for(e=Array.from(e.g.values()),t=0;t<e.length;t++)n=n.concat(e[t]);return n}function yt(e,t,n){pt(e,t),n.length>0&&(e.i=null,e.g.set(wt(e,t),d(n)),e.h+=n.length)}function vt(e){const t=new dt;return t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),t}function wt(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function _t(e,t,n,r,s){try{s&&(s.onload=null,s.onerror=null,s.onabort=null,s.ontimeout=null),r(n)}catch(i){}}function Et(){this.g=new ie}function Tt(e){this.i=e.Sb||null,this.h=e.ab||!1}function It(e,t){Q.call(this),this.H=e,this.o=t,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}function bt(e){e.j.read().then(e.Ma.bind(e)).catch(e.ga.bind(e))}function St(e){e.readyState=4,e.l=null,e.j=null,e.B=null,Ct(e)}function Ct(e){e.onreadystatechange&&e.onreadystatechange.call(e)}function At(e){let t="";return O(e,function(e,n){t+=n,t+=":",t+=e,t+="\r\n"}),t}function kt(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=At(n),"string"==typeof e?null!=n&&Ce(n):nt(e,t,n))}function Nt(e){Q.call(this),this.headers=new Map,this.L=e||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}(e=dt.prototype).add=function(e,t){ft(this),this.i=null,e=wt(this,e);let n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},e.forEach=function(e,t){ft(this),this.g.forEach(function(n,r){n.forEach(function(n){e.call(t,n,r,this)},this)},this)},e.set=function(e,t){return ft(this),this.i=null,mt(this,e=wt(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},e.get=function(e,t){return e&&(e=gt(this,e)).length>0?String(e[0]):t},e.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(let r=0;r<t.length;r++){var n=t[r];const s=Ce(n);n=gt(this,n);for(let t=0;t<n.length;t++){let r=s;""!==n[t]&&(r+="="+Ce(n[t])),e.push(r)}}return this.i=e.join("&")},h(Tt,oe),Tt.prototype.g=function(){return new It(this.i,this.h)},h(It,Q),(e=It.prototype).open=function(e,t){if(0!=this.readyState)throw this.abort(),Error("Error reopening a connection");this.F=e,this.D=t,this.readyState=1,Ct(this)},e.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const t={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};e&&(t.body=e),(this.H||i).fetch(new Request(this.D,t)).then(this.Pa.bind(this),this.ga.bind(this))},e.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&4!=this.readyState&&(this.g=!1,St(this)),this.readyState=0},e.Pa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Ct(this)),this.g&&(this.readyState=3,Ct(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(void 0!==i.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;bt(this)}else e.text().then(this.Oa.bind(this),this.ga.bind(this))},e.Ma=function(e){if(this.g){if(this.o&&e.value)this.response.push(e.value);else if(!this.o){var t=e.value?e.value:new Uint8Array(0);(t=this.B.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?St(this):Ct(this),3==this.readyState&&bt(this)}},e.Oa=function(e){this.g&&(this.response=this.responseText=e,St(this))},e.Na=function(e){this.g&&(this.response=e,St(this))},e.ga=function(){this.g&&St(this)},e.setRequestHeader=function(e,t){this.A.append(e,t)},e.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},e.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(It.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}}),h(Nt,Q);var Rt=/^https?$/i,Dt=["POST","PUT"];function Ot(e,t){e.h=!1,e.g&&(e.j=!0,e.g.abort(),e.j=!1),e.l=t,e.o=5,Pt(e),Mt(e)}function Pt(e){e.A||(e.A=!0,X(e,"complete"),X(e,"error"))}function Lt(e){if(e.h&&void 0!==s)if(e.v&&4==xt(e))setTimeout(e.Ca.bind(e),0);else if(X(e,"readystatechange"),4==xt(e)){e.h=!1;try{const s=e.ca();e:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===s){let t=String(e.D).match(Xe)[1]||null;!t&&i.self&&i.self.location&&(t=i.self.location.protocol.slice(0,-1)),r=!Rt.test(t?t.toLowerCase():"")}n=r}if(n)X(e,"complete"),X(e,"success");else{e.o=6;try{var o=xt(e)>2?e.g.statusText:""}catch(a){o=""}e.l=o+" ["+e.ca()+"]",Pt(e)}}finally{Mt(e)}}}function Mt(e,t){if(e.g){e.m&&(clearTimeout(e.m),e.m=null);const r=e.g;e.g=null,t||X(e,"ready");try{r.onreadystatechange=null}catch(n){}}}function xt(e){return e.g?e.g.readyState:0}function Vt(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.F){case"":case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(t){return null}}function Ut(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Ft(e){this.za=0,this.i=[],this.j=new _e,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ut("failFast",!1,e),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ut("baseRetryDelayMs",5e3,e),this.Za=Ut("retryDelaySeedMs",1e4,e),this.Ta=Ut("forwardChannelMaxRetries",2,e),this.va=Ut("forwardChannelRequestTimeoutMs",2e4,e),this.ma=e&&e.xmlHttpFactory||void 0,this.Ua=e&&e.Rb||void 0,this.Aa=e&&e.useFetchStreams||!1,this.O=void 0,this.L=e&&e.supportsCrossDomainXhr||!1,this.M="",this.h=new ze(e&&e.concurrentRequestLimit),this.Ba=new Et,this.S=e&&e.fastHandshake||!1,this.R=e&&e.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=e&&e.Pb||!1,e&&e.ua&&this.j.ua(),e&&e.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&e&&e.detectBufferingProxy||!1,this.ia=void 0,e&&e.longPollingTimeout&&e.longPollingTimeout>0&&(this.ia=e.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}function jt(e){if(qt(e),3==e.I){var t=e.V++,n=Ye(e.J);if(nt(n,"SID",e.M),nt(n,"RID",t),nt(n,"TYPE","terminate"),Ht(e,n),(t=new ke(e,e.j,t)).M=2,t.A=rt(Ye(n)),n=!1,i.navigator&&i.navigator.sendBeacon)try{n=i.navigator.sendBeacon(t.A.toString(),"")}catch(r){}!n&&i.Image&&((new Image).src=t.A,n=!0),n||(t.g=rn(t.j,null),t.g.ea(t.A)),t.F=Date.now(),xe(t)}tn(e)}function Bt(e){e.g&&(Qt(e),e.g.cancel(),e.g=null)}function qt(e){Bt(e),e.v&&(i.clearTimeout(e.v),e.v=null),Jt(e),e.h.cancel(),e.m&&("number"==typeof e.m&&i.clearTimeout(e.m),e.m=null)}function zt(e){if(!$e(e.h)&&!e.m){e.m=!0;var t=e.Ea;v||E(),w||(v(),w=!0),_.add(t,e),e.D=0}}function $t(e,t){var n;n=t?t.l:e.V++;const r=Ye(e.J);nt(r,"SID",e.M),nt(r,"RID",n),nt(r,"AID",e.K),Ht(e,r),e.u&&e.o&&kt(r,e.u,e.o),n=new ke(e,e.j,n,e.D+1),null===e.u&&(n.J=e.o),t&&(e.i=t.G.concat(e.i)),t=Gt(e,n,1e3),n.H=Math.round(.5*e.va)+Math.round(.5*e.va*Math.random()),Ke(e.h,n),Oe(n,r,t)}function Ht(e,t){e.H&&O(e.H,function(e,n){nt(t,n,e)}),e.l&&O({},function(e,n){nt(t,n,e)})}function Gt(e,t,n){n=Math.min(e.i.length,n);const r=e.l?c(e.l.Ka,e.l,e):null;e:{var s=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?n>0?(t=s[0].g,e.push("ofs="+t)):t=0:e.push("ofs="+t);let c=!0;for(let h=0;h<n;h++){var i=s[h].g;const n=s[h].map;if((i-=t)<0)t=Math.max(0,s[h].g-100),c=!1;else try{i="req"+i+"_"||"";try{var a=n instanceof Map?n:Object.entries(n);for(const[t,n]of a){let r=n;o(n)&&(r=re(n)),e.push(i+t+"="+encodeURIComponent(r))}}catch(u){throw e.push(i+"type="+encodeURIComponent("_badmap")),u}}catch(u){r&&r(n)}}if(c){a=e.join("&");break e}}a=void 0}return e=e.i.splice(0,n),t.G=e,a}function Kt(e){if(!e.g&&!e.v){e.Y=1;var t=e.Da;v||E(),w||(v(),w=!0),_.add(t,e),e.A=0}}function Wt(e){return!(e.g||e.v||e.A>=3)&&(e.Y++,e.v=we(c(e.Da,e),Zt(e,e.A)),e.A++,!0)}function Qt(e){null!=e.B&&(i.clearTimeout(e.B),e.B=null)}function Xt(e){e.g=new ke(e,e.j,"rpc",e.Y),null===e.u&&(e.g.J=e.o),e.g.P=0;var t=Ye(e.na);nt(t,"RID","rpc"),nt(t,"SID",e.M),nt(t,"AID",e.K),nt(t,"CI",e.F?"0":"1"),!e.F&&e.ia&&nt(t,"TO",e.ia),nt(t,"TYPE","xmlhttp"),Ht(e,t),e.u&&e.o&&kt(t,e.u,e.o),e.O&&(e.g.H=e.O);var n=e.g;e=e.ba,n.M=1,n.A=rt(Ye(t)),n.u=null,n.R=!0,Pe(n,e)}function Jt(e){null!=e.C&&(i.clearTimeout(e.C),e.C=null)}function Yt(e,t){var n=null;if(e.g==t){Jt(e),Qt(e),e.g=null;var r=2}else{if(!Ge(e.h,t))return;n=t.G,We(e.h,t),r=1}if(0!=e.I)if(t.o)if(1==r){n=t.u?t.u.length:0,t=Date.now()-t.F;var s=e.D;X(r=fe(),new ve(r,n)),zt(e)}else Kt(e);else if(3==(s=t.m)||0==s&&t.X>0||!(1==r&&function(e,t){return!(He(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.G.concat(e.i),0):1==e.I||2==e.I||e.D>=(e.Sa?0:e.Ta)||(e.m=we(c(e.Ea,e,t),Zt(e,e.D)),e.D++,0)))}(e,t)||2==r&&Wt(e)))switch(n&&n.length>0&&(t=e.h,t.i=t.i.concat(n)),s){case 1:en(e,5);break;case 4:en(e,10);break;case 3:en(e,6);break;default:en(e,2)}}function Zt(e,t){let n=e.Qa+Math.floor(Math.random()*e.Za);return e.isActive()||(n*=2),n*t}function en(e,t){if(e.j.info("Error code "+t),2==t){var n=c(e.bb,e),r=e.Ua;const t=!r;r=new Je(r||"//www.google.com/images/cleardot.gif"),i.location&&"http"==i.location.protocol||Ze(r,"https"),rt(r),t?function(e,t){const n=new _e;if(i.Image){const r=new Image;r.onload=u(_t,n,"TestLoadImage: loaded",!0,t,r),r.onerror=u(_t,n,"TestLoadImage: error",!1,t,r),r.onabort=u(_t,n,"TestLoadImage: abort",!1,t,r),r.ontimeout=u(_t,n,"TestLoadImage: timeout",!1,t,r),i.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}(r.toString(),n):function(e,t){new _e;const n=new AbortController,r=setTimeout(()=>{n.abort(),_t(0,0,!1,t)},1e4);fetch(e,{signal:n.signal}).then(e=>{clearTimeout(r),e.ok?_t(0,0,!0,t):_t(0,0,!1,t)}).catch(()=>{clearTimeout(r),_t(0,0,!1,t)})}(r.toString(),n)}else ye(2);e.I=0,e.l&&e.l.pa(t),tn(e),qt(e)}function tn(e){if(e.I=0,e.ja=[],e.l){const t=Qe(e.h);0==t.length&&0==e.i.length||(f(e.ja,t),f(e.ja,e.i),e.h.i.length=0,d(e.i),e.i.length=0),e.l.oa()}}function nn(e,t,n){var r=n instanceof Je?Ye(n):new Je(n);if(""!=r.g)t&&(r.g=t+"."+r.g),et(r,r.u);else{var s=i.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;const e=new Je(null);r&&Ze(e,r),t&&(e.g=t),s&&et(e,s),n&&(e.h=n),r=e}return n=e.G,t=e.wa,n&&t&&nt(r,n,t),nt(r,"VER",e.ka),Ht(e,r),r}function rn(e,t,n){if(t&&!e.L)throw Error("Can't create secondary domain capable XhrIo object.");return(t=e.Aa&&!e.ma?new Nt(new Tt({ab:n})):new Nt(e.ma)).Fa(e.L),t}function sn(){}function on(){}function an(e,t){Q.call(this),this.g=new Ft(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.o=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.sa&&(e?e["X-WebChannel-Client-Profile"]=t.sa:e={"X-WebChannel-Client-Profile":t.sa}),this.g.U=e,(e=t&&t.Qb)&&!C(e)&&(this.g.u=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!C(t)&&(this.g.G=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new hn(this)}function cn(e){ue.call(this),e.__headers__&&(this.headers=e.__headers__,this.statusCode=e.__status__,delete e.__headers__,delete e.__status__);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function un(){he.call(this),this.status=1}function hn(e){this.g=e}(e=Nt.prototype).Fa=function(e){this.H=e},e.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+e);t=t?t.toUpperCase():"GET",this.D=e,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Te.g(),this.g.onreadystatechange=l(c(this.Ca,this));try{this.B=!0,this.g.open(t,String(e),!0),this.B=!1}catch(o){return void Ot(this,o)}if(e=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)n.set(s,r[s]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const e of r.keys())n.set(e,r.get(e))}r=Array.from(n.keys()).find(e=>"content-type"==e.toLowerCase()),s=i.FormData&&e instanceof i.FormData,!(Array.prototype.indexOf.call(Dt,t,void 0)>=0)||r||s||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,a]of n)this.g.setRequestHeader(i,a);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(e),this.v=!1}catch(o){Ot(this,o)}},e.abort=function(e){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=e||7,X(this,"complete"),X(this,"abort"),Mt(this))},e.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Mt(this,!0)),Nt.Z.N.call(this)},e.Ca=function(){this.u||(this.B||this.v||this.j?Lt(this):this.Xa())},e.Xa=function(){Lt(this)},e.isActive=function(){return!!this.g},e.ca=function(){try{return xt(this)>2?this.g.status:-1}catch(e){return-1}},e.la=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},e.La=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),se(t)}},e.ya=function(){return this.o},e.Ha=function(){return"string"==typeof this.l?this.l:String(this.l)},(e=Ft.prototype).ka=8,e.I=1,e.connect=function(e,t,n,r){ye(0),this.W=e,this.H=t||{},n&&void 0!==r&&(this.H.OSID=n,this.H.OAID=r),this.F=this.X,this.J=nn(this,null,this.W),zt(this)},e.Ea=function(e){if(this.m)if(this.m=null,1==this.I){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const s=new ke(this,this.j,e);let i=this.o;if(this.U&&(i?(i=P(i),M(i,this.U)):i=this.U),null!==this.u||this.R||(s.J=i,i=null),this.S)e:{for(var t=0,n=0;n<this.i.length;n++){var r=this.i[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if((t+=r)>4096){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=Gt(this,s,t),nt(n=Ye(this.J),"RID",e),nt(n,"CVER",22),this.G&&nt(n,"X-HTTP-Session-Id",this.G),Ht(this,n),i&&(this.R?t="headers="+Ce(At(i))+"&"+t:this.u&&kt(n,this.u,i)),Ke(this.h,s),this.Ra&&nt(n,"TYPE","init"),this.S?(nt(n,"$req",t),nt(n,"SID","null"),s.U=!0,Oe(s,n,null)):Oe(s,n,t),this.I=2}}else 3==this.I&&(e?$t(this,e):0==this.i.length||$e(this.h)||$t(this))},e.Da=function(){if(this.v=null,Xt(this),this.aa&&!(this.P||null==this.g||this.T<=0)){var e=4*this.T;this.j.info("BP detection timer enabled: "+e),this.B=we(c(this.Wa,this),e)}},e.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,ye(10),Bt(this),Xt(this))},e.Va=function(){null!=this.C&&(this.C=null,Bt(this),Wt(this),ye(19))},e.bb=function(e){e?(this.j.info("Successfully pinged google.com"),ye(2)):(this.j.info("Failed to ping google.com"),ye(1))},e.isActive=function(){return!!this.l&&this.l.isActive(this)},(e=sn.prototype).ra=function(){},e.qa=function(){},e.pa=function(){},e.oa=function(){},e.isActive=function(){return!0},e.Ka=function(){},on.prototype.g=function(e,t){return new an(e,t)},h(an,Q),an.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},an.prototype.close=function(){jt(this.g)},an.prototype.o=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=re(e),e=n);t.i.push(new qe(t.Ya++,e)),3==t.I&&zt(t)},an.prototype.N=function(){this.g.l=null,delete this.j,jt(this.g),delete this.g,an.Z.N.call(this)},h(cn,ue),h(un,he),h(hn,sn),hn.prototype.ra=function(){X(this.g,"a")},hn.prototype.qa=function(e){X(this.g,new cn(e))},hn.prototype.pa=function(e){X(this.g,new un)},hn.prototype.oa=function(){X(this.g,"b")},on.prototype.createWebChannel=on.prototype.g,an.prototype.send=an.prototype.o,an.prototype.open=an.prototype.m,an.prototype.close=an.prototype.close,Ts=function(){return new on},Es=function(){return fe()},_s=le,ws={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ie.NO_ERROR=0,Ie.TIMEOUT=8,Ie.HTTP_ERROR=6,vs=Ie,be.COMPLETE="complete",ys=be,ae.EventType=ce,ce.OPEN="a",ce.CLOSE="b",ce.ERROR="c",ce.MESSAGE="d",Q.prototype.listen=Q.prototype.J,gs=ae,Nt.prototype.listenOnce=Nt.prototype.K,Nt.prototype.getLastError=Nt.prototype.Ha,Nt.prototype.getLastErrorCode=Nt.prototype.ya,Nt.prototype.getStatus=Nt.prototype.ca,Nt.prototype.getResponseJson=Nt.prototype.La,Nt.prototype.getResponseText=Nt.prototype.la,Nt.prototype.send=Nt.prototype.ea,Nt.prototype.setWithCredentials=Nt.prototype.Fa,ms=Nt}).apply(void 0!==Is?Is:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});const bs="@firebase/firestore",Ss="4.9.2";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Cs.UNAUTHENTICATED=new Cs(null),Cs.GOOGLE_CREDENTIALS=new Cs("google-credentials-uid"),Cs.FIRST_PARTY=new Cs("first-party-uid"),Cs.MOCK_USER=new Cs("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let As="12.3.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=new j("@firebase/firestore");function Ns(){return ks.logLevel}function Rs(e,...t){if(ks.logLevel<=L.DEBUG){const n=t.map(Ps);ks.debug(`Firestore (${As}): ${e}`,...n)}}function Ds(e,...t){if(ks.logLevel<=L.ERROR){const n=t.map(Ps);ks.error(`Firestore (${As}): ${e}`,...n)}}function Os(e,...t){if(ks.logLevel<=L.WARN){const n=t.map(Ps);ks.warn(`Firestore (${As}): ${e}`,...n)}}function Ps(e){if("string"==typeof e)return e;try{
/**
    * @license
    * Copyright 2020 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
return t=e,JSON.stringify(t)}catch(n){return e}var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(e,t,n){let r="Unexpected state";"string"==typeof t?r=t:n=t,Ms(e,r,n)}function Ms(e,t,n){let r=`FIRESTORE (${As}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;if(void 0!==n)try{r+=" CONTEXT: "+JSON.stringify(n)}catch(s){r+=" CONTEXT: "+n}throw Ds(r),new Error(r)}function xs(e,t,n,r){let s="Unexpected state";"string"==typeof n?s=n:r=n,e||Ms(t,s,r)}function Vs(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Fs extends w{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class qs{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Cs.UNAUTHENTICATED))}shutdown(){}}class zs{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class $s{constructor(e){this.t=e,this.currentUser=Cs.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){xs(void 0===this.o,42304);let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let s=new js;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new js,e.enqueueRetryable(()=>r(this.currentUser))};const i=()=>{const t=s;e.enqueueRetryable(async()=>{await t.promise,await r(this.currentUser)})},o=e=>{Rs("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.o&&(this.auth.addAuthTokenListener(this.o),i())};this.t.onInit(e=>o(e)),setTimeout(()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Rs("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new js)}},0),i()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(Rs("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(xs("string"==typeof t.accessToken,31837,{l:t}),new Bs(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xs(null===e||"string"==typeof e,2055,{h:e}),new Cs(e)}}class Hs{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Cs.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Gs{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Hs(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Cs.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ks{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ws{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Be(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){xs(void 0===this.o,3512);const n=e=>{null!=e.error&&Rs("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.m;return this.m=e.token,Rs("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};const r=e=>{Rs("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(e=>r(e)),setTimeout(()=>{if(!this.appCheck){const e=this.V.getImmediate({optional:!0});e?r(e):Rs("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ks(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?(xs("string"==typeof e.token,44558,{tokenResult:e}),this.m=e.token,new Ks(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qs(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{static newId(){const e=62*Math.floor(256/62);let t="";for(;t.length<20;){const n=Qs(40);for(let r=0;r<n.length;++r)t.length<20&&n[r]<e&&(t+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(n[r]%62))}return t}}function Js(e,t){return e<t?-1:e>t?1:0}function Ys(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.charAt(r),s=t.charAt(r);if(n!==s)return ti(n)===ti(s)?Js(n,s):ti(n)?1:-1}return Js(e.length,t.length)}const Zs=55296,ei=57343;function ti(e){const t=e.charCodeAt(0);return t>=Zs&&t<=ei}function ni(e,t,n){return e.length===t.length&&e.every((e,r)=>n(e,t[r]))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ri="__name__";class si{constructor(e,t,n){void 0===t?t=0:t>e.length&&Ls(637,{offset:t,range:e.length}),void 0===n?n=e.length-t:n>e.length-t&&Ls(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===si.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof si?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=si.compareSegments(e.get(r),t.get(r));if(0!==n)return n}return Js(e.length,t.length)}static compareSegments(e,t){const n=si.isNumericId(e),r=si.isNumericId(t);return n&&!r?-1:!n&&r?1:n&&r?si.extractNumericId(e).compare(si.extractNumericId(t)):Ys(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ds.fromString(e.substring(4,e.length-2))}}class ii extends si{construct(e,t,n){return new ii(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new Fs(Us.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new ii(t)}static emptyPath(){return new ii([])}}const oi=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ai extends si{construct(e,t,n){return new ai(e,t,n)}static isValidIdentifier(e){return oi.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ai.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&this.get(0)===ri}static keyField(){return new ai([ri])}static fromServerFormat(e){const t=[];let n="",r=0;const s=()=>{if(0===n.length)throw new Fs(Us.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let i=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new Fs(Us.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new Fs(Us.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(i=!i,r++):"."!==t||i?(n+=t,r++):(s(),r++)}if(s(),i)throw new Fs(Us.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ai(t)}static emptyPath(){return new ai([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e){this.path=e}static fromPath(e){return new ci(ii.fromString(e))}static fromName(e){return new ci(ii.fromString(e).popFirst(5))}static empty(){return new ci(ii.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===ii.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return ii.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new ci(new ii(e.slice()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(e,t,n){if(!n)throw new Fs(Us.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function hi(e){if(!ci.isDocumentKey(e))throw new Fs(Us.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function li(e){if(ci.isDocumentKey(e))throw new Fs(Us.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function di(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}function fi(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":Ls(12329,{type:typeof e})}function pi(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new Fs(Us.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=fi(e);throw new Fs(Us.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function mi(e,t){const n={typeString:e};return t&&(n.value=t),n}function gi(e,t){if(!di(e))throw new Fs(Us.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in t)if(t[r]){const s=t[r].typeString,i="value"in t[r]?{value:t[r].value}:void 0;if(!(r in e)){n=`JSON missing required field: '${r}'`;break}const o=e[r];if(s&&typeof o!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(void 0!==i&&o!==i.value){n=`Expected '${r}' field to equal '${i.value}'`;break}}if(n)throw new Fs(Us.INVALID_ARGUMENT,n);return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi=-62135596800,vi=1e6;class wi{static now(){return wi.fromMillis(Date.now())}static fromDate(e){return wi.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*vi);return new wi(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new Fs(Us.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new Fs(Us.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yi)throw new Fs(Us.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new Fs(Us.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vi}_compareTo(e){return this.seconds===e.seconds?Js(this.nanoseconds,e.nanoseconds):Js(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:wi._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(gi(e,wi._jsonSchema))return new wi(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-yi;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}wi._jsonSchemaVersion="firestore/timestamp/1.0",wi._jsonSchema={type:mi("string",wi._jsonSchemaVersion),seconds:mi("number"),nanoseconds:mi("number")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _i{static fromTimestamp(e){return new _i(e)}static min(){return new _i(new wi(0,0))}static max(){return new _i(new wi(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(e){return new Ti(e.readTime,e.key,-1)}class Ti{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Ti(_i.min(),ci.empty(),-1)}static max(){return new Ti(_i.max(),ci.empty(),-1)}}function Ii(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=ci.comparator(e.documentKey,t.documentKey),0!==n?n:Js(e.largestBatchId,t.largestBatchId)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */)}class bi{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Si(e){if(e.code!==Us.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;Rs("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Ls(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Ci((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof Ci?t:Ci.resolve(t)}catch(t){return Ci.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):Ci.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):Ci.reject(t)}static resolve(e){return new Ci((t,n)=>{t(e)})}static reject(e){return new Ci((t,n)=>{n(e)})}static waitFor(e){return new Ci((t,n)=>{let r=0,s=0,i=!1;e.forEach(e=>{++r,e.next(()=>{++s,i&&s===r&&t()},e=>n(e))}),i=!0,s===r&&t()})}static or(e){let t=Ci.resolve(!1);for(const n of e)t=t.next(e=>e?Ci.resolve(e):n());return t}static forEach(e,t){const n=[];return e.forEach((e,r)=>{n.push(t.call(this,e,r))}),this.waitFor(n)}static mapArray(e,t){return new Ci((n,r)=>{const s=e.length,i=new Array(s);let o=0;for(let a=0;a<s;a++){const c=a;t(e[c]).next(e=>{i[c]=e,++o,o===s&&n(i)},e=>r(e))}})}static doWhile(e,t){return new Ci((n,r)=>{const s=()=>{!0===e()?t().next(()=>{s()},r):n()};s()})}}function Ai(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ae(e),this.ue=e=>t.writeSequenceNumber(e))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ki.ce=-1;function Ni(e){return null==e}function Ri(e){return 0===e&&1/e==-1/0}function Di(e,t){let n=t;const r=e.length;for(let s=0;s<r;s++){const t=e.charAt(s);switch(t){case"\0":n+="";break;case"":n+="";break;default:n+=t}}return n}function Oi(e){return e+""}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Li(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Mi(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,t){this.comparator=e,this.root=t||Ui.EMPTY}insert(e,t){return new xi(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ui.BLACK,null,null))}remove(e){return new xi(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ui.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vi(this.root,e,this.comparator,!0)}}class Vi{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&r&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(0===s){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ui{constructor(e,t,n,r,s){this.key=e,this.value=t,this.color=null!=n?n:Ui.RED,this.left=null!=r?r:Ui.EMPTY,this.right=null!=s?s:Ui.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,s){return new Ui(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=s?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const s=n(e,r.key);return r=s<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===s?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ui.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return Ui.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ui.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ui.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Ls(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Ls(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Ls(27949);return e+(this.isRed()?0:1)}}Ui.EMPTY=null,Ui.RED=!0,Ui.BLACK=!1,Ui.EMPTY=new class{constructor(){this.size=0}get key(){throw Ls(57766)}get value(){throw Ls(16141)}get color(){throw Ls(16727)}get left(){throw Ls(29726)}get right(){throw Ls(36894)}copy(e,t,n,r,s){return this}insert(e,t,n){return new Ui(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fi{constructor(e){this.comparator=e,this.data=new xi(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ji(this.data.getIterator())}getIteratorFrom(e){return new ji(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof Fi))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Fi(this.comparator);return t.data=e,t}}class ji{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e){this.fields=e,e.sort(ai.comparator)}static empty(){return new Bi([])}unionWith(e){let t=new Fi(ai.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Bi(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ni(this.fields,e.fields,(e,t)=>e.isEqual(t))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(e){try{return atob(e)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new qi("Invalid base64 string: "+t):t}}(e);return new zi(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new zi(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Js(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}zi.EMPTY_BYTE_STRING=new zi("");const $i=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Hi(e){if(xs(!!e,39018),"string"==typeof e){let t=0;const n=$i.exec(e);if(xs(!!n,46558,{timestamp:e}),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Gi(e.seconds),nanos:Gi(e.nanos)}}function Gi(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Ki(e){return"string"==typeof e?zi.fromBase64String(e):zi.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi="server_timestamp",Qi="__type__",Xi="__previous_value__",Ji="__local_write_time__";function Yi(e){var t,n;return(null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[Qi])?void 0:n.stringValue)===Wi}function Zi(e){const t=e.mapValue.fields[Xi];return Yi(t)?Zi(t):t}function eo(e){const t=Hi(e.mapValue.fields[Ji].timestampValue);return new wi(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t,n,r,s,i,o,a,c,u){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=o,this.longPollingOptions=a,this.useFetchStreams=c,this.isUsingEmulator=u}}const no="(default)";class ro{constructor(e,t){this.projectId=e,this.database=t||no}static empty(){return new ro("","")}get isDefaultDatabase(){return this.database===no}isEqual(e){return e instanceof ro&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so="__type__",io="__max__",oo={fields:{__type__:{stringValue:io}}},ao="__vector__",co="value";function uo(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Yi(e)?4:function(e){return(((e.mapValue||{}).fields||{}).__type__||{}).stringValue===io}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)?9007199254740991:function(e){var t,n;const r=null==(n=((null==(t=null==e?void 0:e.mapValue)?void 0:t.fields)||{})[so])?void 0:n.stringValue;return r===ao}(e)?10:11:Ls(28295,{value:e})}function ho(e,t){if(e===t)return!0;const n=uo(e);if(n!==uo(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return eo(e).isEqual(eo(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Hi(e.timestampValue),r=Hi(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return r=t,Ki(e.bytesValue).isEqual(Ki(r.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Gi(e.geoPointValue.latitude)===Gi(t.geoPointValue.latitude)&&Gi(e.geoPointValue.longitude)===Gi(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Gi(e.integerValue)===Gi(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Gi(e.doubleValue),r=Gi(t.doubleValue);return n===r?Ri(n)===Ri(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return ni(e.arrayValue.values||[],t.arrayValue.values||[],ho);case 10:case 11:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(Pi(n)!==Pi(r))return!1;for(const s in n)if(n.hasOwnProperty(s)&&(void 0===r[s]||!ho(n[s],r[s])))return!1;return!0}(e,t);default:return Ls(52216,{left:e})}var r}function lo(e,t){return void 0!==(e.values||[]).find(e=>ho(e,t))}function fo(e,t){if(e===t)return 0;const n=uo(e),r=uo(t);if(n!==r)return Js(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Js(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Gi(e.integerValue||e.doubleValue),r=Gi(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return po(e.timestampValue,t.timestampValue);case 4:return po(eo(e),eo(t));case 5:return Ys(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Ki(e),r=Ki(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let s=0;s<n.length&&s<r.length;s++){const e=Js(n[s],r[s]);if(0!==e)return e}return Js(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=Js(Gi(e.latitude),Gi(t.latitude));return 0!==n?n:Js(Gi(e.longitude),Gi(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return mo(e.arrayValue,t.arrayValue);case 10:return function(e,t){var n,r,s,i;const o=e.fields||{},a=t.fields||{},c=null==(n=o[co])?void 0:n.arrayValue,u=null==(r=a[co])?void 0:r.arrayValue,h=Js((null==(s=null==c?void 0:c.values)?void 0:s.length)||0,(null==(i=null==u?void 0:u.values)?void 0:i.length)||0);return 0!==h?h:mo(c,u)}(e.mapValue,t.mapValue);case 11:return function(e,t){if(e===oo&&t===oo)return 0;if(e===oo)return 1;if(t===oo)return-1;const n=e.fields||{},r=Object.keys(n),s=t.fields||{},i=Object.keys(s);r.sort(),i.sort();for(let o=0;o<r.length&&o<i.length;++o){const e=Ys(r[o],i[o]);if(0!==e)return e;const t=fo(n[r[o]],s[i[o]]);if(0!==t)return t}return Js(r.length,i.length)}(e.mapValue,t.mapValue);default:throw Ls(23264,{he:n})}}function po(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return Js(e,t);const n=Hi(e),r=Hi(t),s=Js(n.seconds,r.seconds);return 0!==s?s:Js(n.nanos,r.nanos)}function mo(e,t){const n=e.values||[],r=t.values||[];for(let s=0;s<n.length&&s<r.length;++s){const e=fo(n[s],r[s]);if(e)return e}return Js(n.length,r.length)}function go(e){return yo(e)}function yo(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Hi(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Ki(e.bytesValue).toBase64():"referenceValue"in e?function(e){return ci.fromName(e).toString()}(e.referenceValue):"geoPointValue"in e?function(e){return`geo(${e.latitude},${e.longitude})`}(e.geoPointValue):"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=yo(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const s of t)r?r=!1:n+=",",n+=`${s}:${yo(e.fields[s])}`;return n+"}"}(e.mapValue):Ls(61005,{value:e})}function vo(e){switch(uo(e)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Zi(e);return t?16+vo(t):16;case 5:return 2*e.stringValue.length;case 6:return Ki(e.bytesValue).approximateByteSize();case 7:return e.referenceValue.length;case 9:return(e.arrayValue.values||[]).reduce((e,t)=>e+vo(t),0);case 10:case 11:return function(e){let t=0;return Li(e.fields,(e,n)=>{t+=e.length+vo(n)}),t}(e.mapValue);default:throw Ls(13486,{value:e})}}function wo(e,t){return{referenceValue:`projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`}}function _o(e){return!!e&&"integerValue"in e}function Eo(e){return!!e&&"arrayValue"in e}function To(e){return!!e&&"nullValue"in e}function Io(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function bo(e){return!!e&&"mapValue"in e}function So(e){if(e.geoPointValue)return{geoPointValue:{...e.geoPointValue}};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:{...e.timestampValue}};if(e.mapValue){const t={mapValue:{fields:{}}};return Li(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=So(n)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=So(e.arrayValue.values[n]);return t}return{...e}}class Co{constructor(e){this.value=e}static empty(){return new Co({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!bo(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=So(t)}setAll(e){let t=ai.emptyPath(),n={},r=[];e.forEach((e,s)=>{if(!t.isImmediateParentOf(s)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=s.popLast()}e?n[s.lastSegment()]=So(e):r.push(s.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,n,r)}delete(e){const t=this.field(e.popLast());bo(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ho(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];bo(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){Li(t,(t,n)=>e[t]=n);for(const r of n)delete e[r]}clone(){return new Co(So(this.value))}}function Ao(e){const t=[];return Li(e.fields,(e,n)=>{const r=new ai([e]);if(bo(n)){const e=Ao(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)}),new Bi(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class ko{constructor(e,t,n,r,s,i,o){this.key=e,this.documentType=t,this.version=n,this.readTime=r,this.createTime=s,this.data=i,this.documentState=o}static newInvalidDocument(e){return new ko(e,0,_i.min(),_i.min(),_i.min(),Co.empty(),0)}static newFoundDocument(e,t,n,r){return new ko(e,1,t,_i.min(),n,r,0)}static newNoDocument(e,t){return new ko(e,2,t,_i.min(),_i.min(),Co.empty(),0)}static newUnknownDocument(e,t){return new ko(e,3,t,_i.min(),_i.min(),Co.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(_i.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Co.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Co.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=_i.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof ko&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ko(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e,t){this.position=e,this.inclusive=t}}function Ro(e,t,n){let r=0;for(let s=0;s<e.position.length;s++){const i=t[s],o=e.position[s];if(r=i.field.isKeyField()?ci.comparator(ci.fromName(o.referenceValue),n.key):fo(o,n.data.field(i.field)),"desc"===i.dir&&(r*=-1),0!==r)break}return r}function Do(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!ho(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t="asc"){this.field=e,this.dir=t}}function Po(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo{}class Mo extends Lo{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new qo(e,t,n):"array-contains"===t?new Go(e,n):"in"===t?new Ko(e,n):"not-in"===t?new Wo(e,n):"array-contains-any"===t?new Qo(e,n):new Mo(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new zo(e,n):new $o(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&void 0===t.nullValue&&this.matchesComparison(fo(t,this.value)):null!==t&&uo(this.value)===uo(t)&&this.matchesComparison(fo(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return Ls(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xo extends Lo{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new xo(e,t)}matches(e){return Vo(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.Pe||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Vo(e){return"and"===e.op}function Uo(e){return function(e){for(const t of e.filters)if(t instanceof xo)return!1;return!0}(e)&&Vo(e)}function Fo(e){if(e instanceof Mo)return e.field.canonicalString()+e.op.toString()+go(e.value);if(Uo(e))return e.filters.map(e=>Fo(e)).join(",");{const t=e.filters.map(e=>Fo(e)).join(",");return`${e.op}(${t})`}}function jo(e,t){return e instanceof Mo?(n=e,(r=t)instanceof Mo&&n.op===r.op&&n.field.isEqual(r.field)&&ho(n.value,r.value)):e instanceof xo?function(e,t){return t instanceof xo&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce((e,n,r)=>e&&jo(n,t.filters[r]),!0)}(e,t):void Ls(19439);var n,r}function Bo(e){return e instanceof Mo?`${(t=e).field.canonicalString()} ${t.op} ${go(t.value)}`:e instanceof xo?function(e){return e.op.toString()+" {"+e.getFilters().map(Bo).join(" ,")+"}"}(e):"Filter";var t}class qo extends Mo{constructor(e,t,n){super(e,t,n),this.key=ci.fromName(n.referenceValue)}matches(e){const t=ci.comparator(e.key,this.key);return this.matchesComparison(t)}}class zo extends Mo{constructor(e,t){super(e,"in",t),this.keys=Ho("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class $o extends Mo{constructor(e,t){super(e,"not-in",t),this.keys=Ho("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Ho(e,t){var n;return((null==(n=t.arrayValue)?void 0:n.values)||[]).map(e=>ci.fromName(e.referenceValue))}class Go extends Mo{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Eo(t)&&lo(t.arrayValue,this.value)}}class Ko extends Mo{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&lo(this.value.arrayValue,t)}}class Wo extends Mo{constructor(e,t){super(e,"not-in",t)}matches(e){if(lo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&void 0===t.nullValue&&!lo(this.value.arrayValue,t)}}class Qo extends Mo{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Eo(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>lo(this.value.arrayValue,e))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e,t=null,n=[],r=[],s=null,i=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=s,this.startAt=i,this.endAt=o,this.Te=null}}function Jo(e,t=null,n=[],r=[],s=null,i=null,o=null){return new Xo(e,t,n,r,s,i,o)}function Yo(e){const t=Vs(e);if(null===t.Te){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(e=>Fo(e)).join(","),e+="|ob:",e+=t.orderBy.map(e=>{return(t=e).field.canonicalString()+t.dir;var t}).join(","),Ni(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(e=>go(e)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(e=>go(e)).join(",")),t.Te=e}return t.Te}function Zo(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Po(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!jo(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Do(e.startAt,t.startAt)&&Do(e.endAt,t.endAt)}function ea(e){return ci.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t=null,n=[],r=[],s=null,i="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=s,this.limitType=i,this.startAt=o,this.endAt=a,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function na(e){return new ta(e)}function ra(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function sa(e){return null!==e.collectionGroup}function ia(e){const t=Vs(e);if(null===t.Ie){t.Ie=[];const e=new Set;for(const r of t.explicitOrderBy)t.Ie.push(r),e.add(r.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(e){let t=new Fi(ai.comparator);return e.filters.forEach(e=>{e.getFlattenedFilters().forEach(e=>{e.isInequality()&&(t=t.add(e.field))})}),t})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new Oo(r,n))}),e.has(ai.keyField().canonicalString())||t.Ie.push(new Oo(ai.keyField(),n))}return t.Ie}function oa(e){const t=Vs(e);return t.Ee||(t.Ee=function(e,t){if("F"===e.limitType)return Jo(e.path,e.collectionGroup,t,e.filters,e.limit,e.startAt,e.endAt);{t=t.map(e=>{const t="desc"===e.dir?"asc":"desc";return new Oo(e.field,t)});const n=e.endAt?new No(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new No(e.startAt.position,e.startAt.inclusive):null;return Jo(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}}(t,ia(e))),t.Ee}function aa(e,t){const n=e.filters.concat([t]);return new ta(e.path,e.collectionGroup,e.explicitOrderBy.slice(),n,e.limit,e.limitType,e.startAt,e.endAt)}function ca(e,t,n){return new ta(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function ua(e,t){return Zo(oa(e),oa(t))&&e.limitType===t.limitType}function ha(e){return`${Yo(oa(e))}|lt:${e.limitType}`}function la(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(e=>Bo(e)).join(", ")}]`),Ni(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t}).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(e=>go(e)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(e=>go(e)).join(",")),`Target(${t})`}(oa(e))}; limitType=${e.limitType})`}function da(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):ci.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of ia(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(r=t,!((n=e).startAt&&!function(e,t,n){const r=Ro(e,t,n);return e.inclusive?r<=0:r<0}(n.startAt,ia(n),r)||n.endAt&&!function(e,t,n){const r=Ro(e,t,n);return e.inclusive?r>=0:r>0}(n.endAt,ia(n),r)));var n,r}function fa(e){return(t,n)=>{let r=!1;for(const s of ia(e)){const e=pa(s,t,n);if(0!==e)return e;r=r||s.field.isKeyField()}return 0}}function pa(e,t,n){const r=e.field.isKeyField()?ci.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),s=n.data.field(e);return null!==r&&null!==s?fo(r,s):Ls(42886)}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return Ls(19790,{direction:e.dir})}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[r,s]of n)if(this.equalsFn(r,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0===r)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return void(r[s]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(e){Li(this.inner,(t,n)=>{for(const[r,s]of n)e(r,s)})}isEmpty(){return Mi(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga=new xi(ci.comparator);function ya(){return ga}const va=new xi(ci.comparator);function wa(...e){let t=va;for(const n of e)t=t.insert(n.key,n);return t}function _a(e){let t=va;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function Ea(){return Ia()}function Ta(){return Ia()}function Ia(){return new ma(e=>e.toString(),(e,t)=>e.isEqual(t))}const ba=new xi(ci.comparator),Sa=new Fi(ci.comparator);function Ca(...e){let t=Sa;for(const n of e)t=t.add(n);return t}const Aa=new Fi(Js);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ka(e,t){if(e.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ri(t)?"-0":t}}function Na(e){return{integerValue:""+e}}function Ra(e,t){return function(e){return"number"==typeof e&&Number.isInteger(e)&&!Ri(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)?Na(t):ka(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(){this._=void 0}}function Oa(e,t,n){return e instanceof Ma?function(e,t){const n={fields:{[Qi]:{stringValue:Wi},[Ji]:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&Yi(t)&&(t=Zi(t)),t&&(n.fields[Xi]=t),{mapValue:n}}(n,t):e instanceof xa?Va(e,t):e instanceof Ua?Fa(e,t):function(e,t){const n=La(e,t),r=Ba(n)+Ba(e.Ae);return _o(n)&&_o(e.Ae)?Na(r):ka(e.serializer,r)}(e,t)}function Pa(e,t,n){return e instanceof xa?Va(e,t):e instanceof Ua?Fa(e,t):n}function La(e,t){return e instanceof ja?_o(n=t)||(r=n)&&"doubleValue"in r?t:{integerValue:0}:null;var n,r}class Ma extends Da{}class xa extends Da{constructor(e){super(),this.elements=e}}function Va(e,t){const n=qa(t);for(const r of e.elements)n.some(e=>ho(e,r))||n.push(r);return{arrayValue:{values:n}}}class Ua extends Da{constructor(e){super(),this.elements=e}}function Fa(e,t){let n=qa(t);for(const r of e.elements)n=n.filter(e=>!ho(e,r));return{arrayValue:{values:n}}}class ja extends Da{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Ba(e){return Gi(e.integerValue||e.doubleValue)}function qa(e){return Eo(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class za{constructor(e,t){this.field=e,this.transform=t}}class $a{constructor(e,t){this.version=e,this.transformResults=t}}class Ha{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ha}static exists(e){return new Ha(void 0,e)}static updateTime(e){return new Ha(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ga(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class Ka{}function Wa(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new sc(e.key,Ha.none()):new Za(e.key,e.data,Ha.none());{const n=e.data,r=Co.empty();let s=new Fi(ai.comparator);for(let e of t.fields)if(!s.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?r.delete(e):r.set(e,t),s=s.add(e)}return new ec(e.key,r,new Bi(s.toArray()),Ha.none())}}function Qa(e,t,n){var r;e instanceof Za?function(e,t,n){const r=e.value.clone(),s=nc(e.fieldTransforms,t,n.transformResults);r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof ec?function(e,t,n){if(!Ga(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=nc(e.fieldTransforms,t,n.transformResults),s=t.data;s.setAll(tc(e)),s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):(r=n,t.convertToNoDocument(r.version).setHasCommittedMutations())}function Xa(e,t,n,r){return e instanceof Za?function(e,t,n,r){if(!Ga(e.precondition,t))return n;const s=e.value.clone(),i=rc(e.fieldTransforms,r,t);return s.setAll(i),t.convertToFoundDocument(t.version,s).setHasLocalMutations(),null}(e,t,n,r):e instanceof ec?function(e,t,n,r){if(!Ga(e.precondition,t))return n;const s=rc(e.fieldTransforms,r,t),i=t.data;return i.setAll(tc(e)),i.setAll(s),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,r):(s=t,i=n,Ga(e.precondition,s)?(s.convertToNoDocument(s.version).setHasLocalMutations(),null):i);var s,i}function Ja(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),s=La(r.transform,e||null);null!=s&&(null===n&&(n=Co.empty()),n.set(r.field,s))}return n||null}function Ya(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,r=t.fieldTransforms,!!(void 0===n&&void 0===r||n&&r&&ni(n,r,(e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,r=t.transform,n instanceof xa&&r instanceof xa||n instanceof Ua&&r instanceof Ua?ni(n.elements,r.elements,ho):n instanceof ja&&r instanceof ja?ho(n.Ae,r.Ae):n instanceof Ma&&r instanceof Ma);var n,r}(e,t)))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask)));var n,r}class Za extends Ka{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ec extends Ka{constructor(e,t,n,r,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function tc(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function nc(e,t,n){const r=new Map;xs(e.length===n.length,32656,{Re:n.length,Ve:e.length});for(let s=0;s<n.length;s++){const i=e[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,Pa(o,a,n[s]))}return r}function rc(e,t,n){const r=new Map;for(const s of e){const e=s.transform,i=n.data.field(s.field);r.set(s.field,Oa(e,i,t))}return r}class sc extends Ka{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ic extends Ka{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const t=this.mutations[r];t.key.isEqual(e.key)&&Qa(t,e,n[r])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Xa(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Xa(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Ta();return this.mutations.forEach(r=>{const s=e.get(r.key),i=s.overlayedDocument;let o=this.applyToLocalView(i,s.mutatedFields);o=t.has(r.key)?null:o;const a=Wa(i,o);null!==a&&n.set(r.key,a),i.isValidDocument()||i.convertToNoDocument(_i.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Ca())}isEqual(e){return this.batchId===e.batchId&&ni(this.mutations,e.mutations,(e,t)=>Ya(e,t))&&ni(this.baseMutations,e.baseMutations,(e,t)=>Ya(e,t))}}class ac{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){xs(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let r=function(){return ba}();const s=e.mutations;for(let i=0;i<s.length;i++)r=r.insert(s[i].key,n[i].version);return new ac(e,t,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t){this.count=e,this.unchangedNames=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var hc,lc;function dc(e){if(void 0===e)return Ds("GRPC error has no .code"),Us.UNKNOWN;switch(e){case hc.OK:return Us.OK;case hc.CANCELLED:return Us.CANCELLED;case hc.UNKNOWN:return Us.UNKNOWN;case hc.DEADLINE_EXCEEDED:return Us.DEADLINE_EXCEEDED;case hc.RESOURCE_EXHAUSTED:return Us.RESOURCE_EXHAUSTED;case hc.INTERNAL:return Us.INTERNAL;case hc.UNAVAILABLE:return Us.UNAVAILABLE;case hc.UNAUTHENTICATED:return Us.UNAUTHENTICATED;case hc.INVALID_ARGUMENT:return Us.INVALID_ARGUMENT;case hc.NOT_FOUND:return Us.NOT_FOUND;case hc.ALREADY_EXISTS:return Us.ALREADY_EXISTS;case hc.PERMISSION_DENIED:return Us.PERMISSION_DENIED;case hc.FAILED_PRECONDITION:return Us.FAILED_PRECONDITION;case hc.ABORTED:return Us.ABORTED;case hc.OUT_OF_RANGE:return Us.OUT_OF_RANGE;case hc.UNIMPLEMENTED:return Us.UNIMPLEMENTED;case hc.DATA_LOSS:return Us.DATA_LOSS;default:return Ls(39323,{code:e})}}(lc=hc||(hc={}))[lc.OK=0]="OK",lc[lc.CANCELLED=1]="CANCELLED",lc[lc.UNKNOWN=2]="UNKNOWN",lc[lc.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",lc[lc.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",lc[lc.NOT_FOUND=5]="NOT_FOUND",lc[lc.ALREADY_EXISTS=6]="ALREADY_EXISTS",lc[lc.PERMISSION_DENIED=7]="PERMISSION_DENIED",lc[lc.UNAUTHENTICATED=16]="UNAUTHENTICATED",lc[lc.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",lc[lc.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",lc[lc.ABORTED=10]="ABORTED",lc[lc.OUT_OF_RANGE=11]="OUT_OF_RANGE",lc[lc.UNIMPLEMENTED=12]="UNIMPLEMENTED",lc[lc.INTERNAL=13]="INTERNAL",lc[lc.UNAVAILABLE=14]="UNAVAILABLE",lc[lc.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fc=new ds([4294967295,4294967295],0);function pc(e){const t=(new TextEncoder).encode(e),n=new fs;return n.update(t),new Uint8Array(n.digest())}function mc(e){const t=new DataView(e.buffer),n=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new ds([n,r],0),new ds([s,i],0)]}class gc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new yc(`Invalid padding: ${t}`);if(n<0)throw new yc(`Invalid hash count: ${n}`);if(e.length>0&&0===this.hashCount)throw new yc(`Invalid hash count: ${n}`);if(0===e.length&&0!==t)throw new yc(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=ds.fromNumber(this.ge)}ye(e,t,n){let r=e.add(t.multiply(ds.fromNumber(n)));return 1===r.compare(fc)&&(r=new ds([r.getBits(0),r.getBits(1)],0)),r.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(0===this.ge)return!1;const t=pc(e),[n,r]=mc(t);for(let s=0;s<this.hashCount;s++){const e=this.ye(n,r,s);if(!this.we(e))return!1}return!0}static create(e,t,n){const r=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),i=new gc(s,r,t);return n.forEach(e=>i.insert(e)),i}insert(e){if(0===this.ge)return;const t=pc(e),[n,r]=mc(t);for(let s=0;s<this.hashCount;s++){const e=this.ye(n,r,s);this.Se(e)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class yc extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t,n,r,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const r=new Map;return r.set(e,wc.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new vc(_i.min(),r,new xi(Js),ya(),Ca())}}class wc{constructor(e,t,n,r,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new wc(n,t,Ca(),Ca(),Ca())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,t,n,r){this.be=e,this.removedTargetIds=t,this.key=n,this.De=r}}class Ec{constructor(e,t){this.targetId=e,this.Ce=t}}class Tc{constructor(e,t,n=zi.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Ic{constructor(){this.ve=0,this.Fe=Cc(),this.Me=zi.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return 0!==this.ve}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=Ca(),t=Ca(),n=Ca();return this.Fe.forEach((r,s)=>{switch(s){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:Ls(38017,{changeType:s})}}),new wc(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=Cc()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,xs(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class bc{constructor(e){this.Ge=e,this.ze=new Map,this.je=ya(),this.Je=Sc(),this.He=Sc(),this.Ye=new xi(Js)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:Ls(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((e,n)=>{this.rt(n)&&t(n)})}st(e){const t=e.targetId,n=e.Ce.count,r=this.ot(t);if(r){const s=r.target;if(ea(s))if(0===n){const e=new ci(s.path);this.et(t,e,ko.newNoDocument(e,_i.min()))}else xs(1===n,20013,{expectedCount:n});else{const r=this._t(t);if(r!==n){const n=this.ut(e),s=n?this.ct(n,e,r):1;if(0!==s){this.it(t);const e=2===s?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,e)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:r=0},hashCount:s=0}=t;let i,o;try{i=Ki(n).toUint8Array()}catch(a){if(a instanceof qi)return Os("Decoding the base64 bloom filter in existence filter failed ("+a.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw a}try{o=new gc(i,r,s)}catch(a){return Os(a instanceof yc?"BloomFilter error: ":"Applying bloom filter failed: ",a),null}return 0===o.ge?null:o}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let r=0;return n.forEach(n=>{const s=this.Ge.ht(),i=`projects/${s.projectId}/databases/${s.database}/documents/${n.path.canonicalString()}`;e.mightContain(i)||(this.et(t,n,null),r++)}),r}Tt(e){const t=new Map;this.ze.forEach((n,r)=>{const s=this.ot(r);if(s){if(n.current&&ea(s.target)){const t=new ci(s.target.path);this.It(t).has(r)||this.Et(r,t)||this.et(r,t,ko.newNoDocument(t,e))}n.Be&&(t.set(r,n.ke()),n.qe())}});let n=Ca();this.He.forEach((e,t)=>{let r=!0;t.forEachWhile(e=>{const t=this.ot(e);return!t||"TargetPurposeLimboResolution"===t.purpose||(r=!1,!1)}),r&&(n=n.add(e))}),this.je.forEach((t,n)=>n.setReadTime(e));const r=new vc(e,t,this.Ye,this.je,n);return this.je=ya(),this.Je=Sc(),this.He=Sc(),this.Ye=new xi(Js),r}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const r=this.nt(e);this.Et(e,t)?r.Qe(t,1):r.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Ic,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new Fi(Js),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new Fi(Js),this.Je=this.Je.insert(e,t)),t}rt(e){const t=null!==this.ot(e);return t||Rs("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Ic),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Sc(){return new xi(ci.comparator)}function Cc(){return new xi(ci.comparator)}const Ac=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),kc=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Nc=(()=>({and:"AND",or:"OR"}))();class Rc{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Dc(e,t){return e.useProto3Json||Ni(t)?t:{value:t}}function Oc(e,t){return e.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Pc(e,t){return e.useProto3Json?t.toBase64():t.toUint8Array()}function Lc(e,t){return Oc(e,t.toTimestamp())}function Mc(e){return xs(!!e,49232),_i.fromTimestamp(function(e){const t=Hi(e);return new wi(t.seconds,t.nanos)}(e))}function xc(e,t){return Vc(e,t).canonicalString()}function Vc(e,t){const n=(r=e,new ii(["projects",r.projectId,"databases",r.database])).child("documents");var r;return void 0===t?n:n.child(t)}function Uc(e){const t=ii.fromString(e);return xs(nu(t),10190,{key:t.toString()}),t}function Fc(e,t){return xc(e.databaseId,t.path)}function jc(e,t){const n=Uc(t);if(n.get(1)!==e.databaseId.projectId)throw new Fs(Us.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new Fs(Us.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new ci(zc(n))}function Bc(e,t){return xc(e.databaseId,t)}function qc(e){return new ii(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function zc(e){return xs(e.length>4&&"documents"===e.get(4),29091,{key:e.toString()}),e.popFirst(5)}function $c(e,t,n){return{name:Fc(e,t),fields:n.value.mapValue.fields}}function Hc(e,t){return{documents:[Bc(e,t.path)]}}function Gc(e,t){const n={structuredQuery:{}},r=t.path;let s;null!==t.collectionGroup?(s=r,n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Bc(e,s);const i=function(e){if(0!==e.length)return eu(xo.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map(e=>{return{field:Yc((t=e).field),direction:Qc(t.dir)};var t})}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const a=Dc(e,t.limit);return null!==a&&(n.structuredQuery.limit=a),t.startAt&&(n.structuredQuery.startAt={before:(c=t.startAt).inclusive,values:c.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),{ft:n,parent:s};var c}function Kc(e){let t=function(e){const t=Uc(e);return 4===t.length?ii.emptyPath():zc(t)}(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){xs(1===r,65062);const e=n.from[0];e.allDescendants?s=e.collectionId:t=t.child(e.collectionId)}let i=[];n.where&&(i=function(e){const t=Wc(e);return t instanceof xo&&Uo(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(e=>{return new Oo(Zc((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t}));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Ni(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new No(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new No(n,t)}(n.endAt)),function(e,t,n,r,s,i,o,a){return new ta(e,t,n,r,s,i,o,a)}(t,s,o,i,a,"F",c,u)}function Wc(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Zc(e.unaryFilter.field);return Mo.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Zc(e.unaryFilter.field);return Mo.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Zc(e.unaryFilter.field);return Mo.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const s=Zc(e.unaryFilter.field);return Mo.create(s,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Ls(61313);default:return Ls(60726)}}(e):void 0!==e.fieldFilter?(t=e,Mo.create(Zc(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Ls(58110);default:return Ls(50506)}}(t.fieldFilter.op),t.fieldFilter.value)):void 0!==e.compositeFilter?function(e){return xo.create(e.compositeFilter.filters.map(e=>Wc(e)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return Ls(1026)}}(e.compositeFilter.op))}(e):Ls(30097,{filter:e});var t}function Qc(e){return Ac[e]}function Xc(e){return kc[e]}function Jc(e){return Nc[e]}function Yc(e){return{fieldPath:e.canonicalString()}}function Zc(e){return ai.fromServerFormat(e.fieldPath)}function eu(e){return e instanceof Mo?function(e){if("=="===e.op){if(Io(e.value))return{unaryFilter:{field:Yc(e.field),op:"IS_NAN"}};if(To(e.value))return{unaryFilter:{field:Yc(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Io(e.value))return{unaryFilter:{field:Yc(e.field),op:"IS_NOT_NAN"}};if(To(e.value))return{unaryFilter:{field:Yc(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Yc(e.field),op:Xc(e.op),value:e.value}}}(e):e instanceof xo?function(e){const t=e.getFilters().map(e=>eu(e));return 1===t.length?t[0]:{compositeFilter:{op:Jc(e.op),filters:t}}}(e):Ls(54877,{filter:e})}function tu(e){const t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function nu(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t,n,r,s=_i.min(),i=_i.min(),o=zi.EMPTY_BYTE_STRING,a=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=o,this.expectedCount=a}withSequenceNumber(e){return new ru(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ru(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ru(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ru(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e){this.yt=e}}function iu(e){const t=Kc({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?ca(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(){this.Cn=new au}addToCollectionParentIndex(e,t){return this.Cn.add(t),Ci.resolve()}getCollectionParents(e,t){return Ci.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return Ci.resolve()}deleteFieldIndex(e,t){return Ci.resolve()}deleteAllFieldIndexes(e){return Ci.resolve()}createTargetIndexes(e,t){return Ci.resolve()}getDocumentsMatchingTarget(e,t){return Ci.resolve(null)}getIndexType(e,t){return Ci.resolve(0)}getFieldIndexes(e,t){return Ci.resolve([])}getNextCollectionGroupToUpdate(e){return Ci.resolve(null)}getMinOffset(e,t){return Ci.resolve(Ti.min())}getMinOffsetFromCollectionGroup(e,t){return Ci.resolve(Ti.min())}updateCollectionGroup(e,t,n){return Ci.resolve()}updateIndexEntries(e,t){return Ci.resolve()}}class au{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Fi(ii.comparator),s=!r.has(n);return this.index[t]=r.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Fi(ii.comparator)).toArray()}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},uu=41943040;class hu{static withCacheSize(e){return new hu(e,hu.DEFAULT_COLLECTION_PERCENTILE,hu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */hu.DEFAULT_COLLECTION_PERCENTILE=10,hu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,hu.DEFAULT=new hu(uu,hu.DEFAULT_COLLECTION_PERCENTILE,hu.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),hu.DISABLED=new hu(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lu{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new lu(0)}static cr(){return new lu(-1)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du="LruGarbageCollector";function fu([e,t],[n,r]){const s=Js(e,n);return 0===s?Js(t,r):s}class pu{constructor(e){this.Ir=e,this.buffer=new Fi(fu),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const e=this.buffer.last();fu(t,e)<0&&(this.buffer=this.buffer.delete(e).add(t))}}get maxValue(){return this.buffer.last()[0]}}class mu{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){-1!==this.garbageCollector.params.cacheSizeCollectionThreshold&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return null!==this.Rr}Vr(e){Rs(du,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Ai(e)?Rs(du,"Ignoring IndexedDB error during garbage collection: ",e):await Si(e)}await this.Vr(3e5)})}}class gu{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(e=>Math.floor(t/100*e))}nthSequenceNumber(e,t){if(0===t)return Ci.resolve(ki.ce);const n=new pu(t);return this.mr.forEachTarget(e,e=>n.Ar(e.sequenceNumber)).next(()=>this.mr.pr(e,e=>n.Ar(e))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return-1===this.params.cacheSizeCollectionThreshold?(Rs("LruGarbageCollector","Garbage collection skipped; disabled"),Ci.resolve(cu)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(Rs("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),cu):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,r,s,i,o,a,c;const u=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(t=>(t>this.params.maximumSequenceNumbersToCollect?(Rs("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`),r=this.params.maximumSequenceNumbersToCollect):r=t,i=Date.now(),this.nthSequenceNumber(e,r))).next(r=>(n=r,o=Date.now(),this.removeTargets(e,n,t))).next(t=>(s=t,a=Date.now(),this.removeOrphanedDocuments(e,n))).next(e=>(c=Date.now(),Ns()<=L.DEBUG&&Rs("LruGarbageCollector",`LRU Garbage Collection\n\tCounted targets in ${i-u}ms\n\tDetermined least recently used ${r} in `+(o-i)+`ms\n\tRemoved ${s} targets in `+(a-o)+`ms\n\tRemoved ${e} documents in `+(c-a)+`ms\nTotal Duration: ${c-u}ms`),Ci.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:s,documentsRemoved:e})))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yu{constructor(){this.changes=new ma(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ko.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Ci.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,t,n,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=r}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(r=>(n=r,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&Xa(n.mutation,e,Bi.empty(),wi.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,Ca()).next(()=>t))}getLocalViewOfDocuments(e,t,n=Ca()){const r=Ea();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,n).next(e=>{let t=wa();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){const n=Ea();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Ca()))}populateOverlays(e,t,n){const r=[];return n.forEach(e=>{t.has(e)||r.push(e)}),this.documentOverlayCache.getOverlays(e,r).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,r){let s=ya();const i=Ia(),o=Ia();return t.forEach((e,t)=>{const o=n.get(t.key);r.has(t.key)&&(void 0===o||o.mutation instanceof ec)?s=s.insert(t.key,t):void 0!==o?(i.set(t.key,o.mutation.getFieldMask()),Xa(o.mutation,t,o.mutation.getFieldMask(),wi.now())):i.set(t.key,Bi.empty())}),this.recalculateAndSaveOverlays(e,s).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>o.set(e,new vu(t,i.get(e)??null))),o))}recalculateAndSaveOverlays(e,t){const n=Ia();let r=new xi((e,t)=>e-t),s=Ca();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(const s of e)s.keys().forEach(e=>{const i=t.get(e);if(null===i)return;let o=n.get(e)||Bi.empty();o=s.applyToLocalView(i,o),n.set(e,o);const a=(r.get(s.batchId)||Ca()).add(e);r=r.insert(s.batchId,a)})}).next(()=>{const i=[],o=r.getReverseIterator();for(;o.hasNext();){const r=o.getNext(),a=r.key,c=r.value,u=Ta();c.forEach(e=>{if(!s.has(e)){const r=Wa(t.get(e),n.get(e));null!==r&&u.set(e,r),s=s.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,a,u))}return Ci.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n,r){return s=t,ci.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):sa(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,r):this.getDocumentsMatchingCollectionQuery(e,t,n,r);var s}getNextDocuments(e,t,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,r).next(s=>{const i=r-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,r-s.size):Ci.resolve(Ea());let o=-1,a=s;return i.next(t=>Ci.forEach(t,(t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),s.get(t)?Ci.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{a=a.insert(t,e)}))).next(()=>this.populateOverlays(e,t,s)).next(()=>this.computeViews(e,a,t,Ca())).next(e=>({batchId:o,changes:_a(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new ci(t)).next(e=>{let t=wa();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n,r){const s=t.collectionGroup;let i=wa();return this.indexManager.getCollectionParents(e,s).next(o=>Ci.forEach(o,o=>{const a=(c=t,u=o.child(s),new ta(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt));var c,u;return this.getDocumentsMatchingCollectionQuery(e,a,n,r).next(e=>{e.forEach((e,t)=>{i=i.insert(e,t)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,t,n,r){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(i=>(s=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,r))).next(e=>{s.forEach((t,n)=>{const r=n.getKey();null===e.get(r)&&(e=e.insert(r,ko.newInvalidDocument(r)))});let n=wa();return e.forEach((e,r)=>{const i=s.get(e);void 0!==i&&Xa(i.mutation,r,Bi.empty(),wi.now()),da(t,r)&&(n=n.insert(e,r))}),n})}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return Ci.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,{id:(n=t).id,version:n.version,createTime:Mc(n.createTime)}),Ci.resolve();var n}getNamedQuery(e,t){return Ci.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,{name:(n=t).name,query:iu(n.bundledQuery),readTime:Mc(n.readTime)}),Ci.resolve();var n}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(){this.overlays=new xi(ci.comparator),this.qr=new Map}getOverlay(e,t){return Ci.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ea();return Ci.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,r)=>{this.St(e,t,r)}),Ci.resolve()}removeOverlaysForBatchId(e,t,n){const r=this.qr.get(n);return void 0!==r&&(r.forEach(e=>this.overlays=this.overlays.remove(e)),this.qr.delete(n)),Ci.resolve()}getOverlaysForCollection(e,t,n){const r=Ea(),s=t.length+1,i=new ci(t.child("")),o=this.overlays.getIteratorFrom(i);for(;o.hasNext();){const e=o.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===s&&e.largestBatchId>n&&r.set(e.getKey(),e)}return Ci.resolve(r)}getOverlaysForCollectionGroup(e,t,n,r){let s=new xi((e,t)=>e-t);const i=this.overlays.getIterator();for(;i.hasNext();){const e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=s.get(e.largestBatchId);null===t&&(t=Ea(),s=s.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Ea(),a=s.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach((e,t)=>o.set(e,t)),!(o.size()>=r)););return Ci.resolve(o)}St(e,t,n){const r=this.overlays.get(n.key);if(null!==r){const e=this.qr.get(r.largestBatchId).delete(n.key);this.qr.set(r.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new cc(t,n));let s=this.qr.get(t);void 0===s&&(s=Ca(),this.qr.set(t,s)),this.qr.set(t,s.add(n.key))}}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{constructor(){this.sessionToken=zi.EMPTY_BYTE_STRING}getSessionToken(e){return Ci.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,Ci.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(){this.Qr=new Fi(bu.$r),this.Ur=new Fi(bu.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new bu(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.Gr(new bu(e,t))}zr(e,t){e.forEach(e=>this.removeReference(e,t))}jr(e){const t=new ci(new ii([])),n=new bu(t,e),r=new bu(t,e+1),s=[];return this.Ur.forEachInRange([n,r],e=>{this.Gr(e),s.push(e.key)}),s}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new ci(new ii([])),n=new bu(t,e),r=new bu(t,e+1);let s=Ca();return this.Ur.forEachInRange([n,r],e=>{s=s.add(e.key)}),s}containsKey(e){const t=new bu(e,0),n=this.Qr.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class bu{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return ci.comparator(e.key,t.key)||Js(e.Yr,t.Yr)}static Kr(e,t){return Js(e.Yr,t.Yr)||ci.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new Fi(bu.$r)}checkEmpty(e){return Ci.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,r){const s=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const i=new oc(s,t,n,r);this.mutationQueue.push(i);for(const o of r)this.Zr=this.Zr.add(new bu(o.key,s)),this.indexManager.addToCollectionParentIndex(e,o.key.path.popLast());return Ci.resolve(i)}lookupMutationBatch(e,t){return Ci.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this.ei(n),s=r<0?0:r;return Ci.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return Ci.resolve(0===this.mutationQueue.length?-1:this.tr-1)}getAllMutationBatches(e){return Ci.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new bu(t,0),r=new bu(t,Number.POSITIVE_INFINITY),s=[];return this.Zr.forEachInRange([n,r],e=>{const t=this.Xr(e.Yr);s.push(t)}),Ci.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Fi(Js);return t.forEach(e=>{const t=new bu(e,0),r=new bu(e,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([t,r],e=>{n=n.add(e.Yr)})}),Ci.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let s=n;ci.isDocumentKey(s)||(s=s.child(""));const i=new bu(new ci(s),0);let o=new Fi(Js);return this.Zr.forEachWhile(e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(o=o.add(e.Yr)),!0)},i),Ci.resolve(this.ti(o))}ti(e){const t=[];return e.forEach(e=>{const n=this.Xr(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){xs(0===this.ni(t.batchId,"removed"),55003),this.mutationQueue.shift();let n=this.Zr;return Ci.forEach(t.mutations,r=>{const s=new bu(r.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Zr=n})}ir(e){}containsKey(e,t){const n=new bu(t,0),r=this.Zr.firstAfterOrEqual(n);return Ci.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,Ci.resolve()}ni(e,t){return this.ei(e)}ei(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e){this.ri=e,this.docs=new xi(ci.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,r=this.docs.get(n),s=r?r.size:0,i=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Ci.resolve(n?n.document.mutableCopy():ko.newInvalidDocument(t))}getEntries(e,t){let n=ya();return t.forEach(e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():ko.newInvalidDocument(e))}),Ci.resolve(n)}getDocumentsMatchingQuery(e,t,n,r){let s=ya();const i=t.path,o=new ci(i.child("__id-9223372036854775808__")),a=this.docs.getIteratorFrom(o);for(;a.hasNext();){const{key:e,value:{document:o}}=a.getNext();if(!i.isPrefixOf(e.path))break;e.path.length>i.length+1||Ii(Ei(o),n)<=0||(r.has(o.key)||da(t,o))&&(s=s.insert(o.key,o.mutableCopy()))}return Ci.resolve(s)}getAllFromCollectionGroup(e,t,n,r){Ls(9500)}ii(e,t){return Ci.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new Au(this)}getSize(e){return Ci.resolve(this.size)}}class Au extends yu{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((n,r)=>{r.isValidDocument()?t.push(this.Nr.addEntry(e,r)):this.Nr.removeEntry(n)}),Ci.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e){this.persistence=e,this.si=new ma(e=>Yo(e),Zo),this.lastRemoteSnapshotVersion=_i.min(),this.highestTargetId=0,this.oi=0,this._i=new Iu,this.targetCount=0,this.ai=lu.ur()}forEachTarget(e,t){return this.si.forEach((e,n)=>t(n)),Ci.resolve()}getLastRemoteSnapshotVersion(e){return Ci.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Ci.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),Ci.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),Ci.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new lu(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,Ci.resolve()}updateTargetData(e,t){return this.Pr(t),Ci.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,Ci.resolve()}removeTargets(e,t,n){let r=0;const s=[];return this.si.forEach((i,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.si.delete(i),s.push(this.removeMatchingKeysForTargetId(e,o.targetId)),r++)}),Ci.waitFor(s).next(()=>r)}getTargetCount(e){return Ci.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return Ci.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),Ci.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const r=this.persistence.referenceDelegate,s=[];return r&&t.forEach(t=>{s.push(r.markPotentiallyOrphaned(e,t))}),Ci.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),Ci.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return Ci.resolve(n)}containsKey(e,t){return Ci.resolve(this._i.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e,t){this.ui={},this.overlays={},this.ci=new ki(0),this.li=!1,this.li=!0,this.hi=new Tu,this.referenceDelegate=e(this),this.Pi=new ku(this),this.indexManager=new ou,this.remoteDocumentCache=new Cu(e=>this.referenceDelegate.Ti(e)),this.serializer=new su(t),this.Ii=new _u(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Eu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new Su(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){Rs("MemoryPersistence","Starting transaction:",e);const r=new Ru(this.ci.next());return this.referenceDelegate.Ei(),n(r).next(e=>this.referenceDelegate.di(r).next(()=>e)).toPromise().then(e=>(r.raiseOnCommittedEvent(),e))}Ai(e,t){return Ci.or(Object.values(this.ui).map(n=>()=>n.containsKey(e,t)))}}class Ru extends bi{constructor(e){super(),this.currentSequenceNumber=e}}class Du{constructor(e){this.persistence=e,this.Ri=new Iu,this.Vi=null}static mi(e){return new Du(e)}get fi(){if(this.Vi)return this.Vi;throw Ls(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),Ci.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),Ci.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),Ci.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(e=>this.fi.add(e.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.fi.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ci.forEach(this.fi,n=>{const r=ci.fromPath(n);return this.gi(e,r).next(e=>{e||t.removeEntry(r,_i.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(e=>{e?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return Ci.or([()=>Ci.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Ou{constructor(e,t){this.persistence=e,this.pi=new ma(e=>function(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Oi(t)),t=Di(e.get(n),t);return Oi(t)}(e.path),(e,t)=>e.isEqual(t)),this.garbageCollector=function(e,t){return new gu(e,t)}(this,t)}static mi(e,t){return new Ou(e,t)}Ei(){}di(e){return Ci.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(e=>t.next(t=>e+t))}wr(e){let t=0;return this.pr(e,e=>{t++}).next(()=>t)}pr(e,t){return Ci.forEach(this.pi,(n,r)=>this.br(e,n,r).next(e=>e?Ci.resolve():t(r)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const r=this.persistence.getRemoteDocumentCache(),s=r.newChangeBuffer();return r.ii(e,r=>this.br(e,r,t).next(e=>{e||(n++,s.removeEntry(r,_i.min()))})).next(()=>s.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),Ci.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),Ci.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),Ci.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),Ci.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=vo(e.data.value)),t}br(e,t,n){return Ci.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const e=this.pi.get(t);return Ci.resolve(void 0!==e&&e>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=r}static As(e,t){let n=Ca(),r=Ca();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:r=r.add(s.doc.key)}return new Pu(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=v()?8:function(e){const t=e.match(/Android ([\d.]+)/i),n=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(n)}(y())>0?6:4}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,r){const s={result:null};return this.ys(e,t).next(e=>{s.result=e}).next(()=>{if(!s.result)return this.ws(e,t,r,n).next(e=>{s.result=e})}).next(()=>{if(s.result)return;const n=new Lu;return this.Ss(e,t,n).next(r=>{if(s.result=r,this.Vs)return this.bs(e,t,n,r.size)})}).next(()=>s.result)}bs(e,t,n,r){return n.documentReadCount<this.fs?(Ns()<=L.DEBUG&&Rs("QueryEngine","SDK will not create cache indexes for query:",la(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),Ci.resolve()):(Ns()<=L.DEBUG&&Rs("QueryEngine","Query:",la(t),"scans",n.documentReadCount,"local documents and returns",r,"documents as results."),n.documentReadCount>this.gs*r?(Ns()<=L.DEBUG&&Rs("QueryEngine","The SDK decides to create cache indexes for query:",la(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,oa(t))):Ci.resolve())}ys(e,t){if(ra(t))return Ci.resolve(null);let n=oa(t);return this.indexManager.getIndexType(e,n).next(r=>0===r?null:(null!==t.limit&&1===r&&(t=ca(t,null,"F"),n=oa(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const s=Ca(...r);return this.ps.getDocuments(e,s).next(r=>this.indexManager.getMinOffset(e,n).next(n=>{const i=this.Ds(t,r);return this.Cs(t,i,s,n.readTime)?this.ys(e,ca(t,null,"F")):this.vs(e,i,t,n)}))})))}ws(e,t,n,r){return ra(t)||r.isEqual(_i.min())?Ci.resolve(null):this.ps.getDocuments(e,n).next(s=>{const i=this.Ds(t,s);return this.Cs(t,i,n,r)?Ci.resolve(null):(Ns()<=L.DEBUG&&Rs("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),la(t)),this.vs(e,i,t,function(e,t){const n=e.toTimestamp().seconds,r=e.toTimestamp().nanoseconds+1,s=_i.fromTimestamp(1e9===r?new wi(n+1,0):new wi(n,r));return new Ti(s,ci.empty(),t)}(r,-1)).next(e=>e))})}Ds(e,t){let n=new Fi(fa(e));return t.forEach((t,r)=>{da(e,r)&&(n=n.add(r))}),n}Cs(e,t,n,r){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const s="F"===e.limitType?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(r)>0)}Ss(e,t,n){return Ns()<=L.DEBUG&&Rs("QueryEngine","Using full collection scan to execute query:",la(t)),this.ps.getDocumentsMatchingQuery(e,t,Ti.min(),n)}vs(e,t,n,r){return this.ps.getDocumentsMatchingQuery(e,n,r).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu="LocalStore";class Vu{constructor(e,t,n,r){this.persistence=e,this.Fs=t,this.serializer=r,this.Ms=new xi(Js),this.xs=new ma(e=>Yo(e),Zo),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new wu(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}async function Uu(e,t){const n=Vs(e);return await n.persistence.runTransaction("Handle user change","readonly",e=>{let r;return n.mutationQueue.getAllMutationBatches(e).next(s=>(r=s,n.Bs(t),n.mutationQueue.getAllMutationBatches(e))).next(t=>{const s=[],i=[];let o=Ca();for(const e of r){s.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next(e=>({Ls:e,removedBatchIds:s,addedBatchIds:i}))})})}function Fu(e){const t=Vs(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function ju(e,t){const n=Vs(e),r=t.snapshotVersion;let s=n.Ms;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{const i=n.Ns.newChangeBuffer({trackRemovals:!0});s=n.Ms;const o=[];t.targetChanges.forEach((i,a)=>{const c=s.get(a);if(!c)return;o.push(n.Pi.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.Pi.addMatchingKeys(e,i.addedDocuments,a)));let u=c.withSequenceNumber(e.currentSequenceNumber);null!==t.targetMismatches.get(a)?u=u.withResumeToken(zi.EMPTY_BYTE_STRING,_i.min()).withLastLimboFreeSnapshotVersion(_i.min()):i.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(i.resumeToken,r)),s=s.insert(a,u),function(e,t,n){if(0===e.resumeToken.approximateByteSize())return!0;if(t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8)return!0;return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(c,u,i)&&o.push(n.Pi.updateTargetData(e,u))});let a=ya(),c=Ca();if(t.documentUpdates.forEach(r=>{t.resolvedLimboDocuments.has(r)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))}),o.push(function(e,t,n){let r=Ca(),s=Ca();return n.forEach(e=>r=r.add(e)),t.getEntries(e,r).next(e=>{let r=ya();return n.forEach((n,i)=>{const o=e.get(n);i.isFoundDocument()!==o.isFoundDocument()&&(s=s.add(n)),i.isNoDocument()&&i.version.isEqual(_i.min())?(t.removeEntry(n,i.readTime),r=r.insert(n,i)):!o.isValidDocument()||i.version.compareTo(o.version)>0||0===i.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(i),r=r.insert(n,i)):Rs(xu,"Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",i.version)}),{ks:r,qs:s}})}(e,i,t.documentUpdates).next(e=>{a=e.ks,c=e.qs})),!r.isEqual(_i.min())){const t=n.Pi.getLastRemoteSnapshotVersion(e).next(t=>n.Pi.setTargetsMetadata(e,e.currentSequenceNumber,r));o.push(t)}return Ci.waitFor(o).next(()=>i.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,a,c)).next(()=>a)}).then(e=>(n.Ms=s,e))}function Bu(e,t){const n=Vs(e);return n.persistence.runTransaction("Get next mutation batch","readonly",e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t)))}async function qu(e,t,n){const r=Vs(e),s=r.Ms.get(t),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,e=>r.persistence.referenceDelegate.removeTarget(e,s))}catch(o){if(!Ai(o))throw o;Rs(xu,`Failed to update sequence numbers for target ${t}: ${o}`)}r.Ms=r.Ms.remove(t),r.xs.delete(s.target)}function zu(e,t,n){const r=Vs(e);let s=_i.min(),i=Ca();return r.persistence.runTransaction("Execute query","readwrite",e=>function(e,t,n){const r=Vs(e),s=r.xs.get(n);return void 0!==s?Ci.resolve(r.Ms.get(s)):r.Pi.getTargetData(t,n)}(r,e,oa(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(e,t.targetId).next(e=>{i=e})}).next(()=>r.Fs.getDocumentsMatchingQuery(e,t,n?s:_i.min(),n?i:Ca())).next(e=>(function(e,t,n){let r=e.Os.get(t)||_i.min();n.forEach((e,t)=>{t.readTime.compareTo(r)>0&&(r=t.readTime)}),e.Os.set(t,r)}(r,function(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}(t),e),{documents:e,Qs:i})))}class $u{constructor(){this.activeTargetIds=Aa}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Hu{constructor(){this.Mo=new $u,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new $u,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{Oo(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ku="ConnectivityMonitor";class Wu{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){Rs(Ku,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){Rs(Ku,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qu=null;function Xu(){return null===Qu?Qu=268435456+Math.round(2147483648*Math.random()):Qu++,"0x"+Qu.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Ju="RestConnection",Yu={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Zu{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${r}`,this.Wo=this.databaseId.database===no?`project_id=${n}`:`project_id=${n}&database_id=${r}`}Go(e,t,n,r,s){const i=Xu(),o=this.zo(e,t.toUriEncodedString());Rs(Ju,`Sending RPC '${e}' ${i}:`,o,n);const a={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(a,r,s);const{host:c}=new URL(o),u=d(c);return this.Jo(e,o,a,n,u).then(t=>(Rs(Ju,`Received RPC '${e}' ${i}: `,t),t),t=>{throw Os(Ju,`RPC '${e}' ${i} failed with error: `,t,"url: ",o,"request:",n),t})}Ho(e,t,n,r,s,i){return this.Go(e,t,n,r,s)}jo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+As,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}zo(e,t){const n=Yu[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="WebChannelConnection";class nh extends Zu{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,r,s){const i=Xu();return new Promise((s,o)=>{const a=new ms;a.setWithCredentials(!0),a.listenOnce(ys.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case vs.NO_ERROR:const t=a.getResponseJson();Rs(th,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(t)),s(t);break;case vs.TIMEOUT:Rs(th,`RPC '${e}' ${i} timed out`),o(new Fs(Us.DEADLINE_EXCEEDED,"Request time out"));break;case vs.HTTP_ERROR:const n=a.getStatus();if(Rs(th,`RPC '${e}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Us).indexOf(t)>=0?t:Us.UNKNOWN}(t.status);o(new Fs(e,t.message))}else o(new Fs(Us.UNKNOWN,"Server responded with status "+a.getStatus()))}else o(new Fs(Us.UNAVAILABLE,"Connection failed."));break;default:Ls(9055,{l_:e,streamId:i,h_:a.getLastErrorCode(),P_:a.getLastError()})}}finally{Rs(th,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(r);Rs(th,`RPC '${e}' ${i} sending request:`,r),a.send(t,"POST",c,n,15)})}T_(e,t,n){const r=Xu(),s=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=Ts(),o=Es(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;void 0!==c&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.jo(a.initMessageHeaders,t,n),a.encodeInitMessageHeaders=!0;const u=s.join("");Rs(th,`Creating RPC '${e}' stream ${r}: ${u}`,a);const h=i.createWebChannel(u,a);this.I_(h);let l=!1,d=!1;const f=new eh({Yo:t=>{d?Rs(th,`Not sending because RPC '${e}' stream ${r} is closed:`,t):(l||(Rs(th,`Opening RPC '${e}' stream ${r} transport.`),h.open(),l=!0),Rs(th,`RPC '${e}' stream ${r} sending:`,t),h.send(t))},Zo:()=>h.close()}),p=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(t){setTimeout(()=>{throw t},0)}})};return p(h,gs.EventType.OPEN,()=>{d||(Rs(th,`RPC '${e}' stream ${r} transport opened.`),f.o_())}),p(h,gs.EventType.CLOSE,()=>{d||(d=!0,Rs(th,`RPC '${e}' stream ${r} transport closed`),f.a_(),this.E_(h))}),p(h,gs.EventType.ERROR,t=>{d||(d=!0,Os(th,`RPC '${e}' stream ${r} transport errored. Name:`,t.name,"Message:",t.message),f.a_(new Fs(Us.UNAVAILABLE,"The operation could not be completed")))}),p(h,gs.EventType.MESSAGE,t=>{var n;if(!d){const s=t.data[0];xs(!!s,16349);const i=s,o=(null==i?void 0:i.error)||(null==(n=i[0])?void 0:n.error);if(o){Rs(th,`RPC '${e}' stream ${r} received error:`,o);const t=o.status;let n=function(e){const t=hc[e];if(void 0!==t)return dc(t)}(t),s=o.message;void 0===n&&(n=Us.INTERNAL,s="Unknown error status: "+t+" with message "+o.message),d=!0,f.a_(new Fs(n,s)),h.close()}else Rs(th,`RPC '${e}' stream ${r} received:`,s),f.u_(s)}}),p(o,_s.STAT_EVENT,t=>{t.stat===ws.PROXY?Rs(th,`RPC '${e}' stream ${r} detected buffering proxy`):t.stat===ws.NOPROXY&&Rs(th,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{f.__()},0),f}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function rh(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh(e){return new Rc(e,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e,t,n=1e3,r=1.5,s=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=r,this.R_=s,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),r=Math.max(0,t-n);r>0&&Rs("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,r,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){null!==this.m_&&(this.m_.skipDelay(),this.m_=null)}cancel(){null!==this.m_&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh="PersistentStream";class ah{constructor(e,t,n,r,s,i,o,a){this.Mi=e,this.S_=n,this.b_=r,this.connection=s,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new ih(e,t)}x_(){return 1===this.state||5===this.state||this.O_()}O_(){return 2===this.state||3===this.state}start(){this.F_=0,4!==this.state?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&null===this.C_&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,4!==e?this.M_.reset():t&&t.code===Us.RESOURCE_EXHAUSTED?(Ds(t.toString()),Ds("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===Us.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.D_===t&&this.G_(e,n)},t=>{e(()=>{const e=new Fs(Us.UNKNOWN,"Fetching auth token failed: "+t.message);return this.z_(e)})})}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{n(()=>this.listener.Xo())}),this.stream.t_(()=>{n(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(e=>{n(()=>this.z_(e))}),this.stream.onMessage(e=>{n(()=>1==++this.F_?this.J_(e):this.onNext(e))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return Rs(oh,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(Rs(oh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ch extends ah{constructor(e,t,n,r,s,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const s="NO_CHANGE"===(r=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===r?1:"REMOVE"===r?2:"CURRENT"===r?3:"RESET"===r?4:Ls(39313,{state:r}),i=t.targetChange.targetIds||[],o=function(e,t){return e.useProto3Json?(xs(void 0===t||"string"==typeof t,58123),zi.fromBase64String(t||"")):(xs(void 0===t||t instanceof Buffer||t instanceof Uint8Array,16193),zi.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(e){const t=void 0===e.code?Us.UNKNOWN:dc(e.code);return new Fs(t,e.message||"")}(a);n=new Tc(s,i,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=jc(e,r.document.name),i=Mc(r.document.updateTime),o=r.document.createTime?Mc(r.document.createTime):_i.min(),a=new Co({mapValue:{fields:r.document.fields}}),c=ko.newFoundDocument(s,i,o,a),u=r.targetIds||[],h=r.removedTargetIds||[];n=new _c(u,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=jc(e,r.document),i=r.readTime?Mc(r.readTime):_i.min(),o=ko.newNoDocument(s,i),a=r.removedTargetIds||[];n=new _c([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=jc(e,r.document),i=r.removedTargetIds||[];n=new _c([],i,s,null)}else{if(!("filter"in t))return Ls(11601,{Rt:t});{t.filter;const e=t.filter;e.targetId;const{count:r=0,unchangedNames:s}=e,i=new uc(r,s),o=e.targetId;n=new Ec(o,i)}}var r;return n}(this.serializer,e),n=function(e){if(!("targetChange"in e))return _i.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?_i.min():t.readTime?Mc(t.readTime):_i.min()}(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=qc(this.serializer),t.addTarget=function(e,t){let n;const r=t.target;if(n=ea(r)?{documents:Hc(e,r)}:{query:Gc(e,r).ft},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0){n.resumeToken=Pc(e,t.resumeToken);const r=Dc(e,t.expectedCount);null!==r&&(n.expectedCount=r)}else if(t.snapshotVersion.compareTo(_i.min())>0){n.readTime=Oc(e,t.snapshotVersion.toTimestamp());const r=Dc(e,t.expectedCount);null!==r&&(n.expectedCount=r)}return n}(this.serializer,e);const n=function(e,t){const n=function(e){switch(e){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Ls(28987,{purpose:e})}}(t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=qc(this.serializer),t.removeTarget=e,this.q_(t)}}class uh extends ah{constructor(e,t,n,r,s,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,r,i),this.serializer=s}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return xs(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,xs(!e.writeResults||0===e.writeResults.length,55816),this.listener.ta()}onNext(e){xs(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=function(e,t){return e&&e.length>0?(xs(void 0!==t,14353),e.map(e=>function(e,t){let n=e.updateTime?Mc(e.updateTime):Mc(t);return n.isEqual(_i.min())&&(n=Mc(t)),new $a(n,e.transformResults||[])}(e,t))):[]}(e.writeResults,e.commitTime),n=Mc(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=qc(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(e=>function(e,t){let n;if(t instanceof Za)n={update:$c(e,t.key,t.value)};else if(t instanceof sc)n={delete:Fc(e,t.key)};else if(t instanceof ec)n={update:$c(e,t.key,t.data),updateMask:tu(t.fieldMask)};else{if(!(t instanceof ic))return Ls(16599,{Vt:t.type});n={verify:Fc(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(e=>function(e,t){const n=t.transform;if(n instanceof Ma)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof xa)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Ua)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ja)return{fieldPath:t.field.canonicalString(),increment:n.Ae};throw Ls(20930,{transform:t.transform})}(0,e))),t.precondition.isNone||(n.currentDocument=(r=e,void 0!==(s=t.precondition).updateTime?{updateTime:Lc(r,s.updateTime)}:void 0!==s.exists?{exists:s.exists}:Ls(27497))),n;var r,s}(this.serializer,e))};this.q_(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{}class lh extends hh{constructor(e,t,n,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=r,this.ia=!1}sa(){if(this.ia)throw new Fs(Us.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.Go(e,Vc(t,n),r,s,i)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Us.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Fs(Us.UNKNOWN,e.toString())})}Ho(e,t,n,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Ho(e,Vc(t,n),r,i,o,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===Us.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new Fs(Us.UNKNOWN,e.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class dh{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){0===this.oa&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){"Online"===this.state?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,"Online"===e&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ds(t),this.aa=!1):Rs("OnlineStateTracker",t)}Pa(){null!==this._a&&(this._a.cancel(),this._a=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="RemoteStore";class ph{constructor(e,t,n,r,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=s,this.Aa.Oo(e=>{n.enqueueAndForget(async()=>{Ih(this)&&(Rs(fh,"Restarting streams for network reachability change."),await async function(e){const t=Vs(e);t.Ea.add(4),await gh(t),t.Ra.set("Unknown"),t.Ea.delete(4),await mh(t)}(this))})}),this.Ra=new dh(n,r)}}async function mh(e){if(Ih(e))for(const t of e.da)await t(!0)}async function gh(e){for(const t of e.da)await t(!1)}function yh(e,t){const n=Vs(e);n.Ia.has(t.targetId)||(n.Ia.set(t.targetId,t),Th(n)?Eh(n):Bh(n).O_()&&wh(n,t))}function vh(e,t){const n=Vs(e),r=Bh(n);n.Ia.delete(t),r.O_()&&_h(n,t),0===n.Ia.size&&(r.O_()?r.L_():Ih(n)&&n.Ra.set("Unknown"))}function wh(e,t){if(e.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(_i.min())>0){const n=e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(n)}Bh(e).Y_(t)}function _h(e,t){e.Va.Ue(t),Bh(e).Z_(t)}function Eh(e){e.Va=new bc({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),At:t=>e.Ia.get(t)||null,ht:()=>e.datastore.serializer.databaseId}),Bh(e).start(),e.Ra.ua()}function Th(e){return Ih(e)&&!Bh(e).x_()&&e.Ia.size>0}function Ih(e){return 0===Vs(e).Ea.size}function bh(e){e.Va=void 0}async function Sh(e){e.Ra.set("Online")}async function Ch(e){e.Ia.forEach((t,n)=>{wh(e,t)})}async function Ah(e,t){bh(e),Th(e)?(e.Ra.ha(t),Eh(e)):e.Ra.set("Unknown")}async function kh(e,t,n){if(e.Ra.set("Online"),t instanceof Tc&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.Ia.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.Ia.delete(r),e.Va.removeTarget(r))}(e,t)}catch(r){Rs(fh,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Nh(e,r)}else if(t instanceof _c?e.Va.Ze(t):t instanceof Ec?e.Va.st(t):e.Va.tt(t),!n.isEqual(_i.min()))try{const t=await Fu(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Va.Tt(t);return n.targetChanges.forEach((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const s=e.Ia.get(r);s&&e.Ia.set(r,s.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach((t,n)=>{const r=e.Ia.get(t);if(!r)return;e.Ia.set(t,r.withResumeToken(zi.EMPTY_BYTE_STRING,r.snapshotVersion)),_h(e,t);const s=new ru(r.target,t,n,r.sequenceNumber);wh(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(s){Rs(fh,"Failed to raise snapshot:",s),await Nh(e,s)}}async function Nh(e,t,n){if(!Ai(t))throw t;e.Ea.add(1),await gh(e),e.Ra.set("Offline"),n||(n=()=>Fu(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{Rs(fh,"Retrying IndexedDB access"),await n(),e.Ea.delete(1),await mh(e)})}function Rh(e,t){return t().catch(n=>Nh(e,n,t))}async function Dh(e){const t=Vs(e),n=qh(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:-1;for(;Oh(t);)try{const e=await Bu(t.localStore,r);if(null===e){0===t.Ta.length&&n.L_();break}r=e.batchId,Ph(t,e)}catch(s){await Nh(t,s)}Lh(t)&&Mh(t)}function Oh(e){return Ih(e)&&e.Ta.length<10}function Ph(e,t){e.Ta.push(t);const n=qh(e);n.O_()&&n.X_&&n.ea(t.mutations)}function Lh(e){return Ih(e)&&!qh(e).x_()&&e.Ta.length>0}function Mh(e){qh(e).start()}async function xh(e){qh(e).ra()}async function Vh(e){const t=qh(e);for(const n of e.Ta)t.ea(n.mutations)}async function Uh(e,t,n){const r=e.Ta.shift(),s=ac.from(r,t,n);await Rh(e,()=>e.remoteSyncer.applySuccessfulWrite(s)),await Dh(e)}async function Fh(e,t){t&&qh(e).X_&&await async function(e,t){if(function(e){switch(e){case Us.OK:return Ls(64938);case Us.CANCELLED:case Us.UNKNOWN:case Us.DEADLINE_EXCEEDED:case Us.RESOURCE_EXHAUSTED:case Us.INTERNAL:case Us.UNAVAILABLE:case Us.UNAUTHENTICATED:return!1;case Us.INVALID_ARGUMENT:case Us.NOT_FOUND:case Us.ALREADY_EXISTS:case Us.PERMISSION_DENIED:case Us.FAILED_PRECONDITION:case Us.ABORTED:case Us.OUT_OF_RANGE:case Us.UNIMPLEMENTED:case Us.DATA_LOSS:return!0;default:return Ls(15467,{code:e})}}(n=t.code)&&n!==Us.ABORTED){const n=e.Ta.shift();qh(e).B_(),await Rh(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await Dh(e)}var n}(e,t),Lh(e)&&Mh(e)}async function jh(e,t){const n=Vs(e);n.asyncQueue.verifyOperationInProgress(),Rs(fh,"RemoteStore received new credentials");const r=Ih(n);n.Ea.add(3),await gh(n),r&&n.Ra.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ea.delete(3),await mh(n)}function Bh(e){return e.ma||(e.ma=function(e,t,n){const r=Vs(e);return r.sa(),new ch(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:Sh.bind(null,e),t_:Ch.bind(null,e),r_:Ah.bind(null,e),H_:kh.bind(null,e)}),e.da.push(async t=>{t?(e.ma.B_(),Th(e)?Eh(e):e.Ra.set("Unknown")):(await e.ma.stop(),bh(e))})),e.ma}function qh(e){return e.fa||(e.fa=function(e,t,n){const r=Vs(e);return r.sa(),new uh(t,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(e.datastore,e.asyncQueue,{Xo:()=>Promise.resolve(),t_:xh.bind(null,e),r_:Fh.bind(null,e),ta:Vh.bind(null,e),na:Uh.bind(null,e)}),e.da.push(async t=>{t?(e.fa.B_(),await Dh(e)):(await e.fa.stop(),e.Ta.length>0&&(Rs(fh,`Stopping write stream with ${e.Ta.length} pending writes`),e.Ta=[]))})),e.fa
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class zh{constructor(e,t,n,r,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=s,this.deferred=new js,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,r,s){const i=Date.now()+n,o=new zh(e,t,i,r,s);return o.start(n),o}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Fs(Us.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function $h(e,t){if(Ds("AsyncQueue",`${t}: ${e}`),Ai(e))return new Fs(Us.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{static emptySet(e){return new Hh(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||ci.comparator(t.key,n.key):(e,t)=>ci.comparator(e.key,t.key),this.keyedMap=wa(),this.sortedSet=new xi(this.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Hh))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Hh;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(){this.ga=new xi(ci.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?0!==e.type&&3===n.type?this.ga=this.ga.insert(t,e):3===e.type&&1!==n.type?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.ga=this.ga.remove(t):1===e.type&&2===n.type?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):Ls(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,n)=>{e.push(n)}),e}}class Kh{constructor(e,t,n,r,s,i,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=s,this.fromCache=i,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,r,s){const i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new Kh(e,t,Hh.emptySet(t),i,n,r,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ua(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==n[r].type||!t[r].doc.isEqual(n[r].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Qh{constructor(){this.queries=Xh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){!function(e,t){const n=Vs(e),r=n.queries;n.queries=Xh(),r.forEach((e,n)=>{for(const r of n.Sa)r.onError(t)})}(this,new Fs(Us.ABORTED,"Firestore shutting down"))}}function Xh(){return new ma(e=>ha(e),ua)}async function Jh(e,t){const n=Vs(e);let r=3;const s=t.query;let i=n.queries.get(s);i?!i.ba()&&t.Da()&&(r=2):(i=new Wh,r=t.Da()?0:1);try{switch(r){case 0:i.wa=await n.onListen(s,!0);break;case 1:i.wa=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const e=$h(o,`Initialization of query '${la(t.query)}' failed`);return void t.onError(e)}n.queries.set(s,i),i.Sa.push(t),t.va(n.onlineState),i.wa&&t.Fa(i.wa)&&tl(n)}async function Yh(e,t){const n=Vs(e),r=t.query;let s=3;const i=n.queries.get(r);if(i){const e=i.Sa.indexOf(t);e>=0&&(i.Sa.splice(e,1),0===i.Sa.length?s=t.Da()?0:1:!i.ba()&&t.Da()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function Zh(e,t){const n=Vs(e);let r=!1;for(const s of t){const e=s.query,t=n.queries.get(e);if(t){for(const e of t.Sa)e.Fa(s)&&(r=!0);t.wa=s}}r&&tl(n)}function el(e,t,n){const r=Vs(e),s=r.queries.get(t);if(s)for(const i of s.Sa)i.onError(n);r.queries.delete(t)}function tl(e){e.Ca.forEach(e=>{e.next()})}var nl,rl;(rl=nl||(nl={})).Ma="default",rl.Cache="cache";class sl{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Kh(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache)return!0;if(!this.Da())return!0;const n="Offline"!==t;return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}ka(e){e=Kh.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==nl.Cache}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e){this.key=e}}class ol{constructor(e){this.key=e}}class al{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=Ca(),this.mutatedKeys=Ca(),this.eu=fa(e),this.tu=new Hh(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new Gh,r=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,i=r,o=!1;const a="F"===this.query.limitType&&r.size===this.query.limit?r.last():null,c="L"===this.query.limitType&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((e,t)=>{const u=r.get(e),h=da(this.query,t)?t:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.su(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.eu(h,a)>0||c&&this.eu(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(i=i.add(h),s=d?s.add(e):s.delete(e)):(i=i.delete(e),s=s.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){const e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),s=s.delete(e.key),n.track({type:1,doc:e})}return{tu:i,iu:n,Cs:o,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,r){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const i=e.iu.ya();i.sort((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Ls(20277,{Rt:e})}};return n(e)-n(t)}(e.type,t.type)||this.eu(e.doc,t.doc)),this.ou(n),r=r??!1;const o=t&&!r?this._u():[],a=0===this.Xa.size&&this.current&&!r?1:0,c=a!==this.Za;return this.Za=a,0!==i.length||c?{snapshot:new Kh(this.query,e.tu,s,i,e.mutatedKeys,0===a,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:o}:{au:o}}va(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Gh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=Ca(),this.tu.forEach(e=>{this.uu(e.key)&&(this.Xa=this.Xa.add(e.key))});const t=[];return e.forEach(e=>{this.Xa.has(e)||t.push(new ol(e))}),this.Xa.forEach(n=>{e.has(n)||t.push(new il(n))}),t}cu(e){this.Ya=e.Qs,this.Xa=Ca();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Kh.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,0===this.Za,this.hasCachedResults)}}const cl="SyncEngine";class ul{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class hl{constructor(e){this.key=e,this.hu=!1}}class ll{constructor(e,t,n,r,s,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=s,this.maxConcurrentLimboResolutions=i,this.Pu={},this.Tu=new ma(e=>ha(e),ua),this.Iu=new Map,this.Eu=new Set,this.du=new xi(ci.comparator),this.Au=new Map,this.Ru=new Iu,this.Vu={},this.mu=new Map,this.fu=lu.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return!0===this.gu}}async function dl(e,t,n=!0){const r=Pl(e);let s;const i=r.Tu.get(t);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await pl(r,t,n,!0),s}async function fl(e,t){const n=Pl(e);await pl(n,t,!0,!1)}async function pl(e,t,n,r){const s=await function(e,t){const n=Vs(e);return n.persistence.runTransaction("Allocate target","readwrite",e=>{let r;return n.Pi.getTargetData(e,t).next(s=>s?(r=s,Ci.resolve(r)):n.Pi.allocateTargetId(e).next(s=>(r=new ru(t,s,"TargetPurposeListen",e.currentSequenceNumber),n.Pi.addTargetData(e,r).next(()=>r))))}).then(e=>{const r=n.Ms.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ms=n.Ms.insert(e.targetId,e),n.xs.set(t,e.targetId)),e})}(e.localStore,oa(t)),i=s.targetId,o=e.sharedClientState.addLocalQueryTarget(i,n);let a;return r&&(a=await async function(e,t,n,r,s){e.pu=(t,n,r)=>async function(e,t,n,r){let s=t.view.ru(n);s.Cs&&(s=await zu(e.localStore,t.query,!1).then(({documents:e})=>t.view.ru(e,s)));const i=r&&r.targetChanges.get(t.targetId),o=r&&null!=r.targetMismatches.get(t.targetId),a=t.view.applyChanges(s,e.isPrimaryClient,i,o);return Al(e,t.targetId,a.au),a.snapshot}(e,t,n,r);const i=await zu(e.localStore,t,!0),o=new al(t,i.Qs),a=o.ru(i.documents),c=wc.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState,s),u=o.applyChanges(a,e.isPrimaryClient,c);Al(e,n,u.au);const h=new ul(t,n,o);return e.Tu.set(t,h),e.Iu.has(n)?e.Iu.get(n).push(t):e.Iu.set(n,[t]),u.snapshot}(e,t,i,"current"===o,s.resumeToken)),e.isPrimaryClient&&n&&yh(e.remoteStore,s),a}async function ml(e,t,n){const r=Vs(e),s=r.Tu.get(t),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter(e=>!ua(e,t))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await qu(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&vh(r.remoteStore,s.targetId),Sl(r,s.targetId)}).catch(Si)):(Sl(r,s.targetId),await qu(r.localStore,s.targetId,!0))}async function gl(e,t){const n=Vs(e),r=n.Tu.get(t),s=n.Iu.get(r.targetId);n.isPrimaryClient&&1===s.length&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),vh(n.remoteStore,r.targetId))}async function yl(e,t,n){const r=function(e){const t=Vs(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=El.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Tl.bind(null,t),t}(e);try{const e=await function(e,t){const n=Vs(e),r=wi.now(),s=t.reduce((e,t)=>e.add(t.key),Ca());let i,o;return n.persistence.runTransaction("Locally write mutations","readwrite",e=>{let a=ya(),c=Ca();return n.Ns.getEntries(e,s).next(e=>{a=e,a.forEach((e,t)=>{t.isValidDocument()||(c=c.add(e))})}).next(()=>n.localDocuments.getOverlayedDocuments(e,a)).next(s=>{i=s;const o=[];for(const e of t){const t=Ja(e,i.get(e.key).overlayedDocument);null!=t&&o.push(new ec(e.key,t,Ao(t.value.mapValue),Ha.exists(!0)))}return n.mutationQueue.addMutationBatch(e,r,o,t)}).next(t=>{o=t;const r=t.applyToLocalDocumentSet(i,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,r)})}).then(()=>({batchId:o.batchId,changes:_a(i)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Vu[e.currentUser.toKey()];r||(r=new xi(Js)),r=r.insert(t,n),e.Vu[e.currentUser.toKey()]=r}(r,e.batchId,n),await Rl(r,e.changes),await Dh(r.remoteStore)}catch(s){const e=$h(s,"Failed to persist write");n.reject(e)}}async function vl(e,t){const n=Vs(e);try{const e=await ju(n.localStore,t);t.targetChanges.forEach((e,t)=>{const r=n.Au.get(t);r&&(xs(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1,22616),e.addedDocuments.size>0?r.hu=!0:e.modifiedDocuments.size>0?xs(r.hu,14607):e.removedDocuments.size>0&&(xs(r.hu,42227),r.hu=!1))}),await Rl(n,e,t)}catch(r){await Si(r)}}function wl(e,t,n){const r=Vs(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.Tu.forEach((n,r)=>{const s=r.view.va(t);s.snapshot&&e.push(s.snapshot)}),function(e,t){const n=Vs(e);n.onlineState=t;let r=!1;n.queries.forEach((e,n)=>{for(const s of n.Sa)s.va(t)&&(r=!0)}),r&&tl(n)}(r.eventManager,t),e.length&&r.Pu.H_(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function _l(e,t,n){const r=Vs(e);r.sharedClientState.updateQueryState(t,"rejected",n);const s=r.Au.get(t),i=s&&s.key;if(i){let e=new xi(ci.comparator);e=e.insert(i,ko.newNoDocument(i,_i.min()));const n=Ca().add(i),s=new vc(_i.min(),new Map,new xi(Js),e,n);await vl(r,s),r.du=r.du.remove(i),r.Au.delete(t),Nl(r)}else await qu(r.localStore,t,!1).then(()=>Sl(r,t,n)).catch(Si)}async function El(e,t){const n=Vs(e),r=t.batch.batchId;try{const e=await function(e,t){const n=Vs(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{const r=t.batch.keys(),s=n.Ns.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const s=n.batch,i=s.keys();let o=Ci.resolve();return i.forEach(e=>{o=o.next(()=>r.getEntry(t,e)).next(t=>{const i=n.docVersions.get(e);xs(null!==i,48541),t.version.compareTo(i)<0&&(s.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),r.addEntry(t)))})}),o.next(()=>e.mutationQueue.removeMutationBatch(t,s))}(n,e,t,s).next(()=>s.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Ca();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,r))})}(n.localStore,t);bl(n,r,null),Il(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Rl(n,e)}catch(s){await Si(s)}}async function Tl(e,t,n){const r=Vs(e);try{const e=await function(e,t){const n=Vs(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",e=>{let r;return n.mutationQueue.lookupMutationBatch(e,t).next(t=>(xs(null!==t,37113),r=t.keys(),n.mutationQueue.removeMutationBatch(e,t))).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,r,t)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,r)).next(()=>n.localDocuments.getDocuments(e,r))})}(r.localStore,t);bl(r,t,n),Il(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await Rl(r,e)}catch(s){await Si(s)}}function Il(e,t){(e.mu.get(t)||[]).forEach(e=>{e.resolve()}),e.mu.delete(t)}function bl(e,t,n){const r=Vs(e);let s=r.Vu[r.currentUser.toKey()];if(s){const e=s.get(t);e&&(n?e.reject(n):e.resolve(),s=s.remove(t)),r.Vu[r.currentUser.toKey()]=s}}function Sl(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.Iu.get(t))e.Tu.delete(r),n&&e.Pu.yu(r,n);e.Iu.delete(t),e.isPrimaryClient&&e.Ru.jr(t).forEach(t=>{e.Ru.containsKey(t)||Cl(e,t)})}function Cl(e,t){e.Eu.delete(t.path.canonicalString());const n=e.du.get(t);null!==n&&(vh(e.remoteStore,n),e.du=e.du.remove(t),e.Au.delete(n),Nl(e))}function Al(e,t,n){for(const r of n)r instanceof il?(e.Ru.addReference(r.key,t),kl(e,r)):r instanceof ol?(Rs(cl,"Document no longer in limbo: "+r.key),e.Ru.removeReference(r.key,t),e.Ru.containsKey(r.key)||Cl(e,r.key)):Ls(19791,{wu:r})}function kl(e,t){const n=t.key,r=n.path.canonicalString();e.du.get(n)||e.Eu.has(r)||(Rs(cl,"New document in limbo: "+n),e.Eu.add(r),Nl(e))}function Nl(e){for(;e.Eu.size>0&&e.du.size<e.maxConcurrentLimboResolutions;){const t=e.Eu.values().next().value;e.Eu.delete(t);const n=new ci(ii.fromString(t)),r=e.fu.next();e.Au.set(r,new hl(n)),e.du=e.du.insert(n,r),yh(e.remoteStore,new ru(oa(na(n.path)),r,"TargetPurposeLimboResolution",ki.ce))}}async function Rl(e,t,n){const r=Vs(e),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((e,a)=>{o.push(r.pu(a,t,n).then(e=>{var t;if((e||n)&&r.isPrimaryClient){const s=e?!e.fromCache:null==(t=null==n?void 0:n.targetChanges.get(a.targetId))?void 0:t.current;r.sharedClientState.updateQueryState(a.targetId,s?"current":"not-current")}if(e){s.push(e);const t=Pu.As(a.targetId,e);i.push(t)}}))}),await Promise.all(o),r.Pu.H_(s),await async function(e,t){const n=Vs(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>Ci.forEach(t,t=>Ci.forEach(t.Es,r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r)).next(()=>Ci.forEach(t.ds,r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))}catch(r){if(!Ai(r))throw r;Rs(xu,"Failed to update sequence numbers: "+r)}for(const s of t){const e=s.targetId;if(!s.fromCache){const t=n.Ms.get(e),r=t.snapshotVersion,s=t.withLastLimboFreeSnapshotVersion(r);n.Ms=n.Ms.insert(e,s)}}}(r.localStore,i))}async function Dl(e,t){const n=Vs(e);if(!n.currentUser.isEqual(t)){Rs(cl,"User change. New user:",t.toKey());const e=await Uu(n.localStore,t);n.currentUser=t,s="'waitForPendingWrites' promise is rejected due to a user change.",(r=n).mu.forEach(e=>{e.forEach(e=>{e.reject(new Fs(Us.CANCELLED,s))})}),r.mu.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Rl(n,e.Ls)}var r,s}function Ol(e,t){const n=Vs(e),r=n.Au.get(t);if(r&&r.hu)return Ca().add(r.key);{let e=Ca();const r=n.Iu.get(t);if(!r)return e;for(const t of r){const r=n.Tu.get(t);e=e.unionWith(r.view.nu)}return e}}function Pl(e){const t=Vs(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=vl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ol.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=_l.bind(null,t),t.Pu.H_=Zh.bind(null,t.eventManager),t.Pu.yu=el.bind(null,t.eventManager),t}class Ll{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=sh(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return function(e,t,n,r){return new Vu(e,t,n,r)}(this.persistence,new Mu,e.initialUser,this.serializer)}Cu(e){return new Nu(Du.mi,this.serializer)}Du(e){return new Hu}async terminate(){var e,t;null==(e=this.gcScheduler)||e.stop(),null==(t=this.indexBackfillerScheduler)||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ll.provider={build:()=>new Ll};class Ml extends Ll{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){xs(this.persistence.referenceDelegate instanceof Ou,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new mu(n,e.asyncQueue,t)}Cu(e){const t=void 0!==this.cacheSizeBytes?hu.withCacheSize(this.cacheSizeBytes):hu.DEFAULT;return new Nu(e=>Ou.mi(e,t),this.serializer)}}class xl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>wl(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=Dl.bind(null,this.syncEngine),await async function(e,t){const n=Vs(e);t?(n.Ea.delete(2),await mh(n)):t||(n.Ea.add(2),await gh(n),n.Ra.set("Unknown"))}(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Qh}createDatastore(e){const t=sh(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new nh(r));var r;return function(e,t,n,r){return new lh(e,t,n,r)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return t=this.localStore,n=this.datastore,r=e.asyncQueue,s=e=>wl(this.syncEngine,e,0),i=Wu.v()?new Wu:new Gu,new ph(t,n,r,s,i);var t,n,r,s,i}createSyncEngine(e,t){return function(e,t,n,r,s,i,o){const a=new ll(e,t,n,r,s,i);return o&&(a.gu=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(e){const t=Vs(e);Rs(fh,"RemoteStore shutting down."),t.Ea.add(5),await gh(t),t.Aa.shutdown(),t.Ra.set("Unknown")}(this.remoteStore),null==(e=this.datastore)||e.terminate(),null==(t=this.eventManager)||t.terminate()}}xl.provider={build:()=>new xl};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ds("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul="FirestoreClient";class Fl{constructor(e,t,n,r,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=r,this.user=Cs.UNAUTHENTICATED,this.clientId=Xs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async e=>{Rs(Ul,"Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(Rs(Ul,"Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new js;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=$h(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function jl(e,t){e.asyncQueue.verifyOperationInProgress(),Rs(Ul,"Initializing OfflineComponentProvider");const n=e.configuration;await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async e=>{r.isEqual(e)||(await Uu(t.localStore,e),r=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e._offlineComponents=t}async function Bl(e,t){e.asyncQueue.verifyOperationInProgress();const n=await async function(e){if(!e._offlineComponents)if(e._uninitializedComponentsProvider){Rs(Ul,"Using user provided OfflineComponentProvider");try{await jl(e,e._uninitializedComponentsProvider._offline)}catch(t){const s=t;if(!("FirebaseError"===(n=s).name?n.code===Us.FAILED_PRECONDITION||n.code===Us.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&n instanceof DOMException)||22===n.code||20===n.code||11===n.code))throw s;Os("Error using user provided cache. Falling back to memory cache: "+s),await jl(e,new Ll)}}else Rs(Ul,"Using default OfflineComponentProvider"),await jl(e,new Ml(void 0));var n;return e._offlineComponents}(e);Rs(Ul,"Initializing OnlineComponentProvider"),await t.initialize(n,e.configuration),e.setCredentialChangeListener(e=>jh(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>jh(t.remoteStore,n)),e._onlineComponents=t}async function ql(e){return e._onlineComponents||(e._uninitializedComponentsProvider?(Rs(Ul,"Using user provided OnlineComponentProvider"),await Bl(e,e._uninitializedComponentsProvider._online)):(Rs(Ul,"Using default OnlineComponentProvider"),await Bl(e,new xl))),e._onlineComponents}async function zl(e){const t=await ql(e),n=t.eventManager;return n.onListen=dl.bind(null,t.syncEngine),n.onUnlisten=ml.bind(null,t.syncEngine),n.onFirstRemoteStoreListen=fl.bind(null,t.syncEngine),n.onLastRemoteStoreUnlisten=gl.bind(null,t.syncEngine),n}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $l(e){const t={};return void 0!==e.timeoutSeconds&&(t.timeoutSeconds=e.timeoutSeconds),t
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Hl=new Map,Gl="firestore.googleapis.com",Kl=!0;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e){if(void 0===e.host){if(void 0!==e.ssl)throw new Fs(Us.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Gl,this.ssl=Kl}else this.host=e.host,this.ssl=e.ssl??Kl;if(this.isUsingEmulator=void 0!==e.emulatorOptions,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,void 0===e.cacheSizeBytes)this.cacheSizeBytes=uu;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new Fs(Us.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}(function(e,t,n,r){if(!0===t&&!0===r)throw new Fs(Us.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===e.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$l(e.experimentalLongPollingOptions??{}),function(e){if(void 0!==e.timeoutSeconds){if(isNaN(e.timeoutSeconds))throw new Fs(Us.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`);if(e.timeoutSeconds<5)throw new Fs(Us.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`);if(e.timeoutSeconds>30)throw new Fs(Us.INVALID_ARGUMENT,`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(t=this.experimentalLongPollingOptions,n=e.experimentalLongPollingOptions,t.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var t,n}}class Ql{constructor(e,t,n,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new Fs(Us.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return"notTerminated"!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new Fs(Us.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wl(e),this._emulatorOptions=e.emulatorOptions||{},void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new qs;switch(e.type){case"firstParty":return new Gs(e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new Fs(Us.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return"notTerminated"===this._terminateTask&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){"notTerminated"===this._terminateTask?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Hl.get(e);t&&(Rs("ComponentProvider","Removing Datastore"),Hl.delete(e),t.terminate())}(this),Promise.resolve()}}function Xl(e,t,n,r={}){var i;e=pi(e,Ql);const o=d(t),a=e._getSettings(),c={...a,emulatorOptions:e._getEmulatorOptions()},u=`${t}:${n}`;o&&(f(`https://${u}`),g("Firestore",!0)),a.host!==Gl&&a.host!==u&&Os("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...a,host:u,ssl:o,emulatorOptions:r};if(!T(h,c)&&(e._setSettings(h),r.mockUserToken)){let t,n;if("string"==typeof r.mockUserToken)t=r.mockUserToken,n=Cs.MOCK_USER;else{t=function(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",r=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...e};return[s(JSON.stringify({alg:"none",type:"JWT"})),s(JSON.stringify(o)),""].join(".")}(r.mockUserToken,null==(i=e._app)?void 0:i.options.projectId);const o=r.mockUserToken.sub||r.mockUserToken.user_id;if(!o)throw new Fs(Us.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Cs(o)}e._authCredentials=new zs(new Bs(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Jl(this.firestore,e,this._query)}}class Yl{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Zl(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Yl(this.firestore,e,this._key)}toJSON(){return{type:Yl._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(gi(t,Yl._jsonSchema))return new Yl(e,n||null,new ci(ii.fromString(t.referencePath)))}}Yl._jsonSchemaVersion="firestore/documentReference/1.0",Yl._jsonSchema={type:mi("string",Yl._jsonSchemaVersion),referencePath:mi("string")};class Zl extends Jl{constructor(e,t,n){super(e,t,na(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Yl(this.firestore,null,new ci(e))}withConverter(e){return new Zl(this.firestore,e,this._path)}}function ed(e,t,...n){if(e=N(e),ui("collection","path",t),e instanceof Ql){const r=ii.fromString(t,...n);return li(r),new Zl(e,null,r)}{if(!(e instanceof Yl||e instanceof Zl))throw new Fs(Us.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ii.fromString(t,...n));return li(r),new Zl(e.firestore,null,r)}}function td(e,t,...n){if(e=N(e),1===arguments.length&&(t=Xs.newId()),ui("doc","path",t),e instanceof Ql){const r=ii.fromString(t,...n);return hi(r),new Yl(e,null,new ci(r))}{if(!(e instanceof Yl||e instanceof Zl))throw new Fs(Us.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(ii.fromString(t,...n));return hi(r),new Yl(e.firestore,e instanceof Zl?e.converter:null,new ci(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd="AsyncQueue";class rd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new ih(this,"async_queue_retry"),this._c=()=>{const e=rh();e&&Rs(nd,"Visibility state changed to "+e.visibilityState),this.M_.w_()},this.ac=e;const t=rh();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=rh();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new js;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(0!==this.Xu.length){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Ai(e))throw e;Rs(nd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(e=>{throw this.nc=e,this.rc=!1,Ds("INTERNAL UNHANDLED ERROR: ",sd(e)),e}).then(e=>(this.rc=!1,e))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const r=zh.createAndSchedule(this,e,t,n,e=>this.hc(e));return this.tc.push(r),r}uc(){this.nc&&Ls(47125,{Pc:sd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do{e=this.ac,await e}while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function sd(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}function id(e){return function(e,t){if("object"!=typeof e||null===e)return!1;const n=e;for(const r of t)if(r in n&&"function"==typeof n[r])return!0;return!1}(e,["next","error","complete"])}class od extends Ql{constructor(e,t,n,r){super(e,t,n,r),this.type="firestore",this._queue=new rd,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rd(e),this._firestoreClient=void 0,await e}}}function ad(e,t){const n="object"==typeof e?e:Ge(),r="string"==typeof e?e:no,s=je(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const e=(e=>{const t=c(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),r]:[t.substring(0,n),r]})("firestore");e&&Xl(s,...e)}return s}function cd(e){if(e._terminated)throw new Fs(Us.FAILED_PRECONDITION,"The client has already been terminated.");return e._firestoreClient||function(e){var t,n,r;const s=e._freezeSettings(),i=(o=e._databaseId,a=(null==(t=e._app)?void 0:t.options.appId)||"",c=e._persistenceKey,u=s,new to(o,a,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,$l(u.experimentalLongPollingOptions),u.useFetchStreams,u.isUsingEmulator));var o,a,c,u;e._componentsProvider||(null==(n=s.localCache)?void 0:n._offlineComponentProvider)&&(null==(r=s.localCache)?void 0:r._onlineComponentProvider)&&(e._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),e._firestoreClient=new Fl(e._authCredentials,e._appCheckCredentials,e._queue,i,e._componentsProvider&&function(e){const t=null==e?void 0:e._online.build();return{_offline:null==e?void 0:e._offline.build(t),_online:t}}(e._componentsProvider))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e),e._firestoreClient}class ud{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ud(zi.fromBase64String(e))}catch(t){throw new Fs(Us.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ud(zi.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ud._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(gi(e,ud._jsonSchema))return ud.fromBase64String(e.bytes)}}ud._jsonSchemaVersion="firestore/bytes/1.0",ud._jsonSchema={type:mi("string",ud._jsonSchemaVersion),bytes:mi("string")};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hd{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new Fs(Us.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ai(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new Fs(Us.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new Fs(Us.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Js(this._lat,e._lat)||Js(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:dd._jsonSchemaVersion}}static fromJSON(e){if(gi(e,dd._jsonSchema))return new dd(e.latitude,e.longitude)}}dd._jsonSchemaVersion="firestore/geoPoint/1.0",dd._jsonSchema={type:mi("string",dd._jsonSchemaVersion),latitude:mi("number"),longitude:mi("number")};
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fd{constructor(e){this._values=(e||[]).map(e=>e)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;++n)if(e[n]!==t[n])return!1;return!0}(this._values,e._values)}toJSON(){return{type:fd._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(gi(e,fd._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(e=>"number"==typeof e))return new fd(e.vectorValues);throw new Fs(Us.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}fd._jsonSchemaVersion="firestore/vectorValue/1.0",fd._jsonSchema={type:mi("string",fd._jsonSchemaVersion),vectorValues:mi("object")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pd=/^__.*__$/;class md{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new ec(e,this.data,this.fieldMask,t,this.fieldTransforms):new Za(e,this.data,t,this.fieldTransforms)}}class gd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new ec(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function yd(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Ls(40011,{Ac:e})}}class vd{constructor(e,t,n,r,s,i){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===s&&this.Rc(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new vd({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.Vc({path:n,fc:!1});return r.gc(e),r}yc(e){var t;const n=null==(t=this.path)?void 0:t.child(e),r=this.Vc({path:n,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Pd(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(0===e.length)throw this.Sc("Document fields must not be empty");if(yd(this.Ac)&&pd.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class wd{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||sh(e)}Cc(e,t,n,r=!1){return new vd({Ac:e,methodName:t,Dc:n,path:ai.emptyPath(),fc:!1,bc:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _d(e){const t=e._freezeSettings(),n=sh(e._databaseId);return new wd(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Ed(e,t,n,r,s,i={}){const o=e.Cc(i.merge||i.mergeFields?2:0,t,n,s);Nd("Data must be an object, but it was:",o,r);const a=Ad(r,o);let c,u;if(i.merge)c=new Bi(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const e=[];for(const r of i.mergeFields){const s=Rd(t,r,n);if(!o.contains(s))throw new Fs(Us.INVALID_ARGUMENT,`Field '${s}' is specified in your field mask but missing from your input data.`);Ld(e,s)||e.push(s)}c=new Bi(e),u=o.fieldTransforms.filter(e=>c.covers(e.field))}else c=null,u=o.fieldTransforms;return new md(new Co(a),c,u)}class Td extends ld{_toFieldTransform(e){if(2!==e.Ac)throw 1===e.Ac?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Td}}class Id extends ld{_toFieldTransform(e){return new za(e.path,new Ma)}isEqual(e){return e instanceof Id}}function bd(e,t,n,r){const s=e.Cc(1,t,n);Nd("Data must be an object, but it was:",s,r);const i=[],o=Co.empty();Li(r,(e,r)=>{const a=Od(t,e,n);r=N(r);const c=s.yc(a);if(r instanceof Td)i.push(a);else{const e=Cd(r,c);null!=e&&(i.push(a),o.set(a,e))}});const a=new Bi(i);return new gd(o,a,s.fieldTransforms)}function Sd(e,t,n,r,s,i){const o=e.Cc(1,t,n),a=[Rd(t,r,n)],c=[s];if(i.length%2!=0)throw new Fs(Us.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Rd(t,i[d])),c.push(i[d+1]);const u=[],h=Co.empty();for(let d=a.length-1;d>=0;--d)if(!Ld(u,a[d])){const e=a[d];let t=c[d];t=N(t);const n=o.yc(e);if(t instanceof Td)u.push(e);else{const r=Cd(t,n);null!=r&&(u.push(e),h.set(e,r))}}const l=new Bi(u);return new gd(h,l,o.fieldTransforms)}function Cd(e,t){if(kd(e=N(e)))return Nd("Unsupported field value:",t,e),Ad(e,t);if(e instanceof ld)return function(e,t){if(!yd(t.Ac))throw t.Sc(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Sc(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.fc&&4!==t.Ac)throw t.Sc("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const s of e){let e=Cd(s,t.wc(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=N(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Ra(t.serializer,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=wi.fromDate(e);return{timestampValue:Oc(t.serializer,n)}}if(e instanceof wi){const n=new wi(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:Oc(t.serializer,n)}}if(e instanceof dd)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof ud)return{bytesValue:Pc(t.serializer,e._byteString)};if(e instanceof Yl){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Sc(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:xc(e.firestore._databaseId||t.databaseId,e._key.path)}}if(e instanceof fd)return n=e,r=t,{mapValue:{fields:{[so]:{stringValue:ao},[co]:{arrayValue:{values:n.toArray().map(e=>{if("number"!=typeof e)throw r.Sc("VectorValues must only contain numeric values.");return ka(r.serializer,e)})}}}}};var n,r;throw t.Sc(`Unsupported field value: ${fi(e)}`)}(e,t)}function Ad(e,t){const n={};return Mi(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Li(e,(e,r)=>{const s=Cd(r,t.mc(e));null!=s&&(n[e]=s)}),{mapValue:{fields:n}}}function kd(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof wi||e instanceof dd||e instanceof ud||e instanceof Yl||e instanceof ld||e instanceof fd)}function Nd(e,t,n){if(!kd(n)||!di(n)){const r=fi(n);throw"an object"===r?t.Sc(e+" a custom object"):t.Sc(e+" "+r)}}function Rd(e,t,n){if((t=N(t))instanceof hd)return t._internalPath;if("string"==typeof t)return Od(e,t);throw Pd("Field path arguments must be of type string or ",e,!1,void 0,n)}const Dd=new RegExp("[~\\*/\\[\\]]");function Od(e,t,n){if(t.search(Dd)>=0)throw Pd(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new hd(...t.split("."))._internalPath}catch(r){throw Pd(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Pd(e,t,n,r,s){const i=r&&!r.isEmpty(),o=void 0!==s;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new Fs(Us.INVALID_ARGUMENT,a+e+c)}function Ld(e,t){return e.some(e=>e.isEqual(t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e,t,n,r,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Yl(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new xd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Vd("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class xd extends Md{data(){return super.data()}}function Vd(e,t){return"string"==typeof t?Od(e,t):t instanceof hd?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new Fs(Us.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Fd{}class jd extends Fd{}function Bd(e,t,...n){let r=[];t instanceof Fd&&r.push(t),r=r.concat(n),function(e){const t=e.filter(e=>e instanceof $d).length,n=e.filter(e=>e instanceof qd).length;if(t>1||t>0&&n>0)throw new Fs(Us.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)e=s._apply(e);return e}class qd extends jd{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new qd(e,t,n)}_apply(e){const t=this._parse(e);return Jd(e._query,t),new Jl(e.firestore,e.converter,aa(e._query,t))}_parse(e){const t=_d(e.firestore),n=function(e,t,n,r,s,i,o){let a;if(s.isKeyField()){if("array-contains"===i||"array-contains-any"===i)throw new Fs(Us.INVALID_ARGUMENT,`Invalid Query. You can't perform '${i}' queries on documentId().`);if("in"===i||"not-in"===i){Xd(o,i);const t=[];for(const n of o)t.push(Qd(r,e,n));a={arrayValue:{values:t}}}else a=Qd(r,e,o)}else"in"!==i&&"not-in"!==i&&"array-contains-any"!==i||Xd(o,i),a=function(e,t,n,r=!1){return Cd(n,e.Cc(r?4:3,t))}(n,t,o,"in"===i||"not-in"===i);return Mo.create(s,i,a)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value);return n}}function zd(e,t,n){const r=t,s=Vd("where",e);return qd._create(s,r,n)}class $d extends Fd{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new $d(e,t)}_parse(e){const t=this._queryConstraints.map(t=>t._parse(e)).filter(e=>e.getFilters().length>0);return 1===t.length?t[0]:xo.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return 0===t.getFilters().length?e:(function(e,t){let n=e;const r=t.getFlattenedFilters();for(const s of r)Jd(n,s),n=aa(n,s)}(e._query,t),new Jl(e.firestore,e.converter,aa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return"and"===this.type?"and":"or"}}class Hd extends jd{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Hd(e,t)}_apply(e){const t=function(e,t,n){if(null!==e.startAt)throw new Fs(Us.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(null!==e.endAt)throw new Fs(Us.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Oo(t,n)}(e._query,this._field,this._direction);return new Jl(e.firestore,e.converter,function(e,t){const n=e.explicitOrderBy.concat([t]);return new ta(e.path,e.collectionGroup,n,e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(e._query,t))}}function Gd(e,t="asc"){const n=t,r=Vd("orderBy",e);return Hd._create(r,n)}class Kd extends jd{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Kd(e,t,n)}_apply(e){return new Jl(e.firestore,e.converter,ca(e._query,this._limit,this._limitType))}}function Wd(e){return function(e,t){if(t<=0)throw new Fs(Us.INVALID_ARGUMENT,`Function ${e}() requires a positive number, but it was: ${t}.`)}("limit",e),Kd._create("limit",e,"F")}function Qd(e,t,n){if("string"==typeof(n=N(n))){if(""===n)throw new Fs(Us.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!sa(t)&&-1!==n.indexOf("/"))throw new Fs(Us.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=t.path.child(ii.fromString(n));if(!ci.isDocumentKey(r))throw new Fs(Us.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return wo(e,new ci(r))}if(n instanceof Yl)return wo(e,n._key);throw new Fs(Us.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${fi(n)}.`)}function Xd(e,t){if(!Array.isArray(e)||0===e.length)throw new Fs(Us.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Jd(e,t){const n=function(e,t){for(const n of e)for(const e of n.getFlattenedFilters())if(t.indexOf(e.op)>=0)return e.op;return null}(e.filters,function(e){switch(e){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(null!==n)throw n===t.op?new Fs(Us.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new Fs(Us.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${n.toString()}' filters.`)}class Yd{convertValue(e,t="none"){switch(uo(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Gi(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ki(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Ls(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Li(e,(e,r)=>{n[e]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,r;const s=null==(r=null==(n=null==(t=e.fields)?void 0:t[co].arrayValue)?void 0:n.values)?void 0:r.map(e=>Gi(e.doubleValue));return new fd(s)}convertGeoPoint(e){return new dd(Gi(e.latitude),Gi(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Zi(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(eo(e));default:return null}}convertTimestamp(e){const t=Hi(e);return new wi(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ii.fromString(e);xs(nu(n),9688,{name:e});const r=new ro(n.get(1),n.get(3)),s=new ci(n.popFirst(5));return r.isEqual(t)||Ds(`Document ${s} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zd(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}class ef{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class tf extends Md{constructor(e,t,n,r,s,i){super(e,t,n,r,i),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new nf(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Vd("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new Fs(Us.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=tf._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),e&&e.isValidDocument()&&e.isFoundDocument()?(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t):t}}tf._jsonSchemaVersion="firestore/documentSnapshot/1.0",tf._jsonSchema={type:mi("string",tf._jsonSchemaVersion),bundleSource:mi("string","DocumentSnapshot"),bundleName:mi("string"),bundle:mi("string")};class nf extends tf{data(e={}){return super.data(e)}}class rf{constructor(e,t,n,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new ef(r.hasPendingWrites,r.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new nf(this._firestore,this._userDataWriter,n.key,n,new ef(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new Fs(Us.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{const r=new nf(e._firestore,e._userDataWriter,n.doc.key,n.doc,new ef(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:r,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{const r=new nf(e._firestore,e._userDataWriter,t.doc.key,t.doc,new ef(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter);let s=-1,i=-1;return 0!==t.type&&(s=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(n=n.add(t.doc),i=n.indexOf(t.doc.key)),{type:sf(t.type),doc:r,oldIndex:s,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new Fs(Us.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=rf._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Xs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],r=[];return this.docs.forEach(e=>{null!==e._document&&(t.push(e._document),n.push(this._userDataWriter.convertObjectMap(e._document.data.value.mapValue.fields,"previous")),r.push(e.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function sf(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ls(61501,{type:e})}}rf._jsonSchemaVersion="firestore/querySnapshot/1.0",rf._jsonSchema={type:mi("string",rf._jsonSchemaVersion),bundleSource:mi("string","QuerySnapshot"),bundleName:mi("string"),bundle:mi("string")};class of extends Yd{constructor(e){super(),this.firestore=e}convertBytes(e){return new ud(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Yl(this.firestore,null,t)}}function af(e){e=pi(e,Jl);const t=pi(e.firestore,od),n=cd(t),r=new of(t);return Ud(e._query),function(e,t,n={}){const r=new js;return e.asyncQueue.enqueueAndForget(async()=>function(e,t,n,r,s){const i=new Vl({next:n=>{i.Nu(),t.enqueueAndForget(()=>Yh(e,o)),n.fromCache&&"server"===r.source?s.reject(new Fs(Us.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):s.resolve(n)},error:e=>s.reject(e)}),o=new sl(n,i,{includeMetadataChanges:!0,qa:!0});return Jh(e,o)}(await zl(e),e.asyncQueue,t,n,r)),r.promise}(n,e._query).then(n=>new rf(t,r,e,n))}function cf(e,t,n,...r){e=pi(e,Yl);const s=pi(e.firestore,od),i=_d(s);let o;return o="string"==typeof(t=N(t))||t instanceof hd?Sd(i,"updateDoc",e._key,t,n,r):bd(i,"updateDoc",e._key,t),lf(s,[o.toMutation(e._key,Ha.exists(!0))])}function uf(e,t){const n=pi(e.firestore,od),r=td(e),s=Zd(e.converter,t);return lf(n,[Ed(_d(e.firestore),"addDoc",r._key,s,null!==e.converter,{}).toMutation(r._key,Ha.exists(!1))]).then(()=>r)}function hf(e,...t){var n,r,s;e=N(e);let i={includeMetadataChanges:!1,source:"default"},o=0;"object"!=typeof t[o]||id(t[o])||(i=t[o++]);const a={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(id(t[o])){const e=t[o];t[o]=null==(n=e.next)?void 0:n.bind(e),t[o+1]=null==(r=e.error)?void 0:r.bind(e),t[o+2]=null==(s=e.complete)?void 0:s.bind(e)}let c,u,h;if(e instanceof Yl)u=pi(e.firestore,od),h=na(e._key.path),c={next:n=>{t[o]&&t[o](function(e,t,n){const r=n.docs.get(t._key),s=new of(e);return new tf(e,s,t._key,r,new ef(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(u,e,n))},error:t[o+1],complete:t[o+2]};else{const n=pi(e,Jl);u=pi(n.firestore,od),h=n._query;const r=new of(u);c={next:e=>{t[o]&&t[o](new rf(u,r,n,e))},error:t[o+1],complete:t[o+2]},Ud(e._query)}return function(e,t,n,r){const s=new Vl(r),i=new sl(t,s,n);return e.asyncQueue.enqueueAndForget(async()=>Jh(await zl(e),i)),()=>{s.Nu(),e.asyncQueue.enqueueAndForget(async()=>Yh(await zl(e),i))}}(cd(u),h,a,c)}function lf(e,t){return function(e,t){const n=new js;return e.asyncQueue.enqueueAndForget(async()=>yl(await function(e){return ql(e).then(e=>e.syncEngine)}(e),t,n)),n.promise}(cd(e),t)}class df{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=_d(e)}set(e,t,n){this._verifyNotCommitted();const r=ff(e,this._firestore),s=Zd(r.converter,t,n),i=Ed(this._dataReader,"WriteBatch.set",r._key,s,null!==r.converter,n);return this._mutations.push(i.toMutation(r._key,Ha.none())),this}update(e,t,n,...r){this._verifyNotCommitted();const s=ff(e,this._firestore);let i;return i="string"==typeof(t=N(t))||t instanceof hd?Sd(this._dataReader,"WriteBatch.update",s._key,t,n,r):bd(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(i.toMutation(s._key,Ha.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ff(e,this._firestore);return this._mutations=this._mutations.concat(new sc(t._key,Ha.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new Fs(Us.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ff(e,t){if((e=N(e)).firestore!==t)throw new Fs(Us.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return e}function pf(){return new Id("serverTimestamp")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(e){return cd(e=pi(e,od)),new df(e,t=>lf(e,t))}!function(e,t=!0){As=$e,Fe(new R("firestore",(e,{instanceIdentifier:n,options:r})=>{const s=e.getProvider("app").getImmediate(),i=new od(new $s(e.getProvider("auth-internal")),new Ws(s,e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new Fs(Us.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ro(e.options.projectId,t)}(s,n),s);return r={useFetchStreams:t,...r},i._setSettings(r),i},"PUBLIC").setMultipleInstances(!0)),Ke(bs,Ss,e),Ke(bs,Ss,"esm2020")}();export{wi as T,ad as a,Yn as b,or as c,Xn as d,Gn as e,Gd as f,hs as g,ed as h,He as i,hf as j,uf as k,Wd as l,pf as m,td as n,Zn as o,af as p,Bd as q,mf as r,er as s,Jn as t,cf as u,zd as w};
