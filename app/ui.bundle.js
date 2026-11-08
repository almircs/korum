(()=>{var xf=Object.create;var pu=Object.defineProperty;var yf=Object.getOwnPropertyDescriptor;var bf=Object.getOwnPropertyNames;var Mf=Object.getPrototypeOf,Sf=Object.prototype.hasOwnProperty;var Ys=(n=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(n,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):n)(function(n){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});var Ef=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var wf=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of bf(t))!Sf.call(n,s)&&s!==e&&pu(n,s,{get:()=>t[s],enumerable:!(i=yf(t,s))||i.enumerable});return n};var Tf=(n,t,e)=>(e=n!=null?xf(Mf(n)):{},wf(t||!n||!n.__esModule?pu(e,"default",{value:n,enumerable:!0}):e,n));var Pd=Ef((Cd,wc)=>{(function(n){typeof Cd=="object"&&typeof wc<"u"?wc.exports=n():typeof define=="function"&&define.amd?define([],n):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=n()})(function(){return function n(t,e,i){function s(o,c){if(!e[o]){if(!t[o]){var l=typeof Ys=="function"&&Ys;if(!c&&l)return l(o,!0);if(r)return r(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var u=e[o]={exports:{}};t[o][0].call(u.exports,function(f){var d=t[o][1][f];return s(d||f)},u,u.exports,n,t,e,i)}return e[o].exports}for(var r=typeof Ys=="function"&&Ys,a=0;a<i.length;a++)s(i[a]);return s}({1:[function(n,t,e){"use strict";var i=n("./utils"),s=n("./support"),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(a){for(var o,c,l,h,u,f,d,g=[],_=0,p=a.length,m=p,S=i.getTypeOf(a)!=="string";_<a.length;)m=p-_,l=S?(o=a[_++],c=_<p?a[_++]:0,_<p?a[_++]:0):(o=a.charCodeAt(_++),c=_<p?a.charCodeAt(_++):0,_<p?a.charCodeAt(_++):0),h=o>>2,u=(3&o)<<4|c>>4,f=1<m?(15&c)<<2|l>>6:64,d=2<m?63&l:64,g.push(r.charAt(h)+r.charAt(u)+r.charAt(f)+r.charAt(d));return g.join("")},e.decode=function(a){var o,c,l,h,u,f,d=0,g=0,_="data:";if(a.substr(0,_.length)===_)throw new Error("Invalid base64 input, it looks like a data url.");var p,m=3*(a=a.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(a.charAt(a.length-1)===r.charAt(64)&&m--,a.charAt(a.length-2)===r.charAt(64)&&m--,m%1!=0)throw new Error("Invalid base64 input, bad content length.");for(p=s.uint8array?new Uint8Array(0|m):new Array(0|m);d<a.length;)o=r.indexOf(a.charAt(d++))<<2|(h=r.indexOf(a.charAt(d++)))>>4,c=(15&h)<<4|(u=r.indexOf(a.charAt(d++)))>>2,l=(3&u)<<6|(f=r.indexOf(a.charAt(d++))),p[g++]=o,u!==64&&(p[g++]=c),f!==64&&(p[g++]=l);return p}},{"./support":30,"./utils":32}],2:[function(n,t,e){"use strict";var i=n("./external"),s=n("./stream/DataWorker"),r=n("./stream/Crc32Probe"),a=n("./stream/DataLengthProbe");function o(c,l,h,u,f){this.compressedSize=c,this.uncompressedSize=l,this.crc32=h,this.compression=u,this.compressedContent=f}o.prototype={getContentWorker:function(){var c=new s(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),l=this;return c.on("end",function(){if(this.streamInfo.data_length!==l.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),c},getCompressedWorker:function(){return new s(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(c,l,h){return c.pipe(new r).pipe(new a("uncompressedSize")).pipe(l.compressWorker(h)).pipe(new a("compressedSize")).withStreamInfo("compression",l)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(n,t,e){"use strict";var i=n("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},e.DEFLATE=n("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(n,t,e){"use strict";var i=n("./utils"),s=function(){for(var r,a=[],o=0;o<256;o++){r=o;for(var c=0;c<8;c++)r=1&r?3988292384^r>>>1:r>>>1;a[o]=r}return a}();t.exports=function(r,a){return r!==void 0&&r.length?i.getTypeOf(r)!=="string"?function(o,c,l,h){var u=s,f=h+l;o^=-1;for(var d=h;d<f;d++)o=o>>>8^u[255&(o^c[d])];return-1^o}(0|a,r,r.length,0):function(o,c,l,h){var u=s,f=h+l;o^=-1;for(var d=h;d<f;d++)o=o>>>8^u[255&(o^c.charCodeAt(d))];return-1^o}(0|a,r,r.length,0):0}},{"./utils":32}],5:[function(n,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(n,t,e){"use strict";var i=null;i=typeof Promise<"u"?Promise:n("lie"),t.exports={Promise:i}},{lie:37}],7:[function(n,t,e){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",s=n("pako"),r=n("./utils"),a=n("./stream/GenericWorker"),o=i?"uint8array":"array";function c(l,h){a.call(this,"FlateWorker/"+l),this._pako=null,this._pakoAction=l,this._pakoOptions=h,this.meta={}}e.magic="\b\0",r.inherits(c,a),c.prototype.processChunk=function(l){this.meta=l.meta,this._pako===null&&this._createPako(),this._pako.push(r.transformTo(o,l.data),!1)},c.prototype.flush=function(){a.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},c.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},c.prototype._createPako=function(){this._pako=new s[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var l=this;this._pako.onData=function(h){l.push({data:h,meta:l.meta})}},e.compressWorker=function(l){return new c("Deflate",l)},e.uncompressWorker=function(){return new c("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(n,t,e){"use strict";function i(u,f){var d,g="";for(d=0;d<f;d++)g+=String.fromCharCode(255&u),u>>>=8;return g}function s(u,f,d,g,_,p){var m,S,x=u.file,T=u.compression,I=p!==o.utf8encode,L=r.transformTo("string",p(x.name)),R=r.transformTo("string",o.utf8encode(x.name)),j=x.comment,C=r.transformTo("string",p(j)),M=r.transformTo("string",o.utf8encode(j)),N=R.length!==x.name.length,b=M.length!==j.length,Z="",V="",U="",nt=x.dir,K=x.date,rt={crc32:0,compressedSize:0,uncompressedSize:0};f&&!d||(rt.crc32=u.crc32,rt.compressedSize=u.compressedSize,rt.uncompressedSize=u.uncompressedSize);var k=0;f&&(k|=8),I||!N&&!b||(k|=2048);var H=0,ct=0;nt&&(H|=16),_==="UNIX"?(ct=798,H|=function(G,dt){var yt=G;return G||(yt=dt?16893:33204),(65535&yt)<<16}(x.unixPermissions,nt)):(ct=20,H|=function(G){return 63&(G||0)}(x.dosPermissions)),m=K.getUTCHours(),m<<=6,m|=K.getUTCMinutes(),m<<=5,m|=K.getUTCSeconds()/2,S=K.getUTCFullYear()-1980,S<<=4,S|=K.getUTCMonth()+1,S<<=5,S|=K.getUTCDate(),N&&(V=i(1,1)+i(c(L),4)+R,Z+="up"+i(V.length,2)+V),b&&(U=i(1,1)+i(c(C),4)+M,Z+="uc"+i(U.length,2)+U);var lt="";return lt+=`
\0`,lt+=i(k,2),lt+=T.magic,lt+=i(m,2),lt+=i(S,2),lt+=i(rt.crc32,4),lt+=i(rt.compressedSize,4),lt+=i(rt.uncompressedSize,4),lt+=i(L.length,2),lt+=i(Z.length,2),{fileRecord:l.LOCAL_FILE_HEADER+lt+L+Z,dirRecord:l.CENTRAL_FILE_HEADER+i(ct,2)+lt+i(C.length,2)+"\0\0\0\0"+i(H,4)+i(g,4)+L+Z+C}}var r=n("../utils"),a=n("../stream/GenericWorker"),o=n("../utf8"),c=n("../crc32"),l=n("../signature");function h(u,f,d,g){a.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=f,this.zipPlatform=d,this.encodeFileName=g,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}r.inherits(h,a),h.prototype.push=function(u){var f=u.meta.percent||0,d=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,a.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:d?(f+100*(d-g-1))/d:100}}))},h.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var f=this.streamFiles&&!u.file.dir;if(f){var d=s(u,f,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:d.fileRecord,meta:{percent:0}})}else this.accumulate=!0},h.prototype.closedSource=function(u){this.accumulate=!1;var f=this.streamFiles&&!u.file.dir,d=s(u,f,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(d.dirRecord),f)this.push({data:function(g){return l.DATA_DESCRIPTOR+i(g.crc32,4)+i(g.compressedSize,4)+i(g.uncompressedSize,4)}(u),meta:{percent:100}});else for(this.push({data:d.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},h.prototype.flush=function(){for(var u=this.bytesWritten,f=0;f<this.dirRecords.length;f++)this.push({data:this.dirRecords[f],meta:{percent:100}});var d=this.bytesWritten-u,g=function(_,p,m,S,x){var T=r.transformTo("string",x(S));return l.CENTRAL_DIRECTORY_END+"\0\0\0\0"+i(_,2)+i(_,2)+i(p,4)+i(m,4)+i(T.length,2)+T}(this.dirRecords.length,d,u,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},h.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},h.prototype.registerPrevious=function(u){this._sources.push(u);var f=this;return u.on("data",function(d){f.processChunk(d)}),u.on("end",function(){f.closedSource(f.previous.streamInfo),f._sources.length?f.prepareNextSource():f.end()}),u.on("error",function(d){f.error(d)}),this},h.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},h.prototype.error=function(u){var f=this._sources;if(!a.prototype.error.call(this,u))return!1;for(var d=0;d<f.length;d++)try{f[d].error(u)}catch{}return!0},h.prototype.lock=function(){a.prototype.lock.call(this);for(var u=this._sources,f=0;f<u.length;f++)u[f].lock()},t.exports=h},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(n,t,e){"use strict";var i=n("../compressions"),s=n("./ZipFileWorker");e.generateWorker=function(r,a,o){var c=new s(a.streamFiles,o,a.platform,a.encodeFileName),l=0;try{r.forEach(function(h,u){l++;var f=function(p,m){var S=p||m,x=i[S];if(!x)throw new Error(S+" is not a valid compression method !");return x}(u.options.compression,a.compression),d=u.options.compressionOptions||a.compressionOptions||{},g=u.dir,_=u.date;u._compressWorker(f,d).withStreamInfo("file",{name:h,dir:g,date:_,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(c)}),c.entriesCount=l}catch(h){c.error(h)}return c}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(n,t,e){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var s=new i;for(var r in this)typeof this[r]!="function"&&(s[r]=this[r]);return s}}(i.prototype=n("./object")).loadAsync=n("./load"),i.support=n("./support"),i.defaults=n("./defaults"),i.version="3.10.1",i.loadAsync=function(s,r){return new i().loadAsync(s,r)},i.external=n("./external"),t.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(n,t,e){"use strict";var i=n("./utils"),s=n("./external"),r=n("./utf8"),a=n("./zipEntries"),o=n("./stream/Crc32Probe"),c=n("./nodejsUtils");function l(h){return new s.Promise(function(u,f){var d=h.decompressed.getContentWorker().pipe(new o);d.on("error",function(g){f(g)}).on("end",function(){d.streamInfo.crc32!==h.decompressed.crc32?f(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(h,u){var f=this;return u=i.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:r.utf8decode}),c.isNode&&c.isStream(h)?s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",h,!0,u.optimizedBinaryString,u.base64).then(function(d){var g=new a(u);return g.load(d),g}).then(function(d){var g=[s.Promise.resolve(d)],_=d.files;if(u.checkCRC32)for(var p=0;p<_.length;p++)g.push(l(_[p]));return s.Promise.all(g)}).then(function(d){for(var g=d.shift(),_=g.files,p=0;p<_.length;p++){var m=_[p],S=m.fileNameStr,x=i.resolve(m.fileNameStr);f.file(x,m.decompressed,{binary:!0,optimizedBinaryString:!0,date:m.date,dir:m.dir,comment:m.fileCommentStr.length?m.fileCommentStr:null,unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions,createFolders:u.createFolders}),m.dir||(f.file(x).unsafeOriginalName=S)}return g.zipComment.length&&(f.comment=g.zipComment),f})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(n,t,e){"use strict";var i=n("../utils"),s=n("../stream/GenericWorker");function r(a,o){s.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(o)}i.inherits(r,s),r.prototype._bindStream=function(a){var o=this;(this._stream=a).pause(),a.on("data",function(c){o.push({data:c,meta:{percent:0}})}).on("error",function(c){o.isPaused?this.generatedError=c:o.error(c)}).on("end",function(){o.isPaused?o._upstreamEnded=!0:o.end()})},r.prototype.pause=function(){return!!s.prototype.pause.call(this)&&(this._stream.pause(),!0)},r.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=r},{"../stream/GenericWorker":28,"../utils":32}],13:[function(n,t,e){"use strict";var i=n("readable-stream").Readable;function s(r,a,o){i.call(this,a),this._helper=r;var c=this;r.on("data",function(l,h){c.push(l)||c._helper.pause(),o&&o(h)}).on("error",function(l){c.emit("error",l)}).on("end",function(){c.push(null)})}n("../utils").inherits(s,i),s.prototype._read=function(){this._helper.resume()},t.exports=s},{"../utils":32,"readable-stream":16}],14:[function(n,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(i,s){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(i,s);if(typeof i=="number")throw new Error('The "data" argument must not be a number');return new Buffer(i,s)},allocBuffer:function(i){if(Buffer.alloc)return Buffer.alloc(i);var s=new Buffer(i);return s.fill(0),s},isBuffer:function(i){return Buffer.isBuffer(i)},isStream:function(i){return i&&typeof i.on=="function"&&typeof i.pause=="function"&&typeof i.resume=="function"}}},{}],15:[function(n,t,e){"use strict";function i(x,T,I){var L,R=r.getTypeOf(T),j=r.extend(I||{},c);j.date=j.date||new Date,j.compression!==null&&(j.compression=j.compression.toUpperCase()),typeof j.unixPermissions=="string"&&(j.unixPermissions=parseInt(j.unixPermissions,8)),j.unixPermissions&&16384&j.unixPermissions&&(j.dir=!0),j.dosPermissions&&16&j.dosPermissions&&(j.dir=!0),j.dir&&(x=_(x)),j.createFolders&&(L=g(x))&&p.call(this,L,!0);var C=R==="string"&&j.binary===!1&&j.base64===!1;I&&I.binary!==void 0||(j.binary=!C),(T instanceof l&&T.uncompressedSize===0||j.dir||!T||T.length===0)&&(j.base64=!1,j.binary=!0,T="",j.compression="STORE",R="string");var M=null;M=T instanceof l||T instanceof a?T:f.isNode&&f.isStream(T)?new d(x,T):r.prepareContent(x,T,j.binary,j.optimizedBinaryString,j.base64);var N=new h(x,M,j);this.files[x]=N}var s=n("./utf8"),r=n("./utils"),a=n("./stream/GenericWorker"),o=n("./stream/StreamHelper"),c=n("./defaults"),l=n("./compressedObject"),h=n("./zipObject"),u=n("./generate"),f=n("./nodejsUtils"),d=n("./nodejs/NodejsStreamInputAdapter"),g=function(x){x.slice(-1)==="/"&&(x=x.substring(0,x.length-1));var T=x.lastIndexOf("/");return 0<T?x.substring(0,T):""},_=function(x){return x.slice(-1)!=="/"&&(x+="/"),x},p=function(x,T){return T=T!==void 0?T:c.createFolders,x=_(x),this.files[x]||i.call(this,x,null,{dir:!0,createFolders:T}),this.files[x]};function m(x){return Object.prototype.toString.call(x)==="[object RegExp]"}var S={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(x){var T,I,L;for(T in this.files)L=this.files[T],(I=T.slice(this.root.length,T.length))&&T.slice(0,this.root.length)===this.root&&x(I,L)},filter:function(x){var T=[];return this.forEach(function(I,L){x(I,L)&&T.push(L)}),T},file:function(x,T,I){if(arguments.length!==1)return x=this.root+x,i.call(this,x,T,I),this;if(m(x)){var L=x;return this.filter(function(j,C){return!C.dir&&L.test(j)})}var R=this.files[this.root+x];return R&&!R.dir?R:null},folder:function(x){if(!x)return this;if(m(x))return this.filter(function(R,j){return j.dir&&x.test(R)});var T=this.root+x,I=p.call(this,T),L=this.clone();return L.root=I.name,L},remove:function(x){x=this.root+x;var T=this.files[x];if(T||(x.slice(-1)!=="/"&&(x+="/"),T=this.files[x]),T&&!T.dir)delete this.files[x];else for(var I=this.filter(function(R,j){return j.name.slice(0,x.length)===x}),L=0;L<I.length;L++)delete this.files[I[L].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(x){var T,I={};try{if((I=r.extend(x||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:s.utf8encode})).type=I.type.toLowerCase(),I.compression=I.compression.toUpperCase(),I.type==="binarystring"&&(I.type="string"),!I.type)throw new Error("No output type specified.");r.checkSupport(I.type),I.platform!=="darwin"&&I.platform!=="freebsd"&&I.platform!=="linux"&&I.platform!=="sunos"||(I.platform="UNIX"),I.platform==="win32"&&(I.platform="DOS");var L=I.comment||this.comment||"";T=u.generateWorker(this,I,L)}catch(R){(T=new a("error")).error(R)}return new o(T,I.type||"string",I.mimeType)},generateAsync:function(x,T){return this.generateInternalStream(x).accumulate(T)},generateNodeStream:function(x,T){return(x=x||{}).type||(x.type="nodebuffer"),this.generateInternalStream(x).toNodejsStream(T)}};t.exports=S},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(n,t,e){"use strict";t.exports=n("stream")},{stream:void 0}],17:[function(n,t,e){"use strict";var i=n("./DataReader");function s(r){i.call(this,r);for(var a=0;a<this.data.length;a++)r[a]=255&r[a]}n("../utils").inherits(s,i),s.prototype.byteAt=function(r){return this.data[this.zero+r]},s.prototype.lastIndexOfSignature=function(r){for(var a=r.charCodeAt(0),o=r.charCodeAt(1),c=r.charCodeAt(2),l=r.charCodeAt(3),h=this.length-4;0<=h;--h)if(this.data[h]===a&&this.data[h+1]===o&&this.data[h+2]===c&&this.data[h+3]===l)return h-this.zero;return-1},s.prototype.readAndCheckSignature=function(r){var a=r.charCodeAt(0),o=r.charCodeAt(1),c=r.charCodeAt(2),l=r.charCodeAt(3),h=this.readData(4);return a===h[0]&&o===h[1]&&c===h[2]&&l===h[3]},s.prototype.readData=function(r){if(this.checkOffset(r),r===0)return[];var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./DataReader":18}],18:[function(n,t,e){"use strict";var i=n("../utils");function s(r){this.data=r,this.length=r.length,this.index=0,this.zero=0}s.prototype={checkOffset:function(r){this.checkIndex(this.index+r)},checkIndex:function(r){if(this.length<this.zero+r||r<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+r+"). Corrupted zip ?")},setIndex:function(r){this.checkIndex(r),this.index=r},skip:function(r){this.setIndex(this.index+r)},byteAt:function(){},readInt:function(r){var a,o=0;for(this.checkOffset(r),a=this.index+r-1;a>=this.index;a--)o=(o<<8)+this.byteAt(a);return this.index+=r,o},readString:function(r){return i.transformTo("string",this.readData(r))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var r=this.readInt(4);return new Date(Date.UTC(1980+(r>>25&127),(r>>21&15)-1,r>>16&31,r>>11&31,r>>5&63,(31&r)<<1))}},t.exports=s},{"../utils":32}],19:[function(n,t,e){"use strict";var i=n("./Uint8ArrayReader");function s(r){i.call(this,r)}n("../utils").inherits(s,i),s.prototype.readData=function(r){this.checkOffset(r);var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(n,t,e){"use strict";var i=n("./DataReader");function s(r){i.call(this,r)}n("../utils").inherits(s,i),s.prototype.byteAt=function(r){return this.data.charCodeAt(this.zero+r)},s.prototype.lastIndexOfSignature=function(r){return this.data.lastIndexOf(r)-this.zero},s.prototype.readAndCheckSignature=function(r){return r===this.readData(4)},s.prototype.readData=function(r){this.checkOffset(r);var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./DataReader":18}],21:[function(n,t,e){"use strict";var i=n("./ArrayReader");function s(r){i.call(this,r)}n("../utils").inherits(s,i),s.prototype.readData=function(r){if(this.checkOffset(r),r===0)return new Uint8Array(0);var a=this.data.subarray(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./ArrayReader":17}],22:[function(n,t,e){"use strict";var i=n("../utils"),s=n("../support"),r=n("./ArrayReader"),a=n("./StringReader"),o=n("./NodeBufferReader"),c=n("./Uint8ArrayReader");t.exports=function(l){var h=i.getTypeOf(l);return i.checkSupport(h),h!=="string"||s.uint8array?h==="nodebuffer"?new o(l):s.uint8array?new c(i.transformTo("uint8array",l)):new r(i.transformTo("array",l)):new a(l)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(n,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(n,t,e){"use strict";var i=n("./GenericWorker"),s=n("../utils");function r(a){i.call(this,"ConvertWorker to "+a),this.destType=a}s.inherits(r,i),r.prototype.processChunk=function(a){this.push({data:s.transformTo(this.destType,a.data),meta:a.meta})},t.exports=r},{"../utils":32,"./GenericWorker":28}],25:[function(n,t,e){"use strict";var i=n("./GenericWorker"),s=n("../crc32");function r(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}n("../utils").inherits(r,i),r.prototype.processChunk=function(a){this.streamInfo.crc32=s(a.data,this.streamInfo.crc32||0),this.push(a)},t.exports=r},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(n,t,e){"use strict";var i=n("../utils"),s=n("./GenericWorker");function r(a){s.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}i.inherits(r,s),r.prototype.processChunk=function(a){if(a){var o=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=o+a.data.length}s.prototype.processChunk.call(this,a)},t.exports=r},{"../utils":32,"./GenericWorker":28}],27:[function(n,t,e){"use strict";var i=n("../utils"),s=n("./GenericWorker");function r(a){s.call(this,"DataWorker");var o=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(c){o.dataIsReady=!0,o.data=c,o.max=c&&c.length||0,o.type=i.getTypeOf(c),o.isPaused||o._tickAndRepeat()},function(c){o.error(c)})}i.inherits(r,s),r.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=null,o=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":a=this.data.substring(this.index,o);break;case"uint8array":a=this.data.subarray(this.index,o);break;case"array":case"nodebuffer":a=this.data.slice(this.index,o)}return this.index=o,this.push({data:a,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=r},{"../utils":32,"./GenericWorker":28}],28:[function(n,t,e){"use strict";function i(s){this.name=s||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(s){this.emit("data",s)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(s){this.emit("error",s)}return!0},error:function(s){return!this.isFinished&&(this.isPaused?this.generatedError=s:(this.isFinished=!0,this.emit("error",s),this.previous&&this.previous.error(s),this.cleanUp()),!0)},on:function(s,r){return this._listeners[s].push(r),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(s,r){if(this._listeners[s])for(var a=0;a<this._listeners[s].length;a++)this._listeners[s][a].call(this,r)},pipe:function(s){return s.registerPrevious(this)},registerPrevious:function(s){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=s.streamInfo,this.mergeStreamInfo(),this.previous=s;var r=this;return s.on("data",function(a){r.processChunk(a)}),s.on("end",function(){r.end()}),s.on("error",function(a){r.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var s=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),s=!0),this.previous&&this.previous.resume(),!s},flush:function(){},processChunk:function(s){this.push(s)},withStreamInfo:function(s,r){return this.extraStreamInfo[s]=r,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var s in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,s)&&(this.streamInfo[s]=this.extraStreamInfo[s])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var s="Worker "+this.name;return this.previous?this.previous+" -> "+s:s}},t.exports=i},{}],29:[function(n,t,e){"use strict";var i=n("../utils"),s=n("./ConvertWorker"),r=n("./GenericWorker"),a=n("../base64"),o=n("../support"),c=n("../external"),l=null;if(o.nodestream)try{l=n("../nodejs/NodejsStreamOutputAdapter")}catch{}function h(f,d){return new c.Promise(function(g,_){var p=[],m=f._internalType,S=f._outputType,x=f._mimeType;f.on("data",function(T,I){p.push(T),d&&d(I)}).on("error",function(T){p=[],_(T)}).on("end",function(){try{var T=function(I,L,R){switch(I){case"blob":return i.newBlob(i.transformTo("arraybuffer",L),R);case"base64":return a.encode(L);default:return i.transformTo(I,L)}}(S,function(I,L){var R,j=0,C=null,M=0;for(R=0;R<L.length;R++)M+=L[R].length;switch(I){case"string":return L.join("");case"array":return Array.prototype.concat.apply([],L);case"uint8array":for(C=new Uint8Array(M),R=0;R<L.length;R++)C.set(L[R],j),j+=L[R].length;return C;case"nodebuffer":return Buffer.concat(L);default:throw new Error("concat : unsupported type '"+I+"'")}}(m,p),x);g(T)}catch(I){_(I)}p=[]}).resume()})}function u(f,d,g){var _=d;switch(d){case"blob":case"arraybuffer":_="uint8array";break;case"base64":_="string"}try{this._internalType=_,this._outputType=d,this._mimeType=g,i.checkSupport(_),this._worker=f.pipe(new s(_)),f.lock()}catch(p){this._worker=new r("error"),this._worker.error(p)}}u.prototype={accumulate:function(f){return h(this,f)},on:function(f,d){var g=this;return f==="data"?this._worker.on(f,function(_){d.call(g,_.data,_.meta)}):this._worker.on(f,function(){i.delay(d,arguments,g)}),this},resume:function(){return i.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(f){if(i.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new l(this,{objectMode:this._outputType!=="nodebuffer"},f)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(n,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var i=new ArrayBuffer(0);try{e.blob=new Blob([i],{type:"application/zip"}).size===0}catch{try{var s=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);s.append(i),e.blob=s.getBlob("application/zip").size===0}catch{e.blob=!1}}}try{e.nodestream=!!n("readable-stream").Readable}catch{e.nodestream=!1}},{"readable-stream":16}],31:[function(n,t,e){"use strict";for(var i=n("./utils"),s=n("./support"),r=n("./nodejsUtils"),a=n("./stream/GenericWorker"),o=new Array(256),c=0;c<256;c++)o[c]=252<=c?6:248<=c?5:240<=c?4:224<=c?3:192<=c?2:1;o[254]=o[254]=1;function l(){a.call(this,"utf-8 decode"),this.leftOver=null}function h(){a.call(this,"utf-8 encode")}e.utf8encode=function(u){return s.nodebuffer?r.newBufferFrom(u,"utf-8"):function(f){var d,g,_,p,m,S=f.length,x=0;for(p=0;p<S;p++)(64512&(g=f.charCodeAt(p)))==55296&&p+1<S&&(64512&(_=f.charCodeAt(p+1)))==56320&&(g=65536+(g-55296<<10)+(_-56320),p++),x+=g<128?1:g<2048?2:g<65536?3:4;for(d=s.uint8array?new Uint8Array(x):new Array(x),p=m=0;m<x;p++)(64512&(g=f.charCodeAt(p)))==55296&&p+1<S&&(64512&(_=f.charCodeAt(p+1)))==56320&&(g=65536+(g-55296<<10)+(_-56320),p++),g<128?d[m++]=g:(g<2048?d[m++]=192|g>>>6:(g<65536?d[m++]=224|g>>>12:(d[m++]=240|g>>>18,d[m++]=128|g>>>12&63),d[m++]=128|g>>>6&63),d[m++]=128|63&g);return d}(u)},e.utf8decode=function(u){return s.nodebuffer?i.transformTo("nodebuffer",u).toString("utf-8"):function(f){var d,g,_,p,m=f.length,S=new Array(2*m);for(d=g=0;d<m;)if((_=f[d++])<128)S[g++]=_;else if(4<(p=o[_]))S[g++]=65533,d+=p-1;else{for(_&=p===2?31:p===3?15:7;1<p&&d<m;)_=_<<6|63&f[d++],p--;1<p?S[g++]=65533:_<65536?S[g++]=_:(_-=65536,S[g++]=55296|_>>10&1023,S[g++]=56320|1023&_)}return S.length!==g&&(S.subarray?S=S.subarray(0,g):S.length=g),i.applyFromCharCode(S)}(u=i.transformTo(s.uint8array?"uint8array":"array",u))},i.inherits(l,a),l.prototype.processChunk=function(u){var f=i.transformTo(s.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(s.uint8array){var d=f;(f=new Uint8Array(d.length+this.leftOver.length)).set(this.leftOver,0),f.set(d,this.leftOver.length)}else f=this.leftOver.concat(f);this.leftOver=null}var g=function(p,m){var S;for((m=m||p.length)>p.length&&(m=p.length),S=m-1;0<=S&&(192&p[S])==128;)S--;return S<0||S===0?m:S+o[p[S]]>m?S:m}(f),_=f;g!==f.length&&(s.uint8array?(_=f.subarray(0,g),this.leftOver=f.subarray(g,f.length)):(_=f.slice(0,g),this.leftOver=f.slice(g,f.length))),this.push({data:e.utf8decode(_),meta:u.meta})},l.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=l,i.inherits(h,a),h.prototype.processChunk=function(u){this.push({data:e.utf8encode(u.data),meta:u.meta})},e.Utf8EncodeWorker=h},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(n,t,e){"use strict";var i=n("./support"),s=n("./base64"),r=n("./nodejsUtils"),a=n("./external");function o(d){return d}function c(d,g){for(var _=0;_<d.length;++_)g[_]=255&d.charCodeAt(_);return g}n("setimmediate"),e.newBlob=function(d,g){e.checkSupport("blob");try{return new Blob([d],{type:g})}catch{try{var _=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return _.append(d),_.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var l={stringifyByChunk:function(d,g,_){var p=[],m=0,S=d.length;if(S<=_)return String.fromCharCode.apply(null,d);for(;m<S;)g==="array"||g==="nodebuffer"?p.push(String.fromCharCode.apply(null,d.slice(m,Math.min(m+_,S)))):p.push(String.fromCharCode.apply(null,d.subarray(m,Math.min(m+_,S)))),m+=_;return p.join("")},stringifyByChar:function(d){for(var g="",_=0;_<d.length;_++)g+=String.fromCharCode(d[_]);return g},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return i.nodebuffer&&String.fromCharCode.apply(null,r.allocBuffer(1)).length===1}catch{return!1}}()}};function h(d){var g=65536,_=e.getTypeOf(d),p=!0;if(_==="uint8array"?p=l.applyCanBeUsed.uint8array:_==="nodebuffer"&&(p=l.applyCanBeUsed.nodebuffer),p)for(;1<g;)try{return l.stringifyByChunk(d,_,g)}catch{g=Math.floor(g/2)}return l.stringifyByChar(d)}function u(d,g){for(var _=0;_<d.length;_++)g[_]=d[_];return g}e.applyFromCharCode=h;var f={};f.string={string:o,array:function(d){return c(d,new Array(d.length))},arraybuffer:function(d){return f.string.uint8array(d).buffer},uint8array:function(d){return c(d,new Uint8Array(d.length))},nodebuffer:function(d){return c(d,r.allocBuffer(d.length))}},f.array={string:h,array:o,arraybuffer:function(d){return new Uint8Array(d).buffer},uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return r.newBufferFrom(d)}},f.arraybuffer={string:function(d){return h(new Uint8Array(d))},array:function(d){return u(new Uint8Array(d),new Array(d.byteLength))},arraybuffer:o,uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return r.newBufferFrom(new Uint8Array(d))}},f.uint8array={string:h,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return d.buffer},uint8array:o,nodebuffer:function(d){return r.newBufferFrom(d)}},f.nodebuffer={string:h,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return f.nodebuffer.uint8array(d).buffer},uint8array:function(d){return u(d,new Uint8Array(d.length))},nodebuffer:o},e.transformTo=function(d,g){if(g=g||"",!d)return g;e.checkSupport(d);var _=e.getTypeOf(g);return f[_][d](g)},e.resolve=function(d){for(var g=d.split("/"),_=[],p=0;p<g.length;p++){var m=g[p];m==="."||m===""&&p!==0&&p!==g.length-1||(m===".."?_.pop():_.push(m))}return _.join("/")},e.getTypeOf=function(d){return typeof d=="string"?"string":Object.prototype.toString.call(d)==="[object Array]"?"array":i.nodebuffer&&r.isBuffer(d)?"nodebuffer":i.uint8array&&d instanceof Uint8Array?"uint8array":i.arraybuffer&&d instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(d){if(!i[d.toLowerCase()])throw new Error(d+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(d){var g,_,p="";for(_=0;_<(d||"").length;_++)p+="\\x"+((g=d.charCodeAt(_))<16?"0":"")+g.toString(16).toUpperCase();return p},e.delay=function(d,g,_){setImmediate(function(){d.apply(_||null,g||[])})},e.inherits=function(d,g){function _(){}_.prototype=g.prototype,d.prototype=new _},e.extend=function(){var d,g,_={};for(d=0;d<arguments.length;d++)for(g in arguments[d])Object.prototype.hasOwnProperty.call(arguments[d],g)&&_[g]===void 0&&(_[g]=arguments[d][g]);return _},e.prepareContent=function(d,g,_,p,m){return a.Promise.resolve(g).then(function(S){return i.blob&&(S instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(S))!==-1)&&typeof FileReader<"u"?new a.Promise(function(x,T){var I=new FileReader;I.onload=function(L){x(L.target.result)},I.onerror=function(L){T(L.target.error)},I.readAsArrayBuffer(S)}):S}).then(function(S){var x=e.getTypeOf(S);return x?(x==="arraybuffer"?S=e.transformTo("uint8array",S):x==="string"&&(m?S=s.decode(S):_&&p!==!0&&(S=function(T){return c(T,i.uint8array?new Uint8Array(T.length):new Array(T.length))}(S))),S):a.Promise.reject(new Error("Can't read the data of '"+d+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(n,t,e){"use strict";var i=n("./reader/readerFor"),s=n("./utils"),r=n("./signature"),a=n("./zipEntry"),o=n("./support");function c(l){this.files=[],this.loadOptions=l}c.prototype={checkSignature:function(l){if(!this.reader.readAndCheckSignature(l)){this.reader.index-=4;var h=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+s.pretty(h)+", expected "+s.pretty(l)+")")}},isSignature:function(l,h){var u=this.reader.index;this.reader.setIndex(l);var f=this.reader.readString(4)===h;return this.reader.setIndex(u),f},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var l=this.reader.readData(this.zipCommentLength),h=o.uint8array?"uint8array":"array",u=s.transformTo(h,l);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var l,h,u,f=this.zip64EndOfCentralSize-44;0<f;)l=this.reader.readInt(2),h=this.reader.readInt(4),u=this.reader.readData(h),this.zip64ExtensibleData[l]={id:l,length:h,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var l,h;for(l=0;l<this.files.length;l++)h=this.files[l],this.reader.setIndex(h.localHeaderOffset),this.checkSignature(r.LOCAL_FILE_HEADER),h.readLocalPart(this.reader),h.handleUTF8(),h.processAttributes()},readCentralDir:function(){var l;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)(l=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(l);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var l=this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);if(l<0)throw this.isSignature(0,r.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(l);var h=l;if(this.checkSignature(r.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===s.MAX_VALUE_16BITS||this.diskWithCentralDirStart===s.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===s.MAX_VALUE_16BITS||this.centralDirRecords===s.MAX_VALUE_16BITS||this.centralDirSize===s.MAX_VALUE_32BITS||this.centralDirOffset===s.MAX_VALUE_32BITS){if(this.zip64=!0,(l=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(l),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,r.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var f=h-u;if(0<f)this.isSignature(h,r.CENTRAL_FILE_HEADER)||(this.reader.zero=f);else if(f<0)throw new Error("Corrupted zip: missing "+Math.abs(f)+" bytes.")},prepareReader:function(l){this.reader=i(l)},load:function(l){this.prepareReader(l),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=c},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(n,t,e){"use strict";var i=n("./reader/readerFor"),s=n("./utils"),r=n("./compressedObject"),a=n("./crc32"),o=n("./utf8"),c=n("./compressions"),l=n("./support");function h(u,f){this.options=u,this.loadOptions=f}h.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var f,d;if(u.skip(22),this.fileNameLength=u.readInt(2),d=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(d),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((f=function(g){for(var _ in c)if(Object.prototype.hasOwnProperty.call(c,_)&&c[_].magic===g)return c[_];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new r(this.compressedSize,this.uncompressedSize,this.crc32,f,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var f=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(f),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var f,d,g,_=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<_;)f=u.readInt(2),d=u.readInt(2),g=u.readData(d),this.extraFields[f]={id:f,length:d,value:g};u.setIndex(_)},handleUTF8:function(){var u=l.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var f=this.findExtraFieldUnicodePath();if(f!==null)this.fileNameStr=f;else{var d=s.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(d)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var _=s.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(_)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var f=i(u.value);return f.readInt(1)!==1||a(this.fileName)!==f.readInt(4)?null:o.utf8decode(f.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var f=i(u.value);return f.readInt(1)!==1||a(this.fileComment)!==f.readInt(4)?null:o.utf8decode(f.readData(u.length-5))}return null}},t.exports=h},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(n,t,e){"use strict";function i(f,d,g){this.name=f,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=d,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var s=n("./stream/StreamHelper"),r=n("./stream/DataWorker"),a=n("./utf8"),o=n("./compressedObject"),c=n("./stream/GenericWorker");i.prototype={internalStream:function(f){var d=null,g="string";try{if(!f)throw new Error("No output type specified.");var _=(g=f.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),d=this._decompressWorker();var p=!this._dataBinary;p&&!_&&(d=d.pipe(new a.Utf8EncodeWorker)),!p&&_&&(d=d.pipe(new a.Utf8DecodeWorker))}catch(m){(d=new c("error")).error(m)}return new s(d,g,"")},async:function(f,d){return this.internalStream(f).accumulate(d)},nodeStream:function(f,d){return this.internalStream(f||"nodebuffer").toNodejsStream(d)},_compressWorker:function(f,d){if(this._data instanceof o&&this._data.compression.magic===f.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(g,f,d)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof c?this._data:new r(this._data)}};for(var l=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],h=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<l.length;u++)i.prototype[l[u]]=h;t.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(n,t,e){(function(i){"use strict";var s,r,a=i.MutationObserver||i.WebKitMutationObserver;if(a){var o=0,c=new a(f),l=i.document.createTextNode("");c.observe(l,{characterData:!0}),s=function(){l.data=o=++o%2}}else if(i.setImmediate||i.MessageChannel===void 0)s="document"in i&&"onreadystatechange"in i.document.createElement("script")?function(){var d=i.document.createElement("script");d.onreadystatechange=function(){f(),d.onreadystatechange=null,d.parentNode.removeChild(d),d=null},i.document.documentElement.appendChild(d)}:function(){setTimeout(f,0)};else{var h=new i.MessageChannel;h.port1.onmessage=f,s=function(){h.port2.postMessage(0)}}var u=[];function f(){var d,g;r=!0;for(var _=u.length;_;){for(g=u,u=[],d=-1;++d<_;)g[d]();_=u.length}r=!1}t.exports=function(d){u.push(d)!==1||r||s()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(n,t,e){"use strict";var i=n("immediate");function s(){}var r={},a=["REJECTED"],o=["FULFILLED"],c=["PENDING"];function l(_){if(typeof _!="function")throw new TypeError("resolver must be a function");this.state=c,this.queue=[],this.outcome=void 0,_!==s&&d(this,_)}function h(_,p,m){this.promise=_,typeof p=="function"&&(this.onFulfilled=p,this.callFulfilled=this.otherCallFulfilled),typeof m=="function"&&(this.onRejected=m,this.callRejected=this.otherCallRejected)}function u(_,p,m){i(function(){var S;try{S=p(m)}catch(x){return r.reject(_,x)}S===_?r.reject(_,new TypeError("Cannot resolve promise with itself")):r.resolve(_,S)})}function f(_){var p=_&&_.then;if(_&&(typeof _=="object"||typeof _=="function")&&typeof p=="function")return function(){p.apply(_,arguments)}}function d(_,p){var m=!1;function S(I){m||(m=!0,r.reject(_,I))}function x(I){m||(m=!0,r.resolve(_,I))}var T=g(function(){p(x,S)});T.status==="error"&&S(T.value)}function g(_,p){var m={};try{m.value=_(p),m.status="success"}catch(S){m.status="error",m.value=S}return m}(t.exports=l).prototype.finally=function(_){if(typeof _!="function")return this;var p=this.constructor;return this.then(function(m){return p.resolve(_()).then(function(){return m})},function(m){return p.resolve(_()).then(function(){throw m})})},l.prototype.catch=function(_){return this.then(null,_)},l.prototype.then=function(_,p){if(typeof _!="function"&&this.state===o||typeof p!="function"&&this.state===a)return this;var m=new this.constructor(s);return this.state!==c?u(m,this.state===o?_:p,this.outcome):this.queue.push(new h(m,_,p)),m},h.prototype.callFulfilled=function(_){r.resolve(this.promise,_)},h.prototype.otherCallFulfilled=function(_){u(this.promise,this.onFulfilled,_)},h.prototype.callRejected=function(_){r.reject(this.promise,_)},h.prototype.otherCallRejected=function(_){u(this.promise,this.onRejected,_)},r.resolve=function(_,p){var m=g(f,p);if(m.status==="error")return r.reject(_,m.value);var S=m.value;if(S)d(_,S);else{_.state=o,_.outcome=p;for(var x=-1,T=_.queue.length;++x<T;)_.queue[x].callFulfilled(p)}return _},r.reject=function(_,p){_.state=a,_.outcome=p;for(var m=-1,S=_.queue.length;++m<S;)_.queue[m].callRejected(p);return _},l.resolve=function(_){return _ instanceof this?_:r.resolve(new this(s),_)},l.reject=function(_){var p=new this(s);return r.reject(p,_)},l.all=function(_){var p=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var m=_.length,S=!1;if(!m)return this.resolve([]);for(var x=new Array(m),T=0,I=-1,L=new this(s);++I<m;)R(_[I],I);return L;function R(j,C){p.resolve(j).then(function(M){x[C]=M,++T!==m||S||(S=!0,r.resolve(L,x))},function(M){S||(S=!0,r.reject(L,M))})}},l.race=function(_){var p=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var m=_.length,S=!1;if(!m)return this.resolve([]);for(var x=-1,T=new this(s);++x<m;)I=_[x],p.resolve(I).then(function(L){S||(S=!0,r.resolve(T,L))},function(L){S||(S=!0,r.reject(T,L))});var I;return T}},{immediate:36}],38:[function(n,t,e){"use strict";var i={};(0,n("./lib/utils/common").assign)(i,n("./lib/deflate"),n("./lib/inflate"),n("./lib/zlib/constants")),t.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(n,t,e){"use strict";var i=n("./zlib/deflate"),s=n("./utils/common"),r=n("./utils/strings"),a=n("./zlib/messages"),o=n("./zlib/zstream"),c=Object.prototype.toString,l=0,h=-1,u=0,f=8;function d(_){if(!(this instanceof d))return new d(_);this.options=s.assign({level:h,method:f,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},_||{});var p=this.options;p.raw&&0<p.windowBits?p.windowBits=-p.windowBits:p.gzip&&0<p.windowBits&&p.windowBits<16&&(p.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new o,this.strm.avail_out=0;var m=i.deflateInit2(this.strm,p.level,p.method,p.windowBits,p.memLevel,p.strategy);if(m!==l)throw new Error(a[m]);if(p.header&&i.deflateSetHeader(this.strm,p.header),p.dictionary){var S;if(S=typeof p.dictionary=="string"?r.string2buf(p.dictionary):c.call(p.dictionary)==="[object ArrayBuffer]"?new Uint8Array(p.dictionary):p.dictionary,(m=i.deflateSetDictionary(this.strm,S))!==l)throw new Error(a[m]);this._dict_set=!0}}function g(_,p){var m=new d(p);if(m.push(_,!0),m.err)throw m.msg||a[m.err];return m.result}d.prototype.push=function(_,p){var m,S,x=this.strm,T=this.options.chunkSize;if(this.ended)return!1;S=p===~~p?p:p===!0?4:0,typeof _=="string"?x.input=r.string2buf(_):c.call(_)==="[object ArrayBuffer]"?x.input=new Uint8Array(_):x.input=_,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new s.Buf8(T),x.next_out=0,x.avail_out=T),(m=i.deflate(x,S))!==1&&m!==l)return this.onEnd(m),!(this.ended=!0);x.avail_out!==0&&(x.avail_in!==0||S!==4&&S!==2)||(this.options.to==="string"?this.onData(r.buf2binstring(s.shrinkBuf(x.output,x.next_out))):this.onData(s.shrinkBuf(x.output,x.next_out)))}while((0<x.avail_in||x.avail_out===0)&&m!==1);return S===4?(m=i.deflateEnd(this.strm),this.onEnd(m),this.ended=!0,m===l):S!==2||(this.onEnd(l),!(x.avail_out=0))},d.prototype.onData=function(_){this.chunks.push(_)},d.prototype.onEnd=function(_){_===l&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=_,this.msg=this.strm.msg},e.Deflate=d,e.deflate=g,e.deflateRaw=function(_,p){return(p=p||{}).raw=!0,g(_,p)},e.gzip=function(_,p){return(p=p||{}).gzip=!0,g(_,p)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(n,t,e){"use strict";var i=n("./zlib/inflate"),s=n("./utils/common"),r=n("./utils/strings"),a=n("./zlib/constants"),o=n("./zlib/messages"),c=n("./zlib/zstream"),l=n("./zlib/gzheader"),h=Object.prototype.toString;function u(d){if(!(this instanceof u))return new u(d);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},d||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||d&&d.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new c,this.strm.avail_out=0;var _=i.inflateInit2(this.strm,g.windowBits);if(_!==a.Z_OK)throw new Error(o[_]);this.header=new l,i.inflateGetHeader(this.strm,this.header)}function f(d,g){var _=new u(g);if(_.push(d,!0),_.err)throw _.msg||o[_.err];return _.result}u.prototype.push=function(d,g){var _,p,m,S,x,T,I=this.strm,L=this.options.chunkSize,R=this.options.dictionary,j=!1;if(this.ended)return!1;p=g===~~g?g:g===!0?a.Z_FINISH:a.Z_NO_FLUSH,typeof d=="string"?I.input=r.binstring2buf(d):h.call(d)==="[object ArrayBuffer]"?I.input=new Uint8Array(d):I.input=d,I.next_in=0,I.avail_in=I.input.length;do{if(I.avail_out===0&&(I.output=new s.Buf8(L),I.next_out=0,I.avail_out=L),(_=i.inflate(I,a.Z_NO_FLUSH))===a.Z_NEED_DICT&&R&&(T=typeof R=="string"?r.string2buf(R):h.call(R)==="[object ArrayBuffer]"?new Uint8Array(R):R,_=i.inflateSetDictionary(this.strm,T)),_===a.Z_BUF_ERROR&&j===!0&&(_=a.Z_OK,j=!1),_!==a.Z_STREAM_END&&_!==a.Z_OK)return this.onEnd(_),!(this.ended=!0);I.next_out&&(I.avail_out!==0&&_!==a.Z_STREAM_END&&(I.avail_in!==0||p!==a.Z_FINISH&&p!==a.Z_SYNC_FLUSH)||(this.options.to==="string"?(m=r.utf8border(I.output,I.next_out),S=I.next_out-m,x=r.buf2string(I.output,m),I.next_out=S,I.avail_out=L-S,S&&s.arraySet(I.output,I.output,m,S,0),this.onData(x)):this.onData(s.shrinkBuf(I.output,I.next_out)))),I.avail_in===0&&I.avail_out===0&&(j=!0)}while((0<I.avail_in||I.avail_out===0)&&_!==a.Z_STREAM_END);return _===a.Z_STREAM_END&&(p=a.Z_FINISH),p===a.Z_FINISH?(_=i.inflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===a.Z_OK):p!==a.Z_SYNC_FLUSH||(this.onEnd(a.Z_OK),!(I.avail_out=0))},u.prototype.onData=function(d){this.chunks.push(d)},u.prototype.onEnd=function(d){d===a.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=d,this.msg=this.strm.msg},e.Inflate=u,e.inflate=f,e.inflateRaw=function(d,g){return(g=g||{}).raw=!0,f(d,g)},e.ungzip=f},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(n,t,e){"use strict";var i=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(a){for(var o=Array.prototype.slice.call(arguments,1);o.length;){var c=o.shift();if(c){if(typeof c!="object")throw new TypeError(c+"must be non-object");for(var l in c)c.hasOwnProperty(l)&&(a[l]=c[l])}}return a},e.shrinkBuf=function(a,o){return a.length===o?a:a.subarray?a.subarray(0,o):(a.length=o,a)};var s={arraySet:function(a,o,c,l,h){if(o.subarray&&a.subarray)a.set(o.subarray(c,c+l),h);else for(var u=0;u<l;u++)a[h+u]=o[c+u]},flattenChunks:function(a){var o,c,l,h,u,f;for(o=l=0,c=a.length;o<c;o++)l+=a[o].length;for(f=new Uint8Array(l),o=h=0,c=a.length;o<c;o++)u=a[o],f.set(u,h),h+=u.length;return f}},r={arraySet:function(a,o,c,l,h){for(var u=0;u<l;u++)a[h+u]=o[c+u]},flattenChunks:function(a){return[].concat.apply([],a)}};e.setTyped=function(a){a?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,s)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,r))},e.setTyped(i)},{}],42:[function(n,t,e){"use strict";var i=n("./common"),s=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch{s=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{r=!1}for(var a=new i.Buf8(256),o=0;o<256;o++)a[o]=252<=o?6:248<=o?5:240<=o?4:224<=o?3:192<=o?2:1;function c(l,h){if(h<65537&&(l.subarray&&r||!l.subarray&&s))return String.fromCharCode.apply(null,i.shrinkBuf(l,h));for(var u="",f=0;f<h;f++)u+=String.fromCharCode(l[f]);return u}a[254]=a[254]=1,e.string2buf=function(l){var h,u,f,d,g,_=l.length,p=0;for(d=0;d<_;d++)(64512&(u=l.charCodeAt(d)))==55296&&d+1<_&&(64512&(f=l.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),d++),p+=u<128?1:u<2048?2:u<65536?3:4;for(h=new i.Buf8(p),d=g=0;g<p;d++)(64512&(u=l.charCodeAt(d)))==55296&&d+1<_&&(64512&(f=l.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(f-56320),d++),u<128?h[g++]=u:(u<2048?h[g++]=192|u>>>6:(u<65536?h[g++]=224|u>>>12:(h[g++]=240|u>>>18,h[g++]=128|u>>>12&63),h[g++]=128|u>>>6&63),h[g++]=128|63&u);return h},e.buf2binstring=function(l){return c(l,l.length)},e.binstring2buf=function(l){for(var h=new i.Buf8(l.length),u=0,f=h.length;u<f;u++)h[u]=l.charCodeAt(u);return h},e.buf2string=function(l,h){var u,f,d,g,_=h||l.length,p=new Array(2*_);for(u=f=0;u<_;)if((d=l[u++])<128)p[f++]=d;else if(4<(g=a[d]))p[f++]=65533,u+=g-1;else{for(d&=g===2?31:g===3?15:7;1<g&&u<_;)d=d<<6|63&l[u++],g--;1<g?p[f++]=65533:d<65536?p[f++]=d:(d-=65536,p[f++]=55296|d>>10&1023,p[f++]=56320|1023&d)}return c(p,f)},e.utf8border=function(l,h){var u;for((h=h||l.length)>l.length&&(h=l.length),u=h-1;0<=u&&(192&l[u])==128;)u--;return u<0||u===0?h:u+a[l[u]]>h?u:h}},{"./common":41}],43:[function(n,t,e){"use strict";t.exports=function(i,s,r,a){for(var o=65535&i|0,c=i>>>16&65535|0,l=0;r!==0;){for(r-=l=2e3<r?2e3:r;c=c+(o=o+s[a++]|0)|0,--l;);o%=65521,c%=65521}return o|c<<16|0}},{}],44:[function(n,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(n,t,e){"use strict";var i=function(){for(var s,r=[],a=0;a<256;a++){s=a;for(var o=0;o<8;o++)s=1&s?3988292384^s>>>1:s>>>1;r[a]=s}return r}();t.exports=function(s,r,a,o){var c=i,l=o+a;s^=-1;for(var h=o;h<l;h++)s=s>>>8^c[255&(s^r[h])];return-1^s}},{}],46:[function(n,t,e){"use strict";var i,s=n("../utils/common"),r=n("./trees"),a=n("./adler32"),o=n("./crc32"),c=n("./messages"),l=0,h=4,u=0,f=-2,d=-1,g=4,_=2,p=8,m=9,S=286,x=30,T=19,I=2*S+1,L=15,R=3,j=258,C=j+R+1,M=42,N=113,b=1,Z=2,V=3,U=4;function nt(v,J){return v.msg=c[J],J}function K(v){return(v<<1)-(4<v?9:0)}function rt(v){for(var J=v.length;0<=--J;)v[J]=0}function k(v){var J=v.state,F=J.pending;F>v.avail_out&&(F=v.avail_out),F!==0&&(s.arraySet(v.output,J.pending_buf,J.pending_out,F,v.next_out),v.next_out+=F,J.pending_out+=F,v.total_out+=F,v.avail_out-=F,J.pending-=F,J.pending===0&&(J.pending_out=0))}function H(v,J){r._tr_flush_block(v,0<=v.block_start?v.block_start:-1,v.strstart-v.block_start,J),v.block_start=v.strstart,k(v.strm)}function ct(v,J){v.pending_buf[v.pending++]=J}function lt(v,J){v.pending_buf[v.pending++]=J>>>8&255,v.pending_buf[v.pending++]=255&J}function G(v,J){var F,P,w=v.max_chain_length,W=v.strstart,tt=v.prev_length,E=v.nice_match,y=v.strstart>v.w_size-C?v.strstart-(v.w_size-C):0,z=v.window,st=v.w_mask,Q=v.prev,ot=v.strstart+j,Et=z[W+tt-1],pt=z[W+tt];v.prev_length>=v.good_match&&(w>>=2),E>v.lookahead&&(E=v.lookahead);do if(z[(F=J)+tt]===pt&&z[F+tt-1]===Et&&z[F]===z[W]&&z[++F]===z[W+1]){W+=2,F++;do;while(z[++W]===z[++F]&&z[++W]===z[++F]&&z[++W]===z[++F]&&z[++W]===z[++F]&&z[++W]===z[++F]&&z[++W]===z[++F]&&z[++W]===z[++F]&&z[++W]===z[++F]&&W<ot);if(P=j-(ot-W),W=ot-j,tt<P){if(v.match_start=J,E<=(tt=P))break;Et=z[W+tt-1],pt=z[W+tt]}}while((J=Q[J&st])>y&&--w!=0);return tt<=v.lookahead?tt:v.lookahead}function dt(v){var J,F,P,w,W,tt,E,y,z,st,Q=v.w_size;do{if(w=v.window_size-v.lookahead-v.strstart,v.strstart>=Q+(Q-C)){for(s.arraySet(v.window,v.window,Q,Q,0),v.match_start-=Q,v.strstart-=Q,v.block_start-=Q,J=F=v.hash_size;P=v.head[--J],v.head[J]=Q<=P?P-Q:0,--F;);for(J=F=Q;P=v.prev[--J],v.prev[J]=Q<=P?P-Q:0,--F;);w+=Q}if(v.strm.avail_in===0)break;if(tt=v.strm,E=v.window,y=v.strstart+v.lookahead,z=w,st=void 0,st=tt.avail_in,z<st&&(st=z),F=st===0?0:(tt.avail_in-=st,s.arraySet(E,tt.input,tt.next_in,st,y),tt.state.wrap===1?tt.adler=a(tt.adler,E,st,y):tt.state.wrap===2&&(tt.adler=o(tt.adler,E,st,y)),tt.next_in+=st,tt.total_in+=st,st),v.lookahead+=F,v.lookahead+v.insert>=R)for(W=v.strstart-v.insert,v.ins_h=v.window[W],v.ins_h=(v.ins_h<<v.hash_shift^v.window[W+1])&v.hash_mask;v.insert&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[W+R-1])&v.hash_mask,v.prev[W&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=W,W++,v.insert--,!(v.lookahead+v.insert<R)););}while(v.lookahead<C&&v.strm.avail_in!==0)}function yt(v,J){for(var F,P;;){if(v.lookahead<C){if(dt(v),v.lookahead<C&&J===l)return b;if(v.lookahead===0)break}if(F=0,v.lookahead>=R&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+R-1])&v.hash_mask,F=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart),F!==0&&v.strstart-F<=v.w_size-C&&(v.match_length=G(v,F)),v.match_length>=R)if(P=r._tr_tally(v,v.strstart-v.match_start,v.match_length-R),v.lookahead-=v.match_length,v.match_length<=v.max_lazy_match&&v.lookahead>=R){for(v.match_length--;v.strstart++,v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+R-1])&v.hash_mask,F=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart,--v.match_length!=0;);v.strstart++}else v.strstart+=v.match_length,v.match_length=0,v.ins_h=v.window[v.strstart],v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+1])&v.hash_mask;else P=r._tr_tally(v,0,v.window[v.strstart]),v.lookahead--,v.strstart++;if(P&&(H(v,!1),v.strm.avail_out===0))return b}return v.insert=v.strstart<R-1?v.strstart:R-1,J===h?(H(v,!0),v.strm.avail_out===0?V:U):v.last_lit&&(H(v,!1),v.strm.avail_out===0)?b:Z}function xt(v,J){for(var F,P,w;;){if(v.lookahead<C){if(dt(v),v.lookahead<C&&J===l)return b;if(v.lookahead===0)break}if(F=0,v.lookahead>=R&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+R-1])&v.hash_mask,F=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart),v.prev_length=v.match_length,v.prev_match=v.match_start,v.match_length=R-1,F!==0&&v.prev_length<v.max_lazy_match&&v.strstart-F<=v.w_size-C&&(v.match_length=G(v,F),v.match_length<=5&&(v.strategy===1||v.match_length===R&&4096<v.strstart-v.match_start)&&(v.match_length=R-1)),v.prev_length>=R&&v.match_length<=v.prev_length){for(w=v.strstart+v.lookahead-R,P=r._tr_tally(v,v.strstart-1-v.prev_match,v.prev_length-R),v.lookahead-=v.prev_length-1,v.prev_length-=2;++v.strstart<=w&&(v.ins_h=(v.ins_h<<v.hash_shift^v.window[v.strstart+R-1])&v.hash_mask,F=v.prev[v.strstart&v.w_mask]=v.head[v.ins_h],v.head[v.ins_h]=v.strstart),--v.prev_length!=0;);if(v.match_available=0,v.match_length=R-1,v.strstart++,P&&(H(v,!1),v.strm.avail_out===0))return b}else if(v.match_available){if((P=r._tr_tally(v,0,v.window[v.strstart-1]))&&H(v,!1),v.strstart++,v.lookahead--,v.strm.avail_out===0)return b}else v.match_available=1,v.strstart++,v.lookahead--}return v.match_available&&(P=r._tr_tally(v,0,v.window[v.strstart-1]),v.match_available=0),v.insert=v.strstart<R-1?v.strstart:R-1,J===h?(H(v,!0),v.strm.avail_out===0?V:U):v.last_lit&&(H(v,!1),v.strm.avail_out===0)?b:Z}function _t(v,J,F,P,w){this.good_length=v,this.max_lazy=J,this.nice_length=F,this.max_chain=P,this.func=w}function Lt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=p,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new s.Buf16(2*I),this.dyn_dtree=new s.Buf16(2*(2*x+1)),this.bl_tree=new s.Buf16(2*(2*T+1)),rt(this.dyn_ltree),rt(this.dyn_dtree),rt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new s.Buf16(L+1),this.heap=new s.Buf16(2*S+1),rt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new s.Buf16(2*S+1),rt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function Dt(v){var J;return v&&v.state?(v.total_in=v.total_out=0,v.data_type=_,(J=v.state).pending=0,J.pending_out=0,J.wrap<0&&(J.wrap=-J.wrap),J.status=J.wrap?M:N,v.adler=J.wrap===2?0:1,J.last_flush=l,r._tr_init(J),u):nt(v,f)}function Tt(v){var J=Dt(v);return J===u&&function(F){F.window_size=2*F.w_size,rt(F.head),F.max_lazy_match=i[F.level].max_lazy,F.good_match=i[F.level].good_length,F.nice_match=i[F.level].nice_length,F.max_chain_length=i[F.level].max_chain,F.strstart=0,F.block_start=0,F.lookahead=0,F.insert=0,F.match_length=F.prev_length=R-1,F.match_available=0,F.ins_h=0}(v.state),J}function Ut(v,J,F,P,w,W){if(!v)return f;var tt=1;if(J===d&&(J=6),P<0?(tt=0,P=-P):15<P&&(tt=2,P-=16),w<1||m<w||F!==p||P<8||15<P||J<0||9<J||W<0||g<W)return nt(v,f);P===8&&(P=9);var E=new Lt;return(v.state=E).strm=v,E.wrap=tt,E.gzhead=null,E.w_bits=P,E.w_size=1<<E.w_bits,E.w_mask=E.w_size-1,E.hash_bits=w+7,E.hash_size=1<<E.hash_bits,E.hash_mask=E.hash_size-1,E.hash_shift=~~((E.hash_bits+R-1)/R),E.window=new s.Buf8(2*E.w_size),E.head=new s.Buf16(E.hash_size),E.prev=new s.Buf16(E.w_size),E.lit_bufsize=1<<w+6,E.pending_buf_size=4*E.lit_bufsize,E.pending_buf=new s.Buf8(E.pending_buf_size),E.d_buf=1*E.lit_bufsize,E.l_buf=3*E.lit_bufsize,E.level=J,E.strategy=W,E.method=F,Tt(v)}i=[new _t(0,0,0,0,function(v,J){var F=65535;for(F>v.pending_buf_size-5&&(F=v.pending_buf_size-5);;){if(v.lookahead<=1){if(dt(v),v.lookahead===0&&J===l)return b;if(v.lookahead===0)break}v.strstart+=v.lookahead,v.lookahead=0;var P=v.block_start+F;if((v.strstart===0||v.strstart>=P)&&(v.lookahead=v.strstart-P,v.strstart=P,H(v,!1),v.strm.avail_out===0)||v.strstart-v.block_start>=v.w_size-C&&(H(v,!1),v.strm.avail_out===0))return b}return v.insert=0,J===h?(H(v,!0),v.strm.avail_out===0?V:U):(v.strstart>v.block_start&&(H(v,!1),v.strm.avail_out),b)}),new _t(4,4,8,4,yt),new _t(4,5,16,8,yt),new _t(4,6,32,32,yt),new _t(4,4,16,16,xt),new _t(8,16,32,32,xt),new _t(8,16,128,128,xt),new _t(8,32,128,256,xt),new _t(32,128,258,1024,xt),new _t(32,258,258,4096,xt)],e.deflateInit=function(v,J){return Ut(v,J,p,15,8,0)},e.deflateInit2=Ut,e.deflateReset=Tt,e.deflateResetKeep=Dt,e.deflateSetHeader=function(v,J){return v&&v.state?v.state.wrap!==2?f:(v.state.gzhead=J,u):f},e.deflate=function(v,J){var F,P,w,W;if(!v||!v.state||5<J||J<0)return v?nt(v,f):f;if(P=v.state,!v.output||!v.input&&v.avail_in!==0||P.status===666&&J!==h)return nt(v,v.avail_out===0?-5:f);if(P.strm=v,F=P.last_flush,P.last_flush=J,P.status===M)if(P.wrap===2)v.adler=0,ct(P,31),ct(P,139),ct(P,8),P.gzhead?(ct(P,(P.gzhead.text?1:0)+(P.gzhead.hcrc?2:0)+(P.gzhead.extra?4:0)+(P.gzhead.name?8:0)+(P.gzhead.comment?16:0)),ct(P,255&P.gzhead.time),ct(P,P.gzhead.time>>8&255),ct(P,P.gzhead.time>>16&255),ct(P,P.gzhead.time>>24&255),ct(P,P.level===9?2:2<=P.strategy||P.level<2?4:0),ct(P,255&P.gzhead.os),P.gzhead.extra&&P.gzhead.extra.length&&(ct(P,255&P.gzhead.extra.length),ct(P,P.gzhead.extra.length>>8&255)),P.gzhead.hcrc&&(v.adler=o(v.adler,P.pending_buf,P.pending,0)),P.gzindex=0,P.status=69):(ct(P,0),ct(P,0),ct(P,0),ct(P,0),ct(P,0),ct(P,P.level===9?2:2<=P.strategy||P.level<2?4:0),ct(P,3),P.status=N);else{var tt=p+(P.w_bits-8<<4)<<8;tt|=(2<=P.strategy||P.level<2?0:P.level<6?1:P.level===6?2:3)<<6,P.strstart!==0&&(tt|=32),tt+=31-tt%31,P.status=N,lt(P,tt),P.strstart!==0&&(lt(P,v.adler>>>16),lt(P,65535&v.adler)),v.adler=1}if(P.status===69)if(P.gzhead.extra){for(w=P.pending;P.gzindex<(65535&P.gzhead.extra.length)&&(P.pending!==P.pending_buf_size||(P.gzhead.hcrc&&P.pending>w&&(v.adler=o(v.adler,P.pending_buf,P.pending-w,w)),k(v),w=P.pending,P.pending!==P.pending_buf_size));)ct(P,255&P.gzhead.extra[P.gzindex]),P.gzindex++;P.gzhead.hcrc&&P.pending>w&&(v.adler=o(v.adler,P.pending_buf,P.pending-w,w)),P.gzindex===P.gzhead.extra.length&&(P.gzindex=0,P.status=73)}else P.status=73;if(P.status===73)if(P.gzhead.name){w=P.pending;do{if(P.pending===P.pending_buf_size&&(P.gzhead.hcrc&&P.pending>w&&(v.adler=o(v.adler,P.pending_buf,P.pending-w,w)),k(v),w=P.pending,P.pending===P.pending_buf_size)){W=1;break}W=P.gzindex<P.gzhead.name.length?255&P.gzhead.name.charCodeAt(P.gzindex++):0,ct(P,W)}while(W!==0);P.gzhead.hcrc&&P.pending>w&&(v.adler=o(v.adler,P.pending_buf,P.pending-w,w)),W===0&&(P.gzindex=0,P.status=91)}else P.status=91;if(P.status===91)if(P.gzhead.comment){w=P.pending;do{if(P.pending===P.pending_buf_size&&(P.gzhead.hcrc&&P.pending>w&&(v.adler=o(v.adler,P.pending_buf,P.pending-w,w)),k(v),w=P.pending,P.pending===P.pending_buf_size)){W=1;break}W=P.gzindex<P.gzhead.comment.length?255&P.gzhead.comment.charCodeAt(P.gzindex++):0,ct(P,W)}while(W!==0);P.gzhead.hcrc&&P.pending>w&&(v.adler=o(v.adler,P.pending_buf,P.pending-w,w)),W===0&&(P.status=103)}else P.status=103;if(P.status===103&&(P.gzhead.hcrc?(P.pending+2>P.pending_buf_size&&k(v),P.pending+2<=P.pending_buf_size&&(ct(P,255&v.adler),ct(P,v.adler>>8&255),v.adler=0,P.status=N)):P.status=N),P.pending!==0){if(k(v),v.avail_out===0)return P.last_flush=-1,u}else if(v.avail_in===0&&K(J)<=K(F)&&J!==h)return nt(v,-5);if(P.status===666&&v.avail_in!==0)return nt(v,-5);if(v.avail_in!==0||P.lookahead!==0||J!==l&&P.status!==666){var E=P.strategy===2?function(y,z){for(var st;;){if(y.lookahead===0&&(dt(y),y.lookahead===0)){if(z===l)return b;break}if(y.match_length=0,st=r._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++,st&&(H(y,!1),y.strm.avail_out===0))return b}return y.insert=0,z===h?(H(y,!0),y.strm.avail_out===0?V:U):y.last_lit&&(H(y,!1),y.strm.avail_out===0)?b:Z}(P,J):P.strategy===3?function(y,z){for(var st,Q,ot,Et,pt=y.window;;){if(y.lookahead<=j){if(dt(y),y.lookahead<=j&&z===l)return b;if(y.lookahead===0)break}if(y.match_length=0,y.lookahead>=R&&0<y.strstart&&(Q=pt[ot=y.strstart-1])===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]){Et=y.strstart+j;do;while(Q===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]&&Q===pt[++ot]&&ot<Et);y.match_length=j-(Et-ot),y.match_length>y.lookahead&&(y.match_length=y.lookahead)}if(y.match_length>=R?(st=r._tr_tally(y,1,y.match_length-R),y.lookahead-=y.match_length,y.strstart+=y.match_length,y.match_length=0):(st=r._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++),st&&(H(y,!1),y.strm.avail_out===0))return b}return y.insert=0,z===h?(H(y,!0),y.strm.avail_out===0?V:U):y.last_lit&&(H(y,!1),y.strm.avail_out===0)?b:Z}(P,J):i[P.level].func(P,J);if(E!==V&&E!==U||(P.status=666),E===b||E===V)return v.avail_out===0&&(P.last_flush=-1),u;if(E===Z&&(J===1?r._tr_align(P):J!==5&&(r._tr_stored_block(P,0,0,!1),J===3&&(rt(P.head),P.lookahead===0&&(P.strstart=0,P.block_start=0,P.insert=0))),k(v),v.avail_out===0))return P.last_flush=-1,u}return J!==h?u:P.wrap<=0?1:(P.wrap===2?(ct(P,255&v.adler),ct(P,v.adler>>8&255),ct(P,v.adler>>16&255),ct(P,v.adler>>24&255),ct(P,255&v.total_in),ct(P,v.total_in>>8&255),ct(P,v.total_in>>16&255),ct(P,v.total_in>>24&255)):(lt(P,v.adler>>>16),lt(P,65535&v.adler)),k(v),0<P.wrap&&(P.wrap=-P.wrap),P.pending!==0?u:1)},e.deflateEnd=function(v){var J;return v&&v.state?(J=v.state.status)!==M&&J!==69&&J!==73&&J!==91&&J!==103&&J!==N&&J!==666?nt(v,f):(v.state=null,J===N?nt(v,-3):u):f},e.deflateSetDictionary=function(v,J){var F,P,w,W,tt,E,y,z,st=J.length;if(!v||!v.state||(W=(F=v.state).wrap)===2||W===1&&F.status!==M||F.lookahead)return f;for(W===1&&(v.adler=a(v.adler,J,st,0)),F.wrap=0,st>=F.w_size&&(W===0&&(rt(F.head),F.strstart=0,F.block_start=0,F.insert=0),z=new s.Buf8(F.w_size),s.arraySet(z,J,st-F.w_size,F.w_size,0),J=z,st=F.w_size),tt=v.avail_in,E=v.next_in,y=v.input,v.avail_in=st,v.next_in=0,v.input=J,dt(F);F.lookahead>=R;){for(P=F.strstart,w=F.lookahead-(R-1);F.ins_h=(F.ins_h<<F.hash_shift^F.window[P+R-1])&F.hash_mask,F.prev[P&F.w_mask]=F.head[F.ins_h],F.head[F.ins_h]=P,P++,--w;);F.strstart=P,F.lookahead=R-1,dt(F)}return F.strstart+=F.lookahead,F.block_start=F.strstart,F.insert=F.lookahead,F.lookahead=0,F.match_length=F.prev_length=R-1,F.match_available=0,v.next_in=E,v.input=y,v.avail_in=tt,F.wrap=W,u},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(n,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(n,t,e){"use strict";t.exports=function(i,s){var r,a,o,c,l,h,u,f,d,g,_,p,m,S,x,T,I,L,R,j,C,M,N,b,Z;r=i.state,a=i.next_in,b=i.input,o=a+(i.avail_in-5),c=i.next_out,Z=i.output,l=c-(s-i.avail_out),h=c+(i.avail_out-257),u=r.dmax,f=r.wsize,d=r.whave,g=r.wnext,_=r.window,p=r.hold,m=r.bits,S=r.lencode,x=r.distcode,T=(1<<r.lenbits)-1,I=(1<<r.distbits)-1;t:do{m<15&&(p+=b[a++]<<m,m+=8,p+=b[a++]<<m,m+=8),L=S[p&T];e:for(;;){if(p>>>=R=L>>>24,m-=R,(R=L>>>16&255)===0)Z[c++]=65535&L;else{if(!(16&R)){if(!(64&R)){L=S[(65535&L)+(p&(1<<R)-1)];continue e}if(32&R){r.mode=12;break t}i.msg="invalid literal/length code",r.mode=30;break t}j=65535&L,(R&=15)&&(m<R&&(p+=b[a++]<<m,m+=8),j+=p&(1<<R)-1,p>>>=R,m-=R),m<15&&(p+=b[a++]<<m,m+=8,p+=b[a++]<<m,m+=8),L=x[p&I];n:for(;;){if(p>>>=R=L>>>24,m-=R,!(16&(R=L>>>16&255))){if(!(64&R)){L=x[(65535&L)+(p&(1<<R)-1)];continue n}i.msg="invalid distance code",r.mode=30;break t}if(C=65535&L,m<(R&=15)&&(p+=b[a++]<<m,(m+=8)<R&&(p+=b[a++]<<m,m+=8)),u<(C+=p&(1<<R)-1)){i.msg="invalid distance too far back",r.mode=30;break t}if(p>>>=R,m-=R,(R=c-l)<C){if(d<(R=C-R)&&r.sane){i.msg="invalid distance too far back",r.mode=30;break t}if(N=_,(M=0)===g){if(M+=f-R,R<j){for(j-=R;Z[c++]=_[M++],--R;);M=c-C,N=Z}}else if(g<R){if(M+=f+g-R,(R-=g)<j){for(j-=R;Z[c++]=_[M++],--R;);if(M=0,g<j){for(j-=R=g;Z[c++]=_[M++],--R;);M=c-C,N=Z}}}else if(M+=g-R,R<j){for(j-=R;Z[c++]=_[M++],--R;);M=c-C,N=Z}for(;2<j;)Z[c++]=N[M++],Z[c++]=N[M++],Z[c++]=N[M++],j-=3;j&&(Z[c++]=N[M++],1<j&&(Z[c++]=N[M++]))}else{for(M=c-C;Z[c++]=Z[M++],Z[c++]=Z[M++],Z[c++]=Z[M++],2<(j-=3););j&&(Z[c++]=Z[M++],1<j&&(Z[c++]=Z[M++]))}break}}break}}while(a<o&&c<h);a-=j=m>>3,p&=(1<<(m-=j<<3))-1,i.next_in=a,i.next_out=c,i.avail_in=a<o?o-a+5:5-(a-o),i.avail_out=c<h?h-c+257:257-(c-h),r.hold=p,r.bits=m}},{}],49:[function(n,t,e){"use strict";var i=n("../utils/common"),s=n("./adler32"),r=n("./crc32"),a=n("./inffast"),o=n("./inftrees"),c=1,l=2,h=0,u=-2,f=1,d=852,g=592;function _(M){return(M>>>24&255)+(M>>>8&65280)+((65280&M)<<8)+((255&M)<<24)}function p(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new i.Buf16(320),this.work=new i.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function m(M){var N;return M&&M.state?(N=M.state,M.total_in=M.total_out=N.total=0,M.msg="",N.wrap&&(M.adler=1&N.wrap),N.mode=f,N.last=0,N.havedict=0,N.dmax=32768,N.head=null,N.hold=0,N.bits=0,N.lencode=N.lendyn=new i.Buf32(d),N.distcode=N.distdyn=new i.Buf32(g),N.sane=1,N.back=-1,h):u}function S(M){var N;return M&&M.state?((N=M.state).wsize=0,N.whave=0,N.wnext=0,m(M)):u}function x(M,N){var b,Z;return M&&M.state?(Z=M.state,N<0?(b=0,N=-N):(b=1+(N>>4),N<48&&(N&=15)),N&&(N<8||15<N)?u:(Z.window!==null&&Z.wbits!==N&&(Z.window=null),Z.wrap=b,Z.wbits=N,S(M))):u}function T(M,N){var b,Z;return M?(Z=new p,(M.state=Z).window=null,(b=x(M,N))!==h&&(M.state=null),b):u}var I,L,R=!0;function j(M){if(R){var N;for(I=new i.Buf32(512),L=new i.Buf32(32),N=0;N<144;)M.lens[N++]=8;for(;N<256;)M.lens[N++]=9;for(;N<280;)M.lens[N++]=7;for(;N<288;)M.lens[N++]=8;for(o(c,M.lens,0,288,I,0,M.work,{bits:9}),N=0;N<32;)M.lens[N++]=5;o(l,M.lens,0,32,L,0,M.work,{bits:5}),R=!1}M.lencode=I,M.lenbits=9,M.distcode=L,M.distbits=5}function C(M,N,b,Z){var V,U=M.state;return U.window===null&&(U.wsize=1<<U.wbits,U.wnext=0,U.whave=0,U.window=new i.Buf8(U.wsize)),Z>=U.wsize?(i.arraySet(U.window,N,b-U.wsize,U.wsize,0),U.wnext=0,U.whave=U.wsize):(Z<(V=U.wsize-U.wnext)&&(V=Z),i.arraySet(U.window,N,b-Z,V,U.wnext),(Z-=V)?(i.arraySet(U.window,N,b-Z,Z,0),U.wnext=Z,U.whave=U.wsize):(U.wnext+=V,U.wnext===U.wsize&&(U.wnext=0),U.whave<U.wsize&&(U.whave+=V))),0}e.inflateReset=S,e.inflateReset2=x,e.inflateResetKeep=m,e.inflateInit=function(M){return T(M,15)},e.inflateInit2=T,e.inflate=function(M,N){var b,Z,V,U,nt,K,rt,k,H,ct,lt,G,dt,yt,xt,_t,Lt,Dt,Tt,Ut,v,J,F,P,w=0,W=new i.Buf8(4),tt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!M||!M.state||!M.output||!M.input&&M.avail_in!==0)return u;(b=M.state).mode===12&&(b.mode=13),nt=M.next_out,V=M.output,rt=M.avail_out,U=M.next_in,Z=M.input,K=M.avail_in,k=b.hold,H=b.bits,ct=K,lt=rt,J=h;t:for(;;)switch(b.mode){case f:if(b.wrap===0){b.mode=13;break}for(;H<16;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(2&b.wrap&&k===35615){W[b.check=0]=255&k,W[1]=k>>>8&255,b.check=r(b.check,W,2,0),H=k=0,b.mode=2;break}if(b.flags=0,b.head&&(b.head.done=!1),!(1&b.wrap)||(((255&k)<<8)+(k>>8))%31){M.msg="incorrect header check",b.mode=30;break}if((15&k)!=8){M.msg="unknown compression method",b.mode=30;break}if(H-=4,v=8+(15&(k>>>=4)),b.wbits===0)b.wbits=v;else if(v>b.wbits){M.msg="invalid window size",b.mode=30;break}b.dmax=1<<v,M.adler=b.check=1,b.mode=512&k?10:12,H=k=0;break;case 2:for(;H<16;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(b.flags=k,(255&b.flags)!=8){M.msg="unknown compression method",b.mode=30;break}if(57344&b.flags){M.msg="unknown header flags set",b.mode=30;break}b.head&&(b.head.text=k>>8&1),512&b.flags&&(W[0]=255&k,W[1]=k>>>8&255,b.check=r(b.check,W,2,0)),H=k=0,b.mode=3;case 3:for(;H<32;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}b.head&&(b.head.time=k),512&b.flags&&(W[0]=255&k,W[1]=k>>>8&255,W[2]=k>>>16&255,W[3]=k>>>24&255,b.check=r(b.check,W,4,0)),H=k=0,b.mode=4;case 4:for(;H<16;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}b.head&&(b.head.xflags=255&k,b.head.os=k>>8),512&b.flags&&(W[0]=255&k,W[1]=k>>>8&255,b.check=r(b.check,W,2,0)),H=k=0,b.mode=5;case 5:if(1024&b.flags){for(;H<16;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}b.length=k,b.head&&(b.head.extra_len=k),512&b.flags&&(W[0]=255&k,W[1]=k>>>8&255,b.check=r(b.check,W,2,0)),H=k=0}else b.head&&(b.head.extra=null);b.mode=6;case 6:if(1024&b.flags&&(K<(G=b.length)&&(G=K),G&&(b.head&&(v=b.head.extra_len-b.length,b.head.extra||(b.head.extra=new Array(b.head.extra_len)),i.arraySet(b.head.extra,Z,U,G,v)),512&b.flags&&(b.check=r(b.check,Z,G,U)),K-=G,U+=G,b.length-=G),b.length))break t;b.length=0,b.mode=7;case 7:if(2048&b.flags){if(K===0)break t;for(G=0;v=Z[U+G++],b.head&&v&&b.length<65536&&(b.head.name+=String.fromCharCode(v)),v&&G<K;);if(512&b.flags&&(b.check=r(b.check,Z,G,U)),K-=G,U+=G,v)break t}else b.head&&(b.head.name=null);b.length=0,b.mode=8;case 8:if(4096&b.flags){if(K===0)break t;for(G=0;v=Z[U+G++],b.head&&v&&b.length<65536&&(b.head.comment+=String.fromCharCode(v)),v&&G<K;);if(512&b.flags&&(b.check=r(b.check,Z,G,U)),K-=G,U+=G,v)break t}else b.head&&(b.head.comment=null);b.mode=9;case 9:if(512&b.flags){for(;H<16;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(k!==(65535&b.check)){M.msg="header crc mismatch",b.mode=30;break}H=k=0}b.head&&(b.head.hcrc=b.flags>>9&1,b.head.done=!0),M.adler=b.check=0,b.mode=12;break;case 10:for(;H<32;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}M.adler=b.check=_(k),H=k=0,b.mode=11;case 11:if(b.havedict===0)return M.next_out=nt,M.avail_out=rt,M.next_in=U,M.avail_in=K,b.hold=k,b.bits=H,2;M.adler=b.check=1,b.mode=12;case 12:if(N===5||N===6)break t;case 13:if(b.last){k>>>=7&H,H-=7&H,b.mode=27;break}for(;H<3;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}switch(b.last=1&k,H-=1,3&(k>>>=1)){case 0:b.mode=14;break;case 1:if(j(b),b.mode=20,N!==6)break;k>>>=2,H-=2;break t;case 2:b.mode=17;break;case 3:M.msg="invalid block type",b.mode=30}k>>>=2,H-=2;break;case 14:for(k>>>=7&H,H-=7&H;H<32;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if((65535&k)!=(k>>>16^65535)){M.msg="invalid stored block lengths",b.mode=30;break}if(b.length=65535&k,H=k=0,b.mode=15,N===6)break t;case 15:b.mode=16;case 16:if(G=b.length){if(K<G&&(G=K),rt<G&&(G=rt),G===0)break t;i.arraySet(V,Z,U,G,nt),K-=G,U+=G,rt-=G,nt+=G,b.length-=G;break}b.mode=12;break;case 17:for(;H<14;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(b.nlen=257+(31&k),k>>>=5,H-=5,b.ndist=1+(31&k),k>>>=5,H-=5,b.ncode=4+(15&k),k>>>=4,H-=4,286<b.nlen||30<b.ndist){M.msg="too many length or distance symbols",b.mode=30;break}b.have=0,b.mode=18;case 18:for(;b.have<b.ncode;){for(;H<3;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}b.lens[tt[b.have++]]=7&k,k>>>=3,H-=3}for(;b.have<19;)b.lens[tt[b.have++]]=0;if(b.lencode=b.lendyn,b.lenbits=7,F={bits:b.lenbits},J=o(0,b.lens,0,19,b.lencode,0,b.work,F),b.lenbits=F.bits,J){M.msg="invalid code lengths set",b.mode=30;break}b.have=0,b.mode=19;case 19:for(;b.have<b.nlen+b.ndist;){for(;_t=(w=b.lencode[k&(1<<b.lenbits)-1])>>>16&255,Lt=65535&w,!((xt=w>>>24)<=H);){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(Lt<16)k>>>=xt,H-=xt,b.lens[b.have++]=Lt;else{if(Lt===16){for(P=xt+2;H<P;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(k>>>=xt,H-=xt,b.have===0){M.msg="invalid bit length repeat",b.mode=30;break}v=b.lens[b.have-1],G=3+(3&k),k>>>=2,H-=2}else if(Lt===17){for(P=xt+3;H<P;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}H-=xt,v=0,G=3+(7&(k>>>=xt)),k>>>=3,H-=3}else{for(P=xt+7;H<P;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}H-=xt,v=0,G=11+(127&(k>>>=xt)),k>>>=7,H-=7}if(b.have+G>b.nlen+b.ndist){M.msg="invalid bit length repeat",b.mode=30;break}for(;G--;)b.lens[b.have++]=v}}if(b.mode===30)break;if(b.lens[256]===0){M.msg="invalid code -- missing end-of-block",b.mode=30;break}if(b.lenbits=9,F={bits:b.lenbits},J=o(c,b.lens,0,b.nlen,b.lencode,0,b.work,F),b.lenbits=F.bits,J){M.msg="invalid literal/lengths set",b.mode=30;break}if(b.distbits=6,b.distcode=b.distdyn,F={bits:b.distbits},J=o(l,b.lens,b.nlen,b.ndist,b.distcode,0,b.work,F),b.distbits=F.bits,J){M.msg="invalid distances set",b.mode=30;break}if(b.mode=20,N===6)break t;case 20:b.mode=21;case 21:if(6<=K&&258<=rt){M.next_out=nt,M.avail_out=rt,M.next_in=U,M.avail_in=K,b.hold=k,b.bits=H,a(M,lt),nt=M.next_out,V=M.output,rt=M.avail_out,U=M.next_in,Z=M.input,K=M.avail_in,k=b.hold,H=b.bits,b.mode===12&&(b.back=-1);break}for(b.back=0;_t=(w=b.lencode[k&(1<<b.lenbits)-1])>>>16&255,Lt=65535&w,!((xt=w>>>24)<=H);){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(_t&&!(240&_t)){for(Dt=xt,Tt=_t,Ut=Lt;_t=(w=b.lencode[Ut+((k&(1<<Dt+Tt)-1)>>Dt)])>>>16&255,Lt=65535&w,!(Dt+(xt=w>>>24)<=H);){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}k>>>=Dt,H-=Dt,b.back+=Dt}if(k>>>=xt,H-=xt,b.back+=xt,b.length=Lt,_t===0){b.mode=26;break}if(32&_t){b.back=-1,b.mode=12;break}if(64&_t){M.msg="invalid literal/length code",b.mode=30;break}b.extra=15&_t,b.mode=22;case 22:if(b.extra){for(P=b.extra;H<P;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}b.length+=k&(1<<b.extra)-1,k>>>=b.extra,H-=b.extra,b.back+=b.extra}b.was=b.length,b.mode=23;case 23:for(;_t=(w=b.distcode[k&(1<<b.distbits)-1])>>>16&255,Lt=65535&w,!((xt=w>>>24)<=H);){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(!(240&_t)){for(Dt=xt,Tt=_t,Ut=Lt;_t=(w=b.distcode[Ut+((k&(1<<Dt+Tt)-1)>>Dt)])>>>16&255,Lt=65535&w,!(Dt+(xt=w>>>24)<=H);){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}k>>>=Dt,H-=Dt,b.back+=Dt}if(k>>>=xt,H-=xt,b.back+=xt,64&_t){M.msg="invalid distance code",b.mode=30;break}b.offset=Lt,b.extra=15&_t,b.mode=24;case 24:if(b.extra){for(P=b.extra;H<P;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}b.offset+=k&(1<<b.extra)-1,k>>>=b.extra,H-=b.extra,b.back+=b.extra}if(b.offset>b.dmax){M.msg="invalid distance too far back",b.mode=30;break}b.mode=25;case 25:if(rt===0)break t;if(G=lt-rt,b.offset>G){if((G=b.offset-G)>b.whave&&b.sane){M.msg="invalid distance too far back",b.mode=30;break}dt=G>b.wnext?(G-=b.wnext,b.wsize-G):b.wnext-G,G>b.length&&(G=b.length),yt=b.window}else yt=V,dt=nt-b.offset,G=b.length;for(rt<G&&(G=rt),rt-=G,b.length-=G;V[nt++]=yt[dt++],--G;);b.length===0&&(b.mode=21);break;case 26:if(rt===0)break t;V[nt++]=b.length,rt--,b.mode=21;break;case 27:if(b.wrap){for(;H<32;){if(K===0)break t;K--,k|=Z[U++]<<H,H+=8}if(lt-=rt,M.total_out+=lt,b.total+=lt,lt&&(M.adler=b.check=b.flags?r(b.check,V,lt,nt-lt):s(b.check,V,lt,nt-lt)),lt=rt,(b.flags?k:_(k))!==b.check){M.msg="incorrect data check",b.mode=30;break}H=k=0}b.mode=28;case 28:if(b.wrap&&b.flags){for(;H<32;){if(K===0)break t;K--,k+=Z[U++]<<H,H+=8}if(k!==(4294967295&b.total)){M.msg="incorrect length check",b.mode=30;break}H=k=0}b.mode=29;case 29:J=1;break t;case 30:J=-3;break t;case 31:return-4;case 32:default:return u}return M.next_out=nt,M.avail_out=rt,M.next_in=U,M.avail_in=K,b.hold=k,b.bits=H,(b.wsize||lt!==M.avail_out&&b.mode<30&&(b.mode<27||N!==4))&&C(M,M.output,M.next_out,lt-M.avail_out)?(b.mode=31,-4):(ct-=M.avail_in,lt-=M.avail_out,M.total_in+=ct,M.total_out+=lt,b.total+=lt,b.wrap&&lt&&(M.adler=b.check=b.flags?r(b.check,V,lt,M.next_out-lt):s(b.check,V,lt,M.next_out-lt)),M.data_type=b.bits+(b.last?64:0)+(b.mode===12?128:0)+(b.mode===20||b.mode===15?256:0),(ct==0&&lt===0||N===4)&&J===h&&(J=-5),J)},e.inflateEnd=function(M){if(!M||!M.state)return u;var N=M.state;return N.window&&(N.window=null),M.state=null,h},e.inflateGetHeader=function(M,N){var b;return M&&M.state&&2&(b=M.state).wrap?((b.head=N).done=!1,h):u},e.inflateSetDictionary=function(M,N){var b,Z=N.length;return M&&M.state?(b=M.state).wrap!==0&&b.mode!==11?u:b.mode===11&&s(1,N,Z,0)!==b.check?-3:C(M,N,Z,Z)?(b.mode=31,-4):(b.havedict=1,h):u},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(n,t,e){"use strict";var i=n("../utils/common"),s=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],r=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],a=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],o=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(c,l,h,u,f,d,g,_){var p,m,S,x,T,I,L,R,j,C=_.bits,M=0,N=0,b=0,Z=0,V=0,U=0,nt=0,K=0,rt=0,k=0,H=null,ct=0,lt=new i.Buf16(16),G=new i.Buf16(16),dt=null,yt=0;for(M=0;M<=15;M++)lt[M]=0;for(N=0;N<u;N++)lt[l[h+N]]++;for(V=C,Z=15;1<=Z&&lt[Z]===0;Z--);if(Z<V&&(V=Z),Z===0)return f[d++]=20971520,f[d++]=20971520,_.bits=1,0;for(b=1;b<Z&&lt[b]===0;b++);for(V<b&&(V=b),M=K=1;M<=15;M++)if(K<<=1,(K-=lt[M])<0)return-1;if(0<K&&(c===0||Z!==1))return-1;for(G[1]=0,M=1;M<15;M++)G[M+1]=G[M]+lt[M];for(N=0;N<u;N++)l[h+N]!==0&&(g[G[l[h+N]]++]=N);if(I=c===0?(H=dt=g,19):c===1?(H=s,ct-=257,dt=r,yt-=257,256):(H=a,dt=o,-1),M=b,T=d,nt=N=k=0,S=-1,x=(rt=1<<(U=V))-1,c===1&&852<rt||c===2&&592<rt)return 1;for(;;){for(L=M-nt,j=g[N]<I?(R=0,g[N]):g[N]>I?(R=dt[yt+g[N]],H[ct+g[N]]):(R=96,0),p=1<<M-nt,b=m=1<<U;f[T+(k>>nt)+(m-=p)]=L<<24|R<<16|j|0,m!==0;);for(p=1<<M-1;k&p;)p>>=1;if(p!==0?(k&=p-1,k+=p):k=0,N++,--lt[M]==0){if(M===Z)break;M=l[h+g[N]]}if(V<M&&(k&x)!==S){for(nt===0&&(nt=V),T+=b,K=1<<(U=M-nt);U+nt<Z&&!((K-=lt[U+nt])<=0);)U++,K<<=1;if(rt+=1<<U,c===1&&852<rt||c===2&&592<rt)return 1;f[S=k&x]=V<<24|U<<16|T-d|0}}return k!==0&&(f[T+k]=M-nt<<24|64<<16|0),_.bits=V,0}},{"../utils/common":41}],51:[function(n,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(n,t,e){"use strict";var i=n("../utils/common"),s=0,r=1;function a(w){for(var W=w.length;0<=--W;)w[W]=0}var o=0,c=29,l=256,h=l+1+c,u=30,f=19,d=2*h+1,g=15,_=16,p=7,m=256,S=16,x=17,T=18,I=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],R=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],j=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],C=new Array(2*(h+2));a(C);var M=new Array(2*u);a(M);var N=new Array(512);a(N);var b=new Array(256);a(b);var Z=new Array(c);a(Z);var V,U,nt,K=new Array(u);function rt(w,W,tt,E,y){this.static_tree=w,this.extra_bits=W,this.extra_base=tt,this.elems=E,this.max_length=y,this.has_stree=w&&w.length}function k(w,W){this.dyn_tree=w,this.max_code=0,this.stat_desc=W}function H(w){return w<256?N[w]:N[256+(w>>>7)]}function ct(w,W){w.pending_buf[w.pending++]=255&W,w.pending_buf[w.pending++]=W>>>8&255}function lt(w,W,tt){w.bi_valid>_-tt?(w.bi_buf|=W<<w.bi_valid&65535,ct(w,w.bi_buf),w.bi_buf=W>>_-w.bi_valid,w.bi_valid+=tt-_):(w.bi_buf|=W<<w.bi_valid&65535,w.bi_valid+=tt)}function G(w,W,tt){lt(w,tt[2*W],tt[2*W+1])}function dt(w,W){for(var tt=0;tt|=1&w,w>>>=1,tt<<=1,0<--W;);return tt>>>1}function yt(w,W,tt){var E,y,z=new Array(g+1),st=0;for(E=1;E<=g;E++)z[E]=st=st+tt[E-1]<<1;for(y=0;y<=W;y++){var Q=w[2*y+1];Q!==0&&(w[2*y]=dt(z[Q]++,Q))}}function xt(w){var W;for(W=0;W<h;W++)w.dyn_ltree[2*W]=0;for(W=0;W<u;W++)w.dyn_dtree[2*W]=0;for(W=0;W<f;W++)w.bl_tree[2*W]=0;w.dyn_ltree[2*m]=1,w.opt_len=w.static_len=0,w.last_lit=w.matches=0}function _t(w){8<w.bi_valid?ct(w,w.bi_buf):0<w.bi_valid&&(w.pending_buf[w.pending++]=w.bi_buf),w.bi_buf=0,w.bi_valid=0}function Lt(w,W,tt,E){var y=2*W,z=2*tt;return w[y]<w[z]||w[y]===w[z]&&E[W]<=E[tt]}function Dt(w,W,tt){for(var E=w.heap[tt],y=tt<<1;y<=w.heap_len&&(y<w.heap_len&&Lt(W,w.heap[y+1],w.heap[y],w.depth)&&y++,!Lt(W,E,w.heap[y],w.depth));)w.heap[tt]=w.heap[y],tt=y,y<<=1;w.heap[tt]=E}function Tt(w,W,tt){var E,y,z,st,Q=0;if(w.last_lit!==0)for(;E=w.pending_buf[w.d_buf+2*Q]<<8|w.pending_buf[w.d_buf+2*Q+1],y=w.pending_buf[w.l_buf+Q],Q++,E===0?G(w,y,W):(G(w,(z=b[y])+l+1,W),(st=I[z])!==0&&lt(w,y-=Z[z],st),G(w,z=H(--E),tt),(st=L[z])!==0&&lt(w,E-=K[z],st)),Q<w.last_lit;);G(w,m,W)}function Ut(w,W){var tt,E,y,z=W.dyn_tree,st=W.stat_desc.static_tree,Q=W.stat_desc.has_stree,ot=W.stat_desc.elems,Et=-1;for(w.heap_len=0,w.heap_max=d,tt=0;tt<ot;tt++)z[2*tt]!==0?(w.heap[++w.heap_len]=Et=tt,w.depth[tt]=0):z[2*tt+1]=0;for(;w.heap_len<2;)z[2*(y=w.heap[++w.heap_len]=Et<2?++Et:0)]=1,w.depth[y]=0,w.opt_len--,Q&&(w.static_len-=st[2*y+1]);for(W.max_code=Et,tt=w.heap_len>>1;1<=tt;tt--)Dt(w,z,tt);for(y=ot;tt=w.heap[1],w.heap[1]=w.heap[w.heap_len--],Dt(w,z,1),E=w.heap[1],w.heap[--w.heap_max]=tt,w.heap[--w.heap_max]=E,z[2*y]=z[2*tt]+z[2*E],w.depth[y]=(w.depth[tt]>=w.depth[E]?w.depth[tt]:w.depth[E])+1,z[2*tt+1]=z[2*E+1]=y,w.heap[1]=y++,Dt(w,z,1),2<=w.heap_len;);w.heap[--w.heap_max]=w.heap[1],function(pt,Rt){var Ft,zt,gt,D,A,q,Y=Rt.dyn_tree,et=Rt.max_code,mt=Rt.stat_desc.static_tree,wt=Rt.stat_desc.has_stree,It=Rt.stat_desc.extra_bits,Nt=Rt.stat_desc.extra_base,vt=Rt.stat_desc.max_length,X=0;for(D=0;D<=g;D++)pt.bl_count[D]=0;for(Y[2*pt.heap[pt.heap_max]+1]=0,Ft=pt.heap_max+1;Ft<d;Ft++)vt<(D=Y[2*Y[2*(zt=pt.heap[Ft])+1]+1]+1)&&(D=vt,X++),Y[2*zt+1]=D,et<zt||(pt.bl_count[D]++,A=0,Nt<=zt&&(A=It[zt-Nt]),q=Y[2*zt],pt.opt_len+=q*(D+A),wt&&(pt.static_len+=q*(mt[2*zt+1]+A)));if(X!==0){do{for(D=vt-1;pt.bl_count[D]===0;)D--;pt.bl_count[D]--,pt.bl_count[D+1]+=2,pt.bl_count[vt]--,X-=2}while(0<X);for(D=vt;D!==0;D--)for(zt=pt.bl_count[D];zt!==0;)et<(gt=pt.heap[--Ft])||(Y[2*gt+1]!==D&&(pt.opt_len+=(D-Y[2*gt+1])*Y[2*gt],Y[2*gt+1]=D),zt--)}}(w,W),yt(z,Et,w.bl_count)}function v(w,W,tt){var E,y,z=-1,st=W[1],Q=0,ot=7,Et=4;for(st===0&&(ot=138,Et=3),W[2*(tt+1)+1]=65535,E=0;E<=tt;E++)y=st,st=W[2*(E+1)+1],++Q<ot&&y===st||(Q<Et?w.bl_tree[2*y]+=Q:y!==0?(y!==z&&w.bl_tree[2*y]++,w.bl_tree[2*S]++):Q<=10?w.bl_tree[2*x]++:w.bl_tree[2*T]++,z=y,Et=(Q=0)===st?(ot=138,3):y===st?(ot=6,3):(ot=7,4))}function J(w,W,tt){var E,y,z=-1,st=W[1],Q=0,ot=7,Et=4;for(st===0&&(ot=138,Et=3),E=0;E<=tt;E++)if(y=st,st=W[2*(E+1)+1],!(++Q<ot&&y===st)){if(Q<Et)for(;G(w,y,w.bl_tree),--Q!=0;);else y!==0?(y!==z&&(G(w,y,w.bl_tree),Q--),G(w,S,w.bl_tree),lt(w,Q-3,2)):Q<=10?(G(w,x,w.bl_tree),lt(w,Q-3,3)):(G(w,T,w.bl_tree),lt(w,Q-11,7));z=y,Et=(Q=0)===st?(ot=138,3):y===st?(ot=6,3):(ot=7,4)}}a(K);var F=!1;function P(w,W,tt,E){lt(w,(o<<1)+(E?1:0),3),function(y,z,st,Q){_t(y),Q&&(ct(y,st),ct(y,~st)),i.arraySet(y.pending_buf,y.window,z,st,y.pending),y.pending+=st}(w,W,tt,!0)}e._tr_init=function(w){F||(function(){var W,tt,E,y,z,st=new Array(g+1);for(y=E=0;y<c-1;y++)for(Z[y]=E,W=0;W<1<<I[y];W++)b[E++]=y;for(b[E-1]=y,y=z=0;y<16;y++)for(K[y]=z,W=0;W<1<<L[y];W++)N[z++]=y;for(z>>=7;y<u;y++)for(K[y]=z<<7,W=0;W<1<<L[y]-7;W++)N[256+z++]=y;for(tt=0;tt<=g;tt++)st[tt]=0;for(W=0;W<=143;)C[2*W+1]=8,W++,st[8]++;for(;W<=255;)C[2*W+1]=9,W++,st[9]++;for(;W<=279;)C[2*W+1]=7,W++,st[7]++;for(;W<=287;)C[2*W+1]=8,W++,st[8]++;for(yt(C,h+1,st),W=0;W<u;W++)M[2*W+1]=5,M[2*W]=dt(W,5);V=new rt(C,I,l+1,h,g),U=new rt(M,L,0,u,g),nt=new rt(new Array(0),R,0,f,p)}(),F=!0),w.l_desc=new k(w.dyn_ltree,V),w.d_desc=new k(w.dyn_dtree,U),w.bl_desc=new k(w.bl_tree,nt),w.bi_buf=0,w.bi_valid=0,xt(w)},e._tr_stored_block=P,e._tr_flush_block=function(w,W,tt,E){var y,z,st=0;0<w.level?(w.strm.data_type===2&&(w.strm.data_type=function(Q){var ot,Et=4093624447;for(ot=0;ot<=31;ot++,Et>>>=1)if(1&Et&&Q.dyn_ltree[2*ot]!==0)return s;if(Q.dyn_ltree[18]!==0||Q.dyn_ltree[20]!==0||Q.dyn_ltree[26]!==0)return r;for(ot=32;ot<l;ot++)if(Q.dyn_ltree[2*ot]!==0)return r;return s}(w)),Ut(w,w.l_desc),Ut(w,w.d_desc),st=function(Q){var ot;for(v(Q,Q.dyn_ltree,Q.l_desc.max_code),v(Q,Q.dyn_dtree,Q.d_desc.max_code),Ut(Q,Q.bl_desc),ot=f-1;3<=ot&&Q.bl_tree[2*j[ot]+1]===0;ot--);return Q.opt_len+=3*(ot+1)+5+5+4,ot}(w),y=w.opt_len+3+7>>>3,(z=w.static_len+3+7>>>3)<=y&&(y=z)):y=z=tt+5,tt+4<=y&&W!==-1?P(w,W,tt,E):w.strategy===4||z===y?(lt(w,2+(E?1:0),3),Tt(w,C,M)):(lt(w,4+(E?1:0),3),function(Q,ot,Et,pt){var Rt;for(lt(Q,ot-257,5),lt(Q,Et-1,5),lt(Q,pt-4,4),Rt=0;Rt<pt;Rt++)lt(Q,Q.bl_tree[2*j[Rt]+1],3);J(Q,Q.dyn_ltree,ot-1),J(Q,Q.dyn_dtree,Et-1)}(w,w.l_desc.max_code+1,w.d_desc.max_code+1,st+1),Tt(w,w.dyn_ltree,w.dyn_dtree)),xt(w),E&&_t(w)},e._tr_tally=function(w,W,tt){return w.pending_buf[w.d_buf+2*w.last_lit]=W>>>8&255,w.pending_buf[w.d_buf+2*w.last_lit+1]=255&W,w.pending_buf[w.l_buf+w.last_lit]=255&tt,w.last_lit++,W===0?w.dyn_ltree[2*tt]++:(w.matches++,W--,w.dyn_ltree[2*(b[tt]+l+1)]++,w.dyn_dtree[2*H(W)]++),w.last_lit===w.lit_bufsize-1},e._tr_align=function(w){lt(w,2,3),G(w,m,C),function(W){W.bi_valid===16?(ct(W,W.bi_buf),W.bi_buf=0,W.bi_valid=0):8<=W.bi_valid&&(W.pending_buf[W.pending++]=255&W.bi_buf,W.bi_buf>>=8,W.bi_valid-=8)}(w)}},{"../utils/common":41}],53:[function(n,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(n,t,e){(function(i){(function(s,r){"use strict";if(!s.setImmediate){var a,o,c,l,h=1,u={},f=!1,d=s.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(s);g=g&&g.setTimeout?g:s,a={}.toString.call(s.process)==="[object process]"?function(S){process.nextTick(function(){p(S)})}:function(){if(s.postMessage&&!s.importScripts){var S=!0,x=s.onmessage;return s.onmessage=function(){S=!1},s.postMessage("","*"),s.onmessage=x,S}}()?(l="setImmediate$"+Math.random()+"$",s.addEventListener?s.addEventListener("message",m,!1):s.attachEvent("onmessage",m),function(S){s.postMessage(l+S,"*")}):s.MessageChannel?((c=new MessageChannel).port1.onmessage=function(S){p(S.data)},function(S){c.port2.postMessage(S)}):d&&"onreadystatechange"in d.createElement("script")?(o=d.documentElement,function(S){var x=d.createElement("script");x.onreadystatechange=function(){p(S),x.onreadystatechange=null,o.removeChild(x),x=null},o.appendChild(x)}):function(S){setTimeout(p,0,S)},g.setImmediate=function(S){typeof S!="function"&&(S=new Function(""+S));for(var x=new Array(arguments.length-1),T=0;T<x.length;T++)x[T]=arguments[T+1];var I={callback:S,args:x};return u[h]=I,a(h),h++},g.clearImmediate=_}function _(S){delete u[S]}function p(S){if(f)setTimeout(p,0,S);else{var x=u[S];if(x){f=!0;try{(function(T){var I=T.callback,L=T.args;switch(L.length){case 0:I();break;case 1:I(L[0]);break;case 2:I(L[0],L[1]);break;case 3:I(L[0],L[1],L[2]);break;default:I.apply(r,L)}})(x)}finally{_(S),f=!1}}}}function m(S){S.source===s&&typeof S.data=="string"&&S.data.indexOf(l)===0&&p(+S.data.slice(l.length))}})(typeof self>"u"?i===void 0?this:i:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});var pc="160",$i={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Xi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Af=0,mu=1,Rf=2;var Zh=1,mc=2,$n=3,gi=0,Je=1,Sn=2;var fi=0,Es=1,gu=2,_u=3,vu=4,Cf=5,Ii=100,Pf=101,Lf=102,xu=103,yu=104,If=200,Df=201,Of=202,Nf=203,Sl=204,El=205,kf=206,Uf=207,Ff=208,Bf=209,zf=210,Hf=211,Vf=212,Gf=213,Wf=214,$f=0,Xf=1,jf=2,Ma=3,qf=4,Yf=5,Zf=6,Kf=7,Kh=0,Jf=1,Qf=2,pi=0,tp=1,ep=2,np=3,gc=4,ip=5,sp=6;var Jh=300,As=301,Rs=302,wl=303,Tl=304,no=306,Al=1e3,En=1001,Rl=1002,$e=1003,bu=1004;var Vo=1005;var fn=1006,rp=1007;var or=1008;var mi=1009,ap=1010,op=1011,_c=1012,Qh=1013,hi=1014,di=1015,lr=1016,td=1017,ed=1018,Oi=1020,lp=1021,wn=1023,cp=1024,up=1025,Ni=1026,Cs=1027,hp=1028,nd=1029,dp=1030,id=1031,sd=1033,Go=33776,Wo=33777,$o=33778,Xo=33779,Mu=35840,Su=35841,Eu=35842,wu=35843,rd=36196,Tu=37492,Au=37496,Ru=37808,Cu=37809,Pu=37810,Lu=37811,Iu=37812,Du=37813,Ou=37814,Nu=37815,ku=37816,Uu=37817,Fu=37818,Bu=37819,zu=37820,Hu=37821,jo=36492,Vu=36494,Gu=36495,fp=36283,Wu=36284,$u=36285,Xu=36286;var Sa=2300,Ea=2301,qo=2302,ju=2400,qu=2401,Yu=2402;var ad=3e3,ki=3001,pp=3200,mp=3201,od=0,gp=1,pn="",Ne="srgb",jn="srgb-linear",vc="display-p3",io="display-p3-linear",wa="linear",ce="srgb",Ta="rec709",Aa="p3";var is=7680;var Zu=519,_p=512,vp=513,xp=514,ld=515,yp=516,bp=517,Mp=518,Sp=519,Ku=35044;var Ju="300 es",Cl=1035,Xn=2e3,Ra=2001,Nn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qu=1234567,tr=Math.PI/180,cr=180/Math.PI;function ji(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]).toLowerCase()}function Le(n,t,e){return Math.max(t,Math.min(e,n))}function xc(n,t){return(n%t+t)%t}function Ep(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function wp(n,t,e){return n!==t?(e-n)/(t-n):0}function er(n,t,e){return(1-e)*n+e*t}function Tp(n,t,e,i){return er(n,t,1-Math.exp(-e*i))}function Ap(n,t=1){return t-Math.abs(xc(n,t*2)-t)}function Rp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Cp(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Pp(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Lp(n,t){return n+Math.random()*(t-n)}function Ip(n){return n*(.5-Math.random())}function Dp(n){n!==void 0&&(Qu=n);let t=Qu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Op(n){return n*tr}function Np(n){return n*cr}function Pl(n){return(n&n-1)===0&&n!==0}function kp(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ca(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Up(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),d=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*h,c*u,c*f,o*l);break;case"YZY":n.set(c*f,o*h,c*u,o*l);break;case"ZXZ":n.set(c*u,c*f,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*d,o*l);break;case"YXY":n.set(c*d,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*d,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ge(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var cd={DEG2RAD:tr,RAD2DEG:cr,generateUUID:ji,clamp:Le,euclideanModulo:xc,mapLinear:Ep,inverseLerp:wp,lerp:er,damp:Tp,pingpong:Ap,smoothstep:Rp,smootherstep:Cp,randInt:Pp,randFloat:Lp,randFloatSpread:Ip,seededRandom:Dp,degToRad:Op,radToDeg:Np,isPowerOfTwo:Pl,ceilPowerOfTwo:kp,floorPowerOfTwo:Ca,setQuaternionFromProperEuler:Up,normalize:Ge,denormalize:xs},St=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Le(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},te=class n{constructor(t,e,i,s,r,a,o,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],g=i[8],_=s[0],p=s[3],m=s[6],S=s[1],x=s[4],T=s[7],I=s[2],L=s[5],R=s[8];return r[0]=a*_+o*S+c*I,r[3]=a*p+o*x+c*L,r[6]=a*m+o*T+c*R,r[1]=l*_+h*S+u*I,r[4]=l*p+h*x+u*L,r[7]=l*m+h*T+u*R,r[2]=f*_+d*S+g*I,r[5]=f*p+d*x+g*L,r[8]=f*m+d*T+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,g=e*u+i*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*l-h*i)*_,t[2]=(o*i-s*a)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=d*_,t[7]=(i*c-l*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Yo.makeScale(t,e)),this}rotate(t){return this.premultiply(Yo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Yo=new te;function ud(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Pa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Fp(){let n=Pa("canvas");return n.style.display="block",n}var th={};function nr(n){n in th||(th[n]=!0,console.warn(n))}var eh=new te().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nh=new te().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qr={[jn]:{transfer:wa,primaries:Ta,toReference:n=>n,fromReference:n=>n},[Ne]:{transfer:ce,primaries:Ta,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[io]:{transfer:wa,primaries:Aa,toReference:n=>n.applyMatrix3(nh),fromReference:n=>n.applyMatrix3(eh)},[vc]:{transfer:ce,primaries:Aa,toReference:n=>n.convertSRGBToLinear().applyMatrix3(nh),fromReference:n=>n.applyMatrix3(eh).convertLinearToSRGB()}},Bp=new Set([jn,io]),ae={enabled:!0,_workingColorSpace:jn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Bp.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=qr[t].toReference,s=qr[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return qr[n].primaries},getTransfer:function(n){return n===pn?wa:qr[n].transfer}};function ws(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ss,La=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ss===void 0&&(ss=Pa("canvas")),ss.width=t.width,ss.height=t.height;let i=ss.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ss}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Pa("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ws(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ws(e[i]/255)*255):e[i]=ws(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},zp=0,Ia=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zp++}),this.uuid=ji(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ko(s[a].image)):r.push(Ko(s[a]))}else r=Ko(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Ko(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?La.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Hp=0,mn=class n extends Nn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=En,s=En,r=fn,a=or,o=wn,c=mi,l=n.DEFAULT_ANISOTROPY,h=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=ji(),this.name="",this.source=new Ia(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ki?Ne:pn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Al:t.x=t.x-Math.floor(t.x);break;case En:t.x=t.x<0?0:1;break;case Rl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Al:t.y=t.y-Math.floor(t.y);break;case En:t.y=t.y<0?0:1;break;case Rl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ne?ki:ad}set encoding(t){nr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===ki?Ne:pn}};mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=Jh;mn.DEFAULT_ANISOTROPY=1;var Ie=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(l+1)/2,T=(d+1)/2,I=(m+1)/2,L=(h+f)/4,R=(u+_)/4,j=(g+p)/4;return x>T&&x>I?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=L/i,r=R/i):T>I?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=L/s,r=j/s):I<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),i=R/r,s=j/r),this.set(i,s,r,e),this}let S=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(u-_)/S,this.z=(f-h)/S,this.w=Math.acos((l+d+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ll=class extends Nn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);let s={width:t,height:e,depth:1};i.encoding!==void 0&&(nr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ki?Ne:pn),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new mn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ia(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},qn=class extends Ll{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Da=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Il=class extends mn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=En,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var an=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let p=1-o,m=c*f+l*d+h*g+u*_,S=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){let I=Math.sqrt(x),L=Math.atan2(I,m*S);p=Math.sin(p*L)/I,o=Math.sin(o*L)/I}let T=o*S;if(c=c*p+f*T,l=l*p+d*T,h=h*p+g*T,u=u*p+_*T,p===1-o){let I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*d-l*f,t[e+1]=c*g+h*f+l*u-o*d,t[e+2]=l*g+h*d+o*f-c*u,t[e+3]=h*g-o*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),u=o(r/2),f=c(i/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(i>o&&i>u){let d=2*Math.sqrt(1+i-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-i-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-i-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},$=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ih.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ih.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+c*l+a*u-o*h,this.y=i+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jo.copy(this).projectOnVector(t),this.sub(Jo)}reflect(t){return this.sub(Jo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Le(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jo=new $,ih=new an,Ui=class{constructor(t=new $(1/0,1/0,1/0),e=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,yn):yn.fromBufferAttribute(r,a),yn.applyMatrix4(t.matrixWorld),this.expandByPoint(yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Yr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Yr.copy(i.boundingBox)),Yr.applyMatrix4(t.matrixWorld),this.union(Yr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,yn),yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zs),Zr.subVectors(this.max,Zs),rs.subVectors(t.a,Zs),as.subVectors(t.b,Zs),os.subVectors(t.c,Zs),ai.subVectors(as,rs),oi.subVectors(os,as),Ai.subVectors(rs,os);let e=[0,-ai.z,ai.y,0,-oi.z,oi.y,0,-Ai.z,Ai.y,ai.z,0,-ai.x,oi.z,0,-oi.x,Ai.z,0,-Ai.x,-ai.y,ai.x,0,-oi.y,oi.x,0,-Ai.y,Ai.x,0];return!Qo(e,rs,as,os,Zr)||(e=[1,0,0,0,1,0,0,0,1],!Qo(e,rs,as,os,Zr))?!1:(Kr.crossVectors(ai,oi),e=[Kr.x,Kr.y,Kr.z],Qo(e,rs,as,os,Zr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},zn=[new $,new $,new $,new $,new $,new $,new $,new $],yn=new $,Yr=new Ui,rs=new $,as=new $,os=new $,ai=new $,oi=new $,Ai=new $,Zs=new $,Zr=new $,Kr=new $,Ri=new $;function Qo(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ri.fromArray(n,r);let o=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),c=t.dot(Ri),l=e.dot(Ri),h=i.dot(Ri);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var Vp=new Ui,Ks=new $,tl=new $,Ps=class{constructor(t=new $,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Vp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ks.subVectors(t,this.center);let e=Ks.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Ks,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ks.copy(t.center).add(tl)),this.expandByPoint(Ks.copy(t.center).sub(tl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Hn=new $,el=new $,Jr=new $,li=new $,nl=new $,Qr=new $,il=new $,Fi=class{constructor(t=new $,e=new $(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Hn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hn.copy(this.origin).addScaledVector(this.direction,e),Hn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){el.copy(t).add(e).multiplyScalar(.5),Jr.copy(e).sub(t).normalize(),li.copy(this.origin).sub(el);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Jr),o=li.dot(this.direction),c=-li.dot(Jr),l=li.lengthSq(),h=Math.abs(1-a*a),u,f,d,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(el).addScaledVector(Jr,f),d}intersectSphere(t,e){Hn.subVectors(t.center,this.origin);let i=Hn.dot(this.direction),s=Hn.dot(Hn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Hn)!==null}intersectTriangle(t,e,i,s,r){nl.subVectors(e,t),Qr.subVectors(i,t),il.crossVectors(nl,Qr);let a=this.direction.dot(il),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;li.subVectors(this.origin,t);let c=o*this.direction.dot(Qr.crossVectors(li,Qr));if(c<0)return null;let l=o*this.direction.dot(nl.cross(li));if(l<0||c+l>a)return null;let h=-o*li.dot(il);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ue=class n{constructor(t,e,i,s,r,a,o,c,l,h,u,f,d,g,_,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,h,u,f,d,g,_,p)}set(t,e,i,s,r,a,o,c,l,h,u,f,d,g,_,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/ls.setFromMatrixColumn(t,0).length(),r=1/ls.setFromMatrixColumn(t,1).length(),a=1/ls.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=g+d*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f+_*o,e[4]=g*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*h,d=c*u,g=l*h,_=l*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*h,d=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=g*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,d=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){let f=a*c,d=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gp,t,Wp)}lookAt(t,e,i){let s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ci.crossVectors(i,sn),ci.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ci.crossVectors(i,sn)),ci.normalize(),ta.crossVectors(sn,ci),s[0]=ci.x,s[4]=ta.x,s[8]=sn.x,s[1]=ci.y,s[5]=ta.y,s[9]=sn.y,s[2]=ci.z,s[6]=ta.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],g=i[2],_=i[6],p=i[10],m=i[14],S=i[3],x=i[7],T=i[11],I=i[15],L=s[0],R=s[4],j=s[8],C=s[12],M=s[1],N=s[5],b=s[9],Z=s[13],V=s[2],U=s[6],nt=s[10],K=s[14],rt=s[3],k=s[7],H=s[11],ct=s[15];return r[0]=a*L+o*M+c*V+l*rt,r[4]=a*R+o*N+c*U+l*k,r[8]=a*j+o*b+c*nt+l*H,r[12]=a*C+o*Z+c*K+l*ct,r[1]=h*L+u*M+f*V+d*rt,r[5]=h*R+u*N+f*U+d*k,r[9]=h*j+u*b+f*nt+d*H,r[13]=h*C+u*Z+f*K+d*ct,r[2]=g*L+_*M+p*V+m*rt,r[6]=g*R+_*N+p*U+m*k,r[10]=g*j+_*b+p*nt+m*H,r[14]=g*C+_*Z+p*K+m*ct,r[3]=S*L+x*M+T*V+I*rt,r[7]=S*R+x*N+T*U+I*k,r[11]=S*j+x*b+T*nt+I*H,r[15]=S*C+x*Z+T*K+I*ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*c*u-s*l*u-r*o*f+i*l*f+s*o*d-i*c*d)+_*(+e*c*d-e*l*f+r*a*f-s*a*d+s*l*h-r*c*h)+p*(+e*l*u-e*o*d-r*a*u+i*a*d+r*o*h-i*l*h)+m*(-s*o*h-e*c*u+e*o*f+s*a*u-i*a*f+i*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],p=t[14],m=t[15],S=u*p*l-_*f*l+_*c*d-o*p*d-u*c*m+o*f*m,x=g*f*l-h*p*l-g*c*d+a*p*d+h*c*m-a*f*m,T=h*_*l-g*u*l+g*o*d-a*_*d-h*o*m+a*u*m,I=g*u*c-h*_*c-g*o*f+a*_*f+h*o*p-a*u*p,L=e*S+i*x+s*T+r*I;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/L;return t[0]=S*R,t[1]=(_*f*r-u*p*r-_*s*d+i*p*d+u*s*m-i*f*m)*R,t[2]=(o*p*r-_*c*r+_*s*l-i*p*l-o*s*m+i*c*m)*R,t[3]=(u*c*r-o*f*r-u*s*l+i*f*l+o*s*d-i*c*d)*R,t[4]=x*R,t[5]=(h*p*r-g*f*r+g*s*d-e*p*d-h*s*m+e*f*m)*R,t[6]=(g*c*r-a*p*r-g*s*l+e*p*l+a*s*m-e*c*m)*R,t[7]=(a*f*r-h*c*r+h*s*l-e*f*l-a*s*d+e*c*d)*R,t[8]=T*R,t[9]=(g*u*r-h*_*r-g*i*d+e*_*d+h*i*m-e*u*m)*R,t[10]=(a*_*r-g*o*r+g*i*l-e*_*l-a*i*m+e*o*m)*R,t[11]=(h*o*r-a*u*r-h*i*l+e*u*l+a*i*d-e*o*d)*R,t[12]=I*R,t[13]=(h*_*s-g*u*s+g*i*f-e*_*f-h*i*p+e*u*p)*R,t[14]=(g*o*s-a*_*s-g*i*c+e*_*c+a*i*p-e*o*p)*R,t[15]=(a*u*s-h*o*s+h*i*c-e*u*c-a*i*f+e*o*f)*R,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,g=r*u,_=a*h,p=a*u,m=o*u,S=c*l,x=c*h,T=c*u,I=i.x,L=i.y,R=i.z;return s[0]=(1-(_+m))*I,s[1]=(d+T)*I,s[2]=(g-x)*I,s[3]=0,s[4]=(d-T)*L,s[5]=(1-(f+m))*L,s[6]=(p+S)*L,s[7]=0,s[8]=(g+x)*R,s[9]=(p-S)*R,s[10]=(1-(f+_))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=ls.set(s[0],s[1],s[2]).length(),a=ls.set(s[4],s[5],s[6]).length(),o=ls.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],bn.copy(this);let l=1/r,h=1/a,u=1/o;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,e.setFromRotationMatrix(bn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Xn){let c=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),d,g;if(o===Xn)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ra)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Xn){let c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*l,d=(i+s)*h,g,_;if(o===Xn)g=(a+r)*u,_=-2*u;else if(o===Ra)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},ls=new $,bn=new ue,Gp=new $(0,0,0),Wp=new $(1,1,1),ci=new $,ta=new $,sn=new $,sh=new ue,rh=new an,Ls=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return sh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rh.setFromEuler(this),this.setFromQuaternion(rh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ls.DEFAULT_ORDER="XYZ";var ur=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},$p=0,ah=new $,cs=new an,Vn=new ue,ea=new $,Js=new $,Xp=new $,jp=new an,oh=new $(1,0,0),lh=new $(0,1,0),ch=new $(0,0,1),qp={type:"added"},Yp={type:"removed"},Ee=class n extends Nn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new $,e=new Ls,i=new an,s=new $(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new te}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ur,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.multiply(cs),this}rotateOnWorldAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.premultiply(cs),this}rotateX(t){return this.rotateOnAxis(oh,t)}rotateY(t){return this.rotateOnAxis(lh,t)}rotateZ(t){return this.rotateOnAxis(ch,t)}translateOnAxis(t,e){return ah.copy(t).applyQuaternion(this.quaternion),this.position.add(ah.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oh,t)}translateY(t){return this.translateOnAxis(lh,t)}translateZ(t){return this.translateOnAxis(ch,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ea.copy(t):ea.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Js,ea,this.up):Vn.lookAt(ea,Js,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),cs.setFromRotationMatrix(Vn),this.quaternion.premultiply(cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(qp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yp)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,t,Xp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,jp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++){let r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Ee.DEFAULT_UP=new $(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Mn=new $,Gn=new $,sl=new $,Wn=new $,us=new $,hs=new $,uh=new $,rl=new $,al=new $,ol=new $,na=!1,ys=class n{constructor(t=new $,e=new $,i=new $){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Mn.subVectors(t,e),s.cross(Mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Mn.subVectors(s,e),Gn.subVectors(i,e),sl.subVectors(t,e);let a=Mn.dot(Mn),o=Mn.dot(Gn),c=Mn.dot(sl),l=Gn.dot(Gn),h=Gn.dot(sl),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getUV(t,e,i,s,r,a,o,c){return na===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),na=!0),this.getInterpolation(t,e,i,s,r,a,o,c)}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,Wn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Wn.x),c.addScaledVector(a,Wn.y),c.addScaledVector(o,Wn.z),c)}static isFrontFacing(t,e,i,s){return Mn.subVectors(i,e),Gn.subVectors(t,e),Mn.cross(Gn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Mn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),Mn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return na===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),na=!0),n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;us.subVectors(s,i),hs.subVectors(r,i),rl.subVectors(t,i);let c=us.dot(rl),l=hs.dot(rl);if(c<=0&&l<=0)return e.copy(i);al.subVectors(t,s);let h=us.dot(al),u=hs.dot(al);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(i).addScaledVector(us,a);ol.subVectors(t,r);let d=us.dot(ol),g=hs.dot(ol);if(g>=0&&d<=g)return e.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(i).addScaledVector(hs,o);let p=h*g-d*u;if(p<=0&&u-h>=0&&d-g>=0)return uh.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(uh,o);let m=1/(p+_+f);return a=_*m,o=f*m,e.copy(i).addScaledVector(us,a).addScaledVector(hs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},ia={h:0,s:0,l:0};function ll(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ne){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=i,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ae.workingColorSpace){if(t=xc(t,1),e=Le(e,0,1),i=Le(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=ll(a,r,t+1/3),this.g=ll(a,r,t),this.b=ll(a,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Ne){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ne){let i=hd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ws(t.r),this.g=ws(t.g),this.b=ws(t.b),this}copyLinearToSRGB(t){return this.r=Zo(t.r),this.g=Zo(t.g),this.b=Zo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ne){return ae.fromWorkingColorSpace(Fe.copy(this),t),Math.round(Le(Fe.r*255,0,255))*65536+Math.round(Le(Fe.g*255,0,255))*256+Math.round(Le(Fe.b*255,0,255))}getHexString(t=Ne){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Fe.copy(this),e);let i=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(i,s,r),o=Math.min(i,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Ne){ae.fromWorkingColorSpace(Fe.copy(this),t);let e=Fe.r,i=Fe.g,s=Fe.b;return t!==Ne?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(ia);let i=er(ui.h,ia.h,e),s=er(ui.s,ia.s,e),r=er(ui.l,ia.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fe=new jt;jt.NAMES=hd;var Zp=0,Yn=class extends Nn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=Es,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Sl,this.blendDst=El,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Ma,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(i.blending=this.blending),this.side!==gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Sl&&(i.blendSrc=this.blendSrc),this.blendDst!==El&&(i.blendDst=this.blendDst),this.blendEquation!==Ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ma&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},je=class extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Kh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new $,sa=new St,Qe=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ku,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)sa.fromBufferAttribute(this,e),sa.applyMatrix3(t),this.setXY(e,sa.x,sa.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=xs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ge(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=xs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=xs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=xs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=xs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ge(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),i=Ge(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),i=Ge(i,this.array),s=Ge(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ge(e,this.array),i=Ge(i,this.array),s=Ge(s,this.array),r=Ge(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ku&&(t.usage=this.usage),t}};var Oa=class extends Qe{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Na=class extends Qe{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var re=class extends Qe{constructor(t,e,i){super(new Float32Array(t),e,i)}};var Kp=0,dn=new ue,cl=new Ee,ds=new $,rn=new Ui,Qs=new Ui,Pe=new $,he=class n extends Nn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ud(t)?Na:Oa)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new te().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return dn.makeRotationFromQuaternion(t),this.applyMatrix4(dn),this}rotateX(t){return dn.makeRotationX(t),this.applyMatrix4(dn),this}rotateY(t){return dn.makeRotationY(t),this.applyMatrix4(dn),this}rotateZ(t){return dn.makeRotationZ(t),this.applyMatrix4(dn),this}translate(t,e,i){return dn.makeTranslation(t,e,i),this.applyMatrix4(dn),this}scale(t,e,i){return dn.makeScale(t,e,i),this.applyMatrix4(dn),this}lookAt(t){return cl.lookAt(t),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new re(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new $,1/0);return}if(t){let i=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Qs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(rn.min,Qs.min),rn.expandByPoint(Pe),Pe.addVectors(rn.max,Qs.max),rn.expandByPoint(Pe)):(rn.expandByPoint(Qs.min),rn.expandByPoint(Qs.max))}rn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Pe.fromBufferAttribute(o,l),c&&(ds.fromBufferAttribute(t,l),Pe.add(ds)),s=Math.max(s,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let M=0;M<o;M++)l[M]=new $,h[M]=new $;let u=new $,f=new $,d=new $,g=new St,_=new St,p=new St,m=new $,S=new $;function x(M,N,b){u.fromArray(s,M*3),f.fromArray(s,N*3),d.fromArray(s,b*3),g.fromArray(a,M*2),_.fromArray(a,N*2),p.fromArray(a,b*2),f.sub(u),d.sub(u),_.sub(g),p.sub(g);let Z=1/(_.x*p.y-p.x*_.y);isFinite(Z)&&(m.copy(f).multiplyScalar(p.y).addScaledVector(d,-_.y).multiplyScalar(Z),S.copy(d).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(Z),l[M].add(m),l[N].add(m),l[b].add(m),h[M].add(S),h[N].add(S),h[b].add(S))}let T=this.groups;T.length===0&&(T=[{start:0,count:i.length}]);for(let M=0,N=T.length;M<N;++M){let b=T[M],Z=b.start,V=b.count;for(let U=Z,nt=Z+V;U<nt;U+=3)x(i[U+0],i[U+1],i[U+2])}let I=new $,L=new $,R=new $,j=new $;function C(M){R.fromArray(r,M*3),j.copy(R);let N=l[M];I.copy(N),I.sub(R.multiplyScalar(R.dot(N))).normalize(),L.crossVectors(j,N);let Z=L.dot(h[M])<0?-1:1;c[M*4]=I.x,c[M*4+1]=I.y,c[M*4+2]=I.z,c[M*4+3]=Z}for(let M=0,N=T.length;M<N;++M){let b=T[M],Z=b.start,V=b.count;for(let U=Z,nt=Z+V;U<nt;U+=3)C(i[U+0]),C(i[U+1]),C(i[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Qe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new $,r=new $,a=new $,o=new $,c=new $,l=new $,h=new $,u=new $;if(t)for(let f=0,d=t.count;f<d;f+=3){let g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let m=0;m<h;m++)f[g++]=l[d++]}return new Qe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,i);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hh=new ue,Ci=new Fi,ra=new Ps,dh=new $,fs=new $,ps=new $,ms=new $,ul=new $,aa=new $,oa=new St,la=new St,ca=new St,fh=new $,ph=new $,mh=new $,ua=new $,ha=new $,xe=class extends Ee{constructor(t=new he,e=new je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){aa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(ul.fromBufferAttribute(u,t),a?aa.addScaledVector(ul,h):aa.addScaledVector(ul.sub(e),h))}e.add(aa)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ra.copy(i.boundingSphere),ra.applyMatrix4(r),Ci.copy(t.ray).recast(t.near),!(ra.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(ra,dh)===null||Ci.origin.distanceToSquared(dh)>(t.far-t.near)**2))&&(hh.copy(r).invert(),Ci.copy(t.ray).applyMatrix4(hh),!(i.boundingBox!==null&&Ci.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ci)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let p=f[g],m=a[p.materialIndex],S=Math.max(p.start,d.start),x=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let T=S,I=x;T<I;T+=3){let L=o.getX(T),R=o.getX(T+1),j=o.getX(T+2);s=da(this,m,t,i,l,h,u,L,R,j),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){let S=o.getX(p),x=o.getX(p+1),T=o.getX(p+2);s=da(this,a,t,i,l,h,u,S,x,T),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let p=f[g],m=a[p.materialIndex],S=Math.max(p.start,d.start),x=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let T=S,I=x;T<I;T+=3){let L=T,R=T+1,j=T+2;s=da(this,m,t,i,l,h,u,L,R,j),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){let S=p,x=p+1,T=p+2;s=da(this,a,t,i,l,h,u,S,x,T),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Jp(n,t,e,i,s,r,a,o){let c;if(t.side===Je?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===gi,o),c===null)return null;ha.copy(o),ha.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(ha);return l<e.near||l>e.far?null:{distance:l,point:ha.clone(),object:n}}function da(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,fs),n.getVertexPosition(c,ps),n.getVertexPosition(l,ms);let h=Jp(n,t,e,i,fs,ps,ms,ua);if(h){s&&(oa.fromBufferAttribute(s,o),la.fromBufferAttribute(s,c),ca.fromBufferAttribute(s,l),h.uv=ys.getInterpolation(ua,fs,ps,ms,oa,la,ca,new St)),r&&(oa.fromBufferAttribute(r,o),la.fromBufferAttribute(r,c),ca.fromBufferAttribute(r,l),h.uv1=ys.getInterpolation(ua,fs,ps,ms,oa,la,ca,new St),h.uv2=h.uv1),a&&(fh.fromBufferAttribute(a,o),ph.fromBufferAttribute(a,c),mh.fromBufferAttribute(a,l),h.normal=ys.getInterpolation(ua,fs,ps,ms,fh,ph,mh,new $),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new $,materialIndex:0};ys.getNormal(fs,ps,ms,u.normal),h.face=u}return h}var Bi=class n extends he{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(u,2));function g(_,p,m,S,x,T,I,L,R,j,C){let M=T/R,N=I/j,b=T/2,Z=I/2,V=L/2,U=R+1,nt=j+1,K=0,rt=0,k=new $;for(let H=0;H<nt;H++){let ct=H*N-Z;for(let lt=0;lt<U;lt++){let G=lt*M-b;k[_]=G*S,k[p]=ct*x,k[m]=V,l.push(k.x,k.y,k.z),k[_]=0,k[p]=0,k[m]=L>0?1:-1,h.push(k.x,k.y,k.z),u.push(lt/R),u.push(1-H/j),K+=1}}for(let H=0;H<j;H++)for(let ct=0;ct<R;ct++){let lt=f+ct+U*H,G=f+ct+U*(H+1),dt=f+(ct+1)+U*(H+1),yt=f+(ct+1)+U*H;c.push(lt,G,yt),c.push(G,dt,yt),rt+=6}o.addGroup(d,rt,C),d+=rt,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Is(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function We(n){let t={};for(let e=0;e<n.length;e++){let i=Is(n[e]);for(let s in i)t[s]=i[s]}return t}function Qp(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function dd(n){return n.getRenderTarget()===null?n.outputColorSpace:ae.workingColorSpace}var tm={clone:Is,merge:We},em=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Zn=class extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=em,this.fragmentShader=nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Is(t.uniforms),this.uniformsGroups=Qp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},ka=class extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=Xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Xe=class extends ka{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=cr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cr*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},gs=-90,_s=1,Dl=class extends Ee{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Xe(gs,_s,t,e);s.layers=this.layers,this.add(s);let r=new Xe(gs,_s,t,e);r.layers=this.layers,this.add(r);let a=new Xe(gs,_s,t,e);a.layers=this.layers,this.add(a);let o=new Xe(gs,_s,t,e);o.layers=this.layers,this.add(o);let c=new Xe(gs,_s,t,e);c.layers=this.layers,this.add(c);let l=new Xe(gs,_s,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Xn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ra)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Ua=class extends mn{constructor(t,e,i,s,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:As,super(t,e,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ol=class extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(nr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===ki?Ne:pn),this.texture=new Ua(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bi(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:Is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Je,blending:fi});r.uniforms.tEquirect.value=e;let a=new xe(s,r),o=e.minFilter;return e.minFilter===or&&(e.minFilter=fn),new Dl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},hl=new $,im=new $,sm=new te,Ke=class{constructor(t=new $(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=hl.subVectors(i,e).cross(im.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(hl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||sm.getNormalMatrix(t),s=this.coplanarPoint(hl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Pi=new Ps,fa=new $,hr=class{constructor(t=new Ke,e=new Ke,i=new Ke,s=new Ke,r=new Ke,a=new Ke){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Xn){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],p=s[11],m=s[12],S=s[13],x=s[14],T=s[15];if(i[0].setComponents(c-r,f-l,p-d,T-m).normalize(),i[1].setComponents(c+r,f+l,p+d,T+m).normalize(),i[2].setComponents(c+a,f+h,p+g,T+S).normalize(),i[3].setComponents(c-a,f-h,p-g,T-S).normalize(),i[4].setComponents(c-o,f-u,p-_,T-x).normalize(),e===Xn)i[5].setComponents(c+o,f+u,p+_,T+x).normalize();else if(e===Ra)i[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(t){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(fa.x=s.normal.x>0?t.max.x:t.min.x,fa.y=s.normal.y>0?t.max.y:t.min.y,fa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function fd(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function rm(n,t){let e=t.isWebGL2,i=new WeakMap;function s(l,h){let u=l.array,f=l.usage,d=u.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,u,f),l.onUploadCallback();let _;if(u instanceof Float32Array)_=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=n.SHORT;else if(u instanceof Uint32Array)_=n.UNSIGNED_INT;else if(u instanceof Int32Array)_=n.INT;else if(u instanceof Int8Array)_=n.BYTE;else if(u instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,h,u){let f=h.array,d=h._updateRange,g=h.updateRanges;if(n.bindBuffer(u,l),d.count===-1&&g.length===0&&n.bufferSubData(u,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){let m=g[_];e?n.bufferSubData(u,m.start*f.BYTES_PER_ELEMENT,f,m.start,m.count):n.bufferSubData(u,m.start*f.BYTES_PER_ELEMENT,f.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}d.count!==-1&&(e?n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):n.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=i.get(l);h&&(n.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=i.get(l);(!f||f.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=i.get(l);if(u===void 0)i.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var dr=class n extends he{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,u=t/o,f=e/c,d=[],g=[],_=[],p=[];for(let m=0;m<h;m++){let S=m*f-a;for(let x=0;x<l;x++){let T=x*u-r;g.push(T,-S,0),_.push(0,0,1),p.push(x/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let S=0;S<o;S++){let x=S+l*m,T=S+l*(m+1),I=S+1+l*(m+1),L=S+1+l*m;d.push(x,T,L),d.push(T,I,L)}this.setIndex(d),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(_,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,om=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,gm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_m=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ym=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Am=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Cm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Lm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,km="gl_FragColor = linearToOutputTexel( gl_FragColor );",Um=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Fm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ym=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Km=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ng=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ag=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,og=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ug=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,dg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_g=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,bg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Mg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Sg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ag=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ig=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Og=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ng=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ug=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Vg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Yg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,t0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,e0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,s0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,r0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,a0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,d0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,f0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,p0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,g0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,y0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,E0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,T0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,A0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,P0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,O0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,N0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,U0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,F0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:am,alphahash_pars_fragment:om,alphamap_fragment:lm,alphamap_pars_fragment:cm,alphatest_fragment:um,alphatest_pars_fragment:hm,aomap_fragment:dm,aomap_pars_fragment:fm,batching_pars_vertex:pm,batching_vertex:mm,begin_vertex:gm,beginnormal_vertex:_m,bsdfs:vm,iridescence_fragment:xm,bumpmap_pars_fragment:ym,clipping_planes_fragment:bm,clipping_planes_pars_fragment:Mm,clipping_planes_pars_vertex:Sm,clipping_planes_vertex:Em,color_fragment:wm,color_pars_fragment:Tm,color_pars_vertex:Am,color_vertex:Rm,common:Cm,cube_uv_reflection_fragment:Pm,defaultnormal_vertex:Lm,displacementmap_pars_vertex:Im,displacementmap_vertex:Dm,emissivemap_fragment:Om,emissivemap_pars_fragment:Nm,colorspace_fragment:km,colorspace_pars_fragment:Um,envmap_fragment:Fm,envmap_common_pars_fragment:Bm,envmap_pars_fragment:zm,envmap_pars_vertex:Hm,envmap_physical_pars_fragment:Qm,envmap_vertex:Vm,fog_vertex:Gm,fog_pars_vertex:Wm,fog_fragment:$m,fog_pars_fragment:Xm,gradientmap_pars_fragment:jm,lightmap_fragment:qm,lightmap_pars_fragment:Ym,lights_lambert_fragment:Zm,lights_lambert_pars_fragment:Km,lights_pars_begin:Jm,lights_toon_fragment:tg,lights_toon_pars_fragment:eg,lights_phong_fragment:ng,lights_phong_pars_fragment:ig,lights_physical_fragment:sg,lights_physical_pars_fragment:rg,lights_fragment_begin:ag,lights_fragment_maps:og,lights_fragment_end:lg,logdepthbuf_fragment:cg,logdepthbuf_pars_fragment:ug,logdepthbuf_pars_vertex:hg,logdepthbuf_vertex:dg,map_fragment:fg,map_pars_fragment:pg,map_particle_fragment:mg,map_particle_pars_fragment:gg,metalnessmap_fragment:_g,metalnessmap_pars_fragment:vg,morphcolor_vertex:xg,morphnormal_vertex:yg,morphtarget_pars_vertex:bg,morphtarget_vertex:Mg,normal_fragment_begin:Sg,normal_fragment_maps:Eg,normal_pars_fragment:wg,normal_pars_vertex:Tg,normal_vertex:Ag,normalmap_pars_fragment:Rg,clearcoat_normal_fragment_begin:Cg,clearcoat_normal_fragment_maps:Pg,clearcoat_pars_fragment:Lg,iridescence_pars_fragment:Ig,opaque_fragment:Dg,packing:Og,premultiplied_alpha_fragment:Ng,project_vertex:kg,dithering_fragment:Ug,dithering_pars_fragment:Fg,roughnessmap_fragment:Bg,roughnessmap_pars_fragment:zg,shadowmap_pars_fragment:Hg,shadowmap_pars_vertex:Vg,shadowmap_vertex:Gg,shadowmask_pars_fragment:Wg,skinbase_vertex:$g,skinning_pars_vertex:Xg,skinning_vertex:jg,skinnormal_vertex:qg,specularmap_fragment:Yg,specularmap_pars_fragment:Zg,tonemapping_fragment:Kg,tonemapping_pars_fragment:Jg,transmission_fragment:Qg,transmission_pars_fragment:t0,uv_pars_fragment:e0,uv_pars_vertex:n0,uv_vertex:i0,worldpos_vertex:s0,background_vert:r0,background_frag:a0,backgroundCube_vert:o0,backgroundCube_frag:l0,cube_vert:c0,cube_frag:u0,depth_vert:h0,depth_frag:d0,distanceRGBA_vert:f0,distanceRGBA_frag:p0,equirect_vert:m0,equirect_frag:g0,linedashed_vert:_0,linedashed_frag:v0,meshbasic_vert:x0,meshbasic_frag:y0,meshlambert_vert:b0,meshlambert_frag:M0,meshmatcap_vert:S0,meshmatcap_frag:E0,meshnormal_vert:w0,meshnormal_frag:T0,meshphong_vert:A0,meshphong_frag:R0,meshphysical_vert:C0,meshphysical_frag:P0,meshtoon_vert:L0,meshtoon_frag:I0,points_vert:D0,points_frag:O0,shadow_vert:N0,shadow_frag:k0,sprite_vert:U0,sprite_frag:F0},Ct={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},On={basic:{uniforms:We([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:We([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new jt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:We([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:We([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:We([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new jt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:We([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:We([Ct.points,Ct.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:We([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:We([Ct.common,Ct.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:We([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:We([Ct.sprite,Ct.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:We([Ct.common,Ct.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:We([Ct.lights,Ct.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};On.physical={uniforms:We([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};var pa={r:0,b:0,g:0};function B0(n,t,e,i,s,r,a){let o=new jt(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(p,m){let S=!1,x=m.isScene===!0?m.background:null;x&&x.isTexture&&(x=(m.backgroundBlurriness>0?e:t).get(x)),x===null?_(o,c):x&&x.isColor&&(_(x,1),S=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||S)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===no)?(h===void 0&&(h=new xe(new Bi(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Is(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,L,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=ae.getTransfer(x.colorSpace)!==ce,(u!==x||f!==x.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=n.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new xe(new dr(2,2),new Zn({name:"BackgroundMaterial",uniforms:Is(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=ae.getTransfer(x.colorSpace)!==ce,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,d=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,m){p.getRGB(pa,dd(n)),i.buffers.color.setClear(pa.r,pa.g,pa.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),c=m,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(o,c)},render:g}}function z0(n,t,e,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},c=p(null),l=c,h=!1;function u(V,U,nt,K,rt){let k=!1;if(a){let H=_(K,nt,U);l!==H&&(l=H,d(l.object)),k=m(V,K,nt,rt),k&&S(V,K,nt,rt)}else{let H=U.wireframe===!0;(l.geometry!==K.id||l.program!==nt.id||l.wireframe!==H)&&(l.geometry=K.id,l.program=nt.id,l.wireframe=H,k=!0)}rt!==null&&e.update(rt,n.ELEMENT_ARRAY_BUFFER),(k||h)&&(h=!1,j(V,U,nt,K),rt!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(rt).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function d(V){return i.isWebGL2?n.bindVertexArray(V):r.bindVertexArrayOES(V)}function g(V){return i.isWebGL2?n.deleteVertexArray(V):r.deleteVertexArrayOES(V)}function _(V,U,nt){let K=nt.wireframe===!0,rt=o[V.id];rt===void 0&&(rt={},o[V.id]=rt);let k=rt[U.id];k===void 0&&(k={},rt[U.id]=k);let H=k[K];return H===void 0&&(H=p(f()),k[K]=H),H}function p(V){let U=[],nt=[],K=[];for(let rt=0;rt<s;rt++)U[rt]=0,nt[rt]=0,K[rt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:nt,attributeDivisors:K,object:V,attributes:{},index:null}}function m(V,U,nt,K){let rt=l.attributes,k=U.attributes,H=0,ct=nt.getAttributes();for(let lt in ct)if(ct[lt].location>=0){let dt=rt[lt],yt=k[lt];if(yt===void 0&&(lt==="instanceMatrix"&&V.instanceMatrix&&(yt=V.instanceMatrix),lt==="instanceColor"&&V.instanceColor&&(yt=V.instanceColor)),dt===void 0||dt.attribute!==yt||yt&&dt.data!==yt.data)return!0;H++}return l.attributesNum!==H||l.index!==K}function S(V,U,nt,K){let rt={},k=U.attributes,H=0,ct=nt.getAttributes();for(let lt in ct)if(ct[lt].location>=0){let dt=k[lt];dt===void 0&&(lt==="instanceMatrix"&&V.instanceMatrix&&(dt=V.instanceMatrix),lt==="instanceColor"&&V.instanceColor&&(dt=V.instanceColor));let yt={};yt.attribute=dt,dt&&dt.data&&(yt.data=dt.data),rt[lt]=yt,H++}l.attributes=rt,l.attributesNum=H,l.index=K}function x(){let V=l.newAttributes;for(let U=0,nt=V.length;U<nt;U++)V[U]=0}function T(V){I(V,0)}function I(V,U){let nt=l.newAttributes,K=l.enabledAttributes,rt=l.attributeDivisors;nt[V]=1,K[V]===0&&(n.enableVertexAttribArray(V),K[V]=1),rt[V]!==U&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,U),rt[V]=U)}function L(){let V=l.newAttributes,U=l.enabledAttributes;for(let nt=0,K=U.length;nt<K;nt++)U[nt]!==V[nt]&&(n.disableVertexAttribArray(nt),U[nt]=0)}function R(V,U,nt,K,rt,k,H){H===!0?n.vertexAttribIPointer(V,U,nt,rt,k):n.vertexAttribPointer(V,U,nt,K,rt,k)}function j(V,U,nt,K){if(i.isWebGL2===!1&&(V.isInstancedMesh||K.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let rt=K.attributes,k=nt.getAttributes(),H=U.defaultAttributeValues;for(let ct in k){let lt=k[ct];if(lt.location>=0){let G=rt[ct];if(G===void 0&&(ct==="instanceMatrix"&&V.instanceMatrix&&(G=V.instanceMatrix),ct==="instanceColor"&&V.instanceColor&&(G=V.instanceColor)),G!==void 0){let dt=G.normalized,yt=G.itemSize,xt=e.get(G);if(xt===void 0)continue;let _t=xt.buffer,Lt=xt.type,Dt=xt.bytesPerElement,Tt=i.isWebGL2===!0&&(Lt===n.INT||Lt===n.UNSIGNED_INT||G.gpuType===Qh);if(G.isInterleavedBufferAttribute){let Ut=G.data,v=Ut.stride,J=G.offset;if(Ut.isInstancedInterleavedBuffer){for(let F=0;F<lt.locationSize;F++)I(lt.location+F,Ut.meshPerAttribute);V.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Ut.meshPerAttribute*Ut.count)}else for(let F=0;F<lt.locationSize;F++)T(lt.location+F);n.bindBuffer(n.ARRAY_BUFFER,_t);for(let F=0;F<lt.locationSize;F++)R(lt.location+F,yt/lt.locationSize,Lt,dt,v*Dt,(J+yt/lt.locationSize*F)*Dt,Tt)}else{if(G.isInstancedBufferAttribute){for(let Ut=0;Ut<lt.locationSize;Ut++)I(lt.location+Ut,G.meshPerAttribute);V.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Ut=0;Ut<lt.locationSize;Ut++)T(lt.location+Ut);n.bindBuffer(n.ARRAY_BUFFER,_t);for(let Ut=0;Ut<lt.locationSize;Ut++)R(lt.location+Ut,yt/lt.locationSize,Lt,dt,yt*Dt,yt/lt.locationSize*Ut*Dt,Tt)}}else if(H!==void 0){let dt=H[ct];if(dt!==void 0)switch(dt.length){case 2:n.vertexAttrib2fv(lt.location,dt);break;case 3:n.vertexAttrib3fv(lt.location,dt);break;case 4:n.vertexAttrib4fv(lt.location,dt);break;default:n.vertexAttrib1fv(lt.location,dt)}}}}L()}function C(){b();for(let V in o){let U=o[V];for(let nt in U){let K=U[nt];for(let rt in K)g(K[rt].object),delete K[rt];delete U[nt]}delete o[V]}}function M(V){if(o[V.id]===void 0)return;let U=o[V.id];for(let nt in U){let K=U[nt];for(let rt in K)g(K[rt].object),delete K[rt];delete U[nt]}delete o[V.id]}function N(V){for(let U in o){let nt=o[U];if(nt[V.id]===void 0)continue;let K=nt[V.id];for(let rt in K)g(K[rt].object),delete K[rt];delete nt[V.id]}}function b(){Z(),h=!0,l!==c&&(l=c,d(l.object))}function Z(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:b,resetDefaultState:Z,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:N,initAttributes:x,enableAttribute:T,disableUnusedAttributes:L}}function H0(n,t,e,i){let s=i.isWebGL2,r;function a(h){r=h}function o(h,u){n.drawArrays(r,h,u),e.update(u,r,1)}function c(h,u,f){if(f===0)return;let d,g;if(s)d=n,g="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,h,u,f),e.update(u,r,f)}function l(h,u,f){if(f===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function V0(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,T=a||t.has("OES_texture_float"),I=x&&T,L=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:I,maxSamples:L}}function G0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Ke,o=new te,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{let S=r?0:i,x=S*4,T=m.clippingState||null;c.value=T,T=h(g,f,x,d);for(let I=0;I!==x;++I)T[I]=e[I];m.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,g){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=c.value,g!==!0||p===null){let m=d+_*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,T=d;x!==_;++x,T+=4)a.copy(u[x]).applyMatrix4(S,o),a.normal.toArray(p,T),p[T+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function W0(n){let t=new WeakMap;function e(a,o){return o===wl?a.mapping=As:o===Tl&&(a.mapping=Rs),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===wl||o===Tl)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Ol(c.height/2);return l.fromEquirectangularTexture(n,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Fa=class extends ka{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},bs=4,gh=[.125,.215,.35,.446,.526,.582],Di=20,dl=new Fa,_h=new jt,fl=null,pl=0,ml=0,Li=(1+Math.sqrt(5))/2,vs=1/Li,vh=[new $(1,1,1),new $(-1,1,1),new $(1,1,-1),new $(-1,1,-1),new $(0,Li,vs),new $(0,Li,-vs),new $(vs,0,Li),new $(-vs,0,Li),new $(Li,vs,0),new $(-Li,vs,0)],Ba=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,pl,ml),t.scissorTest=!1,ma(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===As||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:lr,format:wn,colorSpace:jn,depthBuffer:!1},s=xh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$0(r)),this._blurMaterial=X0(r,t,e)}return s}_compileMaterial(t){let e=new xe(this._lodPlanes[0],t);this._renderer.compile(e,dl)}_sceneToCubeUV(t,e,i,s){let o=new Xe(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(_h),h.toneMapping=pi,h.autoClear=!1;let d=new je({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),g=new xe(new Bi,d),_=!1,p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(_h),_=!0);for(let m=0;m<6;m++){let S=m%3;S===0?(o.up.set(0,c[m],0),o.lookAt(l[m],0,0)):S===1?(o.up.set(0,0,c[m]),o.lookAt(0,l[m],0)):(o.up.set(0,c[m],0),o.lookAt(0,0,l[m]));let x=this._cubeSize;ma(s,S*x,m>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===As||t.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new xe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;ma(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,dl)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=vh[(s-1)%vh.length];this._blur(t,s-1,s,r,a)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new xe(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Di-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Di;p>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Di}`);let m=[],S=0;for(let R=0;R<Di;++R){let j=R/_,C=Math.exp(-j*j/2);m.push(C),R===0?S+=C:R<p&&(S+=2*C)}for(let R=0;R<m.length;R++)m[R]=m[R]/S;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;let T=this._sizeLods[s],I=3*T*(s>x-bs?s-x+bs:0),L=4*(this._cubeSize-T);ma(e,I,L,3*T,2*T),c.setRenderTarget(e),c.render(u,dl)}};function $0(n){let t=[],e=[],i=[],s=n,r=n-bs+1+gh.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>n-bs?c=gh[a-n+bs-1]:a===0&&(c=0),i.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,p=2,m=1,S=new Float32Array(_*g*d),x=new Float32Array(p*g*d),T=new Float32Array(m*g*d);for(let L=0;L<d;L++){let R=L%3*2/3-1,j=L>2?0:-1,C=[R,j,0,R+2/3,j,0,R+2/3,j+1,0,R,j,0,R+2/3,j+1,0,R,j+1,0];S.set(C,_*g*L),x.set(f,p*g*L);let M=[L,L,L,L,L,L];T.set(M,m*g*L)}let I=new he;I.setAttribute("position",new Qe(S,_)),I.setAttribute("uv",new Qe(x,p)),I.setAttribute("faceIndex",new Qe(T,m)),t.push(I),s>bs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function xh(n,t,e){let i=new qn(n,t,e);return i.texture.mapping=no,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ma(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function X0(n,t,e){let i=new Float32Array(Di),s=new $(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function yh(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function bh(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function yc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function j0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let c=o.mapping,l=c===wl||c===Tl,h=c===As||c===Rs;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new Ba(n)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Ba(n));let f=l?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function q0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){let s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Y0(n,t,e,i){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)t.update(f[g],n.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let _=d[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],n.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,g=u.attributes.position,_=0;if(d!==null){let S=d.array;_=d.version;for(let x=0,T=S.length;x<T;x+=3){let I=S[x+0],L=S[x+1],R=S[x+2];f.push(I,L,L,R,R,I)}}else if(g!==void 0){let S=g.array;_=g.version;for(let x=0,T=S.length/3-1;x<T;x+=3){let I=x+0,L=x+1,R=x+2;f.push(I,L,L,R,R,I)}}else return;let p=new(ud(f)?Na:Oa)(f,1);p.version=_;let m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Z0(n,t,e,i){let s=i.isWebGL2,r;function a(d){r=d}let o,c;function l(d){o=d.type,c=d.bytesPerElement}function h(d,g){n.drawElements(r,g,o,d*c),e.update(g,r,1)}function u(d,g,_){if(_===0)return;let p,m;if(s)p=n,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,o,d*c,_),e.update(g,r,_)}function f(d,g,_){if(_===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(d[m]/c,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,o,d,0,_);let m=0;for(let S=0;S<_;S++)m+=g[S];e.update(m,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function K0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function J0(n,t){return n[0]-t[0]}function Q0(n,t){return Math.abs(t[1])-Math.abs(n[1])}function t_(n,t,e){let i={},s=new Float32Array(8),r=new WeakMap,a=new Ie,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(t.isWebGL2===!0){let d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=d!==void 0?d.length:0,_=r.get(h);if(_===void 0||_.count!==g){let V=function(){b.dispose(),r.delete(h),h.removeEventListener("dispose",V)};_!==void 0&&_.texture.dispose();let S=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,I=h.morphAttributes.position||[],L=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],j=0;S===!0&&(j=1),x===!0&&(j=2),T===!0&&(j=3);let C=h.attributes.position.count*j,M=1;C>t.maxTextureSize&&(M=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);let N=new Float32Array(C*M*4*g),b=new Da(N,C,M,g);b.type=di,b.needsUpdate=!0;let Z=j*4;for(let U=0;U<g;U++){let nt=I[U],K=L[U],rt=R[U],k=C*M*4*U;for(let H=0;H<nt.count;H++){let ct=H*Z;S===!0&&(a.fromBufferAttribute(nt,H),N[k+ct+0]=a.x,N[k+ct+1]=a.y,N[k+ct+2]=a.z,N[k+ct+3]=0),x===!0&&(a.fromBufferAttribute(K,H),N[k+ct+4]=a.x,N[k+ct+5]=a.y,N[k+ct+6]=a.z,N[k+ct+7]=0),T===!0&&(a.fromBufferAttribute(rt,H),N[k+ct+8]=a.x,N[k+ct+9]=a.y,N[k+ct+10]=a.z,N[k+ct+11]=rt.itemSize===4?a.w:1)}}_={count:g,texture:b,size:new St(C,M)},r.set(h,_),h.addEventListener("dispose",V)}let p=0;for(let S=0;S<f.length;S++)p+=f[S];let m=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",m),u.getUniforms().setValue(n,"morphTargetInfluences",f),u.getUniforms().setValue(n,"morphTargetsTexture",_.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",_.size)}else{let d=f===void 0?0:f.length,g=i[h.id];if(g===void 0||g.length!==d){g=[];for(let x=0;x<d;x++)g[x]=[x,0];i[h.id]=g}for(let x=0;x<d;x++){let T=g[x];T[0]=x,T[1]=f[x]}g.sort(Q0);for(let x=0;x<8;x++)x<d&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(J0);let _=h.morphAttributes.position,p=h.morphAttributes.normal,m=0;for(let x=0;x<8;x++){let T=o[x],I=T[0],L=T[1];I!==Number.MAX_SAFE_INTEGER&&L?(_&&h.getAttribute("morphTarget"+x)!==_[I]&&h.setAttribute("morphTarget"+x,_[I]),p&&h.getAttribute("morphNormal"+x)!==p[I]&&h.setAttribute("morphNormal"+x,p[I]),s[x]=L,m+=L):(_&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),p&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let S=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",S),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function e_(n,t,e,i){let s=new WeakMap;function r(c){let l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}var za=class extends mn{constructor(t,e,i,s,r,a,o,c,l,h){if(h=h!==void 0?h:Ni,h!==Ni&&h!==Cs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ni&&(i=hi),i===void 0&&h===Cs&&(i=Oi),super(null,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:$e,this.minFilter=c!==void 0?c:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},pd=new mn,md=new za(1,1);md.compareFunction=ld;var gd=new Da,_d=new Il,vd=new Ua,Mh=[],Sh=[],Eh=new Float32Array(16),wh=new Float32Array(9),Th=new Float32Array(4);function Os(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Mh[s];if(r===void 0&&(r=new Float32Array(s),Mh[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Te(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function so(n,t){let e=Sh[t];e===void 0&&(e=new Int32Array(t),Sh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function n_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function i_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Te(e,t)}}function s_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Te(e,t)}}function r_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Te(e,t)}}function a_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Th.set(i),n.uniformMatrix2fv(this.addr,!1,Th),Te(e,i)}}function o_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;wh.set(i),n.uniformMatrix3fv(this.addr,!1,wh),Te(e,i)}}function l_(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Eh.set(i),n.uniformMatrix4fv(this.addr,!1,Eh),Te(e,i)}}function c_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function u_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Te(e,t)}}function h_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Te(e,t)}}function d_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Te(e,t)}}function f_(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function p_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Te(e,t)}}function m_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Te(e,t)}}function g_(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Te(e,t)}}function __(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?md:pd;e.setTexture2D(t||r,s)}function v_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||_d,s)}function x_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||vd,s)}function y_(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||gd,s)}function b_(n){switch(n){case 5126:return n_;case 35664:return i_;case 35665:return s_;case 35666:return r_;case 35674:return a_;case 35675:return o_;case 35676:return l_;case 5124:case 35670:return c_;case 35667:case 35671:return u_;case 35668:case 35672:return h_;case 35669:case 35673:return d_;case 5125:return f_;case 36294:return p_;case 36295:return m_;case 36296:return g_;case 35678:case 36198:case 36298:case 36306:case 35682:return __;case 35679:case 36299:case 36307:return v_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return y_}}function M_(n,t){n.uniform1fv(this.addr,t)}function S_(n,t){let e=Os(t,this.size,2);n.uniform2fv(this.addr,e)}function E_(n,t){let e=Os(t,this.size,3);n.uniform3fv(this.addr,e)}function w_(n,t){let e=Os(t,this.size,4);n.uniform4fv(this.addr,e)}function T_(n,t){let e=Os(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function A_(n,t){let e=Os(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function R_(n,t){let e=Os(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function C_(n,t){n.uniform1iv(this.addr,t)}function P_(n,t){n.uniform2iv(this.addr,t)}function L_(n,t){n.uniform3iv(this.addr,t)}function I_(n,t){n.uniform4iv(this.addr,t)}function D_(n,t){n.uniform1uiv(this.addr,t)}function O_(n,t){n.uniform2uiv(this.addr,t)}function N_(n,t){n.uniform3uiv(this.addr,t)}function k_(n,t){n.uniform4uiv(this.addr,t)}function U_(n,t,e){let i=this.cache,s=t.length,r=so(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||pd,r[a])}function F_(n,t,e){let i=this.cache,s=t.length,r=so(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||_d,r[a])}function B_(n,t,e){let i=this.cache,s=t.length,r=so(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||vd,r[a])}function z_(n,t,e){let i=this.cache,s=t.length,r=so(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||gd,r[a])}function H_(n){switch(n){case 5126:return M_;case 35664:return S_;case 35665:return E_;case 35666:return w_;case 35674:return T_;case 35675:return A_;case 35676:return R_;case 5124:case 35670:return C_;case 35667:case 35671:return P_;case 35668:case 35672:return L_;case 35669:case 35673:return I_;case 5125:return D_;case 36294:return O_;case 36295:return N_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return U_;case 35679:case 36299:case 36307:return F_;case 35680:case 36300:case 36308:case 36293:return B_;case 36289:case 36303:case 36311:case 36292:return z_}}var Nl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=b_(e.type)}},kl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=H_(e.type)}},Ul=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},gl=/(\w+)(\])?(\[|\.)?/g;function Ah(n,t){n.seq.push(t),n.map[t.id]=t}function V_(n,t,e){let i=n.name,s=i.length;for(gl.lastIndex=0;;){let r=gl.exec(i),a=gl.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ah(e,l===void 0?new Nl(o,n,t):new kl(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Ul(o),Ah(e,u)),e=u}}}var Ts=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);V_(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Rh(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var G_=37297,W_=0;function $_(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function X_(n){let t=ae.getPrimaries(ae.workingColorSpace),e=ae.getPrimaries(n),i;switch(t===e?i="":t===Aa&&e===Ta?i="LinearDisplayP3ToLinearSRGB":t===Ta&&e===Aa&&(i="LinearSRGBToLinearDisplayP3"),n){case jn:case io:return[i,"LinearTransferOETF"];case Ne:case vc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ch(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+$_(n.getShaderSource(t),a)}else return s}function j_(n,t){let e=X_(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function q_(n,t){let e;switch(t){case tp:e="Linear";break;case ep:e="Reinhard";break;case np:e="OptimizedCineon";break;case gc:e="ACESFilmic";break;case sp:e="AgX";break;case ip:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Y_(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ms).join(`
`)}function Z_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ms).join(`
`)}function K_(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function J_(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ms(n){return n!==""}function Ph(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fl(n){return n.replace(Q_,ev)}var tv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ev(n,t){let e=Yt[t];if(e===void 0){let i=tv.get(t);if(i!==void 0)e=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Fl(e)}var nv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(n){return n.replace(nv,iv)}function iv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dh(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sv(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Zh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===mc?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$n&&(t="SHADOWMAP_TYPE_VSM"),t}function rv(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case As:case Rs:t="ENVMAP_TYPE_CUBE";break;case no:t="ENVMAP_TYPE_CUBE_UV";break}return t}function av(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Rs:t="ENVMAP_MODE_REFRACTION";break}return t}function ov(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Kh:t="ENVMAP_BLENDING_MULTIPLY";break;case Jf:t="ENVMAP_BLENDING_MIX";break;case Qf:t="ENVMAP_BLENDING_ADD";break}return t}function lv(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function cv(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=sv(e),l=rv(e),h=av(e),u=ov(e),f=lv(e),d=e.isWebGL2?"":Y_(e),g=Z_(e),_=K_(r),p=s.createProgram(),m,S,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ms).join(`
`),m.length>0&&(m+=`
`),S=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Ms).join(`
`),S.length>0&&(S+=`
`)):(m=[Dh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),S=[d,Dh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==pi?"#define TONE_MAPPING":"",e.toneMapping!==pi?Yt.tonemapping_pars_fragment:"",e.toneMapping!==pi?q_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,j_("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),a=Fl(a),a=Ph(a,e),a=Lh(a,e),o=Fl(o),o=Ph(o,e),o=Lh(o,e),a=Ih(a),o=Ih(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,S=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Ju?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ju?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);let T=x+m+a,I=x+S+o,L=Rh(s,s.VERTEX_SHADER,T),R=Rh(s,s.FRAGMENT_SHADER,I);s.attachShader(p,L),s.attachShader(p,R),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function j(b){if(n.debug.checkShaderErrors){let Z=s.getProgramInfoLog(p).trim(),V=s.getShaderInfoLog(L).trim(),U=s.getShaderInfoLog(R).trim(),nt=!0,K=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(nt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,L,R);else{let rt=Ch(s,L,"vertex"),k=Ch(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+Z+`
`+rt+`
`+k)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(V===""||U==="")&&(K=!1);K&&(b.diagnostics={runnable:nt,programLog:Z,vertexShader:{log:V,prefix:m},fragmentShader:{log:U,prefix:S}})}s.deleteShader(L),s.deleteShader(R),C=new Ts(s,p),M=J_(s,p)}let C;this.getUniforms=function(){return C===void 0&&j(this),C};let M;this.getAttributes=function(){return M===void 0&&j(this),M};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(p,G_)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=W_++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=L,this.fragmentShader=R,this}var uv=0,Bl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new zl(t),e.set(t,i)),i}},zl=class{constructor(t){this.id=uv++,this.code=t,this.usedTimes=0}};function hv(n,t,e,i,s,r,a){let o=new ur,c=new Bl,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(C){return C===0?"uv":`uv${C}`}function p(C,M,N,b,Z){let V=b.fog,U=Z.geometry,nt=C.isMeshStandardMaterial?b.environment:null,K=(C.isMeshStandardMaterial?e:t).get(C.envMap||nt),rt=K&&K.mapping===no?K.image.height:null,k=g[C.type];C.precision!==null&&(d=s.getMaxPrecision(C.precision),d!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",d,"instead."));let H=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ct=H!==void 0?H.length:0,lt=0;U.morphAttributes.position!==void 0&&(lt=1),U.morphAttributes.normal!==void 0&&(lt=2),U.morphAttributes.color!==void 0&&(lt=3);let G,dt,yt,xt;if(k){let He=On[k];G=He.vertexShader,dt=He.fragmentShader}else G=C.vertexShader,dt=C.fragmentShader,c.update(C),yt=c.getVertexShaderID(C),xt=c.getFragmentShaderID(C);let _t=n.getRenderTarget(),Lt=Z.isInstancedMesh===!0,Dt=Z.isBatchedMesh===!0,Tt=!!C.map,Ut=!!C.matcap,v=!!K,J=!!C.aoMap,F=!!C.lightMap,P=!!C.bumpMap,w=!!C.normalMap,W=!!C.displacementMap,tt=!!C.emissiveMap,E=!!C.metalnessMap,y=!!C.roughnessMap,z=C.anisotropy>0,st=C.clearcoat>0,Q=C.iridescence>0,ot=C.sheen>0,Et=C.transmission>0,pt=z&&!!C.anisotropyMap,Rt=st&&!!C.clearcoatMap,Ft=st&&!!C.clearcoatNormalMap,zt=st&&!!C.clearcoatRoughnessMap,gt=Q&&!!C.iridescenceMap,D=Q&&!!C.iridescenceThicknessMap,A=ot&&!!C.sheenColorMap,q=ot&&!!C.sheenRoughnessMap,Y=!!C.specularMap,et=!!C.specularColorMap,mt=!!C.specularIntensityMap,wt=Et&&!!C.transmissionMap,It=Et&&!!C.thicknessMap,Nt=!!C.gradientMap,vt=!!C.alphaMap,X=C.alphaTest>0,bt=!!C.alphaHash,Mt=!!C.extensions,Bt=!!U.attributes.uv1,kt=!!U.attributes.uv2,$t=!!U.attributes.uv3,ie=pi;return C.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(ie=n.toneMapping),{isWebGL2:h,shaderID:k,shaderType:C.type,shaderName:C.name,vertexShader:G,fragmentShader:dt,defines:C.defines,customVertexShaderID:yt,customFragmentShaderID:xt,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:d,batching:Dt,instancing:Lt,instancingColor:Lt&&Z.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:_t===null?n.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:jn,map:Tt,matcap:Ut,envMap:v,envMapMode:v&&K.mapping,envMapCubeUVHeight:rt,aoMap:J,lightMap:F,bumpMap:P,normalMap:w,displacementMap:f&&W,emissiveMap:tt,normalMapObjectSpace:w&&C.normalMapType===gp,normalMapTangentSpace:w&&C.normalMapType===od,metalnessMap:E,roughnessMap:y,anisotropy:z,anisotropyMap:pt,clearcoat:st,clearcoatMap:Rt,clearcoatNormalMap:Ft,clearcoatRoughnessMap:zt,iridescence:Q,iridescenceMap:gt,iridescenceThicknessMap:D,sheen:ot,sheenColorMap:A,sheenRoughnessMap:q,specularMap:Y,specularColorMap:et,specularIntensityMap:mt,transmission:Et,transmissionMap:wt,thicknessMap:It,gradientMap:Nt,opaque:C.transparent===!1&&C.blending===Es,alphaMap:vt,alphaTest:X,alphaHash:bt,combine:C.combine,mapUv:Tt&&_(C.map.channel),aoMapUv:J&&_(C.aoMap.channel),lightMapUv:F&&_(C.lightMap.channel),bumpMapUv:P&&_(C.bumpMap.channel),normalMapUv:w&&_(C.normalMap.channel),displacementMapUv:W&&_(C.displacementMap.channel),emissiveMapUv:tt&&_(C.emissiveMap.channel),metalnessMapUv:E&&_(C.metalnessMap.channel),roughnessMapUv:y&&_(C.roughnessMap.channel),anisotropyMapUv:pt&&_(C.anisotropyMap.channel),clearcoatMapUv:Rt&&_(C.clearcoatMap.channel),clearcoatNormalMapUv:Ft&&_(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:zt&&_(C.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&_(C.iridescenceMap.channel),iridescenceThicknessMapUv:D&&_(C.iridescenceThicknessMap.channel),sheenColorMapUv:A&&_(C.sheenColorMap.channel),sheenRoughnessMapUv:q&&_(C.sheenRoughnessMap.channel),specularMapUv:Y&&_(C.specularMap.channel),specularColorMapUv:et&&_(C.specularColorMap.channel),specularIntensityMapUv:mt&&_(C.specularIntensityMap.channel),transmissionMapUv:wt&&_(C.transmissionMap.channel),thicknessMapUv:It&&_(C.thicknessMap.channel),alphaMapUv:vt&&_(C.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(w||z),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Bt,vertexUv2s:kt,vertexUv3s:$t,pointsUvs:Z.isPoints===!0&&!!U.attributes.uv&&(Tt||vt),fog:!!V,useFog:C.fog===!0,fogExp2:V&&V.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Z.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ct,morphTextureStride:lt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:C.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ie,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Tt&&C.map.isVideoTexture===!0&&ae.getTransfer(C.map.colorSpace)===ce,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Sn,flipSided:C.side===Je,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionDerivatives:Mt&&C.extensions.derivatives===!0,extensionFragDepth:Mt&&C.extensions.fragDepth===!0,extensionDrawBuffers:Mt&&C.extensions.drawBuffers===!0,extensionShaderTextureLOD:Mt&&C.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Mt&&C.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()}}function m(C){let M=[];if(C.shaderID?M.push(C.shaderID):(M.push(C.customVertexShaderID),M.push(C.customFragmentShaderID)),C.defines!==void 0)for(let N in C.defines)M.push(N),M.push(C.defines[N]);return C.isRawShaderMaterial===!1&&(S(M,C),x(M,C),M.push(n.outputColorSpace)),M.push(C.customProgramCacheKey),M.join()}function S(C,M){C.push(M.precision),C.push(M.outputColorSpace),C.push(M.envMapMode),C.push(M.envMapCubeUVHeight),C.push(M.mapUv),C.push(M.alphaMapUv),C.push(M.lightMapUv),C.push(M.aoMapUv),C.push(M.bumpMapUv),C.push(M.normalMapUv),C.push(M.displacementMapUv),C.push(M.emissiveMapUv),C.push(M.metalnessMapUv),C.push(M.roughnessMapUv),C.push(M.anisotropyMapUv),C.push(M.clearcoatMapUv),C.push(M.clearcoatNormalMapUv),C.push(M.clearcoatRoughnessMapUv),C.push(M.iridescenceMapUv),C.push(M.iridescenceThicknessMapUv),C.push(M.sheenColorMapUv),C.push(M.sheenRoughnessMapUv),C.push(M.specularMapUv),C.push(M.specularColorMapUv),C.push(M.specularIntensityMapUv),C.push(M.transmissionMapUv),C.push(M.thicknessMapUv),C.push(M.combine),C.push(M.fogExp2),C.push(M.sizeAttenuation),C.push(M.morphTargetsCount),C.push(M.morphAttributeCount),C.push(M.numDirLights),C.push(M.numPointLights),C.push(M.numSpotLights),C.push(M.numSpotLightMaps),C.push(M.numHemiLights),C.push(M.numRectAreaLights),C.push(M.numDirLightShadows),C.push(M.numPointLightShadows),C.push(M.numSpotLightShadows),C.push(M.numSpotLightShadowsWithMaps),C.push(M.numLightProbes),C.push(M.shadowMapType),C.push(M.toneMapping),C.push(M.numClippingPlanes),C.push(M.numClipIntersection),C.push(M.depthPacking)}function x(C,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),C.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),C.push(o.mask)}function T(C){let M=g[C.type],N;if(M){let b=On[M];N=tm.clone(b.uniforms)}else N=C.uniforms;return N}function I(C,M){let N;for(let b=0,Z=l.length;b<Z;b++){let V=l[b];if(V.cacheKey===M){N=V,++N.usedTimes;break}}return N===void 0&&(N=new cv(n,M,C,r),l.push(N)),N}function L(C){if(--C.usedTimes===0){let M=l.indexOf(C);l[M]=l[l.length-1],l.pop(),C.destroy()}}function R(C){c.remove(C)}function j(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:T,acquireProgram:I,releaseProgram:L,releaseShaderCache:R,programs:l,dispose:j}}function dv(){let n=new WeakMap;function t(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function e(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function fv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Oh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Nh(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,d,g,_,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function o(u,f,d,g,_,p){let m=a(u,f,d,g,_,p);d.transmission>0?i.push(m):d.transparent===!0?s.push(m):e.push(m)}function c(u,f,d,g,_,p){let m=a(u,f,d,g,_,p);d.transmission>0?i.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,f){e.length>1&&e.sort(u||fv),i.length>1&&i.sort(f||Oh),s.length>1&&s.sort(f||Oh)}function h(){for(let u=t,f=n.length;u<f;u++){let d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function pv(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Nh,n.set(i,[a])):s>=r.length?(a=new Nh,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function mv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new $,color:new jt};break;case"SpotLight":e={position:new $,direction:new $,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new $,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new $,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new $,halfWidth:new $,halfHeight:new $};break}return n[t.id]=e,e}}}function gv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var _v=0;function vv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function xv(n,t){let e=new mv,i=gv(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new $);let r=new $,a=new ue,o=new ue;function c(h,u){let f=0,d=0,g=0;for(let b=0;b<9;b++)s.probe[b].set(0,0,0);let _=0,p=0,m=0,S=0,x=0,T=0,I=0,L=0,R=0,j=0,C=0;h.sort(vv);let M=u===!0?Math.PI:1;for(let b=0,Z=h.length;b<Z;b++){let V=h[b],U=V.color,nt=V.intensity,K=V.distance,rt=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)f+=U.r*nt*M,d+=U.g*nt*M,g+=U.b*nt*M;else if(V.isLightProbe){for(let k=0;k<9;k++)s.probe[k].addScaledVector(V.sh.coefficients[k],nt);C++}else if(V.isDirectionalLight){let k=e.get(V);if(k.color.copy(V.color).multiplyScalar(V.intensity*M),V.castShadow){let H=V.shadow,ct=i.get(V);ct.shadowBias=H.bias,ct.shadowNormalBias=H.normalBias,ct.shadowRadius=H.radius,ct.shadowMapSize=H.mapSize,s.directionalShadow[_]=ct,s.directionalShadowMap[_]=rt,s.directionalShadowMatrix[_]=V.shadow.matrix,T++}s.directional[_]=k,_++}else if(V.isSpotLight){let k=e.get(V);k.position.setFromMatrixPosition(V.matrixWorld),k.color.copy(U).multiplyScalar(nt*M),k.distance=K,k.coneCos=Math.cos(V.angle),k.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),k.decay=V.decay,s.spot[m]=k;let H=V.shadow;if(V.map&&(s.spotLightMap[R]=V.map,R++,H.updateMatrices(V),V.castShadow&&j++),s.spotLightMatrix[m]=H.matrix,V.castShadow){let ct=i.get(V);ct.shadowBias=H.bias,ct.shadowNormalBias=H.normalBias,ct.shadowRadius=H.radius,ct.shadowMapSize=H.mapSize,s.spotShadow[m]=ct,s.spotShadowMap[m]=rt,L++}m++}else if(V.isRectAreaLight){let k=e.get(V);k.color.copy(U).multiplyScalar(nt),k.halfWidth.set(V.width*.5,0,0),k.halfHeight.set(0,V.height*.5,0),s.rectArea[S]=k,S++}else if(V.isPointLight){let k=e.get(V);if(k.color.copy(V.color).multiplyScalar(V.intensity*M),k.distance=V.distance,k.decay=V.decay,V.castShadow){let H=V.shadow,ct=i.get(V);ct.shadowBias=H.bias,ct.shadowNormalBias=H.normalBias,ct.shadowRadius=H.radius,ct.shadowMapSize=H.mapSize,ct.shadowCameraNear=H.camera.near,ct.shadowCameraFar=H.camera.far,s.pointShadow[p]=ct,s.pointShadowMap[p]=rt,s.pointShadowMatrix[p]=V.shadow.matrix,I++}s.point[p]=k,p++}else if(V.isHemisphereLight){let k=e.get(V);k.skyColor.copy(V.color).multiplyScalar(nt*M),k.groundColor.copy(V.groundColor).multiplyScalar(nt*M),s.hemi[x]=k,x++}}S>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ct.LTC_FLOAT_1,s.rectAreaLTC2=Ct.LTC_FLOAT_2):(s.rectAreaLTC1=Ct.LTC_HALF_1,s.rectAreaLTC2=Ct.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ct.LTC_FLOAT_1,s.rectAreaLTC2=Ct.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=Ct.LTC_HALF_1,s.rectAreaLTC2=Ct.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=d,s.ambient[2]=g;let N=s.hash;(N.directionalLength!==_||N.pointLength!==p||N.spotLength!==m||N.rectAreaLength!==S||N.hemiLength!==x||N.numDirectionalShadows!==T||N.numPointShadows!==I||N.numSpotShadows!==L||N.numSpotMaps!==R||N.numLightProbes!==C)&&(s.directional.length=_,s.spot.length=m,s.rectArea.length=S,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=L,s.spotShadowMap.length=L,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=L+R-j,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=j,s.numLightProbes=C,N.directionalLength=_,N.pointLength=p,N.spotLength=m,N.rectAreaLength=S,N.hemiLength=x,N.numDirectionalShadows=T,N.numPointShadows=I,N.numSpotShadows=L,N.numSpotMaps=R,N.numLightProbes=C,s.version=_v++)}function l(h,u){let f=0,d=0,g=0,_=0,p=0,m=u.matrixWorldInverse;for(let S=0,x=h.length;S<x;S++){let T=h[S];if(T.isDirectionalLight){let I=s.directional[f];I.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(m),f++}else if(T.isSpotLight){let I=s.spot[g];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(m),I.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(m),g++}else if(T.isRectAreaLight){let I=s.rectArea[_];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(m),o.identity(),a.copy(T.matrixWorld),a.premultiply(m),o.extractRotation(a),I.halfWidth.set(T.width*.5,0,0),I.halfHeight.set(0,T.height*.5,0),I.halfWidth.applyMatrix4(o),I.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){let I=s.point[d];I.position.setFromMatrixPosition(T.matrixWorld),I.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){let I=s.hemi[p];I.direction.setFromMatrixPosition(T.matrixWorld),I.direction.transformDirection(m),p++}}}return{setup:c,setupView:l,state:s}}function kh(n,t){let e=new xv(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function a(u){i.push(u)}function o(u){s.push(u)}function c(u){e.setup(i,u)}function l(u){e.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function yv(n,t){let e=new WeakMap;function i(r,a=0){let o=e.get(r),c;return o===void 0?(c=new kh(n,t),e.set(r,[c])):a>=o.length?(c=new kh(n,t),o.push(c)):c=o[a],c}function s(){e=new WeakMap}return{get:i,dispose:s}}var Hl=class extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Vl=class extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Sv(n,t,e){let i=new hr,s=new St,r=new St,a=new Ie,o=new Hl({depthPacking:mp}),c=new Vl,l={},h=e.maxTextureSize,u={[gi]:Je,[Je]:gi,[Sn]:Sn},f=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:bv,fragmentShader:Mv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new he;g.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new xe(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zh;let m=this.type;this.render=function(L,R,j){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||L.length===0)return;let C=n.getRenderTarget(),M=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),b=n.state;b.setBlending(fi),b.buffers.color.setClear(1,1,1,1),b.buffers.depth.setTest(!0),b.setScissorTest(!1);let Z=m!==$n&&this.type===$n,V=m===$n&&this.type!==$n;for(let U=0,nt=L.length;U<nt;U++){let K=L[U],rt=K.shadow;if(rt===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(rt.autoUpdate===!1&&rt.needsUpdate===!1)continue;s.copy(rt.mapSize);let k=rt.getFrameExtents();if(s.multiply(k),r.copy(rt.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/k.x),s.x=r.x*k.x,rt.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/k.y),s.y=r.y*k.y,rt.mapSize.y=r.y)),rt.map===null||Z===!0||V===!0){let ct=this.type!==$n?{minFilter:$e,magFilter:$e}:{};rt.map!==null&&rt.map.dispose(),rt.map=new qn(s.x,s.y,ct),rt.map.texture.name=K.name+".shadowMap",rt.camera.updateProjectionMatrix()}n.setRenderTarget(rt.map),n.clear();let H=rt.getViewportCount();for(let ct=0;ct<H;ct++){let lt=rt.getViewport(ct);a.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),b.viewport(a),rt.updateMatrices(K,ct),i=rt.getFrustum(),T(R,j,rt.camera,K,this.type)}rt.isPointLightShadow!==!0&&this.type===$n&&S(rt,j),rt.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(C,M,N)};function S(L,R){let j=t.update(_);f.defines.VSM_SAMPLES!==L.blurSamples&&(f.defines.VSM_SAMPLES=L.blurSamples,d.defines.VSM_SAMPLES=L.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new qn(s.x,s.y)),f.uniforms.shadow_pass.value=L.map.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(R,null,j,f,_,null),d.uniforms.shadow_pass.value=L.mapPass.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(R,null,j,d,_,null)}function x(L,R,j,C){let M=null,N=j.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(N!==void 0)M=N;else if(M=j.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let b=M.uuid,Z=R.uuid,V=l[b];V===void 0&&(V={},l[b]=V);let U=V[Z];U===void 0&&(U=M.clone(),V[Z]=U,R.addEventListener("dispose",I)),M=U}if(M.visible=R.visible,M.wireframe=R.wireframe,C===$n?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,j.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let b=n.properties.get(M);b.light=j}return M}function T(L,R,j,C,M){if(L.visible===!1)return;if(L.layers.test(R.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&M===$n)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,L.matrixWorld);let Z=t.update(L),V=L.material;if(Array.isArray(V)){let U=Z.groups;for(let nt=0,K=U.length;nt<K;nt++){let rt=U[nt],k=V[rt.materialIndex];if(k&&k.visible){let H=x(L,k,C,M);L.onBeforeShadow(n,L,R,j,Z,H,rt),n.renderBufferDirect(j,null,Z,H,L,rt),L.onAfterShadow(n,L,R,j,Z,H,rt)}}}else if(V.visible){let U=x(L,V,C,M);L.onBeforeShadow(n,L,R,j,Z,U,null),n.renderBufferDirect(j,null,Z,U,L,null),L.onAfterShadow(n,L,R,j,Z,U,null)}}let b=L.children;for(let Z=0,V=b.length;Z<V;Z++)T(b[Z],R,j,C,M)}function I(L){L.target.removeEventListener("dispose",I);for(let j in l){let C=l[j],M=L.target.uuid;M in C&&(C[M].dispose(),delete C[M])}}}function Ev(n,t,e){let i=e.isWebGL2;function s(){let X=!1,bt=new Ie,Mt=null,Bt=new Ie(0,0,0,0);return{setMask:function(kt){Mt!==kt&&!X&&(n.colorMask(kt,kt,kt,kt),Mt=kt)},setLocked:function(kt){X=kt},setClear:function(kt,$t,ie,Re,He){He===!0&&(kt*=Re,$t*=Re,ie*=Re),bt.set(kt,$t,ie,Re),Bt.equals(bt)===!1&&(n.clearColor(kt,$t,ie,Re),Bt.copy(bt))},reset:function(){X=!1,Mt=null,Bt.set(-1,0,0,0)}}}function r(){let X=!1,bt=null,Mt=null,Bt=null;return{setTest:function(kt){kt?Dt(n.DEPTH_TEST):Tt(n.DEPTH_TEST)},setMask:function(kt){bt!==kt&&!X&&(n.depthMask(kt),bt=kt)},setFunc:function(kt){if(Mt!==kt){switch(kt){case $f:n.depthFunc(n.NEVER);break;case Xf:n.depthFunc(n.ALWAYS);break;case jf:n.depthFunc(n.LESS);break;case Ma:n.depthFunc(n.LEQUAL);break;case qf:n.depthFunc(n.EQUAL);break;case Yf:n.depthFunc(n.GEQUAL);break;case Zf:n.depthFunc(n.GREATER);break;case Kf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Mt=kt}},setLocked:function(kt){X=kt},setClear:function(kt){Bt!==kt&&(n.clearDepth(kt),Bt=kt)},reset:function(){X=!1,bt=null,Mt=null,Bt=null}}}function a(){let X=!1,bt=null,Mt=null,Bt=null,kt=null,$t=null,ie=null,Re=null,He=null;return{setTest:function(le){X||(le?Dt(n.STENCIL_TEST):Tt(n.STENCIL_TEST))},setMask:function(le){bt!==le&&!X&&(n.stencilMask(le),bt=le)},setFunc:function(le,Ve,Dn){(Mt!==le||Bt!==Ve||kt!==Dn)&&(n.stencilFunc(le,Ve,Dn),Mt=le,Bt=Ve,kt=Dn)},setOp:function(le,Ve,Dn){($t!==le||ie!==Ve||Re!==Dn)&&(n.stencilOp(le,Ve,Dn),$t=le,ie=Ve,Re=Dn)},setLocked:function(le){X=le},setClear:function(le){He!==le&&(n.clearStencil(le),He=le)},reset:function(){X=!1,bt=null,Mt=null,Bt=null,kt=null,$t=null,ie=null,Re=null,He=null}}}let o=new s,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},d={},g=new WeakMap,_=[],p=null,m=!1,S=null,x=null,T=null,I=null,L=null,R=null,j=null,C=new jt(0,0,0),M=0,N=!1,b=null,Z=null,V=null,U=null,nt=null,K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),rt=!1,k=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(H)[1]),rt=k>=1):H.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),rt=k>=2);let ct=null,lt={},G=n.getParameter(n.SCISSOR_BOX),dt=n.getParameter(n.VIEWPORT),yt=new Ie().fromArray(G),xt=new Ie().fromArray(dt);function _t(X,bt,Mt,Bt){let kt=new Uint8Array(4),$t=n.createTexture();n.bindTexture(X,$t),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ie=0;ie<Mt;ie++)i&&(X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY)?n.texImage3D(bt,0,n.RGBA,1,1,Bt,0,n.RGBA,n.UNSIGNED_BYTE,kt):n.texImage2D(bt+ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,kt);return $t}let Lt={};Lt[n.TEXTURE_2D]=_t(n.TEXTURE_2D,n.TEXTURE_2D,1),Lt[n.TEXTURE_CUBE_MAP]=_t(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Lt[n.TEXTURE_2D_ARRAY]=_t(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Lt[n.TEXTURE_3D]=_t(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Dt(n.DEPTH_TEST),c.setFunc(Ma),tt(!1),E(mu),Dt(n.CULL_FACE),w(fi);function Dt(X){f[X]!==!0&&(n.enable(X),f[X]=!0)}function Tt(X){f[X]!==!1&&(n.disable(X),f[X]=!1)}function Ut(X,bt){return d[X]!==bt?(n.bindFramebuffer(X,bt),d[X]=bt,i&&(X===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=bt),X===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=bt)),!0):!1}function v(X,bt){let Mt=_,Bt=!1;if(X)if(Mt=g.get(bt),Mt===void 0&&(Mt=[],g.set(bt,Mt)),X.isWebGLMultipleRenderTargets){let kt=X.texture;if(Mt.length!==kt.length||Mt[0]!==n.COLOR_ATTACHMENT0){for(let $t=0,ie=kt.length;$t<ie;$t++)Mt[$t]=n.COLOR_ATTACHMENT0+$t;Mt.length=kt.length,Bt=!0}}else Mt[0]!==n.COLOR_ATTACHMENT0&&(Mt[0]=n.COLOR_ATTACHMENT0,Bt=!0);else Mt[0]!==n.BACK&&(Mt[0]=n.BACK,Bt=!0);Bt&&(e.isWebGL2?n.drawBuffers(Mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Mt))}function J(X){return p!==X?(n.useProgram(X),p=X,!0):!1}let F={[Ii]:n.FUNC_ADD,[Pf]:n.FUNC_SUBTRACT,[Lf]:n.FUNC_REVERSE_SUBTRACT};if(i)F[xu]=n.MIN,F[yu]=n.MAX;else{let X=t.get("EXT_blend_minmax");X!==null&&(F[xu]=X.MIN_EXT,F[yu]=X.MAX_EXT)}let P={[If]:n.ZERO,[Df]:n.ONE,[Of]:n.SRC_COLOR,[Sl]:n.SRC_ALPHA,[zf]:n.SRC_ALPHA_SATURATE,[Ff]:n.DST_COLOR,[kf]:n.DST_ALPHA,[Nf]:n.ONE_MINUS_SRC_COLOR,[El]:n.ONE_MINUS_SRC_ALPHA,[Bf]:n.ONE_MINUS_DST_COLOR,[Uf]:n.ONE_MINUS_DST_ALPHA,[Hf]:n.CONSTANT_COLOR,[Vf]:n.ONE_MINUS_CONSTANT_COLOR,[Gf]:n.CONSTANT_ALPHA,[Wf]:n.ONE_MINUS_CONSTANT_ALPHA};function w(X,bt,Mt,Bt,kt,$t,ie,Re,He,le){if(X===fi){m===!0&&(Tt(n.BLEND),m=!1);return}if(m===!1&&(Dt(n.BLEND),m=!0),X!==Cf){if(X!==S||le!==N){if((x!==Ii||L!==Ii)&&(n.blendEquation(n.FUNC_ADD),x=Ii,L=Ii),le)switch(X){case Es:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gu:n.blendFunc(n.ONE,n.ONE);break;case _u:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Es:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case _u:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}T=null,I=null,R=null,j=null,C.set(0,0,0),M=0,S=X,N=le}return}kt=kt||bt,$t=$t||Mt,ie=ie||Bt,(bt!==x||kt!==L)&&(n.blendEquationSeparate(F[bt],F[kt]),x=bt,L=kt),(Mt!==T||Bt!==I||$t!==R||ie!==j)&&(n.blendFuncSeparate(P[Mt],P[Bt],P[$t],P[ie]),T=Mt,I=Bt,R=$t,j=ie),(Re.equals(C)===!1||He!==M)&&(n.blendColor(Re.r,Re.g,Re.b,He),C.copy(Re),M=He),S=X,N=!1}function W(X,bt){X.side===Sn?Tt(n.CULL_FACE):Dt(n.CULL_FACE);let Mt=X.side===Je;bt&&(Mt=!Mt),tt(Mt),X.blending===Es&&X.transparent===!1?w(fi):w(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),c.setFunc(X.depthFunc),c.setTest(X.depthTest),c.setMask(X.depthWrite),o.setMask(X.colorWrite);let Bt=X.stencilWrite;l.setTest(Bt),Bt&&(l.setMask(X.stencilWriteMask),l.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),l.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),z(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Dt(n.SAMPLE_ALPHA_TO_COVERAGE):Tt(n.SAMPLE_ALPHA_TO_COVERAGE)}function tt(X){b!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),b=X)}function E(X){X!==Af?(Dt(n.CULL_FACE),X!==Z&&(X===mu?n.cullFace(n.BACK):X===Rf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Tt(n.CULL_FACE),Z=X}function y(X){X!==V&&(rt&&n.lineWidth(X),V=X)}function z(X,bt,Mt){X?(Dt(n.POLYGON_OFFSET_FILL),(U!==bt||nt!==Mt)&&(n.polygonOffset(bt,Mt),U=bt,nt=Mt)):Tt(n.POLYGON_OFFSET_FILL)}function st(X){X?Dt(n.SCISSOR_TEST):Tt(n.SCISSOR_TEST)}function Q(X){X===void 0&&(X=n.TEXTURE0+K-1),ct!==X&&(n.activeTexture(X),ct=X)}function ot(X,bt,Mt){Mt===void 0&&(ct===null?Mt=n.TEXTURE0+K-1:Mt=ct);let Bt=lt[Mt];Bt===void 0&&(Bt={type:void 0,texture:void 0},lt[Mt]=Bt),(Bt.type!==X||Bt.texture!==bt)&&(ct!==Mt&&(n.activeTexture(Mt),ct=Mt),n.bindTexture(X,bt||Lt[X]),Bt.type=X,Bt.texture=bt)}function Et(){let X=lt[ct];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function pt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Rt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ft(){try{n.texSubImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function zt(){try{n.texSubImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function D(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function A(){try{n.texStorage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function q(){try{n.texStorage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Y(){try{n.texImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function et(){try{n.texImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function mt(X){yt.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),yt.copy(X))}function wt(X){xt.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),xt.copy(X))}function It(X,bt){let Mt=u.get(bt);Mt===void 0&&(Mt=new WeakMap,u.set(bt,Mt));let Bt=Mt.get(X);Bt===void 0&&(Bt=n.getUniformBlockIndex(bt,X.name),Mt.set(X,Bt))}function Nt(X,bt){let Bt=u.get(bt).get(X);h.get(bt)!==Bt&&(n.uniformBlockBinding(bt,Bt,X.__bindingPointIndex),h.set(bt,Bt))}function vt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},ct=null,lt={},d={},g=new WeakMap,_=[],p=null,m=!1,S=null,x=null,T=null,I=null,L=null,R=null,j=null,C=new jt(0,0,0),M=0,N=!1,b=null,Z=null,V=null,U=null,nt=null,yt.set(0,0,n.canvas.width,n.canvas.height),xt.set(0,0,n.canvas.width,n.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Dt,disable:Tt,bindFramebuffer:Ut,drawBuffers:v,useProgram:J,setBlending:w,setMaterial:W,setFlipSided:tt,setCullFace:E,setLineWidth:y,setPolygonOffset:z,setScissorTest:st,activeTexture:Q,bindTexture:ot,unbindTexture:Et,compressedTexImage2D:pt,compressedTexImage3D:Rt,texImage2D:Y,texImage3D:et,updateUBOMapping:It,uniformBlockBinding:Nt,texStorage2D:A,texStorage3D:q,texSubImage2D:Ft,texSubImage3D:zt,compressedTexSubImage2D:gt,compressedTexSubImage3D:D,scissor:mt,viewport:wt,reset:vt}}function wv(n,t,e,i,s,r,a){let o=s.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return d?new OffscreenCanvas(E,y):Pa("canvas")}function _(E,y,z,st){let Q=1;if((E.width>st||E.height>st)&&(Q=st/Math.max(E.width,E.height)),Q<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let ot=y?Ca:Math.floor,Et=ot(Q*E.width),pt=ot(Q*E.height);u===void 0&&(u=g(Et,pt));let Rt=z?g(Et,pt):u;return Rt.width=Et,Rt.height=pt,Rt.getContext("2d").drawImage(E,0,0,Et,pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Et+"x"+pt+")."),Rt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function p(E){return Pl(E.width)&&Pl(E.height)}function m(E){return o?!1:E.wrapS!==En||E.wrapT!==En||E.minFilter!==$e&&E.minFilter!==fn}function S(E,y){return E.generateMipmaps&&y&&E.minFilter!==$e&&E.minFilter!==fn}function x(E){n.generateMipmap(E)}function T(E,y,z,st,Q=!1){if(o===!1)return y;if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let ot=y;if(y===n.RED&&(z===n.FLOAT&&(ot=n.R32F),z===n.HALF_FLOAT&&(ot=n.R16F),z===n.UNSIGNED_BYTE&&(ot=n.R8)),y===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(ot=n.R8UI),z===n.UNSIGNED_SHORT&&(ot=n.R16UI),z===n.UNSIGNED_INT&&(ot=n.R32UI),z===n.BYTE&&(ot=n.R8I),z===n.SHORT&&(ot=n.R16I),z===n.INT&&(ot=n.R32I)),y===n.RG&&(z===n.FLOAT&&(ot=n.RG32F),z===n.HALF_FLOAT&&(ot=n.RG16F),z===n.UNSIGNED_BYTE&&(ot=n.RG8)),y===n.RGBA){let Et=Q?wa:ae.getTransfer(st);z===n.FLOAT&&(ot=n.RGBA32F),z===n.HALF_FLOAT&&(ot=n.RGBA16F),z===n.UNSIGNED_BYTE&&(ot=Et===ce?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(ot=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(ot=n.RGB5_A1)}return(ot===n.R16F||ot===n.R32F||ot===n.RG16F||ot===n.RG32F||ot===n.RGBA16F||ot===n.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function I(E,y,z){return S(E,z)===!0||E.isFramebufferTexture&&E.minFilter!==$e&&E.minFilter!==fn?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function L(E){return E===$e||E===bu||E===Vo?n.NEAREST:n.LINEAR}function R(E){let y=E.target;y.removeEventListener("dispose",R),C(y),y.isVideoTexture&&h.delete(y)}function j(E){let y=E.target;y.removeEventListener("dispose",j),N(y)}function C(E){let y=i.get(E);if(y.__webglInit===void 0)return;let z=E.source,st=f.get(z);if(st){let Q=st[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(E),Object.keys(st).length===0&&f.delete(z)}i.remove(E)}function M(E){let y=i.get(E);n.deleteTexture(y.__webglTexture);let z=E.source,st=f.get(z);delete st[y.__cacheKey],a.memory.textures--}function N(E){let y=E.texture,z=i.get(E),st=i.get(y);if(st.__webglTexture!==void 0&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(z.__webglFramebuffer[Q]))for(let ot=0;ot<z.__webglFramebuffer[Q].length;ot++)n.deleteFramebuffer(z.__webglFramebuffer[Q][ot]);else n.deleteFramebuffer(z.__webglFramebuffer[Q]);z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer[Q])}else{if(Array.isArray(z.__webglFramebuffer))for(let Q=0;Q<z.__webglFramebuffer.length;Q++)n.deleteFramebuffer(z.__webglFramebuffer[Q]);else n.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let Q=0;Q<z.__webglColorRenderbuffer.length;Q++)z.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(z.__webglColorRenderbuffer[Q]);z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let Q=0,ot=y.length;Q<ot;Q++){let Et=i.get(y[Q]);Et.__webglTexture&&(n.deleteTexture(Et.__webglTexture),a.memory.textures--),i.remove(y[Q])}i.remove(y),i.remove(E)}let b=0;function Z(){b=0}function V(){let E=b;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),b+=1,E}function U(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function nt(E,y){let z=i.get(E);if(E.isVideoTexture&&W(E),E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){let st=E.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{yt(z,E,y);return}}e.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+y)}function K(E,y){let z=i.get(E);if(E.version>0&&z.__version!==E.version){yt(z,E,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+y)}function rt(E,y){let z=i.get(E);if(E.version>0&&z.__version!==E.version){yt(z,E,y);return}e.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+y)}function k(E,y){let z=i.get(E);if(E.version>0&&z.__version!==E.version){xt(z,E,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+y)}let H={[Al]:n.REPEAT,[En]:n.CLAMP_TO_EDGE,[Rl]:n.MIRRORED_REPEAT},ct={[$e]:n.NEAREST,[bu]:n.NEAREST_MIPMAP_NEAREST,[Vo]:n.NEAREST_MIPMAP_LINEAR,[fn]:n.LINEAR,[rp]:n.LINEAR_MIPMAP_NEAREST,[or]:n.LINEAR_MIPMAP_LINEAR},lt={[_p]:n.NEVER,[Sp]:n.ALWAYS,[vp]:n.LESS,[ld]:n.LEQUAL,[xp]:n.EQUAL,[Mp]:n.GEQUAL,[yp]:n.GREATER,[bp]:n.NOTEQUAL};function G(E,y,z){if(z?(n.texParameteri(E,n.TEXTURE_WRAP_S,H[y.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,H[y.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,H[y.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,ct[y.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,ct[y.minFilter])):(n.texParameteri(E,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(E,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(y.wrapS!==En||y.wrapT!==En)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(E,n.TEXTURE_MAG_FILTER,L(y.magFilter)),n.texParameteri(E,n.TEXTURE_MIN_FILTER,L(y.minFilter)),y.minFilter!==$e&&y.minFilter!==fn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,lt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let st=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===$e||y.minFilter!==Vo&&y.minFilter!==or||y.type===di&&t.has("OES_texture_float_linear")===!1||o===!1&&y.type===lr&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(n.texParameterf(E,st.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function dt(E,y){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",R));let st=y.source,Q=f.get(st);Q===void 0&&(Q={},f.set(st,Q));let ot=U(y);if(ot!==E.__cacheKey){Q[ot]===void 0&&(Q[ot]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Q[ot].usedTimes++;let Et=Q[E.__cacheKey];Et!==void 0&&(Q[E.__cacheKey].usedTimes--,Et.usedTimes===0&&M(y)),E.__cacheKey=ot,E.__webglTexture=Q[ot].texture}return z}function yt(E,y,z){let st=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(st=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(st=n.TEXTURE_3D);let Q=dt(E,y),ot=y.source;e.bindTexture(st,E.__webglTexture,n.TEXTURE0+z);let Et=i.get(ot);if(ot.version!==Et.__version||Q===!0){e.activeTexture(n.TEXTURE0+z);let pt=ae.getPrimaries(ae.workingColorSpace),Rt=y.colorSpace===pn?null:ae.getPrimaries(y.colorSpace),Ft=y.colorSpace===pn||pt===Rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);let zt=m(y)&&p(y.image)===!1,gt=_(y.image,zt,!1,s.maxTextureSize);gt=tt(y,gt);let D=p(gt)||o,A=r.convert(y.format,y.colorSpace),q=r.convert(y.type),Y=T(y.internalFormat,A,q,y.colorSpace,y.isVideoTexture);G(st,y,D);let et,mt=y.mipmaps,wt=o&&y.isVideoTexture!==!0&&Y!==rd,It=Et.__version===void 0||Q===!0,Nt=I(y,gt,D);if(y.isDepthTexture)Y=n.DEPTH_COMPONENT,o?y.type===di?Y=n.DEPTH_COMPONENT32F:y.type===hi?Y=n.DEPTH_COMPONENT24:y.type===Oi?Y=n.DEPTH24_STENCIL8:Y=n.DEPTH_COMPONENT16:y.type===di&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Ni&&Y===n.DEPTH_COMPONENT&&y.type!==_c&&y.type!==hi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=hi,q=r.convert(y.type)),y.format===Cs&&Y===n.DEPTH_COMPONENT&&(Y=n.DEPTH_STENCIL,y.type!==Oi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Oi,q=r.convert(y.type))),It&&(wt?e.texStorage2D(n.TEXTURE_2D,1,Y,gt.width,gt.height):e.texImage2D(n.TEXTURE_2D,0,Y,gt.width,gt.height,0,A,q,null));else if(y.isDataTexture)if(mt.length>0&&D){wt&&It&&e.texStorage2D(n.TEXTURE_2D,Nt,Y,mt[0].width,mt[0].height);for(let vt=0,X=mt.length;vt<X;vt++)et=mt[vt],wt?e.texSubImage2D(n.TEXTURE_2D,vt,0,0,et.width,et.height,A,q,et.data):e.texImage2D(n.TEXTURE_2D,vt,Y,et.width,et.height,0,A,q,et.data);y.generateMipmaps=!1}else wt?(It&&e.texStorage2D(n.TEXTURE_2D,Nt,Y,gt.width,gt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt.width,gt.height,A,q,gt.data)):e.texImage2D(n.TEXTURE_2D,0,Y,gt.width,gt.height,0,A,q,gt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){wt&&It&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Nt,Y,mt[0].width,mt[0].height,gt.depth);for(let vt=0,X=mt.length;vt<X;vt++)et=mt[vt],y.format!==wn?A!==null?wt?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,vt,0,0,0,et.width,et.height,gt.depth,A,et.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,vt,Y,et.width,et.height,gt.depth,0,et.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):wt?e.texSubImage3D(n.TEXTURE_2D_ARRAY,vt,0,0,0,et.width,et.height,gt.depth,A,q,et.data):e.texImage3D(n.TEXTURE_2D_ARRAY,vt,Y,et.width,et.height,gt.depth,0,A,q,et.data)}else{wt&&It&&e.texStorage2D(n.TEXTURE_2D,Nt,Y,mt[0].width,mt[0].height);for(let vt=0,X=mt.length;vt<X;vt++)et=mt[vt],y.format!==wn?A!==null?wt?e.compressedTexSubImage2D(n.TEXTURE_2D,vt,0,0,et.width,et.height,A,et.data):e.compressedTexImage2D(n.TEXTURE_2D,vt,Y,et.width,et.height,0,et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):wt?e.texSubImage2D(n.TEXTURE_2D,vt,0,0,et.width,et.height,A,q,et.data):e.texImage2D(n.TEXTURE_2D,vt,Y,et.width,et.height,0,A,q,et.data)}else if(y.isDataArrayTexture)wt?(It&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Nt,Y,gt.width,gt.height,gt.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,A,q,gt.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Y,gt.width,gt.height,gt.depth,0,A,q,gt.data);else if(y.isData3DTexture)wt?(It&&e.texStorage3D(n.TEXTURE_3D,Nt,Y,gt.width,gt.height,gt.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,A,q,gt.data)):e.texImage3D(n.TEXTURE_3D,0,Y,gt.width,gt.height,gt.depth,0,A,q,gt.data);else if(y.isFramebufferTexture){if(It)if(wt)e.texStorage2D(n.TEXTURE_2D,Nt,Y,gt.width,gt.height);else{let vt=gt.width,X=gt.height;for(let bt=0;bt<Nt;bt++)e.texImage2D(n.TEXTURE_2D,bt,Y,vt,X,0,A,q,null),vt>>=1,X>>=1}}else if(mt.length>0&&D){wt&&It&&e.texStorage2D(n.TEXTURE_2D,Nt,Y,mt[0].width,mt[0].height);for(let vt=0,X=mt.length;vt<X;vt++)et=mt[vt],wt?e.texSubImage2D(n.TEXTURE_2D,vt,0,0,A,q,et):e.texImage2D(n.TEXTURE_2D,vt,Y,A,q,et);y.generateMipmaps=!1}else wt?(It&&e.texStorage2D(n.TEXTURE_2D,Nt,Y,gt.width,gt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,A,q,gt)):e.texImage2D(n.TEXTURE_2D,0,Y,A,q,gt);S(y,D)&&x(st),Et.__version=ot.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function xt(E,y,z){if(y.image.length!==6)return;let st=dt(E,y),Q=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+z);let ot=i.get(Q);if(Q.version!==ot.__version||st===!0){e.activeTexture(n.TEXTURE0+z);let Et=ae.getPrimaries(ae.workingColorSpace),pt=y.colorSpace===pn?null:ae.getPrimaries(y.colorSpace),Rt=y.colorSpace===pn||Et===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let Ft=y.isCompressedTexture||y.image[0].isCompressedTexture,zt=y.image[0]&&y.image[0].isDataTexture,gt=[];for(let vt=0;vt<6;vt++)!Ft&&!zt?gt[vt]=_(y.image[vt],!1,!0,s.maxCubemapSize):gt[vt]=zt?y.image[vt].image:y.image[vt],gt[vt]=tt(y,gt[vt]);let D=gt[0],A=p(D)||o,q=r.convert(y.format,y.colorSpace),Y=r.convert(y.type),et=T(y.internalFormat,q,Y,y.colorSpace),mt=o&&y.isVideoTexture!==!0,wt=ot.__version===void 0||st===!0,It=I(y,D,A);G(n.TEXTURE_CUBE_MAP,y,A);let Nt;if(Ft){mt&&wt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,It,et,D.width,D.height);for(let vt=0;vt<6;vt++){Nt=gt[vt].mipmaps;for(let X=0;X<Nt.length;X++){let bt=Nt[X];y.format!==wn?q!==null?mt?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X,0,0,bt.width,bt.height,q,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X,et,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):mt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X,0,0,bt.width,bt.height,q,Y,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X,et,bt.width,bt.height,0,q,Y,bt.data)}}}else{Nt=y.mipmaps,mt&&wt&&(Nt.length>0&&It++,e.texStorage2D(n.TEXTURE_CUBE_MAP,It,et,gt[0].width,gt[0].height));for(let vt=0;vt<6;vt++)if(zt){mt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,gt[vt].width,gt[vt].height,q,Y,gt[vt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,et,gt[vt].width,gt[vt].height,0,q,Y,gt[vt].data);for(let X=0;X<Nt.length;X++){let Mt=Nt[X].image[vt].image;mt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X+1,0,0,Mt.width,Mt.height,q,Y,Mt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X+1,et,Mt.width,Mt.height,0,q,Y,Mt.data)}}else{mt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,q,Y,gt[vt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,et,q,Y,gt[vt]);for(let X=0;X<Nt.length;X++){let bt=Nt[X];mt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X+1,0,0,q,Y,bt.image[vt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+vt,X+1,et,q,Y,bt.image[vt])}}}S(y,A)&&x(n.TEXTURE_CUBE_MAP),ot.__version=Q.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function _t(E,y,z,st,Q,ot){let Et=r.convert(z.format,z.colorSpace),pt=r.convert(z.type),Rt=T(z.internalFormat,Et,pt,z.colorSpace);if(!i.get(y).__hasExternalTextures){let zt=Math.max(1,y.width>>ot),gt=Math.max(1,y.height>>ot);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?e.texImage3D(Q,ot,Rt,zt,gt,y.depth,0,Et,pt,null):e.texImage2D(Q,ot,Rt,zt,gt,0,Et,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,E),w(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,st,Q,i.get(z).__webglTexture,0,P(y)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,st,Q,i.get(z).__webglTexture,ot),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Lt(E,y,z){if(n.bindRenderbuffer(n.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let st=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(z||w(y)){let Q=y.depthTexture;Q&&Q.isDepthTexture&&(Q.type===di?st=n.DEPTH_COMPONENT32F:Q.type===hi&&(st=n.DEPTH_COMPONENT24));let ot=P(y);w(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot,st,y.width,y.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,st,y.width,y.height)}else n.renderbufferStorage(n.RENDERBUFFER,st,y.width,y.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){let st=P(y);z&&w(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,st,n.DEPTH24_STENCIL8,y.width,y.height):w(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,st,n.DEPTH24_STENCIL8,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,E)}else{let st=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let Q=0;Q<st.length;Q++){let ot=st[Q],Et=r.convert(ot.format,ot.colorSpace),pt=r.convert(ot.type),Rt=T(ot.internalFormat,Et,pt,ot.colorSpace),Ft=P(y);z&&w(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ft,Rt,y.width,y.height):w(y)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ft,Rt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Rt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Dt(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),nt(y.depthTexture,0);let st=i.get(y.depthTexture).__webglTexture,Q=P(y);if(y.depthTexture.format===Ni)w(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,st,0);else if(y.depthTexture.format===Cs)w(y)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function Tt(E){let y=i.get(E),z=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Dt(y.__webglFramebuffer,E)}else if(z){y.__webglDepthbuffer=[];for(let st=0;st<6;st++)e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[st]),y.__webglDepthbuffer[st]=n.createRenderbuffer(),Lt(y.__webglDepthbuffer[st],E,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=n.createRenderbuffer(),Lt(y.__webglDepthbuffer,E,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(E,y,z){let st=i.get(E);y!==void 0&&_t(st.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Tt(E)}function v(E){let y=E.texture,z=i.get(E),st=i.get(y);E.addEventListener("dispose",j),E.isWebGLMultipleRenderTargets!==!0&&(st.__webglTexture===void 0&&(st.__webglTexture=n.createTexture()),st.__version=y.version,a.memory.textures++);let Q=E.isWebGLCubeRenderTarget===!0,ot=E.isWebGLMultipleRenderTargets===!0,Et=p(E)||o;if(Q){z.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(o&&y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[pt]=[];for(let Rt=0;Rt<y.mipmaps.length;Rt++)z.__webglFramebuffer[pt][Rt]=n.createFramebuffer()}else z.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let pt=0;pt<y.mipmaps.length;pt++)z.__webglFramebuffer[pt]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ot)if(s.drawBuffers){let pt=E.texture;for(let Rt=0,Ft=pt.length;Rt<Ft;Rt++){let zt=i.get(pt[Rt]);zt.__webglTexture===void 0&&(zt.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&w(E)===!1){let pt=ot?y:[y];z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Rt=0;Rt<pt.length;Rt++){let Ft=pt[Rt];z.__webglColorRenderbuffer[Rt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[Rt]);let zt=r.convert(Ft.format,Ft.colorSpace),gt=r.convert(Ft.type),D=T(Ft.internalFormat,zt,gt,Ft.colorSpace,E.isXRRenderTarget===!0),A=P(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,A,D,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,z.__webglColorRenderbuffer[Rt])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Lt(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,st.__webglTexture),G(n.TEXTURE_CUBE_MAP,y,Et);for(let pt=0;pt<6;pt++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let Rt=0;Rt<y.mipmaps.length;Rt++)_t(z.__webglFramebuffer[pt][Rt],E,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Rt);else _t(z.__webglFramebuffer[pt],E,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);S(y,Et)&&x(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ot){let pt=E.texture;for(let Rt=0,Ft=pt.length;Rt<Ft;Rt++){let zt=pt[Rt],gt=i.get(zt);e.bindTexture(n.TEXTURE_2D,gt.__webglTexture),G(n.TEXTURE_2D,zt,Et),_t(z.__webglFramebuffer,E,zt,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,0),S(zt,Et)&&x(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?pt=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(pt,st.__webglTexture),G(pt,y,Et),o&&y.mipmaps&&y.mipmaps.length>0)for(let Rt=0;Rt<y.mipmaps.length;Rt++)_t(z.__webglFramebuffer[Rt],E,y,n.COLOR_ATTACHMENT0,pt,Rt);else _t(z.__webglFramebuffer,E,y,n.COLOR_ATTACHMENT0,pt,0);S(y,Et)&&x(pt),e.unbindTexture()}E.depthBuffer&&Tt(E)}function J(E){let y=p(E)||o,z=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let st=0,Q=z.length;st<Q;st++){let ot=z[st];if(S(ot,y)){let Et=E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,pt=i.get(ot).__webglTexture;e.bindTexture(Et,pt),x(Et),e.unbindTexture()}}}function F(E){if(o&&E.samples>0&&w(E)===!1){let y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],z=E.width,st=E.height,Q=n.COLOR_BUFFER_BIT,ot=[],Et=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=i.get(E),Rt=E.isWebGLMultipleRenderTargets===!0;if(Rt)for(let Ft=0;Ft<y.length;Ft++)e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ft,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ft,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let Ft=0;Ft<y.length;Ft++){ot.push(n.COLOR_ATTACHMENT0+Ft),E.depthBuffer&&ot.push(Et);let zt=pt.__ignoreDepthValues!==void 0?pt.__ignoreDepthValues:!1;if(zt===!1&&(E.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),Rt&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Ft]),zt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Et]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Et])),Rt){let gt=i.get(y[Ft]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,gt,0)}n.blitFramebuffer(0,0,z,st,0,0,z,st,Q,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ot)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Rt)for(let Ft=0;Ft<y.length;Ft++){e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ft,n.RENDERBUFFER,pt.__webglColorRenderbuffer[Ft]);let zt=i.get(y[Ft]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ft,n.TEXTURE_2D,zt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}}function P(E){return Math.min(s.maxSamples,E.samples)}function w(E){let y=i.get(E);return o&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function W(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function tt(E,y){let z=E.colorSpace,st=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Cl||z!==jn&&z!==pn&&(ae.getTransfer(z)===ce?o===!1?t.has("EXT_sRGB")===!0&&st===wn?(E.format=Cl,E.minFilter=fn,E.generateMipmaps=!1):y=La.sRGBToLinear(y):(st!==wn||Q!==mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}this.allocateTextureUnit=V,this.resetTextureUnits=Z,this.setTexture2D=nt,this.setTexture2DArray=K,this.setTexture3D=rt,this.setTextureCube=k,this.rebindTextures=Ut,this.setupRenderTarget=v,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=w}function Tv(n,t,e){let i=e.isWebGL2;function s(r,a=pn){let o,c=ae.getTransfer(a);if(r===mi)return n.UNSIGNED_BYTE;if(r===td)return n.UNSIGNED_SHORT_4_4_4_4;if(r===ed)return n.UNSIGNED_SHORT_5_5_5_1;if(r===ap)return n.BYTE;if(r===op)return n.SHORT;if(r===_c)return n.UNSIGNED_SHORT;if(r===Qh)return n.INT;if(r===hi)return n.UNSIGNED_INT;if(r===di)return n.FLOAT;if(r===lr)return i?n.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===lp)return n.ALPHA;if(r===wn)return n.RGBA;if(r===cp)return n.LUMINANCE;if(r===up)return n.LUMINANCE_ALPHA;if(r===Ni)return n.DEPTH_COMPONENT;if(r===Cs)return n.DEPTH_STENCIL;if(r===Cl)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===hp)return n.RED;if(r===nd)return n.RED_INTEGER;if(r===dp)return n.RG;if(r===id)return n.RG_INTEGER;if(r===sd)return n.RGBA_INTEGER;if(r===Go||r===Wo||r===$o||r===Xo)if(c===ce)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Go)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Wo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===$o)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Xo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Go)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Wo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===$o)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Xo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Mu||r===Su||r===Eu||r===wu)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Mu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Su)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Eu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===wu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===rd)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Tu||r===Au)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Tu)return c===ce?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Au)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ru||r===Cu||r===Pu||r===Lu||r===Iu||r===Du||r===Ou||r===Nu||r===ku||r===Uu||r===Fu||r===Bu||r===zu||r===Hu)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Ru)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Cu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Pu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Lu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Iu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Du)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ou)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Nu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ku)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Uu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Fu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Bu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===zu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Hu)return c===ce?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===jo||r===Vu||r===Gu)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===jo)return c===ce?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Vu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Gu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===fp||r===Wu||r===$u||r===Xu)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===jo)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Wu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===$u)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Xu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Oi?i?n.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var Gl=class extends Xe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ge=class extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}},Av={type:"move"},ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ge,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ge,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ge,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,i),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Av)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ge;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Wl=class extends Nn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,_=e.getContextAttributes(),p=null,m=null,S=[],x=[],T=new St,I=null,L=new Xe;L.layers.enable(1),L.viewport=new Ie;let R=new Xe;R.layers.enable(2),R.viewport=new Ie;let j=[L,R],C=new Gl;C.layers.enable(1),C.layers.enable(2);let M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let dt=S[G];return dt===void 0&&(dt=new ir,S[G]=dt),dt.getTargetRaySpace()},this.getControllerGrip=function(G){let dt=S[G];return dt===void 0&&(dt=new ir,S[G]=dt),dt.getGripSpace()},this.getHand=function(G){let dt=S[G];return dt===void 0&&(dt=new ir,S[G]=dt),dt.getHandSpace()};function b(G){let dt=x.indexOf(G.inputSource);if(dt===-1)return;let yt=S[dt];yt!==void 0&&(yt.update(G.inputSource,G.frame,l||a),yt.dispatchEvent({type:G.type,data:G.inputSource}))}function Z(){s.removeEventListener("select",b),s.removeEventListener("selectstart",b),s.removeEventListener("selectend",b),s.removeEventListener("squeeze",b),s.removeEventListener("squeezestart",b),s.removeEventListener("squeezeend",b),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",V);for(let G=0;G<S.length;G++){let dt=x[G];dt!==null&&(x[G]=null,S[G].disconnect(dt))}M=null,N=null,t.setRenderTarget(p),d=null,f=null,u=null,s=null,m=null,lt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(G){l=G},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",b),s.addEventListener("selectstart",b),s.addEventListener("selectend",b),s.addEventListener("squeeze",b),s.addEventListener("squeezestart",b),s.addEventListener("squeezeend",b),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",V),_.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let dt={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,dt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new qn(d.framebufferWidth,d.framebufferHeight,{format:wn,type:mi,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let dt=null,yt=null,xt=null;_.depth&&(xt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=_.stencil?Cs:Ni,yt=_.stencil?Oi:hi);let _t={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(_t),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),m=new qn(f.textureWidth,f.textureHeight,{format:wn,type:mi,depthTexture:new za(f.textureWidth,f.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});let Lt=t.properties.get(m);Lt.__ignoreDepthValues=f.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),lt.setContext(s),lt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function V(G){for(let dt=0;dt<G.removed.length;dt++){let yt=G.removed[dt],xt=x.indexOf(yt);xt>=0&&(x[xt]=null,S[xt].disconnect(yt))}for(let dt=0;dt<G.added.length;dt++){let yt=G.added[dt],xt=x.indexOf(yt);if(xt===-1){for(let Lt=0;Lt<S.length;Lt++)if(Lt>=x.length){x.push(yt),xt=Lt;break}else if(x[Lt]===null){x[Lt]=yt,xt=Lt;break}if(xt===-1)break}let _t=S[xt];_t&&_t.connect(yt)}}let U=new $,nt=new $;function K(G,dt,yt){U.setFromMatrixPosition(dt.matrixWorld),nt.setFromMatrixPosition(yt.matrixWorld);let xt=U.distanceTo(nt),_t=dt.projectionMatrix.elements,Lt=yt.projectionMatrix.elements,Dt=_t[14]/(_t[10]-1),Tt=_t[14]/(_t[10]+1),Ut=(_t[9]+1)/_t[5],v=(_t[9]-1)/_t[5],J=(_t[8]-1)/_t[0],F=(Lt[8]+1)/Lt[0],P=Dt*J,w=Dt*F,W=xt/(-J+F),tt=W*-J;dt.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(tt),G.translateZ(W),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();let E=Dt+W,y=Tt+W,z=P-tt,st=w+(xt-tt),Q=Ut*Tt/y*E,ot=v*Tt/y*E;G.projectionMatrix.makePerspective(z,st,Q,ot,E,y),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function rt(G,dt){dt===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(dt.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;C.near=R.near=L.near=G.near,C.far=R.far=L.far=G.far,(M!==C.near||N!==C.far)&&(s.updateRenderState({depthNear:C.near,depthFar:C.far}),M=C.near,N=C.far);let dt=G.parent,yt=C.cameras;rt(C,dt);for(let xt=0;xt<yt.length;xt++)rt(yt[xt],dt);yt.length===2?K(C,L,R):C.projectionMatrix.copy(L.projectionMatrix),k(G,C,dt)};function k(G,dt,yt){yt===null?G.matrix.copy(dt.matrixWorld):(G.matrix.copy(yt.matrixWorld),G.matrix.invert(),G.matrix.multiply(dt.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(dt.projectionMatrix),G.projectionMatrixInverse.copy(dt.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=cr*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(G){c=G,f!==null&&(f.fixedFoveation=G),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=G)};let H=null;function ct(G,dt){if(h=dt.getViewerPose(l||a),g=dt,h!==null){let yt=h.views;d!==null&&(t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m));let xt=!1;yt.length!==C.cameras.length&&(C.cameras.length=0,xt=!0);for(let _t=0;_t<yt.length;_t++){let Lt=yt[_t],Dt=null;if(d!==null)Dt=d.getViewport(Lt);else{let Ut=u.getViewSubImage(f,Lt);Dt=Ut.viewport,_t===0&&(t.setRenderTargetTextures(m,Ut.colorTexture,f.ignoreDepthValues?void 0:Ut.depthStencilTexture),t.setRenderTarget(m))}let Tt=j[_t];Tt===void 0&&(Tt=new Xe,Tt.layers.enable(_t),Tt.viewport=new Ie,j[_t]=Tt),Tt.matrix.fromArray(Lt.transform.matrix),Tt.matrix.decompose(Tt.position,Tt.quaternion,Tt.scale),Tt.projectionMatrix.fromArray(Lt.projectionMatrix),Tt.projectionMatrixInverse.copy(Tt.projectionMatrix).invert(),Tt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),_t===0&&(C.matrix.copy(Tt.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),xt===!0&&C.cameras.push(Tt)}}for(let yt=0;yt<S.length;yt++){let xt=x[yt],_t=S[yt];xt!==null&&_t!==void 0&&_t.update(xt,dt,l||a)}H&&H(G,dt),dt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:dt}),g=null}let lt=new fd;lt.setAnimationLoop(ct),this.setAnimationLoop=function(G){H=G},this.dispose=function(){}}};function Rv(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,dd(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,S,x,T){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,T)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,S,x):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Je&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Je&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let S=t.get(m).envMap;if(S&&(p.envMap.value=S,p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;let x=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*x,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,S,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*S,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,S){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Je&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){let S=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Cv(n,t,e,i){let s={},r={},a=[],o=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,x){let T=x.program;i.uniformBlockBinding(S,T)}function l(S,x){let T=s[S.id];T===void 0&&(g(S),T=h(S),s[S.id]=T,S.addEventListener("dispose",p));let I=x.program;i.updateUBOMapping(S,I);let L=t.render.frame;r[S.id]!==L&&(f(S),r[S.id]=L)}function h(S){let x=u();S.__bindingPointIndex=x;let T=n.createBuffer(),I=S.__size,L=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,I,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,T),T}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let x=s[S.id],T=S.uniforms,I=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let L=0,R=T.length;L<R;L++){let j=Array.isArray(T[L])?T[L]:[T[L]];for(let C=0,M=j.length;C<M;C++){let N=j[C];if(d(N,L,C,I)===!0){let b=N.__offset,Z=Array.isArray(N.value)?N.value:[N.value],V=0;for(let U=0;U<Z.length;U++){let nt=Z[U],K=_(nt);typeof nt=="number"||typeof nt=="boolean"?(N.__data[0]=nt,n.bufferSubData(n.UNIFORM_BUFFER,b+V,N.__data)):nt.isMatrix3?(N.__data[0]=nt.elements[0],N.__data[1]=nt.elements[1],N.__data[2]=nt.elements[2],N.__data[3]=0,N.__data[4]=nt.elements[3],N.__data[5]=nt.elements[4],N.__data[6]=nt.elements[5],N.__data[7]=0,N.__data[8]=nt.elements[6],N.__data[9]=nt.elements[7],N.__data[10]=nt.elements[8],N.__data[11]=0):(nt.toArray(N.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,b,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,x,T,I){let L=S.value,R=x+"_"+T;if(I[R]===void 0)return typeof L=="number"||typeof L=="boolean"?I[R]=L:I[R]=L.clone(),!0;{let j=I[R];if(typeof L=="number"||typeof L=="boolean"){if(j!==L)return I[R]=L,!0}else if(j.equals(L)===!1)return j.copy(L),!0}return!1}function g(S){let x=S.uniforms,T=0,I=16;for(let R=0,j=x.length;R<j;R++){let C=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,N=C.length;M<N;M++){let b=C[M],Z=Array.isArray(b.value)?b.value:[b.value];for(let V=0,U=Z.length;V<U;V++){let nt=Z[V],K=_(nt),rt=T%I;rt!==0&&I-rt<K.boundary&&(T+=I-rt),b.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=T,T+=K.storage}}}let L=T%I;return L>0&&(T+=I-L),S.__size=T,S.__cache={},this}function _(S){let x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){let x=S.target;x.removeEventListener("dispose",p);let T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(let S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}var fr=class{constructor(t={}){let{canvas:e=Fp(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;let d=new Uint32Array(4),g=new Int32Array(4),_=null,p=null,m=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ne,this._useLegacyLights=!1,this.toneMapping=pi,this.toneMappingExposure=1;let x=this,T=!1,I=0,L=0,R=null,j=-1,C=null,M=new Ie,N=new Ie,b=null,Z=new jt(0),V=0,U=e.width,nt=e.height,K=1,rt=null,k=null,H=new Ie(0,0,U,nt),ct=new Ie(0,0,U,nt),lt=!1,G=new hr,dt=!1,yt=!1,xt=null,_t=new ue,Lt=new St,Dt=new $,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ut(){return R===null?K:1}let v=i;function J(O,at){for(let ht=0;ht<O.length;ht++){let ft=O[ht],ut=e.getContext(ft,at);if(ut!==null)return ut}return null}try{let O={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${pc}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",X,!1),e.addEventListener("webglcontextcreationerror",bt,!1),v===null){let at=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&at.shift(),v=J(at,O),v===null)throw J(at)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&v instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),v.getShaderPrecisionFormat===void 0&&(v.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(O){throw console.error("THREE.WebGLRenderer: "+O.message),O}let F,P,w,W,tt,E,y,z,st,Q,ot,Et,pt,Rt,Ft,zt,gt,D,A,q,Y,et,mt,wt;function It(){F=new q0(v),P=new V0(v,F,t),F.init(P),et=new Tv(v,F,P),w=new Ev(v,F,P),W=new K0(v),tt=new dv,E=new wv(v,F,w,tt,P,et,W),y=new W0(x),z=new j0(x),st=new rm(v,P),mt=new z0(v,F,st,P),Q=new Y0(v,st,W,mt),ot=new e_(v,Q,st,W),A=new t_(v,P,E),zt=new G0(tt),Et=new hv(x,y,z,F,P,mt,zt),pt=new Rv(x,tt),Rt=new pv,Ft=new yv(F,P),D=new B0(x,y,z,w,ot,f,c),gt=new Sv(x,ot,P),wt=new Cv(v,W,P,w),q=new H0(v,F,W,P),Y=new Z0(v,F,W,P),W.programs=Et.programs,x.capabilities=P,x.extensions=F,x.properties=tt,x.renderLists=Rt,x.shadowMap=gt,x.state=w,x.info=W}It();let Nt=new Wl(x,v);this.xr=Nt,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){let O=F.get("WEBGL_lose_context");O&&O.loseContext()},this.forceContextRestore=function(){let O=F.get("WEBGL_lose_context");O&&O.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(O){O!==void 0&&(K=O,this.setSize(U,nt,!1))},this.getSize=function(O){return O.set(U,nt)},this.setSize=function(O,at,ht=!0){if(Nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=O,nt=at,e.width=Math.floor(O*K),e.height=Math.floor(at*K),ht===!0&&(e.style.width=O+"px",e.style.height=at+"px"),this.setViewport(0,0,O,at)},this.getDrawingBufferSize=function(O){return O.set(U*K,nt*K).floor()},this.setDrawingBufferSize=function(O,at,ht){U=O,nt=at,K=ht,e.width=Math.floor(O*ht),e.height=Math.floor(at*ht),this.setViewport(0,0,O,at)},this.getCurrentViewport=function(O){return O.copy(M)},this.getViewport=function(O){return O.copy(H)},this.setViewport=function(O,at,ht,ft){O.isVector4?H.set(O.x,O.y,O.z,O.w):H.set(O,at,ht,ft),w.viewport(M.copy(H).multiplyScalar(K).floor())},this.getScissor=function(O){return O.copy(ct)},this.setScissor=function(O,at,ht,ft){O.isVector4?ct.set(O.x,O.y,O.z,O.w):ct.set(O,at,ht,ft),w.scissor(N.copy(ct).multiplyScalar(K).floor())},this.getScissorTest=function(){return lt},this.setScissorTest=function(O){w.setScissorTest(lt=O)},this.setOpaqueSort=function(O){rt=O},this.setTransparentSort=function(O){k=O},this.getClearColor=function(O){return O.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor.apply(D,arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha.apply(D,arguments)},this.clear=function(O=!0,at=!0,ht=!0){let ft=0;if(O){let ut=!1;if(R!==null){let Ot=R.texture.format;ut=Ot===sd||Ot===id||Ot===nd}if(ut){let Ot=R.texture.type,Ht=Ot===mi||Ot===hi||Ot===_c||Ot===Oi||Ot===td||Ot===ed,Gt=D.getClearColor(),Wt=D.getClearAlpha(),Jt=Gt.r,Xt=Gt.g,qt=Gt.b;Ht?(d[0]=Jt,d[1]=Xt,d[2]=qt,d[3]=Wt,v.clearBufferuiv(v.COLOR,0,d)):(g[0]=Jt,g[1]=Xt,g[2]=qt,g[3]=Wt,v.clearBufferiv(v.COLOR,0,g))}else ft|=v.COLOR_BUFFER_BIT}at&&(ft|=v.DEPTH_BUFFER_BIT),ht&&(ft|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(ft)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",X,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Rt.dispose(),Ft.dispose(),tt.dispose(),y.dispose(),z.dispose(),ot.dispose(),mt.dispose(),wt.dispose(),Et.dispose(),Nt.dispose(),Nt.removeEventListener("sessionstart",He),Nt.removeEventListener("sessionend",le),xt&&(xt.dispose(),xt=null),Ve.stop()};function vt(O){O.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function X(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let O=W.autoReset,at=gt.enabled,ht=gt.autoUpdate,ft=gt.needsUpdate,ut=gt.type;It(),W.autoReset=O,gt.enabled=at,gt.autoUpdate=ht,gt.needsUpdate=ft,gt.type=ut}function bt(O){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",O.statusMessage)}function Mt(O){let at=O.target;at.removeEventListener("dispose",Mt),Bt(at)}function Bt(O){kt(O),tt.remove(O)}function kt(O){let at=tt.get(O).programs;at!==void 0&&(at.forEach(function(ht){Et.releaseProgram(ht)}),O.isShaderMaterial&&Et.releaseShaderCache(O))}this.renderBufferDirect=function(O,at,ht,ft,ut,Ot){at===null&&(at=Tt);let Ht=ut.isMesh&&ut.matrixWorld.determinant()<0,Gt=mf(O,at,ht,ft,ut);w.setMaterial(ft,Ht);let Wt=ht.index,Jt=1;if(ft.wireframe===!0){if(Wt=Q.getWireframeAttribute(ht),Wt===void 0)return;Jt=2}let Xt=ht.drawRange,qt=ht.attributes.position,Me=Xt.start*Jt,nn=(Xt.start+Xt.count)*Jt;Ot!==null&&(Me=Math.max(Me,Ot.start*Jt),nn=Math.min(nn,(Ot.start+Ot.count)*Jt)),Wt!==null?(Me=Math.max(Me,0),nn=Math.min(nn,Wt.count)):qt!=null&&(Me=Math.max(Me,0),nn=Math.min(nn,qt.count));let Ce=nn-Me;if(Ce<0||Ce===1/0)return;mt.setup(ut,ft,Gt,ht,Wt);let Bn,pe=q;if(Wt!==null&&(Bn=st.get(Wt),pe=Y,pe.setIndex(Bn)),ut.isMesh)ft.wireframe===!0?(w.setLineWidth(ft.wireframeLinewidth*Ut()),pe.setMode(v.LINES)):pe.setMode(v.TRIANGLES);else if(ut.isLine){let Qt=ft.linewidth;Qt===void 0&&(Qt=1),w.setLineWidth(Qt*Ut()),ut.isLineSegments?pe.setMode(v.LINES):ut.isLineLoop?pe.setMode(v.LINE_LOOP):pe.setMode(v.LINE_STRIP)}else ut.isPoints?pe.setMode(v.POINTS):ut.isSprite&&pe.setMode(v.TRIANGLES);if(ut.isBatchedMesh)pe.renderMultiDraw(ut._multiDrawStarts,ut._multiDrawCounts,ut._multiDrawCount);else if(ut.isInstancedMesh)pe.renderInstances(Me,Ce,ut.count);else if(ht.isInstancedBufferGeometry){let Qt=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,Fo=Math.min(ht.instanceCount,Qt);pe.renderInstances(Me,Ce,Fo)}else pe.render(Me,Ce)};function $t(O,at,ht){O.transparent===!0&&O.side===Sn&&O.forceSinglePass===!1?(O.side=Je,O.needsUpdate=!0,jr(O,at,ht),O.side=gi,O.needsUpdate=!0,jr(O,at,ht),O.side=Sn):jr(O,at,ht)}this.compile=function(O,at,ht=null){ht===null&&(ht=O),p=Ft.get(ht),p.init(),S.push(p),ht.traverseVisible(function(ut){ut.isLight&&ut.layers.test(at.layers)&&(p.pushLight(ut),ut.castShadow&&p.pushShadow(ut))}),O!==ht&&O.traverseVisible(function(ut){ut.isLight&&ut.layers.test(at.layers)&&(p.pushLight(ut),ut.castShadow&&p.pushShadow(ut))}),p.setupLights(x._useLegacyLights);let ft=new Set;return O.traverse(function(ut){let Ot=ut.material;if(Ot)if(Array.isArray(Ot))for(let Ht=0;Ht<Ot.length;Ht++){let Gt=Ot[Ht];$t(Gt,ht,ut),ft.add(Gt)}else $t(Ot,ht,ut),ft.add(Ot)}),S.pop(),p=null,ft},this.compileAsync=function(O,at,ht=null){let ft=this.compile(O,at,ht);return new Promise(ut=>{function Ot(){if(ft.forEach(function(Ht){tt.get(Ht).currentProgram.isReady()&&ft.delete(Ht)}),ft.size===0){ut(O);return}setTimeout(Ot,10)}F.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let ie=null;function Re(O){ie&&ie(O)}function He(){Ve.stop()}function le(){Ve.start()}let Ve=new fd;Ve.setAnimationLoop(Re),typeof self<"u"&&Ve.setContext(self),this.setAnimationLoop=function(O){ie=O,Nt.setAnimationLoop(O),O===null?Ve.stop():Ve.start()},Nt.addEventListener("sessionstart",He),Nt.addEventListener("sessionend",le),this.render=function(O,at){if(at!==void 0&&at.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),at.parent===null&&at.matrixWorldAutoUpdate===!0&&at.updateMatrixWorld(),Nt.enabled===!0&&Nt.isPresenting===!0&&(Nt.cameraAutoUpdate===!0&&Nt.updateCamera(at),at=Nt.getCamera()),O.isScene===!0&&O.onBeforeRender(x,O,at,R),p=Ft.get(O,S.length),p.init(),S.push(p),_t.multiplyMatrices(at.projectionMatrix,at.matrixWorldInverse),G.setFromProjectionMatrix(_t),yt=this.localClippingEnabled,dt=zt.init(this.clippingPlanes,yt),_=Rt.get(O,m.length),_.init(),m.push(_),Dn(O,at,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(rt,k),this.info.render.frame++,dt===!0&&zt.beginShadows();let ht=p.state.shadowsArray;if(gt.render(ht,O,at),dt===!0&&zt.endShadows(),this.info.autoReset===!0&&this.info.reset(),D.render(_,O),p.setupLights(x._useLegacyLights),at.isArrayCamera){let ft=at.cameras;for(let ut=0,Ot=ft.length;ut<Ot;ut++){let Ht=ft[ut];lu(_,O,Ht,Ht.viewport)}}else lu(_,O,at);R!==null&&(E.updateMultisampleRenderTarget(R),E.updateRenderTargetMipmap(R)),O.isScene===!0&&O.onAfterRender(x,O,at),mt.resetDefaultState(),j=-1,C=null,S.pop(),S.length>0?p=S[S.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Dn(O,at,ht,ft){if(O.visible===!1)return;if(O.layers.test(at.layers)){if(O.isGroup)ht=O.renderOrder;else if(O.isLOD)O.autoUpdate===!0&&O.update(at);else if(O.isLight)p.pushLight(O),O.castShadow&&p.pushShadow(O);else if(O.isSprite){if(!O.frustumCulled||G.intersectsSprite(O)){ft&&Dt.setFromMatrixPosition(O.matrixWorld).applyMatrix4(_t);let Ht=ot.update(O),Gt=O.material;Gt.visible&&_.push(O,Ht,Gt,ht,Dt.z,null)}}else if((O.isMesh||O.isLine||O.isPoints)&&(!O.frustumCulled||G.intersectsObject(O))){let Ht=ot.update(O),Gt=O.material;if(ft&&(O.boundingSphere!==void 0?(O.boundingSphere===null&&O.computeBoundingSphere(),Dt.copy(O.boundingSphere.center)):(Ht.boundingSphere===null&&Ht.computeBoundingSphere(),Dt.copy(Ht.boundingSphere.center)),Dt.applyMatrix4(O.matrixWorld).applyMatrix4(_t)),Array.isArray(Gt)){let Wt=Ht.groups;for(let Jt=0,Xt=Wt.length;Jt<Xt;Jt++){let qt=Wt[Jt],Me=Gt[qt.materialIndex];Me&&Me.visible&&_.push(O,Ht,Me,ht,Dt.z,qt)}}else Gt.visible&&_.push(O,Ht,Gt,ht,Dt.z,null)}}let Ot=O.children;for(let Ht=0,Gt=Ot.length;Ht<Gt;Ht++)Dn(Ot[Ht],at,ht,ft)}function lu(O,at,ht,ft){let ut=O.opaque,Ot=O.transmissive,Ht=O.transparent;p.setupLightsView(ht),dt===!0&&zt.setGlobalState(x.clippingPlanes,ht),Ot.length>0&&pf(ut,Ot,at,ht),ft&&w.viewport(M.copy(ft)),ut.length>0&&Xr(ut,at,ht),Ot.length>0&&Xr(Ot,at,ht),Ht.length>0&&Xr(Ht,at,ht),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function pf(O,at,ht,ft){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;let Ot=P.isWebGL2;xt===null&&(xt=new qn(1,1,{generateMipmaps:!0,type:F.has("EXT_color_buffer_half_float")?lr:mi,minFilter:or,samples:Ot?4:0})),x.getDrawingBufferSize(Lt),Ot?xt.setSize(Lt.x,Lt.y):xt.setSize(Ca(Lt.x),Ca(Lt.y));let Ht=x.getRenderTarget();x.setRenderTarget(xt),x.getClearColor(Z),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear();let Gt=x.toneMapping;x.toneMapping=pi,Xr(O,ht,ft),E.updateMultisampleRenderTarget(xt),E.updateRenderTargetMipmap(xt);let Wt=!1;for(let Jt=0,Xt=at.length;Jt<Xt;Jt++){let qt=at[Jt],Me=qt.object,nn=qt.geometry,Ce=qt.material,Bn=qt.group;if(Ce.side===Sn&&Me.layers.test(ft.layers)){let pe=Ce.side;Ce.side=Je,Ce.needsUpdate=!0,cu(Me,ht,ft,nn,Ce,Bn),Ce.side=pe,Ce.needsUpdate=!0,Wt=!0}}Wt===!0&&(E.updateMultisampleRenderTarget(xt),E.updateRenderTargetMipmap(xt)),x.setRenderTarget(Ht),x.setClearColor(Z,V),x.toneMapping=Gt}function Xr(O,at,ht){let ft=at.isScene===!0?at.overrideMaterial:null;for(let ut=0,Ot=O.length;ut<Ot;ut++){let Ht=O[ut],Gt=Ht.object,Wt=Ht.geometry,Jt=ft===null?Ht.material:ft,Xt=Ht.group;Gt.layers.test(ht.layers)&&cu(Gt,at,ht,Wt,Jt,Xt)}}function cu(O,at,ht,ft,ut,Ot){O.onBeforeRender(x,at,ht,ft,ut,Ot),O.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,O.matrixWorld),O.normalMatrix.getNormalMatrix(O.modelViewMatrix),ut.onBeforeRender(x,at,ht,ft,O,Ot),ut.transparent===!0&&ut.side===Sn&&ut.forceSinglePass===!1?(ut.side=Je,ut.needsUpdate=!0,x.renderBufferDirect(ht,at,ft,ut,O,Ot),ut.side=gi,ut.needsUpdate=!0,x.renderBufferDirect(ht,at,ft,ut,O,Ot),ut.side=Sn):x.renderBufferDirect(ht,at,ft,ut,O,Ot),O.onAfterRender(x,at,ht,ft,ut,Ot)}function jr(O,at,ht){at.isScene!==!0&&(at=Tt);let ft=tt.get(O),ut=p.state.lights,Ot=p.state.shadowsArray,Ht=ut.state.version,Gt=Et.getParameters(O,ut.state,Ot,at,ht),Wt=Et.getProgramCacheKey(Gt),Jt=ft.programs;ft.environment=O.isMeshStandardMaterial?at.environment:null,ft.fog=at.fog,ft.envMap=(O.isMeshStandardMaterial?z:y).get(O.envMap||ft.environment),Jt===void 0&&(O.addEventListener("dispose",Mt),Jt=new Map,ft.programs=Jt);let Xt=Jt.get(Wt);if(Xt!==void 0){if(ft.currentProgram===Xt&&ft.lightsStateVersion===Ht)return hu(O,Gt),Xt}else Gt.uniforms=Et.getUniforms(O),O.onBuild(ht,Gt,x),O.onBeforeCompile(Gt,x),Xt=Et.acquireProgram(Gt,Wt),Jt.set(Wt,Xt),ft.uniforms=Gt.uniforms;let qt=ft.uniforms;return(!O.isShaderMaterial&&!O.isRawShaderMaterial||O.clipping===!0)&&(qt.clippingPlanes=zt.uniform),hu(O,Gt),ft.needsLights=_f(O),ft.lightsStateVersion=Ht,ft.needsLights&&(qt.ambientLightColor.value=ut.state.ambient,qt.lightProbe.value=ut.state.probe,qt.directionalLights.value=ut.state.directional,qt.directionalLightShadows.value=ut.state.directionalShadow,qt.spotLights.value=ut.state.spot,qt.spotLightShadows.value=ut.state.spotShadow,qt.rectAreaLights.value=ut.state.rectArea,qt.ltc_1.value=ut.state.rectAreaLTC1,qt.ltc_2.value=ut.state.rectAreaLTC2,qt.pointLights.value=ut.state.point,qt.pointLightShadows.value=ut.state.pointShadow,qt.hemisphereLights.value=ut.state.hemi,qt.directionalShadowMap.value=ut.state.directionalShadowMap,qt.directionalShadowMatrix.value=ut.state.directionalShadowMatrix,qt.spotShadowMap.value=ut.state.spotShadowMap,qt.spotLightMatrix.value=ut.state.spotLightMatrix,qt.spotLightMap.value=ut.state.spotLightMap,qt.pointShadowMap.value=ut.state.pointShadowMap,qt.pointShadowMatrix.value=ut.state.pointShadowMatrix),ft.currentProgram=Xt,ft.uniformsList=null,Xt}function uu(O){if(O.uniformsList===null){let at=O.currentProgram.getUniforms();O.uniformsList=Ts.seqWithValue(at.seq,O.uniforms)}return O.uniformsList}function hu(O,at){let ht=tt.get(O);ht.outputColorSpace=at.outputColorSpace,ht.batching=at.batching,ht.instancing=at.instancing,ht.instancingColor=at.instancingColor,ht.skinning=at.skinning,ht.morphTargets=at.morphTargets,ht.morphNormals=at.morphNormals,ht.morphColors=at.morphColors,ht.morphTargetsCount=at.morphTargetsCount,ht.numClippingPlanes=at.numClippingPlanes,ht.numIntersection=at.numClipIntersection,ht.vertexAlphas=at.vertexAlphas,ht.vertexTangents=at.vertexTangents,ht.toneMapping=at.toneMapping}function mf(O,at,ht,ft,ut){at.isScene!==!0&&(at=Tt),E.resetTextureUnits();let Ot=at.fog,Ht=ft.isMeshStandardMaterial?at.environment:null,Gt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:jn,Wt=(ft.isMeshStandardMaterial?z:y).get(ft.envMap||Ht),Jt=ft.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,Xt=!!ht.attributes.tangent&&(!!ft.normalMap||ft.anisotropy>0),qt=!!ht.morphAttributes.position,Me=!!ht.morphAttributes.normal,nn=!!ht.morphAttributes.color,Ce=pi;ft.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ce=x.toneMapping);let Bn=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,pe=Bn!==void 0?Bn.length:0,Qt=tt.get(ft),Fo=p.state.lights;if(dt===!0&&(yt===!0||O!==C)){let hn=O===C&&ft.id===j;zt.setState(ft,O,hn)}let ve=!1;ft.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==Fo.state.version||Qt.outputColorSpace!==Gt||ut.isBatchedMesh&&Qt.batching===!1||!ut.isBatchedMesh&&Qt.batching===!0||ut.isInstancedMesh&&Qt.instancing===!1||!ut.isInstancedMesh&&Qt.instancing===!0||ut.isSkinnedMesh&&Qt.skinning===!1||!ut.isSkinnedMesh&&Qt.skinning===!0||ut.isInstancedMesh&&Qt.instancingColor===!0&&ut.instanceColor===null||ut.isInstancedMesh&&Qt.instancingColor===!1&&ut.instanceColor!==null||Qt.envMap!==Wt||ft.fog===!0&&Qt.fog!==Ot||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==zt.numPlanes||Qt.numIntersection!==zt.numIntersection)||Qt.vertexAlphas!==Jt||Qt.vertexTangents!==Xt||Qt.morphTargets!==qt||Qt.morphNormals!==Me||Qt.morphColors!==nn||Qt.toneMapping!==Ce||P.isWebGL2===!0&&Qt.morphTargetsCount!==pe)&&(ve=!0):(ve=!0,Qt.__version=ft.version);let wi=Qt.currentProgram;ve===!0&&(wi=jr(ft,at,ut));let du=!1,qs=!1,Bo=!1,ke=wi.getUniforms(),Ti=Qt.uniforms;if(w.useProgram(wi.program)&&(du=!0,qs=!0,Bo=!0),ft.id!==j&&(j=ft.id,qs=!0),du||C!==O){ke.setValue(v,"projectionMatrix",O.projectionMatrix),ke.setValue(v,"viewMatrix",O.matrixWorldInverse);let hn=ke.map.cameraPosition;hn!==void 0&&hn.setValue(v,Dt.setFromMatrixPosition(O.matrixWorld)),P.logarithmicDepthBuffer&&ke.setValue(v,"logDepthBufFC",2/(Math.log(O.far+1)/Math.LN2)),(ft.isMeshPhongMaterial||ft.isMeshToonMaterial||ft.isMeshLambertMaterial||ft.isMeshBasicMaterial||ft.isMeshStandardMaterial||ft.isShaderMaterial)&&ke.setValue(v,"isOrthographic",O.isOrthographicCamera===!0),C!==O&&(C=O,qs=!0,Bo=!0)}if(ut.isSkinnedMesh){ke.setOptional(v,ut,"bindMatrix"),ke.setOptional(v,ut,"bindMatrixInverse");let hn=ut.skeleton;hn&&(P.floatVertexTextures?(hn.boneTexture===null&&hn.computeBoneTexture(),ke.setValue(v,"boneTexture",hn.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ut.isBatchedMesh&&(ke.setOptional(v,ut,"batchingTexture"),ke.setValue(v,"batchingTexture",ut._matricesTexture,E));let zo=ht.morphAttributes;if((zo.position!==void 0||zo.normal!==void 0||zo.color!==void 0&&P.isWebGL2===!0)&&A.update(ut,ht,wi),(qs||Qt.receiveShadow!==ut.receiveShadow)&&(Qt.receiveShadow=ut.receiveShadow,ke.setValue(v,"receiveShadow",ut.receiveShadow)),ft.isMeshGouraudMaterial&&ft.envMap!==null&&(Ti.envMap.value=Wt,Ti.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),qs&&(ke.setValue(v,"toneMappingExposure",x.toneMappingExposure),Qt.needsLights&&gf(Ti,Bo),Ot&&ft.fog===!0&&pt.refreshFogUniforms(Ti,Ot),pt.refreshMaterialUniforms(Ti,ft,K,nt,xt),Ts.upload(v,uu(Qt),Ti,E)),ft.isShaderMaterial&&ft.uniformsNeedUpdate===!0&&(Ts.upload(v,uu(Qt),Ti,E),ft.uniformsNeedUpdate=!1),ft.isSpriteMaterial&&ke.setValue(v,"center",ut.center),ke.setValue(v,"modelViewMatrix",ut.modelViewMatrix),ke.setValue(v,"normalMatrix",ut.normalMatrix),ke.setValue(v,"modelMatrix",ut.matrixWorld),ft.isShaderMaterial||ft.isRawShaderMaterial){let hn=ft.uniformsGroups;for(let Ho=0,vf=hn.length;Ho<vf;Ho++)if(P.isWebGL2){let fu=hn[Ho];wt.update(fu,wi),wt.bind(fu,wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return wi}function gf(O,at){O.ambientLightColor.needsUpdate=at,O.lightProbe.needsUpdate=at,O.directionalLights.needsUpdate=at,O.directionalLightShadows.needsUpdate=at,O.pointLights.needsUpdate=at,O.pointLightShadows.needsUpdate=at,O.spotLights.needsUpdate=at,O.spotLightShadows.needsUpdate=at,O.rectAreaLights.needsUpdate=at,O.hemisphereLights.needsUpdate=at}function _f(O){return O.isMeshLambertMaterial||O.isMeshToonMaterial||O.isMeshPhongMaterial||O.isMeshStandardMaterial||O.isShadowMaterial||O.isShaderMaterial&&O.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(O,at,ht){tt.get(O.texture).__webglTexture=at,tt.get(O.depthTexture).__webglTexture=ht;let ft=tt.get(O);ft.__hasExternalTextures=!0,ft.__hasExternalTextures&&(ft.__autoAllocateDepthBuffer=ht===void 0,ft.__autoAllocateDepthBuffer||F.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ft.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(O,at){let ht=tt.get(O);ht.__webglFramebuffer=at,ht.__useDefaultFramebuffer=at===void 0},this.setRenderTarget=function(O,at=0,ht=0){R=O,I=at,L=ht;let ft=!0,ut=null,Ot=!1,Ht=!1;if(O){let Wt=tt.get(O);Wt.__useDefaultFramebuffer!==void 0?(w.bindFramebuffer(v.FRAMEBUFFER,null),ft=!1):Wt.__webglFramebuffer===void 0?E.setupRenderTarget(O):Wt.__hasExternalTextures&&E.rebindTextures(O,tt.get(O.texture).__webglTexture,tt.get(O.depthTexture).__webglTexture);let Jt=O.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(Ht=!0);let Xt=tt.get(O).__webglFramebuffer;O.isWebGLCubeRenderTarget?(Array.isArray(Xt[at])?ut=Xt[at][ht]:ut=Xt[at],Ot=!0):P.isWebGL2&&O.samples>0&&E.useMultisampledRTT(O)===!1?ut=tt.get(O).__webglMultisampledFramebuffer:Array.isArray(Xt)?ut=Xt[ht]:ut=Xt,M.copy(O.viewport),N.copy(O.scissor),b=O.scissorTest}else M.copy(H).multiplyScalar(K).floor(),N.copy(ct).multiplyScalar(K).floor(),b=lt;if(w.bindFramebuffer(v.FRAMEBUFFER,ut)&&P.drawBuffers&&ft&&w.drawBuffers(O,ut),w.viewport(M),w.scissor(N),w.setScissorTest(b),Ot){let Wt=tt.get(O.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+at,Wt.__webglTexture,ht)}else if(Ht){let Wt=tt.get(O.texture),Jt=at||0;v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,Wt.__webglTexture,ht||0,Jt)}j=-1},this.readRenderTargetPixels=function(O,at,ht,ft,ut,Ot,Ht){if(!(O&&O.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=tt.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Ht!==void 0&&(Gt=Gt[Ht]),Gt){w.bindFramebuffer(v.FRAMEBUFFER,Gt);try{let Wt=O.texture,Jt=Wt.format,Xt=Wt.type;if(Jt!==wn&&et.convert(Jt)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let qt=Xt===lr&&(F.has("EXT_color_buffer_half_float")||P.isWebGL2&&F.has("EXT_color_buffer_float"));if(Xt!==mi&&et.convert(Xt)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Xt===di&&(P.isWebGL2||F.has("OES_texture_float")||F.has("WEBGL_color_buffer_float")))&&!qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}at>=0&&at<=O.width-ft&&ht>=0&&ht<=O.height-ut&&v.readPixels(at,ht,ft,ut,et.convert(Jt),et.convert(Xt),Ot)}finally{let Wt=R!==null?tt.get(R).__webglFramebuffer:null;w.bindFramebuffer(v.FRAMEBUFFER,Wt)}}},this.copyFramebufferToTexture=function(O,at,ht=0){let ft=Math.pow(2,-ht),ut=Math.floor(at.image.width*ft),Ot=Math.floor(at.image.height*ft);E.setTexture2D(at,0),v.copyTexSubImage2D(v.TEXTURE_2D,ht,0,0,O.x,O.y,ut,Ot),w.unbindTexture()},this.copyTextureToTexture=function(O,at,ht,ft=0){let ut=at.image.width,Ot=at.image.height,Ht=et.convert(ht.format),Gt=et.convert(ht.type);E.setTexture2D(ht,0),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,ht.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ht.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,ht.unpackAlignment),at.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,ft,O.x,O.y,ut,Ot,Ht,Gt,at.image.data):at.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,ft,O.x,O.y,at.mipmaps[0].width,at.mipmaps[0].height,Ht,at.mipmaps[0].data):v.texSubImage2D(v.TEXTURE_2D,ft,O.x,O.y,Ht,Gt,at.image),ft===0&&ht.generateMipmaps&&v.generateMipmap(v.TEXTURE_2D),w.unbindTexture()},this.copyTextureToTexture3D=function(O,at,ht,ft,ut=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Ot=O.max.x-O.min.x+1,Ht=O.max.y-O.min.y+1,Gt=O.max.z-O.min.z+1,Wt=et.convert(ft.format),Jt=et.convert(ft.type),Xt;if(ft.isData3DTexture)E.setTexture3D(ft,0),Xt=v.TEXTURE_3D;else if(ft.isDataArrayTexture||ft.isCompressedArrayTexture)E.setTexture2DArray(ft,0),Xt=v.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,ft.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ft.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,ft.unpackAlignment);let qt=v.getParameter(v.UNPACK_ROW_LENGTH),Me=v.getParameter(v.UNPACK_IMAGE_HEIGHT),nn=v.getParameter(v.UNPACK_SKIP_PIXELS),Ce=v.getParameter(v.UNPACK_SKIP_ROWS),Bn=v.getParameter(v.UNPACK_SKIP_IMAGES),pe=ht.isCompressedTexture?ht.mipmaps[ut]:ht.image;v.pixelStorei(v.UNPACK_ROW_LENGTH,pe.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,pe.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,O.min.x),v.pixelStorei(v.UNPACK_SKIP_ROWS,O.min.y),v.pixelStorei(v.UNPACK_SKIP_IMAGES,O.min.z),ht.isDataTexture||ht.isData3DTexture?v.texSubImage3D(Xt,ut,at.x,at.y,at.z,Ot,Ht,Gt,Wt,Jt,pe.data):ht.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),v.compressedTexSubImage3D(Xt,ut,at.x,at.y,at.z,Ot,Ht,Gt,Wt,pe.data)):v.texSubImage3D(Xt,ut,at.x,at.y,at.z,Ot,Ht,Gt,Wt,Jt,pe),v.pixelStorei(v.UNPACK_ROW_LENGTH,qt),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,Me),v.pixelStorei(v.UNPACK_SKIP_PIXELS,nn),v.pixelStorei(v.UNPACK_SKIP_ROWS,Ce),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Bn),ut===0&&ft.generateMipmaps&&v.generateMipmap(Xt),w.unbindTexture()},this.initTexture=function(O){O.isCubeTexture?E.setTextureCube(O,0):O.isData3DTexture?E.setTexture3D(O,0):O.isDataArrayTexture||O.isCompressedArrayTexture?E.setTexture2DArray(O,0):E.setTexture2D(O,0),w.unbindTexture()},this.resetState=function(){I=0,L=0,R=null,w.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===vc?"display-p3":"srgb",e.unpackColorSpace=ae.workingColorSpace===io?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ne?ki:ad}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===ki?Ne:jn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},$l=class extends fr{};$l.prototype.isWebGL1Renderer=!0;var Ha=class n{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new jt(t),this.near=e,this.far=i}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Va=class extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var tn=class extends Yn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Uh=new $,Fh=new $,Bh=new ue,_l=new Fi,ga=new Ps,Tn=class extends Ee{constructor(t=new he,e=new tn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Uh.fromBufferAttribute(e,s-1),Fh.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Uh.distanceTo(Fh);t.setAttribute("lineDistance",new re(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ga.copy(i.boundingSphere),ga.applyMatrix4(s),ga.radius+=r,t.ray.intersectsSphere(ga)===!1)return;Bh.copy(s).invert(),_l.copy(t.ray).applyMatrix4(Bh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new $,h=new $,u=new $,f=new $,d=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){let m=Math.max(0,a.start),S=Math.min(g.count,a.start+a.count);for(let x=m,T=S-1;x<T;x+=d){let I=g.getX(x),L=g.getX(x+1);if(l.fromBufferAttribute(p,I),h.fromBufferAttribute(p,L),_l.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let j=t.ray.origin.distanceTo(f);j<t.near||j>t.far||e.push({distance:j,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let m=Math.max(0,a.start),S=Math.min(p.count,a.start+a.count);for(let x=m,T=S-1;x<T;x+=d){if(l.fromBufferAttribute(p,x),h.fromBufferAttribute(p,x+1),_l.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let L=t.ray.origin.distanceTo(f);L<t.near||L>t.far||e.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},zh=new $,Hh=new $,zi=class extends Tn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)zh.fromBufferAttribute(e,s),Hh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+zh.distanceTo(Hh);t.setAttribute("lineDistance",new re(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var pr=class extends mn{constructor(t,e,i,s,r,a,o,c,l){super(t,e,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},gn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);let h=i[s],f=i[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new St:new $);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new $,s=[],r=[],a=[],o=new $,c=new ue;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new $)}r[0]=new $,a[0]=new $;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Le(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Le(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},mr=class extends gn{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e){let i=e||new St,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Xl=class extends mr{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function bc(){let n=0,t=0,e=0,i=0;function s(r,a,o,c){n=r,t=o,e=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let f=(a-r)/l-(o-r)/(l+h)+(o-a)/h,d=(o-a)/h-(c-a)/(h+u)+(c-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var _a=new $,vl=new bc,xl=new bc,yl=new bc,jl=class extends gn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new $){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(_a.subVectors(s[0],s[1]).add(s[0]),l=_a);let u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(_a.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=_a),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),vl.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,_,p),xl.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,_,p),yl.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(vl.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),xl.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),yl.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(vl.calc(c),xl.calc(c),yl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new $().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Vh(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,c=n*o;return(2*e-2*i+r+a)*c+(-3*e+3*i-2*r-a)*o+r*n+e}function Pv(n,t){let e=1-n;return e*e*t}function Lv(n,t){return 2*(1-n)*n*t}function Iv(n,t){return n*n*t}function sr(n,t,e,i){return Pv(n,t)+Lv(n,e)+Iv(n,i)}function Dv(n,t){let e=1-n;return e*e*e*t}function Ov(n,t){let e=1-n;return 3*e*e*n*t}function Nv(n,t){return 3*(1-n)*n*n*t}function kv(n,t){return n*n*n*t}function rr(n,t,e,i,s){return Dv(n,t)+Ov(n,e)+Nv(n,i)+kv(n,s)}var Ga=class extends gn{constructor(t=new St,e=new St,i=new St,s=new St){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new St){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(rr(t,s.x,r.x,a.x,o.x),rr(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ql=class extends gn{constructor(t=new $,e=new $,i=new $,s=new $){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new $){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(rr(t,s.x,r.x,a.x,o.x),rr(t,s.y,r.y,a.y,o.y),rr(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Wa=class extends gn{constructor(t=new St,e=new St){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new St){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new St){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yl=class extends gn{constructor(t=new $,e=new $){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new $){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new $){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$a=class extends gn{constructor(t=new St,e=new St,i=new St){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new St){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(sr(t,s.x,r.x,a.x),sr(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Zl=class extends gn{constructor(t=new $,e=new $,i=new $){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new $){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(sr(t,s.x,r.x,a.x),sr(t,s.y,r.y,a.y),sr(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xa=class extends gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new St){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(Vh(o,c.x,l.x,h.x,u.x),Vh(o,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new St().fromArray(s))}return this}},Kl=Object.freeze({__proto__:null,ArcCurve:Xl,CatmullRomCurve3:jl,CubicBezierCurve:Ga,CubicBezierCurve3:ql,EllipseCurve:mr,LineCurve:Wa,LineCurve3:Yl,QuadraticBezierCurve:$a,QuadraticBezierCurve3:Zl,SplineCurve:Xa}),Jl=class extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Kl[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Kl[s.type]().fromJSON(s))}return this}},ja=class extends Jl{constructor(t){super(),this.type="Path",this.currentPoint=new St,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Wa(this.currentPoint.clone(),new St(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new $a(this.currentPoint.clone(),new St(t,e),new St(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new Ga(this.currentPoint.clone(),new St(t,e),new St(i,s),new St(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Xa(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,a,o,c),this}absellipse(t,e,i,s,r,a,o,c){let l=new mr(t,e,i,s,r,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var Hi=class n extends he{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,_=[],p=i/2,m=0;S(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(f,3)),this.setAttribute("uv",new re(d,2));function S(){let T=new $,I=new $,L=0,R=(e-t)/i;for(let j=0;j<=r;j++){let C=[],M=j/r,N=M*(e-t)+t;for(let b=0;b<=s;b++){let Z=b/s,V=Z*c+o,U=Math.sin(V),nt=Math.cos(V);I.x=N*U,I.y=-M*i+p,I.z=N*nt,u.push(I.x,I.y,I.z),T.set(U,R,nt).normalize(),f.push(T.x,T.y,T.z),d.push(Z,1-M),C.push(g++)}_.push(C)}for(let j=0;j<s;j++)for(let C=0;C<r;C++){let M=_[C][j],N=_[C+1][j],b=_[C+1][j+1],Z=_[C][j+1];h.push(M,N,Z),h.push(N,b,Z),L+=6}l.addGroup(m,L,0),m+=L}function x(T){let I=g,L=new St,R=new $,j=0,C=T===!0?t:e,M=T===!0?1:-1;for(let b=1;b<=s;b++)u.push(0,p*M,0),f.push(0,M,0),d.push(.5,.5),g++;let N=g;for(let b=0;b<=s;b++){let V=b/s*c+o,U=Math.cos(V),nt=Math.sin(V);R.x=C*nt,R.y=p*M,R.z=C*U,u.push(R.x,R.y,R.z),f.push(0,M,0),L.x=U*.5+.5,L.y=nt*.5*M+.5,d.push(L.x,L.y),g++}for(let b=0;b<s;b++){let Z=I+b,V=N+b;T===!0?h.push(V,V+1,Z):h.push(V+1,V,Z),j+=3}l.addGroup(m,j,T===!0?1:2),m+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var gr=class extends ja{constructor(t){super(t),this.uuid=ji(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new ja().fromJSON(s))}return this}},Uv={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=xd(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l,h,u,f,d;if(i&&(r=Vv(n,t,r,e)),n.length>80*e){o=l=n[0],c=h=n[1];for(let g=e;g<s;g+=e)u=n[g],f=n[g+1],u<o&&(o=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);d=Math.max(l-o,h-c),d=d!==0?32767/d:0}return _r(r,a,e,o,c,d,0),a}};function xd(n,t,e,i,s){let r,a;if(s===Qv(n,t,e,i)>0)for(r=t;r<e;r+=i)a=Gh(r,n[r],n[r+1],a);else for(r=e-i;r>=t;r-=i)a=Gh(r,n[r],n[r+1],a);return a&&ro(a,a.next)&&(xr(a),a=a.next),a}function Vi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(ro(e,e.next)||me(e.prev,e,e.next)===0)){if(xr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function _r(n,t,e,i,s,r,a){if(!n)return;!a&&r&&jv(n,i,s,r);let o=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,r?Bv(n,i,s,r):Fv(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),xr(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=zv(Vi(n),t,e),_r(n,t,e,i,s,r,2)):a===2&&Hv(n,t,e,i,s,r):_r(Vi(n),t,e,i,s,r,1);break}}}function Fv(n){let t=n.prev,e=n,i=n.next;if(me(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,c=e.y,l=i.y,h=s<r?s<a?s:a:r<a?r:a,u=o<c?o<l?o:l:c<l?c:l,f=s>r?s>a?s:a:r>a?r:a,d=o>c?o>l?o:l:c>l?c:l,g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=d&&Ss(s,o,r,c,a,l,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Bv(n,t,e,i){let s=n.prev,r=n,a=n.next;if(me(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,f=a.y,d=o<c?o<l?o:l:c<l?c:l,g=h<u?h<f?h:f:u<f?u:f,_=o>c?o>l?o:l:c>l?c:l,p=h>u?h>f?h:f:u>f?u:f,m=Ql(d,g,t,e,i),S=Ql(_,p,t,e,i),x=n.prevZ,T=n.nextZ;for(;x&&x.z>=m&&T&&T.z<=S;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Ss(o,h,c,u,l,f,x.x,x.y)&&me(x.prev,x,x.next)>=0||(x=x.prevZ,T.x>=d&&T.x<=_&&T.y>=g&&T.y<=p&&T!==s&&T!==a&&Ss(o,h,c,u,l,f,T.x,T.y)&&me(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;x&&x.z>=m;){if(x.x>=d&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Ss(o,h,c,u,l,f,x.x,x.y)&&me(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;T&&T.z<=S;){if(T.x>=d&&T.x<=_&&T.y>=g&&T.y<=p&&T!==s&&T!==a&&Ss(o,h,c,u,l,f,T.x,T.y)&&me(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function zv(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!ro(s,r)&&yd(s,i,i.next,r)&&vr(s,r)&&vr(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),xr(i),xr(i.next),i=n=r),i=i.next}while(i!==n);return Vi(i)}function Hv(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Zv(a,o)){let c=bd(a,o);a=Vi(a,a.next),c=Vi(c,c.next),_r(a,t,e,i,s,r,0),_r(c,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Vv(n,t,e,i){let s=[],r,a,o,c,l;for(r=0,a=t.length;r<a;r++)o=t[r]*i,c=r<a-1?t[r+1]*i:n.length,l=xd(n,o,c,i,!1),l===l.next&&(l.steiner=!0),s.push(Yv(l));for(s.sort(Gv),r=0;r<s.length;r++)e=Wv(s[r],e);return e}function Gv(n,t){return n.x-t.x}function Wv(n,t){let e=$v(n,t);if(!e)return t;let i=bd(e,n);return Vi(i,i.next),Vi(e,e.next)}function $v(n,t){let e=t,i=-1/0,s,r=n.x,a=n.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Ss(a<l?r:i,a,c,l,a<l?i:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),vr(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Xv(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function Xv(n,t){return me(n.prev,n,t.prev)<0&&me(t.next,n,n.next)<0}function jv(n,t,e,i){let s=n;do s.z===0&&(s.z=Ql(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,qv(s)}function qv(n){let t,e,i,s,r,a,o,c,l=1;do{for(e=n,n=null,r=null,a=0;e;){for(a++,i=e,o=0,t=0;t<l&&(o++,i=i.nextZ,!!i);t++);for(c=l;o>0||c>0&&i;)o!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,o--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(a>1);return n}function Ql(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Yv(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Ss(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Zv(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Kv(n,t)&&(vr(n,t)&&vr(t,n)&&Jv(n,t)&&(me(n.prev,n,t.prev)||me(n,t.prev,t))||ro(n,t)&&me(n.prev,n,n.next)>0&&me(t.prev,t,t.next)>0)}function me(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function ro(n,t){return n.x===t.x&&n.y===t.y}function yd(n,t,e,i){let s=xa(me(n,t,e)),r=xa(me(n,t,i)),a=xa(me(e,i,n)),o=xa(me(e,i,t));return!!(s!==r&&a!==o||s===0&&va(n,e,t)||r===0&&va(n,i,t)||a===0&&va(e,n,i)||o===0&&va(e,t,i))}function va(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function xa(n){return n>0?1:n<0?-1:0}function Kv(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&yd(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function vr(n,t){return me(n.prev,n,n.next)<0?me(n,t,n.next)>=0&&me(n,n.prev,t)>=0:me(n,t,n.prev)<0||me(n,n.next,t)<0}function Jv(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function bd(n,t){let e=new tc(n.i,n.x,n.y),i=new tc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Gh(n,t,e,i){let s=new tc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function xr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function tc(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Qv(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var ar=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Wh(t),$h(i,t);let a=t.length;e.forEach(Wh);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,$h(i,e[c]);let o=Uv.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Wh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function $h(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var qa=class n extends he{constructor(t=new gr([new St(.5,.5),new St(-.5,.5),new St(-.5,-.5),new St(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new re(s,3)),this.setAttribute("uv",new re(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:tx,x,T=!1,I,L,R,j;m&&(x=m.getSpacedPoints(h),T=!0,f=!1,I=m.computeFrenetFrames(h,!1),L=new $,R=new $,j=new $),f||(p=0,d=0,g=0,_=0);let C=o.extractPoints(l),M=C.shape,N=C.holes;if(!ar.isClockWise(M)){M=M.reverse();for(let v=0,J=N.length;v<J;v++){let F=N[v];ar.isClockWise(F)&&(N[v]=F.reverse())}}let Z=ar.triangulateShape(M,N),V=M;for(let v=0,J=N.length;v<J;v++){let F=N[v];M=M.concat(F)}function U(v,J,F){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),v.clone().addScaledVector(J,F)}let nt=M.length,K=Z.length;function rt(v,J,F){let P,w,W,tt=v.x-J.x,E=v.y-J.y,y=F.x-v.x,z=F.y-v.y,st=tt*tt+E*E,Q=tt*z-E*y;if(Math.abs(Q)>Number.EPSILON){let ot=Math.sqrt(st),Et=Math.sqrt(y*y+z*z),pt=J.x-E/ot,Rt=J.y+tt/ot,Ft=F.x-z/Et,zt=F.y+y/Et,gt=((Ft-pt)*z-(zt-Rt)*y)/(tt*z-E*y);P=pt+tt*gt-v.x,w=Rt+E*gt-v.y;let D=P*P+w*w;if(D<=2)return new St(P,w);W=Math.sqrt(D/2)}else{let ot=!1;tt>Number.EPSILON?y>Number.EPSILON&&(ot=!0):tt<-Number.EPSILON?y<-Number.EPSILON&&(ot=!0):Math.sign(E)===Math.sign(z)&&(ot=!0),ot?(P=-E,w=tt,W=Math.sqrt(st)):(P=tt,w=E,W=Math.sqrt(st/2))}return new St(P/W,w/W)}let k=[];for(let v=0,J=V.length,F=J-1,P=v+1;v<J;v++,F++,P++)F===J&&(F=0),P===J&&(P=0),k[v]=rt(V[v],V[F],V[P]);let H=[],ct,lt=k.concat();for(let v=0,J=N.length;v<J;v++){let F=N[v];ct=[];for(let P=0,w=F.length,W=w-1,tt=P+1;P<w;P++,W++,tt++)W===w&&(W=0),tt===w&&(tt=0),ct[P]=rt(F[P],F[W],F[tt]);H.push(ct),lt=lt.concat(ct)}for(let v=0;v<p;v++){let J=v/p,F=d*Math.cos(J*Math.PI/2),P=g*Math.sin(J*Math.PI/2)+_;for(let w=0,W=V.length;w<W;w++){let tt=U(V[w],k[w],P);_t(tt.x,tt.y,-F)}for(let w=0,W=N.length;w<W;w++){let tt=N[w];ct=H[w];for(let E=0,y=tt.length;E<y;E++){let z=U(tt[E],ct[E],P);_t(z.x,z.y,-F)}}}let G=g+_;for(let v=0;v<nt;v++){let J=f?U(M[v],lt[v],G):M[v];T?(R.copy(I.normals[0]).multiplyScalar(J.x),L.copy(I.binormals[0]).multiplyScalar(J.y),j.copy(x[0]).add(R).add(L),_t(j.x,j.y,j.z)):_t(J.x,J.y,0)}for(let v=1;v<=h;v++)for(let J=0;J<nt;J++){let F=f?U(M[J],lt[J],G):M[J];T?(R.copy(I.normals[v]).multiplyScalar(F.x),L.copy(I.binormals[v]).multiplyScalar(F.y),j.copy(x[v]).add(R).add(L),_t(j.x,j.y,j.z)):_t(F.x,F.y,u/h*v)}for(let v=p-1;v>=0;v--){let J=v/p,F=d*Math.cos(J*Math.PI/2),P=g*Math.sin(J*Math.PI/2)+_;for(let w=0,W=V.length;w<W;w++){let tt=U(V[w],k[w],P);_t(tt.x,tt.y,u+F)}for(let w=0,W=N.length;w<W;w++){let tt=N[w];ct=H[w];for(let E=0,y=tt.length;E<y;E++){let z=U(tt[E],ct[E],P);T?_t(z.x,z.y+x[h-1].y,x[h-1].x+F):_t(z.x,z.y,u+F)}}}dt(),yt();function dt(){let v=s.length/3;if(f){let J=0,F=nt*J;for(let P=0;P<K;P++){let w=Z[P];Lt(w[2]+F,w[1]+F,w[0]+F)}J=h+p*2,F=nt*J;for(let P=0;P<K;P++){let w=Z[P];Lt(w[0]+F,w[1]+F,w[2]+F)}}else{for(let J=0;J<K;J++){let F=Z[J];Lt(F[2],F[1],F[0])}for(let J=0;J<K;J++){let F=Z[J];Lt(F[0]+nt*h,F[1]+nt*h,F[2]+nt*h)}}i.addGroup(v,s.length/3-v,0)}function yt(){let v=s.length/3,J=0;xt(V,J),J+=V.length;for(let F=0,P=N.length;F<P;F++){let w=N[F];xt(w,J),J+=w.length}i.addGroup(v,s.length/3-v,1)}function xt(v,J){let F=v.length;for(;--F>=0;){let P=F,w=F-1;w<0&&(w=v.length-1);for(let W=0,tt=h+p*2;W<tt;W++){let E=nt*W,y=nt*(W+1),z=J+P+E,st=J+w+E,Q=J+w+y,ot=J+P+y;Dt(z,st,Q,ot)}}}function _t(v,J,F){c.push(v),c.push(J),c.push(F)}function Lt(v,J,F){Tt(v),Tt(J),Tt(F);let P=s.length/3,w=S.generateTopUV(i,s,P-3,P-2,P-1);Ut(w[0]),Ut(w[1]),Ut(w[2])}function Dt(v,J,F,P){Tt(v),Tt(J),Tt(P),Tt(J),Tt(F),Tt(P);let w=s.length/3,W=S.generateSideWallUV(i,s,w-6,w-3,w-2,w-1);Ut(W[0]),Ut(W[1]),Ut(W[3]),Ut(W[1]),Ut(W[2]),Ut(W[3])}function Tt(v){s.push(c[v*3+0]),s.push(c[v*3+1]),s.push(c[v*3+2])}function Ut(v){r.push(v.x),r.push(v.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return ex(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Kl[s.type]().fromJSON(s)),new n(i,t.options)}},tx={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new St(r,a),new St(o,c),new St(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],u=t[i*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],_=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new St(a,1-c),new St(l,1-u),new St(f,1-g),new St(_,1-m)]:[new St(o,1-c),new St(h,1-u),new St(d,1-g),new St(p,1-m)]}};function ex(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ya=class n extends he{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],c=[],l=[],h=[],u=t,f=(e-t)/s,d=new $,g=new St;for(let _=0;_<=s;_++){for(let p=0;p<=i;p++){let m=r+p/i*a;d.x=u*Math.cos(m),d.y=u*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){let p=_*(i+1);for(let m=0;m<i;m++){let S=m+p,x=S,T=S+i+1,I=S+i+2,L=S+1;o.push(x,T,L),o.push(T,I,L)}}this.setIndex(o),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(l,3)),this.setAttribute("uv",new re(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Kn=class n extends he{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new $,f=new $,d=[],g=[],_=[],p=[];for(let m=0;m<=i;m++){let S=[],x=m/i,T=0;m===0&&a===0?T=.5/e:m===i&&c===Math.PI&&(T=-.5/e);for(let I=0;I<=e;I++){let L=I/e;u.x=-t*Math.cos(s+L*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(s+L*r)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(L+T,1-x),S.push(l++)}h.push(S)}for(let m=0;m<i;m++)for(let S=0;S<e;S++){let x=h[m][S+1],T=h[m][S],I=h[m+1][S],L=h[m+1][S+1];(m!==0||a>0)&&d.push(x,T,L),(m!==i-1||c<Math.PI)&&d.push(T,I,L)}this.setIndex(d),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(_,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Za=class n extends he{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let a=[],o=[],c=[],l=[],h=new $,u=new $,f=new $;for(let d=0;d<=i;d++)for(let g=0;g<=s;g++){let _=g/s*r,p=d/i*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(_),u.y=(t+e*Math.cos(p))*Math.sin(_),u.z=e*Math.sin(p),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/i)}for(let d=1;d<=i;d++)for(let g=1;g<=s;g++){let _=(s+1)*d+g-1,p=(s+1)*(d-1)+g-1,m=(s+1)*(d-1)+g,S=(s+1)*d+g;a.push(_,p,S),a.push(p,m,S)}this.setIndex(a),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ka=class extends Yn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new jt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};var Ae=class extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=od,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var yr=class extends tn{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function ya(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function nx(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Ds=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break e}a=i,i=0;break n}break t}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ec=class extends Ds{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ju,endingEnd:ju}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case qu:r=t,o=2*e-i;break;case Yu:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case qu:a=t,c=2*i-e;break;case Yu:a=1,c=i+s[1]-s[0];break;default:a=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(i-e)/(s-e),_=g*g,p=_*g,m=-f*p+2*f*_-f*g,S=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*g+1,x=(-1-d)*p+(1.5+d)*_+.5*g,T=d*p-d*_;for(let I=0;I!==o;++I)r[I]=m*a[h+I]+S*a[l+I]+x*a[c+I]+T*a[u+I];return r}},nc=class extends Ds{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},ic=class extends Ds{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},An=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ya(e,this.TimeBufferType),this.values=ya(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:ya(t.times,Array),values:ya(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ic(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new nc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ec(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Sa:e=this.InterpolantFactoryMethodDiscrete;break;case Ea:e=this.InterpolantFactoryMethodLinear;break;case qo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Sa;case this.InterpolantFactoryMethodLinear:return Ea;case this.InterpolantFactoryMethodSmooth:return qo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&nx(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===qo,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let u=o*i,f=u-i,d=u+i;for(let g=0;g!==i;++g){let _=e[u+g];if(_!==e[f+g]||_!==e[d+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let u=o*i,f=a*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,c=a*i,l=0;l!==i;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};An.prototype.TimeBufferType=Float32Array;An.prototype.ValueBufferType=Float32Array;An.prototype.DefaultInterpolation=Ea;var Gi=class extends An{};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=Sa;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var sc=class extends An{};sc.prototype.ValueTypeName="color";var rc=class extends An{};rc.prototype.ValueTypeName="number";var ac=class extends Ds{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)an.slerpFlat(r,0,a,l-o,a,l,c);return r}},br=class extends An{InterpolantFactoryMethodLinear(t){return new ac(this.times,this.values,this.getValueSize(),t)}};br.prototype.ValueTypeName="quaternion";br.prototype.DefaultInterpolation=Ea;br.prototype.InterpolantFactoryMethodSmooth=void 0;var Wi=class extends An{};Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Sa;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var oc=class extends An{};oc.prototype.ValueTypeName="vector";var lc=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},ix=new lc,cc=class{constructor(t){this.manager=t!==void 0?t:ix,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};cc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ja=class extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Qa=class extends Ja{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},bl=new ue,Xh=new $,jh=new $,uc=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hr,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Xh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xh),jh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jh),e.updateMatrixWorld(),bl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(bl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var hc=class extends uc{constructor(){super(new Fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mr=class extends Ja{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new hc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Mc="\\[\\]\\.:\\/",sx=new RegExp("["+Mc+"]","g"),Sc="[^"+Mc+"]",rx="[^"+Mc.replace("\\.","")+"]",ax=/((?:WC+[\/:])*)/.source.replace("WC",Sc),ox=/(WCOD+)?/.source.replace("WCOD",rx),lx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Sc),cx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Sc),ux=new RegExp("^"+ax+ox+lx+cx+"$"),hx=["material","materials","bones","map"],dc=class{constructor(t,e,i){let s=i||de.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},de=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(sx,"")}static parseTrackName(t){let e=ux.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);hx.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=i(o.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};de.Composite=dc;de.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};de.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};de.prototype.GetterByBindingType=[de.prototype._getValue_direct,de.prototype._getValue_array,de.prototype._getValue_arrayElement,de.prototype._getValue_toArray];de.prototype.SetterByBindingTypeAndVersioning=[[de.prototype._setValue_direct,de.prototype._setValue_direct_setNeedsUpdate,de.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[de.prototype._setValue_array,de.prototype._setValue_array_setNeedsUpdate,de.prototype._setValue_array_setMatrixWorldNeedsUpdate],[de.prototype._setValue_arrayElement,de.prototype._setValue_arrayElement_setNeedsUpdate,de.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[de.prototype._setValue_fromArray,de.prototype._setValue_fromArray_setNeedsUpdate,de.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kx=new Float32Array(1);var to=class{constructor(t,e,i=0,s=1/0){this.ray=new Fi(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new ur,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,i=[]){return fc(t,this,i,e),i.sort(qh),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)fc(t[s],this,i,e);return i.sort(qh),i}};function qh(n,t){return n.distance-t.distance}function fc(n,t,e,i){if(n.layers.test(t.layers)&&n.raycast(t,e),i===!0){let s=n.children;for(let r=0,a=s.length;r<a;r++)fc(s[r],t,e,!0)}}var Sr=class{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Le(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Er=class extends zi{constructor(t=10,e=10,i=4473924,s=8947848){i=new jt(i),s=new jt(s);let r=e/2,a=t/e,o=t/2,c=[],l=[];for(let f=0,d=0,g=-o;f<=e;f++,g+=a){c.push(-o,0,g,o,0,g),c.push(g,0,-o,g,0,o);let _=f===r?i:s;_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3,_.toArray(l,d),d+=3}let h=new he;h.setAttribute("position",new re(c,3)),h.setAttribute("color",new re(l,3));let u=new tn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Yh=new $,ba,Ml,eo=class extends Ee{constructor(t=new $(0,0,1),e=new $(0,0,0),i=1,s=16776960,r=i*.2,a=r*.2){super(),this.type="ArrowHelper",ba===void 0&&(ba=new he,ba.setAttribute("position",new re([0,0,0,0,1,0],3)),Ml=new Hi(0,.5,1,5,1),Ml.translate(0,-.5,0)),this.position.copy(e),this.line=new Tn(ba,new tn({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new xe(Ml,new je({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,r,a)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Yh.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Yh,e)}}setLength(t,e=t*.2,i=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},wr=class extends zi{constructor(t=1){let e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new he;s.setAttribute("position",new re(e,3)),s.setAttribute("color",new re(i,3));let r=new tn({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(t,e,i){let s=new jt,r=this.geometry.attributes.color.array;return s.set(t),s.toArray(r,0),s.toArray(r,3),s.set(e),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pc);var Md={type:"change"},Ec={type:"start"},Sd={type:"end"},ao=new Fi,Ed=new Ke,fx=Math.cos(70*cd.DEG2RAD),oo=class extends Nn{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$i.ROTATE,MIDDLE:$i.DOLLY,RIGHT:$i.PAN},this.touches={ONE:Xi.ROTATE,TWO:Xi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(A){A.addEventListener("keydown",ot),this._domElementKeyEvents=A},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ot),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(Md),i.update(),r=s.NONE},this.update=function(){let A=new $,q=new an().setFromUnitVectors(t.up,new $(0,1,0)),Y=q.clone().invert(),et=new $,mt=new an,wt=new $,It=2*Math.PI;return function(vt=null){let X=i.object.position;A.copy(X).sub(i.target),A.applyQuaternion(q),o.setFromVector3(A),i.autoRotate&&r===s.NONE&&N(C(vt)),i.enableDamping?(o.theta+=c.theta*i.dampingFactor,o.phi+=c.phi*i.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let bt=i.minAzimuthAngle,Mt=i.maxAzimuthAngle;isFinite(bt)&&isFinite(Mt)&&(bt<-Math.PI?bt+=It:bt>Math.PI&&(bt-=It),Mt<-Math.PI?Mt+=It:Mt>Math.PI&&(Mt-=It),bt<=Mt?o.theta=Math.max(bt,Math.min(Mt,o.theta)):o.theta=o.theta>(bt+Mt)/2?Math.max(bt,o.theta):Math.min(Mt,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(h,i.dampingFactor):i.target.add(h),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&L||i.object.isOrthographicCamera?o.radius=k(o.radius):o.radius=k(o.radius*l),A.setFromSpherical(o),A.applyQuaternion(Y),X.copy(i.target).add(A),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,h.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let Bt=!1;if(i.zoomToCursor&&L){let kt=null;if(i.object.isPerspectiveCamera){let $t=A.length();kt=k($t*l);let ie=$t-kt;i.object.position.addScaledVector(T,ie),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){let $t=new $(I.x,I.y,0);$t.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),Bt=!0;let ie=new $(I.x,I.y,0);ie.unproject(i.object),i.object.position.sub(ie).add($t),i.object.updateMatrixWorld(),kt=A.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;kt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(kt).add(i.object.position):(ao.origin.copy(i.object.position),ao.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(ao.direction))<fx?t.lookAt(i.target):(Ed.setFromNormalAndCoplanarPoint(i.object.up,i.target),ao.intersectPlane(Ed,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/l)),i.object.updateProjectionMatrix(),Bt=!0);return l=1,L=!1,Bt||et.distanceToSquared(i.object.position)>a||8*(1-mt.dot(i.object.quaternion))>a||wt.distanceToSquared(i.target)>0?(i.dispatchEvent(Md),et.copy(i.object.position),mt.copy(i.object.quaternion),wt.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Rt),i.domElement.removeEventListener("pointerdown",tt),i.domElement.removeEventListener("pointercancel",y),i.domElement.removeEventListener("wheel",Q),i.domElement.removeEventListener("pointermove",E),i.domElement.removeEventListener("pointerup",y),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",ot),i._domElementKeyEvents=null)};let i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,a=1e-6,o=new Sr,c=new Sr,l=1,h=new $,u=new St,f=new St,d=new St,g=new St,_=new St,p=new St,m=new St,S=new St,x=new St,T=new $,I=new St,L=!1,R=[],j={};function C(A){return A!==null?2*Math.PI/60*i.autoRotateSpeed*A:2*Math.PI/60/60*i.autoRotateSpeed}function M(A){let q=Math.abs(A)/(100*(window.devicePixelRatio|0));return Math.pow(.95,i.zoomSpeed*q)}function N(A){c.theta-=A}function b(A){c.phi-=A}let Z=function(){let A=new $;return function(Y,et){A.setFromMatrixColumn(et,0),A.multiplyScalar(-Y),h.add(A)}}(),V=function(){let A=new $;return function(Y,et){i.screenSpacePanning===!0?A.setFromMatrixColumn(et,1):(A.setFromMatrixColumn(et,0),A.crossVectors(i.object.up,A)),A.multiplyScalar(Y),h.add(A)}}(),U=function(){let A=new $;return function(Y,et){let mt=i.domElement;if(i.object.isPerspectiveCamera){let wt=i.object.position;A.copy(wt).sub(i.target);let It=A.length();It*=Math.tan(i.object.fov/2*Math.PI/180),Z(2*Y*It/mt.clientHeight,i.object.matrix),V(2*et*It/mt.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(Z(Y*(i.object.right-i.object.left)/i.object.zoom/mt.clientWidth,i.object.matrix),V(et*(i.object.top-i.object.bottom)/i.object.zoom/mt.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function nt(A){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l/=A:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function K(A){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?l*=A:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function rt(A,q){if(!i.zoomToCursor)return;L=!0;let Y=i.domElement.getBoundingClientRect(),et=A-Y.left,mt=q-Y.top,wt=Y.width,It=Y.height;I.x=et/wt*2-1,I.y=-(mt/It)*2+1,T.set(I.x,I.y,1).unproject(i.object).sub(i.object.position).normalize()}function k(A){return Math.max(i.minDistance,Math.min(i.maxDistance,A))}function H(A){u.set(A.clientX,A.clientY)}function ct(A){rt(A.clientX,A.clientX),m.set(A.clientX,A.clientY)}function lt(A){g.set(A.clientX,A.clientY)}function G(A){f.set(A.clientX,A.clientY),d.subVectors(f,u).multiplyScalar(i.rotateSpeed);let q=i.domElement;N(2*Math.PI*d.x/q.clientHeight),b(2*Math.PI*d.y/q.clientHeight),u.copy(f),i.update()}function dt(A){S.set(A.clientX,A.clientY),x.subVectors(S,m),x.y>0?nt(M(x.y)):x.y<0&&K(M(x.y)),m.copy(S),i.update()}function yt(A){_.set(A.clientX,A.clientY),p.subVectors(_,g).multiplyScalar(i.panSpeed),U(p.x,p.y),g.copy(_),i.update()}function xt(A){rt(A.clientX,A.clientY),A.deltaY<0?K(M(A.deltaY)):A.deltaY>0&&nt(M(A.deltaY)),i.update()}function _t(A){let q=!1;switch(A.code){case i.keys.UP:A.ctrlKey||A.metaKey||A.shiftKey?b(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(0,i.keyPanSpeed),q=!0;break;case i.keys.BOTTOM:A.ctrlKey||A.metaKey||A.shiftKey?b(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(0,-i.keyPanSpeed),q=!0;break;case i.keys.LEFT:A.ctrlKey||A.metaKey||A.shiftKey?N(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(i.keyPanSpeed,0),q=!0;break;case i.keys.RIGHT:A.ctrlKey||A.metaKey||A.shiftKey?N(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):U(-i.keyPanSpeed,0),q=!0;break}q&&(A.preventDefault(),i.update())}function Lt(A){if(R.length===1)u.set(A.pageX,A.pageY);else{let q=D(A),Y=.5*(A.pageX+q.x),et=.5*(A.pageY+q.y);u.set(Y,et)}}function Dt(A){if(R.length===1)g.set(A.pageX,A.pageY);else{let q=D(A),Y=.5*(A.pageX+q.x),et=.5*(A.pageY+q.y);g.set(Y,et)}}function Tt(A){let q=D(A),Y=A.pageX-q.x,et=A.pageY-q.y,mt=Math.sqrt(Y*Y+et*et);m.set(0,mt)}function Ut(A){i.enableZoom&&Tt(A),i.enablePan&&Dt(A)}function v(A){i.enableZoom&&Tt(A),i.enableRotate&&Lt(A)}function J(A){if(R.length==1)f.set(A.pageX,A.pageY);else{let Y=D(A),et=.5*(A.pageX+Y.x),mt=.5*(A.pageY+Y.y);f.set(et,mt)}d.subVectors(f,u).multiplyScalar(i.rotateSpeed);let q=i.domElement;N(2*Math.PI*d.x/q.clientHeight),b(2*Math.PI*d.y/q.clientHeight),u.copy(f)}function F(A){if(R.length===1)_.set(A.pageX,A.pageY);else{let q=D(A),Y=.5*(A.pageX+q.x),et=.5*(A.pageY+q.y);_.set(Y,et)}p.subVectors(_,g).multiplyScalar(i.panSpeed),U(p.x,p.y),g.copy(_)}function P(A){let q=D(A),Y=A.pageX-q.x,et=A.pageY-q.y,mt=Math.sqrt(Y*Y+et*et);S.set(0,mt),x.set(0,Math.pow(S.y/m.y,i.zoomSpeed)),nt(x.y),m.copy(S);let wt=(A.pageX+q.x)*.5,It=(A.pageY+q.y)*.5;rt(wt,It)}function w(A){i.enableZoom&&P(A),i.enablePan&&F(A)}function W(A){i.enableZoom&&P(A),i.enableRotate&&J(A)}function tt(A){i.enabled!==!1&&(R.length===0&&(i.domElement.setPointerCapture(A.pointerId),i.domElement.addEventListener("pointermove",E),i.domElement.addEventListener("pointerup",y)),Ft(A),A.pointerType==="touch"?Et(A):z(A))}function E(A){i.enabled!==!1&&(A.pointerType==="touch"?pt(A):st(A))}function y(A){zt(A),R.length===0&&(i.domElement.releasePointerCapture(A.pointerId),i.domElement.removeEventListener("pointermove",E),i.domElement.removeEventListener("pointerup",y)),i.dispatchEvent(Sd),r=s.NONE}function z(A){let q;switch(A.button){case 0:q=i.mouseButtons.LEFT;break;case 1:q=i.mouseButtons.MIDDLE;break;case 2:q=i.mouseButtons.RIGHT;break;default:q=-1}switch(q){case $i.DOLLY:if(i.enableZoom===!1)return;ct(A),r=s.DOLLY;break;case $i.ROTATE:if(A.ctrlKey||A.metaKey||A.shiftKey){if(i.enablePan===!1)return;lt(A),r=s.PAN}else{if(i.enableRotate===!1)return;H(A),r=s.ROTATE}break;case $i.PAN:if(A.ctrlKey||A.metaKey||A.shiftKey){if(i.enableRotate===!1)return;H(A),r=s.ROTATE}else{if(i.enablePan===!1)return;lt(A),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(Ec)}function st(A){switch(r){case s.ROTATE:if(i.enableRotate===!1)return;G(A);break;case s.DOLLY:if(i.enableZoom===!1)return;dt(A);break;case s.PAN:if(i.enablePan===!1)return;yt(A);break}}function Q(A){i.enabled===!1||i.enableZoom===!1||r!==s.NONE||(A.preventDefault(),i.dispatchEvent(Ec),xt(A),i.dispatchEvent(Sd))}function ot(A){i.enabled===!1||i.enablePan===!1||_t(A)}function Et(A){switch(gt(A),R.length){case 1:switch(i.touches.ONE){case Xi.ROTATE:if(i.enableRotate===!1)return;Lt(A),r=s.TOUCH_ROTATE;break;case Xi.PAN:if(i.enablePan===!1)return;Dt(A),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(i.touches.TWO){case Xi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ut(A),r=s.TOUCH_DOLLY_PAN;break;case Xi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;v(A),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(Ec)}function pt(A){switch(gt(A),r){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;J(A),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;F(A),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;w(A),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;W(A),i.update();break;default:r=s.NONE}}function Rt(A){i.enabled!==!1&&A.preventDefault()}function Ft(A){R.push(A.pointerId)}function zt(A){delete j[A.pointerId];for(let q=0;q<R.length;q++)if(R[q]==A.pointerId){R.splice(q,1);return}}function gt(A){let q=j[A.pointerId];q===void 0&&(q=new St,j[A.pointerId]=q),q.set(A.pageX,A.pageY)}function D(A){let q=A.pointerId===R[0]?R[1]:R[0];return j[q]}i.domElement.addEventListener("contextmenu",Rt),i.domElement.addEventListener("pointerdown",tt),i.domElement.addEventListener("pointercancel",y),i.domElement.addEventListener("wheel",Q,{passive:!1}),this.update()}};var lo=class extends Ee{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new St(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},Ns=new $,wd=new ue,Td=new ue,Ad=new $,Rd=new $,co=class{constructor(t={}){let e=this,i,s,r,a,o={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:i,height:s}},this.render=function(d,g){d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),wd.copy(g.matrixWorldInverse),Td.multiplyMatrices(g.projectionMatrix,wd),l(d,d,g),f(d)},this.setSize=function(d,g){i=d,s=g,r=i/2,a=s/2,c.style.width=d+"px",c.style.height=g+"px"};function l(d,g,_){if(d.isCSS2DObject){Ns.setFromMatrixPosition(d.matrixWorld),Ns.applyMatrix4(Td);let p=d.visible===!0&&Ns.z>=-1&&Ns.z<=1&&d.layers.test(_.layers)===!0;if(d.element.style.display=p===!0?"":"none",p===!0){d.onBeforeRender(e,g,_);let S=d.element;S.style.transform="translate("+-100*d.center.x+"%,"+-100*d.center.y+"%)translate("+(Ns.x*r+r)+"px,"+(-Ns.y*a+a)+"px)",S.parentNode!==c&&c.appendChild(S),d.onAfterRender(e,g,_)}let m={distanceToCameraSquared:h(_,d)};o.objects.set(d,m)}for(let p=0,m=d.children.length;p<m;p++)l(d.children[p],g,_)}function h(d,g){return Ad.setFromMatrixPosition(d.matrixWorld),Rd.setFromMatrixPosition(g.matrixWorld),Ad.distanceToSquared(Rd)}function u(d){let g=[];return d.traverse(function(_){_.isCSS2DObject&&g.push(_)}),g}function f(d){let g=u(d).sort(function(p,m){if(p.renderOrder!==m.renderOrder)return m.renderOrder-p.renderOrder;let S=o.objects.get(p).distanceToCameraSquared,x=o.objects.get(m).distanceToCameraSquared;return S-x}),_=g.length;for(let p=0,m=g.length;p<m;p++)g[p].element.style.zIndex=_-p}}};var kc=Tf(Pd());function Ld(n){let{S:t,RL:e,$:i,esc:s,hlLine:r,log:a,cur:o}=n,c=document.getElementById("p-kcp"),l={mode:"T1",drives:!1,enable:!1,user:"Operador",runMode:"GO",screen:"nav",coord:"EIXOS",msgs:[],msgNo:0,msgSel:-1,selected:!1,openEdit:!1,editFile:"src",navFolder:"prog",navSel:null,hmiGroup:1,hmiRow:0,unmastered:new Set,masterSel:0,cycles:0,startHeld:!1,jog:null,extPrev:!1,varName:"$POS_ACT",bco:!0,hStatus:"",manualBusy:!1,lastRelMsg:0},h=[1,3,5,10,20,30,40,50,60,70,80,90,100],u=()=>l.mode==="T1"||l.mode==="T2",f=()=>!!t.machine,d=()=>l.user==="Expert",g="KORUM_R1",_={err:"INTERP",warn:"INTERP",info:"SISTEMA",ok:"SISTEMA",run:"INTERP"};function p(D,A,q){l.msgNo++,l.msgs.push({no:100+l.msgNo%900,type:D,text:A,src:q||"KCP",time:new Date().toTimeString().slice(0,8),ack:D!=="quit"}),l.msgs.length>80&&l.msgs.shift(),l.msgSel=l.msgs.length-1,xt()}t.onLog=(D,A,q)=>{t.pane==="kcp"&&D!=="run"&&p(D==="err"?"quit":D==="warn"?"state":"info",(q&&q.line?`[${q.file}:${q.line}] `:"")+A,/COLIS/i.test(A)?"MOVIMENTO":_[D])};let m=()=>l.msgs.filter(D=>!D.ack).length;function S(D){if(D)l.msgs.forEach(A=>A.ack=!0);else{let A=l.msgs.slice().reverse().find(q=>!q.ack);A&&(A.ack=!0)}l.msgs=l.msgs.filter(A=>!A.ack||A.type!=="quit"),l.msgSel=l.msgs.length-1,xt()}c.innerHTML=`<div class="kpanel" id="kcp">
    <div class="k-tb"><span class="k-ico">\u25A3</span><span>${g}</span><span class="k-tbt">Painel de programa\xE7\xE3o \xB7 Ctrl+F12 = IHM da c\xE9lula</span></div>
    <div class="k-menu" id="kMenu"></div>
    <div class="k-row"><div class="k-main" id="kMain"></div><div class="k-side" id="kSide"></div></div>
    <div class="k-msgs" id="kMsgs"></div>
    <div class="k-status" id="kStatus"></div>
    <div class="k-soft" id="kSoft"></div>
    <div class="k-pop" id="kPop"></div>
  </div>`;let x=i("kMain"),T=i("kSide"),I=i("kSoft"),L=i("kPop"),R={Arquivo:[["Abrir (editar)",()=>st()],["Arquivar projeto (.zip)",()=>Ft()],["Renomear projeto",()=>zt()],["Novo programa",()=>Et()]],Programa:[["Selecionar",()=>E()],["Cancelar sele\xE7\xE3o",()=>y()],["Resetar programa",()=>z()],["-"],["Modo de execu\xE7\xE3o GO (cont\xEDnuo)",()=>gt("GO")],["Modo de execu\xE7\xE3o MSTEP (por movimento)",()=>gt("MSTEP")],["Modo de execu\xE7\xE3o ISTEP (por instru\xE7\xE3o)",()=>gt("ISTEP")]],Configurar:[["Grupo de usu\xE1rio\u2026",()=>G("user")],["Modo de opera\xE7\xE3o (chave)\u2026",()=>G("mode")],["Ferramenta e base ativas",()=>G("pos")]],Monitor:[["Entradas/sa\xEDdas digitais",()=>G("io")],["Vari\xE1vel",()=>G("var")],["Posi\xE7\xE3o atual",()=>G("pos")],["Confirmar todas as mensagens",()=>S(!0)]],Setup:[["Ajustar eixos (mastering)",()=>G("master")],["Limites de software",()=>G("lim")]],Comandos:[["Mover para HOME",()=>nt(()=>K(e.HOME,"HOME"))],["Navegador",()=>G("nav")],["Programa selecionado",()=>G("edit")]],Tecnologia:[["IHM da c\xE9lula (Ctrl+F12)",()=>G("hmi")],["Forma\xE7\xE3o da camada",()=>G("form")],["Contadores",()=>G("cont")]],Ajuda:[["Ajuda dos comandos KRL",()=>n.showHelp()],["Sobre o modo painel",()=>G("about")]]};i("kMenu").innerHTML=Object.keys(R).map(D=>`<span data-m="${D}">${D}</span>`).join(""),i("kMenu").onclick=D=>{let A=D.target.dataset.m;if(!A)return;let q=D.target.getBoundingClientRect(),Y=i("kcp").getBoundingClientRect();L.innerHTML=R[A].map((et,mt)=>et[0]==="-"?"<hr>":`<div data-i="${mt}"><u>${(mt+1)%10}</u> ${s(et[0])}</div>`).join(""),L.style.left=q.left-Y.left+"px",L.style.top=q.bottom-Y.top+"px",L.style.display="block",L.dataset.m=A,D.stopPropagation()},L.onclick=D=>{let A=D.target.closest("[data-i]");A&&(L.style.display="none",R[L.dataset.m][+A.dataset.i][1]())},document.addEventListener("click",()=>L.style.display="none");function j(){let D=l.coord==="EIXOS"?["A1","A2","A3","A4","A5","A6"]:["X","Y","Z","A","B","C"],A=t.machine?t.machine.state:"",q=`
      <button class="k-key k-mode" data-k="mode" title="Chave de modo de opera\xE7\xE3o">${l.mode}</button>
      <button class="k-key ${l.drives?"on":"off"}" data-k="drv" title="Acionamentos (contator)">Acion.<br><b>${l.drives?"I":"0"}</b></button>
      <button class="k-key ${l.enable?"en":""}" data-k="ena" title="Bot\xE3o de habilita\xE7\xE3o (necess\xE1rio em T1/T2)">Habil.<br><b>${l.enable?"\u25A3":"\u25A1"}</b></button>
      <button class="k-key k-start ${A==="running"?"on":""}" data-k="start" title="${u()?"Segure para mover (T1/T2)":"Partida"}">\u25B6<br>Start</button>
      <button class="k-key k-stop" data-k="stop" title="Stop">\u25A0<br>Stop</button>
      <div class="k-ov"><button class="k-key" data-k="ov-">\u2212</button><div><small>${l.jog!==null?"HOV":"POV"}</small><b>${t.pov}%</b></div><button class="k-key" data-k="ov+">+</button></div>
      <button class="k-key k-coord" data-k="coord" title="Sistema de coordenadas do jog">${{EIXOS:"Eixos",BASE:"Base",TOOL:"Ferram."}[l.coord]}</button>
      ${D.map((Y,et)=>`<div class="k-jog"><button class="k-key" data-j="${et}" data-s="-1">\u2212</button><span>${Y}</span><button class="k-key" data-j="${et}" data-s="1">+</button></div>`).join("")}
      <div class="k-rm">${l.runMode}</div>`;q!==l.sideHtml&&(l.sideHtml=q,T.innerHTML=q)}T.addEventListener("click",D=>{let A=D.target.closest("[data-k]");if(!A)return;let q=A.dataset.k;if(q==="mode"&&G("mode"),q==="drv"&&(l.drives=!l.drives,l.drives?(C(),p("info","Acionamentos ligados","ACIONAM.")):(f()&&t.machine.pause(),p("quit","Contator dos acionamentos desligado","ACIONAM."))),q==="ena"&&(l.enable=!l.enable,!l.enable&&u()&&f()&&(t.machine.pause(),p("state","Bot\xE3o de habilita\xE7\xE3o liberado \u2014 movimento parado"))),q==="stop"&&(f()&&(t.machine.pause(),p("state","Programa parado pela tecla Stop")),U()),q==="ov-"||q==="ov+"){let Y=h.findIndex(et=>et>=t.pov);Y<0&&(Y=h.length-1),Y=Math.max(0,Math.min(h.length-1,Y+(q==="ov+"?1:h[Y]===t.pov?-1:0))),t.pov=h[Y],i("pov").value=t.pov,i("povv").textContent=t.pov+"%"}q==="coord"&&(l.coord={EIXOS:"BASE",BASE:"TOOL",TOOL:"EIXOS"}[l.coord]),dt()});function C(){l.msgs.forEach(D=>{/acionamentos desligado/i.test(D.text)&&(D.ack=!0)}),l.msgs=l.msgs.filter(D=>!(D.ack&&D.type==="quit"))}T.addEventListener("pointerdown",D=>{let A=D.target.closest("[data-k=start]");if(A){D.preventDefault(),A.setPointerCapture(D.pointerId),M();return}let q=D.target.closest("[data-j]");q&&(D.preventDefault(),q.setPointerCapture(D.pointerId),V(+q.dataset.j,+q.dataset.s))}),T.addEventListener("pointerup",D=>{D.target.closest("[data-k=start]")&&N(),D.target.closest("[data-j]")&&U()}),T.addEventListener("pointercancel",()=>{N(),U()}),document.addEventListener("pointerup",()=>{l.startHeld&&N(),l.jog!==null&&U()}),window.addEventListener("blur",()=>{l.startHeld&&N(),U()});function M(){if(l.startHeld=!0,l.mode==="EXT")return p("state","Modo EXT: a partida vem do CLP (entrada $IN[8])");if(!l.selected)return p("state","Nenhum programa selecionado (Navegador \u2192 Selecionar)");if(m())return p("state","Confirme as mensagens (Ackn.) antes de continuar");if(u()&&!l.enable)return p("state","Pressione o bot\xE3o de habilita\xE7\xE3o (Habil.) antes do Start");if(!l.drives)return p("quit","Acionamentos desligados \u2014 ligue com a tecla Acion.","ACIONAM.");if(f()){b(),dt();return}Z()}function N(){l.startHeld&&(l.startHeld=!1,u()&&f()&&t.machine.state==="running"&&(t.machine.pause(),Date.now()-l.lastRelMsg>4e3&&(p("state","Tecla Start liberada \u2014 em "+l.mode+" o rob\xF4 s\xF3 se move com Start pressionado"),l.lastRelMsg=Date.now()),dt()))}function b(){let D=t.machine;D&&(D.stepGo?l.runMode==="ISTEP"?D.step():D.resume():D.state==="paused"&&(D.state="running",l.runMode!=="ISTEP"&&(D.stepMode=!1)))}async function Z(){t.tcpLimit=l.mode==="T1"?250:0,G("edit");let D=await n.runProgram(l.runMode==="ISTEP");t.tcpLimit=0,D==="done"&&(l.cycles++,l.bco=!0,p("info","Fim do programa \u2014 cursor volta ao in\xEDcio","INTERP")),dt()}t.onMoved=()=>{t.pane!=="kcp"||!t.machine||(l.bco&&(l.bco=!1,p("info","Coincid\xEAncia de bloco alcan\xE7ada (BCO)","MOVIMENTO")),l.runMode==="MSTEP"&&t.machine.pause())},t.kcpCheck=()=>t.pane!=="kcp"?null:l.unmastered.size?`A\xE7\xE3o inadmiss\xEDvel: eixo ${[...l.unmastered].map(D=>"A"+(D+1)).join(", ")} n\xE3o ajustado`:l.drives?null:"Acionamentos desligados",setInterval(()=>{if(t.pane!=="kcp")return;let D=!!t.ins[8];l.mode==="EXT"&&D&&!l.extPrev&&(l.selected?l.drives?m()?p("state","EXT: h\xE1 mensagens a confirmar"):f()?b():Z():p("quit","EXT: acionamentos desligados","ACIONAM."):p("state","EXT: partida recebida, mas nenhum programa est\xE1 selecionado")),l.extPrev=D,yt(),["io","var","pos","form","cont","hmi"].includes(l.screen)&&P()},150);function V(D,A){if(f())return p("state","Jog n\xE3o permitido com programa em execu\xE7\xE3o");if(!u())return p("state","Jog s\xF3 nos modos T1/T2");if(!l.drives)return p("quit","Acionamentos desligados","ACIONAM.");if(!l.enable)return p("state","Pressione o bot\xE3o de habilita\xE7\xE3o (Habil.)");if(l.coord!=="EIXOS"&&l.unmastered.size)return p("state","Jog cartesiano inadmiss\xEDvel com eixo n\xE3o ajustado");U();let q=performance.now();l.jog=setInterval(()=>{if(!l.drives||!l.enable)return p("state","Jog interrompido","MOVIMENTO"),U();let Y=performance.now(),et=Math.min(.1,(Y-q)/1e3);q=Y;let mt=t.pov/100,wt=t.joints.slice();if(l.coord==="EIXOS"){wt[D]+=A*30*mt*et;let[Nt,vt]=e.LIMITS[D];if(wt[D]<Nt||wt[D]>vt)return wt[D]=Math.max(Nt,Math.min(vt,wt[D])),n.setJoints(wt,!1),p("state",`Limite de software A${D+1}${A>0?"+":"\u2212"}`,"MOVIMENTO"),U()}else{let Nt={X:0,Y:0,Z:0,A:0,B:0,C:0},vt="XYZABC"[D];Nt[vt]=A*(D<3?(l.mode==="T1"?250:400)*mt:30*mt)*et;let X=e.frameToMat(t.base),bt=e.frameToMat(t.tool),Mt=e.mul(e.inv(X),n.tcpWorld()),Bt;if(l.coord==="TOOL")Bt=e.mul(Mt,e.frameToMat(Nt));else{let $t=Mt.slice();$t[3]=$t[7]=$t[11]=0,Bt=e.mul(e.frameToMat({A:Nt.A,B:Nt.B,C:Nt.C}),$t),Bt[3]=Mt[3]+Nt.X,Bt[7]=Mt[7]+Nt.Y,Bt[11]=Mt[11]+Nt.Z}let kt=e.ik(e.mul(X,e.mul(Bt,e.inv(bt))),t.joints);if(!kt.ok)return p("state","Jog parado: "+kt.reason,"MOVIMENTO"),U();if(Math.max(...kt.j.map(($t,ie)=>Math.abs($t-t.joints[ie])))>8)return p("state","Jog parado: singularidade de punho","MOVIMENTO"),U();wt=kt.j}let It=e.checkCollision(wt,e.frameToMat(t.tool));if(It)return n.flashObstacle(It.obstacle.id),p("quit",`Colis\xE3o: ${It.part} encostaria em ${It.obstacle.nome}`,"MOVIMENTO"),U();n.setJoints(wt,!1)},30)}function U(){l.jog!==null&&(clearInterval(l.jog),l.jog=null)}function nt(D){if(f())return lt("H010 Programa em execu\xE7\xE3o \u2014 fun\xE7\xE3o manual bloqueada",!0);if(!u())return lt("H029 Fun\xE7\xF5es manuais s\xF3 nos modos T1/T2",!0);if(!l.drives)return lt("H030 Acionamentos desligados",!0);if(!l.enable)return lt("H031 Pressione o bot\xE3o de habilita\xE7\xE3o",!0);l.manualBusy||(l.manualBusy=!0,lt("H012 Fun\xE7\xE3o manual em execu\xE7\xE3o",!1),Promise.resolve(D()).finally(()=>{l.manualBusy=!1,lt(""),P()}))}function K(D,A){return new Promise(q=>{let Y=t.joints.slice(),et=Math.max(...D.map((X,bt)=>Math.abs(X-Y[bt])));if(et<.01)return q(!0);let mt=Math.max(.3,et/(90*t.pov/100)),wt=0,It=performance.now(),Nt=e.frameToMat(t.tool),vt=X=>{if(!l.drives||!l.enable)return p("state","Fun\xE7\xE3o manual interrompida","IHM"),q(!1);wt+=Math.max(0,(X-It)/1e3),It=X;let bt=Math.min(1,wt/mt),Mt=bt-Math.sin(2*Math.PI*bt)/(2*Math.PI),Bt=Y.map(($t,ie)=>$t+(D[ie]-$t)*Mt),kt=e.checkCollision(Bt,Nt);if(kt)return n.flashObstacle(kt.obstacle.id),p("quit",`${A}: colis\xE3o de ${kt.part} com ${kt.obstacle.nome}`,"IHM"),q(!1);n.setJoints(Bt,!1),bt<1?requestAnimationFrame(vt):q(!0)};requestAnimationFrame(vt)})}function rt(D,A){let q=e.mul(e.frameToMat(D),e.inv(e.frameToMat(t.tool))),Y=e.ik(q,t.joints);return Y.ok?K(Y.j,A):(p("quit",`${A}: ${Y.reason}`,"IHM"),!1)}let k=D=>(o().scene.objetos||[]).find(A=>A.tipo===D);function H(){let D=k("esteira");if(!D)return lt("H040 N\xE3o h\xE1 esteira neste cen\xE1rio",!0);let A=n.parts(),q=n.partsRaw().filter((Y,et)=>Math.abs(A[et].x-D.x)<D.w/2&&Math.abs(A[et].y-D.y)<D.d/2&&Math.abs(A[et].z-(D.h+25))<6);return q.length?new Promise(Y=>{let et=0,mt=performance.now(),wt=D.x+D.w/2-28,It=Nt=>{let vt=(Nt-mt)/1e3;mt=Nt,et+=vt,q.forEach(X=>{X.position.x=Math.min(wt,X.position.x+100*vt)}),et<1?requestAnimationFrame(It):Y()};requestAnimationFrame(It)}):lt("H041 Nenhuma pe\xE7a sobre a esteira",!0)}let ct={1:{t:"Fun\xE7\xF5es manuais garra",rows:[{l:["Abrir garra",()=>n.setOut(1,!1)],r:["Fechar garra",()=>n.setOut(1,!0)]},{l:["Girar garra \u221290\xB0",()=>{let D=t.joints.slice();return D[5]-=90,D[5]<e.LIMITS[5][0]?lt("H050 Limite A6",!0):K(D,"Girar garra")}],r:["Girar garra +90\xB0",()=>{let D=t.joints.slice();return D[5]+=90,D[5]>e.LIMITS[5][1]?lt("H050 Limite A6",!0):K(D,"Girar garra")}]},{l:["Garra para baixo 50 mm",()=>{let D=n.curPos();return D.Z-=50,rt(D,"Garra para baixo")}],r:["Garra para cima 50 mm",()=>{let D=n.curPos();return D.Z+=50,rt(D,"Garra para cima")}]}]},2:{t:"Fun\xE7\xF5es manuais rob\xF4",rows:[{l:["Rob\xF4 para HOME",()=>K(e.HOME,"HOME")],r:["Rob\xF4 p/ pos. manuten\xE7\xE3o",()=>K([0,-110,140,0,-20,0],"Manuten\xE7\xE3o")]},{l:["Rob\xF4 p/ espera mesa",()=>{let D=k("mesa");return D?rt({X:D.x,Y:D.y,Z:D.h+250,A:0,B:90,C:0},"Espera mesa"):lt("H040 N\xE3o h\xE1 mesa",!0)}],r:["Rob\xF4 p/ espera esteira",()=>{let D=k("esteira");return D?rt({X:D.x,Y:D.y,Z:D.h+250,A:0,B:90,C:0},"Espera esteira"):lt("H040 N\xE3o h\xE1 esteira",!0)}]},{l:["Rob\xF4 p/ espera palete",()=>{let D=k("palete");return D?rt({X:D.x,Y:D.y,Z:D.h+280,A:0,B:90,C:0},"Espera palete"):lt("H040 N\xE3o h\xE1 palete",!0)}],r:null}]},3:{t:"Fun\xE7\xF5es manuais pe\xE7as e esteira",rows:[{l:["Repor pe\xE7as (posi\xE7\xE3o inicial)",()=>{n.resetCell(!0),p("info","Pe\xE7as repostas, rob\xF4 em HOME","IHM")}],r:["Esteira avan\xE7ar 100 mm",()=>H()]},{l:["Esteira de entrada desligar",()=>{let D=(o().scene.objetos||[]).find(A=>A.motor);if(!D)return lt("H040 N\xE3o h\xE1 esteira motorizada",!0);n.setOut(D.motor,!1)}],r:["Esteira de entrada ligar",()=>{let D=(o().scene.objetos||[]).find(A=>A.motor);if(!D)return lt("H040 N\xE3o h\xE1 esteira motorizada",!0);n.setOut(D.motor,!0)}]}]},4:{t:"Fun\xE7\xF5es manuais sinais",rows:[2,3,4,5,6,7,8].map(D=>({l:[`$OUT[${D}] desligar`,()=>n.setOut(D,!1)],r:[`$OUT[${D}] ligar`,()=>n.setOut(D,!0)]}))}};function lt(D,A){l.hStatus=D,l.hWarn=!!A,A&&p("state",D,"IHM"),l.screen==="hmi"&&Tt()}function G(D){l.screen=D,Tt(),Dt()}function dt(){j(),yt(),Tt(),Dt()}function yt(){let D=t.machine?t.machine.state:null,A=l.selected?D==="running"?"ok":D==="paused"?"w":"e":"g",q=o(),Y=t.curLine&&t.machine?t.curLine.line:l.selected?1:"",et=`<span>Num</span><span class="k-sir"><i class="ok">S</i><i class="${l.drives?"ok":"e"}">I</i><i class="${A}">R</i></span>
      <span class="k-pn">${l.selected?s(n.progName(q.src).toUpperCase()):"\u2014"}</span><span>IP=${Y}</span><span><b>${l.mode}</b></span><span>${l.runMode}</span>
      <span>${l.jog!==null?"HOV":"POV"} ${t.pov}%</span><span>${g}</span><span>${l.user}</span><span>${new Date().toTimeString().slice(0,5)}</span>`;et!==l.statusHtml&&(l.statusHtml=et,i("kStatus").innerHTML=et)}function xt(){let D={info:"\u24D8",quit:"\u26D4",state:"\u26A0"};i("kMsgs").innerHTML=`<table><tr><th></th><th>Hora</th><th>N\xBA</th><th>Origem</th><th>Mensagem</th></tr>${l.msgs.slice(-40).map((A,q,Y)=>`<tr class="${A.type} ${q===Y.length-1?"sel":""}"><td>${D[A.type]}</td><td>${A.time}</td><td>${A.no}</td><td>${s(A.src)}</td><td>${s(A.text)}</td></tr>`).join("")}</table>`,i("kMsgs").scrollTop=1e6}function _t(D){I.innerHTML=D.map((A,q)=>A?`<button data-s="${q}" ${A[2]===!1?"disabled":""}>${s(A[0])}</button>`:"<button disabled></button>").join(""),I.onclick=A=>{let q=A.target.closest("[data-s]");q&&D[+q.dataset.s][1]()}}let Lt=[["Ackn.",()=>S(!1)],["Ackn. todos",()=>S(!0)]];function Dt(){let D=["Voltar",()=>G(l.selected?"edit":"nav")],A=l.screen;A==="nav"?_t([["Novo",Et,d()],["Selecionar",E],["Duplicar",pt],["Arquivar",Ft],["Apagar",Rt,d()],["Abrir",st,d()],...Lt]):A==="edit"&&l.openEdit?_t([["Fechar",ot],[l.editFile==="src"?"Ver .dat":"Ver .src",()=>{Q(),l.editFile=l.editFile==="src"?"dat":"src",Tt(),Dt()}],["Navegador",()=>{ot(),G("nav")}],null,null,null,...Lt]):_t(A==="edit"?[["Navegador",()=>G("nav")],["Cancelar sele\xE7\xE3o",y,!f()],["Resetar programa",z],["IHM c\xE9lula",()=>G("hmi")],null,null,...Lt]:A==="hmi"?[["Stop rob\xF4",()=>{f()&&t.machine.pause()}],["Forma\xE7\xE3o",()=>G("form")],["Contadores",()=>G("cont")],["Programa",()=>G(l.selected?"edit":"nav")],null,null,...Lt]:A==="master"?[["Desajustar",()=>{if(!d())return p("state","Desajustar exige grupo Expert");f()||(l.unmastered.add(l.masterSel),p("state",`Eixo A${l.masterSel+1} desajustado`,"AJUSTE"),Tt())},d()],["Ajustar (EMT)",()=>{if(!l.unmastered.has(l.masterSel))return p("info",`A${l.masterSel+1} j\xE1 est\xE1 ajustado`,"AJUSTE");if(!u())return p("state","Ajuste s\xF3 em T1/T2","AJUSTE");l.unmastered.delete(l.masterSel),p("info",`Ajuste padr\xE3o (EMT) do eixo A${l.masterSel+1} conclu\xEDdo`,"AJUSTE"),Tt()}],D,null,null,null,...Lt]:[D,null,null,null,null,null,...Lt])}function Tt(){let D=l.screen,A=o();if(x.onclick=null,x.onkeydown=null,D==="nav"){let q=l.navFolder==="prog"?w().projects.flatMap(Y=>["src","dat"].map(et=>({id:Y.id,n:n.progName(Y.src),ext:et,com:Y.name,dt:Y.updated,cat:Y.cat}))):l.navFolder==="ex"?W().map(Y=>({id:"ex:"+Y.id,n:(Y.src.match(/DEF\s+(\w+)/i)||[])[1],ext:"src",com:Y.title,dt:"",cat:Y.cat})):[];x.innerHTML=`<div class="k-nav"><div class="k-tree"><div class="k-filter">Filtro: Detalhe</div>
        <div>\u{1F5A5} ${g} (KRC:\\)</div><div class="ind">\u{1F4C1} R1</div>
        <div class="ind2 ${l.navFolder==="prog"?"on":""}" data-f="prog">\u{1F4C2} Programa</div><div class="ind2 ${l.navFolder==="ex"?"on":""}" data-f="ex">\u{1F4C2} Exemplos</div>
        <div class="ind2" data-f="mada">\u{1F4C1} Mada</div><div class="ind2" data-f="sys">\u{1F4C1} System</div><div class="ind">\u{1F4C1} STEU</div><div>\u{1F4BE} (ARQUIVO:\\)</div></div>
        <div class="k-list"><div class="k-lh">Conte\xFAdo de: ${{prog:"Programa",ex:"Exemplos",mada:"Mada",sys:"System"}[l.navFolder]}</div>
        <table><tr><th>Nome</th><th>Ext</th><th>Coment\xE1rio</th><th>Alterado</th></tr>${q.map(Y=>`<tr data-id="${Y.id}" class="${l.navSel===Y.id?"sel":""}${l.selected&&o()&&Y.id===o().id?" act":""}"><td>${Y.ext==="src"?"\u{1F4C4}":"\u{1F5D2}"} ${s(Y.n)}</td><td>${Y.ext}</td><td>${s(Y.com)}</td><td>${Y.dt?new Date(Y.dt).toLocaleDateString("pt-BR"):""}</td></tr>`).join("")}</table>
        ${l.navFolder==="mada"||l.navFolder==="sys"?'<p class="k-note">Pasta do sistema (dados de m\xE1quina). Somente leitura no simulador.</p>':""}</div>
        <div class="k-cnt">${q.length} objeto(s)</div></div>`,x.querySelector(".k-tree").onclick=Y=>{let et=Y.target.closest("[data-f]");et&&(l.navFolder=et.dataset.f,l.navSel=null,Tt())},x.querySelector(".k-list").onclick=Y=>{let et=Y.target.closest("[data-id]");et&&(l.navSel=et.dataset.id,Tt())},x.querySelector(".k-list").ondblclick=Y=>{let et=Y.target.closest("[data-id]");et&&(l.navSel=et.dataset.id,E())}}else if(D==="edit"){if(!l.selected||!A){x.innerHTML='<div class="k-empty">Nenhum programa selecionado.<br>Abra o Navegador e use Selecionar.</div>';return}let q=n.progName(A.src).toUpperCase();if(l.openEdit){x.innerHTML=`<div class="k-ed"><textarea id="kTa" spellcheck="false">${s(A[l.editFile])}</textarea><div class="k-path">KRC:\\R1\\PROGRAMA\\${q}.${l.editFile.toUpperCase()} \xB7 editando (Expert)</div></div>`;return}let Y=A.src.split(`
`),et=t.curLine&&t.curLine.file==="src"&&t.machine?t.curLine.line:Y.findIndex(It=>/^\s*(GLOBAL\s+)?DEF\s/i.test(It))+1;x.innerHTML=`<div class="k-ed"><div class="k-code" id="kCode">${Y.map((It,Nt)=>`<div class="${Nt+1===et?"ip":""}"><span class="ln">${Nt+1}</span><span class="ar">${Nt+1===et?"\u27A1":""}</span>${r(It)||" "}</div>`).join("")}</div><div class="k-path">KRC:\\R1\\PROGRAMA\\${q}.SRC \xB7 Ln ${et}, Col 0</div></div>`;let mt=i("kCode"),wt=mt.querySelector(".ip");if(wt){let It=wt.offsetTop-mt.clientHeight/3;Math.abs(mt.scrollTop-It)>mt.clientHeight/3&&(mt.scrollTop=It)}}else if(D==="hmi"){let q=ct[l.hmiGroup],Y=l.hStatus||(f()?"H010 Rob\xF4 em ciclo autom\xE1tico":"H007 Rob\xF4 esperando por fun\xE7\xE3o manual ou autom\xE1tico");x.innerHTML=`<div class="k-hmi"><div class="k-htop"><span class="k-hsel">\u2261 Menu</span><span class="k-ht">${s(q.t)}</span><span>${new Date().toLocaleDateString("pt-BR")} ${new Date().toTimeString().slice(0,8)}</span></div>
        <div class="k-hst ${l.hWarn?"warn":""}">${s(Y)}</div><div class="k-hform">${Ut()}</div>
        <div class="k-hbody"><div class="k-hrows">${Array.from({length:8},(et,mt)=>{let wt=q.rows[mt];return`<div class="k-hr" data-r="${mt}"><i>${wt?"\u2298":""}</i><span class="${wt&&l.hmiRow===mt?"yl":""}">${wt&&wt.l?s(wt.l[0]):""}</span><span class="${wt&&l.hmiRow===mt?"cy":""}">${wt&&wt.r?s(wt.r[0]):""}</span><i>${wt?"\u2298":""}</i></div>`}).join("")}</div>
        <div class="k-hpm"><button data-pm="-1" title="Executa a fun\xE7\xE3o da esquerda (amarela)">\u2212</button><button data-pm="1" title="Executa a fun\xE7\xE3o da direita (ciano)">+</button></div></div>
        <div class="k-hgroups">${Object.entries(ct).map(([et,mt])=>`<button data-g="${et}" class="${+et===l.hmiGroup?"on":""}">${et} ${s(mt.t.replace("Fun\xE7\xF5es manuais ",""))}</button>`).join("")}</div></div>`,x.querySelector(".k-hrows").onclick=et=>{let mt=et.target.closest("[data-r]");mt&&q.rows[+mt.dataset.r]&&(l.hmiRow=+mt.dataset.r,Tt())},x.querySelector(".k-hgroups").onclick=et=>{let mt=et.target.closest("[data-g]");mt&&(l.hmiGroup=+mt.dataset.g,l.hmiRow=0,Tt())},x.querySelector(".k-hpm").onclick=et=>{let mt=et.target.closest("[data-pm]");if(!mt)return;let wt=q.rows[l.hmiRow],It=wt&&(+mt.dataset.pm<0?wt.l:wt.r);It&&nt(It[1])}}else if(D==="io"){let q={1:"Partida / sele\xE7\xE3o bit 1",2:"Sele\xE7\xE3o bit 2 / parar ciclos",3:"Sele\xE7\xE3o bit 3",5:"Cortina de luz",6:"Pe\xE7a reprovada (inspe\xE7\xE3o)",7:"Encerrar (CLP)",8:"Partida externa (EXT)"},Y={1:"Garra fechar",2:"Rob\xF4 pronto",3:"Tocha / em ciclo",4:"Cola / m\xE1quina / ciclo ok",5:"C\xE2mera",8:"Alarme / falha"};x.innerHTML=`<div class="k-io"><div><div class="k-lh">Entradas digitais</div><table>${Array.from({length:8},(et,mt)=>mt+1).map(et=>`<tr data-in="${et}"><td><i class="k-led ${t.ins[et]?"on":""}"></i></td><td>$IN[${et}]</td><td>${q[et]||""}</td></tr>`).join("")}</table><p class="k-note">Clique para simular o sinal.</p></div>
        <div><div class="k-lh">Sa\xEDdas digitais</div><table>${Array.from({length:16},(et,mt)=>mt+1).map(et=>`<tr data-out="${et}"><td><i class="k-led ${t.outs[et]?"on":""}"></i></td><td>$OUT[${et}]</td><td>${Y[et]||""}</td></tr>`).join("")}</table><p class="k-note">For\xE7ar sa\xEDda: Expert, modo manual, sem programa rodando.</p></div></div>`,x.onclick=et=>{let mt=et.target.closest("[data-in]"),wt=et.target.closest("[data-out]");if(mt){let It=+mt.dataset.in;t.ins[It]=!t.ins[It];let Nt=i("ins").children[It-1];Nt&&Nt.classList.toggle("on",t.ins[It]),Tt()}if(wt){let It=+wt.dataset.out;if(!d()||!u()||f())return p("state","For\xE7ar sa\xEDda: exige Expert, T1/T2 e programa parado");n.setOut(It,!t.outs[It]),Tt()}}}else if(D==="var"){x.innerHTML=`<div class="k-var"><div class="k-lh">Monitor de vari\xE1vel</div><div class="k-vr"><label>Nome</label><input id="kVn" value="${s(l.varName)}" spellcheck="false"><button id="kVb">Mostrar</button></div>
        <div class="k-vr"><label>Valor atual</label><div id="kVv" class="k-vv"></div></div>
        <div class="k-vq">${["$POS_ACT","$AXIS_ACT","$OUT[1]","$IN[1]","$VEL.CP","$TOOL","$BASE","$OV_PRO"].map(Y=>`<button data-v="${Y}">${Y}</button>`).join("")}</div>
        <p class="k-note">Tamb\xE9m mostra vari\xE1veis do programa (.dat e, com o programa rodando, as do m\xF3dulo). Ex.: P_PEGA_A, P_PEGA_A.Z</p></div>`;let q=()=>{l.varName=i("kVn").value.trim(),P()};i("kVb").onclick=q,i("kVn").onkeydown=Y=>{Y.key==="Enter"&&q()},x.querySelector(".k-vq").onclick=Y=>{let et=Y.target.dataset.v;et&&(i("kVn").value=et,q())},P()}else if(D==="pos")x.innerHTML=`<div class="k-io"><div><div class="k-lh">Posi\xE7\xE3o cartesiana (BASE)</div><table id="kPc"></table><p class="k-note">Ferramenta: {X ${t.tool.X}, Y ${t.tool.Y}, Z ${t.tool.Z}}<br>Base: {X ${t.base.X}, Y ${t.base.Y}, Z ${t.base.Z}, A ${t.base.A}}</p></div><div><div class="k-lh">Posi\xE7\xE3o dos eixos</div><table id="kPa"></table></div></div>`,P();else if(D==="master"||D==="lim")x.innerHTML=`<div class="k-var"><div class="k-lh">${D==="master"?"Ajuste dos eixos (mastering)":"Limites de software"}</div><table class="k-mt">${e.LIMITS.map((q,Y)=>`<tr data-ax="${Y}" class="${D==="master"&&l.masterSel===Y?"sel":""}"><td>A${Y+1}</td>${D==="master"?`<td>${l.unmastered.has(Y)?'<b class="e">N\xC3O AJUSTADO</b>':'<b class="ok">ajustado</b>'}</td>`:`<td>${q[0]}\xB0</td><td>${q[1]}\xB0</td><td>atual ${t.joints[Y].toFixed(1)}\xB0</td>`}</tr>`).join("")}</table>
        <p class="k-note">${D==="master"?"Com um eixo desajustado, o rob\xF4 n\xE3o executa programas nem jog cartesiano (s\xF3 jog por eixos). Desajustar exige o grupo Expert; Ajustar s\xF3 em T1/T2.":"Limites did\xE1ticos do rob\xF4 simulado."}</p></div>`,D==="master"&&(x.querySelector(".k-mt").onclick=q=>{let Y=q.target.closest("[data-ax]");Y&&(l.masterSel=+Y.dataset.ax,Tt())});else if(D==="user"){x.innerHTML=`<div class="k-dlg"><b>Grupo de usu\xE1rio</b><p>Grupo atual: <b>${l.user}</b></p><p>Selecione um novo grupo:</p>
        <div class="k-vq">${["Operador","Usu\xE1rio","Expert"].map(Y=>`<button data-u="${Y}" class="${Y===l.user?"on":""}">${Y}</button>`).join("")}</div>
        <div id="kPw" style="display:none"><p>Digite a senha do grupo Expert:</p><input type="password" id="kPwi"> <button id="kPwb">OK</button><p class="k-note">Senha padr\xE3o do simulador: <code>korum</code></p></div>
        <p class="k-note">Operador e Usu\xE1rio selecionam e executam programas. Expert tamb\xE9m cria, edita, apaga, desajusta eixos e for\xE7a sa\xEDdas.</p></div>`,x.querySelector(".k-vq").onclick=Y=>{let et=Y.target.dataset.u;et&&(et==="Expert"?(i("kPw").style.display="block",i("kPwi").focus()):(l.user=et,p("info",`Grupo de usu\xE1rio: ${et}`,"SISTEMA"),dt()))};let q=()=>{i("kPwi").value==="korum"?(l.user="Expert",p("info","Grupo de usu\xE1rio: Expert","SISTEMA"),dt()):(p("state","Senha incorreta","SISTEMA"),i("kPwi").value="")};x.onclick=Y=>{Y.target.id==="kPwb"&&q()},x.onkeydown=Y=>{Y.target.id==="kPwi"&&Y.key==="Enter"&&q()}}else if(D==="mode"){let q={T1:"Manual com velocidade reduzida: TCP no m\xE1ximo 250 mm/s. Segure Start e mantenha a habilita\xE7\xE3o.",T2:"Manual com velocidade programada (teste). Segure Start e mantenha a habilita\xE7\xE3o.",AUT:"Autom\xE1tico: um toque em Start executa. Habilita\xE7\xE3o n\xE3o \xE9 usada.",EXT:"Autom\xE1tico externo: o CLP d\xE1 a partida pela entrada $IN[8] (borda de subida)."};x.innerHTML=`<div class="k-dlg"><b>Chave de modo de opera\xE7\xE3o</b><div class="k-modes">${Object.keys(q).map(Y=>`<button data-md="${Y}" class="${Y===l.mode?"on":""}"><b>${Y}</b><small>${q[Y]}</small></button>`).join("")}</div>
        <p class="k-note">Trocar de modo para o programa em execu\xE7\xE3o, como no controlador real.</p></div>`,x.querySelector(".k-modes").onclick=Y=>{let et=Y.target.closest("[data-md]");if(!et)return;let mt=et.dataset.md;mt!==l.mode&&(f()&&(t.machine.stop(),p("state","Troca de modo: programa parado","SISTEMA")),l.mode=mt,U(),p("info",`Modo de opera\xE7\xE3o: ${mt}`,"SISTEMA"),(mt==="AUT"||mt==="EXT")&&(l.enable=!1),dt())}}else D==="form"?(x.innerHTML='<div class="k-var"><div class="k-lh">Visualizando forma\xE7\xE3o da camada</div><div id="kForm"></div></div>',P()):D==="cont"?(x.innerHTML='<div class="k-var"><div class="k-lh">Vari\xE1veis 1\u20138</div><table class="k-ct" id="kCt"></table><div class="k-vq"><button id="kCz">Zerar contador de ciclos</button></div></div>',i("kCz").onclick=()=>{l.cycles=0,P()},P()):D==="about"&&(x.innerHTML='<div class="k-dlg"><b>Modo painel</b><p>Reproduz, de forma did\xE1tica, o fluxo de trabalho de um painel de programa\xE7\xE3o de rob\xF4 industrial: navegador de arquivos, sele\xE7\xE3o e execu\xE7\xE3o de programas com a seta de execu\xE7\xE3o, mensagens com confirma\xE7\xE3o, modos T1/T2/AUT/EXT, tecla Start segurada nos modos manuais, bot\xE3o de habilita\xE7\xE3o, jog, override, grupos de usu\xE1rio, ajuste de eixos, monitor de E/S e vari\xE1veis e uma IHM de c\xE9lula (Ctrl+F12).</p><p class="k-note">N\xE3o \xE9 o software de nenhum fabricante e n\xE3o se comunica com rob\xF4s reais.</p></div>')}function Ut(){let D=k("palete");if(!D)return`Cen\xE1rio: ${s(o().scene.nome||"")}`;let A=v(D);return`Palete: ${A.total} pe\xE7a(s) \xB7 ${A.layers.filter(q=>q).length} camada(s)`}function v(D){let A=new Array(16).fill(0),q=0;return n.parts().forEach(Y=>{if(Math.abs(Y.x-D.x)<D.w/2&&Math.abs(Y.y-D.y)<D.d/2){let et=Math.round((Y.z-(D.h+25))/50);et>=0&&et<16&&(A[et]++,q++)}}),{layers:A,total:q}}function J(D){return D===void 0?"(sem valor)":typeof D=="boolean"?D?"TRUE":"FALSE":typeof D=="number"?String(Math.round(D*1e3)/1e3):D&&D.__in?"use $IN[n]":Array.isArray(D)?"["+D.slice(1,17).map(J).join(", ")+"]":typeof D=="object"?"{"+Object.entries(D).filter(([A])=>A!=="__t").map(([A,q])=>`${A} ${J(q)}`).join(", ")+"}":String(D)}function F(D){try{let A=t.machine;if(!A){let q=o(),Y=e.parse(q.src,q.dat),et=Y.errors.length?{mod:{defs:{},order:[],dat:[]}}:Y;A=new e.Machine(et,{getJoints:()=>t.joints,getIn:mt=>!!t.ins[mt],getOverride:()=>t.pov,setOverride(){},log(){},line(){},status(){},output(){}}),A.sys.OUT=t.outs,A.sys.TOOL=Object.assign({__t:"FRAME"},t.tool),A.sys.BASE=Object.assign({__t:"FRAME"},t.base);for(let mt of et.mod.dat)try{mt.compat||A.declare(mt,A.modScope)}catch{}}return J(e.evalExpr(A,(D.toUpperCase().startsWith("$"),D)))}catch(A){return"\u26A0 "+A.message}}function P(){let D=l.screen;if(D==="var"&&i("kVv")&&(i("kVv").textContent=F(l.varName)),D==="pos"&&i("kPc")){let A=n.curPos();i("kPc").innerHTML="XYZABC".split("").map(q=>`<tr><td>${q}</td><td>${A[q].toFixed(2)}</td><td>${"XYZ".includes(q)?"mm":"\xB0"}</td></tr>`).join(""),i("kPa").innerHTML=t.joints.map((q,Y)=>`<tr><td>A${Y+1}</td><td>${q.toFixed(2)}</td><td>\xB0</td></tr>`).join("")}if(D==="form"&&i("kForm")){let A=k("palete");if(!A){i("kForm").innerHTML='<p class="k-note">Este cen\xE1rio n\xE3o tem palete. Abra um exemplo de paletiza\xE7\xE3o (T13, T14 ou "Paletiza\xE7\xE3o 2\xD72").</p>';return}let q=v(A);i("kForm").innerHTML=`<div class="k-pal">${q.layers.map((Y,et)=>({n:Y,i:et})).reverse().map(({n:Y,i:et})=>`<div class="${Y?"full":""}"><span>${et}</span><b style="width:${Math.min(100,Y*25)}%"></b><em>${Y?Y+" pe\xE7a(s)":""}</em></div>`).join("")}<div class="wood"></div></div>
        <p class="k-note">Camadas 0 a 15 do palete. Verde = camada com pe\xE7as. Total: ${q.total} pe\xE7a(s).</p>`}if(D==="cont"&&i("kCt")){let A=k("palete"),q=k("esteira"),Y=n.parts(),et=(wt,It)=>It&&Math.abs(wt.x-It.x)<It.w/2&&Math.abs(wt.y-It.y)<It.d/2,mt=[["Pe\xE7as no palete",A?Y.filter(wt=>et(wt,A)).length:"\u2014",A?Y.length:"\u2014"],["Camadas no palete",A?v(A).layers.filter(wt=>wt).length:"\u2014","\u2014"],["Pe\xE7as na esteira",q?Y.filter(wt=>et(wt,q)).length:"\u2014","\u2014"],["Pe\xE7a na garra",t.outs[1]?"garra fechada":"garra aberta","\u2014"],["Ciclos de programa conclu\xEDdos",l.cycles,"\u2014"],["Override",t.pov+" %","\u2014"]];i("kCt").innerHTML="<tr><th></th><th>Atual</th><th>Nominal</th></tr>"+mt.map(wt=>`<tr><td>${wt[0]}</td><td class="a">${wt[1]}</td><td class="n">${wt[2]}</td></tr>`).join("")}D==="io"&&x.querySelector(".k-io")&&(x.querySelectorAll("[data-in]").forEach(A=>A.querySelector(".k-led").classList.toggle("on",!!t.ins[+A.dataset.in])),x.querySelectorAll("[data-out]").forEach(A=>A.querySelector(".k-led").classList.toggle("on",!!t.outs[+A.dataset.out]))),D==="hmi"&&x.querySelector(".k-hform")&&(x.querySelector(".k-hform").innerHTML=Ut())}let w=()=>n.store,W=()=>n.EXAMPLES;function tt(){if(!l.navSel)return p("state","Selecione um arquivo na lista"),null;if(l.navSel.startsWith("ex:")){let D=W().find(A=>A.id===l.navSel.slice(3));return n.openExample(D),n.showPane("kcp"),l.navFolder="prog",l.navSel=o().id,o()}return w().projects.find(D=>D.id===l.navSel)}function E(){if(f())return p("state","Pare o programa antes de selecionar outro");let D=tt();if(!D)return;if(D.id!==w().currentId&&n.openProject(D.id),!n.check(!1)){l.selected=!1,p("quit","Programa com erros de compila\xE7\xE3o \u2014 corrija no editor","INTERP"),dt();return}l.selected=!0,l.openEdit=!1,l.bco=!0,t.curLine=null,p("info",`Programa ${n.progName(D.src).toUpperCase()} selecionado`,"INTERP"),G("edit"),yt()}function y(){if(f())return p("state","Pare o programa antes de cancelar a sele\xE7\xE3o");l.selected=!1,t.curLine=null,p("info","Sele\xE7\xE3o cancelada","INTERP"),G("nav"),yt()}function z(){f()&&t.machine.stop(),l.bco=!0,t.curLine=null,p("info","Programa resetado \u2014 seta no in\xEDcio","INTERP"),dt()}function st(){if(!d())return p("state","Abrir para edi\xE7\xE3o exige o grupo Expert (Configurar \u2192 Grupo de usu\xE1rio)");if(f())return p("state","N\xE3o \xE9 poss\xEDvel editar com o programa em execu\xE7\xE3o");let D=l.screen==="nav"?tt():o();D&&(D.id!==w().currentId&&n.openProject(D.id),l.selected=!0,l.openEdit=!0,l.editFile=l.navSel&&l.screen==="nav"&&x.querySelector("tr.sel td:nth-child(2)")&&x.querySelector("tr.sel td:nth-child(2)").textContent==="dat"?"dat":"src",G("edit"))}function Q(){let D=i("kTa");if(!D)return;let A=o();A[l.editFile]!==D.value&&(n.saveVersion("Antes de editar no painel"),A[l.editFile]=D.value,n.markDirty(),n.setFile(l.editFile),n.updateNames(),n.previewPoints())}function ot(){Q(),l.openEdit=!1,n.check(!1)?p("info","Programa salvo","INTERP"):p("quit","Erros de compila\xE7\xE3o \u2014 veja o console do editor principal","INTERP"),G("edit")}async function Et(){if(!d())return p("state","Criar programa exige o grupo Expert");let D=await n.askText("Novo programa","Nome do m\xF3dulo (sem espa\xE7os):","novo_prog");if(!D)return;let A=D.replace(/[^A-Za-z0-9_]/g,"_").replace(/^(\d)/,"_$1").slice(0,24)||"novo_prog",q=n.newProject({name:A,cat:"Movimenta\xE7\xE3o b\xE1sica",src:`DEF ${A}()
  INI
  PTP HOME

  PTP HOME
END`,dat:`DEFDAT ${A}

ENDDAT`,scene:o()?o().scene:n.SCENES.pick});l.navFolder="prog",l.navSel=q.id,n.openProject(q.id),p("info",`M\xF3dulo ${A.toUpperCase()} criado`,"NAVEGADOR"),Tt()}function pt(){let D=tt();if(!D)return;let A=JSON.parse(JSON.stringify(D));A.id=Date.now().toString(36),A.name=D.name+" (c\xF3pia)",w().projects.unshift(A),n.markDirty(),l.navSel=A.id,p("info","Projeto duplicado","NAVEGADOR"),Tt()}async function Rt(){if(!d())return p("state","Apagar exige o grupo Expert");let D=tt();if(!D)return;if(l.selected&&D.id===o().id)return p("state","N\xE3o \xE9 poss\xEDvel apagar o programa selecionado");await n.ask("Apagar",`Apagar <b>${s(D.name)}</b>?`,[{label:"Cancelar",value:!1},{label:"Apagar",value:!0,danger:!0}])&&(w().projects=w().projects.filter(q=>q!==D),n.store.projects=w().projects,n.markDirty(),l.navSel=null,p("info","Projeto apagado","NAVEGADOR"),Tt())}async function Ft(){let D=l.screen==="nav"&&l.navSel&&!l.navSel.startsWith("ex:")?w().projects.find(Y=>Y.id===l.navSel):o();if(!D)return;let A=await n.makeZip([D],"projeto"),q=await n.platform.saveFile(`korum-${n.safe(D.name)}-${n.stamp()}.zip`,A);q&&q.saved&&p("info",`Arquivado: ${q.path}`,"ARQUIVO")}async function zt(){let D=o();if(!D)return;let A=await n.askText("Renomear","Novo nome do projeto:",D.name);A&&(D.name=A,i("projName").value=A,n.markDirty(),Tt())}function gt(D){l.runMode=D,t.machine&&(t.machine.stepMode=D==="ISTEP"),p("info",`Modo de execu\xE7\xE3o: ${D}`,"INTERP"),dt()}document.addEventListener("keydown",D=>{D.ctrlKey&&D.key==="F12"&&(D.preventDefault(),t.pane!=="kcp"&&n.showPane("kcp"),G("hmi"))}),setInterval(()=>{t.pane==="kcp"&&(!l.startHeld&&l.jog===null&&j(),l.screen==="edit"&&!l.openEdit&&t.machine&&t.curLine&&t.curLine.line!==l.lastIp&&(l.lastIp=t.curLine.line,Tt()))},200),t.kcpShow=()=>{dt(),xt(),l.msgs.length||(p("info","Painel pronto. Ligue os acionamentos (Acion.), selecione um programa no Navegador e use Start.","SISTEMA"),p("quit","Contator dos acionamentos desligado","ACIONAM."))},dt()}var B=n=>document.getElementById(n),ze=(n,t=1)=>(Math.abs(n)<.05&&t<=1?0:n).toFixed(t),Vt=n=>String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),Lr=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7),Ws=n=>JSON.parse(JSON.stringify(n)),kn=()=>new Date().toISOString(),yi=n=>{let t=new Date(n);return t.toLocaleDateString("pt-BR")+" "+t.toTimeString().slice(0,5)},mo=window.korum&&window.korum.version||"1.0.0",on=window.korum||null,Un={async load(){if(on)return await on.load();try{return localStorage.getItem("korum-store")}catch{return null}},save(n){if(on)return on.saveSync(n);try{return localStorage.setItem("korum-store",n),!0}catch{return!1}},async saveFile(n,t){if(on)return on.saveFile(n,t,Pt.settings.backupDir||"");let e=new Blob([t]),i=document.createElement("a");return i.href=URL.createObjectURL(e),i.download=n,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3),{saved:!0,path:n}},async chooseDir(){return on?on.chooseDir():null},openData(){on?on.openDataFolder():Oe("Dispon\xEDvel no aplicativo instalado")},async ai(n){if(on)return on.ai(n);try{let t=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":n.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:n.model,max_tokens:2e3,system:n.system,messages:n.messages})}),e=await t.json();return t.ok?{text:(e.content||[]).filter(i=>i.type==="text").map(i=>i.text).join(`
`)}:{error:e.error&&e.error.message||"HTTP "+t.status}}catch(t){return{error:t.message}}}},Eo="claude-sonnet-5-5",Pt={v:1,settings:{theme:"escuro",apiKey:"",model:Eo,backupDir:""},projects:[],currentId:null,progress:{lessons:{},exercises:{}}},Bd=["Movimenta\xE7\xE3o b\xE1sica","Manipula\xE7\xE3o de pe\xE7as","Pick and Place","Paletiza\xE7\xE3o","Soldagem","Opera\xE7\xF5es de montagem","Inspe\xE7\xE3o","Alimenta\xE7\xE3o de m\xE1quinas","Integra\xE7\xE3o com sensores","Aplica\xE7\xF5es avan\xE7adas","Exerc\xEDcios","Importados"],At=()=>Pt.projects.find(n=>n.id===Pt.currentId);function Ki({name:n,cat:t,src:e,dat:i,scene:s,exercise:r}){let a={id:Lr(),name:n,cat:t||"Movimenta\xE7\xE3o b\xE1sica",src:e,dat:i,scene:Ws(s||SCENES.pick),blocks:null,original:null,versions:[],created:kn(),updated:kn(),exercise:r||null};return a.versions.push({id:Lr(),date:kn(),note:"Cria\xE7\xE3o do projeto",src:e,dat:i}),Pt.projects.unshift(a),a}var go=null;function oe(){let n=At();n&&(n.updated=kn()),clearTimeout(go),go=setTimeout(Br,600)}function Br(){clearTimeout(go);let n=Un.save(JSON.stringify(Pt));B("saved").textContent=n?"salvo "+new Date().toTimeString().slice(0,5):"\u26A0 falha ao salvar",B("saved").style.color=n?"":"var(--err)"}window.addEventListener("beforeunload",()=>{go&&Br()});function In(n,t){let e=At();if(!e)return!1;let i=e.versions[e.versions.length-1];return!t&&i&&i.src===e.src&&i.dat===e.dat?!1:(e.versions.push({id:Lr(),date:kn(),note:n,src:e.src,dat:e.dat}),e.versions.length>80&&e.versions.splice(1,e.versions.length-80),oe(),!0)}function ee(n,t,e){let i=document.createElement("div");i.className=n;let s={info:"INFO",ok:"OK",warn:"AVISO",err:"ERRO",run:"EXEC"}[n]||n;if(i.innerHTML=`<time>${new Date().toTimeString().slice(0,8)}</time><span class="lv">${s}</span>`,e&&e.line){let o=document.createElement("a");o.textContent=`${e.file==="dat"?"dat":"src"}:${e.line}`,o.onclick=()=>{_e("prog"),_o(e)},i.appendChild(o)}let r=document.createElement("span");r.className="lm",r.textContent=t,i.appendChild(r);let a=B("log");for(a.appendChild(i);a.children.length>800;)a.firstChild.remove();if(a.scrollTop=a.scrollHeight,it.onLog&&it.onLog(n,t,e),Pt.settings.nivel==="iniciante"&&(n==="err"||n==="info"&&/Aguardando condição/.test(t))){let o=Yx.find(c=>c[0].test(t));o&&setTimeout(()=>ee("ok","\u{1F4A1} Dica: "+o[1]),0)}it.logTail.push(`${s}${e&&e.line?` (${e.file}:${e.line})`:""}: ${t}`),it.logTail.length>30&&it.logTail.shift()}var Id;function Oe(n){let t=B("toast");t.textContent=n,t.style.display="block",clearTimeout(Id),Id=setTimeout(()=>t.style.display="none",2400)}function ti(n,t,e){return new Promise(i=>{B("askTitle").textContent=n,B("askBody").innerHTML=t;let s=B("askFoot");s.innerHTML="";for(let r of e){let a=document.createElement("button");a.textContent=r.label,r.pri&&(a.className="pri"),r.danger&&(a.className="danger"),a.onclick=()=>{B("mAsk").classList.remove("on"),i(r.value)},s.appendChild(a)}B("mAsk").classList.add("on")})}document.querySelectorAll("[data-close]").forEach(n=>n.onclick=()=>n.closest(".modal").classList.remove("on"));document.querySelectorAll(".modal").forEach(n=>n.addEventListener("click",t=>{t.target===n&&n.id!=="mAsk"&&n.id!=="mNivel"&&n.classList.remove("on")}));var it={joints:RL.HOME.slice(),file:"src",ins:new Array(9).fill(!1),outs:new Array(65).fill(!1),pov:100,machine:null,running:!1,curLine:null,errLine:null,warnLines:new Set,tool:{...RL.DEFAULT_TOOL},base:{X:0,Y:0,Z:0,A:0,B:0,C:0},events:[],logTail:[],chat:[],pane:"prog",exTargets:[]};function _e(n){let t=it.pane==="kcp";if(it.pane=n,n==="kcp"!==t){document.body.classList.toggle("kcp",n==="kcp");let e=document.documentElement;n==="kcp"?(it.leftSaved=e.style.getPropertyValue("--left"),e.style.setProperty("--left","760px")):e.style.setProperty("--left",it.leftSaved||"440px"),setTimeout(Gr,30)}n==="kcp"&&it.kcpShow&&it.kcpShow(),document.querySelectorAll("#nav button[data-p]").forEach(e=>e.classList.toggle("on",e.dataset.p===n)),document.querySelectorAll(".pane").forEach(e=>e.classList.toggle("on",e.id==="p-"+n)),n==="prog"&&ei(),n==="blocos"&&kx(),n==="projetos"&&_n(),n==="cursos"&&Ar(),n==="exerc"&&ko(),n==="cena"&&Wr(),n==="analise"&&Wx(),n==="ia"&&Pr(),n==="config"&&au(),n==="inicio"&&ff(),n==="traj"?(ii(),Ln()):(typeof Nc=="function"&&$r&&Nc(!1),typeof So=="function"&&So())}document.querySelectorAll("#nav button[data-p]").forEach(n=>n.onclick=()=>_e(n.dataset.p));var fe=B("ta"),Rc=B("hl"),zd=B("gut"),px=new Set("DEF END DEFDAT ENDDAT DECL GLOBAL CONST IF THEN ELSE ENDIF FOR TO STEP ENDFOR WHILE ENDWHILE REPEAT UNTIL LOOP ENDLOOP SWITCH CASE DEFAULT ENDSWITCH EXIT RETURN WAIT SEC HALT INTERRUPT WHEN DO ON OFF INI AND OR NOT EXOR EXT BRAKE GOTO".split(" ")),mx=new Set("PTP LIN CIRC PTP_REL LIN_REL SPLINE SPL SLIN SCIRC SPTP C_PTP C_DIS C_VEL C_ORI".split(" ")),gx=new Set("INT REAL BOOL CHAR E6POS POS FRAME E6AXIS AXIS FDAT PDAT LDAT".split(" "));function Hd(n){if(/^\s*&/.test(n))return`<span class="c">${Vt(n)}</span>`;let t=n,e="",i=!1;for(let r=0;r<n.length;r++)if(n[r]==='"')i=!i;else if(n[r]===";"&&!i){t=n.slice(0,r),e=n.slice(r);break}return t.replace(/("[^"]*")|(#\w+)|(\$\w+)|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)|([<>&])/g,(r,a,o,c,l,h,u)=>{if(a)return`<span class="s">${Vt(a)}</span>`;if(o)return`<span class="e">${o}</span>`;if(c)return`<span class="v">${c}</span>`;if(l)return`<span class="n">${l}</span>`;if(u)return Vt(u);let f=h.toUpperCase();return mx.has(f)?`<span class="m">${h}</span>`:px.has(f)?`<span class="k">${h}</span>`:gx.has(f)?`<span class="t">${h}</span>`:f==="TRUE"||f==="FALSE"?`<span class="n">${h}</span>`:h})+(e?`<span class="c">${Vt(e)}</span>`:"")}function ei(){let n=fe.value.split(`
`),t=it.file,e=it.curLine&&it.curLine.file===t?it.curLine.line:-1,i=it.errLine&&it.errLine.file===t?it.errLine.line:-1;Rc.innerHTML=n.map((s,r)=>`<div class="${r+1===e?"cur":""}${r+1===i?" errl":""}">${Hd(s)||" "}</div>`).join("")+"<div></div>".repeat(8),zd.innerHTML=n.map((s,r)=>`<div class="${r+1===e?"cur":""}${r+1===i?" errl":""}${it.warnLines.has(t+(r+1))?" wrn":""}">${r+1}</div>`).join("")+"<div></div>".repeat(8),wo()}function wo(){Rc.scrollTop=fe.scrollTop,Rc.scrollLeft=fe.scrollLeft,zd.scrollTop=fe.scrollTop}fe.addEventListener("scroll",wo);var Dd;fe.addEventListener("input",()=>{let n=At();n&&(n[it.file]=fe.value,it.errLine=null,ei(),Qi(),oe(),clearTimeout(Dd),Dd=setTimeout(xn,500))});fe.addEventListener("keydown",n=>{n.key==="Tab"&&(n.preventDefault(),fe.setRangeText("  ",fe.selectionStart,fe.selectionEnd,"end"),fe.dispatchEvent(new Event("input")))});document.addEventListener("keydown",n=>{n.key==="F5"&&(n.preventDefault(),ni(!1)),n.key==="F10"&&(n.preventDefault(),ni(!0)),n.key==="Escape"&&document.querySelectorAll(".modal.on").forEach(t=>t.id!=="mAsk"&&t.id!=="mNivel"&&t.classList.remove("on")),(n.ctrlKey||n.metaKey)&&n.key.toLowerCase()==="s"&&(n.preventDefault(),In("Salvo manualmente")&&Oe("Vers\xE3o salva no hist\xF3rico"),Br())});function Ze(n){it.file=n;let t=At();fe.value=t?t[n]:"",B("tabSrc").classList.toggle("on",n==="src"),B("tabDat").classList.toggle("on",n==="dat"),ei(),fe.scrollTop=0,wo()}B("tabSrc").onclick=()=>Ze("src");B("tabDat").onclick=()=>Ze("dat");function _o(n,t=!0){n.file!==it.file&&Ze(n.file);let e=fe.value.split(`
`),i=(n.line-1)*20;if((i<fe.scrollTop+20||i>fe.scrollTop+fe.clientHeight-60)&&(fe.scrollTop=Math.max(0,i-fe.clientHeight/3),wo()),t){let s=0;for(let r=0;r<n.line-1;r++)s+=e[r].length+1;fe.focus(),fe.setSelectionRange(s,s+(e[n.line-1]||"").length)}}var un=n=>{let t=(n||"").match(/^\s*(?:GLOBAL\s+)?DEF\s+([A-Za-z_]\w*)/im);return t?t[1]:"programa"};function Qi(){let n=At(),t=un(n&&n.src);B("tabSrc").textContent=t+".src",B("tabDat").textContent=t+".dat"}function Pn(n){if(it.running)return Oe("Pare a execu\xE7\xE3o antes de trocar de projeto");Pt.currentId=n;let t=At();t&&(B("projName").value=t.name,it.errLine=null,it.curLine=null,it.warnLines.clear(),Ze("src"),Qi(),Po(t.scene),ns(!0),xn(),it.exTargets=t.exercise?(EXERCISES.find(e=>e.id===t.exercise)||{}).alvos||[]:[],Sx(),Ye=-1,Ln(),it.pane==="traj"&&ii(),oe())}B("projName").onchange=()=>{let n=At();n&&(n.name=B("projName").value.trim()||"Sem nome",oe())};var bi=B("view"),be=new fr({antialias:!0});be.setPixelRatio(Math.min(2,devicePixelRatio));be.shadowMap.enabled=!0;be.shadowMap.type=mc;be.toneMapping=gc;be.toneMappingExposure=1.05;bi.prepend(be.domElement);var To=new co;To.domElement.style.cssText="position:absolute;top:0;left:0;pointer-events:none";bi.appendChild(To.domElement);var Rn=new Va,vn=new Xe(38,1,.01,50),Fn=new oo(vn,be.domElement);Fn.enableDamping=!0;Fn.addEventListener("start",()=>it.camMoved=!0);Fn.dampingFactor=.12;Rn.add(new Qa(14674175,1711394,1.1));var $s=new Mr(16777215,2.2);$s.position.set(2.5,4,2);$s.castShadow=!0;$s.shadow.mapSize.set(2048,2048);Object.assign($s.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:.5,far:10});$s.shadow.bias=-5e-4;Rn.add($s);var Vd=new Mr(10467583,.6);Vd.position.set(-2,1.5,-2);Rn.add(Vd);var uo=null;function _x(n){let t=n!=="claro";Rn.background=new jt(t?921877:14673388),Rn.fog=new Ha(t?921877:14673388,5,11),uo&&Rn.remove(uo),uo=t?new Er(4,40,3818320,2304563):new Er(4,40,10135219,12831958),Rn.add(uo),bi.style.background=t?"#0c0f13":"#dfe5ec"}var Ao=new xe(new dr(12,12),new Ka({opacity:.3}));Ao.rotation.x=-Math.PI/2;Ao.receiveShadow=!0;Rn.add(Ao);var ne=new ge;ne.rotation.x=-Math.PI/2;ne.scale.setScalar(.001);Rn.add(ne);var Kt={orange:new Ae({color:15886864,roughness:.42,metalness:.15}),dark:new Ae({color:2830391,roughness:.6,metalness:.3}),black:new Ae({color:1382428,roughness:.7,metalness:.2}),steel:new Ae({color:11121597,roughness:.3,metalness:.8}),table:new Ae({color:5990002,roughness:.7,metalness:.2}),top:new Ae({color:9213859,roughness:.5,metalness:.3}),belt:new Ae({color:1909030,roughness:.9}),stripe:new Ae({color:2896184}),yellow:new Ae({color:15250464,roughness:.5}),wood:new Ae({color:11567952,roughness:.85}),machine:new Ae({color:7308695,roughness:.5,metalness:.3}),glass:new Ae({color:1780278,roughness:.15,metalness:.6}),part:new Ae({color:4163286,roughness:.35,metalness:.4}),hit:new Ae({color:16726843,emissive:6688784})};function Zt(n,t,e,i,s){let r=new xe(n,t);return r.castShadow=r.receiveShadow=!0,i&&r.position.set(...i),s&&r.rotation.set(...s),e.add(r),r}var Uc=(n,t,e=40)=>new Hi(n,n,t,e).rotateX(Math.PI/2),Si=(n,t,e=40)=>new Hi(n,n,t,e),Ro=(n,t,e=40)=>new Hi(n,n,t,e).rotateZ(Math.PI/2),ye=(n,t,e)=>new Bi(n,t,e);function Fc(n,t,e,i){let s=new gr,r=n/2,a=e/2;i=Math.min(i,r,a),s.moveTo(-r+i,-a),s.lineTo(r-i,-a),s.quadraticCurveTo(r,-a,r,-a+i),s.lineTo(r,a-i),s.quadraticCurveTo(r,a,r-i,a),s.lineTo(-r+i,a),s.quadraticCurveTo(-r,a,-r,a-i),s.lineTo(-r,-a+i),s.quadraticCurveTo(-r,-a,-r+i,-a);let o=new qa(s,{depth:t,bevelEnabled:!0,bevelSize:6,bevelThickness:6,bevelSegments:3,curveSegments:8});return o.translate(0,0,-t/2),o.rotateX(Math.PI/2),o}function xi(n,t,e,i="lbl",s,r){let a=document.createElement("div");a.className=i,a.textContent=t,s&&(a.style.color=s);let o=new lo(a);return o.userData.k=r,o.position.set(...e),n.add(o),o}var Yi={eixo:!0,ponto:!0,base:!0,objeto:!0,alvo:!0},en=RL.GEO;Zt(ye(300,300,16),Kt.dark,ne,[0,0,8]);Zt(Uc(118,50),Kt.dark,ne,[0,0,41]);var ts=new ge;ne.add(ts);Zt(Uc(104,150),Kt.orange,ts,[0,0,141]);Zt(Fc(200,190,230,40),Kt.orange,ts,[28,0,318]);Zt(Uc(46,120),Kt.dark,ts,[-95,0,270]);var si=new ge;si.position.set(en.a1,0,en.d1);ts.add(si);Zt(Si(88,200),Kt.orange,si);Zt(Si(62,214),Kt.dark,si);Zt(Fc(en.a2,82,112,30),Kt.orange,si,[en.a2/2,0,0]);Zt(Si(50,70),Kt.dark,si,[0,-135,0]);var ri=new ge;ri.position.set(en.a2,0,0);si.add(ri);Zt(Si(74,172),Kt.orange,ri);Zt(Si(52,184),Kt.dark,ri);Zt(Fc(220,150,125,30),Kt.orange,ri,[18,0,40]);Zt(Ro(44,80),Kt.dark,ri,[-125,0,58]);var Ei=new ge;Ei.position.set(0,0,en.a3);ri.add(Ei);Zt(Ro(50,290),Kt.orange,Ei,[250,0,0]);Zt(ye(80,16,92),Kt.orange,Ei,[398,46,0]);Zt(ye(80,16,92),Kt.orange,Ei,[398,-46,0]);var es=new ge;es.position.set(en.d4,0,0);Ei.add(es);Zt(Si(44,76),Kt.orange,es);Zt(Si(30,110),Kt.dark,es);var Xs=new ge;es.add(Xs);Zt(Ro(38,52),Kt.orange,Xs,[32,0,0]);Zt(Ro(36,18),Kt.steel,Xs,[en.d6-9,0,0]);var Co=new ge;Co.position.set(en.d6,0,0);Xs.add(Co);var zr=new ge;Co.add(zr);Zt(ye(45,74,54),Kt.black,zr,[22.5,0,0]);var vx=Zt(ye(85,12,30),Kt.steel,zr,[87.5,51,0]),xx=Zt(ye(85,12,30),Kt.steel,zr,[87.5,-51,0]),Ir=new ge;Ir.matrixAutoUpdate=!1;Co.add(Ir);var Dr=new wr(70);Dr.material.depthTest=!1;Dr.renderOrder=5;Ir.add(Dr);var ln={target:51,cur:51},oy=[[ts,[0,0,230]],[si,[0,-120,0]],[ri,[0,-105,0]],[Ei,[150,0,60]],[es,[0,-70,0]],[Xs,[50,0,50]]].map(([n,t],e)=>xi(n,"A"+(e+1),t,"lbl",null,"eixo")),Or=new ge;ne.add(Or);function Bc(n,t,e){Or.add(new eo(new $(...n),new $(0,0,2),260,t,40,22)),xi(Or,e,[n[0]*300,n[1]*300,n[2]*300+2],"lbl ax","#"+t.toString(16).padStart(6,"0"),"base")}Bc([1,0,0],16734810,"X");Bc([0,1,0],4440954,"Y");Bc([0,0,1],5941759,"Z");var qi=new ge;ne.add(qi);var vo={},De=[],Cn=null,Cc=!1;function yx(n,t,e){let{x:i,y:s,w:r,d:a,h:o}=n,c=[];if(n.tipo==="mesa"){c.push(Zt(ye(r,a,20),Kt.top,e,[i,s,o-10]));for(let[l,h]of[[-1,-1],[1,-1],[-1,1],[1,1]])c.push(Zt(ye(24,24,o-20),Kt.table,e,[i+l*(r/2-20),s+h*(a/2-20),(o-20)/2]))}else if(n.tipo==="esteira"){c.push(Zt(ye(r,Math.max(10,a-40),o-30),Kt.table,e,[i,s,(o-30)/2])),c.push(Zt(ye(r,Math.max(10,a-70),20),Kt.belt,e,[i,s,o-10])),Zt(ye(r,18,34),Kt.yellow,e,[i,s-a/2+9,o-17]),Zt(ye(r,18,34),Kt.yellow,e,[i,s+a/2-9,o-17]);for(let l=i-r/2+30;l<i+r/2;l+=70)Zt(ye(6,Math.max(10,a-70),1),Kt.stripe,e,[l,s,o+.6]);n.sensor&&(Zt(ye(6,a-20,36),Kt.yellow,e,[i+r/2-3,s,o+18]),Qd[t]=Zt(ye(14,14,14),new je({color:4473924}),e,[i+r/2-30,s+a/2-2,o+40])),n.motor&&Zt(Si(28,50),Kt.dark,e,[i-r/2+40,s+a/2+25,o-40])}else if(n.tipo==="palete"){let l=Math.max(3,Math.round(r/60));for(let h=0;h<l;h++)c.push(Zt(ye(Math.min(55,r/l-8),a,22),Kt.wood,e,[i-r/2+(h+.5)*r/l,s,o-11]));for(let h of[-1,0,1])for(let u of[-1,0,1])c.push(Zt(ye(70,70,o-22),Kt.wood,e,[i+h*(r/2-35),s+u*(a/2-35),(o-22)/2]))}else n.tipo==="maquina"?(c.push(Zt(ye(r,a,o),Kt.machine,e,[i,s,o/2])),Zt(ye(r*.6,6,o*.45),Kt.glass,e,[i,s-a/2-3,o*.55]),Zt(ye(r,a+4,16),Kt.yellow,e,[i,s,o-8])):c.push(Zt(ye(r,a,o),Kt.steel,e,[i,s,o/2]));vo[t]=c,xi(e,n.nome,[i,s+(n.tipo==="esteira"?-a/2-40:a/2+30),o+15],"lbl ob",null,"objeto")}function Jn(n){let t=n&&n.userData.size||[50,50,50],e=n&&Math.abs(Math.sin(n.rotation.z))>.7;return{wx:e?t[1]:t[0],wy:e?t[0]:t[1],h:t[2]}}function Gd(n,t,e){let i=0,s=Jn(e);for(let r of At()?At().scene.objetos:[])Math.abs(n-r.x)<r.w/2&&Math.abs(t-r.y)<r.d/2&&(i=Math.max(i,r.h));for(let r of De)if(r!==e&&r!==Cn&&r.parent===ne){let a=r.position,o=Jn(r);Math.abs(a.x-n)<(o.wx+s.wx)/2-4&&Math.abs(a.y-t)<(o.wy+s.wy)/2-4&&(i=Math.max(i,a.z+o.h/2))}return i}var ho=null;function bx(){if(ho)return ho;let n=document.createElement("canvas");n.width=256,n.height=128;let t=n.getContext("2d");t.fillStyle="#f2700f",t.fillRect(0,0,256,128);for(let a=0;a<4;a++)for(let o=0;o<2;o++)t.beginPath(),t.arc(32+a*64,32+o*64,22,0,7),t.fillStyle="#ffd9b8",t.fill(),t.beginPath(),t.arc(32+a*64,32+o*64,13,0,7),t.fillStyle="#e8e8e8",t.fill();t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=3,t.strokeRect(2,2,252,124);let e=new Ae({map:new pr(n),roughness:.35}),i=document.createElement("canvas");i.width=128,i.height=64;let s=i.getContext("2d");s.fillStyle="#e8620a",s.fillRect(0,0,128,64),s.fillStyle="#ffffff",s.fillRect(0,26,128,10),s.fillStyle="#c94f05",s.fillRect(0,0,128,4),s.fillRect(0,60,128,4);let r=new Ae({map:new pr(i),roughness:.3,metalness:.05});return ho=[r,r,r,r,e,r],ho}function Wd(n,t,e,i,s){let r=e||[50,50,50],a=Zt(ye(r[0],r[1],r[2]),i==="pacote"?bx():Kt.part,ne,[n,t,0]);return a.userData.size=r,a.userData.spawned=!!s,a}function Po(n){Cn&&(Cn=null),ne.remove(qi),qi.traverse(e=>{e.element&&e.element.remove()}),De.forEach(e=>{e.parent&&e.parent.remove(e)});for(let e in vo)delete vo[e];qi=new ge,ne.add(qi);let t=[];n.objetos.forEach((e,i)=>{let s="o"+i;yx(e,s,qi),t.push({id:s,nome:e.nome,min:[e.x-e.w/2,e.y-e.d/2,0],max:[e.x+e.w/2,e.y+e.d/2,e.h]})}),RL.setObstacles(t),De=[],n.pecas.forEach(e=>{let[i,s,r,a]=Array.isArray(e)?e:[e.x,e.y,e.s,e.tipo],o=Wd(i,s,r,a,!1);o.position.z=Gd(i,s,o)+o.userData.size[2]/2,o.userData.home=o.position.toArray(),De.push(o)}),Fs={}}function xo(n){let t=n.getWorldPosition(new $);return ne.worldToLocal(t),{x:t.x,y:t.y,z:t.z}}var $d=2e4,Xd=new Float32Array($d*3),Tr=0,ks=null,Vs=new he;Vs.setAttribute("position",new Qe(Xd,3));Vs.setDrawRange(0,0);var zs=new Tn(Vs,new tn({color:16752704}));zs.frustumCulled=!1;ne.add(zs);function Mx(n){ks&&Math.hypot(n[0]-ks[0],n[1]-ks[1],n[2]-ks[2])<2||Tr>=$d||(Xd.set(n,Tr*3),Tr++,Vs.setDrawRange(0,Tr),Vs.attributes.position.needsUpdate=!0,ks=n)}function jd(){Tr=0,ks=null,Vs.setDrawRange(0,0)}var Lo=new xe(new Kn(en.a2+Math.hypot(en.a3,en.d4)+en.d6+110,48,24),new je({color:5941759,wireframe:!0,transparent:!0,opacity:.12}));Lo.position.set(0,0,en.d1);Lo.visible=!1;ne.add(Lo);var Qn=new ge;ne.add(Qn);var Hs=new ge;ne.add(Hs);function zc(n){n.children.slice().forEach(t=>{n.remove(t),t.traverse(e=>e.element&&e.element.remove())})}function qd(n){zc(Qn);for(let t of n){let e=new xe(new Kn(9,16,12),new je({color:16763755}));e.position.set(...t.pos),Qn.add(e);let i=new wr(45);i.position.set(...t.pos),i.quaternion.copy(t.q),Qn.add(i),xi(Qn,t.name,[t.pos[0],t.pos[1],t.pos[2]+28],"lbl","#ffcb6b","ponto")}}function Sx(){zc(Hs);for(let n of it.exTargets){let t=new xe(new Kn(14,20,14),new je({color:4440954,transparent:!0,opacity:.75}));t.position.set(n.X,n.Y,n.Z),Hs.add(t),xi(Hs,"\u{1F3AF} "+n.nome,[n.X,n.Y,n.Z-34],"lbl","#43c37a","alvo")}}var Yd=n=>{let t=new ue;return t.set(...n),t};function Hc(n){let t=[],e=RL.frameToMat(it.base);for(let[i,s]of Object.entries(n)){if(!s||typeof s!="object"||i.startsWith("__")||i==="HOME"||i==="XHOME"||At()&&(At().trajeto||[]).length&&/^T\d+(_APROX)?$/.test(i))continue;let r=null;["E6POS","POS","FRAME"].includes(s.__t)&&["X","Y","Z"].every(a=>typeof s[a]=="number")?r=RL.mul(e,RL.frameToMat(s)):["E6AXIS","AXIS"].includes(s.__t)&&["A1","A2","A3","A4","A5","A6"].every(a=>typeof s[a]=="number")&&(r=RL.mul(RL.fk(["A1","A2","A3","A4","A5","A6"].map(a=>s[a])).F6,RL.frameToMat(it.tool))),r&&t.push({name:i,pos:[r[3],r[7],r[11]],q:new an().setFromRotationMatrix(Yd(r)),raw:s})}return t}function Zd(n){let t=RL.parse(n.src,n.dat);if(t.errors.length||!t.mod)return null;let e=new RL.Machine(t,Ix());for(let i of t.mod.dat)try{i.compat||e.declare(i,e.modScope)}catch{}return e.modScope}function xn(){let n=At();if(!n)return;let t=Zd(n);t&&qd(Hc(t))}function Ex(){let n=it.joints.map(t=>t*RL.D2R);ts.rotation.z=-n[0],si.rotation.y=n[1],ri.rotation.y=n[2],Ei.rotation.x=n[3],es.rotation.y=n[4],Xs.rotation.x=n[5]}var Hr=()=>RL.mul(RL.fk(it.joints).F6,RL.frameToMat(it.tool));function yo(n){it.tool={X:n.X||0,Y:n.Y||0,Z:n.Z||0,A:n.A||0,B:n.B||0,C:n.C||0},Ir.matrix.copy(Yd(RL.frameToMat(it.tool))),Ir.matrixWorldNeedsUpdate=!0,B("toolInfo").textContent=Math.abs(it.tool.X-110)<1e-6&&!it.tool.Y&&!it.tool.Z?"garra (TCP X 110)":it.tool.X||it.tool.Y||it.tool.Z?`TCP {X ${ze(it.tool.X)}, Y ${ze(it.tool.Y)}, Z ${ze(it.tool.Z)}}`:"flange ($NULLFRAME)"}var Pc=!0;function Ji(n,t){if(it.joints=n.slice(),Ex(),Pc=!0,t){let e=Hr();Mx([e[3],e[7],e[11]])}}var Vc=[];RL.LIMITS.forEach(([n,t],e)=>{let i=document.createElement("div");i.className="axis",i.innerHTML=`<b>A${e+1}</b><input type="range" min="${n}" max="${t}" step="0.1"><input type="number" min="${n}" max="${t}" step="1">`;let[s,r]=i.querySelectorAll("input"),a=o=>{if(it.running)return;o=Math.max(n,Math.min(t,+o||0));let c=it.joints.slice();c[e]=o,Ji(c,!1),Ax()};s.oninput=()=>a(s.value),r.onchange=()=>a(r.value),B("axes").appendChild(i),Vc.push({r:i,sl:s,nu:r})});var Lc={},Nr={};"XYZABC".split("").forEach(n=>{let t=document.createElement("div");t.innerHTML=`<span>${n}</span><b>0</b>`,B("pose").appendChild(t),Lc[n]=t.querySelector("b")});"XYZABC".split("").forEach(n=>{let t=document.createElement("label");t.textContent=n,B("gopos").appendChild(t)});"XYZABC".split("").forEach(n=>{let t=document.createElement("input");t.type="number",B("gopos").appendChild(t),Nr[n]=t});var Vr=()=>RL.matToFrame(RL.mul(RL.inv(RL.frameToMat(it.base)),Hr()));function wx(){if(!Pc)return;Pc=!1,it.joints.forEach((t,e)=>{let{r:i,sl:s,nu:r}=Vc[e],[a,o]=RL.LIMITS[e];s.value=t,document.activeElement!==r&&(r.value=t.toFixed(1));let c=t<=a+.05||t>=o-.05;i.classList.toggle("lim",c),i.classList.toggle("near",!c&&(t<a+8||t>o-8))});let n=Vr();for(let t in Lc)Lc[t].textContent=ze(n[t])}function Io(){let n=Vr();for(let t in Nr)Nr[t].value=+n[t].toFixed(1)}"XYZABC".split("").forEach(n=>["-","+"].forEach(t=>{let e=document.createElement("button");e.textContent=n+t,e.dataset.k=n+t,e.onclick=()=>Tx(n,t==="+"?1:-1),B("jog").appendChild(e)}));function Tx(n,t){if(it.running)return;let e=+B("jogStep").value,i={1:1,10:5,50:15}[e],s={X:0,Y:0,Z:0,A:0,B:0,C:0};s[n]=t*("XYZ".includes(n)?e:i);let r=RL.mul(RL.inv(RL.frameToMat(it.base)),Hr()),a;if(B("jogFrame").value==="TOOL")a=RL.mul(r,RL.frameToMat(s));else{let o=r.slice();o[3]=o[7]=o[11]=0,a=RL.mul(RL.frameToMat({A:s.A,B:s.B,C:s.C}),o),a[3]=r[3]+s.X,a[7]=r[7]+s.Y,a[11]=r[11]+s.Z}Kd(a,!1)}function Kd(n,t){let e=RL.ik(RL.mul(RL.frameToMat(it.base),RL.mul(n,RL.inv(RL.frameToMat(it.tool)))),it.joints),i=B("ikmsg");if(!e.ok){i.textContent="\u26A0 Posi\xE7\xE3o imposs\xEDvel: "+e.reason,i.style.color="var(--err)";return}i.textContent=e.singular?"Aten\xE7\xE3o: punho em singularidade (A5 \u2248 0\xB0) \u2014 A4 e A6 ficam amb\xEDguos.":"",i.style.color="var(--warn)";let s=RL.checkCollision(e.j,RL.frameToMat(it.tool));if(s){i.textContent=`\u26A0 Bloqueado: ${s.part} colidiria com ${s.obstacle.nome}`,i.style.color="var(--err)",Wc(s.obstacle.id);return}t?Gc(e.j):(Ji(e.j,!1),Io())}function Gc(n){let t=it.joints.slice(),e=.6,i=0,s=performance.now(),r=a=>{i+=Math.max(0,(a-s)/1e3),s=a;let o=Math.min(1,i/e),c=o-Math.sin(2*Math.PI*o)/(2*Math.PI);Ji(t.map((l,h)=>l+(n[h]-l)*c),!1),o<1?requestAnimationFrame(r):Io()};requestAnimationFrame(r)}B("bGo").onclick=()=>{if(it.running)return;let n={};for(let t in Nr)n[t]=+Nr[t].value||0;Kd(RL.frameToMat(n),!0)};B("bHome").onclick=()=>{it.running||Gc(RL.HOME)};function Ax(){let n=RL.checkCollision(it.joints,RL.frameToMat(it.tool));B("ikmsg").textContent=n?`\u26A0 ${n.part} em colis\xE3o com ${n.obstacle.nome}`:"",B("ikmsg").style.color="var(--err)"}for(let n=1;n<=8;n++){let t=document.createElement("button");t.textContent="IN "+n,t.onclick=()=>{it.ins[n]=!it.ins[n],t.classList.toggle("on",it.ins[n]),ee("info",`$IN[${n}] = ${it.ins[n]?"TRUE":"FALSE"} (operador)`)},B("ins").appendChild(t);let e=document.createElement("div");e.className="lamp",e.innerHTML=`<i></i>${n}`,B("outs").appendChild(e)}function Jd(n,t){it.outs[n]=t,n<=8&&B("outs").children[n-1].classList.toggle("on",t),n===1&&Rx(t)}function Rx(n){if(n!==Cc){if(Cc=n,n){let t=Hr(),e=null,i=1e9;for(let s of De){let r=xo(s),a=Math.hypot(t[3]-r.x,t[7]-r.y,t[11]-r.z);a<i&&(i=a,e=s)}e&&i<30&&Math.abs(it.tool.X-110)<1?(zr.attach(e),Cn=e,ln.target=31,it.events.push({t:"grip",ok:!0}),ee("ok","Garra fechada: pe\xE7a presa.")):(ln.target=9,it.events.push({t:"grip",ok:!1}),ee("info",e?`Garra fechada vazia (pe\xE7a mais pr\xF3xima a ${Math.round(i)} mm do TCP).`:"Garra fechada vazia."))}else if(ln.target=51,Cn){let t=Cn;ne.attach(t),Cn=null;let e=new Ls().setFromQuaternion(t.quaternion,"ZYX").z;t.rotation.set(0,0,Math.round(e/(Math.PI/2))*(Math.PI/2));let i=Gd(t.position.x,t.position.y,t)+Jn(t).h/2,s=t.position.z-i;t.position.z=i;let r=(At().scene.objetos.find(a=>Math.abs(t.position.x-a.x)<a.w/2&&Math.abs(t.position.y-a.y)<a.d/2)||{nome:"o piso"}).nome;ee(s>15?"warn":"ok",s>15?`Pe\xE7a solta a ${Math.round(s)} mm de altura \u2014 caiu sobre ${r}.`:`Pe\xE7a depositada: ${r}.`)}}}function Wc(n){let t=vo[n];t&&(t.forEach(e=>{e.userData.mat=e.userData.mat||e.material,e.material=Kt.hit}),setTimeout(()=>t.forEach(e=>e.material=e.userData.mat),1800))}function ns(n){if(!it.running){Ji(RL.HOME,!1),Cn&&(ne.attach(Cn),Cn=null),De=De.filter(t=>t.userData.spawned?(t.parent&&t.parent.remove(t),!1):!0),De.forEach(t=>{t.parent!==ne&&ne.attach(t),t.position.fromArray(t.userData.home),t.rotation.set(0,0,0)}),Fs={},Cc=!1,ln.target=51;for(let t=1;t<=64;t++)it.outs[t]&&(it.outs[t]=!1,t<=8&&B("outs").children[t-1].classList.remove("on"));yo(RL.DEFAULT_TOOL),it.base={X:0,Y:0,Z:0,A:0,B:0,C:0},jd(),it.errLine=null,ei(),vi("idle"),B("ikmsg").textContent="",Io(),n||ee("info","C\xE9lula reiniciada: rob\xF4 em HOME, pe\xE7as nas posi\xE7\xF5es iniciais.")}}var Od=performance.now(),Fs={},Qd={};function Cx(n){let t=At();!t||n<=0||t.scene.objetos.forEach((e,i)=>{if(e.tipo!=="esteira"||!e.motor)return;let s=e.x-e.w/2,r=e.x+e.w/2,a=r-6,o=De.filter(c=>c!==Cn&&c.parent===ne&&Math.abs(c.position.y-e.y)<e.d/2&&c.position.x>s-40&&c.position.x<r+40&&Math.abs(c.position.z-(e.h+Jn(c).h/2))<4).sort((c,l)=>l.position.x-c.position.x);if(it.outs[e.motor]){let c=a;for(let h of o){let u=Jn(h).wx/2,f=Math.min(h.position.x+(e.vel||200)*n,c-u);f>h.position.x&&(h.position.x=f),c=h.position.x-u-3}let l=e.gerar;if(l){Fs[i]=(Fs[i]||0)+n;let h=!o.some(u=>u.position.x-Jn(u).wx/2<s+l.tamanho[0]+12);if(Fs[i]>=l.intervalo&&h&&De.filter(u=>u.userData.spawned).length<(l.max||40)){Fs[i]=0;let u=Wd(s+l.tamanho[0]/2+4,e.y,l.tamanho,l.tipo,!0);u.position.z=e.h+l.tamanho[2]/2,De.push(u)}}}if(e.sensor){let c=o.some(h=>h.position.x+Jn(h).wx/2>a-4);if(!!it.ins[e.sensor]!==c){it.ins[e.sensor]=c;let h=B("ins").children[e.sensor-1];h&&h.classList.toggle("on",c)}let l=Qd["o"+i];l&&l.material.color.set(c?3211104:4473924)}})}var Px=new $(.32,.36,.18),Lx={iso:[2,1.45,1.75],front:[2.6,.55,.18],side:[.32,.55,2.6],top:[.32,3.2,.19]};function tf(n){vn.position.set(...Lx[n]),Fn.target.copy(Px),Fn.update(),document.querySelectorAll("[data-cam]").forEach(t=>t.classList.toggle("on",t.dataset.cam===n))}document.querySelectorAll("[data-cam]").forEach(n=>n.onclick=()=>tf(n.dataset.cam));var Do=(n,t)=>{let e=B(n);e.onclick=()=>{e.classList.toggle("on"),t(e.classList.contains("on"))}};Do("tTrail",n=>zs.visible=n);Do("tPts",n=>{Qn.visible=n,Yi.ponto=n});Do("tAxes",n=>Yi.eixo=n);Do("tReach",n=>Lo.visible=n);var Nd=null;B("tClean").onclick=()=>{let n=B("tClean"),t=!n.classList.contains("on");if(n.classList.toggle("on",t),t)Nd={trail:zs.visible,pts:Qn.visible,eixo:Yi.eixo},zs.visible=!1,Qn.visible=!1,Or.visible=!1,Dr.visible=!1,Hs.visible=!1,Object.keys(Yi).forEach(e=>Yi[e]=!1),B("view").classList.add("clean");else{let e=Nd||{trail:!0,pts:!0,eixo:!0};zs.visible=e.trail,Qn.visible=e.pts,Or.visible=!0,Dr.visible=!0,Hs.visible=!0,Object.assign(Yi,{eixo:e.eixo,ponto:e.pts,base:!0,objeto:!0,alvo:!0}),B("view").classList.remove("clean")}["tTrail","tPts","tAxes"].forEach(e=>B(e).disabled=t)};B("tClear").onclick=jd;B("tFull").onclick=()=>{document.body.classList.toggle("full"),setTimeout(Gr,30),Oe(document.body.classList.contains("full")?"Tela cheia \u2014 Esc ou \u26F6 para voltar":"Tela normal")};document.addEventListener("keydown",n=>{n.key==="Escape"&&document.body.classList.contains("full")&&(document.body.classList.remove("full"),setTimeout(Gr,30))});function Gr(){let n=bi.clientWidth,t=bi.clientHeight;!n||!t||(be.setSize(n,t),To.setSize(n,t),vn.aspect=n/t,vn.updateProjectionMatrix())}new ResizeObserver(Gr).observe(bi);be.setAnimationLoop(()=>{Fn.update();{let n=performance.now();Cx(Math.min(.1,(n-Od)/1e3)),Od=n}Math.abs(ln.cur-ln.target)>.1&&(ln.cur+=Math.sign(ln.target-ln.cur)*Math.min(Math.abs(ln.target-ln.cur),3),vx.position.y=ln.cur,xx.position.y=-ln.cur),wx(),be.render(Rn,vn),ne.traverse(n=>{n.isCSS2DObject&&(n.visible=Yi[n.userData.k]!==!1)}),To.render(Rn,vn)});function Ix(){return{log(){},line(){},status(){},getJoints:()=>it.joints,getIn:n=>!!it.ins[n],output(){},getOverride:()=>it.pov,setOverride(){},animate:async()=>{}}}function vi(n){let t=B("status");t.className="chip "+n,t.textContent={running:"EXECUTANDO",paused:"PAUSADO",idle:"PARADO",error:"ERRO",waiting:"AGUARDANDO E/S"}[n]||n;let e=it.running;B("bRun").disabled=e&&n!=="paused",B("bRun").textContent=n==="paused"?"\u25B6 Continuar":"\u25B6 Executar",B("bPause").disabled=!(e&&(n==="running"||n==="waiting")),B("bStop").disabled=!e,["bCheck","bReset","bTeach","bGo","bHome","examples","bAnalyze","bSceneApply","bBlkGen"].forEach(i=>B(i)&&(B(i).disabled=e)),document.querySelectorAll("#jog button,.exrun").forEach(i=>i.disabled=e),Vc.forEach(i=>{i.sl.disabled=e,i.nu.disabled=e}),fe.readOnly=e}function Oo(n){let t=At();if(!t)return null;it.warnLines.clear(),it.errLine=null;let e=RL.parse(t.src,t.dat);return e.warnings.forEach(i=>it.warnLines.add(i.loc.file+i.loc.line)),e.errors.length?(e.errors.forEach(i=>ee("err",i.msg,i.loc)),it.errLine=e.errors[0].loc,it.pane!=="prog"&&_e("prog"),_o(e.errors[0].loc,!1),ei(),ee("err",`Verifica\xE7\xE3o: ${e.errors.length} erro(s). Corrija antes de executar.`),vi("error"),null):(n&&(e.warnings.forEach(i=>ee("warn",i.msg,i.loc)),ee("ok",`Verifica\xE7\xE3o OK: ${Object.keys(e.mod.defs).length} subprograma(s), ${e.mod.dat.length} declara\xE7\xE3o(\xF5es) no .dat${e.warnings.length?`, ${e.warnings.length} aviso(s)`:""}.`)),ei(),xn(),e)}async function ni(n){if(it.running)return it.machine&&(n?it.machine.step():it.machine.resume()),null;let t=Oo(!1);if(!t)return"error";if(it.kcpCheck){let r=it.kcpCheck();if(r)return ee("err",r),"error"}In("Antes de executar");let e=new Set;t.warnings.forEach(r=>{e.has(r.msg)||(e.add(r.msg),ee("warn",r.msg,r.loc))}),yo(RL.DEFAULT_TOOL),it.base={X:0,Y:0,Z:0,A:0,B:0,C:0},it.events=[];let i=new RL.Machine(t,{log:(r,a,o)=>ee(r,a,o),line:(r,a)=>{it.curLine=r,it.pane==="prog"&&(r.file!==it.file&&Ze(r.file),ei(),_o(r,!1));let o=B("nowcmd");o.style.display="block",o.textContent=`\u25B6 ${a}   (linha ${r.line})`},status:r=>{r!=="idle"&&vi(r)},getJoints:()=>it.joints,getIn:r=>!!it.ins[r],output:(r,a)=>Jd(r,a),getOverride:()=>it.pov,setOverride:r=>{it.pov=r,B("pov").value=r,B("povv").textContent=r+"%"},frames:(r,a)=>{it.base={...r},yo(a),xn()},points:r=>qd(Hc(r)),errorLine:r=>{it.errLine=r,it.curLine=null,it.pane==="prog"&&(ei(),_o(r,!1))},collision:r=>{Wc(r),it.events.push({t:"collision"})},moved:(r,a,o)=>{it.events.push({t:"move",label:r||"",pos:a,joints:it.joints.slice(),cut:o}),it.onMoved&&it.onMoved()},waitEvent:r=>it.events.push({t:"wait",text:r}),waiting:r=>{B("ins").classList.toggle("waitio",r),vi(r?"waiting":"running")},animate:r=>new Promise(a=>{let o=r.keys,c=o.length,l=0,h=performance.now(),u=f=>{let d=Math.max(0,Math.min(.1,(f-h)/1e3));if(h=f,i.state==="stopping")return a();let g=p=>{let m=Math.min(1,p/r.duration),x=Math.max(0,m-Math.sin(2*Math.PI*m)/(2*Math.PI))*(c-1),T=Math.max(0,Math.min(c-2,Math.floor(x))),I=x-T;return o[T].map((L,R)=>L+(o[T+1][R]-L)*I)};if(i.state!=="paused"){let p=l+d*it.pov/100;if(it.tcpLimit&&d>0){let m=L=>{let R=RL.mul(RL.fk(L).F6,RL.frameToMat(it.tool));return[R[3],R[7],R[11]]},S=m(g(l)),x=m(g(p)),T=Math.hypot(x[0]-S[0],x[1]-S[1],x[2]-S[2]),I=it.tcpLimit*d;T>I&&(p=l+(p-l)*I/T)}l=p}let _=Math.min(1,l/r.duration);if(Ji(g(l),!0),_>=1)return Ji(o[c-1],!0),a();requestAnimationFrame(u)};requestAnimationFrame(u)})});it.machine=i,it.running=!0,i.startStepping=n,it.curLine=null,it.errLine=null,ee("run",`Executando ${t.mod.defs[t.mod.order[0]].display}()${n?" \u2014 passo a passo":""}`),vi("running");let s=await i.run();return it.running=!1,it.machine=null,it.curLine=null,B("nowcmd").style.display="none",B("ins").classList.remove("waitio"),vi(s==="error"?"error":"idle"),ei(),Io(),it.lastRun={r:s,t:Date.now()},s}B("bRun").onclick=()=>ni(!1);B("bStep").onclick=()=>ni(!0);B("bPause").onclick=()=>{it.machine&&(it.machine.pause(),vi("paused"))};B("bStop").onclick=()=>{it.machine&&it.machine.stop()};B("bCheck").onclick=()=>Oo(!0);B("bReset").onclick=()=>ns(!1);B("pov").oninput=n=>{it.pov=+n.target.value,B("povv").textContent=it.pov+"%"};B("bClear").onclick=()=>B("log").innerHTML="";B("bHelp").onclick=()=>B("mHelp").classList.add("on");var Dx=["basico","b01","b02","quadrado","circ","pick","p22"];function ef(){let n=Pt.settings.nivel==="iniciante"?EXAMPLES.filter(t=>Dx.includes(t.id)):EXAMPLES;B("examples").innerHTML='<option value="">Exemplos\u2026</option>'+[...new Set(n.map(t=>t.cat))].map(t=>`<optgroup label="${Vt(t)}">${n.filter(e=>e.cat===t).map(e=>`<option value="${e.id}">${Vt(e.title)}</option>`).join("")}</optgroup>`).join("")}ef();B("examples").onchange=()=>{let n=EXAMPLES.find(t=>t.id===B("examples").value);B("examples").value="",n&&Gs(n)};function Gs(n){let t=Ki({name:"Exemplo: "+n.title,cat:n.cat,src:n.src,dat:n.dat,scene:SCENES[n.scene||"pick"]});Pn(t.id),_e("prog"),ee("info",`Projeto criado a partir do exemplo "${n.title}".`)}B("bTeach").onclick=()=>{if(it.running)return;let n=At(),t=nf(),e=it.file==="src"?fe.selectionStart:n.src.length,i=n.src.split(`
`),s=0,r=0;for(;r<i.length&&(s+=i[r].length+1,!(s>e));r++);/^\s*END\s*$/i.test(i[r]||"")&&(r=Math.max(0,r-1)),i.splice(r+1,0,`  PTP ${t}`),n.src=i.join(`
`),Ze("src"),oe(),xn(),ee("ok",`Ponto ${t} gravado no .dat e "PTP ${t}" inserido no .src (linha ${r+2}).`,{file:"src",line:r+2})};function nf(){let n=At(),t=Vr(),e=1,i=(n.src+`
`+n.dat).toUpperCase();for(;new RegExp(`\\bP${e}\\b`).test(i);)e++;let s="P"+e,r=`  DECL E6POS ${s} = {X ${ze(t.X)}, Y ${ze(t.Y)}, Z ${ze(t.Z)}, A ${ze(t.A)}, B ${ze(t.B)}, C ${ze(t.C)}}`;return/^\s*ENDDAT/im.test(n.dat)?n.dat=n.dat.replace(/^(\s*ENDDAT)/im,r+`
$1`):n.dat+=`
`+r,s}var Ic={home:{g:"mov",t:"Ir para HOME",krl:()=>"PTP HOME"},ptp:{g:"mov",t:"Mover at\xE9 (PTP)",f:[["ponto","pt"]],krl:n=>`PTP ${n.ponto}`},lin:{g:"mov",t:"Mover em linha reta at\xE9 (LIN)",f:[["ponto","pt"]],krl:n=>`LIN ${n.ponto}`},rel:{g:"mov",t:"Deslocar em linha reta",f:[["eixo","sel",["X","Y","Z"]],["mm","num","mm"]],krl:n=>`LIN_REL {${n.eixo} ${n.mm}}`},vel:{g:"mov",t:"Velocidade linear",f:[["v","num","m/s"]],krl:n=>`$VEL.CP = ${n.v}`},velax:{g:"mov",t:"Velocidade dos eixos",f:[["v","num","%"]],krl:n=>`BAS(#PTP_PARAMS, ${n.v})`},abrir:{g:"io",t:"Abrir garra",krl:()=>"$OUT[1] = FALSE"},fechar:{g:"io",t:"Fechar garra",krl:()=>"$OUT[1] = TRUE"},saida:{g:"io",t:"Sa\xEDda",f:[["n","num","n\xBA"],["v","sel",["TRUE","FALSE"]]],krl:n=>`$OUT[${n.n}] = ${n.v}`},espera_in:{g:"io",t:"Esperar entrada ligar",f:[["n","num","n\xBA"]],krl:n=>`WAIT FOR $IN[${n.n}]`},tempo:{g:"tm",t:"Aguardar",f:[["s","num","s"]],krl:n=>`WAIT SEC ${n.s}`},repetir:{g:"fl",t:"Repetir",f:[["n","num","vezes"]],open:!0},fim_rep:{g:"fl",t:"Fim do repetir",close:"repetir"},se:{g:"fl",t:"Se a entrada estiver ligada",f:[["n","num","n\xBA"]],open:!0},senao:{g:"fl",t:"Sen\xE3o",mid:!0},fim_se:{g:"fl",t:"Fim do se",close:"se"},coment:{g:"tm",t:"Coment\xE1rio",f:[["txt","text"]],krl:n=>`; ${n.txt||""}`},raw:{g:"raw",t:"KRL",f:[["code","text"]],krl:n=>n.code||""}},Ox=[["home","mov"],["ptp","mov"],["lin","mov"],["rel","mov"],["vel","mov"],["velax","mov"],["abrir","io"],["fechar","io"],["saida","io"],["espera_in","io"],["tempo","tm"],["repetir","fl"],["se","fl"],["coment","tm"],["raw","tm"]],Nx={home:"HOME",ptp:"PTP",lin:"LIN",rel:"Deslocar",vel:"Vel. linear",velax:"Vel. eixos",abrir:"Abrir garra",fechar:"Fechar garra",saida:"Sa\xEDda",espera_in:"Esperar entrada",tempo:"Aguardar",repetir:"Repetir",se:"Se entrada",coment:"Coment\xE1rio",raw:"KRL livre"};B("palette").innerHTML=Ox.map(([n,t])=>`<button data-b="${n}" data-g="${t}">+ ${Nx[n]}</button>`).join("");B("palette").onclick=n=>{let t=n.target.dataset&&n.target.dataset.b;if(!t)return;let e=At();e.blocks||(e.blocks=[]);let i=sf(e),s={home:{},ptp:{ponto:i[0]||"HOME"},lin:{ponto:i[0]||"HOME"},rel:{eixo:"Z",mm:100},vel:{v:.3},velax:{v:100},saida:{n:2,v:"TRUE"},espera_in:{n:1},tempo:{s:.5},repetir:{n:3},se:{n:1},coment:{txt:""},raw:{code:""}}[t]||{},r=[{k:t,...s}];t==="repetir"&&r.push({k:"fim_rep"}),t==="se"&&r.push({k:"fim_se"}),e.blocks.push(...r),Zi()};function sf(n){let t=["HOME"],e=/^\s*DECL\s+(?:GLOBAL\s+)?(E6POS|POS|E6AXIS|AXIS|FRAME)\s+([A-Za-z_]\w*)/gim,i;for(;i=e.exec(n.dat);)t.push(i[2]);return t}function $c(n,t,e){let i=[],s=[],r=1,a=0,o=[],c=()=>"  ".repeat(r);for(let l of n){let h=Ic[l.k];if(h){if(l.k==="repetir"){a++,s.push(`  DECL INT rep${a}`),i.push(`${c()}FOR rep${a} = 1 TO ${Math.max(1,Math.round(+l.n||1))}`),o.push("ENDFOR"),r++;continue}if(l.k==="se"){i.push(`${c()}IF $IN[${l.n}] THEN`),o.push("ENDIF"),r++;continue}if(l.k==="senao"){i.push(`${"  ".repeat(Math.max(1,r-1))}ELSE`);continue}if(l.k==="fim_rep"||l.k==="fim_se"){r=Math.max(1,r-1),i.push(`${c()}${o.pop()||(l.k==="fim_rep"?"ENDFOR":"ENDIF")}`);continue}i.push(c()+h.krl(l))}}for(;o.length;)r--,i.push("  ".repeat(Math.max(1,r))+o.pop());return[`DEF ${t}()`,...s,"  INI",...i,"END"].join(`
`)+(e?`
`+e:"")}function Xc(n){let t=n.split(`
`),e=t.findIndex(s=>/^\s*(GLOBAL\s+)?DEF\s+/i.test(s));if(e<0)return null;let i=e+1;for(;i<t.length&&!/^\s*END\s*(;.*)?$/i.test(t[i]);)i++;return{body:t.slice(e+1,i),rest:t.slice(i+1).join(`
`).replace(/^\n+/,"")}}function jc(n){let t=Xc(n);if(!t)return[];let e=[];for(let i of t.body){let s=i.trim();if(!s)continue;let r;if(/^;/.test(s)){e.push({k:"coment",txt:s.replace(/^;\s?/,"")});continue}let a=s.indexOf(";"),o=(a>0&&!s.slice(0,a).includes('"')?s.slice(0,a):s).trim(),c=a>0&&o!==s?s.slice(a+1).trim():"";if(/^DECL\s+INT\s+rep\d+$/i.test(o)||/^INI$/i.test(o))continue;let l=e.length;/^PTP\s+X?HOME$/i.test(o)?e.push({k:"home"}):(r=o.match(/^PTP\s+([A-Za-z_]\w*)$/i))?e.push({k:"ptp",ponto:r[1]}):(r=o.match(/^LIN\s+([A-Za-z_]\w*)$/i))?e.push({k:"lin",ponto:r[1]}):(r=o.match(/^LIN_REL\s*\{\s*([XYZ])\s+(-?[\d.]+)\s*\}$/i))?e.push({k:"rel",eixo:r[1].toUpperCase(),mm:+r[2]}):(r=o.match(/^\$VEL\.CP\s*=\s*([\d.]+)$/i))?e.push({k:"vel",v:+r[1]}):(r=o.match(/^BAS\s*\(\s*#PTP_PARAMS\s*,\s*([\d.]+)\s*\)$/i))?e.push({k:"velax",v:+r[1]}):/^\$OUT\[\s*1\s*\]\s*=\s*FALSE$/i.test(o)?e.push({k:"abrir"}):/^\$OUT\[\s*1\s*\]\s*=\s*TRUE$/i.test(o)?e.push({k:"fechar"}):(r=o.match(/^\$OUT\[\s*(\d+)\s*\]\s*=\s*(TRUE|FALSE)$/i))?e.push({k:"saida",n:+r[1],v:r[2].toUpperCase()}):(r=o.match(/^WAIT\s+FOR\s+\$IN\[\s*(\d+)\s*\]$/i))?e.push({k:"espera_in",n:+r[1]}):(r=o.match(/^WAIT\s+SEC\s+([\d.]+)$/i))?e.push({k:"tempo",s:+r[1]}):(r=o.match(/^FOR\s+rep\d+\s*=\s*1\s+TO\s+(\d+)$/i))?e.push({k:"repetir",n:+r[1]}):/^ENDFOR$/i.test(o)&&e.some(h=>h.k==="repetir")?e.push({k:"fim_rep"}):(r=o.match(/^IF\s+\$IN\[\s*(\d+)\s*\]\s+THEN$/i))?e.push({k:"se",n:+r[1]}):/^ELSE$/i.test(o)?e.push({k:"senao"}):/^ENDIF$/i.test(o)?e.push({k:"fim_se"}):e.push({k:"raw",code:s}),c&&e.length>l&&e[e.length-1].k!=="raw"&&e.push({k:"coment",txt:c})}return e}var Dc=!1,kd;function Zi(){let n=At();No(),Dc||(In("Antes de editar por blocos"),Dc=!0),clearTimeout(kd),kd=setTimeout(()=>{let t=Xc(n.src);n.src=$c(n.blocks,un(n.src),t?t.rest:""),n.blkSrc=n.src,it.file==="src"&&Ze("src"),Qi(),oe()},250)}function kx(){let n=At();n&&(Dc=!1,(!n.blocks||n.blkSrc!==void 0&&n.blkSrc!==n.src)&&(!n.blocks||n.blocks.length===0)&&(n.blocks=jc(n.src),n.blkSrc=n.src),No())}function No(){let n=At(),t=B("blocks"),e=sf(n),i=0,s="";n.blkSrc!==void 0&&n.blkSrc!==n.src&&(s+='<div class="note" style="color:var(--warn)">O programa foi editado como texto depois da \xFAltima gera\xE7\xE3o. Clique em "Ler do KRL" para atualizar os blocos.</div>'),n.blocks.length||(s+='<p class="note">Nenhum bloco. Use a paleta acima para montar o programa.</p>'),n.blocks.forEach((r,a)=>{let o=Ic[r.k]||Ic.raw;(o.close||o.mid)&&(i=Math.max(0,i-1));let c=(o.f||[]).map(([l,h,u])=>h==="pt"?`<select data-i="${a}" data-n="${l}">${[...new Set([...e,r[l]])].map(f=>`<option ${f===r[l]?"selected":""}>${Vt(f)}</option>`).join("")}</select><button class="sm" data-teach="${a}" title="Gravar a pose atual como novo ponto">\u2295</button>`:h==="sel"?`<select data-i="${a}" data-n="${l}">${u.map(f=>`<option ${f===r[l]?"selected":""}>${f}</option>`).join("")}</select>`:h==="num"?`<input type="number" step="any" data-i="${a}" data-n="${l}" value="${Vt(r[l])}"><span class="note" style="margin:0">${u||""}</span>`:`<input type="text" style="flex:1;min-width:120px" data-i="${a}" data-n="${l}" value="${Vt(r[l]||"")}">`).join("");s+=`<div class="blk ${o.g}" draggable="true" data-idx="${a}" style="margin-left:${i*18}px"><span class="h">\u283F</span><b>${Vt(o.t)}</b>${c}<span class="x"><button data-up="${a}">\u2191</button><button data-dn="${a}">\u2193</button><button data-del="${a}" class="danger">\u2715</button></span></div>`,(o.open||o.mid)&&i++}),t.innerHTML=s}B("blocks").addEventListener("change",n=>{let t=n.target;if(t.dataset.i===void 0)return;let e=At(),i=e.blocks[+t.dataset.i];i[t.dataset.n]=t.type==="number"?+t.value:t.value,Zi()});B("blocks").addEventListener("click",n=>{let t=n.target,e=At();if(!t.dataset)return;let i=e.blocks;if(t.dataset.del!==void 0){let s=+t.dataset.del,r=i[s].k;if(i.splice(s,1),r==="repetir"||r==="se"){let a=0;for(let o=s;o<i.length;o++){let c=i[o].k;if(c===r&&a++,c===(r==="se"?"fim_se":"fim_rep")){if(a===0){i.splice(o,1);break}a--}}}Zi()}if(t.dataset.up!==void 0){let s=+t.dataset.up;s>0&&([i[s-1],i[s]]=[i[s],i[s-1]],Zi())}if(t.dataset.dn!==void 0){let s=+t.dataset.dn;s<i.length-1&&([i[s+1],i[s]]=[i[s],i[s+1]],Zi())}if(t.dataset.teach!==void 0){if(it.running)return;let s=nf();i[+t.dataset.teach].ponto=s,xn(),ee("ok",`Ponto ${s} gravado com a pose atual.`),Zi()}});var Bs=null;B("blocks").addEventListener("dragstart",n=>{let t=n.target.closest(".blk");t&&(Bs=+t.dataset.idx,t.classList.add("drag"),n.dataTransfer.effectAllowed="move")});B("blocks").addEventListener("dragover",n=>{let t=n.target.closest(".blk");t&&(n.preventDefault(),document.querySelectorAll(".blk.over").forEach(e=>e.classList.remove("over")),t.classList.add("over"))});B("blocks").addEventListener("drop",n=>{let t=n.target.closest(".blk");if(!t||Bs===null)return;n.preventDefault();let e=+t.dataset.idx,i=At().blocks,[s]=i.splice(Bs,1);i.splice(e>Bs?e-1:e,0,s),Bs=null,Zi()});B("blocks").addEventListener("dragend",()=>{Bs=null,document.querySelectorAll(".blk.drag,.blk.over").forEach(n=>n.classList.remove("drag","over"))});B("bBlkRead").onclick=()=>{let n=At();n.blocks=jc(n.src),n.blkSrc=n.src,No(),oe(),Oe(`${n.blocks.length} blocos lidos do programa`)};B("bBlkGen").onclick=()=>{let n=At();In("Antes de gerar pelos blocos");let t=Xc(n.src);n.src=$c(n.blocks,un(n.src),t?t.rest:""),n.blkSrc=n.src,Ze("src"),oe(),No(),Oe("Programa .src gerado a partir dos blocos")};B("projCatF").innerHTML+=Bd.map(n=>`<option>${n}</option>`).join("");B("projSearch").oninput=_n;B("projCatF").onchange=_n;function _n(){let n=B("projSearch").value.toLowerCase(),t=B("projCatF").value,e=Pt.projects.filter(s=>(!t||s.cat===t)&&(!n||s.name.toLowerCase().includes(n)));B("projList").innerHTML=e.map(s=>`<div class="item ${s.id===Pt.currentId?"on":""}" data-open="${s.id}"><b>${Vt(s.name)}</b><div class="meta">${Vt(s.cat)} \xB7 ${s.versions.length} vers\xF5es \xB7 alterado ${yi(s.updated)}${s.original?" \xB7 importado":""}</div></div>`).join("")||'<p class="note">Nenhum projeto encontrado.</p>';let i=At();if(!i){B("projDetail").innerHTML="";return}B("projDetail").innerHTML=`<h3>Projeto aberto</h3>
    <div class="row"><input type="text" id="pdName" value="${Vt(i.name)}" style="flex:1"></div>
    <div class="row"><label>Categoria</label><select id="pdCat" style="flex:1">${Bd.map(s=>`<option ${s===i.cat?"selected":""}>${s}</option>`).join("")}</select></div>
    <div class="row"><button id="pdVer">Salvar vers\xE3o\u2026</button><button id="pdDup">Duplicar</button><button id="pdDel" class="danger">Excluir</button></div>
    <h3>Hist\xF3rico de vers\xF5es</h3>
    ${i.versions.slice().reverse().map((s,r)=>`<div class="item" style="cursor:default"><b>${Vt(s.note)}</b><div class="meta">${yi(s.date)} \xB7 ${s.src.split(`
`).length} linhas</div>
      <div class="row" style="margin-bottom:0"><button class="sm" data-vcmp="${s.id}">Comparar com o atual</button><button class="sm" data-vres="${s.id}">Restaurar</button></div></div>`).join("")}`,B("pdName").onchange=()=>{i.name=B("pdName").value.trim()||"Sem nome",B("projName").value=i.name,oe(),_n()},B("pdCat").onchange=()=>{i.cat=B("pdCat").value,oe(),_n()},B("pdVer").onclick=async()=>{let s=await qc("Salvar vers\xE3o","Descreva a altera\xE7\xE3o (ex.: ajustei a altura da pega):");s!==null&&(In(s||"Vers\xE3o manual",!0),_n(),Oe("Vers\xE3o salva"))},B("pdDup").onclick=()=>{let s=Ws(i);s.id=Lr(),s.name=i.name+" (c\xF3pia)",s.created=s.updated=kn(),Pt.projects.unshift(s),Pn(s.id),_n()},B("pdDel").onclick=async()=>{it.running||!await ti("Excluir projeto",`Excluir <b>${Vt(i.name)}</b> e todo o seu hist\xF3rico? Se quiser guardar, fa\xE7a antes um backup deste projeto.`,[{label:"Cancelar",value:!1},{label:"Excluir",value:!0,danger:!0}])||(Pt.projects=Pt.projects.filter(r=>r!==i),Pt.projects.length||Ki({name:"Meu primeiro programa",...Ux()}),Pn(Pt.projects[0].id),_n())}}B("projList").onclick=n=>{let t=n.target.closest("[data-open]");t&&(Pn(t.dataset.open),_n())};B("projDetail").onclick=async n=>{let t=At(),e=n.target;if(e.dataset.vcmp){let i=t.versions.find(s=>s.id===e.dataset.vcmp);rf(`Vers\xE3o "${i.note}" (${yi(i.date)}) \u2192 atual`,i,t)}if(e.dataset.vres){if(it.running)return;let i=t.versions.find(r=>r.id===e.dataset.vres);if(!await ti("Restaurar vers\xE3o",`Substituir o programa atual pela vers\xE3o <b>${Vt(i.note)}</b> de ${yi(i.date)}? O estado atual ser\xE1 guardado no hist\xF3rico antes.`,[{label:"Cancelar",value:!1},{label:"Restaurar",value:!0,pri:!0}]))return;In("Antes de restaurar vers\xE3o",!1),t.src=i.src,t.dat=i.dat,Ze("src"),Qi(),xn(),oe(),_n(),Oe("Vers\xE3o restaurada")}};function qc(n,t,e=""){return new Promise(i=>{B("askTitle").textContent=n,B("askBody").innerHTML=`<p>${t}</p><input type="text" id="askIn" style="width:100%" value="${Vt(e)}">`;let s=B("askFoot");s.innerHTML="";let r=document.createElement("button");r.textContent="Cancelar",r.onclick=()=>{B("mAsk").classList.remove("on"),i(null)};let a=document.createElement("button");a.textContent="OK",a.className="pri",a.onclick=()=>{B("mAsk").classList.remove("on"),i(B("askIn").value.trim())},s.append(r,a),B("mAsk").classList.add("on"),setTimeout(()=>{B("askIn").focus(),B("askIn").onkeydown=o=>{o.key==="Enter"&&a.click()}},30)})}var Ux=()=>({src:`DEF novo()
  INI
  PTP HOME

  PTP HOME
END`,dat:`DEFDAT novo

ENDDAT`});B("bProjNew").onclick=async()=>{let n=await qc("Novo projeto","Nome do projeto:","Novo programa");if(n===null)return;let t=(n||"novo").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9_]+/g,"_").replace(/^(\d)/,"_$1").toLowerCase().slice(0,24)||"novo",e=Ki({name:n||"Novo programa",src:`DEF ${t}()
  INI
  PTP HOME

  PTP HOME
END`,dat:`DEFDAT ${t}

ENDDAT`,scene:SCENES.pick});Pn(e.id),_n()};function Fx(n,t){let e=n.split(`
`),i=t.split(`
`),s=e.length,r=i.length;if(s*r>4e6)return[{t:"h",s:"Arquivos grandes demais para comparar linha a linha."}];let a=Array.from({length:s+1},()=>new Uint32Array(r+1));for(let h=s-1;h>=0;h--)for(let u=r-1;u>=0;u--)a[h][u]=e[h]===i[u]?a[h+1][u+1]+1:Math.max(a[h+1][u],a[h][u+1]);let o=[],c=0,l=0;for(;c<s&&l<r;)e[c]===i[l]?(o.push({t:"=",s:e[c]}),c++,l++):a[c+1][l]>=a[c][l+1]?o.push({t:"r",s:e[c++]}):o.push({t:"a",s:i[l++]});for(;c<s;)o.push({t:"r",s:e[c++]});for(;l<r;)o.push({t:"a",s:i[l++]});return o}function Ud(n,t){let e=Fx(n,t);if(!e.filter(o=>o.t==="a"||o.t==="r").length)return'<p class="note">Sem diferen\xE7as.</p>';let s=e.map((o,c)=>o.t!=="="||e.slice(Math.max(0,c-2),c+3).some(l=>l.t!=="=")),r="",a=!1;return e.forEach((o,c)=>{if(!s[c]){a||(r+='<div class="h">  \u22EF</div>'),a=!0;return}a=!1,r+=`<div class="${o.t==="a"?"a":o.t==="r"?"r":""}">${o.t==="a"?"+ ":o.t==="r"?"- ":"  "}${Vt(o.s)}</div>`}),`<p class="note">${e.filter(o=>o.t==="r").length} linha(s) removida(s), ${e.filter(o=>o.t==="a").length} adicionada(s).</p><div class="diff">${r}</div>`}function rf(n,t,e){B("diffTitle").textContent=n,B("diffBody").innerHTML=`<h3>Programa (.src)</h3>${Ud(t.src,e.src)}<h3>Dados (.dat)</h3>${Ud(t.dat,e.dat)}`,B("mDiff").classList.add("on")}async function af(n){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}var Yc=n=>n.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^\w.-]+/g,"_").slice(0,60);async function Zc(n,t){let e=new kc.default,i=JSON.stringify({projects:n,progress:t==="completo"?Pt.progress:void 0},null,1);e.file("biblioteca.json",i),e.file("manifesto.json",JSON.stringify({app:"Korum",versao:mo,tipo:t,data:kn(),projetos:n.length,sha256:await af(i)},null,1));for(let s of n){let r=un(s.src),a=e.folder("programas/"+Yc(s.name));a.file(r+".src",s.src),a.file(r+".dat",s.dat)}return e.generateAsync({type:"uint8array",compression:"DEFLATE"})}var Kc=()=>{let n=new Date;return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}_${String(n.getHours()).padStart(2,"0")}${String(n.getMinutes()).padStart(2,"0")}`};B("bBackupAll").onclick=async()=>{let n=await Zc(Pt.projects,"completo"),t=await Un.saveFile(`korum-backup-${Kc()}.zip`,n);t&&t.saved&&(Pt.settings.lastBackup=kn(),oe(),Oe("Backup salvo"),ee("ok",`Backup completo salvo: ${t.path} (${Pt.projects.length} projetos).`),Jc())};B("bBackupProj").onclick=async()=>{let n=At(),t=await Zc([n],"projeto"),e=await Un.saveFile(`korum-${Yc(n.name)}-${Kc()}.zip`,t);e&&e.saved&&(Oe("Projeto exportado"),ee("ok",`Projeto salvo em ${e.path}.`))};B("bExportKrl").onclick=async()=>{let n=At(),t=un(n.src),e=await Un.saveFile(t+".src",n.src);if(e&&e.saved){let i=await Un.saveFile(t+".dat",n.dat);i&&i.saved&&ee("ok",`Arquivos ${t}.src e ${t}.dat exportados.`)}};B("bRestore").onclick=()=>B("fileZip").click();B("fileZip").onchange=async n=>{let t=n.target.files[0];if(n.target.value="",!!t)try{let e,i=null;if(/\.json$/i.test(t.name)){let a=JSON.parse(await t.text());e=a.projects?a:{projects:[]}}else{let a=await kc.default.loadAsync(await t.arrayBuffer()),o=a.file("biblioteca.json"),c=a.file("manifesto.json");if(!o)throw new Error("o arquivo n\xE3o \xE9 um backup do Korum (falta biblioteca.json)");let l=await o.async("string");if(c&&(i=JSON.parse(await c.async("string")),i.sha256&&i.sha256!==await af(l)))throw new Error("verifica\xE7\xE3o de integridade falhou: o backup est\xE1 corrompido ou foi alterado");e=JSON.parse(l)}if(!Array.isArray(e.projects)||!e.projects.length)throw new Error("nenhum projeto no backup");let s=i?`Backup de ${yi(i.data)} \xB7 ${i.projetos} projeto(s) \xB7 integridade verificada \u2713`:`${e.projects.length} projeto(s)`,r=await ti("Restaurar backup",`<p>${s}</p><p><b>Adicionar</b> coloca os projetos do backup junto aos atuais (c\xF3pias, sem apagar nada).<br><b>Substituir</b> apaga a biblioteca atual e deixa s\xF3 o conte\xFAdo do backup.</p>`,[{label:"Cancelar",value:null},{label:"Substituir tudo",value:"sub",danger:!0},{label:"Adicionar",value:"add",pri:!0}]);if(!r)return;if(r==="sub"){if(!await ti("Confirmar substitui\xE7\xE3o","Isso apaga todos os projetos atuais. Tem certeza?",[{label:"Cancelar",value:!1},{label:"Apagar e substituir",value:!0,danger:!0}]))return;Pt.projects=e.projects,e.progress&&(Pt.progress=e.progress)}else e.projects.forEach(a=>{a.id=Lr(),Pt.projects.unshift(a)});Pn(Pt.projects[0].id),_n(),Br(),ee("ok",`Backup restaurado (${r==="sub"?"substitui\xE7\xE3o":"adi\xE7\xE3o"}): ${e.projects.length} projeto(s).`)}catch(e){ee("err","N\xE3o foi poss\xEDvel restaurar: "+e.message),ti("Backup inv\xE1lido",Vt(e.message),[{label:"OK",value:1}])}};function Jc(){B("backupInfo").textContent=`Pasta sugerida: ${Pt.settings.backupDir||"Documentos"} \xB7 \xFAltimo backup .zip: ${Pt.settings.lastBackup?yi(Pt.settings.lastBackup):"nunca"}. C\xF3pias autom\xE1ticas di\xE1rias ficam na pasta de dados.`}var Qc="proj";B("bProjImport").onclick=()=>{Qc="proj",B("fileKrl").click()};B("bRevImport").onclick=()=>{Qc="rev",B("fileKrl").click()};B("fileKrl").onchange=async n=>{let t=[...n.target.files];if(n.target.value="",!t.length)return;let e=null,i=null;for(let r of t){let a=await r.text();/\.dat$/i.test(r.name)||/^\s*(&.*\r?\n\s*)*DEFDAT/i.test(a)?i=a:e=a}if(e===null){i!==null&&At()&&(At().dat=i,Ze(it.file),xn(),oe(),ee("info","Arquivo .dat importado para o projeto aberto."));return}e=e.replace(/\r\n/g,`
`),i=(i||`DEFDAT ${un(e)}
ENDDAT`).replace(/\r\n/g,`
`);let s=Ki({name:t.map(r=>r.name).join(" + "),cat:"Importados",src:e,dat:i,scene:At()?At().scene:SCENES.pick});s.original={src:e,dat:i,date:kn(),files:t.map(r=>r.name)},Pn(s.id),ee("ok",`Importado: ${s.name}. O original foi guardado para compara\xE7\xE3o.`),Qc==="rev"?(_e("analise"),su()):(_e("prog"),Oo(!0))};var Us=null;function Ar(){let n=COURSES.flatMap(e=>e.aulas),t=n.filter(e=>Pt.progress.lessons[e.id]).length;if(B("courseProg").textContent=`${t}/${n.length} aulas`,Us){let e=COURSES.find(a=>a.aulas.some(o=>o.id===Us)),i=e.aulas.find(a=>a.id===Us),s=e.aulas.indexOf(i),r=i.exemplo&&EXAMPLES.find(a=>a.id===i.exemplo);B("courses").innerHTML=`<div class="row"><button class="sm" id="lsBack">\u2190 Trilha</button><span class="note">N\xEDvel ${e.nivel} \xB7 ${e.titulo} \xB7 aula ${s+1}/${e.aulas.length}</span></div>
      <h2>${Vt(i.titulo)}</h2><div class="lesson">${i.html}</div>
      <div class="row" style="margin-top:14px">${r?`<button class="pri" id="lsEx">Abrir exemplo: ${Vt(r.title)}</button>`:""}
      <button id="lsDone">${Pt.progress.lessons[i.id]?"\u2713 Conclu\xEDda":"Marcar como conclu\xEDda"}</button>
      <button id="lsAsk">Perguntar ao Professor</button>${s<e.aulas.length-1?'<button id="lsNext">Pr\xF3xima \u2192</button>':""}</div>`,B("lsBack").onclick=()=>{Us=null,Ar()},r&&(B("lsEx").onclick=()=>Gs(r)),B("lsDone").onclick=()=>{Pt.progress.lessons[i.id]=!Pt.progress.lessons[i.id],oe(),Ar()},B("lsAsk").onclick=()=>{_e("ia"),B("chatIn").value=`Sobre a aula "${i.titulo}": `,B("chatIn").focus()},B("lsNext")&&(B("lsNext").onclick=()=>{Pt.progress.lessons[i.id]=!0,oe(),Us=e.aulas[s+1].id,Ar(),B("courses").scrollTop=0});return}B("courses").innerHTML=`<div class="bar" style="margin-bottom:10px"><i style="width:${Math.round(100*t/n.length)}%"></i></div>`+COURSES.map(e=>{let i=e.aulas.filter(s=>Pt.progress.lessons[s.id]).length;return`<div class="cat">N\xEDvel ${e.nivel} \u2014 ${e.titulo} <span class="badge ${i===e.aulas.length?"ok":""}">${i}/${e.aulas.length}</span></div>`+e.aulas.map(s=>`<div class="item" data-ls="${s.id}">${Pt.progress.lessons[s.id]?"\u2713 ":""}<b>${Vt(s.titulo)}</b>${s.exemplo?'<div class="meta">com exemplo pr\xE1tico</div>':""}</div>`).join("")}).join("")}B("courses").onclick=n=>{let t=n.target.closest("[data-ls]");t&&(Us=t.dataset.ls,Ar(),B("courses").scrollTop=0)};var Rr=null;function ko(){let n=Pt.progress.exercises,t=EXERCISES.filter(e=>n[e.id]&&n[e.id].best===100).length;if(B("exProg").textContent=`${t}/${EXERCISES.length} completos`,Rr){let e=EXERCISES.find(r=>r.id===Rr),i=n[e.id],s=Pt.projects.find(r=>r.exercise===e.id);B("exercises").innerHTML=`<div class="row"><button class="sm" id="exBack">\u2190 Exerc\xEDcios</button><span class="note">${Vt(e.nivel)} \xB7 cen\xE1rio: ${Vt(SCENES[e.scene].nome)}</span></div>
      <h2>${Vt(e.titulo)}</h2><p>${Vt(e.enunciado)}</p>
      <h3>Crit\xE9rios de avalia\xE7\xE3o</h3><div id="exCrit">${e.criterios.map(r=>`<div class="crit"><b>\u2022</b><div>${Vt(r.txt)}</div></div>`).join("")}</div>
      <div class="row" style="margin-top:12px"><button class="pri exrun" id="exStart">${s?"Abrir meu programa":"Come\xE7ar exerc\xEDcio"}</button><button class="exrun" id="exEval" ${s?"":"disabled"}>\u25B6 Executar e avaliar</button>${s?'<button class="exrun danger" id="exRestart">Recome\xE7ar do zero</button>':""}</div>
      ${i?`<p class="note">Melhor nota: <b>${i.best}%</b> \xB7 ${i.tries} tentativa(s) \xB7 \xFAltima em ${yi(i.date)}</p>`:""}<div id="exResult"></div>`,B("exBack").onclick=()=>{Rr=null,ko()},B("exStart").onclick=()=>{Oc(e,!1)},B("exRestart")&&(B("exRestart").onclick=async()=>{await ti("Recome\xE7ar","Apagar o seu programa deste exerc\xEDcio e come\xE7ar do modelo inicial?",[{label:"Cancelar",value:!1},{label:"Recome\xE7ar",value:!0,danger:!0}])&&Oc(e,!0)}),B("exEval").onclick=()=>of(e);return}B("exercises").innerHTML='<p class="note">Cada exerc\xEDcio abre um projeto pr\xF3prio (categoria Exerc\xEDcios) com o cen\xE1rio certo. Escreva a solu\xE7\xE3o e clique em "Executar e avaliar": o Korum executa o programa e confere cada crit\xE9rio.</p>'+EXERCISES.map(e=>{let i=n[e.id];return`<div class="item" data-ex="${e.id}"><b>${Vt(e.titulo)}</b> ${i?`<span class="badge ${i.best===100?"ok":"warn"}">${i.best}%</span>`:""}<div class="meta">${Vt(e.nivel)} \xB7 ${e.criterios.length} crit\xE9rios</div></div>`}).join("")}B("exercises").onclick=n=>{let t=n.target.closest("[data-ex]");t&&(Rr=t.dataset.ex,ko())};function Oc(n,t){let e=Pt.projects.find(i=>i.exercise===n.id);e&&t&&(Pt.projects=Pt.projects.filter(i=>i!==e),e=null),e||(e=Ki({name:"Exerc\xEDcio: "+n.titulo,cat:"Exerc\xEDcios",src:n.src,dat:n.dat,scene:SCENES[n.scene],exercise:n.id})),Pn(e.id),ko(),_e("prog"),ee("info",`Exerc\xEDcio "${n.titulo}": ${n.enunciado}`)}async function of(n){let t=At();if(!t||t.exercise!==n.id){if(t=Pt.projects.find(o=>o.exercise===n.id),!t)return;Pn(t.id)}t.scene=Ws(SCENES[n.scene]),Po(t.scene),ns(!0),ee("run",`Avalia\xE7\xE3o do exerc\xEDcio "${n.titulo}"`);let i={result:await ni(!1),events:it.events,joints:it.joints.slice(),parts:De.map(xo),outs:it.outs.slice(),src:t.src,scene:t.scene},s=n.criterios.map(o=>{let c=!1;try{c=!!o.f(i)}catch{c=!1}return{...o,ok:c}}),r=Math.round(100*s.filter(o=>o.ok).length/s.length),a=Pt.progress.exercises[n.id]||{best:0,tries:0};a.tries++,a.best=Math.max(a.best,r),a.date=kn(),Pt.progress.exercises[n.id]=a,oe(),Rr=n.id,_e("exerc"),B("exResult").innerHTML=`<h3>Resultado: ${r}%</h3><div class="bar"><i style="width:${r}%;background:${r===100?"var(--ok)":"var(--warn)"}"></i></div>`+s.map(o=>`<div class="crit ${o.ok?"ok":"no"}"><b>${o.ok?"\u2713":"\u2717"}</b><div>${Vt(o.txt)}${o.ok?"":`<small>Dica: ${Vt(o.dica)}</small>`}</div></div>`).join("")+(r===100?'<p style="color:var(--ok)"><b>Parab\xE9ns! Exerc\xEDcio conclu\xEDdo.</b></p>':'<p class="note">Corrija os itens marcados com \u2717 e avalie de novo. Em d\xFAvida, pergunte ao Professor.</p>'),ee(r===100?"ok":"warn",`Nota do exerc\xEDcio "${n.titulo}": ${r}%`)}var cn=null;B("scenePreset").innerHTML='<option value="">\u2014 escolher modelo \u2014</option>'+Object.entries(SCENES).map(([n,t])=>`<option value="${n}">${Vt(t.nome)}</option>`).join("");B("scenePreset").onchange=()=>{let n=B("scenePreset").value;n&&(cn=Ws(SCENES[n]),Wr(!0)),B("scenePreset").value=""};function Wr(n){let t=At();if(!t)return;(!n||!cn)&&(cn=Ws(t.scene));let e=(i,s,r=62)=>`<input type="number" data-s="${i}" value="${s}" style="width:${r}px">`;B("sceneObjs").innerHTML=cn.objetos.map((i,s)=>`<div class="item" style="cursor:default"><div class="row" style="margin:0 0 4px"><select data-s="o.${s}.tipo">${["mesa","esteira","palete","maquina","bloco"].map(r=>`<option ${r===i.tipo?"selected":""}>${r}</option>`).join("")}</select><input type="text" data-s="o.${s}.nome" value="${Vt(i.nome)}" style="flex:1"><button class="sm danger" data-sdel="o.${s}">\u2715</button></div>
    <div class="row" style="margin:0"><label>X</label>${e(`o.${s}.x`,i.x)}<label>Y</label>${e(`o.${s}.y`,i.y)}<label>L</label>${e(`o.${s}.w`,i.w,56)}<label>P</label>${e(`o.${s}.d`,i.d,56)}<label>A</label>${e(`o.${s}.h`,i.h,56)}</div></div>`).join("")||'<p class="note">Nenhum objeto.</p>',B("sceneParts").innerHTML=cn.pecas.map((i,s)=>`<div class="row"><label>Pe\xE7a ${s+1}</label><label>X</label>${e(`p.${s}.0`,i[0])}<label>Y</label>${e(`p.${s}.1`,i[1])}<button class="sm danger" data-sdel="p.${s}">\u2715</button></div>`).join("")||'<p class="note">Nenhuma pe\xE7a.</p>'}document.getElementById("p-cena").addEventListener("change",n=>{let t=n.target.dataset.s;if(!t)return;let[e,i,s]=t.split(".");e==="o"?cn.objetos[+i][s]=n.target.type==="number"?+n.target.value:n.target.value:cn.pecas[+i][+s]=+n.target.value});document.getElementById("p-cena").addEventListener("click",n=>{let t=n.target.dataset.sdel;if(!t)return;let[e,i]=t.split(".");(e==="o"?cn.objetos:cn.pecas).splice(+i,1),Wr(!0)});B("bAddObj").onclick=()=>{let n=B("newObjType").value,t={mesa:[350,500,150],esteira:[440,310,150],palete:[320,320,120],maquina:[420,300,420],bloco:[150,150,150]}[n];cn.objetos.push({tipo:n,nome:n[0].toUpperCase()+n.slice(1),x:500,y:400,w:t[0],d:t[1],h:t[2]}),Wr(!0)};B("bAddPart").onclick=()=>{cn.pecas.push([575,0]),Wr(!0)};B("bSceneApply").onclick=()=>{if(it.running)return;let n=At();for(let t of cn.objetos)Math.hypot(t.x,t.y)<Math.max(t.w,t.d)/2+120&&Math.abs(t.x)<t.w/2+130&&Math.abs(t.y)<t.d/2+130&&ee("warn",`${t.nome} ocupa a base do rob\xF4 \u2014 ajuste X/Y.`);n.scene=Ws(cn),Po(n.scene),ns(!0),oe(),ee("ok",`Cen\xE1rio aplicado: ${n.scene.objetos.length} objeto(s), ${n.scene.pecas.length} pe\xE7a(s).`)};var lf={pegar:4163286,soltar:4440954,passar:15905597},kr={pegar:"Pegar",soltar:"Soltar",passar:"Passar por"},$r=!1,Ye=-1,Be=new ge;ne.add(Be);var bo=new to;function js(){let n=At();return n.trOpt=n.trOpt||{aprox:150,vel:.4,rep:1,home:!0},n.trOpt}function Bx(n,t){let e=0;for(let i of At().scene.objetos)Math.abs(n-i.x)<i.w/2&&Math.abs(t-i.y)<i.d/2&&(e=Math.max(e,i.h));return e}var qe=n=>Math.round(n*10)/10;function Nc(n){$r=n,B("trMark").classList.toggle("on",n),B("trMark").textContent=n?"\u{1F5B1} Marcar pontos: LIGADO (clique no 3D)":"\u{1F5B1} Marcar pontos: desligado",bi.classList.toggle("marking",n)}B("trMark").onclick=()=>Nc(!$r);var Cr=null;be.domElement.addEventListener("pointerdown",n=>{Cr=[n.clientX,n.clientY]});be.domElement.addEventListener("pointerup",n=>{!$r||!Cr||it.running||Math.hypot(n.clientX-Cr[0],n.clientY-Cr[1])>5||zx(n)});function zx(n){let t=be.domElement.getBoundingClientRect();bo.setFromCamera(new St((n.clientX-t.left)/t.width*2-1,-((n.clientY-t.top)/t.height)*2+1),vn);let e=De.filter(f=>f.parent===ne),i=[];qi.traverse(f=>{f.isMesh&&i.push(f)});let s=bo.intersectObjects([...e,...i,Ao],!1)[0];if(!s)return;let r=ne.worldToLocal(s.point.clone()),a=At();a.trajeto||(a.trajeto=[]);let o=a.trajeto,c=B("trNext").value,l=o.filter(f=>f.acao==="pegar").length>o.filter(f=>f.acao==="soltar").length,h=(o.slice().reverse().find(f=>f.acao==="pegar")||{}).a||0,u;if(e.includes(s.object)){let f=s.object.position,d=Jn(s.object),g=Math.round(s.object.rotation.z*RL.R2D),_=c==="auto"?l?"soltar":"pegar":c;_==="pegar"?u={x:f.x,y:f.y,z:f.z,a:g,acao:"pegar"}:_==="soltar"?u={x:f.x,y:f.y,z:f.z+d.h/2+30,a:h,acao:"soltar"}:u={x:f.x,y:f.y,z:f.z+d.h/2+200,a:h,acao:"passar"}}else{let f=Bx(r.x,r.y),d=c==="auto"?l?"soltar":"passar":c;u={x:r.x,y:r.y,z:d==="passar"?f+225:f+30,a:d==="pegar"?0:h,acao:d}}u.x=qe(u.x),u.y=qe(u.y),u.z=qe(u.z),o.push(u),Ye=o.length-1,Mi(),ee("info",`Ponto T${o.length} (${kr[u.acao]}) marcado em X ${u.x} Y ${u.y} Z ${u.z}.`)}function tu(n){let t=js(),e=RL.frameToMat(RL.DEFAULT_TOOL),i=r=>{let a=RL.ik(RL.mul(RL.frameToMat({X:n.x,Y:n.y,Z:r,A:n.a||0,B:90,C:0}),RL.inv(e)),RL.HOME);if(!a.ok)return a.reason;let o=RL.checkCollision(a.j,e);return o?`colis\xE3o de ${o.part} com ${o.obstacle.nome}`:null},s=i(n.z);if(s)return s;if(n.acao!=="passar"){let r=i(n.z+t.aprox);if(r)return"aproxima\xE7\xE3o: "+r}return null}var Tc="; Programa gerado pela aba Trajeto";function Hx(){let n=At(),t=js(),e=n.trajeto||[];if(!e.length)return;n.src.includes(Tc)||In("Antes de gerar pelo Trajeto",!0);let i=n.src.includes(Tc)?un(n.src):"trajeto",s=(l,h)=>`{X ${qe(l.x)}, Y ${qe(l.y)}, Z ${qe(l.z+h)}, A ${qe(l.a||0)}, B 90, C 0}`,r=Math.max(1,Math.round(+t.rep||1)),a=r>1?"    ":"  ",o=[],c=[];o.push(`DEF ${i}()`,`  ${Tc} (marca\xE7\xE3o de pontos com o mouse).`,"  ; Para mudar o trajeto, edite os pontos na aba Trajeto."),r>1&&o.push("  DECL INT ciclo"),o.push("  INI",`  $VEL.CP = ${Math.max(.01,Math.min(2,+t.vel||.4))}`),t.home&&o.push("  PTP HOME"),o.push("  $OUT[1] = FALSE                ; garra aberta no in\xEDcio"),r>1&&o.push(`  FOR ciclo = 1 TO ${r}`),e.forEach((l,h)=>{let u="T"+(h+1);if(c.push(`  DECL E6POS ${u} = ${s(l,0)}`),l.acao==="passar"){o.push("",`${a}; ${h+1}. passar por`,`${a}PTP ${u}`);return}c.push(`  DECL E6POS ${u}_APROX = ${s(l,+t.aprox||150)}`),o.push("",`${a}; ${h+1}. ${l.acao}`,`${a}PTP ${u}_APROX`,`${a}LIN ${u}`,`${a}$OUT[1] = ${l.acao==="pegar"?"TRUE ":"FALSE"}           ; ${l.acao==="pegar"?"fecha":"abre"} a garra`,`${a}WAIT SEC 0.3`,`${a}LIN ${u}_APROX`)}),r>1&&o.push("  ENDFOR"),o.push(""),t.home&&o.push("  PTP HOME"),o.push("END"),n.src=o.join(`
`),n.dat=`DEFDAT ${i}
  ; pontos marcados com o mouse (aba Trajeto)
${c.join(`
`)}
ENDDAT`,n.blocks=null,Ze(it.file),Qi(),oe()}function Mi(){Hx(),ii(),Ln(),xn()}function ii(){let n=At();if(!n)return;let t=n.trajeto||[],e=js();if(B("trajN").textContent=`${t.length} ponto(s)`,B("trAprox").value=e.aprox,B("trVel").value=e.vel,B("trRep").value=e.rep,B("trHome").checked=!!e.home,!t.length){B("trList").innerHTML='<p class="note">Nenhum ponto ainda. Ligue "Marcar pontos" e clique numa pe\xE7a no 3D (o rob\xF4 vai peg\xE1-la) e depois na esteira ou na mesa (ele vai soltar ali). Pode marcar quantos pontos quiser.</p>';return}B("trList").innerHTML=t.map((i,s)=>{let r=tu(i);return`<div class="trp ${s===Ye?"sel":""}" data-ti="${s}"><span class="num" style="background:#${lf[i.acao].toString(16).padStart(6,"0")}">${s+1}</span>
      <select data-tf="acao">${Object.keys(kr).map(a=>`<option value="${a}" ${a===i.acao?"selected":""}>${kr[a]}</option>`).join("")}</select>
      <span class="xyz">${["x","y","z","a"].map(a=>`<span class="pr"><label>${a==="a"?"giro\xB0":a.toUpperCase()}</label><input type="number" data-tf="${a}" value="${qe(i[a]||0)}" step="${a==="a"?90:5}"></span>`).join("")}</span>
      <span class="bt"><button data-tm="-1" title="Subir na ordem">\u2191</button><button data-tm="1" title="Descer na ordem">\u2193</button><button data-tx class="danger" title="Excluir ponto">\u2715</button></span>
      <span class="st" style="color:${r?"var(--err)":"var(--ok)"}">${r?"\u26A0 "+Vt(r):"\u2713 alcan\xE7\xE1vel"}</span></div>`}).join("")+'<p class="note">Clique num ponto da lista para destac\xE1-lo no 3D. Os n\xFAmeros podem ser ajustados \xE0 m\xE3o (mm e graus).</p>'}B("trList").addEventListener("change",n=>{let t=n.target.dataset.tf,e=n.target.closest("[data-ti]");if(!t||!e)return;let i=At().trajeto[+e.dataset.ti];i[t]=t==="acao"?n.target.value:+n.target.value,Mi()});B("trList").addEventListener("click",n=>{let t=n.target.closest("[data-ti]");if(!t)return;let e=+t.dataset.ti,i=At().trajeto;if(n.target.dataset.tm!==void 0){let s=e+ +n.target.dataset.tm;s>=0&&s<i.length&&([i[e],i[s]]=[i[s],i[e]],Ye=s,Mi());return}if(n.target.dataset.tx!==void 0){i.splice(e,1),Ye=-1,i.length?Mi():(ii(),Ln()),ee("info",`Ponto T${e+1} exclu\xEDdo; os seguintes foram renumerados.`);return}n.target.tagName!=="INPUT"&&n.target.tagName!=="SELECT"&&(Ye=e,ii(),Ln())});[["trAprox","aprox"],["trVel","vel"],["trRep","rep"]].forEach(([n,t])=>B(n).onchange=()=>{js()[t]=+B(n).value,(At().trajeto||[]).length&&Mi()});B("trHome").onchange=()=>{js().home=B("trHome").checked,(At().trajeto||[]).length&&Mi()};B("trRun").onclick=()=>{if(!it.running){if(!(At().trajeto||[]).length)return Oe("Marque pelo menos um ponto");ns(!0),ni(!1)}};B("trCode").onclick=()=>{_e("prog"),Ze("src")};B("trClear").onclick=async()=>{let n=At().trajeto||[];if(!n.length)return;await ti("Apagar pontos",`Apagar os ${n.length} pontos do trajeto? O programa atual continua no editor e no hist\xF3rico de vers\xF5es.`,[{label:"Cancelar",value:!1},{label:"Apagar",value:!0,danger:!0}])&&(At().trajeto=[],Ye=-1,ii(),Ln())};var Ur=[];function Mo(n,t,e){let i=0,s="o ch\xE3o";for(let r of At().scene.objetos)Math.abs(n-r.x)<r.w/2&&Math.abs(t-r.y)<r.d/2&&r.h>i&&(i=r.h,s=r.nome);for(let r of De)if(r.parent===ne){let a=Jn(r);Math.abs(r.position.x-n)<a.wx/2&&Math.abs(r.position.y-t)<a.wy/2&&r.position.z+a.h/2>i&&(i=r.position.z+a.h/2,s="a pe\xE7a")}return{z:i,nome:s}}function Ln(){zc(Be),Ur=[];let n=At(),t=n&&n.trajeto||[];if(!t.length){So();return}let e=js(),i=[];if(t.forEach((r,a)=>{let o=!!tu(r),c=o?16728128:lf[r.acao],l=a===Ye,h=new xe(new Kn(l?18:13,20,14),new je({color:c,depthTest:!1,transparent:!0,opacity:.95}));h.renderOrder=20,h.position.set(r.x,r.y,r.z),Be.add(h);let u=new xe(new Kn(l?26:20,20,14),new je({color:16777215,depthTest:!1,transparent:!0,opacity:l?.35:.18}));u.renderOrder=19,u.position.copy(h.position),Be.add(u);let f=new xe(new Kn(34,10,8),new je({visible:!1}));if(f.position.set(r.x,r.y,r.z),f.userData.ti=a,Be.add(f),Ur.push(f),l){let m=new xe(new Za(30,3,8,32),new je({color:16777215}));m.position.set(r.x,r.y,r.z),Be.add(m)}let d=Mo(r.x,r.y),g=new he().setFromPoints([new $(r.x,r.y,r.z),new $(r.x,r.y,d.z+1)]);Be.add(new Tn(g,new tn({color:12568788,transparent:!0,opacity:.8})));let _=new xe(new Ya(10,22,28),new je({color:c,transparent:!0,opacity:.6,side:Sn}));_.position.set(r.x,r.y,d.z+1.5),Be.add(_);let p=r.acao==="passar"?r.z:r.z+(+e.aprox||150);if(r.acao!=="passar"){let m=new he().setFromPoints([new $(r.x,r.y,r.z),new $(r.x,r.y,p)]),S=new Tn(m,new yr({color:c,dashSize:12,gapSize:8}));S.computeLineDistances(),Be.add(S)}i.push(new $(r.x,r.y,p)),xi(Be,`${a+1} \xB7 ${kr[r.acao]}${l?` \xB7 ${Math.round(r.z-d.z)} mm acima`:""}`,[r.x,r.y,p+30],"lbl","#"+c.toString(16).padStart(6,"0"),"ponto")}),i.length>1){let r=new he().setFromPoints(i),a=new Tn(r,new yr({color:16777215,dashSize:20,gapSize:12,transparent:!0,opacity:.7}));a.computeLineDistances(),Be.add(a)}let s=t[Ye];if(s&&B("trGuides").checked){let r=Mo(s.x,s.y).z+1.2,a=Math.round(s.x/50)*50,o=Math.round(s.y/50)*50,c=300,l=[],h=[];for(let _=-c;_<=c;_+=50)((a+_)%100===0?h:l).push(new $(a+_,o-c,r),new $(a+_,o+c,r)),((o+_)%100===0?h:l).push(new $(a-c,o+_,r),new $(a+c,o+_,r));Be.add(new zi(new he().setFromPoints(l),new tn({color:10466504,transparent:!0,opacity:.25}))),Be.add(new zi(new he().setFromPoints(h),new tn({color:13623536,transparent:!0,opacity:.5})));let u=new he().setFromPoints([new $(s.x-260,s.y,s.z),new $(s.x+260,s.y,s.z)]),f=new he().setFromPoints([new $(s.x,s.y-260,s.z),new $(s.x,s.y+260,s.z)]),d=new Tn(u,new tn({color:16736352,depthTest:!1})),g=new Tn(f,new tn({color:5296240,depthTest:!1}));d.renderOrder=g.renderOrder=18,Be.add(d,g),xi(Be,"X+",[s.x+280,s.y,s.z],"lbl ax","#ff6060","ponto"),xi(Be,"Y+",[s.x,s.y+280,s.z],"lbl ax","#50d070","ponto")}So()}function So(){let n=B("trInfo"),t=At(),e=t&&t.trajeto&&t.trajeto[Ye];if(!e||it.pane!=="traj"&&!se){n.style.display="none";return}let i=Mo(e.x,e.y),s=tu(e),r=Math.hypot(e.x,e.y);n.style.display="block",n.innerHTML=`<b>Ponto ${Ye+1} \xB7 ${kr[e.acao]}</b>${se?` <span class="tm">${se.mode==="z"?"arrastando ALTURA":"arrastando POSI\xC7\xC3O"}${se.fine?" \xB7 PRECIS\xC3O":""}</span>`:""}<br>
    X <b>${Math.round(e.x)}</b> \xB7 Y <b>${Math.round(e.y)}</b> \xB7 Z <b>${Math.round(e.z)}</b> mm<br>
    Altura: <b>${Math.round(e.z-i.z)} mm</b> acima de ${Vt(i.nome)}<br>
    Dist\xE2ncia da base do rob\xF4: <b>${Math.round(r)} mm</b><br>
    <span style="color:${s?"#ff7070":"#5fe08f"}">${s?"\u26A0 "+Vt(s):"\u2713 alcan\xE7\xE1vel"}</span>
    <div class="tk">Arraste para mover \xB7 <b>Shift</b> + arrastar: altura \xB7 segure <b>Ctrl</b> para precis\xE3o (5\xD7 mais lento) \xB7 setas: \xB15 mm \xB7 PgUp/PgDn: altura \xB7 F: focar no ponto</div>`}var se=null,eu="xy";function cf(n){let t=be.domElement.getBoundingClientRect();bo.setFromCamera(new St((n.clientX-t.left)/t.width*2-1,-((n.clientY-t.top)/t.height)*2+1),vn),ne.updateMatrixWorld();let e=ne.matrixWorld.clone().invert();return bo.ray.clone().applyMatrix4(e)}function uf(n){if(!Ur.length)return null;let t=be.domElement.getBoundingClientRect(),e=null,i=22;for(let s of Ur){let r=s.position.clone();if(ne.localToWorld(r),r.project(vn),r.z>1)continue;let a=t.left+(r.x+1)/2*t.width,o=t.top+(1-r.y)/2*t.height,c=Math.hypot(a-n.clientX,o-n.clientY);c<i&&(i=c,e=s.userData.ti)}return e}function Vx(n){if(B("trSnap").checked)if(n.acao==="pegar"){let t=null,e=60;for(let i of De)if(i.parent===ne){let s=Math.hypot(i.position.x-n.x,i.position.y-n.y);s<e&&(e=s,t=i)}t&&(n.x=qe(t.position.x),n.y=qe(t.position.y),n.z=qe(t.position.z),n.a=Math.round(t.rotation.z*RL.R2D))}else n.acao==="soltar"&&(n.z=qe(Mo(n.x,n.y).z+30))}bi.addEventListener("pointerdown",n=>{if(it.running||n.button!==0||n.target!==be.domElement)return;let t=uf(n);if(t===null)return;n.stopPropagation(),n.preventDefault(),be.domElement.setPointerCapture(n.pointerId);let e=At().trajeto[t];Ye=t,Cr=null,Fn.enabled=!1,At().trSaved||In("Antes de arrastar pontos do Trajeto");let i=n.shiftKey||eu==="z"?"z":"xy",s;if(i==="xy")s=new Ke(new $(0,0,1),-e.z);else{let a=new $;vn.getWorldDirection(a),ne.updateMatrixWorld(),a.transformDirection(ne.matrixWorld.clone().invert()),a.z=0,a.lengthSq()<1e-6&&a.set(1,0,0),a.normalize(),s=new Ke().setFromNormalAndCoplanarPoint(a,new $(e.x,e.y,e.z))}let r=cf(n).intersectPlane(s,new $);se={i:t,mode:i,plane:s,start:r?r.clone():null,t0:{...e},moved:!1},it.pane==="traj"&&ii(),Ln()},!0);window.addEventListener("pointermove",n=>{if(!se){if(n.target===be.domElement&&!it.running&&Ur.length){let o=performance.now();o-(se&&0||window.__trHov||0)>60&&(window.__trHov=o,be.domElement.style.cursor=uf(n)!==null?"grab":$r?"crosshair":"")}return}let t=cf(n).intersectPlane(se.plane,new $);if(!t||!se.start)return;let e=At().trajeto[se.i],i=n.ctrlKey||n.altKey?.2:1;se.moved=!0;let s=t.clone().sub(se.last||se.start).multiplyScalar(i);se.last=t,se.raw=se.raw||{x:se.t0.x,y:se.t0.y,z:se.t0.z},se.fine=i<1;let r=+B("trStep").value||0,a=o=>r?Math.round(o/r)*r:qe(o);se.mode==="xy"?(se.raw.x+=s.x,se.raw.y+=s.y,e.x=a(se.raw.x),e.y=a(se.raw.y),e.z=se.t0.z,Vx(e)):(se.raw.z=Math.max(0,se.raw.z+s.z),e.z=a(se.raw.z)),be.domElement.style.cursor="grabbing",Ln(),Gx(se.i)});function Gx(n){let t=document.querySelector(`#trList [data-ti="${n}"]`),e=At().trajeto[n];!t||!e||t.querySelectorAll("input[data-tf]").forEach(i=>i.value=qe(e[i.dataset.tf]||0))}window.addEventListener("pointerup",()=>{if(!se)return;let n=se;if(se=null,Fn.enabled=!0,be.domElement.style.cursor="",n.moved){let t=At().trajeto[n.i];Mi(),ee("info",`Ponto T${n.i+1} movido para X ${t.x} Y ${t.y} Z ${t.z}.`)}else ii(),Ln()});document.addEventListener("keydown",n=>{if(it.pane!=="traj"||it.running||Ye<0||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;let t=(At().trajeto||[])[Ye];if(!t)return;let e=n.shiftKey?20:5,i={ArrowUp:["x",e],ArrowDown:["x",-e],ArrowLeft:["y",e],ArrowRight:["y",-e],PageUp:["z",e],PageDown:["z",-e]}[n.key];i&&(n.preventDefault(),t[i[0]]=qe(t[i[0]]+i[1]),clearTimeout(window.__trK),ii(),Ln(),window.__trK=setTimeout(Mi,400))});function nu(n,t){let e=new $(n.x,n.y,n.z);ne.localToWorld(e),Fn.target.copy(e),vn.position.copy(e.clone().add(new $(...t))),Fn.update(),document.querySelectorAll("[data-cam]").forEach(i=>i.classList.remove("on"))}var iu=()=>(At().trajeto||[])[Ye]||(At().trajeto||[])[0];B("trTop").onclick=()=>{let n=iu()||{x:400,y:0,z:150};nu(n,[0,1.3,.001])};B("trSide").onclick=()=>{let n=iu()||{x:400,y:0,z:150},t=new $(n.x,n.y,n.z);ne.localToWorld(t);let e=new $(t.x,0,t.z).normalize();nu(n,[e.z*1.1+e.x*.35,.18,-e.x*1.1+e.z*.35])};B("trFocus").onclick=()=>{let n=iu();if(!n)return Oe("Selecione um ponto");nu(n,[.45,.4,.45])};document.addEventListener("keydown",n=>{it.pane==="traj"&&(n.key==="f"||n.key==="F")&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&B("trFocus").click()});B("trGuides").onchange=()=>Ln();B("trModeXY").onclick=()=>{eu="xy",B("trModeXY").classList.add("on"),B("trModeZ").classList.remove("on")};B("trModeZ").onclick=()=>{eu="z",B("trModeZ").classList.add("on"),B("trModeXY").classList.remove("on")};function Wx(){let n=At();B("revOrig").textContent=n&&n.original?`Original guardado: ${(n.original.files||[]).join(" + ")||"importa\xE7\xE3o"} em ${yi(n.original.date)}.`:"Este projeto n\xE3o tem original importado: a compara\xE7\xE3o usa a primeira vers\xE3o do hist\xF3rico."}B("bRevDiff").onclick=()=>{let n=At(),t=n.original||n.versions[0];rf(n.original?"Original importado \u2192 atual":"Primeira vers\xE3o \u2192 atual",t,n)};B("bRevRestore").onclick=async()=>{let n=At(),t=n.original||n.versions[0];await ti("Restaurar original","Voltar o programa ao original? O estado atual vai para o hist\xF3rico.",[{label:"Cancelar",value:!1},{label:"Restaurar",value:!0,danger:!0}])&&(In("Antes de restaurar o original"),n.src=t.src,n.dat=t.dat,Ze("src"),xn(),oe(),Oe("Original restaurado"))};B("bAnalyze").onclick=()=>su();async function su(){let n=At(),t=B("report");t.innerHTML='<p class="note">Analisando\u2026</p>';let e=RL.parse(n.src,n.dat),i=n.src+`
`+n.dat,s=[...new Set([...n.src.matchAll(/\$IN\s*\[\s*(\d+)\s*\]/gi)].map(m=>+m[1]))].sort((m,S)=>m-S),r=[...new Set([...n.src.matchAll(/\$OUT\s*\[\s*(\d+)\s*\]/gi)].map(m=>+m[1]))].sort((m,S)=>m-S),a=m=>(n.src.match(m)||[]).length,o=`<h3>Estrutura</h3><table class="t rep">
    <tr><td>Linhas (.src / .dat)</td><td>${n.src.split(`
`).length} / ${n.dat.split(`
`).length}</td></tr>
    <tr><td>Subprogramas</td><td>${e.mod&&e.mod.order?e.mod.order.map(m=>Vt(e.mod.defs[m].display)+"()").join(", "):"\u2014"}</td></tr>
    <tr><td>Comandos de movimento</td><td>PTP ${a(/^\s*PTP\b/gim)} \xB7 LIN ${a(/^\s*LIN\b/gim)} \xB7 CIRC ${a(/^\s*CIRC\b/gim)} \xB7 REL ${a(/^\s*(PTP|LIN)_REL\b/gim)}</td></tr>
    <tr><td>Controle de fluxo</td><td>IF ${a(/^\s*IF\b/gim)} \xB7 FOR ${a(/^\s*FOR\b/gim)} \xB7 WHILE ${a(/^\s*WHILE\b/gim)} \xB7 LOOP ${a(/^\s*LOOP\b/gim)} \xB7 SWITCH ${a(/^\s*SWITCH\b/gim)}</td></tr>
    <tr><td>Entradas usadas</td><td>${s.length?s.map(m=>"$IN["+m+"]").join(", "):"nenhuma"}</td></tr>
    <tr><td>Sa\xEDdas usadas</td><td>${r.length?r.map(m=>"$OUT["+m+"]").join(", "):"nenhuma"}</td></tr>
    <tr><td>Formul\xE1rios inline (FOLD)</td><td>${(i.match(/;FOLD/gi)||[]).length}</td></tr></table>`;if(e.errors.length){o+=`<h3>Erros de sintaxe (${e.errors.length})</h3>`+e.errors.map(m=>`<div class="crit no"><b>\u2717</b><div>${m.loc.file}:${m.loc.line} \u2014 ${Vt(m.msg)}</div></div>`).join(""),t.innerHTML=o;return}e.warnings.length&&(o+=`<h3>Instru\xE7\xF5es n\xE3o simuladas ou ignoradas (${e.warnings.length})</h3>`+[...new Map(e.warnings.map(m=>[m.msg,m])).values()].map(m=>`<div class="crit"><b style="color:var(--warn)">!</b><div>${m.loc.file}:${m.loc.line} \u2014 ${Vt(m.msg)}</div></div>`).join(""));let c=Zd(n)||{},l=Hc(c),h=RL.frameToMat(RL.DEFAULT_TOOL);o+=`<h3>Pontos do .dat (${l.length})</h3><table class="t rep">`+l.map(m=>{let S=m.raw,x="";if(S.__t==="E6AXIS"||S.__t==="AXIS"){let T=["A1","A2","A3","A4","A5","A6"].map(L=>S[L]),I=T.findIndex((L,R)=>L<RL.LIMITS[R][0]||L>RL.LIMITS[R][1]);x=I>=0?`<span class="badge err">A${I+1} fora do limite</span>`:RL.checkCollision(T,h)?'<span class="badge err">colis\xE3o</span>':'<span class="badge ok">ok</span>'}else{let T=RL.ik(RL.mul(RL.frameToMat(S),RL.inv(h)),RL.HOME);x=T.ok?RL.checkCollision(T.j,h)?`<span class="badge err">colis\xE3o: ${Vt(RL.checkCollision(T.j,h).obstacle.nome)}</span>`:T.singular?'<span class="badge warn">singularidade</span>':'<span class="badge ok">alcan\xE7\xE1vel</span>':`<span class="badge err">${Vt(T.reason)}</span>`}return`<tr><td>${Vt(m.name)}</td><td>X ${ze(m.pos[0])} Y ${ze(m.pos[1])} Z ${ze(m.pos[2])} ${x}</td></tr>`}).join("")+"</table>";let u=RL.HOME.slice(),f=[],d=[],g=new RL.Machine(e,{dry:!0,maxStmts:2e4,log:(m,S,x)=>d.push({l:m,msg:S,loc:x}),line(){},status(){},getJoints:()=>u,setJoints:m=>{u=m.slice()},getIn:()=>!1,output(){},getOverride:()=>100,setOverride(){},moved:(m,S,x)=>f.push({label:m,pos:S,cut:x}),animate:async()=>{}}),_=await g.run(),p=d.filter(m=>m.l==="err");o+=`<h3>Execu\xE7\xE3o simulada (sem anima\xE7\xE3o)</h3><table class="t rep">
    <tr><td>Resultado</td><td>${_==="done"?'<span class="badge ok">conclu\xEDdo</span>':'<span class="badge err">parou com erro</span>'}</td></tr>
    <tr><td>Movimentos executados</td><td>${g.motions||0}</td></tr>
    <tr><td>Tempo de ciclo estimado</td><td>${(g.totalTime||0).toFixed(1)} s (override 100%, aproximado)</td></tr></table>`,p.length&&(o+=p.map(m=>`<div class="crit no"><b>\u2717</b><div>${m.loc?`${m.loc.file}:${m.loc.line} \u2014 `:""}${Vt(m.msg)}</div></div>`).join("")),d.filter(m=>m.l==="warn"||m.l==="info"&&/Análise/.test(m.msg)).slice(0,12).forEach(m=>o+=`<div class="crit"><b style="color:var(--warn)">!</b><div>${m.loc?`${m.loc.file}:${m.loc.line} \u2014 `:""}${Vt(m.msg)}</div></div>`),f.length&&(o+=`<h3>Sequ\xEAncia de movimentos reconstru\xEDda${f.length>80?" (primeiros 80)":""}</h3><table class="t rep">`+f.slice(0,80).map((m,S)=>`<tr><td>${S+1}. ${Vt(m.label.trim())}</td><td>X ${ze(m.pos.X)} Y ${ze(m.pos.Y)} Z ${ze(m.pos.Z)}${m.cut?' <span class="badge err">colis\xE3o</span>':""}</td></tr>`).join("")+"</table>"),o+='<div class="row" style="margin-top:10px"><button class="pri" id="repRun">\u25B6 Executar com anima\xE7\xE3o</button><button id="repAsk">Pedir explica\xE7\xE3o ao Professor</button></div>',t.innerHTML=o,B("repRun").onclick=()=>{ns(!0),ni(!1)},B("repAsk").onclick=()=>{_e("ia"),Uo("Analise o programa aberto como engenharia reversa: explique o que ele faz passo a passo, aponte riscos e sugira melhorias.")},ee(_==="done"?"ok":"warn",`An\xE1lise conclu\xEDda: ${g.motions||0} movimentos, ~${(g.totalTime||0).toFixed(1)} s, ${p.length} erro(s).`)}var $x=["Explique o programa aberto","Por que meu rob\xF4 n\xE3o chegou \xE0 posi\xE7\xE3o programada?","Qual a diferen\xE7a entre PTP e LIN?","Como criar um programa de paletiza\xE7\xE3o?","Como corrigir uma singularidade?","Crie um exerc\xEDcio para eu praticar"];B("quick").innerHTML=$x.map(n=>`<button data-q="${Vt(n)}">${Vt(n)}</button>`).join("");B("quick").onclick=n=>{n.target.dataset.q&&Uo(n.target.dataset.q)};B("bChatSend").onclick=()=>{let n=B("chatIn").value.trim();n&&(B("chatIn").value="",Uo(n))};B("chatIn").addEventListener("keydown",n=>{n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),B("bChatSend").click())});B("bChatClear").onclick=()=>{it.chat=[],Pr()};function Xx(n){let t=n.split(/```(\w*)\n?([\s\S]*?)```/g),e="";for(let i=0;i<t.length;i+=3)if(e+=Vt(t[i]).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`([^`\n]+)`/g,"<code>$1</code>"),i+2<t.length){let s=t[i+2],r=/^\s*(GLOBAL\s+)?DEF\s/im.test(s)?"src":/^\s*DEFDAT\s/im.test(s)?"dat":null;e+=`<pre>${Vt(s)}</pre>`+(r?`<button class="sm" data-load="${r}" data-code="${encodeURIComponent(s)}">Carregar no .${r}</button> `:"")}return e}function Pr(){let n=B("chat");it.chat.length?n.innerHTML=it.chat.map(t=>`<div class="msg ${t.role==="user"?"u":"a"}">${t.role==="user"?Vt(t.content):Xx(t.content)}</div>`).join(""):n.innerHTML=`<div class="msg a">Ol\xE1! Sou o professor de rob\xF3tica do Korum. Analiso o programa aberto, explico comandos KRL, ajudo a corrigir erros e crio exemplos que voc\xEA pode carregar e executar no simulador.${Pt.settings.apiKey?"":`

Para respostas completas, coloque sua chave da API da Anthropic em Ajustes. Sem ela, respondo com o gloss\xE1rio de comandos embutido.`}</div>`,n.scrollTop=n.scrollHeight}B("chat").onclick=n=>{let t=n.target;if(!t.dataset.load)return;let e=At(),i=decodeURIComponent(t.dataset.code);In("Antes de carregar c\xF3digo do Professor"),e[t.dataset.load]=i.replace(/\r\n/g,`
`).trim(),Ze(t.dataset.load),Qi(),xn(),oe(),_e("prog"),ee("info",`C\xF3digo do Professor carregado no .${t.dataset.load}. Clique em Verificar e Executar.`)};var fo={PTP:"PTP (ponto a ponto): todos os eixos partem e chegam juntos pelo caminho mais r\xE1pido para os motores. A ferramenta faz uma curva no espa\xE7o. Use longe de pe\xE7as e obst\xE1culos. Ex.: PTP P1",LIN:"LIN (linear): o TCP segue uma linha reta at\xE9 o destino, com velocidade $VEL.CP (m/s). Use para aproximar e afastar de pe\xE7as. Ex.: LIN P2",CIRC:"CIRC aux, fim: arco de c\xEDrculo passando pelo ponto auxiliar at\xE9 o ponto final. Dois CIRC de 180\xB0 fazem um c\xEDrculo completo.",LIN_REL:"LIN_REL {Z 50}: move em linha reta somando o deslocamento \xE0 posi\xE7\xE3o atual (na BASE; com #TOOL, na dire\xE7\xE3o da ferramenta).",PTP_REL:"PTP_REL {A1 30}: soma \xE2ngulos aos eixos atuais (ou deslocamento cartesiano, se usar X, Y, Z).",INI:"INI: carrega velocidades e acelera\xE7\xF5es padr\xE3o. Deve vir no in\xEDcio do programa.",DECL:"DECL tipo nome: declara vari\xE1vel. Tipos: INT, REAL, BOOL, E6POS (ponto cartesiano), E6AXIS (ponto de eixos), FRAME. Ex.: DECL E6POS P1 = {X 500, Y 0, Z 400, A 0, B 90, C 0}",E6POS:"E6POS: ponto cartesiano com X, Y, Z (mm) e A, B, C (graus, rota\xE7\xF5es em Z, Y, X). S e T escolhem a configura\xE7\xE3o no controlador real.",E6AXIS:"E6AXIS: posi\xE7\xE3o dada pelos \xE2ngulos A1 a A6. HOME \xE9 um E6AXIS.",$TOOL:"$TOOL: sistema da ferramenta ativa (posi\xE7\xE3o do TCP em rela\xE7\xE3o ao flange). Um ponto ensinado com uma ferramenta s\xF3 \xE9 atingido corretamente com a mesma ferramenta ativa.",$BASE:"$BASE: sistema de coordenadas da pe\xE7a/mesa. Mudar a base desloca todos os pontos cartesianos programados juntos.",$OUT:"$OUT[n] = TRUE/FALSE liga e desliga sa\xEDdas digitais. No Korum, $OUT[1] comanda a garra.",$IN:"$IN[n] l\xEA entradas digitais (sensores, bot\xF5es, sinais do CLP). Use WAIT FOR $IN[1] para esperar.",WAIT:"WAIT SEC t espera t segundos. WAIT FOR condi\xE7\xE3o espera a condi\xE7\xE3o ficar verdadeira.",LOOP:"LOOP ... ENDLOOP repete para sempre. Saia com EXIT.",FOR:"FOR i = 1 TO n [STEP s] ... ENDFOR repete com contador (declare DECL INT i).",IF:"IF condi\xE7\xE3o THEN ... ELSE ... ENDIF. Em KRL, use par\xEAnteses em compara\xE7\xF5es combinadas: (a > 1) AND (b < 2).",SINGULARIDADE:"Singularidade de punho: com A5 \u2248 0\xB0, A4 e A6 ficam alinhados e um pequeno movimento LIN exige giros enormes. Incline a ferramenta (ex.: B 85), use PTP para passar pela regi\xE3o ou mude a posi\xE7\xE3o da pe\xE7a.",HOME:"HOME = {A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}: posi\xE7\xE3o segura de in\xEDcio e fim de ciclo.",OVERRIDE:"Override ($OV_PRO): percentual aplicado a todas as velocidades pelo operador. Teste programas novos com override baixo.",INTERRUPT:"INTERRUPT DECL n WHEN condi\xE7\xE3o DO sub() declara uma interrup\xE7\xE3o; INTERRUPT ON n ativa.",TCP:"TCP (Tool Center Point): ponto de trabalho da ferramenta. As posi\xE7\xF5es cartesianas descrevem onde est\xE1 o TCP.",ALCANCE:"Ponto inalcan\xE7\xE1vel: o destino est\xE1 fora do alcance do bra\xE7o ou exige um eixo al\xE9m do limite. Aproxime o ponto da base, reduza a altura ou mude a orienta\xE7\xE3o.",COLISAO:"Colis\xE3o: alguma parte do rob\xF4 ou da ferramenta entraria em um objeto. Suba o ponto (Z maior), crie um ponto de aproxima\xE7\xE3o ou altere o cen\xE1rio."};function Fd(n){let t=n.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g,""),e=Object.entries(fo).filter(([s])=>new RegExp(`(^|[^A-Z_$])${s.replace("$","\\$")}([^A-Z_]|$)`).test(t)),i="";if(/ERRO|NAO CHEGOU|PROBLEMA|FALHA/.test(t)){let s=it.logTail.filter(r=>/^ERRO/.test(r)).slice(-3);i+=s.length?`\xDAltimos erros do console:
${s.join(`
`)}

`:`N\xE3o h\xE1 erros recentes no console.

`,s.some(r=>/alcance/i.test(r))&&e.push(["",fo.ALCANCE]),s.some(r=>/COLIS/i.test(r))&&e.push(["",fo.COLISAO]),s.some(r=>/singular/i.test(r))&&e.push(["",fo.SINGULARIDADE])}return/EXPLIQUE O PROGRAMA|ANALISE O PROGRAMA/.test(t)&&(i+=`Use a aba An\xE1lise: ela lista subprogramas, pontos (alcan\xE7\xE1veis ou n\xE3o), E/S e a sequ\xEAncia de movimentos.

`),i+=e.length?e.map(s=>"\u2022 "+s[1]).join(`

`):"N\xE3o encontrei esse assunto no gloss\xE1rio embutido. Tente palavras como PTP, LIN, CIRC, $TOOL, $BASE, WAIT, FOR, singularidade.",i+`

(Resposta do gloss\xE1rio offline. Configure a chave da API em Ajustes para respostas completas do Professor.)`}function jx(){let n=At(),t=Vr();return`CONTEXTO DO KORUM (gerado automaticamente)
Projeto: ${n.name} (categoria ${n.cat})
Cen\xE1rio: ${n.scene.objetos.map(e=>`${e.nome} [${e.tipo}] centro X${e.x} Y${e.y}, ${e.w}x${e.d}, altura ${e.h}`).join("; ")||"vazio"}; pe\xE7as (cubos 50 mm): ${n.scene.pecas.map(e=>`(${e[0]}, ${e[1]})`).join(" ")||"nenhuma"}
Rob\xF4: 6 eixos did\xE1tico; HOME {A1 0,A2 -90,A3 90,A4 0,A5 0,A6 0}; limites A1\xB1170 A2 -190..45 A3 -120..156 A4\xB1185 A5\xB1120 A6\xB1350; garra em $OUT[1] (TRUE fecha), TCP a 110 mm do flange.
Eixos atuais: ${it.joints.map((e,i)=>`A${i+1} ${e.toFixed(1)}`).join(" ")} | TCP: X ${t.X.toFixed(1)} Y ${t.Y.toFixed(1)} Z ${t.Z.toFixed(1)} A ${t.A.toFixed(1)} B ${t.B.toFixed(1)} C ${t.C.toFixed(1)}
\xDAltimas mensagens do console:
${it.logTail.slice(-12).join(`
`)||"(nenhuma)"}
--- ${un(n.src)}.src ---
${n.src.slice(0,12e3)}
--- ${un(n.src)}.dat ---
${n.dat.slice(0,6e3)}`}var qx=`Voc\xEA \xE9 o Professor de Rob\xF3tica do Korum, um laborat\xF3rio virtual de rob\xF3tica industrial para t\xE9cnicos e engenheiros brasileiros. Responda sempre em portugu\xEAs do Brasil, com linguagem t\xE9cnica e did\xE1tica, direto ao ponto.
Voc\xEA ensina programa\xE7\xE3o KRL de rob\xF4s industriais de 6 eixos, cinem\xE1tica, singularidades, diagn\xF3stico e boas pr\xE1ticas de seguran\xE7a.
O simulador do Korum interpreta este subconjunto de KRL: DEF/END (com par\xE2metros), DEFDAT/ENDDAT, DECL (INT, REAL, BOOL, E6POS, POS, FRAME, E6AXIS, AXIS, vetores), INI, PTP, LIN, CIRC aux,fim, PTP_REL, LIN_REL (BASE ou #TOOL), IF/ELSE/ENDIF, FOR/ENDFOR, WHILE, REPEAT/UNTIL, LOOP/ENDLOOP, SWITCH/CASE, EXIT, RETURN, WAIT SEC, WAIT FOR, HALT, INTERRUPT DECL/ON/OFF, $IN[n], $OUT[n], $VEL.CP (m/s), $VEL_AXIS[n] (%), $OV_PRO, $BASE, $TOOL, $POS_ACT, $AXIS_ACT, $NULLFRAME, BAS(#INITMOV/#PTP_PARAMS/#CP_PARAMS), SIN COS TAN ACOS ATAN2 SQRT ABS. Aproxima\xE7\xF5es C_PTP/C_DIS s\xE3o aceitas mas o rob\xF4 para em cada ponto. SPLINE, TRIGGER, GOTO e DEFFCT n\xE3o s\xE3o executados. Em KRL, AND/OR t\xEAm prioridade maior que compara\xE7\xF5es: use par\xEAnteses.
Conven\xE7\xF5es: mm e graus; X para a frente, Z para cima; A,B,C = rota\xE7\xF5es Z,Y,X; ferramenta apontando para baixo = B 90. Pe\xE7as s\xE3o cubos de 50 mm (centro a 25 mm acima da superf\xEDcie). Pegar: TCP a menos de 30 mm do centro da pe\xE7a e $OUT[1] = TRUE.
Quando escrever um programa, entregue o .src e o .dat em blocos de c\xF3digo separados (\`\`\`krl), com DEF e DEFDAT de mesmo nome, para o aluno carregar e executar no simulador. Use apenas o subconjunto suportado. Verifique alcance (at\xE9 ~950 mm do ombro, que fica em Z 400) e colis\xF5es com o cen\xE1rio informado.
Quando houver diferen\xE7a entre o simulador e controladores reais (KSS, iiQKA.OS2 ou outros), diga claramente. Nunca afirme que a simula\xE7\xE3o garante seguran\xE7a em um rob\xF4 real. Se n\xE3o tiver certeza sobre um detalhe de um controlador espec\xEDfico, diga que \xE9 preciso conferir na documenta\xE7\xE3o oficial do fabricante.`;async function Uo(n){if(it.chat.push({role:"user",content:n}),Pr(),!Pt.settings.apiKey){it.chat.push({role:"assistant",content:Fd(n)}),Pr();return}let t=B("chat"),e=document.createElement("div");e.className="msg a",e.textContent="Pensando\u2026",t.appendChild(e),t.scrollTop=t.scrollHeight,B("bChatSend").disabled=!0;let i=it.chat.slice(-12).map((r,a,o)=>({role:r.role,content:a===o.length-1?jx()+`

PERGUNTA DO ALUNO:
`+r.content:r.content})),s=await Un.ai({apiKey:Pt.settings.apiKey,model:Pt.settings.model||Eo,system:qx,messages:i});B("bChatSend").disabled=!1,it.chat.push({role:"assistant",content:s.error?`N\xE3o consegui falar com a API: ${s.error}

Confira a chave e o nome do modelo em Ajustes.

`+Fd(n):s.text}),Pr()}function ru(n){document.documentElement.dataset.theme=n,_x(n)}B("bTheme").onclick=()=>{Pt.settings.theme=Pt.settings.theme==="claro"?"escuro":"claro",ru(Pt.settings.theme),oe(),it.pane==="config"&&au()};function au(){B("cfgTheme").value=Pt.settings.theme,B("cfgKey").value=Pt.settings.apiKey||"",B("cfgModel").value=Pt.settings.model||Eo,B("cfgDir").textContent=Pt.settings.backupDir||"(Documentos)",B("about").innerHTML=`Korum ${Vt(mo)} \u2014 laborat\xF3rio virtual de rob\xF3tica industrial. Interpretador KRL, cinem\xE1tica e cen\xE1rios pr\xF3prios; o modelo do rob\xF4 usa dimens\xF5es did\xE1ticas. N\xE3o envia comandos a rob\xF4s reais. KRL \xE9 a linguagem dos rob\xF4s KUKA; o Korum n\xE3o \xE9 afiliado a nenhum fabricante.`}B("cfgTheme").onchange=()=>{Pt.settings.theme=B("cfgTheme").value,ru(Pt.settings.theme),oe()};B("cfgKey").onchange=()=>{Pt.settings.apiKey=B("cfgKey").value.trim(),oe(),Oe("Chave salva neste computador")};B("cfgModel").onchange=()=>{Pt.settings.model=B("cfgModel").value.trim()||Eo,oe()};B("bCfgDir").onclick=async()=>{let n=await Un.chooseDir();n?(Pt.settings.backupDir=n,oe(),au(),Jc()):on||Oe("Dispon\xEDvel no aplicativo instalado")};B("bOpenData").onclick=()=>Un.openData();var Yx=[[/fora do alcance/i,"o rob\xF4 n\xE3o alcan\xE7a esse ponto. Use X e Y menores (mais perto da base do rob\xF4) ou uma altura Z menor."],[/limite do eixo|fora do limite/i,"um dos eixos chegaria ao fim de curso. Tente um ponto mais \xE0 frente do rob\xF4 (X positivo)."],[/COLIS/i,"alguma parte do rob\xF4 bateria num objeto. Suba o ponto (Z maior) ou crie antes um ponto de aproxima\xE7\xE3o acima do objeto."],[/não declarad/i,"todo ponto ou vari\xE1vel precisa existir antes de ser usado. Crie no arquivo .dat com DECL ou use o bot\xE3o \u2295 Ponto para gravar a posi\xE7\xE3o atual."],[/singularidade/i,'o punho do rob\xF4 ficou numa posi\xE7\xE3o "esticada" dif\xEDcil. Troque o LIN por PTP ou incline um pouco a ferramenta (B 85 em vez de B 90).'],[/esperado|inesperado|não reconhecida|fora de lugar|sem THEN|sintaxe/i,"parece um erro de digita\xE7\xE3o na linha indicada (clique no link src:N para ir at\xE9 ela). Compare com os exemplos: um comando por linha e cada IF/FOR/LOOP fechado com ENDIF/ENDFOR/ENDLOOP."],[/Aguardando condição/i,"o programa est\xE1 esperando um sinal. Clique no bot\xE3o IN indicado no painel da direita (Entradas $IN)."],[/Verificação: \d+ erro/i,"o programa tem erro de escrita e n\xE3o foi executado. A linha com problema fica vermelha no editor."]];function Fr(n,t){Pt.settings.nivel=n,document.body.classList.toggle("beginner",n==="iniciante"),document.querySelectorAll("#nivelSw button").forEach(i=>i.classList.toggle("on",i.dataset.n===n)),ef(),n==="iniciante"&&["projetos","cena","analise","kcp"].includes(it.pane)&&_e("inicio"),n!=="iniciante"&&it.pane==="inicio"&&_e("prog"),t||(oe(),Oe(n==="iniciante"?"Modo Iniciante: tela simplificada e roteiro guiado":"Modo Profissional: todas as ferramentas"))}document.querySelectorAll("#nivelSw button").forEach(n=>n.onclick=()=>{Fr(n.dataset.n),n.dataset.n==="iniciante"&&_e("inicio")});document.querySelectorAll("[data-nv]").forEach(n=>n.onclick=()=>{B("mNivel").classList.remove("on"),Fr(n.dataset.nv),_e(n.dataset.nv==="iniciante"?"inicio":"prog")});var hf=n=>(n.match(/^\s*DECL\s/gim)||[]).length,Ac=n=>it.lastRun&&it.lastRun.r==="done"&&it.lastRun.t>n.t0,_i=[{t:"Conhe\xE7a o simulador",p:"Este \xE9 um rob\xF4 industrial de 6 eixos, com uma mesa e uma esteira. <b>Arraste o mouse</b> sobre a imagem 3D para girar a vista e use a <b>roda do mouse</b> para aproximar ou afastar.",where:"#view",check:()=>it.camMoved},{t:"Mova um eixo",p:"No painel da direita, arraste o controle <b>A1</b>. \xC9 a base do rob\xF4 girando. Cada controle de A1 a A6 move uma junta do bra\xE7o, como o ombro, o cotovelo e o punho de um bra\xE7o humano.",where:"#axes",check:()=>Math.abs(it.joints[0])>20},{t:"Volte para HOME",p:"Clique em <b>HOME</b>, acima dos controles. HOME \xE9 a posi\xE7\xE3o segura de onde todo programa come\xE7a e onde termina.",where:"#bHome",check:()=>it.joints.every((n,t)=>Math.abs(n-RL.HOME[t])<.5)},{t:"Abra seu primeiro programa",p:"Um programa de rob\xF4 \xE9 uma lista de comandos, um por linha, lidos de cima para baixo. Clique no bot\xE3o abaixo para abrir o exemplo <b>Movimentos b\xE1sicos</b>.",btn:["Abrir o exemplo",()=>{Gs(EXAMPLES.find(n=>n.id==="basico")),_e("inicio")}],check:()=>At()&&/^basico$/i.test(un(At().src))},{t:"Execute o programa",p:"Clique em <b>\u25B6 Executar</b> no topo da tela. A linha em execu\xE7\xE3o fica destacada no editor e o rob\xF4 cumpre cada comando:<br>\u2022 <b>PTP</b> leva o rob\xF4 pelo caminho mais f\xE1cil para os motores (faz uma curva);<br>\u2022 <b>LIN</b> leva a garra em linha reta.<br>A linha laranja no 3D mostra o caminho percorrido.",where:"#bRun",check:n=>Ac(n)},{t:"Mude um ponto",p:"Os pontos ficam no segundo arquivo, o <b>.dat</b>. Abra <b>Programa</b> na barra da esquerda, clique na aba <b>basico.dat</b> e, na linha do ponto <b>P1</b>, troque <code>Y 300</code> por <code>Y 150</code>. Depois clique em <b>\u25B6 Executar</b> de novo e veja o rob\xF4 ir a outro lugar.",where:"#tabDat",check:n=>At()&&/^basico$/i.test(un(At().src))&&!/P1\s*=\s*\{X 450, Y 300,/.test(At().dat)&&Ac(n)},{t:"Ensine um ponto (teach)",p:"Assim os t\xE9cnicos programam na f\xE1brica: movem o rob\xF4 at\xE9 o lugar certo e gravam a posi\xE7\xE3o.<br>1. Use os bot\xF5es <b>X+</b>, <b>Y+</b> e <b>Z\u2212</b> no painel da direita para mover a garra.<br>2. Abra <b>Programa</b> e clique em <b>\u2295 Ponto</b>.<br>O Korum grava a posi\xE7\xE3o no .dat e escreve <code>PTP P1</code> no programa.",where:"#jog",check:n=>At()&&hf(At().dat)>n.decl0},{t:"Programe com blocos",p:"Abra <b>Blocos</b> na barra da esquerda e clique em <b>+ Fechar garra</b> ou <b>+ Aguardar</b>. Os blocos montam o programa sem voc\xEA digitar, e o c\xF3digo KRL \xE9 gerado sozinho na aba Programa.",where:"[data-p=blocos]",check:n=>At()&&At().blocks&&At().blocks.length>n.blk0&&At().blocks.length>0},{t:"Pegue uma pe\xE7a",p:"Agora um trabalho de verdade: o rob\xF4 pega a pe\xE7a azul da mesa e coloca na esteira. Abra o exemplo e clique em <b>\u25B6 Executar</b>. Repare na linha <code>$OUT[1] = TRUE</code>: \xE9 ela que fecha a garra.",btn:["Abrir o exemplo Pick and place",()=>{Gs(EXAMPLES.find(n=>n.id==="pick")),_e("inicio")}],check:n=>At()&&/^pick_place$/i.test(un(At().src))&&Ac(n)},{t:"Seu primeiro exerc\xEDcio",p:"Abra <b>Exerc\xEDcios</b> na barra da esquerda e fa\xE7a o <b>Primeiro movimento</b>. O Korum executa o seu programa, confere cada item e d\xE1 a nota. Se travar, pergunte ao <b>Professor</b>.",where:"[data-p=exerc]",check:()=>(Pt.progress.exercises.x1||{}).best===100}];function ou(){Pt.progress.tour||(Pt.progress.tour={i:0,ctx:null});let n=Pt.progress.tour;return n.ctx||(n.ctx=df()),n}function df(){let n=At();return{t0:Date.now(),decl0:n?hf(n.dat):0,blk0:n&&n.blocks?n.blocks.length:0}}function po(n){let t=ou();t.i=Math.max(0,Math.min(_i.length,n)),t.ctx=df(),oe(),ff()}function ff(){let n=ou(),t=B("tour");B("tourProg").textContent=`${Math.min(n.i,_i.length)}/${_i.length}`,document.querySelectorAll(".hilite").forEach(s=>s.classList.remove("hilite"));let e=`<p class="note">Miss\xF5es curtas para aprender o b\xE1sico. Cada uma \xE9 conferida sozinha: fa\xE7a o que o cart\xE3o pede e ele avan\xE7a.</p><div class="bar" style="margin:8px 0 12px"><i style="width:${Math.round(100*n.i/_i.length)}%"></i></div>`;n.i>=_i.length&&(e+=`<div class="mission cur"><h4><span class="n">\u2713</span>Parab\xE9ns, voc\xEA concluiu os primeiros passos!</h4><p>Agora voc\xEA j\xE1 sabe mover o rob\xF4, ler e executar um programa, mudar e ensinar pontos, usar blocos e pegar pe\xE7as.</p><p>Pr\xF3ximos passos: a trilha de <b>Cursos</b> (comece pelo N\xEDvel 2), os outros <b>Exerc\xEDcios</b> e, quando se sentir seguro, o modo <b>Profissional</b>, com cen\xE1rios, modo painel do rob\xF4 e an\xE1lise de programas.</p>
    <div class="row"><button class="pri" id="tCur">Abrir Cursos</button><button id="tPro">Mudar para Profissional</button><button id="tAgain">Recome\xE7ar roteiro</button></div></div>`),_i.forEach((s,r)=>{let a=r<n.i?"done":r===n.i?"cur":"";a==="cur"?e+=`<div class="mission cur"><h4><span class="n">${r+1}</span>${s.t}</h4><p>${s.p}</p>${s.btn?`<div class="row"><button class="pri" id="tBtn">${s.btn[0]}</button></div>`:""}<div class="row" style="margin-top:10px"><span class="note" style="margin:0;flex:1">\u23F3 Esperando voc\xEA fazer a miss\xE3o\u2026</span>${r>0?'<button class="sm" id="tBack">\u2190 Voltar</button>':""}<button class="sm" id="tSkip">Pular</button></div></div>`:e+=`<div class="mission ${a}"><h4><span class="n">${a==="done"?"\u2713":r+1}</span>${s.t}</h4></div>`}),t.innerHTML=e;let i=_i[n.i];i&&i.btn&&(B("tBtn").onclick=i.btn[1]),B("tBack")&&(B("tBack").onclick=()=>po(n.i-1)),B("tSkip")&&(B("tSkip").onclick=()=>po(n.i+1)),B("tCur")&&(B("tCur").onclick=()=>_e("cursos"),B("tPro").onclick=()=>{Fr("profissional"),_e("prog")},B("tAgain").onclick=()=>po(0)),i&&i.where&&document.querySelectorAll(i.where).forEach(s=>s.classList.add("hilite"))}setInterval(()=>{if(Pt.settings.nivel!=="iniciante"){document.querySelectorAll(".hilite").forEach(i=>i.classList.remove("hilite"));return}let n=ou(),t=_i[n.i];if(!t)return;let e=!1;try{e=!!t.check(n.ctx)}catch{}e&&(Oe(`\u2713 Miss\xE3o conclu\xEDda: ${t.t}`),ee("ok",`Miss\xE3o ${n.i+1} conclu\xEDda: ${t.t}`),po(n.i+1),it.pane!=="inicio"&&document.querySelector("[data-p=inicio]").classList.add("hilite"))},600);document.querySelectorAll(".rz").forEach(n=>n.addEventListener("pointerdown",t=>{t.preventDefault(),n.classList.add("drag"),n.setPointerCapture(t.pointerId);let e=n.dataset.rz,i=document.documentElement,s=a=>{e==="left"&&i.style.setProperty("--left",Math.max(280,Math.min(900,a.clientX-54))+"px"),e==="right"&&i.style.setProperty("--right",Math.max(240,Math.min(600,innerWidth-a.clientX))+"px"),e==="bottom"&&i.style.setProperty("--bottom",Math.max(70,Math.min(innerHeight-200,innerHeight-a.clientY))+"px")},r=()=>{n.classList.remove("drag"),n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",r)};n.addEventListener("pointermove",s),n.addEventListener("pointerup",r)}));(async()=>{try{let n=await Un.load();if(n){let t=JSON.parse(n);t&&Array.isArray(t.projects)&&(Pt=Object.assign(Pt,t,{settings:Object.assign(Pt.settings,t.settings||{}),progress:Object.assign({lessons:{},exercises:{}},t.progress||{})}))}}catch(n){ee("err","N\xE3o foi poss\xEDvel ler os dados salvos: "+n.message)}if(!Pt.projects.length){let n=EXAMPLES[0];Ki({name:"Exemplo: "+n.title,cat:n.cat,src:n.src,dat:n.dat,scene:SCENES.pick})}At()||(Pt.currentId=Pt.projects[0].id),ru(Pt.settings.theme||"escuro"),yo(RL.DEFAULT_TOOL),tf("iso"),Gr(),Pn(Pt.currentId),Jc(),vi("idle"),Pt.settings.nivel?(Fr(Pt.settings.nivel,!0),Pt.settings.nivel==="iniciante"&&_e("inicio")):(Fr("profissional",!0),B("mNivel").classList.add("on")),ee("info",`Korum ${mo} pronto. ${Pt.projects.length} projeto(s) na biblioteca. F5 executa, F10 executa passo a passo, Ctrl+S salva uma vers\xE3o.`),Ld({S:it,store:Pt,cur:At,RL,$:B,esc:Vt,hlLine:Hd,log:ee,toast:Oe,ask:ti,askText:qc,openProject:Pn,newProject:Ki,runProgram:ni,setJoints:Ji,quickMove:Gc,setOut:Jd,resetCell:ns,curPos:Vr,tcpWorld:Hr,parts:()=>De.map(xo),partsRaw:()=>De,progName:un,markDirty:oe,persist:Br,saveVersion:In,previewPoints:xn,makeZip:Zc,platform:Un,stamp:Kc,safe:Yc,showPane:_e,setFile:Ze,updateNames:Qi,check:Oo,EXAMPLES,SCENES,applyScene:Po,openExample:Gs,flashObstacle:Wc,showHelp:()=>B("mHelp").classList.add("on"),APP_VERSION:mo}),window.__korum={scr:(n,t,e)=>{let i=new $(n,t,e);ne.localToWorld(i),i.project(vn);let s=be.domElement.getBoundingClientRect();return[s.left+(i.x+1)/2*s.width,s.top+(1-i.y)/2*s.height]},S:it,store:Pt,runProgram:ni,analyze:su,evaluate:n=>of(EXERCISES.find(t=>t.id===n)),startExercise:n=>Oc(EXERCISES.find(t=>t.id===n),!0),cur:At,showPane:_e,parts:()=>De.map(xo),sendChat:Uo,krlToBlocks:jc,blocksToKrl:$c,openExample:Gs}})();})();
