(()=>{var yd=Object.create;var Ec=Object.defineProperty;var bd=Object.getOwnPropertyDescriptor;var Sd=Object.getOwnPropertyNames;var Md=Object.getPrototypeOf,Ed=Object.prototype.hasOwnProperty;var Rs=(i=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(i,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):i)(function(i){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+i+'" is not supported')});var wd=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var Td=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Sd(t))!Ed.call(i,s)&&s!==e&&Ec(i,s,{get:()=>t[s],enumerable:!(n=bd(t,s))||n.enumerable});return i};var Ad=(i,t,e)=>(e=i!=null?yd(Md(i)):{},Td(t||!i||!i.__esModule?Ec(e,"default",{value:i,enumerable:!0}):e,i));var Bu=wd((ku,Hl)=>{(function(i){typeof ku=="object"&&typeof Hl<"u"?Hl.exports=i():typeof define=="function"&&define.amd?define([],i):(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:this).JSZip=i()})(function(){return function i(t,e,n){function s(o,l){if(!e[o]){if(!t[o]){var c=typeof Rs=="function"&&Rs;if(!l&&c)return c(o,!0);if(r)return r(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var u=e[o]={exports:{}};t[o][0].call(u.exports,function(p){var d=t[o][1][p];return s(d||p)},u,u.exports,i,t,e,n)}return e[o].exports}for(var r=typeof Rs=="function"&&Rs,a=0;a<n.length;a++)s(n[a]);return s}({1:[function(i,t,e){"use strict";var n=i("./utils"),s=i("./support"),r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";e.encode=function(a){for(var o,l,c,h,u,p,d,g=[],v=0,m=a.length,f=m,M=n.getTypeOf(a)!=="string";v<a.length;)f=m-v,c=M?(o=a[v++],l=v<m?a[v++]:0,v<m?a[v++]:0):(o=a.charCodeAt(v++),l=v<m?a.charCodeAt(v++):0,v<m?a.charCodeAt(v++):0),h=o>>2,u=(3&o)<<4|l>>4,p=1<f?(15&l)<<2|c>>6:64,d=2<f?63&c:64,g.push(r.charAt(h)+r.charAt(u)+r.charAt(p)+r.charAt(d));return g.join("")},e.decode=function(a){var o,l,c,h,u,p,d=0,g=0,v="data:";if(a.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var m,f=3*(a=a.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(a.charAt(a.length-1)===r.charAt(64)&&f--,a.charAt(a.length-2)===r.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(m=s.uint8array?new Uint8Array(0|f):new Array(0|f);d<a.length;)o=r.indexOf(a.charAt(d++))<<2|(h=r.indexOf(a.charAt(d++)))>>4,l=(15&h)<<4|(u=r.indexOf(a.charAt(d++)))>>2,c=(3&u)<<6|(p=r.indexOf(a.charAt(d++))),m[g++]=o,u!==64&&(m[g++]=l),p!==64&&(m[g++]=c);return m}},{"./support":30,"./utils":32}],2:[function(i,t,e){"use strict";var n=i("./external"),s=i("./stream/DataWorker"),r=i("./stream/Crc32Probe"),a=i("./stream/DataLengthProbe");function o(l,c,h,u,p){this.compressedSize=l,this.uncompressedSize=c,this.crc32=h,this.compression=u,this.compressedContent=p}o.prototype={getContentWorker:function(){var l=new s(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),c=this;return l.on("end",function(){if(this.streamInfo.data_length!==c.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),l},getCompressedWorker:function(){return new s(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(l,c,h){return l.pipe(new r).pipe(new a("uncompressedSize")).pipe(c.compressWorker(h)).pipe(new a("compressedSize")).withStreamInfo("compression",c)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(i,t,e){"use strict";var n=i("./stream/GenericWorker");e.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},e.DEFLATE=i("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(i,t,e){"use strict";var n=i("./utils"),s=function(){for(var r,a=[],o=0;o<256;o++){r=o;for(var l=0;l<8;l++)r=1&r?3988292384^r>>>1:r>>>1;a[o]=r}return a}();t.exports=function(r,a){return r!==void 0&&r.length?n.getTypeOf(r)!=="string"?function(o,l,c,h){var u=s,p=h+c;o^=-1;for(var d=h;d<p;d++)o=o>>>8^u[255&(o^l[d])];return-1^o}(0|a,r,r.length,0):function(o,l,c,h){var u=s,p=h+c;o^=-1;for(var d=h;d<p;d++)o=o>>>8^u[255&(o^l.charCodeAt(d))];return-1^o}(0|a,r,r.length,0):0}},{"./utils":32}],5:[function(i,t,e){"use strict";e.base64=!1,e.binary=!1,e.dir=!1,e.createFolders=!0,e.date=null,e.compression=null,e.compressionOptions=null,e.comment=null,e.unixPermissions=null,e.dosPermissions=null},{}],6:[function(i,t,e){"use strict";var n=null;n=typeof Promise<"u"?Promise:i("lie"),t.exports={Promise:n}},{lie:37}],7:[function(i,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",s=i("pako"),r=i("./utils"),a=i("./stream/GenericWorker"),o=n?"uint8array":"array";function l(c,h){a.call(this,"FlateWorker/"+c),this._pako=null,this._pakoAction=c,this._pakoOptions=h,this.meta={}}e.magic="\b\0",r.inherits(l,a),l.prototype.processChunk=function(c){this.meta=c.meta,this._pako===null&&this._createPako(),this._pako.push(r.transformTo(o,c.data),!1)},l.prototype.flush=function(){a.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},l.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},l.prototype._createPako=function(){this._pako=new s[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var c=this;this._pako.onData=function(h){c.push({data:h,meta:c.meta})}},e.compressWorker=function(c){return new l("Deflate",c)},e.uncompressWorker=function(){return new l("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(i,t,e){"use strict";function n(u,p){var d,g="";for(d=0;d<p;d++)g+=String.fromCharCode(255&u),u>>>=8;return g}function s(u,p,d,g,v,m){var f,M,x=u.file,T=u.compression,L=m!==o.utf8encode,P=r.transformTo("string",m(x.name)),A=r.transformTo("string",o.utf8encode(x.name)),V=x.comment,R=r.transformTo("string",m(V)),S=r.transformTo("string",o.utf8encode(V)),D=A.length!==x.name.length,b=S.length!==V.length,$="",B="",U="",J=x.dir,Y=x.date,et={crc32:0,compressedSize:0,uncompressedSize:0};p&&!d||(et.crc32=u.crc32,et.compressedSize=u.compressedSize,et.uncompressedSize=u.uncompressedSize);var N=0;p&&(N|=8),L||!D&&!b||(N|=2048);var k=0,it=0;J&&(k|=16),v==="UNIX"?(it=798,k|=function(G,ct){var _t=G;return G||(_t=ct?16893:33204),(65535&_t)<<16}(x.unixPermissions,J)):(it=20,k|=function(G){return 63&(G||0)}(x.dosPermissions)),f=Y.getUTCHours(),f<<=6,f|=Y.getUTCMinutes(),f<<=5,f|=Y.getUTCSeconds()/2,M=Y.getUTCFullYear()-1980,M<<=4,M|=Y.getUTCMonth()+1,M<<=5,M|=Y.getUTCDate(),D&&(B=n(1,1)+n(l(P),4)+A,$+="up"+n(B.length,2)+B),b&&(U=n(1,1)+n(l(R),4)+S,$+="uc"+n(U.length,2)+U);var st="";return st+=`
\0`,st+=n(N,2),st+=T.magic,st+=n(f,2),st+=n(M,2),st+=n(et.crc32,4),st+=n(et.compressedSize,4),st+=n(et.uncompressedSize,4),st+=n(P.length,2),st+=n($.length,2),{fileRecord:c.LOCAL_FILE_HEADER+st+P+$,dirRecord:c.CENTRAL_FILE_HEADER+n(it,2)+st+n(R.length,2)+"\0\0\0\0"+n(k,4)+n(g,4)+P+$+R}}var r=i("../utils"),a=i("../stream/GenericWorker"),o=i("../utf8"),l=i("../crc32"),c=i("../signature");function h(u,p,d,g){a.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=p,this.zipPlatform=d,this.encodeFileName=g,this.streamFiles=u,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}r.inherits(h,a),h.prototype.push=function(u){var p=u.meta.percent||0,d=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(u):(this.bytesWritten+=u.data.length,a.prototype.push.call(this,{data:u.data,meta:{currentFile:this.currentFile,percent:d?(p+100*(d-g-1))/d:100}}))},h.prototype.openedSource=function(u){this.currentSourceOffset=this.bytesWritten,this.currentFile=u.file.name;var p=this.streamFiles&&!u.file.dir;if(p){var d=s(u,p,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:d.fileRecord,meta:{percent:0}})}else this.accumulate=!0},h.prototype.closedSource=function(u){this.accumulate=!1;var p=this.streamFiles&&!u.file.dir,d=s(u,p,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(d.dirRecord),p)this.push({data:function(g){return c.DATA_DESCRIPTOR+n(g.crc32,4)+n(g.compressedSize,4)+n(g.uncompressedSize,4)}(u),meta:{percent:100}});else for(this.push({data:d.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},h.prototype.flush=function(){for(var u=this.bytesWritten,p=0;p<this.dirRecords.length;p++)this.push({data:this.dirRecords[p],meta:{percent:100}});var d=this.bytesWritten-u,g=function(v,m,f,M,x){var T=r.transformTo("string",x(M));return c.CENTRAL_DIRECTORY_END+"\0\0\0\0"+n(v,2)+n(v,2)+n(m,4)+n(f,4)+n(T.length,2)+T}(this.dirRecords.length,d,u,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},h.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},h.prototype.registerPrevious=function(u){this._sources.push(u);var p=this;return u.on("data",function(d){p.processChunk(d)}),u.on("end",function(){p.closedSource(p.previous.streamInfo),p._sources.length?p.prepareNextSource():p.end()}),u.on("error",function(d){p.error(d)}),this},h.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},h.prototype.error=function(u){var p=this._sources;if(!a.prototype.error.call(this,u))return!1;for(var d=0;d<p.length;d++)try{p[d].error(u)}catch{}return!0},h.prototype.lock=function(){a.prototype.lock.call(this);for(var u=this._sources,p=0;p<u.length;p++)u[p].lock()},t.exports=h},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(i,t,e){"use strict";var n=i("../compressions"),s=i("./ZipFileWorker");e.generateWorker=function(r,a,o){var l=new s(a.streamFiles,o,a.platform,a.encodeFileName),c=0;try{r.forEach(function(h,u){c++;var p=function(m,f){var M=m||f,x=n[M];if(!x)throw new Error(M+" is not a valid compression method !");return x}(u.options.compression,a.compression),d=u.options.compressionOptions||a.compressionOptions||{},g=u.dir,v=u.date;u._compressWorker(p,d).withStreamInfo("file",{name:h,dir:g,date:v,comment:u.comment||"",unixPermissions:u.unixPermissions,dosPermissions:u.dosPermissions}).pipe(l)}),l.entriesCount=c}catch(h){l.error(h)}return l}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(i,t,e){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var s=new n;for(var r in this)typeof this[r]!="function"&&(s[r]=this[r]);return s}}(n.prototype=i("./object")).loadAsync=i("./load"),n.support=i("./support"),n.defaults=i("./defaults"),n.version="3.10.1",n.loadAsync=function(s,r){return new n().loadAsync(s,r)},n.external=i("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(i,t,e){"use strict";var n=i("./utils"),s=i("./external"),r=i("./utf8"),a=i("./zipEntries"),o=i("./stream/Crc32Probe"),l=i("./nodejsUtils");function c(h){return new s.Promise(function(u,p){var d=h.decompressed.getContentWorker().pipe(new o);d.on("error",function(g){p(g)}).on("end",function(){d.streamInfo.crc32!==h.decompressed.crc32?p(new Error("Corrupted zip : CRC32 mismatch")):u()}).resume()})}t.exports=function(h,u){var p=this;return u=n.extend(u||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:r.utf8decode}),l.isNode&&l.isStream(h)?s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",h,!0,u.optimizedBinaryString,u.base64).then(function(d){var g=new a(u);return g.load(d),g}).then(function(d){var g=[s.Promise.resolve(d)],v=d.files;if(u.checkCRC32)for(var m=0;m<v.length;m++)g.push(c(v[m]));return s.Promise.all(g)}).then(function(d){for(var g=d.shift(),v=g.files,m=0;m<v.length;m++){var f=v[m],M=f.fileNameStr,x=n.resolve(f.fileNameStr);p.file(x,f.decompressed,{binary:!0,optimizedBinaryString:!0,date:f.date,dir:f.dir,comment:f.fileCommentStr.length?f.fileCommentStr:null,unixPermissions:f.unixPermissions,dosPermissions:f.dosPermissions,createFolders:u.createFolders}),f.dir||(p.file(x).unsafeOriginalName=M)}return g.zipComment.length&&(p.comment=g.zipComment),p})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(i,t,e){"use strict";var n=i("../utils"),s=i("../stream/GenericWorker");function r(a,o){s.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(o)}n.inherits(r,s),r.prototype._bindStream=function(a){var o=this;(this._stream=a).pause(),a.on("data",function(l){o.push({data:l,meta:{percent:0}})}).on("error",function(l){o.isPaused?this.generatedError=l:o.error(l)}).on("end",function(){o.isPaused?o._upstreamEnded=!0:o.end()})},r.prototype.pause=function(){return!!s.prototype.pause.call(this)&&(this._stream.pause(),!0)},r.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=r},{"../stream/GenericWorker":28,"../utils":32}],13:[function(i,t,e){"use strict";var n=i("readable-stream").Readable;function s(r,a,o){n.call(this,a),this._helper=r;var l=this;r.on("data",function(c,h){l.push(c)||l._helper.pause(),o&&o(h)}).on("error",function(c){l.emit("error",c)}).on("end",function(){l.push(null)})}i("../utils").inherits(s,n),s.prototype._read=function(){this._helper.resume()},t.exports=s},{"../utils":32,"readable-stream":16}],14:[function(i,t,e){"use strict";t.exports={isNode:typeof Buffer<"u",newBufferFrom:function(n,s){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(n,s);if(typeof n=="number")throw new Error('The "data" argument must not be a number');return new Buffer(n,s)},allocBuffer:function(n){if(Buffer.alloc)return Buffer.alloc(n);var s=new Buffer(n);return s.fill(0),s},isBuffer:function(n){return Buffer.isBuffer(n)},isStream:function(n){return n&&typeof n.on=="function"&&typeof n.pause=="function"&&typeof n.resume=="function"}}},{}],15:[function(i,t,e){"use strict";function n(x,T,L){var P,A=r.getTypeOf(T),V=r.extend(L||{},l);V.date=V.date||new Date,V.compression!==null&&(V.compression=V.compression.toUpperCase()),typeof V.unixPermissions=="string"&&(V.unixPermissions=parseInt(V.unixPermissions,8)),V.unixPermissions&&16384&V.unixPermissions&&(V.dir=!0),V.dosPermissions&&16&V.dosPermissions&&(V.dir=!0),V.dir&&(x=v(x)),V.createFolders&&(P=g(x))&&m.call(this,P,!0);var R=A==="string"&&V.binary===!1&&V.base64===!1;L&&L.binary!==void 0||(V.binary=!R),(T instanceof c&&T.uncompressedSize===0||V.dir||!T||T.length===0)&&(V.base64=!1,V.binary=!0,T="",V.compression="STORE",A="string");var S=null;S=T instanceof c||T instanceof a?T:p.isNode&&p.isStream(T)?new d(x,T):r.prepareContent(x,T,V.binary,V.optimizedBinaryString,V.base64);var D=new h(x,S,V);this.files[x]=D}var s=i("./utf8"),r=i("./utils"),a=i("./stream/GenericWorker"),o=i("./stream/StreamHelper"),l=i("./defaults"),c=i("./compressedObject"),h=i("./zipObject"),u=i("./generate"),p=i("./nodejsUtils"),d=i("./nodejs/NodejsStreamInputAdapter"),g=function(x){x.slice(-1)==="/"&&(x=x.substring(0,x.length-1));var T=x.lastIndexOf("/");return 0<T?x.substring(0,T):""},v=function(x){return x.slice(-1)!=="/"&&(x+="/"),x},m=function(x,T){return T=T!==void 0?T:l.createFolders,x=v(x),this.files[x]||n.call(this,x,null,{dir:!0,createFolders:T}),this.files[x]};function f(x){return Object.prototype.toString.call(x)==="[object RegExp]"}var M={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(x){var T,L,P;for(T in this.files)P=this.files[T],(L=T.slice(this.root.length,T.length))&&T.slice(0,this.root.length)===this.root&&x(L,P)},filter:function(x){var T=[];return this.forEach(function(L,P){x(L,P)&&T.push(P)}),T},file:function(x,T,L){if(arguments.length!==1)return x=this.root+x,n.call(this,x,T,L),this;if(f(x)){var P=x;return this.filter(function(V,R){return!R.dir&&P.test(V)})}var A=this.files[this.root+x];return A&&!A.dir?A:null},folder:function(x){if(!x)return this;if(f(x))return this.filter(function(A,V){return V.dir&&x.test(A)});var T=this.root+x,L=m.call(this,T),P=this.clone();return P.root=L.name,P},remove:function(x){x=this.root+x;var T=this.files[x];if(T||(x.slice(-1)!=="/"&&(x+="/"),T=this.files[x]),T&&!T.dir)delete this.files[x];else for(var L=this.filter(function(A,V){return V.name.slice(0,x.length)===x}),P=0;P<L.length;P++)delete this.files[L[P].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(x){var T,L={};try{if((L=r.extend(x||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:s.utf8encode})).type=L.type.toLowerCase(),L.compression=L.compression.toUpperCase(),L.type==="binarystring"&&(L.type="string"),!L.type)throw new Error("No output type specified.");r.checkSupport(L.type),L.platform!=="darwin"&&L.platform!=="freebsd"&&L.platform!=="linux"&&L.platform!=="sunos"||(L.platform="UNIX"),L.platform==="win32"&&(L.platform="DOS");var P=L.comment||this.comment||"";T=u.generateWorker(this,L,P)}catch(A){(T=new a("error")).error(A)}return new o(T,L.type||"string",L.mimeType)},generateAsync:function(x,T){return this.generateInternalStream(x).accumulate(T)},generateNodeStream:function(x,T){return(x=x||{}).type||(x.type="nodebuffer"),this.generateInternalStream(x).toNodejsStream(T)}};t.exports=M},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(i,t,e){"use strict";t.exports=i("stream")},{stream:void 0}],17:[function(i,t,e){"use strict";var n=i("./DataReader");function s(r){n.call(this,r);for(var a=0;a<this.data.length;a++)r[a]=255&r[a]}i("../utils").inherits(s,n),s.prototype.byteAt=function(r){return this.data[this.zero+r]},s.prototype.lastIndexOfSignature=function(r){for(var a=r.charCodeAt(0),o=r.charCodeAt(1),l=r.charCodeAt(2),c=r.charCodeAt(3),h=this.length-4;0<=h;--h)if(this.data[h]===a&&this.data[h+1]===o&&this.data[h+2]===l&&this.data[h+3]===c)return h-this.zero;return-1},s.prototype.readAndCheckSignature=function(r){var a=r.charCodeAt(0),o=r.charCodeAt(1),l=r.charCodeAt(2),c=r.charCodeAt(3),h=this.readData(4);return a===h[0]&&o===h[1]&&l===h[2]&&c===h[3]},s.prototype.readData=function(r){if(this.checkOffset(r),r===0)return[];var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./DataReader":18}],18:[function(i,t,e){"use strict";var n=i("../utils");function s(r){this.data=r,this.length=r.length,this.index=0,this.zero=0}s.prototype={checkOffset:function(r){this.checkIndex(this.index+r)},checkIndex:function(r){if(this.length<this.zero+r||r<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+r+"). Corrupted zip ?")},setIndex:function(r){this.checkIndex(r),this.index=r},skip:function(r){this.setIndex(this.index+r)},byteAt:function(){},readInt:function(r){var a,o=0;for(this.checkOffset(r),a=this.index+r-1;a>=this.index;a--)o=(o<<8)+this.byteAt(a);return this.index+=r,o},readString:function(r){return n.transformTo("string",this.readData(r))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var r=this.readInt(4);return new Date(Date.UTC(1980+(r>>25&127),(r>>21&15)-1,r>>16&31,r>>11&31,r>>5&63,(31&r)<<1))}},t.exports=s},{"../utils":32}],19:[function(i,t,e){"use strict";var n=i("./Uint8ArrayReader");function s(r){n.call(this,r)}i("../utils").inherits(s,n),s.prototype.readData=function(r){this.checkOffset(r);var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(i,t,e){"use strict";var n=i("./DataReader");function s(r){n.call(this,r)}i("../utils").inherits(s,n),s.prototype.byteAt=function(r){return this.data.charCodeAt(this.zero+r)},s.prototype.lastIndexOfSignature=function(r){return this.data.lastIndexOf(r)-this.zero},s.prototype.readAndCheckSignature=function(r){return r===this.readData(4)},s.prototype.readData=function(r){this.checkOffset(r);var a=this.data.slice(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./DataReader":18}],21:[function(i,t,e){"use strict";var n=i("./ArrayReader");function s(r){n.call(this,r)}i("../utils").inherits(s,n),s.prototype.readData=function(r){if(this.checkOffset(r),r===0)return new Uint8Array(0);var a=this.data.subarray(this.zero+this.index,this.zero+this.index+r);return this.index+=r,a},t.exports=s},{"../utils":32,"./ArrayReader":17}],22:[function(i,t,e){"use strict";var n=i("../utils"),s=i("../support"),r=i("./ArrayReader"),a=i("./StringReader"),o=i("./NodeBufferReader"),l=i("./Uint8ArrayReader");t.exports=function(c){var h=n.getTypeOf(c);return n.checkSupport(h),h!=="string"||s.uint8array?h==="nodebuffer"?new o(c):s.uint8array?new l(n.transformTo("uint8array",c)):new r(n.transformTo("array",c)):new a(c)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(i,t,e){"use strict";e.LOCAL_FILE_HEADER="PK",e.CENTRAL_FILE_HEADER="PK",e.CENTRAL_DIRECTORY_END="PK",e.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",e.ZIP64_CENTRAL_DIRECTORY_END="PK",e.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(i,t,e){"use strict";var n=i("./GenericWorker"),s=i("../utils");function r(a){n.call(this,"ConvertWorker to "+a),this.destType=a}s.inherits(r,n),r.prototype.processChunk=function(a){this.push({data:s.transformTo(this.destType,a.data),meta:a.meta})},t.exports=r},{"../utils":32,"./GenericWorker":28}],25:[function(i,t,e){"use strict";var n=i("./GenericWorker"),s=i("../crc32");function r(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}i("../utils").inherits(r,n),r.prototype.processChunk=function(a){this.streamInfo.crc32=s(a.data,this.streamInfo.crc32||0),this.push(a)},t.exports=r},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(i,t,e){"use strict";var n=i("../utils"),s=i("./GenericWorker");function r(a){s.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}n.inherits(r,s),r.prototype.processChunk=function(a){if(a){var o=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=o+a.data.length}s.prototype.processChunk.call(this,a)},t.exports=r},{"../utils":32,"./GenericWorker":28}],27:[function(i,t,e){"use strict";var n=i("../utils"),s=i("./GenericWorker");function r(a){s.call(this,"DataWorker");var o=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(l){o.dataIsReady=!0,o.data=l,o.max=l&&l.length||0,o.type=n.getTypeOf(l),o.isPaused||o._tickAndRepeat()},function(l){o.error(l)})}n.inherits(r,s),r.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=null,o=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":a=this.data.substring(this.index,o);break;case"uint8array":a=this.data.subarray(this.index,o);break;case"array":case"nodebuffer":a=this.data.slice(this.index,o)}return this.index=o,this.push({data:a,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=r},{"../utils":32,"./GenericWorker":28}],28:[function(i,t,e){"use strict";function n(s){this.name=s||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(s){this.emit("data",s)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(s){this.emit("error",s)}return!0},error:function(s){return!this.isFinished&&(this.isPaused?this.generatedError=s:(this.isFinished=!0,this.emit("error",s),this.previous&&this.previous.error(s),this.cleanUp()),!0)},on:function(s,r){return this._listeners[s].push(r),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(s,r){if(this._listeners[s])for(var a=0;a<this._listeners[s].length;a++)this._listeners[s][a].call(this,r)},pipe:function(s){return s.registerPrevious(this)},registerPrevious:function(s){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=s.streamInfo,this.mergeStreamInfo(),this.previous=s;var r=this;return s.on("data",function(a){r.processChunk(a)}),s.on("end",function(){r.end()}),s.on("error",function(a){r.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var s=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),s=!0),this.previous&&this.previous.resume(),!s},flush:function(){},processChunk:function(s){this.push(s)},withStreamInfo:function(s,r){return this.extraStreamInfo[s]=r,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var s in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,s)&&(this.streamInfo[s]=this.extraStreamInfo[s])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var s="Worker "+this.name;return this.previous?this.previous+" -> "+s:s}},t.exports=n},{}],29:[function(i,t,e){"use strict";var n=i("../utils"),s=i("./ConvertWorker"),r=i("./GenericWorker"),a=i("../base64"),o=i("../support"),l=i("../external"),c=null;if(o.nodestream)try{c=i("../nodejs/NodejsStreamOutputAdapter")}catch{}function h(p,d){return new l.Promise(function(g,v){var m=[],f=p._internalType,M=p._outputType,x=p._mimeType;p.on("data",function(T,L){m.push(T),d&&d(L)}).on("error",function(T){m=[],v(T)}).on("end",function(){try{var T=function(L,P,A){switch(L){case"blob":return n.newBlob(n.transformTo("arraybuffer",P),A);case"base64":return a.encode(P);default:return n.transformTo(L,P)}}(M,function(L,P){var A,V=0,R=null,S=0;for(A=0;A<P.length;A++)S+=P[A].length;switch(L){case"string":return P.join("");case"array":return Array.prototype.concat.apply([],P);case"uint8array":for(R=new Uint8Array(S),A=0;A<P.length;A++)R.set(P[A],V),V+=P[A].length;return R;case"nodebuffer":return Buffer.concat(P);default:throw new Error("concat : unsupported type '"+L+"'")}}(f,m),x);g(T)}catch(L){v(L)}m=[]}).resume()})}function u(p,d,g){var v=d;switch(d){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=d,this._mimeType=g,n.checkSupport(v),this._worker=p.pipe(new s(v)),p.lock()}catch(m){this._worker=new r("error"),this._worker.error(m)}}u.prototype={accumulate:function(p){return h(this,p)},on:function(p,d){var g=this;return p==="data"?this._worker.on(p,function(v){d.call(g,v.data,v.meta)}):this._worker.on(p,function(){n.delay(d,arguments,g)}),this},resume:function(){return n.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(p){if(n.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new c(this,{objectMode:this._outputType!=="nodebuffer"},p)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(i,t,e){"use strict";if(e.base64=!0,e.array=!0,e.string=!0,e.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",e.nodebuffer=typeof Buffer<"u",e.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")e.blob=!1;else{var n=new ArrayBuffer(0);try{e.blob=new Blob([n],{type:"application/zip"}).size===0}catch{try{var s=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);s.append(n),e.blob=s.getBlob("application/zip").size===0}catch{e.blob=!1}}}try{e.nodestream=!!i("readable-stream").Readable}catch{e.nodestream=!1}},{"readable-stream":16}],31:[function(i,t,e){"use strict";for(var n=i("./utils"),s=i("./support"),r=i("./nodejsUtils"),a=i("./stream/GenericWorker"),o=new Array(256),l=0;l<256;l++)o[l]=252<=l?6:248<=l?5:240<=l?4:224<=l?3:192<=l?2:1;o[254]=o[254]=1;function c(){a.call(this,"utf-8 decode"),this.leftOver=null}function h(){a.call(this,"utf-8 encode")}e.utf8encode=function(u){return s.nodebuffer?r.newBufferFrom(u,"utf-8"):function(p){var d,g,v,m,f,M=p.length,x=0;for(m=0;m<M;m++)(64512&(g=p.charCodeAt(m)))==55296&&m+1<M&&(64512&(v=p.charCodeAt(m+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),m++),x+=g<128?1:g<2048?2:g<65536?3:4;for(d=s.uint8array?new Uint8Array(x):new Array(x),m=f=0;f<x;m++)(64512&(g=p.charCodeAt(m)))==55296&&m+1<M&&(64512&(v=p.charCodeAt(m+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),m++),g<128?d[f++]=g:(g<2048?d[f++]=192|g>>>6:(g<65536?d[f++]=224|g>>>12:(d[f++]=240|g>>>18,d[f++]=128|g>>>12&63),d[f++]=128|g>>>6&63),d[f++]=128|63&g);return d}(u)},e.utf8decode=function(u){return s.nodebuffer?n.transformTo("nodebuffer",u).toString("utf-8"):function(p){var d,g,v,m,f=p.length,M=new Array(2*f);for(d=g=0;d<f;)if((v=p[d++])<128)M[g++]=v;else if(4<(m=o[v]))M[g++]=65533,d+=m-1;else{for(v&=m===2?31:m===3?15:7;1<m&&d<f;)v=v<<6|63&p[d++],m--;1<m?M[g++]=65533:v<65536?M[g++]=v:(v-=65536,M[g++]=55296|v>>10&1023,M[g++]=56320|1023&v)}return M.length!==g&&(M.subarray?M=M.subarray(0,g):M.length=g),n.applyFromCharCode(M)}(u=n.transformTo(s.uint8array?"uint8array":"array",u))},n.inherits(c,a),c.prototype.processChunk=function(u){var p=n.transformTo(s.uint8array?"uint8array":"array",u.data);if(this.leftOver&&this.leftOver.length){if(s.uint8array){var d=p;(p=new Uint8Array(d.length+this.leftOver.length)).set(this.leftOver,0),p.set(d,this.leftOver.length)}else p=this.leftOver.concat(p);this.leftOver=null}var g=function(m,f){var M;for((f=f||m.length)>m.length&&(f=m.length),M=f-1;0<=M&&(192&m[M])==128;)M--;return M<0||M===0?f:M+o[m[M]]>f?M:f}(p),v=p;g!==p.length&&(s.uint8array?(v=p.subarray(0,g),this.leftOver=p.subarray(g,p.length)):(v=p.slice(0,g),this.leftOver=p.slice(g,p.length))),this.push({data:e.utf8decode(v),meta:u.meta})},c.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:e.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},e.Utf8DecodeWorker=c,n.inherits(h,a),h.prototype.processChunk=function(u){this.push({data:e.utf8encode(u.data),meta:u.meta})},e.Utf8EncodeWorker=h},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(i,t,e){"use strict";var n=i("./support"),s=i("./base64"),r=i("./nodejsUtils"),a=i("./external");function o(d){return d}function l(d,g){for(var v=0;v<d.length;++v)g[v]=255&d.charCodeAt(v);return g}i("setimmediate"),e.newBlob=function(d,g){e.checkSupport("blob");try{return new Blob([d],{type:g})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(d),v.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var c={stringifyByChunk:function(d,g,v){var m=[],f=0,M=d.length;if(M<=v)return String.fromCharCode.apply(null,d);for(;f<M;)g==="array"||g==="nodebuffer"?m.push(String.fromCharCode.apply(null,d.slice(f,Math.min(f+v,M)))):m.push(String.fromCharCode.apply(null,d.subarray(f,Math.min(f+v,M)))),f+=v;return m.join("")},stringifyByChar:function(d){for(var g="",v=0;v<d.length;v++)g+=String.fromCharCode(d[v]);return g},applyCanBeUsed:{uint8array:function(){try{return n.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return n.nodebuffer&&String.fromCharCode.apply(null,r.allocBuffer(1)).length===1}catch{return!1}}()}};function h(d){var g=65536,v=e.getTypeOf(d),m=!0;if(v==="uint8array"?m=c.applyCanBeUsed.uint8array:v==="nodebuffer"&&(m=c.applyCanBeUsed.nodebuffer),m)for(;1<g;)try{return c.stringifyByChunk(d,v,g)}catch{g=Math.floor(g/2)}return c.stringifyByChar(d)}function u(d,g){for(var v=0;v<d.length;v++)g[v]=d[v];return g}e.applyFromCharCode=h;var p={};p.string={string:o,array:function(d){return l(d,new Array(d.length))},arraybuffer:function(d){return p.string.uint8array(d).buffer},uint8array:function(d){return l(d,new Uint8Array(d.length))},nodebuffer:function(d){return l(d,r.allocBuffer(d.length))}},p.array={string:h,array:o,arraybuffer:function(d){return new Uint8Array(d).buffer},uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return r.newBufferFrom(d)}},p.arraybuffer={string:function(d){return h(new Uint8Array(d))},array:function(d){return u(new Uint8Array(d),new Array(d.byteLength))},arraybuffer:o,uint8array:function(d){return new Uint8Array(d)},nodebuffer:function(d){return r.newBufferFrom(new Uint8Array(d))}},p.uint8array={string:h,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return d.buffer},uint8array:o,nodebuffer:function(d){return r.newBufferFrom(d)}},p.nodebuffer={string:h,array:function(d){return u(d,new Array(d.length))},arraybuffer:function(d){return p.nodebuffer.uint8array(d).buffer},uint8array:function(d){return u(d,new Uint8Array(d.length))},nodebuffer:o},e.transformTo=function(d,g){if(g=g||"",!d)return g;e.checkSupport(d);var v=e.getTypeOf(g);return p[v][d](g)},e.resolve=function(d){for(var g=d.split("/"),v=[],m=0;m<g.length;m++){var f=g[m];f==="."||f===""&&m!==0&&m!==g.length-1||(f===".."?v.pop():v.push(f))}return v.join("/")},e.getTypeOf=function(d){return typeof d=="string"?"string":Object.prototype.toString.call(d)==="[object Array]"?"array":n.nodebuffer&&r.isBuffer(d)?"nodebuffer":n.uint8array&&d instanceof Uint8Array?"uint8array":n.arraybuffer&&d instanceof ArrayBuffer?"arraybuffer":void 0},e.checkSupport=function(d){if(!n[d.toLowerCase()])throw new Error(d+" is not supported by this platform")},e.MAX_VALUE_16BITS=65535,e.MAX_VALUE_32BITS=-1,e.pretty=function(d){var g,v,m="";for(v=0;v<(d||"").length;v++)m+="\\x"+((g=d.charCodeAt(v))<16?"0":"")+g.toString(16).toUpperCase();return m},e.delay=function(d,g,v){setImmediate(function(){d.apply(v||null,g||[])})},e.inherits=function(d,g){function v(){}v.prototype=g.prototype,d.prototype=new v},e.extend=function(){var d,g,v={};for(d=0;d<arguments.length;d++)for(g in arguments[d])Object.prototype.hasOwnProperty.call(arguments[d],g)&&v[g]===void 0&&(v[g]=arguments[d][g]);return v},e.prepareContent=function(d,g,v,m,f){return a.Promise.resolve(g).then(function(M){return n.blob&&(M instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(M))!==-1)&&typeof FileReader<"u"?new a.Promise(function(x,T){var L=new FileReader;L.onload=function(P){x(P.target.result)},L.onerror=function(P){T(P.target.error)},L.readAsArrayBuffer(M)}):M}).then(function(M){var x=e.getTypeOf(M);return x?(x==="arraybuffer"?M=e.transformTo("uint8array",M):x==="string"&&(f?M=s.decode(M):v&&m!==!0&&(M=function(T){return l(T,n.uint8array?new Uint8Array(T.length):new Array(T.length))}(M))),M):a.Promise.reject(new Error("Can't read the data of '"+d+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(i,t,e){"use strict";var n=i("./reader/readerFor"),s=i("./utils"),r=i("./signature"),a=i("./zipEntry"),o=i("./support");function l(c){this.files=[],this.loadOptions=c}l.prototype={checkSignature:function(c){if(!this.reader.readAndCheckSignature(c)){this.reader.index-=4;var h=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+s.pretty(h)+", expected "+s.pretty(c)+")")}},isSignature:function(c,h){var u=this.reader.index;this.reader.setIndex(c);var p=this.reader.readString(4)===h;return this.reader.setIndex(u),p},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var c=this.reader.readData(this.zipCommentLength),h=o.uint8array?"uint8array":"array",u=s.transformTo(h,c);this.zipComment=this.loadOptions.decodeFileName(u)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var c,h,u,p=this.zip64EndOfCentralSize-44;0<p;)c=this.reader.readInt(2),h=this.reader.readInt(4),u=this.reader.readData(h),this.zip64ExtensibleData[c]={id:c,length:h,value:u}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var c,h;for(c=0;c<this.files.length;c++)h=this.files[c],this.reader.setIndex(h.localHeaderOffset),this.checkSignature(r.LOCAL_FILE_HEADER),h.readLocalPart(this.reader),h.handleUTF8(),h.processAttributes()},readCentralDir:function(){var c;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(r.CENTRAL_FILE_HEADER);)(c=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(c);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var c=this.reader.lastIndexOfSignature(r.CENTRAL_DIRECTORY_END);if(c<0)throw this.isSignature(0,r.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(c);var h=c;if(this.checkSignature(r.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===s.MAX_VALUE_16BITS||this.diskWithCentralDirStart===s.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===s.MAX_VALUE_16BITS||this.centralDirRecords===s.MAX_VALUE_16BITS||this.centralDirSize===s.MAX_VALUE_32BITS||this.centralDirOffset===s.MAX_VALUE_32BITS){if(this.zip64=!0,(c=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(c),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,r.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(r.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var u=this.centralDirOffset+this.centralDirSize;this.zip64&&(u+=20,u+=12+this.zip64EndOfCentralSize);var p=h-u;if(0<p)this.isSignature(h,r.CENTRAL_FILE_HEADER)||(this.reader.zero=p);else if(p<0)throw new Error("Corrupted zip: missing "+Math.abs(p)+" bytes.")},prepareReader:function(c){this.reader=n(c)},load:function(c){this.prepareReader(c),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=l},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(i,t,e){"use strict";var n=i("./reader/readerFor"),s=i("./utils"),r=i("./compressedObject"),a=i("./crc32"),o=i("./utf8"),l=i("./compressions"),c=i("./support");function h(u,p){this.options=u,this.loadOptions=p}h.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(u){var p,d;if(u.skip(22),this.fileNameLength=u.readInt(2),d=u.readInt(2),this.fileName=u.readData(this.fileNameLength),u.skip(d),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((p=function(g){for(var v in l)if(Object.prototype.hasOwnProperty.call(l,v)&&l[v].magic===g)return l[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new r(this.compressedSize,this.uncompressedSize,this.crc32,p,u.readData(this.compressedSize))},readCentralPart:function(u){this.versionMadeBy=u.readInt(2),u.skip(2),this.bitFlag=u.readInt(2),this.compressionMethod=u.readString(2),this.date=u.readDate(),this.crc32=u.readInt(4),this.compressedSize=u.readInt(4),this.uncompressedSize=u.readInt(4);var p=u.readInt(2);if(this.extraFieldsLength=u.readInt(2),this.fileCommentLength=u.readInt(2),this.diskNumberStart=u.readInt(2),this.internalFileAttributes=u.readInt(2),this.externalFileAttributes=u.readInt(4),this.localHeaderOffset=u.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");u.skip(p),this.readExtraFields(u),this.parseZIP64ExtraField(u),this.fileComment=u.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var u=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),u==0&&(this.dosPermissions=63&this.externalFileAttributes),u==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var u=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=u.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=u.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=u.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=u.readInt(4))}},readExtraFields:function(u){var p,d,g,v=u.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});u.index+4<v;)p=u.readInt(2),d=u.readInt(2),g=u.readData(d),this.extraFields[p]={id:p,length:d,value:g};u.setIndex(v)},handleUTF8:function(){var u=c.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var p=this.findExtraFieldUnicodePath();if(p!==null)this.fileNameStr=p;else{var d=s.transformTo(u,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(d)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var v=s.transformTo(u,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var u=this.extraFields[28789];if(u){var p=n(u.value);return p.readInt(1)!==1||a(this.fileName)!==p.readInt(4)?null:o.utf8decode(p.readData(u.length-5))}return null},findExtraFieldUnicodeComment:function(){var u=this.extraFields[25461];if(u){var p=n(u.value);return p.readInt(1)!==1||a(this.fileComment)!==p.readInt(4)?null:o.utf8decode(p.readData(u.length-5))}return null}},t.exports=h},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(i,t,e){"use strict";function n(p,d,g){this.name=p,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=d,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var s=i("./stream/StreamHelper"),r=i("./stream/DataWorker"),a=i("./utf8"),o=i("./compressedObject"),l=i("./stream/GenericWorker");n.prototype={internalStream:function(p){var d=null,g="string";try{if(!p)throw new Error("No output type specified.");var v=(g=p.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),d=this._decompressWorker();var m=!this._dataBinary;m&&!v&&(d=d.pipe(new a.Utf8EncodeWorker)),!m&&v&&(d=d.pipe(new a.Utf8DecodeWorker))}catch(f){(d=new l("error")).error(f)}return new s(d,g,"")},async:function(p,d){return this.internalStream(p).accumulate(d)},nodeStream:function(p,d){return this.internalStream(p||"nodebuffer").toNodejsStream(d)},_compressWorker:function(p,d){if(this._data instanceof o&&this._data.compression.magic===p.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(g,p,d)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof l?this._data:new r(this._data)}};for(var c=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],h=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},u=0;u<c.length;u++)n.prototype[c[u]]=h;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(i,t,e){(function(n){"use strict";var s,r,a=n.MutationObserver||n.WebKitMutationObserver;if(a){var o=0,l=new a(p),c=n.document.createTextNode("");l.observe(c,{characterData:!0}),s=function(){c.data=o=++o%2}}else if(n.setImmediate||n.MessageChannel===void 0)s="document"in n&&"onreadystatechange"in n.document.createElement("script")?function(){var d=n.document.createElement("script");d.onreadystatechange=function(){p(),d.onreadystatechange=null,d.parentNode.removeChild(d),d=null},n.document.documentElement.appendChild(d)}:function(){setTimeout(p,0)};else{var h=new n.MessageChannel;h.port1.onmessage=p,s=function(){h.port2.postMessage(0)}}var u=[];function p(){var d,g;r=!0;for(var v=u.length;v;){for(g=u,u=[],d=-1;++d<v;)g[d]();v=u.length}r=!1}t.exports=function(d){u.push(d)!==1||r||s()}}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(i,t,e){"use strict";var n=i("immediate");function s(){}var r={},a=["REJECTED"],o=["FULFILLED"],l=["PENDING"];function c(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=l,this.queue=[],this.outcome=void 0,v!==s&&d(this,v)}function h(v,m,f){this.promise=v,typeof m=="function"&&(this.onFulfilled=m,this.callFulfilled=this.otherCallFulfilled),typeof f=="function"&&(this.onRejected=f,this.callRejected=this.otherCallRejected)}function u(v,m,f){n(function(){var M;try{M=m(f)}catch(x){return r.reject(v,x)}M===v?r.reject(v,new TypeError("Cannot resolve promise with itself")):r.resolve(v,M)})}function p(v){var m=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof m=="function")return function(){m.apply(v,arguments)}}function d(v,m){var f=!1;function M(L){f||(f=!0,r.reject(v,L))}function x(L){f||(f=!0,r.resolve(v,L))}var T=g(function(){m(x,M)});T.status==="error"&&M(T.value)}function g(v,m){var f={};try{f.value=v(m),f.status="success"}catch(M){f.status="error",f.value=M}return f}(t.exports=c).prototype.finally=function(v){if(typeof v!="function")return this;var m=this.constructor;return this.then(function(f){return m.resolve(v()).then(function(){return f})},function(f){return m.resolve(v()).then(function(){throw f})})},c.prototype.catch=function(v){return this.then(null,v)},c.prototype.then=function(v,m){if(typeof v!="function"&&this.state===o||typeof m!="function"&&this.state===a)return this;var f=new this.constructor(s);return this.state!==l?u(f,this.state===o?v:m,this.outcome):this.queue.push(new h(f,v,m)),f},h.prototype.callFulfilled=function(v){r.resolve(this.promise,v)},h.prototype.otherCallFulfilled=function(v){u(this.promise,this.onFulfilled,v)},h.prototype.callRejected=function(v){r.reject(this.promise,v)},h.prototype.otherCallRejected=function(v){u(this.promise,this.onRejected,v)},r.resolve=function(v,m){var f=g(p,m);if(f.status==="error")return r.reject(v,f.value);var M=f.value;if(M)d(v,M);else{v.state=o,v.outcome=m;for(var x=-1,T=v.queue.length;++x<T;)v.queue[x].callFulfilled(m)}return v},r.reject=function(v,m){v.state=a,v.outcome=m;for(var f=-1,M=v.queue.length;++f<M;)v.queue[f].callRejected(m);return v},c.resolve=function(v){return v instanceof this?v:r.resolve(new this(s),v)},c.reject=function(v){var m=new this(s);return r.reject(m,v)},c.all=function(v){var m=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var f=v.length,M=!1;if(!f)return this.resolve([]);for(var x=new Array(f),T=0,L=-1,P=new this(s);++L<f;)A(v[L],L);return P;function A(V,R){m.resolve(V).then(function(S){x[R]=S,++T!==f||M||(M=!0,r.resolve(P,x))},function(S){M||(M=!0,r.reject(P,S))})}},c.race=function(v){var m=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var f=v.length,M=!1;if(!f)return this.resolve([]);for(var x=-1,T=new this(s);++x<f;)L=v[x],m.resolve(L).then(function(P){M||(M=!0,r.resolve(T,P))},function(P){M||(M=!0,r.reject(T,P))});var L;return T}},{immediate:36}],38:[function(i,t,e){"use strict";var n={};(0,i("./lib/utils/common").assign)(n,i("./lib/deflate"),i("./lib/inflate"),i("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(i,t,e){"use strict";var n=i("./zlib/deflate"),s=i("./utils/common"),r=i("./utils/strings"),a=i("./zlib/messages"),o=i("./zlib/zstream"),l=Object.prototype.toString,c=0,h=-1,u=0,p=8;function d(v){if(!(this instanceof d))return new d(v);this.options=s.assign({level:h,method:p,chunkSize:16384,windowBits:15,memLevel:8,strategy:u,to:""},v||{});var m=this.options;m.raw&&0<m.windowBits?m.windowBits=-m.windowBits:m.gzip&&0<m.windowBits&&m.windowBits<16&&(m.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new o,this.strm.avail_out=0;var f=n.deflateInit2(this.strm,m.level,m.method,m.windowBits,m.memLevel,m.strategy);if(f!==c)throw new Error(a[f]);if(m.header&&n.deflateSetHeader(this.strm,m.header),m.dictionary){var M;if(M=typeof m.dictionary=="string"?r.string2buf(m.dictionary):l.call(m.dictionary)==="[object ArrayBuffer]"?new Uint8Array(m.dictionary):m.dictionary,(f=n.deflateSetDictionary(this.strm,M))!==c)throw new Error(a[f]);this._dict_set=!0}}function g(v,m){var f=new d(m);if(f.push(v,!0),f.err)throw f.msg||a[f.err];return f.result}d.prototype.push=function(v,m){var f,M,x=this.strm,T=this.options.chunkSize;if(this.ended)return!1;M=m===~~m?m:m===!0?4:0,typeof v=="string"?x.input=r.string2buf(v):l.call(v)==="[object ArrayBuffer]"?x.input=new Uint8Array(v):x.input=v,x.next_in=0,x.avail_in=x.input.length;do{if(x.avail_out===0&&(x.output=new s.Buf8(T),x.next_out=0,x.avail_out=T),(f=n.deflate(x,M))!==1&&f!==c)return this.onEnd(f),!(this.ended=!0);x.avail_out!==0&&(x.avail_in!==0||M!==4&&M!==2)||(this.options.to==="string"?this.onData(r.buf2binstring(s.shrinkBuf(x.output,x.next_out))):this.onData(s.shrinkBuf(x.output,x.next_out)))}while((0<x.avail_in||x.avail_out===0)&&f!==1);return M===4?(f=n.deflateEnd(this.strm),this.onEnd(f),this.ended=!0,f===c):M!==2||(this.onEnd(c),!(x.avail_out=0))},d.prototype.onData=function(v){this.chunks.push(v)},d.prototype.onEnd=function(v){v===c&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},e.Deflate=d,e.deflate=g,e.deflateRaw=function(v,m){return(m=m||{}).raw=!0,g(v,m)},e.gzip=function(v,m){return(m=m||{}).gzip=!0,g(v,m)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(i,t,e){"use strict";var n=i("./zlib/inflate"),s=i("./utils/common"),r=i("./utils/strings"),a=i("./zlib/constants"),o=i("./zlib/messages"),l=i("./zlib/zstream"),c=i("./zlib/gzheader"),h=Object.prototype.toString;function u(d){if(!(this instanceof u))return new u(d);this.options=s.assign({chunkSize:16384,windowBits:0,to:""},d||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||d&&d.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var v=n.inflateInit2(this.strm,g.windowBits);if(v!==a.Z_OK)throw new Error(o[v]);this.header=new c,n.inflateGetHeader(this.strm,this.header)}function p(d,g){var v=new u(g);if(v.push(d,!0),v.err)throw v.msg||o[v.err];return v.result}u.prototype.push=function(d,g){var v,m,f,M,x,T,L=this.strm,P=this.options.chunkSize,A=this.options.dictionary,V=!1;if(this.ended)return!1;m=g===~~g?g:g===!0?a.Z_FINISH:a.Z_NO_FLUSH,typeof d=="string"?L.input=r.binstring2buf(d):h.call(d)==="[object ArrayBuffer]"?L.input=new Uint8Array(d):L.input=d,L.next_in=0,L.avail_in=L.input.length;do{if(L.avail_out===0&&(L.output=new s.Buf8(P),L.next_out=0,L.avail_out=P),(v=n.inflate(L,a.Z_NO_FLUSH))===a.Z_NEED_DICT&&A&&(T=typeof A=="string"?r.string2buf(A):h.call(A)==="[object ArrayBuffer]"?new Uint8Array(A):A,v=n.inflateSetDictionary(this.strm,T)),v===a.Z_BUF_ERROR&&V===!0&&(v=a.Z_OK,V=!1),v!==a.Z_STREAM_END&&v!==a.Z_OK)return this.onEnd(v),!(this.ended=!0);L.next_out&&(L.avail_out!==0&&v!==a.Z_STREAM_END&&(L.avail_in!==0||m!==a.Z_FINISH&&m!==a.Z_SYNC_FLUSH)||(this.options.to==="string"?(f=r.utf8border(L.output,L.next_out),M=L.next_out-f,x=r.buf2string(L.output,f),L.next_out=M,L.avail_out=P-M,M&&s.arraySet(L.output,L.output,f,M,0),this.onData(x)):this.onData(s.shrinkBuf(L.output,L.next_out)))),L.avail_in===0&&L.avail_out===0&&(V=!0)}while((0<L.avail_in||L.avail_out===0)&&v!==a.Z_STREAM_END);return v===a.Z_STREAM_END&&(m=a.Z_FINISH),m===a.Z_FINISH?(v=n.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===a.Z_OK):m!==a.Z_SYNC_FLUSH||(this.onEnd(a.Z_OK),!(L.avail_out=0))},u.prototype.onData=function(d){this.chunks.push(d)},u.prototype.onEnd=function(d){d===a.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=d,this.msg=this.strm.msg},e.Inflate=u,e.inflate=p,e.inflateRaw=function(d,g){return(g=g||{}).raw=!0,p(d,g)},e.ungzip=p},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(i,t,e){"use strict";var n=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";e.assign=function(a){for(var o=Array.prototype.slice.call(arguments,1);o.length;){var l=o.shift();if(l){if(typeof l!="object")throw new TypeError(l+"must be non-object");for(var c in l)l.hasOwnProperty(c)&&(a[c]=l[c])}}return a},e.shrinkBuf=function(a,o){return a.length===o?a:a.subarray?a.subarray(0,o):(a.length=o,a)};var s={arraySet:function(a,o,l,c,h){if(o.subarray&&a.subarray)a.set(o.subarray(l,l+c),h);else for(var u=0;u<c;u++)a[h+u]=o[l+u]},flattenChunks:function(a){var o,l,c,h,u,p;for(o=c=0,l=a.length;o<l;o++)c+=a[o].length;for(p=new Uint8Array(c),o=h=0,l=a.length;o<l;o++)u=a[o],p.set(u,h),h+=u.length;return p}},r={arraySet:function(a,o,l,c,h){for(var u=0;u<c;u++)a[h+u]=o[l+u]},flattenChunks:function(a){return[].concat.apply([],a)}};e.setTyped=function(a){a?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,s)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,r))},e.setTyped(n)},{}],42:[function(i,t,e){"use strict";var n=i("./common"),s=!0,r=!0;try{String.fromCharCode.apply(null,[0])}catch{s=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{r=!1}for(var a=new n.Buf8(256),o=0;o<256;o++)a[o]=252<=o?6:248<=o?5:240<=o?4:224<=o?3:192<=o?2:1;function l(c,h){if(h<65537&&(c.subarray&&r||!c.subarray&&s))return String.fromCharCode.apply(null,n.shrinkBuf(c,h));for(var u="",p=0;p<h;p++)u+=String.fromCharCode(c[p]);return u}a[254]=a[254]=1,e.string2buf=function(c){var h,u,p,d,g,v=c.length,m=0;for(d=0;d<v;d++)(64512&(u=c.charCodeAt(d)))==55296&&d+1<v&&(64512&(p=c.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(p-56320),d++),m+=u<128?1:u<2048?2:u<65536?3:4;for(h=new n.Buf8(m),d=g=0;g<m;d++)(64512&(u=c.charCodeAt(d)))==55296&&d+1<v&&(64512&(p=c.charCodeAt(d+1)))==56320&&(u=65536+(u-55296<<10)+(p-56320),d++),u<128?h[g++]=u:(u<2048?h[g++]=192|u>>>6:(u<65536?h[g++]=224|u>>>12:(h[g++]=240|u>>>18,h[g++]=128|u>>>12&63),h[g++]=128|u>>>6&63),h[g++]=128|63&u);return h},e.buf2binstring=function(c){return l(c,c.length)},e.binstring2buf=function(c){for(var h=new n.Buf8(c.length),u=0,p=h.length;u<p;u++)h[u]=c.charCodeAt(u);return h},e.buf2string=function(c,h){var u,p,d,g,v=h||c.length,m=new Array(2*v);for(u=p=0;u<v;)if((d=c[u++])<128)m[p++]=d;else if(4<(g=a[d]))m[p++]=65533,u+=g-1;else{for(d&=g===2?31:g===3?15:7;1<g&&u<v;)d=d<<6|63&c[u++],g--;1<g?m[p++]=65533:d<65536?m[p++]=d:(d-=65536,m[p++]=55296|d>>10&1023,m[p++]=56320|1023&d)}return l(m,p)},e.utf8border=function(c,h){var u;for((h=h||c.length)>c.length&&(h=c.length),u=h-1;0<=u&&(192&c[u])==128;)u--;return u<0||u===0?h:u+a[c[u]]>h?u:h}},{"./common":41}],43:[function(i,t,e){"use strict";t.exports=function(n,s,r,a){for(var o=65535&n|0,l=n>>>16&65535|0,c=0;r!==0;){for(r-=c=2e3<r?2e3:r;l=l+(o=o+s[a++]|0)|0,--c;);o%=65521,l%=65521}return o|l<<16|0}},{}],44:[function(i,t,e){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(i,t,e){"use strict";var n=function(){for(var s,r=[],a=0;a<256;a++){s=a;for(var o=0;o<8;o++)s=1&s?3988292384^s>>>1:s>>>1;r[a]=s}return r}();t.exports=function(s,r,a,o){var l=n,c=o+a;s^=-1;for(var h=o;h<c;h++)s=s>>>8^l[255&(s^r[h])];return-1^s}},{}],46:[function(i,t,e){"use strict";var n,s=i("../utils/common"),r=i("./trees"),a=i("./adler32"),o=i("./crc32"),l=i("./messages"),c=0,h=4,u=0,p=-2,d=-1,g=4,v=2,m=8,f=9,M=286,x=30,T=19,L=2*M+1,P=15,A=3,V=258,R=V+A+1,S=42,D=113,b=1,$=2,B=3,U=4;function J(_,q){return _.msg=l[q],q}function Y(_){return(_<<1)-(4<_?9:0)}function et(_){for(var q=_.length;0<=--q;)_[q]=0}function N(_){var q=_.state,O=q.pending;O>_.avail_out&&(O=_.avail_out),O!==0&&(s.arraySet(_.output,q.pending_buf,q.pending_out,O,_.next_out),_.next_out+=O,q.pending_out+=O,_.total_out+=O,_.avail_out-=O,q.pending-=O,q.pending===0&&(q.pending_out=0))}function k(_,q){r._tr_flush_block(_,0<=_.block_start?_.block_start:-1,_.strstart-_.block_start,q),_.block_start=_.strstart,N(_.strm)}function it(_,q){_.pending_buf[_.pending++]=q}function st(_,q){_.pending_buf[_.pending++]=q>>>8&255,_.pending_buf[_.pending++]=255&q}function G(_,q){var O,C,w=_.max_chain_length,H=_.strstart,K=_.prev_length,E=_.nice_match,y=_.strstart>_.w_size-R?_.strstart-(_.w_size-R):0,F=_.window,Q=_.w_mask,j=_.prev,nt=_.strstart+V,vt=F[H+K-1],ht=F[H+K];_.prev_length>=_.good_match&&(w>>=2),E>_.lookahead&&(E=_.lookahead);do if(F[(O=q)+K]===ht&&F[O+K-1]===vt&&F[O]===F[H]&&F[++O]===F[H+1]){H+=2,O++;do;while(F[++H]===F[++O]&&F[++H]===F[++O]&&F[++H]===F[++O]&&F[++H]===F[++O]&&F[++H]===F[++O]&&F[++H]===F[++O]&&F[++H]===F[++O]&&F[++H]===F[++O]&&H<nt);if(C=V-(nt-H),H=nt-V,K<C){if(_.match_start=q,E<=(K=C))break;vt=F[H+K-1],ht=F[H+K]}}while((q=j[q&Q])>y&&--w!=0);return K<=_.lookahead?K:_.lookahead}function ct(_){var q,O,C,w,H,K,E,y,F,Q,j=_.w_size;do{if(w=_.window_size-_.lookahead-_.strstart,_.strstart>=j+(j-R)){for(s.arraySet(_.window,_.window,j,j,0),_.match_start-=j,_.strstart-=j,_.block_start-=j,q=O=_.hash_size;C=_.head[--q],_.head[q]=j<=C?C-j:0,--O;);for(q=O=j;C=_.prev[--q],_.prev[q]=j<=C?C-j:0,--O;);w+=j}if(_.strm.avail_in===0)break;if(K=_.strm,E=_.window,y=_.strstart+_.lookahead,F=w,Q=void 0,Q=K.avail_in,F<Q&&(Q=F),O=Q===0?0:(K.avail_in-=Q,s.arraySet(E,K.input,K.next_in,Q,y),K.state.wrap===1?K.adler=a(K.adler,E,Q,y):K.state.wrap===2&&(K.adler=o(K.adler,E,Q,y)),K.next_in+=Q,K.total_in+=Q,Q),_.lookahead+=O,_.lookahead+_.insert>=A)for(H=_.strstart-_.insert,_.ins_h=_.window[H],_.ins_h=(_.ins_h<<_.hash_shift^_.window[H+1])&_.hash_mask;_.insert&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[H+A-1])&_.hash_mask,_.prev[H&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=H,H++,_.insert--,!(_.lookahead+_.insert<A)););}while(_.lookahead<R&&_.strm.avail_in!==0)}function _t(_,q){for(var O,C;;){if(_.lookahead<R){if(ct(_),_.lookahead<R&&q===c)return b;if(_.lookahead===0)break}if(O=0,_.lookahead>=A&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+A-1])&_.hash_mask,O=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart),O!==0&&_.strstart-O<=_.w_size-R&&(_.match_length=G(_,O)),_.match_length>=A)if(C=r._tr_tally(_,_.strstart-_.match_start,_.match_length-A),_.lookahead-=_.match_length,_.match_length<=_.max_lazy_match&&_.lookahead>=A){for(_.match_length--;_.strstart++,_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+A-1])&_.hash_mask,O=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart,--_.match_length!=0;);_.strstart++}else _.strstart+=_.match_length,_.match_length=0,_.ins_h=_.window[_.strstart],_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+1])&_.hash_mask;else C=r._tr_tally(_,0,_.window[_.strstart]),_.lookahead--,_.strstart++;if(C&&(k(_,!1),_.strm.avail_out===0))return b}return _.insert=_.strstart<A-1?_.strstart:A-1,q===h?(k(_,!0),_.strm.avail_out===0?B:U):_.last_lit&&(k(_,!1),_.strm.avail_out===0)?b:$}function pt(_,q){for(var O,C,w;;){if(_.lookahead<R){if(ct(_),_.lookahead<R&&q===c)return b;if(_.lookahead===0)break}if(O=0,_.lookahead>=A&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+A-1])&_.hash_mask,O=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart),_.prev_length=_.match_length,_.prev_match=_.match_start,_.match_length=A-1,O!==0&&_.prev_length<_.max_lazy_match&&_.strstart-O<=_.w_size-R&&(_.match_length=G(_,O),_.match_length<=5&&(_.strategy===1||_.match_length===A&&4096<_.strstart-_.match_start)&&(_.match_length=A-1)),_.prev_length>=A&&_.match_length<=_.prev_length){for(w=_.strstart+_.lookahead-A,C=r._tr_tally(_,_.strstart-1-_.prev_match,_.prev_length-A),_.lookahead-=_.prev_length-1,_.prev_length-=2;++_.strstart<=w&&(_.ins_h=(_.ins_h<<_.hash_shift^_.window[_.strstart+A-1])&_.hash_mask,O=_.prev[_.strstart&_.w_mask]=_.head[_.ins_h],_.head[_.ins_h]=_.strstart),--_.prev_length!=0;);if(_.match_available=0,_.match_length=A-1,_.strstart++,C&&(k(_,!1),_.strm.avail_out===0))return b}else if(_.match_available){if((C=r._tr_tally(_,0,_.window[_.strstart-1]))&&k(_,!1),_.strstart++,_.lookahead--,_.strm.avail_out===0)return b}else _.match_available=1,_.strstart++,_.lookahead--}return _.match_available&&(C=r._tr_tally(_,0,_.window[_.strstart-1]),_.match_available=0),_.insert=_.strstart<A-1?_.strstart:A-1,q===h?(k(_,!0),_.strm.avail_out===0?B:U):_.last_lit&&(k(_,!1),_.strm.avail_out===0)?b:$}function ft(_,q,O,C,w){this.good_length=_,this.max_lazy=q,this.nice_length=O,this.max_chain=C,this.func=w}function Tt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=m,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new s.Buf16(2*L),this.dyn_dtree=new s.Buf16(2*(2*x+1)),this.bl_tree=new s.Buf16(2*(2*T+1)),et(this.dyn_ltree),et(this.dyn_dtree),et(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new s.Buf16(P+1),this.heap=new s.Buf16(2*M+1),et(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new s.Buf16(2*M+1),et(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function At(_){var q;return _&&_.state?(_.total_in=_.total_out=0,_.data_type=v,(q=_.state).pending=0,q.pending_out=0,q.wrap<0&&(q.wrap=-q.wrap),q.status=q.wrap?S:D,_.adler=q.wrap===2?0:1,q.last_flush=c,r._tr_init(q),u):J(_,p)}function wt(_){var q=At(_);return q===u&&function(O){O.window_size=2*O.w_size,et(O.head),O.max_lazy_match=n[O.level].max_lazy,O.good_match=n[O.level].good_length,O.nice_match=n[O.level].nice_length,O.max_chain_length=n[O.level].max_chain,O.strstart=0,O.block_start=0,O.lookahead=0,O.insert=0,O.match_length=O.prev_length=A-1,O.match_available=0,O.ins_h=0}(_.state),q}function It(_,q,O,C,w,H){if(!_)return p;var K=1;if(q===d&&(q=6),C<0?(K=0,C=-C):15<C&&(K=2,C-=16),w<1||f<w||O!==m||C<8||15<C||q<0||9<q||H<0||g<H)return J(_,p);C===8&&(C=9);var E=new Tt;return(_.state=E).strm=_,E.wrap=K,E.gzhead=null,E.w_bits=C,E.w_size=1<<E.w_bits,E.w_mask=E.w_size-1,E.hash_bits=w+7,E.hash_size=1<<E.hash_bits,E.hash_mask=E.hash_size-1,E.hash_shift=~~((E.hash_bits+A-1)/A),E.window=new s.Buf8(2*E.w_size),E.head=new s.Buf16(E.hash_size),E.prev=new s.Buf16(E.w_size),E.lit_bufsize=1<<w+6,E.pending_buf_size=4*E.lit_bufsize,E.pending_buf=new s.Buf8(E.pending_buf_size),E.d_buf=1*E.lit_bufsize,E.l_buf=3*E.lit_bufsize,E.level=q,E.strategy=H,E.method=O,wt(_)}n=[new ft(0,0,0,0,function(_,q){var O=65535;for(O>_.pending_buf_size-5&&(O=_.pending_buf_size-5);;){if(_.lookahead<=1){if(ct(_),_.lookahead===0&&q===c)return b;if(_.lookahead===0)break}_.strstart+=_.lookahead,_.lookahead=0;var C=_.block_start+O;if((_.strstart===0||_.strstart>=C)&&(_.lookahead=_.strstart-C,_.strstart=C,k(_,!1),_.strm.avail_out===0)||_.strstart-_.block_start>=_.w_size-R&&(k(_,!1),_.strm.avail_out===0))return b}return _.insert=0,q===h?(k(_,!0),_.strm.avail_out===0?B:U):(_.strstart>_.block_start&&(k(_,!1),_.strm.avail_out),b)}),new ft(4,4,8,4,_t),new ft(4,5,16,8,_t),new ft(4,6,32,32,_t),new ft(4,4,16,16,pt),new ft(8,16,32,32,pt),new ft(8,16,128,128,pt),new ft(8,32,128,256,pt),new ft(32,128,258,1024,pt),new ft(32,258,258,4096,pt)],e.deflateInit=function(_,q){return It(_,q,m,15,8,0)},e.deflateInit2=It,e.deflateReset=wt,e.deflateResetKeep=At,e.deflateSetHeader=function(_,q){return _&&_.state?_.state.wrap!==2?p:(_.state.gzhead=q,u):p},e.deflate=function(_,q){var O,C,w,H;if(!_||!_.state||5<q||q<0)return _?J(_,p):p;if(C=_.state,!_.output||!_.input&&_.avail_in!==0||C.status===666&&q!==h)return J(_,_.avail_out===0?-5:p);if(C.strm=_,O=C.last_flush,C.last_flush=q,C.status===S)if(C.wrap===2)_.adler=0,it(C,31),it(C,139),it(C,8),C.gzhead?(it(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),it(C,255&C.gzhead.time),it(C,C.gzhead.time>>8&255),it(C,C.gzhead.time>>16&255),it(C,C.gzhead.time>>24&255),it(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),it(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(it(C,255&C.gzhead.extra.length),it(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(_.adler=o(_.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(it(C,0),it(C,0),it(C,0),it(C,0),it(C,0),it(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),it(C,3),C.status=D);else{var K=m+(C.w_bits-8<<4)<<8;K|=(2<=C.strategy||C.level<2?0:C.level<6?1:C.level===6?2:3)<<6,C.strstart!==0&&(K|=32),K+=31-K%31,C.status=D,st(C,K),C.strstart!==0&&(st(C,_.adler>>>16),st(C,65535&_.adler)),_.adler=1}if(C.status===69)if(C.gzhead.extra){for(w=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>w&&(_.adler=o(_.adler,C.pending_buf,C.pending-w,w)),N(_),w=C.pending,C.pending!==C.pending_buf_size));)it(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>w&&(_.adler=o(_.adler,C.pending_buf,C.pending-w,w)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(C.status===73)if(C.gzhead.name){w=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>w&&(_.adler=o(_.adler,C.pending_buf,C.pending-w,w)),N(_),w=C.pending,C.pending===C.pending_buf_size)){H=1;break}H=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,it(C,H)}while(H!==0);C.gzhead.hcrc&&C.pending>w&&(_.adler=o(_.adler,C.pending_buf,C.pending-w,w)),H===0&&(C.gzindex=0,C.status=91)}else C.status=91;if(C.status===91)if(C.gzhead.comment){w=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>w&&(_.adler=o(_.adler,C.pending_buf,C.pending-w,w)),N(_),w=C.pending,C.pending===C.pending_buf_size)){H=1;break}H=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,it(C,H)}while(H!==0);C.gzhead.hcrc&&C.pending>w&&(_.adler=o(_.adler,C.pending_buf,C.pending-w,w)),H===0&&(C.status=103)}else C.status=103;if(C.status===103&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&N(_),C.pending+2<=C.pending_buf_size&&(it(C,255&_.adler),it(C,_.adler>>8&255),_.adler=0,C.status=D)):C.status=D),C.pending!==0){if(N(_),_.avail_out===0)return C.last_flush=-1,u}else if(_.avail_in===0&&Y(q)<=Y(O)&&q!==h)return J(_,-5);if(C.status===666&&_.avail_in!==0)return J(_,-5);if(_.avail_in!==0||C.lookahead!==0||q!==c&&C.status!==666){var E=C.strategy===2?function(y,F){for(var Q;;){if(y.lookahead===0&&(ct(y),y.lookahead===0)){if(F===c)return b;break}if(y.match_length=0,Q=r._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++,Q&&(k(y,!1),y.strm.avail_out===0))return b}return y.insert=0,F===h?(k(y,!0),y.strm.avail_out===0?B:U):y.last_lit&&(k(y,!1),y.strm.avail_out===0)?b:$}(C,q):C.strategy===3?function(y,F){for(var Q,j,nt,vt,ht=y.window;;){if(y.lookahead<=V){if(ct(y),y.lookahead<=V&&F===c)return b;if(y.lookahead===0)break}if(y.match_length=0,y.lookahead>=A&&0<y.strstart&&(j=ht[nt=y.strstart-1])===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]){vt=y.strstart+V;do;while(j===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]&&j===ht[++nt]&&nt<vt);y.match_length=V-(vt-nt),y.match_length>y.lookahead&&(y.match_length=y.lookahead)}if(y.match_length>=A?(Q=r._tr_tally(y,1,y.match_length-A),y.lookahead-=y.match_length,y.strstart+=y.match_length,y.match_length=0):(Q=r._tr_tally(y,0,y.window[y.strstart]),y.lookahead--,y.strstart++),Q&&(k(y,!1),y.strm.avail_out===0))return b}return y.insert=0,F===h?(k(y,!0),y.strm.avail_out===0?B:U):y.last_lit&&(k(y,!1),y.strm.avail_out===0)?b:$}(C,q):n[C.level].func(C,q);if(E!==B&&E!==U||(C.status=666),E===b||E===B)return _.avail_out===0&&(C.last_flush=-1),u;if(E===$&&(q===1?r._tr_align(C):q!==5&&(r._tr_stored_block(C,0,0,!1),q===3&&(et(C.head),C.lookahead===0&&(C.strstart=0,C.block_start=0,C.insert=0))),N(_),_.avail_out===0))return C.last_flush=-1,u}return q!==h?u:C.wrap<=0?1:(C.wrap===2?(it(C,255&_.adler),it(C,_.adler>>8&255),it(C,_.adler>>16&255),it(C,_.adler>>24&255),it(C,255&_.total_in),it(C,_.total_in>>8&255),it(C,_.total_in>>16&255),it(C,_.total_in>>24&255)):(st(C,_.adler>>>16),st(C,65535&_.adler)),N(_),0<C.wrap&&(C.wrap=-C.wrap),C.pending!==0?u:1)},e.deflateEnd=function(_){var q;return _&&_.state?(q=_.state.status)!==S&&q!==69&&q!==73&&q!==91&&q!==103&&q!==D&&q!==666?J(_,p):(_.state=null,q===D?J(_,-3):u):p},e.deflateSetDictionary=function(_,q){var O,C,w,H,K,E,y,F,Q=q.length;if(!_||!_.state||(H=(O=_.state).wrap)===2||H===1&&O.status!==S||O.lookahead)return p;for(H===1&&(_.adler=a(_.adler,q,Q,0)),O.wrap=0,Q>=O.w_size&&(H===0&&(et(O.head),O.strstart=0,O.block_start=0,O.insert=0),F=new s.Buf8(O.w_size),s.arraySet(F,q,Q-O.w_size,O.w_size,0),q=F,Q=O.w_size),K=_.avail_in,E=_.next_in,y=_.input,_.avail_in=Q,_.next_in=0,_.input=q,ct(O);O.lookahead>=A;){for(C=O.strstart,w=O.lookahead-(A-1);O.ins_h=(O.ins_h<<O.hash_shift^O.window[C+A-1])&O.hash_mask,O.prev[C&O.w_mask]=O.head[O.ins_h],O.head[O.ins_h]=C,C++,--w;);O.strstart=C,O.lookahead=A-1,ct(O)}return O.strstart+=O.lookahead,O.block_start=O.strstart,O.insert=O.lookahead,O.lookahead=0,O.match_length=O.prev_length=A-1,O.match_available=0,_.next_in=E,_.input=y,_.avail_in=K,O.wrap=H,u},e.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(i,t,e){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(i,t,e){"use strict";t.exports=function(n,s){var r,a,o,l,c,h,u,p,d,g,v,m,f,M,x,T,L,P,A,V,R,S,D,b,$;r=n.state,a=n.next_in,b=n.input,o=a+(n.avail_in-5),l=n.next_out,$=n.output,c=l-(s-n.avail_out),h=l+(n.avail_out-257),u=r.dmax,p=r.wsize,d=r.whave,g=r.wnext,v=r.window,m=r.hold,f=r.bits,M=r.lencode,x=r.distcode,T=(1<<r.lenbits)-1,L=(1<<r.distbits)-1;t:do{f<15&&(m+=b[a++]<<f,f+=8,m+=b[a++]<<f,f+=8),P=M[m&T];e:for(;;){if(m>>>=A=P>>>24,f-=A,(A=P>>>16&255)===0)$[l++]=65535&P;else{if(!(16&A)){if(!(64&A)){P=M[(65535&P)+(m&(1<<A)-1)];continue e}if(32&A){r.mode=12;break t}n.msg="invalid literal/length code",r.mode=30;break t}V=65535&P,(A&=15)&&(f<A&&(m+=b[a++]<<f,f+=8),V+=m&(1<<A)-1,m>>>=A,f-=A),f<15&&(m+=b[a++]<<f,f+=8,m+=b[a++]<<f,f+=8),P=x[m&L];n:for(;;){if(m>>>=A=P>>>24,f-=A,!(16&(A=P>>>16&255))){if(!(64&A)){P=x[(65535&P)+(m&(1<<A)-1)];continue n}n.msg="invalid distance code",r.mode=30;break t}if(R=65535&P,f<(A&=15)&&(m+=b[a++]<<f,(f+=8)<A&&(m+=b[a++]<<f,f+=8)),u<(R+=m&(1<<A)-1)){n.msg="invalid distance too far back",r.mode=30;break t}if(m>>>=A,f-=A,(A=l-c)<R){if(d<(A=R-A)&&r.sane){n.msg="invalid distance too far back",r.mode=30;break t}if(D=v,(S=0)===g){if(S+=p-A,A<V){for(V-=A;$[l++]=v[S++],--A;);S=l-R,D=$}}else if(g<A){if(S+=p+g-A,(A-=g)<V){for(V-=A;$[l++]=v[S++],--A;);if(S=0,g<V){for(V-=A=g;$[l++]=v[S++],--A;);S=l-R,D=$}}}else if(S+=g-A,A<V){for(V-=A;$[l++]=v[S++],--A;);S=l-R,D=$}for(;2<V;)$[l++]=D[S++],$[l++]=D[S++],$[l++]=D[S++],V-=3;V&&($[l++]=D[S++],1<V&&($[l++]=D[S++]))}else{for(S=l-R;$[l++]=$[S++],$[l++]=$[S++],$[l++]=$[S++],2<(V-=3););V&&($[l++]=$[S++],1<V&&($[l++]=$[S++]))}break}}break}}while(a<o&&l<h);a-=V=f>>3,m&=(1<<(f-=V<<3))-1,n.next_in=a,n.next_out=l,n.avail_in=a<o?o-a+5:5-(a-o),n.avail_out=l<h?h-l+257:257-(l-h),r.hold=m,r.bits=f}},{}],49:[function(i,t,e){"use strict";var n=i("../utils/common"),s=i("./adler32"),r=i("./crc32"),a=i("./inffast"),o=i("./inftrees"),l=1,c=2,h=0,u=-2,p=1,d=852,g=592;function v(S){return(S>>>24&255)+(S>>>8&65280)+((65280&S)<<8)+((255&S)<<24)}function m(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new n.Buf16(320),this.work=new n.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(S){var D;return S&&S.state?(D=S.state,S.total_in=S.total_out=D.total=0,S.msg="",D.wrap&&(S.adler=1&D.wrap),D.mode=p,D.last=0,D.havedict=0,D.dmax=32768,D.head=null,D.hold=0,D.bits=0,D.lencode=D.lendyn=new n.Buf32(d),D.distcode=D.distdyn=new n.Buf32(g),D.sane=1,D.back=-1,h):u}function M(S){var D;return S&&S.state?((D=S.state).wsize=0,D.whave=0,D.wnext=0,f(S)):u}function x(S,D){var b,$;return S&&S.state?($=S.state,D<0?(b=0,D=-D):(b=1+(D>>4),D<48&&(D&=15)),D&&(D<8||15<D)?u:($.window!==null&&$.wbits!==D&&($.window=null),$.wrap=b,$.wbits=D,M(S))):u}function T(S,D){var b,$;return S?($=new m,(S.state=$).window=null,(b=x(S,D))!==h&&(S.state=null),b):u}var L,P,A=!0;function V(S){if(A){var D;for(L=new n.Buf32(512),P=new n.Buf32(32),D=0;D<144;)S.lens[D++]=8;for(;D<256;)S.lens[D++]=9;for(;D<280;)S.lens[D++]=7;for(;D<288;)S.lens[D++]=8;for(o(l,S.lens,0,288,L,0,S.work,{bits:9}),D=0;D<32;)S.lens[D++]=5;o(c,S.lens,0,32,P,0,S.work,{bits:5}),A=!1}S.lencode=L,S.lenbits=9,S.distcode=P,S.distbits=5}function R(S,D,b,$){var B,U=S.state;return U.window===null&&(U.wsize=1<<U.wbits,U.wnext=0,U.whave=0,U.window=new n.Buf8(U.wsize)),$>=U.wsize?(n.arraySet(U.window,D,b-U.wsize,U.wsize,0),U.wnext=0,U.whave=U.wsize):($<(B=U.wsize-U.wnext)&&(B=$),n.arraySet(U.window,D,b-$,B,U.wnext),($-=B)?(n.arraySet(U.window,D,b-$,$,0),U.wnext=$,U.whave=U.wsize):(U.wnext+=B,U.wnext===U.wsize&&(U.wnext=0),U.whave<U.wsize&&(U.whave+=B))),0}e.inflateReset=M,e.inflateReset2=x,e.inflateResetKeep=f,e.inflateInit=function(S){return T(S,15)},e.inflateInit2=T,e.inflate=function(S,D){var b,$,B,U,J,Y,et,N,k,it,st,G,ct,_t,pt,ft,Tt,At,wt,It,_,q,O,C,w=0,H=new n.Buf8(4),K=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!S||!S.state||!S.output||!S.input&&S.avail_in!==0)return u;(b=S.state).mode===12&&(b.mode=13),J=S.next_out,B=S.output,et=S.avail_out,U=S.next_in,$=S.input,Y=S.avail_in,N=b.hold,k=b.bits,it=Y,st=et,q=h;t:for(;;)switch(b.mode){case p:if(b.wrap===0){b.mode=13;break}for(;k<16;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(2&b.wrap&&N===35615){H[b.check=0]=255&N,H[1]=N>>>8&255,b.check=r(b.check,H,2,0),k=N=0,b.mode=2;break}if(b.flags=0,b.head&&(b.head.done=!1),!(1&b.wrap)||(((255&N)<<8)+(N>>8))%31){S.msg="incorrect header check",b.mode=30;break}if((15&N)!=8){S.msg="unknown compression method",b.mode=30;break}if(k-=4,_=8+(15&(N>>>=4)),b.wbits===0)b.wbits=_;else if(_>b.wbits){S.msg="invalid window size",b.mode=30;break}b.dmax=1<<_,S.adler=b.check=1,b.mode=512&N?10:12,k=N=0;break;case 2:for(;k<16;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(b.flags=N,(255&b.flags)!=8){S.msg="unknown compression method",b.mode=30;break}if(57344&b.flags){S.msg="unknown header flags set",b.mode=30;break}b.head&&(b.head.text=N>>8&1),512&b.flags&&(H[0]=255&N,H[1]=N>>>8&255,b.check=r(b.check,H,2,0)),k=N=0,b.mode=3;case 3:for(;k<32;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}b.head&&(b.head.time=N),512&b.flags&&(H[0]=255&N,H[1]=N>>>8&255,H[2]=N>>>16&255,H[3]=N>>>24&255,b.check=r(b.check,H,4,0)),k=N=0,b.mode=4;case 4:for(;k<16;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}b.head&&(b.head.xflags=255&N,b.head.os=N>>8),512&b.flags&&(H[0]=255&N,H[1]=N>>>8&255,b.check=r(b.check,H,2,0)),k=N=0,b.mode=5;case 5:if(1024&b.flags){for(;k<16;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}b.length=N,b.head&&(b.head.extra_len=N),512&b.flags&&(H[0]=255&N,H[1]=N>>>8&255,b.check=r(b.check,H,2,0)),k=N=0}else b.head&&(b.head.extra=null);b.mode=6;case 6:if(1024&b.flags&&(Y<(G=b.length)&&(G=Y),G&&(b.head&&(_=b.head.extra_len-b.length,b.head.extra||(b.head.extra=new Array(b.head.extra_len)),n.arraySet(b.head.extra,$,U,G,_)),512&b.flags&&(b.check=r(b.check,$,G,U)),Y-=G,U+=G,b.length-=G),b.length))break t;b.length=0,b.mode=7;case 7:if(2048&b.flags){if(Y===0)break t;for(G=0;_=$[U+G++],b.head&&_&&b.length<65536&&(b.head.name+=String.fromCharCode(_)),_&&G<Y;);if(512&b.flags&&(b.check=r(b.check,$,G,U)),Y-=G,U+=G,_)break t}else b.head&&(b.head.name=null);b.length=0,b.mode=8;case 8:if(4096&b.flags){if(Y===0)break t;for(G=0;_=$[U+G++],b.head&&_&&b.length<65536&&(b.head.comment+=String.fromCharCode(_)),_&&G<Y;);if(512&b.flags&&(b.check=r(b.check,$,G,U)),Y-=G,U+=G,_)break t}else b.head&&(b.head.comment=null);b.mode=9;case 9:if(512&b.flags){for(;k<16;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(N!==(65535&b.check)){S.msg="header crc mismatch",b.mode=30;break}k=N=0}b.head&&(b.head.hcrc=b.flags>>9&1,b.head.done=!0),S.adler=b.check=0,b.mode=12;break;case 10:for(;k<32;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}S.adler=b.check=v(N),k=N=0,b.mode=11;case 11:if(b.havedict===0)return S.next_out=J,S.avail_out=et,S.next_in=U,S.avail_in=Y,b.hold=N,b.bits=k,2;S.adler=b.check=1,b.mode=12;case 12:if(D===5||D===6)break t;case 13:if(b.last){N>>>=7&k,k-=7&k,b.mode=27;break}for(;k<3;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}switch(b.last=1&N,k-=1,3&(N>>>=1)){case 0:b.mode=14;break;case 1:if(V(b),b.mode=20,D!==6)break;N>>>=2,k-=2;break t;case 2:b.mode=17;break;case 3:S.msg="invalid block type",b.mode=30}N>>>=2,k-=2;break;case 14:for(N>>>=7&k,k-=7&k;k<32;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if((65535&N)!=(N>>>16^65535)){S.msg="invalid stored block lengths",b.mode=30;break}if(b.length=65535&N,k=N=0,b.mode=15,D===6)break t;case 15:b.mode=16;case 16:if(G=b.length){if(Y<G&&(G=Y),et<G&&(G=et),G===0)break t;n.arraySet(B,$,U,G,J),Y-=G,U+=G,et-=G,J+=G,b.length-=G;break}b.mode=12;break;case 17:for(;k<14;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(b.nlen=257+(31&N),N>>>=5,k-=5,b.ndist=1+(31&N),N>>>=5,k-=5,b.ncode=4+(15&N),N>>>=4,k-=4,286<b.nlen||30<b.ndist){S.msg="too many length or distance symbols",b.mode=30;break}b.have=0,b.mode=18;case 18:for(;b.have<b.ncode;){for(;k<3;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}b.lens[K[b.have++]]=7&N,N>>>=3,k-=3}for(;b.have<19;)b.lens[K[b.have++]]=0;if(b.lencode=b.lendyn,b.lenbits=7,O={bits:b.lenbits},q=o(0,b.lens,0,19,b.lencode,0,b.work,O),b.lenbits=O.bits,q){S.msg="invalid code lengths set",b.mode=30;break}b.have=0,b.mode=19;case 19:for(;b.have<b.nlen+b.ndist;){for(;ft=(w=b.lencode[N&(1<<b.lenbits)-1])>>>16&255,Tt=65535&w,!((pt=w>>>24)<=k);){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(Tt<16)N>>>=pt,k-=pt,b.lens[b.have++]=Tt;else{if(Tt===16){for(C=pt+2;k<C;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(N>>>=pt,k-=pt,b.have===0){S.msg="invalid bit length repeat",b.mode=30;break}_=b.lens[b.have-1],G=3+(3&N),N>>>=2,k-=2}else if(Tt===17){for(C=pt+3;k<C;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}k-=pt,_=0,G=3+(7&(N>>>=pt)),N>>>=3,k-=3}else{for(C=pt+7;k<C;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}k-=pt,_=0,G=11+(127&(N>>>=pt)),N>>>=7,k-=7}if(b.have+G>b.nlen+b.ndist){S.msg="invalid bit length repeat",b.mode=30;break}for(;G--;)b.lens[b.have++]=_}}if(b.mode===30)break;if(b.lens[256]===0){S.msg="invalid code -- missing end-of-block",b.mode=30;break}if(b.lenbits=9,O={bits:b.lenbits},q=o(l,b.lens,0,b.nlen,b.lencode,0,b.work,O),b.lenbits=O.bits,q){S.msg="invalid literal/lengths set",b.mode=30;break}if(b.distbits=6,b.distcode=b.distdyn,O={bits:b.distbits},q=o(c,b.lens,b.nlen,b.ndist,b.distcode,0,b.work,O),b.distbits=O.bits,q){S.msg="invalid distances set",b.mode=30;break}if(b.mode=20,D===6)break t;case 20:b.mode=21;case 21:if(6<=Y&&258<=et){S.next_out=J,S.avail_out=et,S.next_in=U,S.avail_in=Y,b.hold=N,b.bits=k,a(S,st),J=S.next_out,B=S.output,et=S.avail_out,U=S.next_in,$=S.input,Y=S.avail_in,N=b.hold,k=b.bits,b.mode===12&&(b.back=-1);break}for(b.back=0;ft=(w=b.lencode[N&(1<<b.lenbits)-1])>>>16&255,Tt=65535&w,!((pt=w>>>24)<=k);){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(ft&&!(240&ft)){for(At=pt,wt=ft,It=Tt;ft=(w=b.lencode[It+((N&(1<<At+wt)-1)>>At)])>>>16&255,Tt=65535&w,!(At+(pt=w>>>24)<=k);){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}N>>>=At,k-=At,b.back+=At}if(N>>>=pt,k-=pt,b.back+=pt,b.length=Tt,ft===0){b.mode=26;break}if(32&ft){b.back=-1,b.mode=12;break}if(64&ft){S.msg="invalid literal/length code",b.mode=30;break}b.extra=15&ft,b.mode=22;case 22:if(b.extra){for(C=b.extra;k<C;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}b.length+=N&(1<<b.extra)-1,N>>>=b.extra,k-=b.extra,b.back+=b.extra}b.was=b.length,b.mode=23;case 23:for(;ft=(w=b.distcode[N&(1<<b.distbits)-1])>>>16&255,Tt=65535&w,!((pt=w>>>24)<=k);){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(!(240&ft)){for(At=pt,wt=ft,It=Tt;ft=(w=b.distcode[It+((N&(1<<At+wt)-1)>>At)])>>>16&255,Tt=65535&w,!(At+(pt=w>>>24)<=k);){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}N>>>=At,k-=At,b.back+=At}if(N>>>=pt,k-=pt,b.back+=pt,64&ft){S.msg="invalid distance code",b.mode=30;break}b.offset=Tt,b.extra=15&ft,b.mode=24;case 24:if(b.extra){for(C=b.extra;k<C;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}b.offset+=N&(1<<b.extra)-1,N>>>=b.extra,k-=b.extra,b.back+=b.extra}if(b.offset>b.dmax){S.msg="invalid distance too far back",b.mode=30;break}b.mode=25;case 25:if(et===0)break t;if(G=st-et,b.offset>G){if((G=b.offset-G)>b.whave&&b.sane){S.msg="invalid distance too far back",b.mode=30;break}ct=G>b.wnext?(G-=b.wnext,b.wsize-G):b.wnext-G,G>b.length&&(G=b.length),_t=b.window}else _t=B,ct=J-b.offset,G=b.length;for(et<G&&(G=et),et-=G,b.length-=G;B[J++]=_t[ct++],--G;);b.length===0&&(b.mode=21);break;case 26:if(et===0)break t;B[J++]=b.length,et--,b.mode=21;break;case 27:if(b.wrap){for(;k<32;){if(Y===0)break t;Y--,N|=$[U++]<<k,k+=8}if(st-=et,S.total_out+=st,b.total+=st,st&&(S.adler=b.check=b.flags?r(b.check,B,st,J-st):s(b.check,B,st,J-st)),st=et,(b.flags?N:v(N))!==b.check){S.msg="incorrect data check",b.mode=30;break}k=N=0}b.mode=28;case 28:if(b.wrap&&b.flags){for(;k<32;){if(Y===0)break t;Y--,N+=$[U++]<<k,k+=8}if(N!==(4294967295&b.total)){S.msg="incorrect length check",b.mode=30;break}k=N=0}b.mode=29;case 29:q=1;break t;case 30:q=-3;break t;case 31:return-4;case 32:default:return u}return S.next_out=J,S.avail_out=et,S.next_in=U,S.avail_in=Y,b.hold=N,b.bits=k,(b.wsize||st!==S.avail_out&&b.mode<30&&(b.mode<27||D!==4))&&R(S,S.output,S.next_out,st-S.avail_out)?(b.mode=31,-4):(it-=S.avail_in,st-=S.avail_out,S.total_in+=it,S.total_out+=st,b.total+=st,b.wrap&&st&&(S.adler=b.check=b.flags?r(b.check,B,st,S.next_out-st):s(b.check,B,st,S.next_out-st)),S.data_type=b.bits+(b.last?64:0)+(b.mode===12?128:0)+(b.mode===20||b.mode===15?256:0),(it==0&&st===0||D===4)&&q===h&&(q=-5),q)},e.inflateEnd=function(S){if(!S||!S.state)return u;var D=S.state;return D.window&&(D.window=null),S.state=null,h},e.inflateGetHeader=function(S,D){var b;return S&&S.state&&2&(b=S.state).wrap?((b.head=D).done=!1,h):u},e.inflateSetDictionary=function(S,D){var b,$=D.length;return S&&S.state?(b=S.state).wrap!==0&&b.mode!==11?u:b.mode===11&&s(1,D,$,0)!==b.check?-3:R(S,D,$,$)?(b.mode=31,-4):(b.havedict=1,h):u},e.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(i,t,e){"use strict";var n=i("../utils/common"),s=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],r=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],a=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],o=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(l,c,h,u,p,d,g,v){var m,f,M,x,T,L,P,A,V,R=v.bits,S=0,D=0,b=0,$=0,B=0,U=0,J=0,Y=0,et=0,N=0,k=null,it=0,st=new n.Buf16(16),G=new n.Buf16(16),ct=null,_t=0;for(S=0;S<=15;S++)st[S]=0;for(D=0;D<u;D++)st[c[h+D]]++;for(B=R,$=15;1<=$&&st[$]===0;$--);if($<B&&(B=$),$===0)return p[d++]=20971520,p[d++]=20971520,v.bits=1,0;for(b=1;b<$&&st[b]===0;b++);for(B<b&&(B=b),S=Y=1;S<=15;S++)if(Y<<=1,(Y-=st[S])<0)return-1;if(0<Y&&(l===0||$!==1))return-1;for(G[1]=0,S=1;S<15;S++)G[S+1]=G[S]+st[S];for(D=0;D<u;D++)c[h+D]!==0&&(g[G[c[h+D]]++]=D);if(L=l===0?(k=ct=g,19):l===1?(k=s,it-=257,ct=r,_t-=257,256):(k=a,ct=o,-1),S=b,T=d,J=D=N=0,M=-1,x=(et=1<<(U=B))-1,l===1&&852<et||l===2&&592<et)return 1;for(;;){for(P=S-J,V=g[D]<L?(A=0,g[D]):g[D]>L?(A=ct[_t+g[D]],k[it+g[D]]):(A=96,0),m=1<<S-J,b=f=1<<U;p[T+(N>>J)+(f-=m)]=P<<24|A<<16|V|0,f!==0;);for(m=1<<S-1;N&m;)m>>=1;if(m!==0?(N&=m-1,N+=m):N=0,D++,--st[S]==0){if(S===$)break;S=c[h+g[D]]}if(B<S&&(N&x)!==M){for(J===0&&(J=B),T+=b,Y=1<<(U=S-J);U+J<$&&!((Y-=st[U+J])<=0);)U++,Y<<=1;if(et+=1<<U,l===1&&852<et||l===2&&592<et)return 1;p[M=N&x]=B<<24|U<<16|T-d|0}}return N!==0&&(p[T+N]=S-J<<24|64<<16|0),v.bits=B,0}},{"../utils/common":41}],51:[function(i,t,e){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(i,t,e){"use strict";var n=i("../utils/common"),s=0,r=1;function a(w){for(var H=w.length;0<=--H;)w[H]=0}var o=0,l=29,c=256,h=c+1+l,u=30,p=19,d=2*h+1,g=15,v=16,m=7,f=256,M=16,x=17,T=18,L=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],P=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],A=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],V=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],R=new Array(2*(h+2));a(R);var S=new Array(2*u);a(S);var D=new Array(512);a(D);var b=new Array(256);a(b);var $=new Array(l);a($);var B,U,J,Y=new Array(u);function et(w,H,K,E,y){this.static_tree=w,this.extra_bits=H,this.extra_base=K,this.elems=E,this.max_length=y,this.has_stree=w&&w.length}function N(w,H){this.dyn_tree=w,this.max_code=0,this.stat_desc=H}function k(w){return w<256?D[w]:D[256+(w>>>7)]}function it(w,H){w.pending_buf[w.pending++]=255&H,w.pending_buf[w.pending++]=H>>>8&255}function st(w,H,K){w.bi_valid>v-K?(w.bi_buf|=H<<w.bi_valid&65535,it(w,w.bi_buf),w.bi_buf=H>>v-w.bi_valid,w.bi_valid+=K-v):(w.bi_buf|=H<<w.bi_valid&65535,w.bi_valid+=K)}function G(w,H,K){st(w,K[2*H],K[2*H+1])}function ct(w,H){for(var K=0;K|=1&w,w>>>=1,K<<=1,0<--H;);return K>>>1}function _t(w,H,K){var E,y,F=new Array(g+1),Q=0;for(E=1;E<=g;E++)F[E]=Q=Q+K[E-1]<<1;for(y=0;y<=H;y++){var j=w[2*y+1];j!==0&&(w[2*y]=ct(F[j]++,j))}}function pt(w){var H;for(H=0;H<h;H++)w.dyn_ltree[2*H]=0;for(H=0;H<u;H++)w.dyn_dtree[2*H]=0;for(H=0;H<p;H++)w.bl_tree[2*H]=0;w.dyn_ltree[2*f]=1,w.opt_len=w.static_len=0,w.last_lit=w.matches=0}function ft(w){8<w.bi_valid?it(w,w.bi_buf):0<w.bi_valid&&(w.pending_buf[w.pending++]=w.bi_buf),w.bi_buf=0,w.bi_valid=0}function Tt(w,H,K,E){var y=2*H,F=2*K;return w[y]<w[F]||w[y]===w[F]&&E[H]<=E[K]}function At(w,H,K){for(var E=w.heap[K],y=K<<1;y<=w.heap_len&&(y<w.heap_len&&Tt(H,w.heap[y+1],w.heap[y],w.depth)&&y++,!Tt(H,E,w.heap[y],w.depth));)w.heap[K]=w.heap[y],K=y,y<<=1;w.heap[K]=E}function wt(w,H,K){var E,y,F,Q,j=0;if(w.last_lit!==0)for(;E=w.pending_buf[w.d_buf+2*j]<<8|w.pending_buf[w.d_buf+2*j+1],y=w.pending_buf[w.l_buf+j],j++,E===0?G(w,y,H):(G(w,(F=b[y])+c+1,H),(Q=L[F])!==0&&st(w,y-=$[F],Q),G(w,F=k(--E),K),(Q=P[F])!==0&&st(w,E-=Y[F],Q)),j<w.last_lit;);G(w,f,H)}function It(w,H){var K,E,y,F=H.dyn_tree,Q=H.stat_desc.static_tree,j=H.stat_desc.has_stree,nt=H.stat_desc.elems,vt=-1;for(w.heap_len=0,w.heap_max=d,K=0;K<nt;K++)F[2*K]!==0?(w.heap[++w.heap_len]=vt=K,w.depth[K]=0):F[2*K+1]=0;for(;w.heap_len<2;)F[2*(y=w.heap[++w.heap_len]=vt<2?++vt:0)]=1,w.depth[y]=0,w.opt_len--,j&&(w.static_len-=Q[2*y+1]);for(H.max_code=vt,K=w.heap_len>>1;1<=K;K--)At(w,F,K);for(y=nt;K=w.heap[1],w.heap[1]=w.heap[w.heap_len--],At(w,F,1),E=w.heap[1],w.heap[--w.heap_max]=K,w.heap[--w.heap_max]=E,F[2*y]=F[2*K]+F[2*E],w.depth[y]=(w.depth[K]>=w.depth[E]?w.depth[K]:w.depth[E])+1,F[2*K+1]=F[2*E+1]=y,w.heap[1]=y++,At(w,F,1),2<=w.heap_len;);w.heap[--w.heap_max]=w.heap[1],function(ht,Mt){var Dt,Ut,ut,Pt,z,dt,gt=Mt.dyn_tree,mt=Mt.max_code,Lt=Mt.stat_desc.static_tree,$t=Mt.stat_desc.has_stree,Jt=Mt.stat_desc.extra_bits,Ht=Mt.stat_desc.extra_base,xt=Mt.stat_desc.max_length,W=0;for(Pt=0;Pt<=g;Pt++)ht.bl_count[Pt]=0;for(gt[2*ht.heap[ht.heap_max]+1]=0,Dt=ht.heap_max+1;Dt<d;Dt++)xt<(Pt=gt[2*gt[2*(Ut=ht.heap[Dt])+1]+1]+1)&&(Pt=xt,W++),gt[2*Ut+1]=Pt,mt<Ut||(ht.bl_count[Pt]++,z=0,Ht<=Ut&&(z=Jt[Ut-Ht]),dt=gt[2*Ut],ht.opt_len+=dt*(Pt+z),$t&&(ht.static_len+=dt*(Lt[2*Ut+1]+z)));if(W!==0){do{for(Pt=xt-1;ht.bl_count[Pt]===0;)Pt--;ht.bl_count[Pt]--,ht.bl_count[Pt+1]+=2,ht.bl_count[xt]--,W-=2}while(0<W);for(Pt=xt;Pt!==0;Pt--)for(Ut=ht.bl_count[Pt];Ut!==0;)mt<(ut=ht.heap[--Dt])||(gt[2*ut+1]!==Pt&&(ht.opt_len+=(Pt-gt[2*ut+1])*gt[2*ut],gt[2*ut+1]=Pt),Ut--)}}(w,H),_t(F,vt,w.bl_count)}function _(w,H,K){var E,y,F=-1,Q=H[1],j=0,nt=7,vt=4;for(Q===0&&(nt=138,vt=3),H[2*(K+1)+1]=65535,E=0;E<=K;E++)y=Q,Q=H[2*(E+1)+1],++j<nt&&y===Q||(j<vt?w.bl_tree[2*y]+=j:y!==0?(y!==F&&w.bl_tree[2*y]++,w.bl_tree[2*M]++):j<=10?w.bl_tree[2*x]++:w.bl_tree[2*T]++,F=y,vt=(j=0)===Q?(nt=138,3):y===Q?(nt=6,3):(nt=7,4))}function q(w,H,K){var E,y,F=-1,Q=H[1],j=0,nt=7,vt=4;for(Q===0&&(nt=138,vt=3),E=0;E<=K;E++)if(y=Q,Q=H[2*(E+1)+1],!(++j<nt&&y===Q)){if(j<vt)for(;G(w,y,w.bl_tree),--j!=0;);else y!==0?(y!==F&&(G(w,y,w.bl_tree),j--),G(w,M,w.bl_tree),st(w,j-3,2)):j<=10?(G(w,x,w.bl_tree),st(w,j-3,3)):(G(w,T,w.bl_tree),st(w,j-11,7));F=y,vt=(j=0)===Q?(nt=138,3):y===Q?(nt=6,3):(nt=7,4)}}a(Y);var O=!1;function C(w,H,K,E){st(w,(o<<1)+(E?1:0),3),function(y,F,Q,j){ft(y),j&&(it(y,Q),it(y,~Q)),n.arraySet(y.pending_buf,y.window,F,Q,y.pending),y.pending+=Q}(w,H,K,!0)}e._tr_init=function(w){O||(function(){var H,K,E,y,F,Q=new Array(g+1);for(y=E=0;y<l-1;y++)for($[y]=E,H=0;H<1<<L[y];H++)b[E++]=y;for(b[E-1]=y,y=F=0;y<16;y++)for(Y[y]=F,H=0;H<1<<P[y];H++)D[F++]=y;for(F>>=7;y<u;y++)for(Y[y]=F<<7,H=0;H<1<<P[y]-7;H++)D[256+F++]=y;for(K=0;K<=g;K++)Q[K]=0;for(H=0;H<=143;)R[2*H+1]=8,H++,Q[8]++;for(;H<=255;)R[2*H+1]=9,H++,Q[9]++;for(;H<=279;)R[2*H+1]=7,H++,Q[7]++;for(;H<=287;)R[2*H+1]=8,H++,Q[8]++;for(_t(R,h+1,Q),H=0;H<u;H++)S[2*H+1]=5,S[2*H]=ct(H,5);B=new et(R,L,c+1,h,g),U=new et(S,P,0,u,g),J=new et(new Array(0),A,0,p,m)}(),O=!0),w.l_desc=new N(w.dyn_ltree,B),w.d_desc=new N(w.dyn_dtree,U),w.bl_desc=new N(w.bl_tree,J),w.bi_buf=0,w.bi_valid=0,pt(w)},e._tr_stored_block=C,e._tr_flush_block=function(w,H,K,E){var y,F,Q=0;0<w.level?(w.strm.data_type===2&&(w.strm.data_type=function(j){var nt,vt=4093624447;for(nt=0;nt<=31;nt++,vt>>>=1)if(1&vt&&j.dyn_ltree[2*nt]!==0)return s;if(j.dyn_ltree[18]!==0||j.dyn_ltree[20]!==0||j.dyn_ltree[26]!==0)return r;for(nt=32;nt<c;nt++)if(j.dyn_ltree[2*nt]!==0)return r;return s}(w)),It(w,w.l_desc),It(w,w.d_desc),Q=function(j){var nt;for(_(j,j.dyn_ltree,j.l_desc.max_code),_(j,j.dyn_dtree,j.d_desc.max_code),It(j,j.bl_desc),nt=p-1;3<=nt&&j.bl_tree[2*V[nt]+1]===0;nt--);return j.opt_len+=3*(nt+1)+5+5+4,nt}(w),y=w.opt_len+3+7>>>3,(F=w.static_len+3+7>>>3)<=y&&(y=F)):y=F=K+5,K+4<=y&&H!==-1?C(w,H,K,E):w.strategy===4||F===y?(st(w,2+(E?1:0),3),wt(w,R,S)):(st(w,4+(E?1:0),3),function(j,nt,vt,ht){var Mt;for(st(j,nt-257,5),st(j,vt-1,5),st(j,ht-4,4),Mt=0;Mt<ht;Mt++)st(j,j.bl_tree[2*V[Mt]+1],3);q(j,j.dyn_ltree,nt-1),q(j,j.dyn_dtree,vt-1)}(w,w.l_desc.max_code+1,w.d_desc.max_code+1,Q+1),wt(w,w.dyn_ltree,w.dyn_dtree)),pt(w),E&&ft(w)},e._tr_tally=function(w,H,K){return w.pending_buf[w.d_buf+2*w.last_lit]=H>>>8&255,w.pending_buf[w.d_buf+2*w.last_lit+1]=255&H,w.pending_buf[w.l_buf+w.last_lit]=255&K,w.last_lit++,H===0?w.dyn_ltree[2*K]++:(w.matches++,H--,w.dyn_ltree[2*(b[K]+c+1)]++,w.dyn_dtree[2*k(H)]++),w.last_lit===w.lit_bufsize-1},e._tr_align=function(w){st(w,2,3),G(w,f,R),function(H){H.bi_valid===16?(it(H,H.bi_buf),H.bi_buf=0,H.bi_valid=0):8<=H.bi_valid&&(H.pending_buf[H.pending++]=255&H.bi_buf,H.bi_buf>>=8,H.bi_valid-=8)}(w)}},{"../utils/common":41}],53:[function(i,t,e){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(i,t,e){(function(n){(function(s,r){"use strict";if(!s.setImmediate){var a,o,l,c,h=1,u={},p=!1,d=s.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(s);g=g&&g.setTimeout?g:s,a={}.toString.call(s.process)==="[object process]"?function(M){process.nextTick(function(){m(M)})}:function(){if(s.postMessage&&!s.importScripts){var M=!0,x=s.onmessage;return s.onmessage=function(){M=!1},s.postMessage("","*"),s.onmessage=x,M}}()?(c="setImmediate$"+Math.random()+"$",s.addEventListener?s.addEventListener("message",f,!1):s.attachEvent("onmessage",f),function(M){s.postMessage(c+M,"*")}):s.MessageChannel?((l=new MessageChannel).port1.onmessage=function(M){m(M.data)},function(M){l.port2.postMessage(M)}):d&&"onreadystatechange"in d.createElement("script")?(o=d.documentElement,function(M){var x=d.createElement("script");x.onreadystatechange=function(){m(M),x.onreadystatechange=null,o.removeChild(x),x=null},o.appendChild(x)}):function(M){setTimeout(m,0,M)},g.setImmediate=function(M){typeof M!="function"&&(M=new Function(""+M));for(var x=new Array(arguments.length-1),T=0;T<x.length;T++)x[T]=arguments[T+1];var L={callback:M,args:x};return u[h]=L,a(h),h++},g.clearImmediate=v}function v(M){delete u[M]}function m(M){if(p)setTimeout(m,0,M);else{var x=u[M];if(x){p=!0;try{(function(T){var L=T.callback,P=T.args;switch(P.length){case 0:L();break;case 1:L(P[0]);break;case 2:L(P[0],P[1]);break;case 3:L(P[0],P[1],P[2]);break;default:L.apply(r,P)}})(x)}finally{v(M),p=!1}}}}function f(M){M.source===s&&typeof M.data=="string"&&M.data.indexOf(c)===0&&m(+M.data.slice(c.length))}})(typeof self>"u"?n===void 0?this:n:self)}).call(this,typeof global<"u"?global:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})});var Pl="160",Ei={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},wi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rd=0,wc=1,Cd=2;var ru=1,Ll=2,Pn=3,Jn=0,He=1,Ln=2;var Zn=0,ts=1,Tc=2,Ac=3,Rc=4,Pd=5,fi=100,Ld=101,Id=102,Cc=103,Pc=104,Dd=200,Nd=201,Od=202,Ud=203,zo=204,Ho=205,Fd=206,kd=207,Bd=208,zd=209,Hd=210,Vd=211,Gd=212,Wd=213,Xd=214,$d=0,qd=1,Yd=2,Xr=3,Zd=4,jd=5,Kd=6,Jd=7,au=0,Qd=1,tf=2,jn=0,ef=1,nf=2,sf=3,Il=4,rf=5,af=6;var ou=300,is=301,ss=302,Vo=303,Go=304,wa=306,Wo=1e3,un=1001,Xo=1002,Be=1003,Lc=1004;var so=1005;var Qe=1006,of=1007;var zs=1008;var Kn=1009,lf=1010,cf=1011,Dl=1012,lu=1013,qn=1014,Yn=1015,Hs=1016,cu=1017,hu=1018,mi=1020,hf=1021,dn=1023,uf=1024,df=1025,gi=1026,rs=1027,ff=1028,uu=1029,pf=1030,du=1031,fu=1033,ro=33776,ao=33777,oo=33778,lo=33779,Ic=35840,Dc=35841,Nc=35842,Oc=35843,pu=36196,Uc=37492,Fc=37496,kc=37808,Bc=37809,zc=37810,Hc=37811,Vc=37812,Gc=37813,Wc=37814,Xc=37815,$c=37816,qc=37817,Yc=37818,Zc=37819,jc=37820,Kc=37821,co=36492,Jc=36494,Qc=36495,mf=36283,th=36284,eh=36285,nh=36286;var $r=2300,qr=2301,ho=2302,ih=2400,sh=2401,rh=2402;var mu=3e3,_i=3001,gf=3200,_f=3201,gu=0,vf=1,tn="",Ae="srgb",Dn="srgb-linear",Nl="display-p3",Ta="display-p3-linear",Yr="linear",re="srgb",Zr="rec709",jr="p3";var Di=7680;var ah=519,xf=512,yf=513,bf=514,_u=515,Sf=516,Mf=517,Ef=518,wf=519,oh=35044;var lh="300 es",$o=1035,In=2e3,Kr=2001,vn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ch=1234567,Ds=Math.PI/180,Vs=180/Math.PI;function Ti(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function we(i,t,e){return Math.max(t,Math.min(e,i))}function Ol(i,t){return(i%t+t)%t}function Tf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Af(i,t,e){return i!==t?(e-i)/(t-i):0}function Ns(i,t,e){return(1-e)*i+e*t}function Rf(i,t,e,n){return Ns(i,t,1-Math.exp(-e*n))}function Cf(i,t=1){return t-Math.abs(Ol(i,t*2)-t)}function Pf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Lf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function If(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Df(i,t){return i+Math.random()*(t-i)}function Nf(i){return i*(.5-Math.random())}function Of(i){i!==void 0&&(ch=i);let t=ch+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Uf(i){return i*Ds}function Ff(i){return i*Vs}function qo(i){return(i&i-1)===0&&i!==0}function kf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Jr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Bf(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),p=a((t-n)/2),d=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*u,l*p,o*c);break;case"YZY":i.set(l*p,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*p,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var vu={DEG2RAD:Ds,RAD2DEG:Vs,generateUUID:Ti,clamp:we,euclideanModulo:Ol,mapLinear:Tf,inverseLerp:Af,lerp:Ns,damp:Rf,pingpong:Cf,smoothstep:Pf,smootherstep:Lf,randInt:If,randFloat:Df,randFloatSpread:Nf,seededRandom:Of,degToRad:Uf,radToDeg:Ff,isPowerOfTwo:qo,ceilPowerOfTwo:kf,floorPowerOfTwo:Jr,setQuaternionFromProperEuler:Bf,normalize:Fe,denormalize:Zi},yt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],d=n[5],g=n[8],v=s[0],m=s[3],f=s[6],M=s[1],x=s[4],T=s[7],L=s[2],P=s[5],A=s[8];return r[0]=a*v+o*M+l*L,r[3]=a*m+o*x+l*P,r[6]=a*f+o*T+l*A,r[1]=c*v+h*M+u*L,r[4]=c*m+h*x+u*P,r[7]=c*f+h*T+u*A,r[2]=p*v+d*M+g*L,r[5]=p*m+d*x+g*P,r[8]=p*f+d*T+g*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,p=o*l-h*r,d=c*r-a*l,g=e*u+n*p+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return t[0]=u*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=p*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=d*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(uo.makeScale(t,e)),this}rotate(t){return this.premultiply(uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},uo=new jt;function xu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zf(){let i=Qr("canvas");return i.style.display="block",i}var hh={};function Os(i){i in hh||(hh[i]=!0,console.warn(i))}var uh=new jt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),dh=new jt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_r={[Dn]:{transfer:Yr,primaries:Zr,toReference:i=>i,fromReference:i=>i},[Ae]:{transfer:re,primaries:Zr,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ta]:{transfer:Yr,primaries:jr,toReference:i=>i.applyMatrix3(dh),fromReference:i=>i.applyMatrix3(uh)},[Nl]:{transfer:re,primaries:jr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(dh),fromReference:i=>i.applyMatrix3(uh).convertLinearToSRGB()}},Hf=new Set([Dn,Ta]),ie={enabled:!0,_workingColorSpace:Dn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Hf.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=_r[t].toReference,s=_r[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return _r[i].primaries},getTransfer:function(i){return i===tn?Yr:_r[i].transfer}};function es(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function fo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ni,ta=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ni===void 0&&(Ni=Qr("canvas")),Ni.width=t.width,Ni.height=t.height;let n=Ni.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ni}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Qr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=es(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(es(e[n]/255)*255):e[n]=es(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Vf=0,ea=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Ti(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(po(s[a].image)):r.push(po(s[a]))}else r=po(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function po(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ta.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Gf=0,fn=class i extends vn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=un,s=un,r=Qe,a=zs,o=dn,l=Kn,c=i.DEFAULT_ANISOTROPY,h=tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=Ti(),this.name="",this.source=new ea(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Os("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===_i?Ae:tn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ou)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wo:t.x=t.x-Math.floor(t.x);break;case un:t.x=t.x<0?0:1;break;case Xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wo:t.y=t.y-Math.floor(t.y);break;case un:t.y=t.y<0?0:1;break;case Xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Os("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ae?_i:mu}set encoding(t){Os("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===_i?Ae:tn}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=ou;fn.DEFAULT_ANISOTROPY=1;var Te=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],p=l[1],d=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,T=(d+1)/2,L=(f+1)/2,P=(h+p)/4,A=(u+v)/4,V=(g+m)/4;return x>T&&x>L?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=P/n,r=A/n):T>L?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=P/s,r=V/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=V/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(p-h)*(p-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(p-h)/M,this.w=Math.acos((c+d+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yo=class extends vn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(Os("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===_i?Ae:tn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new fn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ea(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nn=class extends Yo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},na=class extends fn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Zo=class extends fn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var qe=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],p=r[a+0],d=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=p,t[e+1]=d,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==p||c!==d||h!==g){let m=1-o,f=l*p+c*d+h*g+u*v,M=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){let L=Math.sqrt(x),P=Math.atan2(L,f*M);m=Math.sin(m*P)/L,o=Math.sin(o*P)/L}let T=o*M;if(l=l*m+p*T,c=c*m+d*T,h=h*m+g*T,u=u*m+v*T,m===1-o){let L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],p=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*d-c*p,t[e+1]=l*g+h*p+c*u-o*d,t[e+2]=c*g+h*d+o*p-l*u,t[e+3]=h*g-o*u-l*p-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),p=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=p*h*u+c*d*g,this._y=c*d*u-p*h*g,this._z=c*h*g+p*d*u,this._w=c*h*u-p*d*g;break;case"YXZ":this._x=p*h*u+c*d*g,this._y=c*d*u-p*h*g,this._z=c*h*g-p*d*u,this._w=c*h*u+p*d*g;break;case"ZXY":this._x=p*h*u-c*d*g,this._y=c*d*u+p*h*g,this._z=c*h*g+p*d*u,this._w=c*h*u-p*d*g;break;case"ZYX":this._x=p*h*u-c*d*g,this._y=c*d*u+p*h*g,this._z=c*h*g-p*d*u,this._w=c*h*u+p*d*g;break;case"YZX":this._x=p*h*u+c*d*g,this._y=c*d*u+p*h*g,this._z=c*h*g-p*d*u,this._w=c*h*u-p*d*g;break;case"XZY":this._x=p*h*u-c*d*g,this._y=c*d*u-p*h*g,this._z=c*h*g+p*d*u,this._w=c*h*u+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],p=n+o+u;if(p>0){let d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(we(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return mo.copy(this).projectOnVector(t),this.sub(mo)}reflect(t){return this.sub(mo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},mo=new X,fh=new qe,vi=class{constructor(t=new X(1/0,1/0,1/0),e=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(t.matrixWorld),this.union(vr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),xr.subVectors(this.max,Cs),Oi.subVectors(t.a,Cs),Ui.subVectors(t.b,Cs),Fi.subVectors(t.c,Cs),Vn.subVectors(Ui,Oi),Gn.subVectors(Fi,Ui),li.subVectors(Oi,Fi);let e=[0,-Vn.z,Vn.y,0,-Gn.z,Gn.y,0,-li.z,li.y,Vn.z,0,-Vn.x,Gn.z,0,-Gn.x,li.z,0,-li.x,-Vn.y,Vn.x,0,-Gn.y,Gn.x,0,-li.y,li.x,0];return!go(e,Oi,Ui,Fi,xr)||(e=[1,0,0,0,1,0,0,0,1],!go(e,Oi,Ui,Fi,xr))?!1:(yr.crossVectors(Vn,Gn),e=[yr.x,yr.y,yr.z],go(e,Oi,Ui,Fi,xr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},wn=[new X,new X,new X,new X,new X,new X,new X,new X],on=new X,vr=new vi,Oi=new X,Ui=new X,Fi=new X,Vn=new X,Gn=new X,li=new X,Cs=new X,xr=new X,yr=new X,ci=new X;function go(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ci.fromArray(i,r);let o=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),l=t.dot(ci),c=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Wf=new vi,Ps=new X,_o=new X,as=class{constructor(t=new X,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Wf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ps.subVectors(t,this.center);let e=Ps.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ps.copy(t.center).add(_o)),this.expandByPoint(Ps.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Tn=new X,vo=new X,br=new X,Wn=new X,xo=new X,Sr=new X,yo=new X,os=class{constructor(t=new X,e=new X(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){vo.copy(t).add(e).multiplyScalar(.5),br.copy(e).sub(t).normalize(),Wn.copy(this.origin).sub(vo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(br),o=Wn.dot(this.direction),l=-Wn.dot(br),c=Wn.lengthSq(),h=Math.abs(1-a*a),u,p,d,g;if(h>0)if(u=a*l-o,p=a*o-l,g=r*h,u>=0)if(p>=-g)if(p<=g){let v=1/h;u*=v,p*=v,d=u*(u+a*p+2*o)+p*(a*u+p+2*l)+c}else p=r,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p=-r,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;else p<=-g?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+p*(p+2*l)+c):p<=g?(u=0,p=Math.min(Math.max(-r,-l),r),d=p*(p+2*l)+c):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+p*(p+2*l)+c);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(vo).addScaledVector(br,p),d}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);let n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-p.z)*u,l=(t.max.z-p.z)*u):(o=(t.max.z-p.z)*u,l=(t.min.z-p.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){xo.subVectors(e,t),Sr.subVectors(n,t),yo.crossVectors(xo,Sr);let a=this.direction.dot(yo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wn.subVectors(this.origin,t);let l=o*this.direction.dot(Sr.crossVectors(Wn,Sr));if(l<0)return null;let c=o*this.direction.dot(xo.cross(Wn));if(c<0||l+c>a)return null;let h=-o*Wn.dot(yo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ae=class i{constructor(t,e,n,s,r,a,o,l,c,h,u,p,d,g,v,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,p,d,g,v,m)}set(t,e,n,s,r,a,o,l,c,h,u,p,d,g,v,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=p,f[3]=d,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ki.setFromMatrixColumn(t,0).length(),r=1/ki.setFromMatrixColumn(t,1).length(),a=1/ki.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let p=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=p-v*c,e[9]=-o*l,e[2]=v-p*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){let p=l*h,d=l*u,g=c*h,v=c*u;e[0]=p+v*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-g,e[6]=v+p*o,e[10]=a*l}else if(t.order==="ZXY"){let p=l*h,d=l*u,g=c*h,v=c*u;e[0]=p-v*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*h,e[9]=v-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let p=a*h,d=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-d,e[8]=p*c+v,e[1]=l*u,e[5]=v*c+p,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let p=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-p*u,e[8]=g*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+g,e[10]=p-v*u}else if(t.order==="XZY"){let p=a*l,d=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=p*u+v,e[5]=a*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*h,e[10]=v*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xf,t,$f)}lookAt(t,e,n){let s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Xn.crossVectors(n,Xe),Xn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Xn.crossVectors(n,Xe)),Xn.normalize(),Mr.crossVectors(Xe,Xn),s[0]=Xn.x,s[4]=Mr.x,s[8]=Xe.x,s[1]=Xn.y,s[5]=Mr.y,s[9]=Xe.y,s[2]=Xn.z,s[6]=Mr.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],d=n[13],g=n[2],v=n[6],m=n[10],f=n[14],M=n[3],x=n[7],T=n[11],L=n[15],P=s[0],A=s[4],V=s[8],R=s[12],S=s[1],D=s[5],b=s[9],$=s[13],B=s[2],U=s[6],J=s[10],Y=s[14],et=s[3],N=s[7],k=s[11],it=s[15];return r[0]=a*P+o*S+l*B+c*et,r[4]=a*A+o*D+l*U+c*N,r[8]=a*V+o*b+l*J+c*k,r[12]=a*R+o*$+l*Y+c*it,r[1]=h*P+u*S+p*B+d*et,r[5]=h*A+u*D+p*U+d*N,r[9]=h*V+u*b+p*J+d*k,r[13]=h*R+u*$+p*Y+d*it,r[2]=g*P+v*S+m*B+f*et,r[6]=g*A+v*D+m*U+f*N,r[10]=g*V+v*b+m*J+f*k,r[14]=g*R+v*$+m*Y+f*it,r[3]=M*P+x*S+T*B+L*et,r[7]=M*A+x*D+T*U+L*N,r[11]=M*V+x*b+T*J+L*k,r[15]=M*R+x*$+T*Y+L*it,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],p=t[10],d=t[14],g=t[3],v=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*o*p+n*c*p+s*o*d-n*l*d)+v*(+e*l*d-e*c*p+r*a*p-s*a*d+s*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+f*(-s*o*h-e*l*u+e*o*p+s*a*u-n*a*p+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],p=t[10],d=t[11],g=t[12],v=t[13],m=t[14],f=t[15],M=u*m*c-v*p*c+v*l*d-o*m*d-u*l*f+o*p*f,x=g*p*c-h*m*c-g*l*d+a*m*d+h*l*f-a*p*f,T=h*v*c-g*u*c+g*o*d-a*v*d-h*o*f+a*u*f,L=g*u*l-h*v*l-g*o*p+a*v*p+h*o*m-a*u*m,P=e*M+n*x+s*T+r*L;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/P;return t[0]=M*A,t[1]=(v*p*r-u*m*r-v*s*d+n*m*d+u*s*f-n*p*f)*A,t[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*f+n*l*f)*A,t[3]=(u*l*r-o*p*r-u*s*c+n*p*c+o*s*d-n*l*d)*A,t[4]=x*A,t[5]=(h*m*r-g*p*r+g*s*d-e*m*d-h*s*f+e*p*f)*A,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*f-e*l*f)*A,t[7]=(a*p*r-h*l*r+h*s*c-e*p*c-a*s*d+e*l*d)*A,t[8]=T*A,t[9]=(g*u*r-h*v*r-g*n*d+e*v*d+h*n*f-e*u*f)*A,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*f+e*o*f)*A,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*A,t[12]=L*A,t[13]=(h*v*s-g*u*s+g*n*p-e*v*p-h*n*m+e*u*m)*A,t[14]=(g*o*s-a*v*s-g*n*l+e*v*l+a*n*m-e*o*m)*A,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*p+e*o*p)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,p=r*c,d=r*h,g=r*u,v=a*h,m=a*u,f=o*u,M=l*c,x=l*h,T=l*u,L=n.x,P=n.y,A=n.z;return s[0]=(1-(v+f))*L,s[1]=(d+T)*L,s[2]=(g-x)*L,s[3]=0,s[4]=(d-T)*P,s[5]=(1-(p+f))*P,s[6]=(m+M)*P,s[7]=0,s[8]=(g+x)*A,s[9]=(m-M)*A,s[10]=(1-(p+v))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ki.set(s[0],s[1],s[2]).length(),a=ki.set(s[4],s[5],s[6]).length(),o=ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);let c=1/r,h=1/a,u=1/o;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=u,ln.elements[9]*=u,ln.elements[10]*=u,e.setFromRotationMatrix(ln),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=In){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),p=(n+s)/(n-s),d,g;if(o===In)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Kr)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=In){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),p=(e+t)*c,d=(n+s)*h,g,v;if(o===In)g=(a+r)*u,v=-2*u;else if(o===Kr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ki=new X,ln=new ae,Xf=new X(0,0,0),$f=new X(1,1,1),Xn=new X,Mr=new X,Xe=new X,ph=new ae,mh=new qe,ia=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],p=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(we(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-we(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(we(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-we(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(we(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-we(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ph.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ph,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return mh.setFromEuler(this),this.setFromQuaternion(mh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ia.DEFAULT_ORDER="XYZ";var sa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},qf=0,gh=new X,Bi=new qe,An=new ae,Er=new X,Ls=new X,Yf=new X,Zf=new qe,_h=new X(1,0,0),vh=new X(0,1,0),xh=new X(0,0,1),jf={type:"added"},Kf={type:"removed"},ve=class i extends vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new X,e=new ia,n=new qe,s=new X(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new jt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(_h,t)}rotateY(t){return this.rotateOnAxis(vh,t)}rotateZ(t){return this.rotateOnAxis(xh,t)}translateOnAxis(t,e){return gh.copy(t).applyQuaternion(this.quaternion),this.position.add(gh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(_h,t)}translateY(t){return this.translateOnAxis(vh,t)}translateZ(t){return this.translateOnAxis(xh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Er.copy(t):Er.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(Ls,Er,this.up):An.lookAt(Er,Ls,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(An),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(jf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kf)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),An.multiply(t.parent.matrixWorld)),t.applyMatrix4(An),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,t,Yf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ls,Zf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),p=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};ve.DEFAULT_UP=new X(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var cn=new X,Rn=new X,bo=new X,Cn=new X,zi=new X,Hi=new X,yh=new X,So=new X,Mo=new X,Eo=new X,wr=!1,ji=class i{constructor(t=new X,e=new X,n=new X){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),cn.subVectors(t,e),s.cross(cn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){cn.subVectors(s,e),Rn.subVectors(n,e),bo.subVectors(t,e);let a=cn.dot(cn),o=cn.dot(Rn),l=cn.dot(bo),c=Rn.dot(Rn),h=Rn.dot(bo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let p=1/u,d=(c*l-o*h)*p,g=(a*h-o*l)*p;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getUV(t,e,n,s,r,a,o,l){return wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),wr=!0),this.getInterpolation(t,e,n,s,r,a,o,l)}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(a,Cn.y),l.addScaledVector(o,Cn.z),l)}static isFrontFacing(t,e,n,s){return cn.subVectors(n,e),Rn.subVectors(t,e),cn.cross(Rn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return cn.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),cn.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return wr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),wr=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;zi.subVectors(s,n),Hi.subVectors(r,n),So.subVectors(t,n);let l=zi.dot(So),c=Hi.dot(So);if(l<=0&&c<=0)return e.copy(n);Mo.subVectors(t,s);let h=zi.dot(Mo),u=Hi.dot(Mo);if(h>=0&&u<=h)return e.copy(s);let p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(zi,a);Eo.subVectors(t,r);let d=zi.dot(Eo),g=Hi.dot(Eo);if(g>=0&&d<=g)return e.copy(r);let v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Hi,o);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return yh.subVectors(r,s),o=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(yh,o);let f=1/(m+v+p);return a=v*f,o=p*f,e.copy(n).addScaledVector(zi,a).addScaledVector(Hi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},yu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function wo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Gt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ie.workingColorSpace){return this.r=t,this.g=e,this.b=n,ie.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ie.workingColorSpace){if(t=Ol(t,1),e=we(e,0,1),n=we(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=wo(a,r,t+1/3),this.g=wo(a,r,t),this.b=wo(a,r,t-1/3)}return ie.toWorkingColorSpace(this,s),this}setStyle(t,e=Ae){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){let n=yu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=fo(t.r),this.g=fo(t.g),this.b=fo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return ie.fromWorkingColorSpace(Ie.copy(this),t),Math.round(we(Ie.r*255,0,255))*65536+Math.round(we(Ie.g*255,0,255))*256+Math.round(we(Ie.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ie.workingColorSpace){ie.fromWorkingColorSpace(Ie.copy(this),e);let n=Ie.r,s=Ie.g,r=Ie.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ie.workingColorSpace){return ie.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Ae){ie.fromWorkingColorSpace(Ie.copy(this),t);let e=Ie.r,n=Ie.g,s=Ie.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(Tr);let n=Ns($n.h,Tr.h,e),s=Ns($n.s,Tr.s,e),r=Ns($n.l,Tr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ie=new Gt;Gt.NAMES=yu;var Jf=0,On=class extends vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Ti(),this.name="",this.type="Material",this.blending=ts,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zo,this.blendDst=Ho,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=Xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zo&&(n.blendSrc=this.blendSrc),this.blendDst!==Ho&&(n.blendDst=this.blendDst),this.blendEquation!==fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ah&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Un=class extends On{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=au,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ge=new X,Ar=new yt,Ve=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=oh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ar.fromBufferAttribute(this,e),Ar.applyMatrix3(t),this.setXY(e,Ar.x,Ar.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Zi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Zi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Zi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Zi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Zi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Fe(e,this.array),n=Fe(n,this.array),s=Fe(s,this.array),r=Fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==oh&&(t.usage=this.usage),t}};var ra=class extends Ve{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var aa=class extends Ve{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var le=class extends Ve{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Qf=0,Je=new ae,To=new ve,Vi=new X,$e=new vi,Is=new vi,Ee=new X,De=class i extends vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=Ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xu(t)?aa:ra)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return To.lookAt(t),To.updateMatrix(),this.applyMatrix4(To.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new le(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new as);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new X,1/0);return}if(t){let n=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Is.setFromBufferAttribute(o),this.morphTargetsRelative?(Ee.addVectors($e.min,Is.min),$e.expandByPoint(Ee),Ee.addVectors($e.max,Is.max),$e.expandByPoint(Ee)):($e.expandByPoint(Is.min),$e.expandByPoint(Is.max))}$e.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ee.fromBufferAttribute(o,c),l&&(Vi.fromBufferAttribute(t,c),Ee.add(Vi)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ve(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let S=0;S<o;S++)c[S]=new X,h[S]=new X;let u=new X,p=new X,d=new X,g=new yt,v=new yt,m=new yt,f=new X,M=new X;function x(S,D,b){u.fromArray(s,S*3),p.fromArray(s,D*3),d.fromArray(s,b*3),g.fromArray(a,S*2),v.fromArray(a,D*2),m.fromArray(a,b*2),p.sub(u),d.sub(u),v.sub(g),m.sub(g);let $=1/(v.x*m.y-m.x*v.y);isFinite($)&&(f.copy(p).multiplyScalar(m.y).addScaledVector(d,-v.y).multiplyScalar($),M.copy(d).multiplyScalar(v.x).addScaledVector(p,-m.x).multiplyScalar($),c[S].add(f),c[D].add(f),c[b].add(f),h[S].add(M),h[D].add(M),h[b].add(M))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let S=0,D=T.length;S<D;++S){let b=T[S],$=b.start,B=b.count;for(let U=$,J=$+B;U<J;U+=3)x(n[U+0],n[U+1],n[U+2])}let L=new X,P=new X,A=new X,V=new X;function R(S){A.fromArray(r,S*3),V.copy(A);let D=c[S];L.copy(D),L.sub(A.multiplyScalar(A.dot(D))).normalize(),P.crossVectors(V,D);let $=P.dot(h[S])<0?-1:1;l[S*4]=L.x,l[S*4+1]=L.y,l[S*4+2]=L.z,l[S*4+3]=$}for(let S=0,D=T.length;S<D;++S){let b=T[S],$=b.start,B=b.count;for(let U=$,J=$+B;U<J;U+=3)R(n[U+0]),R(n[U+1]),R(n[U+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ve(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);let s=new X,r=new X,a=new X,o=new X,l=new X,c=new X,h=new X,u=new X;if(t)for(let p=0,d=t.count;p<d;p+=3){let g=t.getX(p+0),v=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,d=e.count;p<d;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,p=new c.constructor(l.length*h),d=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let f=0;f<h;f++)p[g++]=c[d++]}return new Ve(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let p=c[h],d=t(p,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bh=new ae,hi=new os,Rr=new as,Sh=new X,Gi=new X,Wi=new X,Xi=new X,Ao=new X,Cr=new X,Pr=new yt,Lr=new yt,Ir=new yt,Mh=new X,Eh=new X,wh=new X,Dr=new X,Nr=new X,Re=class extends ve{constructor(t=new De,e=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Ao.fromBufferAttribute(u,t),a?Cr.addScaledVector(Ao,h):Cr.addScaledVector(Ao.sub(e),h))}e.add(Cr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!(Rr.containsPoint(hi.origin)===!1&&(hi.intersectSphere(Rr,Sh)===null||hi.origin.distanceToSquared(Sh)>(t.far-t.near)**2))&&(bh.copy(r).invert(),hi.copy(t.ray).applyMatrix4(bh),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=p.length;g<v;g++){let m=p[g],f=a[m.materialIndex],M=Math.max(m.start,d.start),x=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let T=M,L=x;T<L;T+=3){let P=o.getX(T),A=o.getX(T+1),V=o.getX(T+2);s=Or(this,f,t,n,c,h,u,P,A,V),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let m=g,f=v;m<f;m+=3){let M=o.getX(m),x=o.getX(m+1),T=o.getX(m+2);s=Or(this,a,t,n,c,h,u,M,x,T),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=p.length;g<v;g++){let m=p[g],f=a[m.materialIndex],M=Math.max(m.start,d.start),x=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let T=M,L=x;T<L;T+=3){let P=T,A=T+1,V=T+2;s=Or(this,f,t,n,c,h,u,P,A,V),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let m=g,f=v;m<f;m+=3){let M=m,x=m+1,T=m+2;s=Or(this,a,t,n,c,h,u,M,x,T),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function tp(i,t,e,n,s,r,a,o){let l;if(t.side===He?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Jn,o),l===null)return null;Nr.copy(o),Nr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Nr);return c<e.near||c>e.far?null:{distance:c,point:Nr.clone(),object:i}}function Or(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Gi),i.getVertexPosition(l,Wi),i.getVertexPosition(c,Xi);let h=tp(i,t,e,n,Gi,Wi,Xi,Dr);if(h){s&&(Pr.fromBufferAttribute(s,o),Lr.fromBufferAttribute(s,l),Ir.fromBufferAttribute(s,c),h.uv=ji.getInterpolation(Dr,Gi,Wi,Xi,Pr,Lr,Ir,new yt)),r&&(Pr.fromBufferAttribute(r,o),Lr.fromBufferAttribute(r,l),Ir.fromBufferAttribute(r,c),h.uv1=ji.getInterpolation(Dr,Gi,Wi,Xi,Pr,Lr,Ir,new yt),h.uv2=h.uv1),a&&(Mh.fromBufferAttribute(a,o),Eh.fromBufferAttribute(a,l),wh.fromBufferAttribute(a,c),h.normal=ji.getInterpolation(Dr,Gi,Wi,Xi,Mh,Eh,wh,new X),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new X,materialIndex:0};ji.getNormal(Gi,Wi,Xi,u.normal),h.face=u}return h}var xi=class i extends De{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],p=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(u,2));function g(v,m,f,M,x,T,L,P,A,V,R){let S=T/A,D=L/V,b=T/2,$=L/2,B=P/2,U=A+1,J=V+1,Y=0,et=0,N=new X;for(let k=0;k<J;k++){let it=k*D-$;for(let st=0;st<U;st++){let G=st*S-b;N[v]=G*M,N[m]=it*x,N[f]=B,c.push(N.x,N.y,N.z),N[v]=0,N[m]=0,N[f]=P>0?1:-1,h.push(N.x,N.y,N.z),u.push(st/A),u.push(1-k/V),Y+=1}}for(let k=0;k<V;k++)for(let it=0;it<A;it++){let st=p+it+U*k,G=p+it+U*(k+1),ct=p+(it+1)+U*(k+1),_t=p+(it+1)+U*k;l.push(st,G,_t),l.push(G,ct,_t),et+=6}o.addGroup(d,et,R),d+=et,p+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ls(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ke(i){let t={};for(let e=0;e<i.length;e++){let n=ls(i[e]);for(let s in n)t[s]=n[s]}return t}function ep(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bu(i){return i.getRenderTarget()===null?i.outputColorSpace:ie.workingColorSpace}var np={clone:ls,merge:ke},ip=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fn=class extends On{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ip,this.fragmentShader=sp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ls(t.uniforms),this.uniformsGroups=ep(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},oa=class extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=In}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ze=class extends oa{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},$i=-90,qi=1,jo=class extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ze($i,qi,t,e);s.layers=this.layers,this.add(s);let r=new ze($i,qi,t,e);r.layers=this.layers,this.add(r);let a=new ze($i,qi,t,e);a.layers=this.layers,this.add(a);let o=new ze($i,qi,t,e);o.layers=this.layers,this.add(o);let l=new ze($i,qi,t,e);l.layers=this.layers,this.add(l);let c=new ze($i,qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===In)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,p,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},la=class extends fn{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:is,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ko=class extends Nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(Os("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===_i?Ae:tn),this.texture=new la(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Qe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xi(5,5,5),r=new Fn({name:"CubemapFromEquirect",uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:Zn});r.uniforms.tEquirect.value=e;let a=new Re(s,r),o=e.minFilter;return e.minFilter===zs&&(e.minFilter=Qe),new jo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},Ro=new X,rp=new X,ap=new jt,hn=class{constructor(t=new X(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Ro.subVectors(n,e).cross(rp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ro),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||ap.getNormalMatrix(t),s=this.coplanarPoint(Ro).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ui=new as,Ur=new X,Gs=class{constructor(t=new hn,e=new hn,n=new hn,s=new hn,r=new hn,a=new hn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=In){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],p=s[7],d=s[8],g=s[9],v=s[10],m=s[11],f=s[12],M=s[13],x=s[14],T=s[15];if(n[0].setComponents(l-r,p-c,m-d,T-f).normalize(),n[1].setComponents(l+r,p+c,m+d,T+f).normalize(),n[2].setComponents(l+a,p+h,m+g,T+M).normalize(),n[3].setComponents(l-a,p-h,m-g,T-M).normalize(),n[4].setComponents(l-o,p-u,m-v,T-x).normalize(),e===In)n[5].setComponents(l+o,p+u,m+v,T+x).normalize();else if(e===Kr)n[5].setComponents(o,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Ur.x=s.normal.x>0?t.max.x:t.min.x,Ur.y=s.normal.y>0?t.max.y:t.min.y,Ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Su(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function op(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let u=c.array,p=c.usage,d=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,p),c.onUploadCallback();let v;if(u instanceof Float32Array)v=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)v=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=i.SHORT;else if(u instanceof Uint32Array)v=i.UNSIGNED_INT;else if(u instanceof Int32Array)v=i.INT;else if(u instanceof Int8Array)v=i.BYTE;else if(u instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:d}}function r(c,h,u){let p=h.array,d=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),d.count===-1&&g.length===0&&i.bufferSubData(u,0,p),g.length!==0){for(let v=0,m=g.length;v<m;v++){let f=g[v];e?i.bufferSubData(u,f.start*p.BYTES_PER_ELEMENT,p,f.start,f.count):i.bufferSubData(u,f.start*p.BYTES_PER_ELEMENT,p.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}d.count!==-1&&(e?i.bufferSubData(u,d.offset*p.BYTES_PER_ELEMENT,p,d.offset,d.count):i.bufferSubData(u,d.offset*p.BYTES_PER_ELEMENT,p.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let p=n.get(c);(!p||p.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);if(u===void 0)n.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}var Ws=class i extends De{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,p=e/l,d=[],g=[],v=[],m=[];for(let f=0;f<h;f++){let M=f*p-a;for(let x=0;x<c;x++){let T=x*u-r;g.push(T,-M,0),v.push(0,0,1),m.push(x/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let M=0;M<o;M++){let x=M+c*f,T=M+c*(f+1),L=M+1+c*(f+1),P=M+1+c*f;d.push(x,T,P),d.push(T,L,P)}this.setIndex(d),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},lp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cp=`#ifdef USE_ALPHAHASH
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
#endif`,hp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,fp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pp=`#ifdef USE_AOMAP
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
#endif`,mp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gp=`#ifdef USE_BATCHING
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
#endif`,_p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bp=`#ifdef USE_IRIDESCENCE
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
#endif`,Sp=`#ifdef USE_BUMPMAP
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
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Lp=`#define PI 3.141592653589793
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
} // validated`,Ip=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dp=`vec3 transformedNormal = objectNormal;
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
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Op=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`
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
}`,zp=`#ifdef USE_ENVMAP
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
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wp=`#ifdef USE_ENVMAP
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
#endif`,Xp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$p=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
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
}`,jp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tm=`uniform bool receiveShadow;
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
#endif`,em=`#ifdef USE_ENVMAP
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
#endif`,nm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,am=`PhysicalMaterial material;
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
#endif`,om=`struct PhysicalMaterial {
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
}`,lm=`
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
#endif`,cm=`#if defined( RE_IndirectDiffuse )
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
#endif`,hm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,um=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,pm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vm=`#if defined( USE_POINTS_UV )
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
#endif`,xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bm=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
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
#endif`,Mm=`#ifdef USE_MORPHTARGETS
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
#endif`,Em=`#ifdef USE_MORPHTARGETS
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
#endif`,wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pm=`#ifdef USE_NORMALMAP
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
#endif`,Lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Im=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Om=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Um=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Fm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,km=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$m=`float getShadowMask() {
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
}`,qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ym=`#ifdef USE_SKINNING
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
#endif`,Zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jm=`#ifdef USE_SKINNING
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
#endif`,Km=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
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
#endif`,ng=`#ifdef USE_TRANSMISSION
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
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,og=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lg=`uniform sampler2D t2D;
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
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fg=`#include <common>
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
}`,pg=`#if DEPTH_PACKING == 3200
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
}`,mg=`#define DISTANCE
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
}`,gg=`#define DISTANCE
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
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`uniform float scale;
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
}`,yg=`uniform vec3 diffuse;
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
}`,bg=`#include <common>
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
}`,Sg=`uniform vec3 diffuse;
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
}`,Mg=`#define LAMBERT
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
}`,Eg=`#define LAMBERT
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
}`,wg=`#define MATCAP
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
}`,Tg=`#define MATCAP
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
}`,Ag=`#define NORMAL
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
}`,Rg=`#define NORMAL
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
}`,Cg=`#define PHONG
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
}`,Pg=`#define PHONG
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
}`,Lg=`#define STANDARD
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
}`,Ig=`#define STANDARD
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
}`,Dg=`#define TOON
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
}`,Ng=`#define TOON
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
}`,Og=`uniform float size;
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
}`,Ug=`uniform vec3 diffuse;
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
}`,Fg=`#include <common>
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
}`,kg=`uniform vec3 color;
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
}`,Bg=`uniform float rotation;
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
}`,zg=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:lp,alphahash_pars_fragment:cp,alphamap_fragment:hp,alphamap_pars_fragment:up,alphatest_fragment:dp,alphatest_pars_fragment:fp,aomap_fragment:pp,aomap_pars_fragment:mp,batching_pars_vertex:gp,batching_vertex:_p,begin_vertex:vp,beginnormal_vertex:xp,bsdfs:yp,iridescence_fragment:bp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:Mp,clipping_planes_pars_fragment:Ep,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Tp,color_fragment:Ap,color_pars_fragment:Rp,color_pars_vertex:Cp,color_vertex:Pp,common:Lp,cube_uv_reflection_fragment:Ip,defaultnormal_vertex:Dp,displacementmap_pars_vertex:Np,displacementmap_vertex:Op,emissivemap_fragment:Up,emissivemap_pars_fragment:Fp,colorspace_fragment:kp,colorspace_pars_fragment:Bp,envmap_fragment:zp,envmap_common_pars_fragment:Hp,envmap_pars_fragment:Vp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:em,envmap_vertex:Wp,fog_vertex:Xp,fog_pars_vertex:$p,fog_fragment:qp,fog_pars_fragment:Yp,gradientmap_pars_fragment:Zp,lightmap_fragment:jp,lightmap_pars_fragment:Kp,lights_lambert_fragment:Jp,lights_lambert_pars_fragment:Qp,lights_pars_begin:tm,lights_toon_fragment:nm,lights_toon_pars_fragment:im,lights_phong_fragment:sm,lights_phong_pars_fragment:rm,lights_physical_fragment:am,lights_physical_pars_fragment:om,lights_fragment_begin:lm,lights_fragment_maps:cm,lights_fragment_end:hm,logdepthbuf_fragment:um,logdepthbuf_pars_fragment:dm,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:pm,map_fragment:mm,map_pars_fragment:gm,map_particle_fragment:_m,map_particle_pars_fragment:vm,metalnessmap_fragment:xm,metalnessmap_pars_fragment:ym,morphcolor_vertex:bm,morphnormal_vertex:Sm,morphtarget_pars_vertex:Mm,morphtarget_vertex:Em,normal_fragment_begin:wm,normal_fragment_maps:Tm,normal_pars_fragment:Am,normal_pars_vertex:Rm,normal_vertex:Cm,normalmap_pars_fragment:Pm,clearcoat_normal_fragment_begin:Lm,clearcoat_normal_fragment_maps:Im,clearcoat_pars_fragment:Dm,iridescence_pars_fragment:Nm,opaque_fragment:Om,packing:Um,premultiplied_alpha_fragment:Fm,project_vertex:km,dithering_fragment:Bm,dithering_pars_fragment:zm,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Gm,shadowmap_pars_vertex:Wm,shadowmap_vertex:Xm,shadowmask_pars_fragment:$m,skinbase_vertex:qm,skinning_pars_vertex:Ym,skinning_vertex:Zm,skinnormal_vertex:jm,specularmap_fragment:Km,specularmap_pars_fragment:Jm,tonemapping_fragment:Qm,tonemapping_pars_fragment:tg,transmission_fragment:eg,transmission_pars_fragment:ng,uv_pars_fragment:ig,uv_pars_vertex:sg,uv_vertex:rg,worldpos_vertex:ag,background_vert:og,background_frag:lg,backgroundCube_vert:cg,backgroundCube_frag:hg,cube_vert:ug,cube_frag:dg,depth_vert:fg,depth_frag:pg,distanceRGBA_vert:mg,distanceRGBA_frag:gg,equirect_vert:_g,equirect_frag:vg,linedashed_vert:xg,linedashed_frag:yg,meshbasic_vert:bg,meshbasic_frag:Sg,meshlambert_vert:Mg,meshlambert_frag:Eg,meshmatcap_vert:wg,meshmatcap_frag:Tg,meshnormal_vert:Ag,meshnormal_frag:Rg,meshphong_vert:Cg,meshphong_frag:Pg,meshphysical_vert:Lg,meshphysical_frag:Ig,meshtoon_vert:Dg,meshtoon_frag:Ng,points_vert:Og,points_frag:Ug,shadow_vert:Fg,shadow_frag:kg,sprite_vert:Bg,sprite_frag:zg},Et={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},_n={basic:{uniforms:ke([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:ke([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Gt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:ke([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:ke([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:ke([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Gt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:ke([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:ke([Et.points,Et.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:ke([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:ke([Et.common,Et.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:ke([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:ke([Et.sprite,Et.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:ke([Et.common,Et.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:ke([Et.lights,Et.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};_n.physical={uniforms:ke([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var Fr={r:0,b:0,g:0};function Hg(i,t,e,n,s,r,a){let o=new Gt(0),l=r===!0?0:1,c,h,u=null,p=0,d=null;function g(m,f){let M=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?e:t).get(x)),x===null?v(o,l):x&&x.isColor&&(v(x,1),M=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===wa)?(h===void 0&&(h=new Re(new xi(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:ls(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,P,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=ie.getTransfer(x.colorSpace)!==re,(u!==x||p!==x.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,p=x.version,d=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Re(new Ws(2,2),new Fn({name:"BackgroundMaterial",uniforms:ls(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=ie.getTransfer(x.colorSpace)!==re,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||p!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,p=x.version,d=i.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,f){m.getRGB(Fr,bu(i)),n.buffers.color.setClear(Fr.r,Fr.g,Fr.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(o,l)},render:g}}function Vg(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null),c=l,h=!1;function u(B,U,J,Y,et){let N=!1;if(a){let k=v(Y,J,U);c!==k&&(c=k,d(c.object)),N=f(B,Y,J,et),N&&M(B,Y,J,et)}else{let k=U.wireframe===!0;(c.geometry!==Y.id||c.program!==J.id||c.wireframe!==k)&&(c.geometry=Y.id,c.program=J.id,c.wireframe=k,N=!0)}et!==null&&e.update(et,i.ELEMENT_ARRAY_BUFFER),(N||h)&&(h=!1,V(B,U,J,Y),et!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(et).buffer))}function p(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function d(B){return n.isWebGL2?i.bindVertexArray(B):r.bindVertexArrayOES(B)}function g(B){return n.isWebGL2?i.deleteVertexArray(B):r.deleteVertexArrayOES(B)}function v(B,U,J){let Y=J.wireframe===!0,et=o[B.id];et===void 0&&(et={},o[B.id]=et);let N=et[U.id];N===void 0&&(N={},et[U.id]=N);let k=N[Y];return k===void 0&&(k=m(p()),N[Y]=k),k}function m(B){let U=[],J=[],Y=[];for(let et=0;et<s;et++)U[et]=0,J[et]=0,Y[et]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:J,attributeDivisors:Y,object:B,attributes:{},index:null}}function f(B,U,J,Y){let et=c.attributes,N=U.attributes,k=0,it=J.getAttributes();for(let st in it)if(it[st].location>=0){let ct=et[st],_t=N[st];if(_t===void 0&&(st==="instanceMatrix"&&B.instanceMatrix&&(_t=B.instanceMatrix),st==="instanceColor"&&B.instanceColor&&(_t=B.instanceColor)),ct===void 0||ct.attribute!==_t||_t&&ct.data!==_t.data)return!0;k++}return c.attributesNum!==k||c.index!==Y}function M(B,U,J,Y){let et={},N=U.attributes,k=0,it=J.getAttributes();for(let st in it)if(it[st].location>=0){let ct=N[st];ct===void 0&&(st==="instanceMatrix"&&B.instanceMatrix&&(ct=B.instanceMatrix),st==="instanceColor"&&B.instanceColor&&(ct=B.instanceColor));let _t={};_t.attribute=ct,ct&&ct.data&&(_t.data=ct.data),et[st]=_t,k++}c.attributes=et,c.attributesNum=k,c.index=Y}function x(){let B=c.newAttributes;for(let U=0,J=B.length;U<J;U++)B[U]=0}function T(B){L(B,0)}function L(B,U){let J=c.newAttributes,Y=c.enabledAttributes,et=c.attributeDivisors;J[B]=1,Y[B]===0&&(i.enableVertexAttribArray(B),Y[B]=1),et[B]!==U&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,U),et[B]=U)}function P(){let B=c.newAttributes,U=c.enabledAttributes;for(let J=0,Y=U.length;J<Y;J++)U[J]!==B[J]&&(i.disableVertexAttribArray(J),U[J]=0)}function A(B,U,J,Y,et,N,k){k===!0?i.vertexAttribIPointer(B,U,J,et,N):i.vertexAttribPointer(B,U,J,Y,et,N)}function V(B,U,J,Y){if(n.isWebGL2===!1&&(B.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let et=Y.attributes,N=J.getAttributes(),k=U.defaultAttributeValues;for(let it in N){let st=N[it];if(st.location>=0){let G=et[it];if(G===void 0&&(it==="instanceMatrix"&&B.instanceMatrix&&(G=B.instanceMatrix),it==="instanceColor"&&B.instanceColor&&(G=B.instanceColor)),G!==void 0){let ct=G.normalized,_t=G.itemSize,pt=e.get(G);if(pt===void 0)continue;let ft=pt.buffer,Tt=pt.type,At=pt.bytesPerElement,wt=n.isWebGL2===!0&&(Tt===i.INT||Tt===i.UNSIGNED_INT||G.gpuType===lu);if(G.isInterleavedBufferAttribute){let It=G.data,_=It.stride,q=G.offset;if(It.isInstancedInterleavedBuffer){for(let O=0;O<st.locationSize;O++)L(st.location+O,It.meshPerAttribute);B.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=It.meshPerAttribute*It.count)}else for(let O=0;O<st.locationSize;O++)T(st.location+O);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let O=0;O<st.locationSize;O++)A(st.location+O,_t/st.locationSize,Tt,ct,_*At,(q+_t/st.locationSize*O)*At,wt)}else{if(G.isInstancedBufferAttribute){for(let It=0;It<st.locationSize;It++)L(st.location+It,G.meshPerAttribute);B.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let It=0;It<st.locationSize;It++)T(st.location+It);i.bindBuffer(i.ARRAY_BUFFER,ft);for(let It=0;It<st.locationSize;It++)A(st.location+It,_t/st.locationSize,Tt,ct,_t*At,_t/st.locationSize*It*At,wt)}}else if(k!==void 0){let ct=k[it];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(st.location,ct);break;case 3:i.vertexAttrib3fv(st.location,ct);break;case 4:i.vertexAttrib4fv(st.location,ct);break;default:i.vertexAttrib1fv(st.location,ct)}}}}P()}function R(){b();for(let B in o){let U=o[B];for(let J in U){let Y=U[J];for(let et in Y)g(Y[et].object),delete Y[et];delete U[J]}delete o[B]}}function S(B){if(o[B.id]===void 0)return;let U=o[B.id];for(let J in U){let Y=U[J];for(let et in Y)g(Y[et].object),delete Y[et];delete U[J]}delete o[B.id]}function D(B){for(let U in o){let J=o[U];if(J[B.id]===void 0)continue;let Y=J[B.id];for(let et in Y)g(Y[et].object),delete Y[et];delete J[B.id]}}function b(){$(),h=!0,c!==l&&(c=l,d(c.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:b,resetDefaultState:$,dispose:R,releaseStatesOfGeometry:S,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:T,disableUnusedAttributes:P}}function Gg(i,t,e,n){let s=n.isWebGL2,r;function a(h){r=h}function o(h,u){i.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,p){if(p===0)return;let d,g;if(s)d=i,g="drawArraysInstanced";else if(d=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,h,u,p),e.update(u,r,p)}function c(h,u,p){if(p===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<p;g++)this.render(h[g],u[g]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,p);let g=0;for(let v=0;v<p;v++)g+=u[v];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Wg(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),v=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=p>0,T=a||t.has("OES_texture_float"),L=x&&T,P=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:p,maxTextureSize:d,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:T,floatVertexTextures:L,maxSamples:P}}function Xg(i){let t=this,e=null,n=0,s=!1,r=!1,a=new hn,o=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){let d=u.length!==0||p||n!==0||s;return s=p,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,d){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let M=r?0:n,x=M*4,T=f.clippingState||null;l.value=T,T=h(g,p,x,d);for(let L=0;L!==x;++L)T[L]=e[L];f.clippingState=T,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,p,d,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let f=d+v*4,M=p.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,T=d;x!==v;++x,T+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function $g(i){let t=new WeakMap;function e(a,o){return o===Vo?a.mapping=is:o===Go&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Vo||o===Go)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Ko(l.height/2);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ca=class extends oa{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ki=4,Th=[.125,.215,.35,.446,.526,.582],pi=20,Co=new ca,Ah=new Gt,Po=null,Lo=0,Io=0,di=(1+Math.sqrt(5))/2,Yi=1/di,Rh=[new X(1,1,1),new X(-1,1,1),new X(1,1,-1),new X(-1,1,-1),new X(0,di,Yi),new X(0,di,-Yi),new X(Yi,0,di),new X(-Yi,0,di),new X(di,Yi,0),new X(-di,Yi,0)],ha=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Po=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Po,Lo,Io),t.scissorTest=!1,kr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Po=this._renderer.getRenderTarget(),Lo=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:Hs,format:dn,colorSpace:Dn,depthBuffer:!1},s=Ch(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ch(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qg(r)),this._blurMaterial=Yg(r,t,e)}return s}_compileMaterial(t){let e=new Re(this._lodPlanes[0],t);this._renderer.compile(e,Co)}_sceneToCubeUV(t,e,n,s){let o=new ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Ah),h.toneMapping=jn,h.autoClear=!1;let d=new Un({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1}),g=new Re(new xi,d),v=!1,m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,v=!0):(d.color.copy(Ah),v=!0);for(let f=0;f<6;f++){let M=f%3;M===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):M===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));let x=this._cubeSize;kr(s,M*x,f>2?x:0,x,x),h.setRenderTarget(s),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===is||t.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Re(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;kr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Co)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Rh[(s-1)%Rh.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Re(this._lodPlanes[s],c),p=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*pi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):pi;m>pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pi}`);let f=[],M=0;for(let A=0;A<pi;++A){let V=A/v,R=Math.exp(-V*V/2);f.push(R),A===0?M+=R:A<m&&(M+=2*R)}for(let A=0;A<f.length;A++)f[A]=f[A]/M;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);let{_lodMax:x}=this;p.dTheta.value=g,p.mipInt.value=x-n;let T=this._sizeLods[s],L=3*T*(s>x-Ki?s-x+Ki:0),P=4*(this._cubeSize-T);kr(e,L,P,3*T,2*T),l.setRenderTarget(e),l.render(u,Co)}};function qg(i){let t=[],e=[],n=[],s=i,r=i-Ki+1+Th.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ki?l=Th[a-i+Ki-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,v=3,m=2,f=1,M=new Float32Array(v*g*d),x=new Float32Array(m*g*d),T=new Float32Array(f*g*d);for(let P=0;P<d;P++){let A=P%3*2/3-1,V=P>2?0:-1,R=[A,V,0,A+2/3,V,0,A+2/3,V+1,0,A,V,0,A+2/3,V+1,0,A,V+1,0];M.set(R,v*g*P),x.set(p,m*g*P);let S=[P,P,P,P,P,P];T.set(S,f*g*P)}let L=new De;L.setAttribute("position",new Ve(M,v)),L.setAttribute("uv",new Ve(x,m)),L.setAttribute("faceIndex",new Ve(T,f)),t.push(L),s>Ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ch(i,t,e){let n=new Nn(i,t,e);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function kr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Yg(i,t,e){let n=new Float32Array(pi),s=new X(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ph(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Lh(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ul(){return`

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
	`}function Zg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Vo||l===Go,h=l===is||l===ss;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new ha(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{let u=o.image;if(c&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new ha(i));let p=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,p),o.addEventListener("dispose",r),p.texture}else return null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function jg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Kg(i,t,e,n){let s={},r=new WeakMap;function a(u){let p=u.target;p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);for(let g in p.morphAttributes){let v=p.morphAttributes[g];for(let m=0,f=v.length;m<f;m++)t.remove(v[m])}p.removeEventListener("dispose",a),delete s[p.id];let d=r.get(p);d&&(t.remove(d),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function l(u){let p=u.attributes;for(let g in p)t.update(p[g],i.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let v=d[g];for(let m=0,f=v.length;m<f;m++)t.update(v[m],i.ARRAY_BUFFER)}}function c(u){let p=[],d=u.index,g=u.attributes.position,v=0;if(d!==null){let M=d.array;v=d.version;for(let x=0,T=M.length;x<T;x+=3){let L=M[x+0],P=M[x+1],A=M[x+2];p.push(L,P,P,A,A,L)}}else if(g!==void 0){let M=g.array;v=g.version;for(let x=0,T=M.length/3-1;x<T;x+=3){let L=x+0,P=x+1,A=x+2;p.push(L,P,P,A,A,L)}}else return;let m=new(xu(p)?aa:ra)(p,1);m.version=v;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let p=r.get(u);if(p){let d=u.index;d!==null&&p.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Jg(i,t,e,n){let s=n.isWebGL2,r;function a(d){r=d}let o,l;function c(d){o=d.type,l=d.bytesPerElement}function h(d,g){i.drawElements(r,g,o,d*l),e.update(g,r,1)}function u(d,g,v){if(v===0)return;let m,f;if(s)m=i,f="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,o,d*l,v),e.update(g,r,v)}function p(d,g,v){if(v===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<v;f++)this.render(d[f]/l,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,o,d,0,v);let f=0;for(let M=0;M<v;M++)f+=g[M];e.update(f,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=p}function Qg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function t0(i,t){return i[0]-t[0]}function e0(i,t){return Math.abs(t[1])-Math.abs(i[1])}function n0(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,a=new Te,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){let p=c.morphTargetInfluences;if(t.isWebGL2===!0){let d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=d!==void 0?d.length:0,v=r.get(h);if(v===void 0||v.count!==g){let B=function(){b.dispose(),r.delete(h),h.removeEventListener("dispose",B)};v!==void 0&&v.texture.dispose();let M=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,L=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],V=0;M===!0&&(V=1),x===!0&&(V=2),T===!0&&(V=3);let R=h.attributes.position.count*V,S=1;R>t.maxTextureSize&&(S=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);let D=new Float32Array(R*S*4*g),b=new na(D,R,S,g);b.type=Yn,b.needsUpdate=!0;let $=V*4;for(let U=0;U<g;U++){let J=L[U],Y=P[U],et=A[U],N=R*S*4*U;for(let k=0;k<J.count;k++){let it=k*$;M===!0&&(a.fromBufferAttribute(J,k),D[N+it+0]=a.x,D[N+it+1]=a.y,D[N+it+2]=a.z,D[N+it+3]=0),x===!0&&(a.fromBufferAttribute(Y,k),D[N+it+4]=a.x,D[N+it+5]=a.y,D[N+it+6]=a.z,D[N+it+7]=0),T===!0&&(a.fromBufferAttribute(et,k),D[N+it+8]=a.x,D[N+it+9]=a.y,D[N+it+10]=a.z,D[N+it+11]=et.itemSize===4?a.w:1)}}v={count:g,texture:b,size:new yt(R,S)},r.set(h,v),h.addEventListener("dispose",B)}let m=0;for(let M=0;M<p.length;M++)m+=p[M];let f=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",f),u.getUniforms().setValue(i,"morphTargetInfluences",p),u.getUniforms().setValue(i,"morphTargetsTexture",v.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}else{let d=p===void 0?0:p.length,g=n[h.id];if(g===void 0||g.length!==d){g=[];for(let x=0;x<d;x++)g[x]=[x,0];n[h.id]=g}for(let x=0;x<d;x++){let T=g[x];T[0]=x,T[1]=p[x]}g.sort(e0);for(let x=0;x<8;x++)x<d&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(t0);let v=h.morphAttributes.position,m=h.morphAttributes.normal,f=0;for(let x=0;x<8;x++){let T=o[x],L=T[0],P=T[1];L!==Number.MAX_SAFE_INTEGER&&P?(v&&h.getAttribute("morphTarget"+x)!==v[L]&&h.setAttribute("morphTarget"+x,v[L]),m&&h.getAttribute("morphNormal"+x)!==m[L]&&h.setAttribute("morphNormal"+x,m[L]),s[x]=P,f+=P):(v&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),m&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let M=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(i,"morphTargetBaseInfluence",M),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function i0(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var ua=class extends fn{constructor(t,e,n,s,r,a,o,l,c,h){if(h=h!==void 0?h:gi,h!==gi&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gi&&(n=qn),n===void 0&&h===rs&&(n=mi),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Mu=new fn,Eu=new ua(1,1);Eu.compareFunction=_u;var wu=new na,Tu=new Zo,Au=new la,Ih=[],Dh=[],Nh=new Float32Array(16),Oh=new Float32Array(9),Uh=new Float32Array(4);function ds(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Ih[s];if(r===void 0&&(r=new Float32Array(s),Ih[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Aa(i,t){let e=Dh[t];e===void 0&&(e=new Int32Array(t),Dh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function s0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function r0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function a0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function o0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function l0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;Uh.set(n),i.uniformMatrix2fv(this.addr,!1,Uh),ye(e,n)}}function c0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;Oh.set(n),i.uniformMatrix3fv(this.addr,!1,Oh),ye(e,n)}}function h0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(xe(e,n))return;Nh.set(n),i.uniformMatrix4fv(this.addr,!1,Nh),ye(e,n)}}function u0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function d0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function f0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function p0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function m0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function g0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function _0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function v0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function x0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Eu:Mu;e.setTexture2D(t||r,s)}function y0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Tu,s)}function b0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Au,s)}function S0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wu,s)}function M0(i){switch(i){case 5126:return s0;case 35664:return r0;case 35665:return a0;case 35666:return o0;case 35674:return l0;case 35675:return c0;case 35676:return h0;case 5124:case 35670:return u0;case 35667:case 35671:return d0;case 35668:case 35672:return f0;case 35669:case 35673:return p0;case 5125:return m0;case 36294:return g0;case 36295:return _0;case 36296:return v0;case 35678:case 36198:case 36298:case 36306:case 35682:return x0;case 35679:case 36299:case 36307:return y0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return S0}}function E0(i,t){i.uniform1fv(this.addr,t)}function w0(i,t){let e=ds(t,this.size,2);i.uniform2fv(this.addr,e)}function T0(i,t){let e=ds(t,this.size,3);i.uniform3fv(this.addr,e)}function A0(i,t){let e=ds(t,this.size,4);i.uniform4fv(this.addr,e)}function R0(i,t){let e=ds(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function C0(i,t){let e=ds(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function P0(i,t){let e=ds(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function L0(i,t){i.uniform1iv(this.addr,t)}function I0(i,t){i.uniform2iv(this.addr,t)}function D0(i,t){i.uniform3iv(this.addr,t)}function N0(i,t){i.uniform4iv(this.addr,t)}function O0(i,t){i.uniform1uiv(this.addr,t)}function U0(i,t){i.uniform2uiv(this.addr,t)}function F0(i,t){i.uniform3uiv(this.addr,t)}function k0(i,t){i.uniform4uiv(this.addr,t)}function B0(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Mu,r[a])}function z0(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Tu,r[a])}function H0(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Au,r[a])}function V0(i,t,e){let n=this.cache,s=t.length,r=Aa(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||wu,r[a])}function G0(i){switch(i){case 5126:return E0;case 35664:return w0;case 35665:return T0;case 35666:return A0;case 35674:return R0;case 35675:return C0;case 35676:return P0;case 5124:case 35670:return L0;case 35667:case 35671:return I0;case 35668:case 35672:return D0;case 35669:case 35673:return N0;case 5125:return O0;case 36294:return U0;case 36295:return F0;case 36296:return k0;case 35678:case 36198:case 36298:case 36306:case 35682:return B0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}var Jo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=M0(e.type)}},Qo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=G0(e.type)}},tl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Do=/(\w+)(\])?(\[|\.)?/g;function Fh(i,t){i.seq.push(t),i.map[t.id]=t}function W0(i,t,e){let n=i.name,s=n.length;for(Do.lastIndex=0;;){let r=Do.exec(n),a=Do.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Fh(e,c===void 0?new Jo(o,i,t):new Qo(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new tl(o),Fh(e,u)),e=u}}}var ns=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);W0(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function kh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var X0=37297,$0=0;function q0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Y0(i){let t=ie.getPrimaries(ie.workingColorSpace),e=ie.getPrimaries(i),n;switch(t===e?n="":t===jr&&e===Zr?n="LinearDisplayP3ToLinearSRGB":t===Zr&&e===jr&&(n="LinearSRGBToLinearDisplayP3"),i){case Dn:case Ta:return[n,"LinearTransferOETF"];case Ae:case Nl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Bh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+q0(i.getShaderSource(t),a)}else return s}function Z0(i,t){let e=Y0(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function j0(i,t){let e;switch(t){case ef:e="Linear";break;case nf:e="Reinhard";break;case sf:e="OptimizedCineon";break;case Il:e="ACESFilmic";break;case af:e="AgX";break;case rf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function K0(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function J0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function Q0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function t_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ji(i){return i!==""}function zh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var e_=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(i){return i.replace(e_,i_)}var n_=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function i_(i,t){let e=qt[t];if(e===void 0){let n=n_.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return el(e)}var s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vh(i){return i.replace(s_,r_)}function r_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Gh(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function a_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ru?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ll?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function o_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case wa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function l_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function c_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case au:t="ENVMAP_BLENDING_MULTIPLY";break;case Qd:t="ENVMAP_BLENDING_MIX";break;case tf:t="ENVMAP_BLENDING_ADD";break}return t}function h_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function u_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=a_(e),c=o_(e),h=l_(e),u=c_(e),p=h_(e),d=e.isWebGL2?"":K0(e),g=J0(e),v=Q0(r),m=s.createProgram(),f,M,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ji).join(`
`),f.length>0&&(f+=`
`),M=[d,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ji).join(`
`),M.length>0&&(M+=`
`)):(f=[Gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),M=[d,Gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?qt.tonemapping_pars_fragment:"",e.toneMapping!==jn?j0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Z0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),a=el(a),a=zh(a,e),a=Hh(a,e),o=el(o),o=zh(o,e),o=Hh(o,e),a=Vh(a),o=Vh(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,M=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);let T=x+f+a,L=x+M+o,P=kh(s,s.VERTEX_SHADER,T),A=kh(s,s.FRAGMENT_SHADER,L);s.attachShader(m,P),s.attachShader(m,A),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function V(b){if(i.debug.checkShaderErrors){let $=s.getProgramInfoLog(m).trim(),B=s.getShaderInfoLog(P).trim(),U=s.getShaderInfoLog(A).trim(),J=!0,Y=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,P,A);else{let et=Bh(s,P,"vertex"),N=Bh(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+et+`
`+N)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(B===""||U==="")&&(Y=!1);Y&&(b.diagnostics={runnable:J,programLog:$,vertexShader:{log:B,prefix:f},fragmentShader:{log:U,prefix:M}})}s.deleteShader(P),s.deleteShader(A),R=new ns(s,m),S=t_(s,m)}let R;this.getUniforms=function(){return R===void 0&&V(this),R};let S;this.getAttributes=function(){return S===void 0&&V(this),S};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(m,X0)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=$0++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=P,this.fragmentShader=A,this}var d_=0,nl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new il(t),e.set(t,n)),n}},il=class{constructor(t){this.id=d_++,this.code=t,this.usedTimes=0}};function f_(i,t,e,n,s,r,a){let o=new sa,l=new nl,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,p=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(R){return R===0?"uv":`uv${R}`}function m(R,S,D,b,$){let B=b.fog,U=$.geometry,J=R.isMeshStandardMaterial?b.environment:null,Y=(R.isMeshStandardMaterial?e:t).get(R.envMap||J),et=Y&&Y.mapping===wa?Y.image.height:null,N=g[R.type];R.precision!==null&&(d=s.getMaxPrecision(R.precision),d!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",d,"instead."));let k=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,it=k!==void 0?k.length:0,st=0;U.morphAttributes.position!==void 0&&(st=1),U.morphAttributes.normal!==void 0&&(st=2),U.morphAttributes.color!==void 0&&(st=3);let G,ct,_t,pt;if(N){let Oe=_n[N];G=Oe.vertexShader,ct=Oe.fragmentShader}else G=R.vertexShader,ct=R.fragmentShader,l.update(R),_t=l.getVertexShaderID(R),pt=l.getFragmentShaderID(R);let ft=i.getRenderTarget(),Tt=$.isInstancedMesh===!0,At=$.isBatchedMesh===!0,wt=!!R.map,It=!!R.matcap,_=!!Y,q=!!R.aoMap,O=!!R.lightMap,C=!!R.bumpMap,w=!!R.normalMap,H=!!R.displacementMap,K=!!R.emissiveMap,E=!!R.metalnessMap,y=!!R.roughnessMap,F=R.anisotropy>0,Q=R.clearcoat>0,j=R.iridescence>0,nt=R.sheen>0,vt=R.transmission>0,ht=F&&!!R.anisotropyMap,Mt=Q&&!!R.clearcoatMap,Dt=Q&&!!R.clearcoatNormalMap,Ut=Q&&!!R.clearcoatRoughnessMap,ut=j&&!!R.iridescenceMap,Pt=j&&!!R.iridescenceThicknessMap,z=nt&&!!R.sheenColorMap,dt=nt&&!!R.sheenRoughnessMap,gt=!!R.specularMap,mt=!!R.specularColorMap,Lt=!!R.specularIntensityMap,$t=vt&&!!R.transmissionMap,Jt=vt&&!!R.thicknessMap,Ht=!!R.gradientMap,xt=!!R.alphaMap,W=R.alphaTest>0,bt=!!R.alphaHash,St=!!R.extensions,Ft=!!U.attributes.uv1,Nt=!!U.attributes.uv2,te=!!U.attributes.uv3,ee=jn;return R.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(ee=i.toneMapping),{isWebGL2:h,shaderID:N,shaderType:R.type,shaderName:R.name,vertexShader:G,fragmentShader:ct,defines:R.defines,customVertexShaderID:_t,customFragmentShaderID:pt,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:d,batching:At,instancing:Tt,instancingColor:Tt&&$.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:ft===null?i.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:Dn,map:wt,matcap:It,envMap:_,envMapMode:_&&Y.mapping,envMapCubeUVHeight:et,aoMap:q,lightMap:O,bumpMap:C,normalMap:w,displacementMap:p&&H,emissiveMap:K,normalMapObjectSpace:w&&R.normalMapType===vf,normalMapTangentSpace:w&&R.normalMapType===gu,metalnessMap:E,roughnessMap:y,anisotropy:F,anisotropyMap:ht,clearcoat:Q,clearcoatMap:Mt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Ut,iridescence:j,iridescenceMap:ut,iridescenceThicknessMap:Pt,sheen:nt,sheenColorMap:z,sheenRoughnessMap:dt,specularMap:gt,specularColorMap:mt,specularIntensityMap:Lt,transmission:vt,transmissionMap:$t,thicknessMap:Jt,gradientMap:Ht,opaque:R.transparent===!1&&R.blending===ts,alphaMap:xt,alphaTest:W,alphaHash:bt,combine:R.combine,mapUv:wt&&v(R.map.channel),aoMapUv:q&&v(R.aoMap.channel),lightMapUv:O&&v(R.lightMap.channel),bumpMapUv:C&&v(R.bumpMap.channel),normalMapUv:w&&v(R.normalMap.channel),displacementMapUv:H&&v(R.displacementMap.channel),emissiveMapUv:K&&v(R.emissiveMap.channel),metalnessMapUv:E&&v(R.metalnessMap.channel),roughnessMapUv:y&&v(R.roughnessMap.channel),anisotropyMapUv:ht&&v(R.anisotropyMap.channel),clearcoatMapUv:Mt&&v(R.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&v(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ut&&v(R.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&v(R.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&v(R.iridescenceThicknessMap.channel),sheenColorMapUv:z&&v(R.sheenColorMap.channel),sheenRoughnessMapUv:dt&&v(R.sheenRoughnessMap.channel),specularMapUv:gt&&v(R.specularMap.channel),specularColorMapUv:mt&&v(R.specularColorMap.channel),specularIntensityMapUv:Lt&&v(R.specularIntensityMap.channel),transmissionMapUv:$t&&v(R.transmissionMap.channel),thicknessMapUv:Jt&&v(R.thicknessMap.channel),alphaMapUv:xt&&v(R.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(w||F),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Ft,vertexUv2s:Nt,vertexUv3s:te,pointsUvs:$.isPoints===!0&&!!U.attributes.uv&&(wt||xt),fog:!!B,useFog:R.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:$.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:it,morphTextureStride:st,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:R.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ee,useLegacyLights:i._useLegacyLights,decodeVideoTexture:wt&&R.map.isVideoTexture===!0&&ie.getTransfer(R.map.colorSpace)===re,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===Ln,flipSided:R.side===He,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionDerivatives:St&&R.extensions.derivatives===!0,extensionFragDepth:St&&R.extensions.fragDepth===!0,extensionDrawBuffers:St&&R.extensions.drawBuffers===!0,extensionShaderTextureLOD:St&&R.extensions.shaderTextureLOD===!0,extensionClipCullDistance:St&&R.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()}}function f(R){let S=[];if(R.shaderID?S.push(R.shaderID):(S.push(R.customVertexShaderID),S.push(R.customFragmentShaderID)),R.defines!==void 0)for(let D in R.defines)S.push(D),S.push(R.defines[D]);return R.isRawShaderMaterial===!1&&(M(S,R),x(S,R),S.push(i.outputColorSpace)),S.push(R.customProgramCacheKey),S.join()}function M(R,S){R.push(S.precision),R.push(S.outputColorSpace),R.push(S.envMapMode),R.push(S.envMapCubeUVHeight),R.push(S.mapUv),R.push(S.alphaMapUv),R.push(S.lightMapUv),R.push(S.aoMapUv),R.push(S.bumpMapUv),R.push(S.normalMapUv),R.push(S.displacementMapUv),R.push(S.emissiveMapUv),R.push(S.metalnessMapUv),R.push(S.roughnessMapUv),R.push(S.anisotropyMapUv),R.push(S.clearcoatMapUv),R.push(S.clearcoatNormalMapUv),R.push(S.clearcoatRoughnessMapUv),R.push(S.iridescenceMapUv),R.push(S.iridescenceThicknessMapUv),R.push(S.sheenColorMapUv),R.push(S.sheenRoughnessMapUv),R.push(S.specularMapUv),R.push(S.specularColorMapUv),R.push(S.specularIntensityMapUv),R.push(S.transmissionMapUv),R.push(S.thicknessMapUv),R.push(S.combine),R.push(S.fogExp2),R.push(S.sizeAttenuation),R.push(S.morphTargetsCount),R.push(S.morphAttributeCount),R.push(S.numDirLights),R.push(S.numPointLights),R.push(S.numSpotLights),R.push(S.numSpotLightMaps),R.push(S.numHemiLights),R.push(S.numRectAreaLights),R.push(S.numDirLightShadows),R.push(S.numPointLightShadows),R.push(S.numSpotLightShadows),R.push(S.numSpotLightShadowsWithMaps),R.push(S.numLightProbes),R.push(S.shadowMapType),R.push(S.toneMapping),R.push(S.numClippingPlanes),R.push(S.numClipIntersection),R.push(S.depthPacking)}function x(R,S){o.disableAll(),S.isWebGL2&&o.enable(0),S.supportsVertexTextures&&o.enable(1),S.instancing&&o.enable(2),S.instancingColor&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),R.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.useLegacyLights&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),R.push(o.mask)}function T(R){let S=g[R.type],D;if(S){let b=_n[S];D=np.clone(b.uniforms)}else D=R.uniforms;return D}function L(R,S){let D;for(let b=0,$=c.length;b<$;b++){let B=c[b];if(B.cacheKey===S){D=B,++D.usedTimes;break}}return D===void 0&&(D=new u_(i,S,R,r),c.push(D)),D}function P(R){if(--R.usedTimes===0){let S=c.indexOf(R);c[S]=c[c.length-1],c.pop(),R.destroy()}}function A(R){l.remove(R)}function V(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:T,acquireProgram:L,releaseProgram:P,releaseShaderCache:A,programs:c,dispose:V}}function p_(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function m_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,p,d,g,v,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:p,material:d,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=d,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),t++,f}function o(u,p,d,g,v,m){let f=a(u,p,d,g,v,m);d.transmission>0?n.push(f):d.transparent===!0?s.push(f):e.push(f)}function l(u,p,d,g,v,m){let f=a(u,p,d,g,v,m);d.transmission>0?n.unshift(f):d.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,p){e.length>1&&e.sort(u||m_),n.length>1&&n.sort(p||Wh),s.length>1&&s.sort(p||Wh)}function h(){for(let u=t,p=i.length;u<p;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function g_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Xh,i.set(n,[a])):s>=r.length?(a=new Xh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function __(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new X,color:new Gt};break;case"SpotLight":e={position:new X,direction:new X,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new X,halfWidth:new X,halfHeight:new X};break}return i[t.id]=e,e}}}function v_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var x_=0;function y_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function b_(i,t){let e=new __,n=v_(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new X);let r=new X,a=new ae,o=new ae;function l(h,u){let p=0,d=0,g=0;for(let b=0;b<9;b++)s.probe[b].set(0,0,0);let v=0,m=0,f=0,M=0,x=0,T=0,L=0,P=0,A=0,V=0,R=0;h.sort(y_);let S=u===!0?Math.PI:1;for(let b=0,$=h.length;b<$;b++){let B=h[b],U=B.color,J=B.intensity,Y=B.distance,et=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)p+=U.r*J*S,d+=U.g*J*S,g+=U.b*J*S;else if(B.isLightProbe){for(let N=0;N<9;N++)s.probe[N].addScaledVector(B.sh.coefficients[N],J);R++}else if(B.isDirectionalLight){let N=e.get(B);if(N.color.copy(B.color).multiplyScalar(B.intensity*S),B.castShadow){let k=B.shadow,it=n.get(B);it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,s.directionalShadow[v]=it,s.directionalShadowMap[v]=et,s.directionalShadowMatrix[v]=B.shadow.matrix,T++}s.directional[v]=N,v++}else if(B.isSpotLight){let N=e.get(B);N.position.setFromMatrixPosition(B.matrixWorld),N.color.copy(U).multiplyScalar(J*S),N.distance=Y,N.coneCos=Math.cos(B.angle),N.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),N.decay=B.decay,s.spot[f]=N;let k=B.shadow;if(B.map&&(s.spotLightMap[A]=B.map,A++,k.updateMatrices(B),B.castShadow&&V++),s.spotLightMatrix[f]=k.matrix,B.castShadow){let it=n.get(B);it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,s.spotShadow[f]=it,s.spotShadowMap[f]=et,P++}f++}else if(B.isRectAreaLight){let N=e.get(B);N.color.copy(U).multiplyScalar(J),N.halfWidth.set(B.width*.5,0,0),N.halfHeight.set(0,B.height*.5,0),s.rectArea[M]=N,M++}else if(B.isPointLight){let N=e.get(B);if(N.color.copy(B.color).multiplyScalar(B.intensity*S),N.distance=B.distance,N.decay=B.decay,B.castShadow){let k=B.shadow,it=n.get(B);it.shadowBias=k.bias,it.shadowNormalBias=k.normalBias,it.shadowRadius=k.radius,it.shadowMapSize=k.mapSize,it.shadowCameraNear=k.camera.near,it.shadowCameraFar=k.camera.far,s.pointShadow[m]=it,s.pointShadowMap[m]=et,s.pointShadowMatrix[m]=B.shadow.matrix,L++}s.point[m]=N,m++}else if(B.isHemisphereLight){let N=e.get(B);N.skyColor.copy(B.color).multiplyScalar(J*S),N.groundColor.copy(B.groundColor).multiplyScalar(J*S),s.hemi[x]=N,x++}}M>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Et.LTC_FLOAT_1,s.rectAreaLTC2=Et.LTC_FLOAT_2):(s.rectAreaLTC1=Et.LTC_HALF_1,s.rectAreaLTC2=Et.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Et.LTC_FLOAT_1,s.rectAreaLTC2=Et.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=Et.LTC_HALF_1,s.rectAreaLTC2=Et.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=p,s.ambient[1]=d,s.ambient[2]=g;let D=s.hash;(D.directionalLength!==v||D.pointLength!==m||D.spotLength!==f||D.rectAreaLength!==M||D.hemiLength!==x||D.numDirectionalShadows!==T||D.numPointShadows!==L||D.numSpotShadows!==P||D.numSpotMaps!==A||D.numLightProbes!==R)&&(s.directional.length=v,s.spot.length=f,s.rectArea.length=M,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=P,s.spotShadowMap.length=P,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=P+A-V,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=V,s.numLightProbes=R,D.directionalLength=v,D.pointLength=m,D.spotLength=f,D.rectAreaLength=M,D.hemiLength=x,D.numDirectionalShadows=T,D.numPointShadows=L,D.numSpotShadows=P,D.numSpotMaps=A,D.numLightProbes=R,s.version=x_++)}function c(h,u){let p=0,d=0,g=0,v=0,m=0,f=u.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){let T=h[M];if(T.isDirectionalLight){let L=s.directional[p];L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(f),p++}else if(T.isSpotLight){let L=s.spot[g];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(f),L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(f),g++}else if(T.isRectAreaLight){let L=s.rectArea[v];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(f),o.identity(),a.copy(T.matrixWorld),a.premultiply(f),o.extractRotation(a),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),v++}else if(T.isPointLight){let L=s.point[d];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(f),d++}else if(T.isHemisphereLight){let L=s.hemi[m];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:s}}function $h(i,t){let e=new b_(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function S_(i,t){let e=new WeakMap;function n(r,a=0){let o=e.get(r),l;return o===void 0?(l=new $h(i,t),e.set(r,[l])):a>=o.length?(l=new $h(i,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:n,dispose:s}}var sl=class extends On{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},rl=class extends On{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},M_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E_=`uniform sampler2D shadow_pass;
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
}`;function w_(i,t,e){let n=new Gs,s=new yt,r=new yt,a=new Te,o=new sl({depthPacking:_f}),l=new rl,c={},h=e.maxTextureSize,u={[Jn]:He,[He]:Jn,[Ln]:Ln},p=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:M_,fragmentShader:E_}),d=p.clone();d.defines.HORIZONTAL_PASS=1;let g=new De;g.setAttribute("position",new Ve(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Re(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ru;let f=this.type;this.render=function(P,A,V){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;let R=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),b=i.state;b.setBlending(Zn),b.buffers.color.setClear(1,1,1,1),b.buffers.depth.setTest(!0),b.setScissorTest(!1);let $=f!==Pn&&this.type===Pn,B=f===Pn&&this.type!==Pn;for(let U=0,J=P.length;U<J;U++){let Y=P[U],et=Y.shadow;if(et===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(et.autoUpdate===!1&&et.needsUpdate===!1)continue;s.copy(et.mapSize);let N=et.getFrameExtents();if(s.multiply(N),r.copy(et.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/N.x),s.x=r.x*N.x,et.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/N.y),s.y=r.y*N.y,et.mapSize.y=r.y)),et.map===null||$===!0||B===!0){let it=this.type!==Pn?{minFilter:Be,magFilter:Be}:{};et.map!==null&&et.map.dispose(),et.map=new Nn(s.x,s.y,it),et.map.texture.name=Y.name+".shadowMap",et.camera.updateProjectionMatrix()}i.setRenderTarget(et.map),i.clear();let k=et.getViewportCount();for(let it=0;it<k;it++){let st=et.getViewport(it);a.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),b.viewport(a),et.updateMatrices(Y,it),n=et.getFrustum(),T(A,V,et.camera,Y,this.type)}et.isPointLightShadow!==!0&&this.type===Pn&&M(et,V),et.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(R,S,D)};function M(P,A){let V=t.update(v);p.defines.VSM_SAMPLES!==P.blurSamples&&(p.defines.VSM_SAMPLES=P.blurSamples,d.defines.VSM_SAMPLES=P.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Nn(s.x,s.y)),p.uniforms.shadow_pass.value=P.map.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(A,null,V,p,v,null),d.uniforms.shadow_pass.value=P.mapPass.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(A,null,V,d,v,null)}function x(P,A,V,R){let S=null,D=V.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(D!==void 0)S=D;else if(S=V.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let b=S.uuid,$=A.uuid,B=c[b];B===void 0&&(B={},c[b]=B);let U=B[$];U===void 0&&(U=S.clone(),B[$]=U,A.addEventListener("dispose",L)),S=U}if(S.visible=A.visible,S.wireframe=A.wireframe,R===Pn?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,V.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let b=i.properties.get(S);b.light=V}return S}function T(P,A,V,R,S){if(P.visible===!1)return;if(P.layers.test(A.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&S===Pn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,P.matrixWorld);let $=t.update(P),B=P.material;if(Array.isArray(B)){let U=$.groups;for(let J=0,Y=U.length;J<Y;J++){let et=U[J],N=B[et.materialIndex];if(N&&N.visible){let k=x(P,N,R,S);P.onBeforeShadow(i,P,A,V,$,k,et),i.renderBufferDirect(V,null,$,k,P,et),P.onAfterShadow(i,P,A,V,$,k,et)}}}else if(B.visible){let U=x(P,B,R,S);P.onBeforeShadow(i,P,A,V,$,U,null),i.renderBufferDirect(V,null,$,U,P,null),P.onAfterShadow(i,P,A,V,$,U,null)}}let b=P.children;for(let $=0,B=b.length;$<B;$++)T(b[$],A,V,R,S)}function L(P){P.target.removeEventListener("dispose",L);for(let V in c){let R=c[V],S=P.target.uuid;S in R&&(R[S].dispose(),delete R[S])}}}function T_(i,t,e){let n=e.isWebGL2;function s(){let W=!1,bt=new Te,St=null,Ft=new Te(0,0,0,0);return{setMask:function(Nt){St!==Nt&&!W&&(i.colorMask(Nt,Nt,Nt,Nt),St=Nt)},setLocked:function(Nt){W=Nt},setClear:function(Nt,te,ee,Se,Oe){Oe===!0&&(Nt*=Se,te*=Se,ee*=Se),bt.set(Nt,te,ee,Se),Ft.equals(bt)===!1&&(i.clearColor(Nt,te,ee,Se),Ft.copy(bt))},reset:function(){W=!1,St=null,Ft.set(-1,0,0,0)}}}function r(){let W=!1,bt=null,St=null,Ft=null;return{setTest:function(Nt){Nt?At(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(Nt){bt!==Nt&&!W&&(i.depthMask(Nt),bt=Nt)},setFunc:function(Nt){if(St!==Nt){switch(Nt){case $d:i.depthFunc(i.NEVER);break;case qd:i.depthFunc(i.ALWAYS);break;case Yd:i.depthFunc(i.LESS);break;case Xr:i.depthFunc(i.LEQUAL);break;case Zd:i.depthFunc(i.EQUAL);break;case jd:i.depthFunc(i.GEQUAL);break;case Kd:i.depthFunc(i.GREATER);break;case Jd:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=Nt}},setLocked:function(Nt){W=Nt},setClear:function(Nt){Ft!==Nt&&(i.clearDepth(Nt),Ft=Nt)},reset:function(){W=!1,bt=null,St=null,Ft=null}}}function a(){let W=!1,bt=null,St=null,Ft=null,Nt=null,te=null,ee=null,Se=null,Oe=null;return{setTest:function(se){W||(se?At(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(se){bt!==se&&!W&&(i.stencilMask(se),bt=se)},setFunc:function(se,Ue,gn){(St!==se||Ft!==Ue||Nt!==gn)&&(i.stencilFunc(se,Ue,gn),St=se,Ft=Ue,Nt=gn)},setOp:function(se,Ue,gn){(te!==se||ee!==Ue||Se!==gn)&&(i.stencilOp(se,Ue,gn),te=se,ee=Ue,Se=gn)},setLocked:function(se){W=se},setClear:function(se){Oe!==se&&(i.clearStencil(se),Oe=se)},reset:function(){W=!1,bt=null,St=null,Ft=null,Nt=null,te=null,ee=null,Se=null,Oe=null}}}let o=new s,l=new r,c=new a,h=new WeakMap,u=new WeakMap,p={},d={},g=new WeakMap,v=[],m=null,f=!1,M=null,x=null,T=null,L=null,P=null,A=null,V=null,R=new Gt(0,0,0),S=0,D=!1,b=null,$=null,B=null,U=null,J=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),et=!1,N=0,k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(k)[1]),et=N>=1):k.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),et=N>=2);let it=null,st={},G=i.getParameter(i.SCISSOR_BOX),ct=i.getParameter(i.VIEWPORT),_t=new Te().fromArray(G),pt=new Te().fromArray(ct);function ft(W,bt,St,Ft){let Nt=new Uint8Array(4),te=i.createTexture();i.bindTexture(W,te),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ee=0;ee<St;ee++)n&&(W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY)?i.texImage3D(bt,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,Nt):i.texImage2D(bt+ee,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Nt);return te}let Tt={};Tt[i.TEXTURE_2D]=ft(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=ft(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Tt[i.TEXTURE_2D_ARRAY]=ft(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=ft(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),At(i.DEPTH_TEST),l.setFunc(Xr),K(!1),E(wc),At(i.CULL_FACE),w(Zn);function At(W){p[W]!==!0&&(i.enable(W),p[W]=!0)}function wt(W){p[W]!==!1&&(i.disable(W),p[W]=!1)}function It(W,bt){return d[W]!==bt?(i.bindFramebuffer(W,bt),d[W]=bt,n&&(W===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=bt),W===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=bt)),!0):!1}function _(W,bt){let St=v,Ft=!1;if(W)if(St=g.get(bt),St===void 0&&(St=[],g.set(bt,St)),W.isWebGLMultipleRenderTargets){let Nt=W.texture;if(St.length!==Nt.length||St[0]!==i.COLOR_ATTACHMENT0){for(let te=0,ee=Nt.length;te<ee;te++)St[te]=i.COLOR_ATTACHMENT0+te;St.length=Nt.length,Ft=!0}}else St[0]!==i.COLOR_ATTACHMENT0&&(St[0]=i.COLOR_ATTACHMENT0,Ft=!0);else St[0]!==i.BACK&&(St[0]=i.BACK,Ft=!0);Ft&&(e.isWebGL2?i.drawBuffers(St):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(St))}function q(W){return m!==W?(i.useProgram(W),m=W,!0):!1}let O={[fi]:i.FUNC_ADD,[Ld]:i.FUNC_SUBTRACT,[Id]:i.FUNC_REVERSE_SUBTRACT};if(n)O[Cc]=i.MIN,O[Pc]=i.MAX;else{let W=t.get("EXT_blend_minmax");W!==null&&(O[Cc]=W.MIN_EXT,O[Pc]=W.MAX_EXT)}let C={[Dd]:i.ZERO,[Nd]:i.ONE,[Od]:i.SRC_COLOR,[zo]:i.SRC_ALPHA,[Hd]:i.SRC_ALPHA_SATURATE,[Bd]:i.DST_COLOR,[Fd]:i.DST_ALPHA,[Ud]:i.ONE_MINUS_SRC_COLOR,[Ho]:i.ONE_MINUS_SRC_ALPHA,[zd]:i.ONE_MINUS_DST_COLOR,[kd]:i.ONE_MINUS_DST_ALPHA,[Vd]:i.CONSTANT_COLOR,[Gd]:i.ONE_MINUS_CONSTANT_COLOR,[Wd]:i.CONSTANT_ALPHA,[Xd]:i.ONE_MINUS_CONSTANT_ALPHA};function w(W,bt,St,Ft,Nt,te,ee,Se,Oe,se){if(W===Zn){f===!0&&(wt(i.BLEND),f=!1);return}if(f===!1&&(At(i.BLEND),f=!0),W!==Pd){if(W!==M||se!==D){if((x!==fi||P!==fi)&&(i.blendEquation(i.FUNC_ADD),x=fi,P=fi),se)switch(W){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tc:i.blendFunc(i.ONE,i.ONE);break;case Ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Tc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}T=null,L=null,A=null,V=null,R.set(0,0,0),S=0,M=W,D=se}return}Nt=Nt||bt,te=te||St,ee=ee||Ft,(bt!==x||Nt!==P)&&(i.blendEquationSeparate(O[bt],O[Nt]),x=bt,P=Nt),(St!==T||Ft!==L||te!==A||ee!==V)&&(i.blendFuncSeparate(C[St],C[Ft],C[te],C[ee]),T=St,L=Ft,A=te,V=ee),(Se.equals(R)===!1||Oe!==S)&&(i.blendColor(Se.r,Se.g,Se.b,Oe),R.copy(Se),S=Oe),M=W,D=!1}function H(W,bt){W.side===Ln?wt(i.CULL_FACE):At(i.CULL_FACE);let St=W.side===He;bt&&(St=!St),K(St),W.blending===ts&&W.transparent===!1?w(Zn):w(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),l.setFunc(W.depthFunc),l.setTest(W.depthTest),l.setMask(W.depthWrite),o.setMask(W.colorWrite);let Ft=W.stencilWrite;c.setTest(Ft),Ft&&(c.setMask(W.stencilWriteMask),c.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),c.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),F(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?At(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function K(W){b!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),b=W)}function E(W){W!==Rd?(At(i.CULL_FACE),W!==$&&(W===wc?i.cullFace(i.BACK):W===Cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),$=W}function y(W){W!==B&&(et&&i.lineWidth(W),B=W)}function F(W,bt,St){W?(At(i.POLYGON_OFFSET_FILL),(U!==bt||J!==St)&&(i.polygonOffset(bt,St),U=bt,J=St)):wt(i.POLYGON_OFFSET_FILL)}function Q(W){W?At(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function j(W){W===void 0&&(W=i.TEXTURE0+Y-1),it!==W&&(i.activeTexture(W),it=W)}function nt(W,bt,St){St===void 0&&(it===null?St=i.TEXTURE0+Y-1:St=it);let Ft=st[St];Ft===void 0&&(Ft={type:void 0,texture:void 0},st[St]=Ft),(Ft.type!==W||Ft.texture!==bt)&&(it!==St&&(i.activeTexture(St),it=St),i.bindTexture(W,bt||Tt[W]),Ft.type=W,Ft.texture=bt)}function vt(){let W=st[it];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function ht(){try{i.compressedTexImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Mt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Dt(){try{i.texSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ut(){try{i.texSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function z(){try{i.texStorage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{i.texStorage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function mt(){try{i.texImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Lt(W){_t.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),_t.copy(W))}function $t(W){pt.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),pt.copy(W))}function Jt(W,bt){let St=u.get(bt);St===void 0&&(St=new WeakMap,u.set(bt,St));let Ft=St.get(W);Ft===void 0&&(Ft=i.getUniformBlockIndex(bt,W.name),St.set(W,Ft))}function Ht(W,bt){let Ft=u.get(bt).get(W);h.get(bt)!==Ft&&(i.uniformBlockBinding(bt,Ft,W.__bindingPointIndex),h.set(bt,Ft))}function xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),p={},it=null,st={},d={},g=new WeakMap,v=[],m=null,f=!1,M=null,x=null,T=null,L=null,P=null,A=null,V=null,R=new Gt(0,0,0),S=0,D=!1,b=null,$=null,B=null,U=null,J=null,_t.set(0,0,i.canvas.width,i.canvas.height),pt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:At,disable:wt,bindFramebuffer:It,drawBuffers:_,useProgram:q,setBlending:w,setMaterial:H,setFlipSided:K,setCullFace:E,setLineWidth:y,setPolygonOffset:F,setScissorTest:Q,activeTexture:j,bindTexture:nt,unbindTexture:vt,compressedTexImage2D:ht,compressedTexImage3D:Mt,texImage2D:gt,texImage3D:mt,updateUBOMapping:Jt,uniformBlockBinding:Ht,texStorage2D:z,texStorage3D:dt,texSubImage2D:Dt,texSubImage3D:Ut,compressedTexSubImage2D:ut,compressedTexSubImage3D:Pt,scissor:Lt,viewport:$t,reset:xt}}function A_(i,t,e,n,s,r,a){let o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,p=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return d?new OffscreenCanvas(E,y):Qr("canvas")}function v(E,y,F,Q){let j=1;if((E.width>Q||E.height>Q)&&(j=Q/Math.max(E.width,E.height)),j<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){let nt=y?Jr:Math.floor,vt=nt(j*E.width),ht=nt(j*E.height);u===void 0&&(u=g(vt,ht));let Mt=F?g(vt,ht):u;return Mt.width=vt,Mt.height=ht,Mt.getContext("2d").drawImage(E,0,0,vt,ht),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+vt+"x"+ht+")."),Mt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return qo(E.width)&&qo(E.height)}function f(E){return o?!1:E.wrapS!==un||E.wrapT!==un||E.minFilter!==Be&&E.minFilter!==Qe}function M(E,y){return E.generateMipmaps&&y&&E.minFilter!==Be&&E.minFilter!==Qe}function x(E){i.generateMipmap(E)}function T(E,y,F,Q,j=!1){if(o===!1)return y;if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let nt=y;if(y===i.RED&&(F===i.FLOAT&&(nt=i.R32F),F===i.HALF_FLOAT&&(nt=i.R16F),F===i.UNSIGNED_BYTE&&(nt=i.R8)),y===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(nt=i.R8UI),F===i.UNSIGNED_SHORT&&(nt=i.R16UI),F===i.UNSIGNED_INT&&(nt=i.R32UI),F===i.BYTE&&(nt=i.R8I),F===i.SHORT&&(nt=i.R16I),F===i.INT&&(nt=i.R32I)),y===i.RG&&(F===i.FLOAT&&(nt=i.RG32F),F===i.HALF_FLOAT&&(nt=i.RG16F),F===i.UNSIGNED_BYTE&&(nt=i.RG8)),y===i.RGBA){let vt=j?Yr:ie.getTransfer(Q);F===i.FLOAT&&(nt=i.RGBA32F),F===i.HALF_FLOAT&&(nt=i.RGBA16F),F===i.UNSIGNED_BYTE&&(nt=vt===re?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(nt=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(nt=i.RGB5_A1)}return(nt===i.R16F||nt===i.R32F||nt===i.RG16F||nt===i.RG32F||nt===i.RGBA16F||nt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function L(E,y,F){return M(E,F)===!0||E.isFramebufferTexture&&E.minFilter!==Be&&E.minFilter!==Qe?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function P(E){return E===Be||E===Lc||E===so?i.NEAREST:i.LINEAR}function A(E){let y=E.target;y.removeEventListener("dispose",A),R(y),y.isVideoTexture&&h.delete(y)}function V(E){let y=E.target;y.removeEventListener("dispose",V),D(y)}function R(E){let y=n.get(E);if(y.__webglInit===void 0)return;let F=E.source,Q=p.get(F);if(Q){let j=Q[y.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(E),Object.keys(Q).length===0&&p.delete(F)}n.remove(E)}function S(E){let y=n.get(E);i.deleteTexture(y.__webglTexture);let F=E.source,Q=p.get(F);delete Q[y.__cacheKey],a.memory.textures--}function D(E){let y=E.texture,F=n.get(E),Q=n.get(y);if(Q.__webglTexture!==void 0&&(i.deleteTexture(Q.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(F.__webglFramebuffer[j]))for(let nt=0;nt<F.__webglFramebuffer[j].length;nt++)i.deleteFramebuffer(F.__webglFramebuffer[j][nt]);else i.deleteFramebuffer(F.__webglFramebuffer[j]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[j])}else{if(Array.isArray(F.__webglFramebuffer))for(let j=0;j<F.__webglFramebuffer.length;j++)i.deleteFramebuffer(F.__webglFramebuffer[j]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let j=0;j<F.__webglColorRenderbuffer.length;j++)F.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[j]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let j=0,nt=y.length;j<nt;j++){let vt=n.get(y[j]);vt.__webglTexture&&(i.deleteTexture(vt.__webglTexture),a.memory.textures--),n.remove(y[j])}n.remove(y),n.remove(E)}let b=0;function $(){b=0}function B(){let E=b;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),b+=1,E}function U(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function J(E,y){let F=n.get(E);if(E.isVideoTexture&&H(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){let Q=E.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_t(F,E,y);return}}e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+y)}function Y(E,y){let F=n.get(E);if(E.version>0&&F.__version!==E.version){_t(F,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+y)}function et(E,y){let F=n.get(E);if(E.version>0&&F.__version!==E.version){_t(F,E,y);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+y)}function N(E,y){let F=n.get(E);if(E.version>0&&F.__version!==E.version){pt(F,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+y)}let k={[Wo]:i.REPEAT,[un]:i.CLAMP_TO_EDGE,[Xo]:i.MIRRORED_REPEAT},it={[Be]:i.NEAREST,[Lc]:i.NEAREST_MIPMAP_NEAREST,[so]:i.NEAREST_MIPMAP_LINEAR,[Qe]:i.LINEAR,[of]:i.LINEAR_MIPMAP_NEAREST,[zs]:i.LINEAR_MIPMAP_LINEAR},st={[xf]:i.NEVER,[wf]:i.ALWAYS,[yf]:i.LESS,[_u]:i.LEQUAL,[bf]:i.EQUAL,[Ef]:i.GEQUAL,[Sf]:i.GREATER,[Mf]:i.NOTEQUAL};function G(E,y,F){if(F?(i.texParameteri(E,i.TEXTURE_WRAP_S,k[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,k[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,k[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,it[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,it[y.minFilter])):(i.texParameteri(E,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(E,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(y.wrapS!==un||y.wrapT!==un)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(E,i.TEXTURE_MAG_FILTER,P(y.magFilter)),i.texParameteri(E,i.TEXTURE_MIN_FILTER,P(y.minFilter)),y.minFilter!==Be&&y.minFilter!==Qe&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,st[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let Q=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===Be||y.minFilter!==so&&y.minFilter!==zs||y.type===Yn&&t.has("OES_texture_float_linear")===!1||o===!1&&y.type===Hs&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(i.texParameterf(E,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function ct(E,y){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",A));let Q=y.source,j=p.get(Q);j===void 0&&(j={},p.set(Q,j));let nt=U(y);if(nt!==E.__cacheKey){j[nt]===void 0&&(j[nt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),j[nt].usedTimes++;let vt=j[E.__cacheKey];vt!==void 0&&(j[E.__cacheKey].usedTimes--,vt.usedTimes===0&&S(y)),E.__cacheKey=nt,E.__webglTexture=j[nt].texture}return F}function _t(E,y,F){let Q=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Q=i.TEXTURE_3D);let j=ct(E,y),nt=y.source;e.bindTexture(Q,E.__webglTexture,i.TEXTURE0+F);let vt=n.get(nt);if(nt.version!==vt.__version||j===!0){e.activeTexture(i.TEXTURE0+F);let ht=ie.getPrimaries(ie.workingColorSpace),Mt=y.colorSpace===tn?null:ie.getPrimaries(y.colorSpace),Dt=y.colorSpace===tn||ht===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Ut=f(y)&&m(y.image)===!1,ut=v(y.image,Ut,!1,s.maxTextureSize);ut=K(y,ut);let Pt=m(ut)||o,z=r.convert(y.format,y.colorSpace),dt=r.convert(y.type),gt=T(y.internalFormat,z,dt,y.colorSpace,y.isVideoTexture);G(Q,y,Pt);let mt,Lt=y.mipmaps,$t=o&&y.isVideoTexture!==!0&&gt!==pu,Jt=vt.__version===void 0||j===!0,Ht=L(y,ut,Pt);if(y.isDepthTexture)gt=i.DEPTH_COMPONENT,o?y.type===Yn?gt=i.DEPTH_COMPONENT32F:y.type===qn?gt=i.DEPTH_COMPONENT24:y.type===mi?gt=i.DEPTH24_STENCIL8:gt=i.DEPTH_COMPONENT16:y.type===Yn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===gi&&gt===i.DEPTH_COMPONENT&&y.type!==Dl&&y.type!==qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=qn,dt=r.convert(y.type)),y.format===rs&&gt===i.DEPTH_COMPONENT&&(gt=i.DEPTH_STENCIL,y.type!==mi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=mi,dt=r.convert(y.type))),Jt&&($t?e.texStorage2D(i.TEXTURE_2D,1,gt,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,gt,ut.width,ut.height,0,z,dt,null));else if(y.isDataTexture)if(Lt.length>0&&Pt){$t&&Jt&&e.texStorage2D(i.TEXTURE_2D,Ht,gt,Lt[0].width,Lt[0].height);for(let xt=0,W=Lt.length;xt<W;xt++)mt=Lt[xt],$t?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,mt.width,mt.height,z,dt,mt.data):e.texImage2D(i.TEXTURE_2D,xt,gt,mt.width,mt.height,0,z,dt,mt.data);y.generateMipmaps=!1}else $t?(Jt&&e.texStorage2D(i.TEXTURE_2D,Ht,gt,ut.width,ut.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,z,dt,ut.data)):e.texImage2D(i.TEXTURE_2D,0,gt,ut.width,ut.height,0,z,dt,ut.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){$t&&Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ht,gt,Lt[0].width,Lt[0].height,ut.depth);for(let xt=0,W=Lt.length;xt<W;xt++)mt=Lt[xt],y.format!==dn?z!==null?$t?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,mt.width,mt.height,ut.depth,z,mt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,gt,mt.width,mt.height,ut.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,mt.width,mt.height,ut.depth,z,dt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,gt,mt.width,mt.height,ut.depth,0,z,dt,mt.data)}else{$t&&Jt&&e.texStorage2D(i.TEXTURE_2D,Ht,gt,Lt[0].width,Lt[0].height);for(let xt=0,W=Lt.length;xt<W;xt++)mt=Lt[xt],y.format!==dn?z!==null?$t?e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,mt.width,mt.height,z,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,gt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$t?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,mt.width,mt.height,z,dt,mt.data):e.texImage2D(i.TEXTURE_2D,xt,gt,mt.width,mt.height,0,z,dt,mt.data)}else if(y.isDataArrayTexture)$t?(Jt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ht,gt,ut.width,ut.height,ut.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,z,dt,ut.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,gt,ut.width,ut.height,ut.depth,0,z,dt,ut.data);else if(y.isData3DTexture)$t?(Jt&&e.texStorage3D(i.TEXTURE_3D,Ht,gt,ut.width,ut.height,ut.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,z,dt,ut.data)):e.texImage3D(i.TEXTURE_3D,0,gt,ut.width,ut.height,ut.depth,0,z,dt,ut.data);else if(y.isFramebufferTexture){if(Jt)if($t)e.texStorage2D(i.TEXTURE_2D,Ht,gt,ut.width,ut.height);else{let xt=ut.width,W=ut.height;for(let bt=0;bt<Ht;bt++)e.texImage2D(i.TEXTURE_2D,bt,gt,xt,W,0,z,dt,null),xt>>=1,W>>=1}}else if(Lt.length>0&&Pt){$t&&Jt&&e.texStorage2D(i.TEXTURE_2D,Ht,gt,Lt[0].width,Lt[0].height);for(let xt=0,W=Lt.length;xt<W;xt++)mt=Lt[xt],$t?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,z,dt,mt):e.texImage2D(i.TEXTURE_2D,xt,gt,z,dt,mt);y.generateMipmaps=!1}else $t?(Jt&&e.texStorage2D(i.TEXTURE_2D,Ht,gt,ut.width,ut.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,z,dt,ut)):e.texImage2D(i.TEXTURE_2D,0,gt,z,dt,ut);M(y,Pt)&&x(Q),vt.__version=nt.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function pt(E,y,F){if(y.image.length!==6)return;let Q=ct(E,y),j=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+F);let nt=n.get(j);if(j.version!==nt.__version||Q===!0){e.activeTexture(i.TEXTURE0+F);let vt=ie.getPrimaries(ie.workingColorSpace),ht=y.colorSpace===tn?null:ie.getPrimaries(y.colorSpace),Mt=y.colorSpace===tn||vt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let Dt=y.isCompressedTexture||y.image[0].isCompressedTexture,Ut=y.image[0]&&y.image[0].isDataTexture,ut=[];for(let xt=0;xt<6;xt++)!Dt&&!Ut?ut[xt]=v(y.image[xt],!1,!0,s.maxCubemapSize):ut[xt]=Ut?y.image[xt].image:y.image[xt],ut[xt]=K(y,ut[xt]);let Pt=ut[0],z=m(Pt)||o,dt=r.convert(y.format,y.colorSpace),gt=r.convert(y.type),mt=T(y.internalFormat,dt,gt,y.colorSpace),Lt=o&&y.isVideoTexture!==!0,$t=nt.__version===void 0||Q===!0,Jt=L(y,Pt,z);G(i.TEXTURE_CUBE_MAP,y,z);let Ht;if(Dt){Lt&&$t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Jt,mt,Pt.width,Pt.height);for(let xt=0;xt<6;xt++){Ht=ut[xt].mipmaps;for(let W=0;W<Ht.length;W++){let bt=Ht[W];y.format!==dn?dt!==null?Lt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W,0,0,bt.width,bt.height,dt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W,mt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W,0,0,bt.width,bt.height,dt,gt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W,mt,bt.width,bt.height,0,dt,gt,bt.data)}}}else{Ht=y.mipmaps,Lt&&$t&&(Ht.length>0&&Jt++,e.texStorage2D(i.TEXTURE_CUBE_MAP,Jt,mt,ut[0].width,ut[0].height));for(let xt=0;xt<6;xt++)if(Ut){Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,ut[xt].width,ut[xt].height,dt,gt,ut[xt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,mt,ut[xt].width,ut[xt].height,0,dt,gt,ut[xt].data);for(let W=0;W<Ht.length;W++){let St=Ht[W].image[xt].image;Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W+1,0,0,St.width,St.height,dt,gt,St.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W+1,mt,St.width,St.height,0,dt,gt,St.data)}}else{Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,dt,gt,ut[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,mt,dt,gt,ut[xt]);for(let W=0;W<Ht.length;W++){let bt=Ht[W];Lt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W+1,0,0,dt,gt,bt.image[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,W+1,mt,dt,gt,bt.image[xt])}}}M(y,z)&&x(i.TEXTURE_CUBE_MAP),nt.__version=j.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ft(E,y,F,Q,j,nt){let vt=r.convert(F.format,F.colorSpace),ht=r.convert(F.type),Mt=T(F.internalFormat,vt,ht,F.colorSpace);if(!n.get(y).__hasExternalTextures){let Ut=Math.max(1,y.width>>nt),ut=Math.max(1,y.height>>nt);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,nt,Mt,Ut,ut,y.depth,0,vt,ht,null):e.texImage2D(j,nt,Mt,Ut,ut,0,vt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),w(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,j,n.get(F).__webglTexture,0,C(y)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,j,n.get(F).__webglTexture,nt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(E,y,F){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let Q=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||w(y)){let j=y.depthTexture;j&&j.isDepthTexture&&(j.type===Yn?Q=i.DEPTH_COMPONENT32F:j.type===qn&&(Q=i.DEPTH_COMPONENT24));let nt=C(y);w(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,Q,y.width,y.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,Q,y.width,y.height)}else i.renderbufferStorage(i.RENDERBUFFER,Q,y.width,y.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){let Q=C(y);F&&w(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,y.width,y.height):w(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,i.DEPTH24_STENCIL8,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{let Q=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let j=0;j<Q.length;j++){let nt=Q[j],vt=r.convert(nt.format,nt.colorSpace),ht=r.convert(nt.type),Mt=T(nt.internalFormat,vt,ht,nt.colorSpace),Dt=C(y);F&&w(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,Mt,y.width,y.height):w(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt,Mt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),J(y.depthTexture,0);let Q=n.get(y.depthTexture).__webglTexture,j=C(y);if(y.depthTexture.format===gi)w(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(y.depthTexture.format===rs)w(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function wt(E){let y=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");At(y.__webglFramebuffer,E)}else if(F){y.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Q]),y.__webglDepthbuffer[Q]=i.createRenderbuffer(),Tt(y.__webglDepthbuffer[Q],E,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),Tt(y.__webglDepthbuffer,E,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(E,y,F){let Q=n.get(E);y!==void 0&&ft(Q.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&wt(E)}function _(E){let y=E.texture,F=n.get(E),Q=n.get(y);E.addEventListener("dispose",V),E.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=y.version,a.memory.textures++);let j=E.isWebGLCubeRenderTarget===!0,nt=E.isWebGLMultipleRenderTargets===!0,vt=m(E)||o;if(j){F.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(o&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[ht]=[];for(let Mt=0;Mt<y.mipmaps.length;Mt++)F.__webglFramebuffer[ht][Mt]=i.createFramebuffer()}else F.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let ht=0;ht<y.mipmaps.length;ht++)F.__webglFramebuffer[ht]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(nt)if(s.drawBuffers){let ht=E.texture;for(let Mt=0,Dt=ht.length;Mt<Dt;Mt++){let Ut=n.get(ht[Mt]);Ut.__webglTexture===void 0&&(Ut.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&E.samples>0&&w(E)===!1){let ht=nt?y:[y];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Mt=0;Mt<ht.length;Mt++){let Dt=ht[Mt];F.__webglColorRenderbuffer[Mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[Mt]);let Ut=r.convert(Dt.format,Dt.colorSpace),ut=r.convert(Dt.type),Pt=T(Dt.internalFormat,Ut,ut,Dt.colorSpace,E.isXRRenderTarget===!0),z=C(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,z,Pt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,F.__webglColorRenderbuffer[Mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Tt(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),G(i.TEXTURE_CUBE_MAP,y,vt);for(let ht=0;ht<6;ht++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let Mt=0;Mt<y.mipmaps.length;Mt++)ft(F.__webglFramebuffer[ht][Mt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Mt);else ft(F.__webglFramebuffer[ht],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);M(y,vt)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(nt){let ht=E.texture;for(let Mt=0,Dt=ht.length;Mt<Dt;Mt++){let Ut=ht[Mt],ut=n.get(Ut);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),G(i.TEXTURE_2D,Ut,vt),ft(F.__webglFramebuffer,E,Ut,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,0),M(Ut,vt)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(o?ht=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ht,Q.__webglTexture),G(ht,y,vt),o&&y.mipmaps&&y.mipmaps.length>0)for(let Mt=0;Mt<y.mipmaps.length;Mt++)ft(F.__webglFramebuffer[Mt],E,y,i.COLOR_ATTACHMENT0,ht,Mt);else ft(F.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,ht,0);M(y,vt)&&x(ht),e.unbindTexture()}E.depthBuffer&&wt(E)}function q(E){let y=m(E)||o,F=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Q=0,j=F.length;Q<j;Q++){let nt=F[Q];if(M(nt,y)){let vt=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ht=n.get(nt).__webglTexture;e.bindTexture(vt,ht),x(vt),e.unbindTexture()}}}function O(E){if(o&&E.samples>0&&w(E)===!1){let y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],F=E.width,Q=E.height,j=i.COLOR_BUFFER_BIT,nt=[],vt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=n.get(E),Mt=E.isWebGLMultipleRenderTargets===!0;if(Mt)for(let Dt=0;Dt<y.length;Dt++)e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let Dt=0;Dt<y.length;Dt++){nt.push(i.COLOR_ATTACHMENT0+Dt),E.depthBuffer&&nt.push(vt);let Ut=ht.__ignoreDepthValues!==void 0?ht.__ignoreDepthValues:!1;if(Ut===!1&&(E.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),Mt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ht.__webglColorRenderbuffer[Dt]),Ut===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[vt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[vt])),Mt){let ut=n.get(y[Dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,F,Q,0,0,F,Q,j,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,nt)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Mt)for(let Dt=0;Dt<y.length;Dt++){e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.RENDERBUFFER,ht.__webglColorRenderbuffer[Dt]);let Ut=n.get(y[Dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Dt,i.TEXTURE_2D,Ut,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}}function C(E){return Math.min(s.maxSamples,E.samples)}function w(E){let y=n.get(E);return o&&E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function H(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function K(E,y){let F=E.colorSpace,Q=E.format,j=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===$o||F!==Dn&&F!==tn&&(ie.getTransfer(F)===re?o===!1?t.has("EXT_sRGB")===!0&&Q===dn?(E.format=$o,E.minFilter=Qe,E.generateMipmaps=!1):y=ta.sRGBToLinear(y):(Q!==dn||j!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}this.allocateTextureUnit=B,this.resetTextureUnits=$,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=et,this.setTextureCube=N,this.rebindTextures=It,this.setupRenderTarget=_,this.updateRenderTargetMipmap=q,this.updateMultisampleRenderTarget=O,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=w}function R_(i,t,e){let n=e.isWebGL2;function s(r,a=tn){let o,l=ie.getTransfer(a);if(r===Kn)return i.UNSIGNED_BYTE;if(r===cu)return i.UNSIGNED_SHORT_4_4_4_4;if(r===hu)return i.UNSIGNED_SHORT_5_5_5_1;if(r===lf)return i.BYTE;if(r===cf)return i.SHORT;if(r===Dl)return i.UNSIGNED_SHORT;if(r===lu)return i.INT;if(r===qn)return i.UNSIGNED_INT;if(r===Yn)return i.FLOAT;if(r===Hs)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===hf)return i.ALPHA;if(r===dn)return i.RGBA;if(r===uf)return i.LUMINANCE;if(r===df)return i.LUMINANCE_ALPHA;if(r===gi)return i.DEPTH_COMPONENT;if(r===rs)return i.DEPTH_STENCIL;if(r===$o)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===ff)return i.RED;if(r===uu)return i.RED_INTEGER;if(r===pf)return i.RG;if(r===du)return i.RG_INTEGER;if(r===fu)return i.RGBA_INTEGER;if(r===ro||r===ao||r===oo||r===lo)if(l===re)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===ro)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ao)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===oo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===lo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===ro)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ao)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===oo)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===lo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ic||r===Dc||r===Nc||r===Oc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Ic)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Dc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Nc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Oc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===pu)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Uc||r===Fc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Uc)return l===re?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Fc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===kc||r===Bc||r===zc||r===Hc||r===Vc||r===Gc||r===Wc||r===Xc||r===$c||r===qc||r===Yc||r===Zc||r===jc||r===Kc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===kc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Bc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===zc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Hc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Vc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Gc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Wc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Xc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===$c)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===qc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Yc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Zc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===jc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Kc)return l===re?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===co||r===Jc||r===Qc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===co)return l===re?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Jc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Qc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===mf||r===th||r===eh||r===nh)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===co)return o.COMPRESSED_RED_RGTC1_EXT;if(r===th)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===eh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===nh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===mi?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var al=class extends ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},me=class extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}},C_={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new me,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new me,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new me,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let v of t.hand.values()){let m=e.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&p>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(C_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new me;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ol=class extends vn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,p=null,d=null,g=null,v=e.getContextAttributes(),m=null,f=null,M=[],x=[],T=new yt,L=null,P=new ze;P.layers.enable(1),P.viewport=new Te;let A=new ze;A.layers.enable(2),A.viewport=new Te;let V=[P,A],R=new al;R.layers.enable(1),R.layers.enable(2);let S=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ct=M[G];return ct===void 0&&(ct=new Us,M[G]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(G){let ct=M[G];return ct===void 0&&(ct=new Us,M[G]=ct),ct.getGripSpace()},this.getHand=function(G){let ct=M[G];return ct===void 0&&(ct=new Us,M[G]=ct),ct.getHandSpace()};function b(G){let ct=x.indexOf(G.inputSource);if(ct===-1)return;let _t=M[ct];_t!==void 0&&(_t.update(G.inputSource,G.frame,c||a),_t.dispatchEvent({type:G.type,data:G.inputSource}))}function $(){s.removeEventListener("select",b),s.removeEventListener("selectstart",b),s.removeEventListener("selectend",b),s.removeEventListener("squeeze",b),s.removeEventListener("squeezestart",b),s.removeEventListener("squeezeend",b),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",B);for(let G=0;G<M.length;G++){let ct=x[G];ct!==null&&(x[G]=null,M[G].disconnect(ct))}S=null,D=null,t.setRenderTarget(m),d=null,p=null,u=null,s=null,f=null,st.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",b),s.addEventListener("selectstart",b),s.addEventListener("selectend",b),s.addEventListener("squeeze",b),s.addEventListener("squeezestart",b),s.addEventListener("squeezeend",b),s.addEventListener("end",$),s.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let ct={antialias:s.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),f=new Nn(d.framebufferWidth,d.framebufferHeight,{format:dn,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let ct=null,_t=null,pt=null;v.depth&&(pt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=v.stencil?rs:gi,_t=v.stencil?mi:qn);let ft={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};u=new XRWebGLBinding(s,e),p=u.createProjectionLayer(ft),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),f=new Nn(p.textureWidth,p.textureHeight,{format:dn,type:Kn,depthTexture:new ua(p.textureWidth,p.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});let Tt=t.properties.get(f);Tt.__ignoreDepthValues=p.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),st.setContext(s),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function B(G){for(let ct=0;ct<G.removed.length;ct++){let _t=G.removed[ct],pt=x.indexOf(_t);pt>=0&&(x[pt]=null,M[pt].disconnect(_t))}for(let ct=0;ct<G.added.length;ct++){let _t=G.added[ct],pt=x.indexOf(_t);if(pt===-1){for(let Tt=0;Tt<M.length;Tt++)if(Tt>=x.length){x.push(_t),pt=Tt;break}else if(x[Tt]===null){x[Tt]=_t,pt=Tt;break}if(pt===-1)break}let ft=M[pt];ft&&ft.connect(_t)}}let U=new X,J=new X;function Y(G,ct,_t){U.setFromMatrixPosition(ct.matrixWorld),J.setFromMatrixPosition(_t.matrixWorld);let pt=U.distanceTo(J),ft=ct.projectionMatrix.elements,Tt=_t.projectionMatrix.elements,At=ft[14]/(ft[10]-1),wt=ft[14]/(ft[10]+1),It=(ft[9]+1)/ft[5],_=(ft[9]-1)/ft[5],q=(ft[8]-1)/ft[0],O=(Tt[8]+1)/Tt[0],C=At*q,w=At*O,H=pt/(-q+O),K=H*-q;ct.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(K),G.translateZ(H),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();let E=At+H,y=wt+H,F=C-K,Q=w+(pt-K),j=It*wt/y*E,nt=_*wt/y*E;G.projectionMatrix.makePerspective(F,Q,j,nt,E,y),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function et(G,ct){ct===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ct.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;R.near=A.near=P.near=G.near,R.far=A.far=P.far=G.far,(S!==R.near||D!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),S=R.near,D=R.far);let ct=G.parent,_t=R.cameras;et(R,ct);for(let pt=0;pt<_t.length;pt++)et(_t[pt],ct);_t.length===2?Y(R,P,A):R.projectionMatrix.copy(P.projectionMatrix),N(G,R,ct)};function N(G,ct,_t){_t===null?G.matrix.copy(ct.matrixWorld):(G.matrix.copy(_t.matrixWorld),G.matrix.invert(),G.matrix.multiply(ct.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(ct.projectionMatrix),G.projectionMatrixInverse.copy(ct.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Vs*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(p===null&&d===null))return l},this.setFoveation=function(G){l=G,p!==null&&(p.fixedFoveation=G),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=G)};let k=null;function it(G,ct){if(h=ct.getViewerPose(c||a),g=ct,h!==null){let _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(f,d.framebuffer),t.setRenderTarget(f));let pt=!1;_t.length!==R.cameras.length&&(R.cameras.length=0,pt=!0);for(let ft=0;ft<_t.length;ft++){let Tt=_t[ft],At=null;if(d!==null)At=d.getViewport(Tt);else{let It=u.getViewSubImage(p,Tt);At=It.viewport,ft===0&&(t.setRenderTargetTextures(f,It.colorTexture,p.ignoreDepthValues?void 0:It.depthStencilTexture),t.setRenderTarget(f))}let wt=V[ft];wt===void 0&&(wt=new ze,wt.layers.enable(ft),wt.viewport=new Te,V[ft]=wt),wt.matrix.fromArray(Tt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(Tt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(At.x,At.y,At.width,At.height),ft===0&&(R.matrix.copy(wt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),pt===!0&&R.cameras.push(wt)}}for(let _t=0;_t<M.length;_t++){let pt=x[_t],ft=M[_t];pt!==null&&ft!==void 0&&ft.update(pt,ct,c||a)}k&&k(G,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),g=null}let st=new Su;st.setAnimationLoop(it),this.setAnimationLoop=function(G){k=G},this.dispose=function(){}}};function P_(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,bu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,x,T){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,T)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,M,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===He&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===He&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=t.get(f).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*x,e(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,M,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=x*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),t.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===He&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function L_(i,t,e,n){let s={},r={},a=[],o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){let T=x.program;n.uniformBlockBinding(M,T)}function c(M,x){let T=s[M.id];T===void 0&&(g(M),T=h(M),s[M.id]=T,M.addEventListener("dispose",m));let L=x.program;n.updateUBOMapping(M,L);let P=t.render.frame;r[M.id]!==P&&(p(M),r[M.id]=P)}function h(M){let x=u();M.__bindingPointIndex=x;let T=i.createBuffer(),L=M.__size,P=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,L,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,T),T}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){let x=s[M.id],T=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let P=0,A=T.length;P<A;P++){let V=Array.isArray(T[P])?T[P]:[T[P]];for(let R=0,S=V.length;R<S;R++){let D=V[R];if(d(D,P,R,L)===!0){let b=D.__offset,$=Array.isArray(D.value)?D.value:[D.value],B=0;for(let U=0;U<$.length;U++){let J=$[U],Y=v(J);typeof J=="number"||typeof J=="boolean"?(D.__data[0]=J,i.bufferSubData(i.UNIFORM_BUFFER,b+B,D.__data)):J.isMatrix3?(D.__data[0]=J.elements[0],D.__data[1]=J.elements[1],D.__data[2]=J.elements[2],D.__data[3]=0,D.__data[4]=J.elements[3],D.__data[5]=J.elements[4],D.__data[6]=J.elements[5],D.__data[7]=0,D.__data[8]=J.elements[6],D.__data[9]=J.elements[7],D.__data[10]=J.elements[8],D.__data[11]=0):(J.toArray(D.__data,B),B+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,b,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,x,T,L){let P=M.value,A=x+"_"+T;if(L[A]===void 0)return typeof P=="number"||typeof P=="boolean"?L[A]=P:L[A]=P.clone(),!0;{let V=L[A];if(typeof P=="number"||typeof P=="boolean"){if(V!==P)return L[A]=P,!0}else if(V.equals(P)===!1)return V.copy(P),!0}return!1}function g(M){let x=M.uniforms,T=0,L=16;for(let A=0,V=x.length;A<V;A++){let R=Array.isArray(x[A])?x[A]:[x[A]];for(let S=0,D=R.length;S<D;S++){let b=R[S],$=Array.isArray(b.value)?b.value:[b.value];for(let B=0,U=$.length;B<U;B++){let J=$[B],Y=v(J),et=T%L;et!==0&&L-et<Y.boundary&&(T+=L-et),b.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=T,T+=Y.storage}}}let P=T%L;return P>0&&(T+=L-P),M.__size=T,M.__cache={},this}function v(M){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){let x=M.target;x.removeEventListener("dispose",m);let T=a.indexOf(x.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var Xs=class{constructor(t={}){let{canvas:e=zf(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let p;n!==null?p=n.getContextAttributes().alpha:p=a;let d=new Uint32Array(4),g=new Int32Array(4),v=null,m=null,f=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ae,this._useLegacyLights=!1,this.toneMapping=jn,this.toneMappingExposure=1;let x=this,T=!1,L=0,P=0,A=null,V=-1,R=null,S=new Te,D=new Te,b=null,$=new Gt(0),B=0,U=e.width,J=e.height,Y=1,et=null,N=null,k=new Te(0,0,U,J),it=new Te(0,0,U,J),st=!1,G=new Gs,ct=!1,_t=!1,pt=null,ft=new ae,Tt=new yt,At=new X,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function It(){return A===null?Y:1}let _=n;function q(I,tt){for(let at=0;at<I.length;at++){let ot=I[at],rt=e.getContext(ot,tt);if(rt!==null)return rt}return null}try{let I={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pl}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",W,!1),e.addEventListener("webglcontextcreationerror",bt,!1),_===null){let tt=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&tt.shift(),_=q(tt,I),_===null)throw q(tt)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&_ instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),_.getShaderPrecisionFormat===void 0&&(_.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let O,C,w,H,K,E,y,F,Q,j,nt,vt,ht,Mt,Dt,Ut,ut,Pt,z,dt,gt,mt,Lt,$t;function Jt(){O=new jg(_),C=new Wg(_,O,t),O.init(C),mt=new R_(_,O,C),w=new T_(_,O,C),H=new Qg(_),K=new p_,E=new A_(_,O,w,K,C,mt,H),y=new $g(x),F=new Zg(x),Q=new op(_,C),Lt=new Vg(_,O,Q,C),j=new Kg(_,Q,H,Lt),nt=new i0(_,j,Q,H),z=new n0(_,C,E),Ut=new Xg(K),vt=new f_(x,y,F,O,C,Lt,Ut),ht=new P_(x,K),Mt=new g_,Dt=new S_(O,C),Pt=new Hg(x,y,F,w,nt,p,l),ut=new w_(x,nt,C),$t=new L_(_,H,C,w),dt=new Gg(_,O,H,C),gt=new Jg(_,O,H,C),H.programs=vt.programs,x.capabilities=C,x.extensions=O,x.properties=K,x.renderLists=Mt,x.shadowMap=ut,x.state=w,x.info=H}Jt();let Ht=new ol(x,_);this.xr=Ht,this.getContext=function(){return _},this.getContextAttributes=function(){return _.getContextAttributes()},this.forceContextLoss=function(){let I=O.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=O.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(I){I!==void 0&&(Y=I,this.setSize(U,J,!1))},this.getSize=function(I){return I.set(U,J)},this.setSize=function(I,tt,at=!0){if(Ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=I,J=tt,e.width=Math.floor(I*Y),e.height=Math.floor(tt*Y),at===!0&&(e.style.width=I+"px",e.style.height=tt+"px"),this.setViewport(0,0,I,tt)},this.getDrawingBufferSize=function(I){return I.set(U*Y,J*Y).floor()},this.setDrawingBufferSize=function(I,tt,at){U=I,J=tt,Y=at,e.width=Math.floor(I*at),e.height=Math.floor(tt*at),this.setViewport(0,0,I,tt)},this.getCurrentViewport=function(I){return I.copy(S)},this.getViewport=function(I){return I.copy(k)},this.setViewport=function(I,tt,at,ot){I.isVector4?k.set(I.x,I.y,I.z,I.w):k.set(I,tt,at,ot),w.viewport(S.copy(k).multiplyScalar(Y).floor())},this.getScissor=function(I){return I.copy(it)},this.setScissor=function(I,tt,at,ot){I.isVector4?it.set(I.x,I.y,I.z,I.w):it.set(I,tt,at,ot),w.scissor(D.copy(it).multiplyScalar(Y).floor())},this.getScissorTest=function(){return st},this.setScissorTest=function(I){w.setScissorTest(st=I)},this.setOpaqueSort=function(I){et=I},this.setTransparentSort=function(I){N=I},this.getClearColor=function(I){return I.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor.apply(Pt,arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha.apply(Pt,arguments)},this.clear=function(I=!0,tt=!0,at=!0){let ot=0;if(I){let rt=!1;if(A!==null){let Rt=A.texture.format;rt=Rt===fu||Rt===du||Rt===uu}if(rt){let Rt=A.texture.type,Ot=Rt===Kn||Rt===qn||Rt===Dl||Rt===mi||Rt===cu||Rt===hu,kt=Pt.getClearColor(),zt=Pt.getClearAlpha(),Yt=kt.r,Vt=kt.g,Xt=kt.b;Ot?(d[0]=Yt,d[1]=Vt,d[2]=Xt,d[3]=zt,_.clearBufferuiv(_.COLOR,0,d)):(g[0]=Yt,g[1]=Vt,g[2]=Xt,g[3]=zt,_.clearBufferiv(_.COLOR,0,g))}else ot|=_.COLOR_BUFFER_BIT}tt&&(ot|=_.DEPTH_BUFFER_BIT),at&&(ot|=_.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),_.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",W,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Mt.dispose(),Dt.dispose(),K.dispose(),y.dispose(),F.dispose(),nt.dispose(),Lt.dispose(),$t.dispose(),vt.dispose(),Ht.dispose(),Ht.removeEventListener("sessionstart",Oe),Ht.removeEventListener("sessionend",se),pt&&(pt.dispose(),pt=null),Ue.stop()};function xt(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function W(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let I=H.autoReset,tt=ut.enabled,at=ut.autoUpdate,ot=ut.needsUpdate,rt=ut.type;Jt(),H.autoReset=I,ut.enabled=tt,ut.autoUpdate=at,ut.needsUpdate=ot,ut.type=rt}function bt(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function St(I){let tt=I.target;tt.removeEventListener("dispose",St),Ft(tt)}function Ft(I){Nt(I),K.remove(I)}function Nt(I){let tt=K.get(I).programs;tt!==void 0&&(tt.forEach(function(at){vt.releaseProgram(at)}),I.isShaderMaterial&&vt.releaseShaderCache(I))}this.renderBufferDirect=function(I,tt,at,ot,rt,Rt){tt===null&&(tt=wt);let Ot=rt.isMesh&&rt.matrixWorld.determinant()<0,kt=gd(I,tt,at,ot,rt);w.setMaterial(ot,Ot);let zt=at.index,Yt=1;if(ot.wireframe===!0){if(zt=j.getWireframeAttribute(at),zt===void 0)return;Yt=2}let Vt=at.drawRange,Xt=at.attributes.position,pe=Vt.start*Yt,We=(Vt.start+Vt.count)*Yt;Rt!==null&&(pe=Math.max(pe,Rt.start*Yt),We=Math.min(We,(Rt.start+Rt.count)*Yt)),zt!==null?(pe=Math.max(pe,0),We=Math.min(We,zt.count)):Xt!=null&&(pe=Math.max(pe,0),We=Math.min(We,Xt.count));let Me=We-pe;if(Me<0||Me===1/0)return;Lt.setup(rt,ot,kt,at,zt);let En,ue=dt;if(zt!==null&&(En=Q.get(zt),ue=gt,ue.setIndex(En)),rt.isMesh)ot.wireframe===!0?(w.setLineWidth(ot.wireframeLinewidth*It()),ue.setMode(_.LINES)):ue.setMode(_.TRIANGLES);else if(rt.isLine){let Zt=ot.linewidth;Zt===void 0&&(Zt=1),w.setLineWidth(Zt*It()),rt.isLineSegments?ue.setMode(_.LINES):rt.isLineLoop?ue.setMode(_.LINE_LOOP):ue.setMode(_.LINE_STRIP)}else rt.isPoints?ue.setMode(_.POINTS):rt.isSprite&&ue.setMode(_.TRIANGLES);if(rt.isBatchedMesh)ue.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else if(rt.isInstancedMesh)ue.renderInstances(pe,Me,rt.count);else if(at.isInstancedBufferGeometry){let Zt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,to=Math.min(at.instanceCount,Zt);ue.renderInstances(pe,Me,to)}else ue.render(pe,Me)};function te(I,tt,at){I.transparent===!0&&I.side===Ln&&I.forceSinglePass===!1?(I.side=He,I.needsUpdate=!0,gr(I,tt,at),I.side=Jn,I.needsUpdate=!0,gr(I,tt,at),I.side=Ln):gr(I,tt,at)}this.compile=function(I,tt,at=null){at===null&&(at=I),m=Dt.get(at),m.init(),M.push(m),at.traverseVisible(function(rt){rt.isLight&&rt.layers.test(tt.layers)&&(m.pushLight(rt),rt.castShadow&&m.pushShadow(rt))}),I!==at&&I.traverseVisible(function(rt){rt.isLight&&rt.layers.test(tt.layers)&&(m.pushLight(rt),rt.castShadow&&m.pushShadow(rt))}),m.setupLights(x._useLegacyLights);let ot=new Set;return I.traverse(function(rt){let Rt=rt.material;if(Rt)if(Array.isArray(Rt))for(let Ot=0;Ot<Rt.length;Ot++){let kt=Rt[Ot];te(kt,at,rt),ot.add(kt)}else te(Rt,at,rt),ot.add(Rt)}),M.pop(),m=null,ot},this.compileAsync=function(I,tt,at=null){let ot=this.compile(I,tt,at);return new Promise(rt=>{function Rt(){if(ot.forEach(function(Ot){K.get(Ot).currentProgram.isReady()&&ot.delete(Ot)}),ot.size===0){rt(I);return}setTimeout(Rt,10)}O.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let ee=null;function Se(I){ee&&ee(I)}function Oe(){Ue.stop()}function se(){Ue.start()}let Ue=new Su;Ue.setAnimationLoop(Se),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(I){ee=I,Ht.setAnimationLoop(I),I===null?Ue.stop():Ue.start()},Ht.addEventListener("sessionstart",Oe),Ht.addEventListener("sessionend",se),this.render=function(I,tt){if(tt!==void 0&&tt.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),tt.parent===null&&tt.matrixWorldAutoUpdate===!0&&tt.updateMatrixWorld(),Ht.enabled===!0&&Ht.isPresenting===!0&&(Ht.cameraAutoUpdate===!0&&Ht.updateCamera(tt),tt=Ht.getCamera()),I.isScene===!0&&I.onBeforeRender(x,I,tt,A),m=Dt.get(I,M.length),m.init(),M.push(m),ft.multiplyMatrices(tt.projectionMatrix,tt.matrixWorldInverse),G.setFromProjectionMatrix(ft),_t=this.localClippingEnabled,ct=Ut.init(this.clippingPlanes,_t),v=Mt.get(I,f.length),v.init(),f.push(v),gn(I,tt,0,x.sortObjects),v.finish(),x.sortObjects===!0&&v.sort(et,N),this.info.render.frame++,ct===!0&&Ut.beginShadows();let at=m.state.shadowsArray;if(ut.render(at,I,tt),ct===!0&&Ut.endShadows(),this.info.autoReset===!0&&this.info.reset(),Pt.render(v,I),m.setupLights(x._useLegacyLights),tt.isArrayCamera){let ot=tt.cameras;for(let rt=0,Rt=ot.length;rt<Rt;rt++){let Ot=ot[rt];vc(v,I,Ot,Ot.viewport)}}else vc(v,I,tt);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),I.isScene===!0&&I.onAfterRender(x,I,tt),Lt.resetDefaultState(),V=-1,R=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,f.pop(),f.length>0?v=f[f.length-1]:v=null};function gn(I,tt,at,ot){if(I.visible===!1)return;if(I.layers.test(tt.layers)){if(I.isGroup)at=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(tt);else if(I.isLight)m.pushLight(I),I.castShadow&&m.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||G.intersectsSprite(I)){ot&&At.setFromMatrixPosition(I.matrixWorld).applyMatrix4(ft);let Ot=nt.update(I),kt=I.material;kt.visible&&v.push(I,Ot,kt,at,At.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||G.intersectsObject(I))){let Ot=nt.update(I),kt=I.material;if(ot&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),At.copy(I.boundingSphere.center)):(Ot.boundingSphere===null&&Ot.computeBoundingSphere(),At.copy(Ot.boundingSphere.center)),At.applyMatrix4(I.matrixWorld).applyMatrix4(ft)),Array.isArray(kt)){let zt=Ot.groups;for(let Yt=0,Vt=zt.length;Yt<Vt;Yt++){let Xt=zt[Yt],pe=kt[Xt.materialIndex];pe&&pe.visible&&v.push(I,Ot,pe,at,At.z,Xt)}}else kt.visible&&v.push(I,Ot,kt,at,At.z,null)}}let Rt=I.children;for(let Ot=0,kt=Rt.length;Ot<kt;Ot++)gn(Rt[Ot],tt,at,ot)}function vc(I,tt,at,ot){let rt=I.opaque,Rt=I.transmissive,Ot=I.transparent;m.setupLightsView(at),ct===!0&&Ut.setGlobalState(x.clippingPlanes,at),Rt.length>0&&md(rt,Rt,tt,at),ot&&w.viewport(S.copy(ot)),rt.length>0&&mr(rt,tt,at),Rt.length>0&&mr(Rt,tt,at),Ot.length>0&&mr(Ot,tt,at),w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function md(I,tt,at,ot){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;let Rt=C.isWebGL2;pt===null&&(pt=new Nn(1,1,{generateMipmaps:!0,type:O.has("EXT_color_buffer_half_float")?Hs:Kn,minFilter:zs,samples:Rt?4:0})),x.getDrawingBufferSize(Tt),Rt?pt.setSize(Tt.x,Tt.y):pt.setSize(Jr(Tt.x),Jr(Tt.y));let Ot=x.getRenderTarget();x.setRenderTarget(pt),x.getClearColor($),B=x.getClearAlpha(),B<1&&x.setClearColor(16777215,.5),x.clear();let kt=x.toneMapping;x.toneMapping=jn,mr(I,at,ot),E.updateMultisampleRenderTarget(pt),E.updateRenderTargetMipmap(pt);let zt=!1;for(let Yt=0,Vt=tt.length;Yt<Vt;Yt++){let Xt=tt[Yt],pe=Xt.object,We=Xt.geometry,Me=Xt.material,En=Xt.group;if(Me.side===Ln&&pe.layers.test(ot.layers)){let ue=Me.side;Me.side=He,Me.needsUpdate=!0,xc(pe,at,ot,We,Me,En),Me.side=ue,Me.needsUpdate=!0,zt=!0}}zt===!0&&(E.updateMultisampleRenderTarget(pt),E.updateRenderTargetMipmap(pt)),x.setRenderTarget(Ot),x.setClearColor($,B),x.toneMapping=kt}function mr(I,tt,at){let ot=tt.isScene===!0?tt.overrideMaterial:null;for(let rt=0,Rt=I.length;rt<Rt;rt++){let Ot=I[rt],kt=Ot.object,zt=Ot.geometry,Yt=ot===null?Ot.material:ot,Vt=Ot.group;kt.layers.test(at.layers)&&xc(kt,tt,at,zt,Yt,Vt)}}function xc(I,tt,at,ot,rt,Rt){I.onBeforeRender(x,tt,at,ot,rt,Rt),I.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),rt.onBeforeRender(x,tt,at,ot,I,Rt),rt.transparent===!0&&rt.side===Ln&&rt.forceSinglePass===!1?(rt.side=He,rt.needsUpdate=!0,x.renderBufferDirect(at,tt,ot,rt,I,Rt),rt.side=Jn,rt.needsUpdate=!0,x.renderBufferDirect(at,tt,ot,rt,I,Rt),rt.side=Ln):x.renderBufferDirect(at,tt,ot,rt,I,Rt),I.onAfterRender(x,tt,at,ot,rt,Rt)}function gr(I,tt,at){tt.isScene!==!0&&(tt=wt);let ot=K.get(I),rt=m.state.lights,Rt=m.state.shadowsArray,Ot=rt.state.version,kt=vt.getParameters(I,rt.state,Rt,tt,at),zt=vt.getProgramCacheKey(kt),Yt=ot.programs;ot.environment=I.isMeshStandardMaterial?tt.environment:null,ot.fog=tt.fog,ot.envMap=(I.isMeshStandardMaterial?F:y).get(I.envMap||ot.environment),Yt===void 0&&(I.addEventListener("dispose",St),Yt=new Map,ot.programs=Yt);let Vt=Yt.get(zt);if(Vt!==void 0){if(ot.currentProgram===Vt&&ot.lightsStateVersion===Ot)return bc(I,kt),Vt}else kt.uniforms=vt.getUniforms(I),I.onBuild(at,kt,x),I.onBeforeCompile(kt,x),Vt=vt.acquireProgram(kt,zt),Yt.set(zt,Vt),ot.uniforms=kt.uniforms;let Xt=ot.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Xt.clippingPlanes=Ut.uniform),bc(I,kt),ot.needsLights=vd(I),ot.lightsStateVersion=Ot,ot.needsLights&&(Xt.ambientLightColor.value=rt.state.ambient,Xt.lightProbe.value=rt.state.probe,Xt.directionalLights.value=rt.state.directional,Xt.directionalLightShadows.value=rt.state.directionalShadow,Xt.spotLights.value=rt.state.spot,Xt.spotLightShadows.value=rt.state.spotShadow,Xt.rectAreaLights.value=rt.state.rectArea,Xt.ltc_1.value=rt.state.rectAreaLTC1,Xt.ltc_2.value=rt.state.rectAreaLTC2,Xt.pointLights.value=rt.state.point,Xt.pointLightShadows.value=rt.state.pointShadow,Xt.hemisphereLights.value=rt.state.hemi,Xt.directionalShadowMap.value=rt.state.directionalShadowMap,Xt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Xt.spotShadowMap.value=rt.state.spotShadowMap,Xt.spotLightMatrix.value=rt.state.spotLightMatrix,Xt.spotLightMap.value=rt.state.spotLightMap,Xt.pointShadowMap.value=rt.state.pointShadowMap,Xt.pointShadowMatrix.value=rt.state.pointShadowMatrix),ot.currentProgram=Vt,ot.uniformsList=null,Vt}function yc(I){if(I.uniformsList===null){let tt=I.currentProgram.getUniforms();I.uniformsList=ns.seqWithValue(tt.seq,I.uniforms)}return I.uniformsList}function bc(I,tt){let at=K.get(I);at.outputColorSpace=tt.outputColorSpace,at.batching=tt.batching,at.instancing=tt.instancing,at.instancingColor=tt.instancingColor,at.skinning=tt.skinning,at.morphTargets=tt.morphTargets,at.morphNormals=tt.morphNormals,at.morphColors=tt.morphColors,at.morphTargetsCount=tt.morphTargetsCount,at.numClippingPlanes=tt.numClippingPlanes,at.numIntersection=tt.numClipIntersection,at.vertexAlphas=tt.vertexAlphas,at.vertexTangents=tt.vertexTangents,at.toneMapping=tt.toneMapping}function gd(I,tt,at,ot,rt){tt.isScene!==!0&&(tt=wt),E.resetTextureUnits();let Rt=tt.fog,Ot=ot.isMeshStandardMaterial?tt.environment:null,kt=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Dn,zt=(ot.isMeshStandardMaterial?F:y).get(ot.envMap||Ot),Yt=ot.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,Vt=!!at.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),Xt=!!at.morphAttributes.position,pe=!!at.morphAttributes.normal,We=!!at.morphAttributes.color,Me=jn;ot.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Me=x.toneMapping);let En=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,ue=En!==void 0?En.length:0,Zt=K.get(ot),to=m.state.lights;if(ct===!0&&(_t===!0||I!==R)){let Ke=I===R&&ot.id===V;Ut.setState(ot,I,Ke)}let fe=!1;ot.version===Zt.__version?(Zt.needsLights&&Zt.lightsStateVersion!==to.state.version||Zt.outputColorSpace!==kt||rt.isBatchedMesh&&Zt.batching===!1||!rt.isBatchedMesh&&Zt.batching===!0||rt.isInstancedMesh&&Zt.instancing===!1||!rt.isInstancedMesh&&Zt.instancing===!0||rt.isSkinnedMesh&&Zt.skinning===!1||!rt.isSkinnedMesh&&Zt.skinning===!0||rt.isInstancedMesh&&Zt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&Zt.instancingColor===!1&&rt.instanceColor!==null||Zt.envMap!==zt||ot.fog===!0&&Zt.fog!==Rt||Zt.numClippingPlanes!==void 0&&(Zt.numClippingPlanes!==Ut.numPlanes||Zt.numIntersection!==Ut.numIntersection)||Zt.vertexAlphas!==Yt||Zt.vertexTangents!==Vt||Zt.morphTargets!==Xt||Zt.morphNormals!==pe||Zt.morphColors!==We||Zt.toneMapping!==Me||C.isWebGL2===!0&&Zt.morphTargetsCount!==ue)&&(fe=!0):(fe=!0,Zt.__version=ot.version);let ai=Zt.currentProgram;fe===!0&&(ai=gr(ot,tt,rt));let Sc=!1,As=!1,eo=!1,Pe=ai.getUniforms(),oi=Zt.uniforms;if(w.useProgram(ai.program)&&(Sc=!0,As=!0,eo=!0),ot.id!==V&&(V=ot.id,As=!0),Sc||R!==I){Pe.setValue(_,"projectionMatrix",I.projectionMatrix),Pe.setValue(_,"viewMatrix",I.matrixWorldInverse);let Ke=Pe.map.cameraPosition;Ke!==void 0&&Ke.setValue(_,At.setFromMatrixPosition(I.matrixWorld)),C.logarithmicDepthBuffer&&Pe.setValue(_,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Pe.setValue(_,"isOrthographic",I.isOrthographicCamera===!0),R!==I&&(R=I,As=!0,eo=!0)}if(rt.isSkinnedMesh){Pe.setOptional(_,rt,"bindMatrix"),Pe.setOptional(_,rt,"bindMatrixInverse");let Ke=rt.skeleton;Ke&&(C.floatVertexTextures?(Ke.boneTexture===null&&Ke.computeBoneTexture(),Pe.setValue(_,"boneTexture",Ke.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}rt.isBatchedMesh&&(Pe.setOptional(_,rt,"batchingTexture"),Pe.setValue(_,"batchingTexture",rt._matricesTexture,E));let no=at.morphAttributes;if((no.position!==void 0||no.normal!==void 0||no.color!==void 0&&C.isWebGL2===!0)&&z.update(rt,at,ai),(As||Zt.receiveShadow!==rt.receiveShadow)&&(Zt.receiveShadow=rt.receiveShadow,Pe.setValue(_,"receiveShadow",rt.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&(oi.envMap.value=zt,oi.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),As&&(Pe.setValue(_,"toneMappingExposure",x.toneMappingExposure),Zt.needsLights&&_d(oi,eo),Rt&&ot.fog===!0&&ht.refreshFogUniforms(oi,Rt),ht.refreshMaterialUniforms(oi,ot,Y,J,pt),ns.upload(_,yc(Zt),oi,E)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(ns.upload(_,yc(Zt),oi,E),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Pe.setValue(_,"center",rt.center),Pe.setValue(_,"modelViewMatrix",rt.modelViewMatrix),Pe.setValue(_,"normalMatrix",rt.normalMatrix),Pe.setValue(_,"modelMatrix",rt.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){let Ke=ot.uniformsGroups;for(let io=0,xd=Ke.length;io<xd;io++)if(C.isWebGL2){let Mc=Ke[io];$t.update(Mc,ai),$t.bind(Mc,ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ai}function _d(I,tt){I.ambientLightColor.needsUpdate=tt,I.lightProbe.needsUpdate=tt,I.directionalLights.needsUpdate=tt,I.directionalLightShadows.needsUpdate=tt,I.pointLights.needsUpdate=tt,I.pointLightShadows.needsUpdate=tt,I.spotLights.needsUpdate=tt,I.spotLightShadows.needsUpdate=tt,I.rectAreaLights.needsUpdate=tt,I.hemisphereLights.needsUpdate=tt}function vd(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(I,tt,at){K.get(I.texture).__webglTexture=tt,K.get(I.depthTexture).__webglTexture=at;let ot=K.get(I);ot.__hasExternalTextures=!0,ot.__hasExternalTextures&&(ot.__autoAllocateDepthBuffer=at===void 0,ot.__autoAllocateDepthBuffer||O.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(I,tt){let at=K.get(I);at.__webglFramebuffer=tt,at.__useDefaultFramebuffer=tt===void 0},this.setRenderTarget=function(I,tt=0,at=0){A=I,L=tt,P=at;let ot=!0,rt=null,Rt=!1,Ot=!1;if(I){let zt=K.get(I);zt.__useDefaultFramebuffer!==void 0?(w.bindFramebuffer(_.FRAMEBUFFER,null),ot=!1):zt.__webglFramebuffer===void 0?E.setupRenderTarget(I):zt.__hasExternalTextures&&E.rebindTextures(I,K.get(I.texture).__webglTexture,K.get(I.depthTexture).__webglTexture);let Yt=I.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(Ot=!0);let Vt=K.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Vt[tt])?rt=Vt[tt][at]:rt=Vt[tt],Rt=!0):C.isWebGL2&&I.samples>0&&E.useMultisampledRTT(I)===!1?rt=K.get(I).__webglMultisampledFramebuffer:Array.isArray(Vt)?rt=Vt[at]:rt=Vt,S.copy(I.viewport),D.copy(I.scissor),b=I.scissorTest}else S.copy(k).multiplyScalar(Y).floor(),D.copy(it).multiplyScalar(Y).floor(),b=st;if(w.bindFramebuffer(_.FRAMEBUFFER,rt)&&C.drawBuffers&&ot&&w.drawBuffers(I,rt),w.viewport(S),w.scissor(D),w.setScissorTest(b),Rt){let zt=K.get(I.texture);_.framebufferTexture2D(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,_.TEXTURE_CUBE_MAP_POSITIVE_X+tt,zt.__webglTexture,at)}else if(Ot){let zt=K.get(I.texture),Yt=tt||0;_.framebufferTextureLayer(_.FRAMEBUFFER,_.COLOR_ATTACHMENT0,zt.__webglTexture,at||0,Yt)}V=-1},this.readRenderTargetPixels=function(I,tt,at,ot,rt,Rt,Ot){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=K.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Ot!==void 0&&(kt=kt[Ot]),kt){w.bindFramebuffer(_.FRAMEBUFFER,kt);try{let zt=I.texture,Yt=zt.format,Vt=zt.type;if(Yt!==dn&&mt.convert(Yt)!==_.getParameter(_.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Xt=Vt===Hs&&(O.has("EXT_color_buffer_half_float")||C.isWebGL2&&O.has("EXT_color_buffer_float"));if(Vt!==Kn&&mt.convert(Vt)!==_.getParameter(_.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Vt===Yn&&(C.isWebGL2||O.has("OES_texture_float")||O.has("WEBGL_color_buffer_float")))&&!Xt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}tt>=0&&tt<=I.width-ot&&at>=0&&at<=I.height-rt&&_.readPixels(tt,at,ot,rt,mt.convert(Yt),mt.convert(Vt),Rt)}finally{let zt=A!==null?K.get(A).__webglFramebuffer:null;w.bindFramebuffer(_.FRAMEBUFFER,zt)}}},this.copyFramebufferToTexture=function(I,tt,at=0){let ot=Math.pow(2,-at),rt=Math.floor(tt.image.width*ot),Rt=Math.floor(tt.image.height*ot);E.setTexture2D(tt,0),_.copyTexSubImage2D(_.TEXTURE_2D,at,0,0,I.x,I.y,rt,Rt),w.unbindTexture()},this.copyTextureToTexture=function(I,tt,at,ot=0){let rt=tt.image.width,Rt=tt.image.height,Ot=mt.convert(at.format),kt=mt.convert(at.type);E.setTexture2D(at,0),_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,at.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,at.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,at.unpackAlignment),tt.isDataTexture?_.texSubImage2D(_.TEXTURE_2D,ot,I.x,I.y,rt,Rt,Ot,kt,tt.image.data):tt.isCompressedTexture?_.compressedTexSubImage2D(_.TEXTURE_2D,ot,I.x,I.y,tt.mipmaps[0].width,tt.mipmaps[0].height,Ot,tt.mipmaps[0].data):_.texSubImage2D(_.TEXTURE_2D,ot,I.x,I.y,Ot,kt,tt.image),ot===0&&at.generateMipmaps&&_.generateMipmap(_.TEXTURE_2D),w.unbindTexture()},this.copyTextureToTexture3D=function(I,tt,at,ot,rt=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Rt=I.max.x-I.min.x+1,Ot=I.max.y-I.min.y+1,kt=I.max.z-I.min.z+1,zt=mt.convert(ot.format),Yt=mt.convert(ot.type),Vt;if(ot.isData3DTexture)E.setTexture3D(ot,0),Vt=_.TEXTURE_3D;else if(ot.isDataArrayTexture||ot.isCompressedArrayTexture)E.setTexture2DArray(ot,0),Vt=_.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}_.pixelStorei(_.UNPACK_FLIP_Y_WEBGL,ot.flipY),_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ot.premultiplyAlpha),_.pixelStorei(_.UNPACK_ALIGNMENT,ot.unpackAlignment);let Xt=_.getParameter(_.UNPACK_ROW_LENGTH),pe=_.getParameter(_.UNPACK_IMAGE_HEIGHT),We=_.getParameter(_.UNPACK_SKIP_PIXELS),Me=_.getParameter(_.UNPACK_SKIP_ROWS),En=_.getParameter(_.UNPACK_SKIP_IMAGES),ue=at.isCompressedTexture?at.mipmaps[rt]:at.image;_.pixelStorei(_.UNPACK_ROW_LENGTH,ue.width),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,ue.height),_.pixelStorei(_.UNPACK_SKIP_PIXELS,I.min.x),_.pixelStorei(_.UNPACK_SKIP_ROWS,I.min.y),_.pixelStorei(_.UNPACK_SKIP_IMAGES,I.min.z),at.isDataTexture||at.isData3DTexture?_.texSubImage3D(Vt,rt,tt.x,tt.y,tt.z,Rt,Ot,kt,zt,Yt,ue.data):at.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),_.compressedTexSubImage3D(Vt,rt,tt.x,tt.y,tt.z,Rt,Ot,kt,zt,ue.data)):_.texSubImage3D(Vt,rt,tt.x,tt.y,tt.z,Rt,Ot,kt,zt,Yt,ue),_.pixelStorei(_.UNPACK_ROW_LENGTH,Xt),_.pixelStorei(_.UNPACK_IMAGE_HEIGHT,pe),_.pixelStorei(_.UNPACK_SKIP_PIXELS,We),_.pixelStorei(_.UNPACK_SKIP_ROWS,Me),_.pixelStorei(_.UNPACK_SKIP_IMAGES,En),rt===0&&ot.generateMipmaps&&_.generateMipmap(Vt),w.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?E.setTextureCube(I,0):I.isData3DTexture?E.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?E.setTexture2DArray(I,0):E.setTexture2D(I,0),w.unbindTexture()},this.resetState=function(){L=0,P=0,A=null,w.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Nl?"display-p3":"srgb",e.unpackColorSpace=ie.workingColorSpace===Ta?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ae?_i:mu}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===_i?Ae:Dn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},ll=class extends Xs{};ll.prototype.isWebGL1Renderer=!0;var da=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Gt(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},fa=class extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var Qn=class extends On{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},qh=new X,Yh=new X,Zh=new ae,No=new os,Br=new as,cs=class extends ve{constructor(t=new De,e=new Qn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)qh.fromBufferAttribute(e,s-1),Yh.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=qh.distanceTo(Yh);t.setAttribute("lineDistance",new le(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(s),Br.radius+=r,t.ray.intersectsSphere(Br)===!1)return;Zh.copy(s).invert(),No.copy(t.ray).applyMatrix4(Zh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new X,h=new X,u=new X,p=new X,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let f=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let x=f,T=M-1;x<T;x+=d){let L=g.getX(x),P=g.getX(x+1);if(c.fromBufferAttribute(m,L),h.fromBufferAttribute(m,P),No.distanceSqToSegment(c,h,p,u)>l)continue;p.applyMatrix4(this.matrixWorld);let V=t.ray.origin.distanceTo(p);V<t.near||V>t.far||e.push({distance:V,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let x=f,T=M-1;x<T;x+=d){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),No.distanceSqToSegment(c,h,p,u)>l)continue;p.applyMatrix4(this.matrixWorld);let P=t.ray.origin.distanceTo(p);P<t.near||P>t.far||e.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},jh=new X,Kh=new X,pa=class extends cs{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)jh.fromBufferAttribute(e,s),Kh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+jh.distanceTo(Kh);t.setAttribute("lineDistance",new le(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var en=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],p=n[s+1]-h,d=(a-h)/p;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new yt:new X);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new X,s=[],r=[],a=[],o=new X,l=new ae;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new X)}r[0]=new X,a[0]=new X;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(we(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(we(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},$s=class extends en{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e){let n=e||new yt,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,d=c-this.aY;l=p*h-d*u+this.aX,c=p*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},cl=class extends $s{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Fl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let p=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;p*=h,d*=h,s(a,o,p,d)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var zr=new X,Oo=new Fl,Uo=new Fl,Fo=new Fl,hl=class extends en{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new X){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(zr.subVectors(s[0],s[1]).add(s[0]),c=zr);let u=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(zr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=zr),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),d),v=Math.pow(u.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Oo.initNonuniformCatmullRom(c.x,u.x,p.x,h.x,g,v,m),Uo.initNonuniformCatmullRom(c.y,u.y,p.y,h.y,g,v,m),Fo.initNonuniformCatmullRom(c.z,u.z,p.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Oo.initCatmullRom(c.x,u.x,p.x,h.x,this.tension),Uo.initCatmullRom(c.y,u.y,p.y,h.y,this.tension),Fo.initCatmullRom(c.z,u.z,p.z,h.z,this.tension));return n.set(Oo.calc(l),Uo.calc(l),Fo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new X().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Jh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function I_(i,t){let e=1-i;return e*e*t}function D_(i,t){return 2*(1-i)*i*t}function N_(i,t){return i*i*t}function Fs(i,t,e,n){return I_(i,t)+D_(i,e)+N_(i,n)}function O_(i,t){let e=1-i;return e*e*e*t}function U_(i,t){let e=1-i;return 3*e*e*i*t}function F_(i,t){return 3*(1-i)*i*i*t}function k_(i,t){return i*i*i*t}function ks(i,t,e,n,s){return O_(i,t)+U_(i,e)+F_(i,n)+k_(i,s)}var ma=class extends en{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ks(t,s.x,r.x,a.x,o.x),ks(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ul=class extends en{constructor(t=new X,e=new X,n=new X,s=new X){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new X){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ks(t,s.x,r.x,a.x,o.x),ks(t,s.y,r.y,a.y,o.y),ks(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ga=class extends en{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dl=class extends en{constructor(t=new X,e=new X){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new X){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new X){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_a=class extends en{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Fs(t,s.x,r.x,a.x),Fs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fl=class extends en{constructor(t=new X,e=new X,n=new X){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new X){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Fs(t,s.x,r.x,a.x),Fs(t,s.y,r.y,a.y),Fs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},va=class extends en{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Jh(o,l.x,c.x,h.x,u.x),Jh(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new yt().fromArray(s))}return this}},pl=Object.freeze({__proto__:null,ArcCurve:cl,CatmullRomCurve3:hl,CubicBezierCurve:ma,CubicBezierCurve3:ul,EllipseCurve:$s,LineCurve:ga,LineCurve3:dl,QuadraticBezierCurve:_a,QuadraticBezierCurve3:fl,SplineCurve:va}),ml=class extends en{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pl[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new pl[s.type]().fromJSON(s))}return this}},xa=class extends ml{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new ga(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new _a(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new ma(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new va(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){let c=new $s(t,e,n,s,r,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var yi=class i extends De{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],p=[],d=[],g=0,v=[],m=n/2,f=0;M(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new le(u,3)),this.setAttribute("normal",new le(p,3)),this.setAttribute("uv",new le(d,2));function M(){let T=new X,L=new X,P=0,A=(e-t)/n;for(let V=0;V<=r;V++){let R=[],S=V/r,D=S*(e-t)+t;for(let b=0;b<=s;b++){let $=b/s,B=$*l+o,U=Math.sin(B),J=Math.cos(B);L.x=D*U,L.y=-S*n+m,L.z=D*J,u.push(L.x,L.y,L.z),T.set(U,A,J).normalize(),p.push(T.x,T.y,T.z),d.push($,1-S),R.push(g++)}v.push(R)}for(let V=0;V<s;V++)for(let R=0;R<r;R++){let S=v[R][V],D=v[R+1][V],b=v[R+1][V+1],$=v[R][V+1];h.push(S,D,$),h.push(D,b,$),P+=6}c.addGroup(f,P,0),f+=P}function x(T){let L=g,P=new yt,A=new X,V=0,R=T===!0?t:e,S=T===!0?1:-1;for(let b=1;b<=s;b++)u.push(0,m*S,0),p.push(0,S,0),d.push(.5,.5),g++;let D=g;for(let b=0;b<=s;b++){let B=b/s*l+o,U=Math.cos(B),J=Math.sin(B);A.x=R*J,A.y=m*S,A.z=R*U,u.push(A.x,A.y,A.z),p.push(0,S,0),P.x=U*.5+.5,P.y=J*.5*S+.5,d.push(P.x,P.y),g++}for(let b=0;b<s;b++){let $=L+b,B=D+b;T===!0?h.push(B,B+1,$):h.push(B+1,B,$),V+=3}c.addGroup(f,V,T===!0?1:2),f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var qs=class extends xa{constructor(t){super(t),this.uuid=Ti(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new xa().fromJSON(s))}return this}},B_={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=Ru(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,p,d;if(n&&(r=W_(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],p=i[g+1],u<o&&(o=u),p<l&&(l=p),u>c&&(c=u),p>h&&(h=p);d=Math.max(c-o,h-l),d=d!==0?32767/d:0}return Ys(r,a,e,o,l,d,0),a}};function Ru(i,t,e,n,s){let r,a;if(s===ev(i,t,e,n)>0)for(r=t;r<e;r+=n)a=Qh(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=Qh(r,i[r],i[r+1],a);return a&&Ra(a,a.next)&&(js(a),a=a.next),a}function bi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ra(e,e.next)||de(e.prev,e,e.next)===0)){if(js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ys(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Z_(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?H_(i,n,s,r):z_(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),js(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=V_(bi(i),t,e),Ys(i,t,e,n,s,r,2)):a===2&&G_(i,t,e,n,s,r):Ys(bi(i),t,e,n,s,r,1);break}}}function z_(i){let t=i.prev,e=i,n=i.next;if(de(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,p=s>r?s>a?s:a:r>a?r:a,d=o>l?o>c?o:c:l>c?l:c,g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=p&&g.y>=u&&g.y<=d&&Qi(s,o,r,l,a,c,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function H_(i,t,e,n){let s=i.prev,r=i,a=i.next;if(de(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,p=a.y,d=o<l?o<c?o:c:l<c?l:c,g=h<u?h<p?h:p:u<p?u:p,v=o>l?o>c?o:c:l>c?l:c,m=h>u?h>p?h:p:u>p?u:p,f=gl(d,g,t,e,n),M=gl(v,m,t,e,n),x=i.prevZ,T=i.nextZ;for(;x&&x.z>=f&&T&&T.z<=M;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Qi(o,h,l,u,c,p,x.x,x.y)&&de(x.prev,x,x.next)>=0||(x=x.prevZ,T.x>=d&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==a&&Qi(o,h,l,u,c,p,T.x,T.y)&&de(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;x&&x.z>=f;){if(x.x>=d&&x.x<=v&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Qi(o,h,l,u,c,p,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;T&&T.z<=M;){if(T.x>=d&&T.x<=v&&T.y>=g&&T.y<=m&&T!==s&&T!==a&&Qi(o,h,l,u,c,p,T.x,T.y)&&de(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function V_(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Ra(s,r)&&Cu(s,n,n.next,r)&&Zs(s,r)&&Zs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),js(n),js(n.next),n=i=r),n=n.next}while(n!==i);return bi(n)}function G_(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&J_(a,o)){let l=Pu(a,o);a=bi(a,a.next),l=bi(l,l.next),Ys(a,t,e,n,s,r,0),Ys(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function W_(i,t,e,n){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Ru(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(K_(c));for(s.sort(X_),r=0;r<s.length;r++)e=$_(s[r],e);return e}function X_(i,t){return i.x-t.x}function $_(i,t){let e=q_(i,t);if(!e)return t;let n=Pu(e,i);return bi(n,n.next),bi(e,e.next)}function q_(i,t){let e=t,n=-1/0,s,r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let p=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(p<=r&&p>n&&(n=p,s=e.x<e.next.x?e:e.next,p===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Qi(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Zs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Y_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function Y_(i,t){return de(i.prev,i,t.prev)<0&&de(t.next,i,i.next)<0}function Z_(i,t,e,n){let s=i;do s.z===0&&(s.z=gl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,j_(s)}function j_(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function gl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function K_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Qi(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function J_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Q_(i,t)&&(Zs(i,t)&&Zs(t,i)&&tv(i,t)&&(de(i.prev,i,t.prev)||de(i,t.prev,t))||Ra(i,t)&&de(i.prev,i,i.next)>0&&de(t.prev,t,t.next)>0)}function de(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ra(i,t){return i.x===t.x&&i.y===t.y}function Cu(i,t,e,n){let s=Vr(de(i,t,e)),r=Vr(de(i,t,n)),a=Vr(de(e,n,i)),o=Vr(de(e,n,t));return!!(s!==r&&a!==o||s===0&&Hr(i,e,t)||r===0&&Hr(i,n,t)||a===0&&Hr(e,i,n)||o===0&&Hr(e,t,n))}function Hr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Vr(i){return i>0?1:i<0?-1:0}function Q_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Cu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Zs(i,t){return de(i.prev,i,i.next)<0?de(i,t,i.next)>=0&&de(i,i.prev,t)>=0:de(i,t,i.prev)<0||de(i,i.next,t)<0}function tv(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Pu(i,t){let e=new _l(i.i,i.x,i.y),n=new _l(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Qh(i,t,e,n){let s=new _l(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function js(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _l(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ev(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var Bs=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];tu(t),eu(n,t);let a=t.length;e.forEach(tu);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,eu(n,e[l]);let o=B_.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function tu(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function eu(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var ya=class i extends De{constructor(t=new qs([new yt(.5,.5),new yt(-.5,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new le(s,3)),this.setAttribute("uv",new le(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,p=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,f=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:nv,x,T=!1,L,P,A,V;f&&(x=f.getSpacedPoints(h),T=!0,p=!1,L=f.computeFrenetFrames(h,!1),P=new X,A=new X,V=new X),p||(m=0,d=0,g=0,v=0);let R=o.extractPoints(c),S=R.shape,D=R.holes;if(!Bs.isClockWise(S)){S=S.reverse();for(let _=0,q=D.length;_<q;_++){let O=D[_];Bs.isClockWise(O)&&(D[_]=O.reverse())}}let $=Bs.triangulateShape(S,D),B=S;for(let _=0,q=D.length;_<q;_++){let O=D[_];S=S.concat(O)}function U(_,q,O){return q||console.error("THREE.ExtrudeGeometry: vec does not exist"),_.clone().addScaledVector(q,O)}let J=S.length,Y=$.length;function et(_,q,O){let C,w,H,K=_.x-q.x,E=_.y-q.y,y=O.x-_.x,F=O.y-_.y,Q=K*K+E*E,j=K*F-E*y;if(Math.abs(j)>Number.EPSILON){let nt=Math.sqrt(Q),vt=Math.sqrt(y*y+F*F),ht=q.x-E/nt,Mt=q.y+K/nt,Dt=O.x-F/vt,Ut=O.y+y/vt,ut=((Dt-ht)*F-(Ut-Mt)*y)/(K*F-E*y);C=ht+K*ut-_.x,w=Mt+E*ut-_.y;let Pt=C*C+w*w;if(Pt<=2)return new yt(C,w);H=Math.sqrt(Pt/2)}else{let nt=!1;K>Number.EPSILON?y>Number.EPSILON&&(nt=!0):K<-Number.EPSILON?y<-Number.EPSILON&&(nt=!0):Math.sign(E)===Math.sign(F)&&(nt=!0),nt?(C=-E,w=K,H=Math.sqrt(Q)):(C=K,w=E,H=Math.sqrt(Q/2))}return new yt(C/H,w/H)}let N=[];for(let _=0,q=B.length,O=q-1,C=_+1;_<q;_++,O++,C++)O===q&&(O=0),C===q&&(C=0),N[_]=et(B[_],B[O],B[C]);let k=[],it,st=N.concat();for(let _=0,q=D.length;_<q;_++){let O=D[_];it=[];for(let C=0,w=O.length,H=w-1,K=C+1;C<w;C++,H++,K++)H===w&&(H=0),K===w&&(K=0),it[C]=et(O[C],O[H],O[K]);k.push(it),st=st.concat(it)}for(let _=0;_<m;_++){let q=_/m,O=d*Math.cos(q*Math.PI/2),C=g*Math.sin(q*Math.PI/2)+v;for(let w=0,H=B.length;w<H;w++){let K=U(B[w],N[w],C);ft(K.x,K.y,-O)}for(let w=0,H=D.length;w<H;w++){let K=D[w];it=k[w];for(let E=0,y=K.length;E<y;E++){let F=U(K[E],it[E],C);ft(F.x,F.y,-O)}}}let G=g+v;for(let _=0;_<J;_++){let q=p?U(S[_],st[_],G):S[_];T?(A.copy(L.normals[0]).multiplyScalar(q.x),P.copy(L.binormals[0]).multiplyScalar(q.y),V.copy(x[0]).add(A).add(P),ft(V.x,V.y,V.z)):ft(q.x,q.y,0)}for(let _=1;_<=h;_++)for(let q=0;q<J;q++){let O=p?U(S[q],st[q],G):S[q];T?(A.copy(L.normals[_]).multiplyScalar(O.x),P.copy(L.binormals[_]).multiplyScalar(O.y),V.copy(x[_]).add(A).add(P),ft(V.x,V.y,V.z)):ft(O.x,O.y,u/h*_)}for(let _=m-1;_>=0;_--){let q=_/m,O=d*Math.cos(q*Math.PI/2),C=g*Math.sin(q*Math.PI/2)+v;for(let w=0,H=B.length;w<H;w++){let K=U(B[w],N[w],C);ft(K.x,K.y,u+O)}for(let w=0,H=D.length;w<H;w++){let K=D[w];it=k[w];for(let E=0,y=K.length;E<y;E++){let F=U(K[E],it[E],C);T?ft(F.x,F.y+x[h-1].y,x[h-1].x+O):ft(F.x,F.y,u+O)}}}ct(),_t();function ct(){let _=s.length/3;if(p){let q=0,O=J*q;for(let C=0;C<Y;C++){let w=$[C];Tt(w[2]+O,w[1]+O,w[0]+O)}q=h+m*2,O=J*q;for(let C=0;C<Y;C++){let w=$[C];Tt(w[0]+O,w[1]+O,w[2]+O)}}else{for(let q=0;q<Y;q++){let O=$[q];Tt(O[2],O[1],O[0])}for(let q=0;q<Y;q++){let O=$[q];Tt(O[0]+J*h,O[1]+J*h,O[2]+J*h)}}n.addGroup(_,s.length/3-_,0)}function _t(){let _=s.length/3,q=0;pt(B,q),q+=B.length;for(let O=0,C=D.length;O<C;O++){let w=D[O];pt(w,q),q+=w.length}n.addGroup(_,s.length/3-_,1)}function pt(_,q){let O=_.length;for(;--O>=0;){let C=O,w=O-1;w<0&&(w=_.length-1);for(let H=0,K=h+m*2;H<K;H++){let E=J*H,y=J*(H+1),F=q+C+E,Q=q+w+E,j=q+w+y,nt=q+C+y;At(F,Q,j,nt)}}}function ft(_,q,O){l.push(_),l.push(q),l.push(O)}function Tt(_,q,O){wt(_),wt(q),wt(O);let C=s.length/3,w=M.generateTopUV(n,s,C-3,C-2,C-1);It(w[0]),It(w[1]),It(w[2])}function At(_,q,O,C){wt(_),wt(q),wt(C),wt(q),wt(O),wt(C);let w=s.length/3,H=M.generateSideWallUV(n,s,w-6,w-3,w-2,w-1);It(H[0]),It(H[1]),It(H[3]),It(H[1]),It(H[2]),It(H[3])}function wt(_){s.push(l[_*3+0]),s.push(l[_*3+1]),s.push(l[_*3+2])}function It(_){r.push(_.x),r.push(_.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return iv(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new pl[s.type]().fromJSON(s)),new i(n,t.options)}},nv={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new yt(r,a),new yt(o,l),new yt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],p=t[s*3],d=t[s*3+1],g=t[s*3+2],v=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new yt(a,1-l),new yt(c,1-u),new yt(p,1-g),new yt(v,1-f)]:[new yt(o,1-l),new yt(h,1-u),new yt(d,1-g),new yt(m,1-f)]}};function iv(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var hs=class i extends De{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new X,p=new X,d=[],g=[],v=[],m=[];for(let f=0;f<=n;f++){let M=[],x=f/n,T=0;f===0&&a===0?T=.5/e:f===n&&l===Math.PI&&(T=-.5/e);for(let L=0;L<=e;L++){let P=L/e;u.x=-t*Math.cos(s+P*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(s+P*r)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),p.copy(u).normalize(),v.push(p.x,p.y,p.z),m.push(P+T,1-x),M.push(c++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){let x=h[f][M+1],T=h[f][M],L=h[f+1][M],P=h[f+1][M+1];(f!==0||a>0)&&d.push(x,T,P),(f!==n-1||l<Math.PI)&&d.push(T,L,P)}this.setIndex(d),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(v,3)),this.setAttribute("uv",new le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ba=class extends On{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Gt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};var Ce=class extends On{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gu,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Gr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function sv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var us=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}a=n,n=0;break n}break t}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},vl=class extends us{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ih,endingEnd:ih}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case sh:r=t,o=2*e-n;break;case rh:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case sh:a=t,l=2*n-e;break;case rh:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,d=this._weightNext,g=(n-e)/(s-e),v=g*g,m=v*g,f=-p*m+2*p*v-p*g,M=(1+p)*m+(-1.5-2*p)*v+(-.5+p)*g+1,x=(-1-d)*m+(1.5+d)*v+.5*g,T=d*m-d*v;for(let L=0;L!==o;++L)r[L]=f*a[h+L]+M*a[c+L]+x*a[l+L]+T*a[u+L];return r}},xl=class extends us{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),u=1-h;for(let p=0;p!==o;++p)r[p]=a[c+p]*u+a[l+p]*h;return r}},yl=class extends us{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},pn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Gr(e,this.TimeBufferType),this.values=Gr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Gr(t.times,Array),values:Gr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new yl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new xl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new vl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case $r:e=this.InterpolantFactoryMethodDiscrete;break;case qr:e=this.InterpolantFactoryMethodLinear;break;case ho:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $r;case this.InterpolantFactoryMethodLinear:return qr;case this.InterpolantFactoryMethodSmooth:return ho}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&sv(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ho,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*n,p=u-n,d=u+n;for(let g=0;g!==n;++g){let v=e[u+g];if(v!==e[p+g]||v!==e[d+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*n,p=a*n;for(let d=0;d!==n;++d)e[p+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=qr;var Si=class extends pn{};Si.prototype.ValueTypeName="bool";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=$r;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var bl=class extends pn{};bl.prototype.ValueTypeName="color";var Sl=class extends pn{};Sl.prototype.ValueTypeName="number";var Ml=class extends us{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)qe.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ks=class extends pn{InterpolantFactoryMethodLinear(t){return new Ml(this.times,this.values,this.getValueSize(),t)}};Ks.prototype.ValueTypeName="quaternion";Ks.prototype.DefaultInterpolation=qr;Ks.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends pn{};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=$r;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var El=class extends pn{};El.prototype.ValueTypeName="vector";var wl=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,p=c.length;u<p;u+=2){let d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},rv=new wl,Tl=class{constructor(t){this.manager=t!==void 0?t:rv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Tl.DEFAULT_MATERIAL_NAME="__DEFAULT";var Sa=class extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Ma=class extends Sa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},ko=new ae,nu=new X,iu=new X,Al=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gs,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;nu.setFromMatrixPosition(t.matrixWorld),e.position.copy(nu),iu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(iu),e.updateMatrixWorld(),ko.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ko),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ko)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Rl=class extends Al{constructor(){super(new ca(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Js=class extends Sa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new Rl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var kl="\\[\\]\\.:\\/",av=new RegExp("["+kl+"]","g"),Bl="[^"+kl+"]",ov="[^"+kl.replace("\\.","")+"]",lv=/((?:WC+[\/:])*)/.source.replace("WC",Bl),cv=/(WCOD+)?/.source.replace("WCOD",ov),hv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bl),uv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bl),dv=new RegExp("^"+lv+cv+hv+uv+"$"),fv=["material","materials","bones","map"],Cl=class{constructor(t,e,n){let s=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},oe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(av,"")}static parseTrackName(t){let e=dv.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);fv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=Cl;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var qv=new Float32Array(1);var Qs=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(we(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var tr=class extends pa{constructor(t=10,e=10,n=4473924,s=8947848){n=new Gt(n),s=new Gt(s);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let p=0,d=0,g=-o;p<=e;p++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let v=p===r?n:s;v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3,v.toArray(c,d),d+=3}let h=new De;h.setAttribute("position",new le(l,3)),h.setAttribute("color",new le(c,3));let u=new Qn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var su=new X,Wr,Bo,Ea=class extends ve{constructor(t=new X(0,0,1),e=new X(0,0,0),n=1,s=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",Wr===void 0&&(Wr=new De,Wr.setAttribute("position",new le([0,0,0,0,1,0],3)),Bo=new yi(0,.5,1,5,1),Bo.translate(0,-.5,0)),this.position.copy(e),this.line=new cs(Wr,new Qn({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Re(Bo,new Un({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,a)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{su.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(su,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},er=class extends pa{constructor(t=1){let e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new De;s.setAttribute("position",new le(e,3)),s.setAttribute("color",new le(n,3));let r=new Qn({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(t,e,n){let s=new Gt,r=this.geometry.attributes.color.array;return s.set(t),s.toArray(r,0),s.toArray(r,3),s.set(e),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pl);var Lu={type:"change"},zl={type:"start"},Iu={type:"end"},Ca=new os,Du=new hn,mv=Math.cos(70*vu.DEG2RAD),Pa=class extends vn{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ei.ROTATE,MIDDLE:Ei.DOLLY,RIGHT:Ei.PAN},this.touches={ONE:wi.ROTATE,TWO:wi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(z){z.addEventListener("keydown",nt),this._domElementKeyEvents=z},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",nt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Lu),n.update(),r=s.NONE},this.update=function(){let z=new X,dt=new qe().setFromUnitVectors(t.up,new X(0,1,0)),gt=dt.clone().invert(),mt=new X,Lt=new qe,$t=new X,Jt=2*Math.PI;return function(xt=null){let W=n.object.position;z.copy(W).sub(n.target),z.applyQuaternion(dt),o.setFromVector3(z),n.autoRotate&&r===s.NONE&&D(R(xt)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let bt=n.minAzimuthAngle,St=n.maxAzimuthAngle;isFinite(bt)&&isFinite(St)&&(bt<-Math.PI?bt+=Jt:bt>Math.PI&&(bt-=Jt),St<-Math.PI?St+=Jt:St>Math.PI&&(St-=Jt),bt<=St?o.theta=Math.max(bt,Math.min(St,o.theta)):o.theta=o.theta>(bt+St)/2?Math.max(bt,o.theta):Math.min(St,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&P||n.object.isOrthographicCamera?o.radius=N(o.radius):o.radius=N(o.radius*c),z.setFromSpherical(o),z.applyQuaternion(gt),W.copy(n.target).add(z),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0));let Ft=!1;if(n.zoomToCursor&&P){let Nt=null;if(n.object.isPerspectiveCamera){let te=z.length();Nt=N(te*c);let ee=te-Nt;n.object.position.addScaledVector(T,ee),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let te=new X(L.x,L.y,0);te.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Ft=!0;let ee=new X(L.x,L.y,0);ee.unproject(n.object),n.object.position.sub(ee).add(te),n.object.updateMatrixWorld(),Nt=z.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Nt!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Nt).add(n.object.position):(Ca.origin.copy(n.object.position),Ca.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ca.direction))<mv?t.lookAt(n.target):(Du.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ca.intersectPlane(Du,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),Ft=!0);return c=1,P=!1,Ft||mt.distanceToSquared(n.object.position)>a||8*(1-Lt.dot(n.object.quaternion))>a||$t.distanceToSquared(n.target)>0?(n.dispatchEvent(Lu),mt.copy(n.object.position),Lt.copy(n.object.quaternion),$t.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Mt),n.domElement.removeEventListener("pointerdown",K),n.domElement.removeEventListener("pointercancel",y),n.domElement.removeEventListener("wheel",j),n.domElement.removeEventListener("pointermove",E),n.domElement.removeEventListener("pointerup",y),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",nt),n._domElementKeyEvents=null)};let n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,a=1e-6,o=new Qs,l=new Qs,c=1,h=new X,u=new yt,p=new yt,d=new yt,g=new yt,v=new yt,m=new yt,f=new yt,M=new yt,x=new yt,T=new X,L=new yt,P=!1,A=[],V={};function R(z){return z!==null?2*Math.PI/60*n.autoRotateSpeed*z:2*Math.PI/60/60*n.autoRotateSpeed}function S(z){let dt=Math.abs(z)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*dt)}function D(z){l.theta-=z}function b(z){l.phi-=z}let $=function(){let z=new X;return function(gt,mt){z.setFromMatrixColumn(mt,0),z.multiplyScalar(-gt),h.add(z)}}(),B=function(){let z=new X;return function(gt,mt){n.screenSpacePanning===!0?z.setFromMatrixColumn(mt,1):(z.setFromMatrixColumn(mt,0),z.crossVectors(n.object.up,z)),z.multiplyScalar(gt),h.add(z)}}(),U=function(){let z=new X;return function(gt,mt){let Lt=n.domElement;if(n.object.isPerspectiveCamera){let $t=n.object.position;z.copy($t).sub(n.target);let Jt=z.length();Jt*=Math.tan(n.object.fov/2*Math.PI/180),$(2*gt*Jt/Lt.clientHeight,n.object.matrix),B(2*mt*Jt/Lt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?($(gt*(n.object.right-n.object.left)/n.object.zoom/Lt.clientWidth,n.object.matrix),B(mt*(n.object.top-n.object.bottom)/n.object.zoom/Lt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function J(z){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=z:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(z){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=z:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function et(z,dt){if(!n.zoomToCursor)return;P=!0;let gt=n.domElement.getBoundingClientRect(),mt=z-gt.left,Lt=dt-gt.top,$t=gt.width,Jt=gt.height;L.x=mt/$t*2-1,L.y=-(Lt/Jt)*2+1,T.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function N(z){return Math.max(n.minDistance,Math.min(n.maxDistance,z))}function k(z){u.set(z.clientX,z.clientY)}function it(z){et(z.clientX,z.clientX),f.set(z.clientX,z.clientY)}function st(z){g.set(z.clientX,z.clientY)}function G(z){p.set(z.clientX,z.clientY),d.subVectors(p,u).multiplyScalar(n.rotateSpeed);let dt=n.domElement;D(2*Math.PI*d.x/dt.clientHeight),b(2*Math.PI*d.y/dt.clientHeight),u.copy(p),n.update()}function ct(z){M.set(z.clientX,z.clientY),x.subVectors(M,f),x.y>0?J(S(x.y)):x.y<0&&Y(S(x.y)),f.copy(M),n.update()}function _t(z){v.set(z.clientX,z.clientY),m.subVectors(v,g).multiplyScalar(n.panSpeed),U(m.x,m.y),g.copy(v),n.update()}function pt(z){et(z.clientX,z.clientY),z.deltaY<0?Y(S(z.deltaY)):z.deltaY>0&&J(S(z.deltaY)),n.update()}function ft(z){let dt=!1;switch(z.code){case n.keys.UP:z.ctrlKey||z.metaKey||z.shiftKey?b(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(0,n.keyPanSpeed),dt=!0;break;case n.keys.BOTTOM:z.ctrlKey||z.metaKey||z.shiftKey?b(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(0,-n.keyPanSpeed),dt=!0;break;case n.keys.LEFT:z.ctrlKey||z.metaKey||z.shiftKey?D(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(n.keyPanSpeed,0),dt=!0;break;case n.keys.RIGHT:z.ctrlKey||z.metaKey||z.shiftKey?D(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):U(-n.keyPanSpeed,0),dt=!0;break}dt&&(z.preventDefault(),n.update())}function Tt(z){if(A.length===1)u.set(z.pageX,z.pageY);else{let dt=Pt(z),gt=.5*(z.pageX+dt.x),mt=.5*(z.pageY+dt.y);u.set(gt,mt)}}function At(z){if(A.length===1)g.set(z.pageX,z.pageY);else{let dt=Pt(z),gt=.5*(z.pageX+dt.x),mt=.5*(z.pageY+dt.y);g.set(gt,mt)}}function wt(z){let dt=Pt(z),gt=z.pageX-dt.x,mt=z.pageY-dt.y,Lt=Math.sqrt(gt*gt+mt*mt);f.set(0,Lt)}function It(z){n.enableZoom&&wt(z),n.enablePan&&At(z)}function _(z){n.enableZoom&&wt(z),n.enableRotate&&Tt(z)}function q(z){if(A.length==1)p.set(z.pageX,z.pageY);else{let gt=Pt(z),mt=.5*(z.pageX+gt.x),Lt=.5*(z.pageY+gt.y);p.set(mt,Lt)}d.subVectors(p,u).multiplyScalar(n.rotateSpeed);let dt=n.domElement;D(2*Math.PI*d.x/dt.clientHeight),b(2*Math.PI*d.y/dt.clientHeight),u.copy(p)}function O(z){if(A.length===1)v.set(z.pageX,z.pageY);else{let dt=Pt(z),gt=.5*(z.pageX+dt.x),mt=.5*(z.pageY+dt.y);v.set(gt,mt)}m.subVectors(v,g).multiplyScalar(n.panSpeed),U(m.x,m.y),g.copy(v)}function C(z){let dt=Pt(z),gt=z.pageX-dt.x,mt=z.pageY-dt.y,Lt=Math.sqrt(gt*gt+mt*mt);M.set(0,Lt),x.set(0,Math.pow(M.y/f.y,n.zoomSpeed)),J(x.y),f.copy(M);let $t=(z.pageX+dt.x)*.5,Jt=(z.pageY+dt.y)*.5;et($t,Jt)}function w(z){n.enableZoom&&C(z),n.enablePan&&O(z)}function H(z){n.enableZoom&&C(z),n.enableRotate&&q(z)}function K(z){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(z.pointerId),n.domElement.addEventListener("pointermove",E),n.domElement.addEventListener("pointerup",y)),Dt(z),z.pointerType==="touch"?vt(z):F(z))}function E(z){n.enabled!==!1&&(z.pointerType==="touch"?ht(z):Q(z))}function y(z){Ut(z),A.length===0&&(n.domElement.releasePointerCapture(z.pointerId),n.domElement.removeEventListener("pointermove",E),n.domElement.removeEventListener("pointerup",y)),n.dispatchEvent(Iu),r=s.NONE}function F(z){let dt;switch(z.button){case 0:dt=n.mouseButtons.LEFT;break;case 1:dt=n.mouseButtons.MIDDLE;break;case 2:dt=n.mouseButtons.RIGHT;break;default:dt=-1}switch(dt){case Ei.DOLLY:if(n.enableZoom===!1)return;it(z),r=s.DOLLY;break;case Ei.ROTATE:if(z.ctrlKey||z.metaKey||z.shiftKey){if(n.enablePan===!1)return;st(z),r=s.PAN}else{if(n.enableRotate===!1)return;k(z),r=s.ROTATE}break;case Ei.PAN:if(z.ctrlKey||z.metaKey||z.shiftKey){if(n.enableRotate===!1)return;k(z),r=s.ROTATE}else{if(n.enablePan===!1)return;st(z),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(zl)}function Q(z){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;G(z);break;case s.DOLLY:if(n.enableZoom===!1)return;ct(z);break;case s.PAN:if(n.enablePan===!1)return;_t(z);break}}function j(z){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(z.preventDefault(),n.dispatchEvent(zl),pt(z),n.dispatchEvent(Iu))}function nt(z){n.enabled===!1||n.enablePan===!1||ft(z)}function vt(z){switch(ut(z),A.length){case 1:switch(n.touches.ONE){case wi.ROTATE:if(n.enableRotate===!1)return;Tt(z),r=s.TOUCH_ROTATE;break;case wi.PAN:if(n.enablePan===!1)return;At(z),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case wi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;It(z),r=s.TOUCH_DOLLY_PAN;break;case wi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;_(z),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(zl)}function ht(z){switch(ut(z),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;q(z),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;O(z),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;w(z),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;H(z),n.update();break;default:r=s.NONE}}function Mt(z){n.enabled!==!1&&z.preventDefault()}function Dt(z){A.push(z.pointerId)}function Ut(z){delete V[z.pointerId];for(let dt=0;dt<A.length;dt++)if(A[dt]==z.pointerId){A.splice(dt,1);return}}function ut(z){let dt=V[z.pointerId];dt===void 0&&(dt=new yt,V[z.pointerId]=dt),dt.set(z.pageX,z.pageY)}function Pt(z){let dt=z.pointerId===A[0]?A[1]:A[0];return V[dt]}n.domElement.addEventListener("contextmenu",Mt),n.domElement.addEventListener("pointerdown",K),n.domElement.addEventListener("pointercancel",y),n.domElement.addEventListener("wheel",j,{passive:!1}),this.update()}};var La=class extends ve{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new yt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}},fs=new X,Nu=new ae,Ou=new ae,Uu=new X,Fu=new X,Ia=class{constructor(t={}){let e=this,n,s,r,a,o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(d,g){d.matrixWorldAutoUpdate===!0&&d.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),Nu.copy(g.matrixWorldInverse),Ou.multiplyMatrices(g.projectionMatrix,Nu),c(d,d,g),p(d)},this.setSize=function(d,g){n=d,s=g,r=n/2,a=s/2,l.style.width=d+"px",l.style.height=g+"px"};function c(d,g,v){if(d.isCSS2DObject){fs.setFromMatrixPosition(d.matrixWorld),fs.applyMatrix4(Ou);let m=d.visible===!0&&fs.z>=-1&&fs.z<=1&&d.layers.test(v.layers)===!0;if(d.element.style.display=m===!0?"":"none",m===!0){d.onBeforeRender(e,g,v);let M=d.element;M.style.transform="translate("+-100*d.center.x+"%,"+-100*d.center.y+"%)translate("+(fs.x*r+r)+"px,"+(-fs.y*a+a)+"px)",M.parentNode!==l&&l.appendChild(M),d.onAfterRender(e,g,v)}let f={distanceToCameraSquared:h(v,d)};o.objects.set(d,f)}for(let m=0,f=d.children.length;m<f;m++)c(d.children[m],g,v)}function h(d,g){return Uu.setFromMatrixPosition(d.matrixWorld),Fu.setFromMatrixPosition(g.matrixWorld),Uu.distanceToSquared(Fu)}function u(d){let g=[];return d.traverse(function(v){v.isCSS2DObject&&g.push(v)}),g}function p(d){let g=u(d).sort(function(m,f){if(m.renderOrder!==f.renderOrder)return f.renderOrder-m.renderOrder;let M=o.objects.get(m).distanceToCameraSquared,x=o.objects.get(f).distanceToCameraSquared;return M-x}),v=g.length;for(let m=0,f=g.length;m<f;m++)g[m].element.style.zIndex=v-m}}};var Zl=Ad(Bu()),Z=i=>document.getElementById(i),Ne=(i,t=1)=>(Math.abs(i)<.05&&t<=1?0:i).toFixed(t),Bt=i=>String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),ar=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7),Ms=i=>JSON.parse(JSON.stringify(i)),yn=()=>new Date().toISOString(),ni=i=>{let t=new Date(i);return t.toLocaleDateString("pt-BR")+" "+t.toTimeString().slice(0,5)},jl=window.korum&&window.korum.version||"1.0.0",Ye=window.korum||null,Bn={async load(){if(Ye)return await Ye.load();try{return localStorage.getItem("korum-store")}catch{return null}},save(i){if(Ye)return Ye.saveSync(i);try{return localStorage.setItem("korum-store",i),!0}catch{return!1}},async saveFile(i,t){if(Ye)return Ye.saveFile(i,t,Ct.settings.backupDir||"");let e=new Blob([t]),n=document.createElement("a");return n.href=URL.createObjectURL(e),n.download=i,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),5e3),{saved:!0,path:i}},async chooseDir(){return Ye?Ye.chooseDir():null},openData(){Ye?Ye.openDataFolder():rn("Dispon\xEDvel no aplicativo instalado")},async ai(i){if(Ye)return Ye.ai(i);try{let t=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"content-type":"application/json","x-api-key":i.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:i.model,max_tokens:2e3,system:i.system,messages:i.messages})}),e=await t.json();return t.ok?{text:(e.content||[]).filter(n=>n.type==="text").map(n=>n.text).join(`
`)}:{error:e.error&&e.error.message||"HTTP "+t.status}}catch(t){return{error:t.message}}}},za="claude-sonnet-5-5",Ct={v:1,settings:{theme:"escuro",apiKey:"",model:za,backupDir:""},projects:[],currentId:null,progress:{lessons:{},exercises:{}}},Xu=["Movimenta\xE7\xE3o b\xE1sica","Manipula\xE7\xE3o de pe\xE7as","Pick and Place","Paletiza\xE7\xE3o","Soldagem","Opera\xE7\xF5es de montagem","Inspe\xE7\xE3o","Alimenta\xE7\xE3o de m\xE1quinas","Integra\xE7\xE3o com sensores","Aplica\xE7\xF5es avan\xE7adas","Exerc\xEDcios","Importados"],Wt=()=>Ct.projects.find(i=>i.id===Ct.currentId);function Es({name:i,cat:t,src:e,dat:n,scene:s,exercise:r}){let a={id:ar(),name:i,cat:t||"Movimenta\xE7\xE3o b\xE1sica",src:e,dat:n,scene:Ms(s||SCENES.pick),blocks:null,original:null,versions:[],created:yn(),updated:yn(),exercise:r||null};return a.versions.push({id:ar(),date:yn(),note:"Cria\xE7\xE3o do projeto",src:e,dat:n}),Ct.projects.unshift(a),a}var Ua=null;function he(){let i=Wt();i&&(i.updated=yn()),clearTimeout(Ua),Ua=setTimeout(Ha,600)}function Ha(){clearTimeout(Ua);let i=Bn.save(JSON.stringify(Ct));Z("saved").textContent=i?"salvo "+new Date().toTimeString().slice(0,5):"\u26A0 falha ao salvar",Z("saved").style.color=i?"":"var(--err)"}window.addEventListener("beforeunload",()=>{Ua&&Ha()});function si(i,t){let e=Wt();if(!e)return!1;let n=e.versions[e.versions.length-1];return!t&&n&&n.src===e.src&&n.dat===e.dat?!1:(e.versions.push({id:ar(),date:yn(),note:i,src:e.src,dat:e.dat}),e.versions.length>80&&e.versions.splice(1,e.versions.length-80),he(),!0)}function ne(i,t,e){let n=document.createElement("div");n.className=i;let s={info:"INFO",ok:"OK",warn:"AVISO",err:"ERRO",run:"EXEC"}[i]||i;if(n.innerHTML=`<time>${new Date().toTimeString().slice(0,8)}</time><span class="lv">${s}</span>`,e&&e.line){let o=document.createElement("a");o.textContent=`${e.file==="dat"?"dat":"src"}:${e.line}`,o.onclick=()=>{sn("prog"),Fa(e)},n.appendChild(o)}let r=document.createElement("span");r.className="lm",r.textContent=t,n.appendChild(r);let a=Z("log");for(a.appendChild(n);a.children.length>800;)a.firstChild.remove();a.scrollTop=a.scrollHeight,lt.logTail.push(`${s}${e&&e.line?` (${e.file}:${e.line})`:""}: ${t}`),lt.logTail.length>30&&lt.logTail.shift()}var zu;function rn(i){let t=Z("toast");t.textContent=i,t.style.display="block",clearTimeout(zu),zu=setTimeout(()=>t.style.display="none",2400)}function Ri(i,t,e){return new Promise(n=>{Z("askTitle").textContent=i,Z("askBody").innerHTML=t;let s=Z("askFoot");s.innerHTML="";for(let r of e){let a=document.createElement("button");a.textContent=r.label,r.pri&&(a.className="pri"),r.danger&&(a.className="danger"),a.onclick=()=>{Z("mAsk").classList.remove("on"),n(r.value)},s.appendChild(a)}Z("mAsk").classList.add("on")})}document.querySelectorAll("[data-close]").forEach(i=>i.onclick=()=>i.closest(".modal").classList.remove("on"));document.querySelectorAll(".modal").forEach(i=>i.addEventListener("click",t=>{t.target===i&&i.id!=="mAsk"&&i.classList.remove("on")}));var lt={joints:RL.HOME.slice(),file:"src",ins:new Array(9).fill(!1),outs:new Array(65).fill(!1),pov:100,machine:null,running:!1,curLine:null,errLine:null,warnLines:new Set,tool:{...RL.DEFAULT_TOOL},base:{X:0,Y:0,Z:0,A:0,B:0,C:0},events:[],logTail:[],chat:[],pane:"prog",exTargets:[]};function sn(i){lt.pane=i,document.querySelectorAll("#nav button[data-p]").forEach(t=>t.classList.toggle("on",t.dataset.p===i)),document.querySelectorAll(".pane").forEach(t=>t.classList.toggle("on",t.id==="p-"+i)),i==="prog"&&kn(),i==="blocos"&&kv(),i==="projetos"&&nn(),i==="cursos"&&ir(),i==="exerc"&&Ja(),i==="cena"&&pr(),i==="analise"&&Hv(),i==="ia"&&rr(),i==="config"&&_c()}document.querySelectorAll("#nav button[data-p]").forEach(i=>i.onclick=()=>sn(i.dataset.p));var ce=Z("ta"),Vl=Z("hl"),$u=Z("gut"),gv=new Set("DEF END DEFDAT ENDDAT DECL GLOBAL CONST IF THEN ELSE ENDIF FOR TO STEP ENDFOR WHILE ENDWHILE REPEAT UNTIL LOOP ENDLOOP SWITCH CASE DEFAULT ENDSWITCH EXIT RETURN WAIT SEC HALT INTERRUPT WHEN DO ON OFF INI AND OR NOT EXOR EXT BRAKE GOTO".split(" ")),_v=new Set("PTP LIN CIRC PTP_REL LIN_REL SPLINE SPL SLIN SCIRC SPTP C_PTP C_DIS C_VEL C_ORI".split(" ")),vv=new Set("INT REAL BOOL CHAR E6POS POS FRAME E6AXIS AXIS FDAT PDAT LDAT".split(" "));function xv(i){if(/^\s*&/.test(i))return`<span class="c">${Bt(i)}</span>`;let t=i,e="",n=!1;for(let r=0;r<i.length;r++)if(i[r]==='"')n=!n;else if(i[r]===";"&&!n){t=i.slice(0,r),e=i.slice(r);break}return t.replace(/("[^"]*")|(#\w+)|(\$\w+)|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)|([<>&])/g,(r,a,o,l,c,h,u)=>{if(a)return`<span class="s">${Bt(a)}</span>`;if(o)return`<span class="e">${o}</span>`;if(l)return`<span class="v">${l}</span>`;if(c)return`<span class="n">${c}</span>`;if(u)return Bt(u);let p=h.toUpperCase();return _v.has(p)?`<span class="m">${h}</span>`:gv.has(p)?`<span class="k">${h}</span>`:vv.has(p)?`<span class="t">${h}</span>`:p==="TRUE"||p==="FALSE"?`<span class="n">${h}</span>`:h})+(e?`<span class="c">${Bt(e)}</span>`:"")}function kn(){let i=ce.value.split(`
`),t=lt.file,e=lt.curLine&&lt.curLine.file===t?lt.curLine.line:-1,n=lt.errLine&&lt.errLine.file===t?lt.errLine.line:-1;Vl.innerHTML=i.map((s,r)=>`<div class="${r+1===e?"cur":""}${r+1===n?" errl":""}">${xv(s)||" "}</div>`).join("")+"<div></div>".repeat(8),$u.innerHTML=i.map((s,r)=>`<div class="${r+1===e?"cur":""}${r+1===n?" errl":""}${lt.warnLines.has(t+(r+1))?" wrn":""}">${r+1}</div>`).join("")+"<div></div>".repeat(8),Va()}function Va(){Vl.scrollTop=ce.scrollTop,Vl.scrollLeft=ce.scrollLeft,$u.scrollTop=ce.scrollTop}ce.addEventListener("scroll",Va);var Hu;ce.addEventListener("input",()=>{let i=Wt();i&&(i[lt.file]=ce.value,lt.errLine=null,kn(),hr(),he(),clearTimeout(Hu),Hu=setTimeout(Mn,500))});ce.addEventListener("keydown",i=>{i.key==="Tab"&&(i.preventDefault(),ce.setRangeText("  ",ce.selectionStart,ce.selectionEnd,"end"),ce.dispatchEvent(new Event("input")))});document.addEventListener("keydown",i=>{i.key==="F5"&&(i.preventDefault(),Ci(!1)),i.key==="F10"&&(i.preventDefault(),Ci(!0)),i.key==="Escape"&&document.querySelectorAll(".modal.on").forEach(t=>t.id!=="mAsk"&&t.classList.remove("on")),(i.ctrlKey||i.metaKey)&&i.key.toLowerCase()==="s"&&(i.preventDefault(),si("Salvo manualmente")&&rn("Vers\xE3o salva no hist\xF3rico"),Ha())});function an(i){lt.file=i;let t=Wt();ce.value=t?t[i]:"",Z("tabSrc").classList.toggle("on",i==="src"),Z("tabDat").classList.toggle("on",i==="dat"),kn(),ce.scrollTop=0,Va()}Z("tabSrc").onclick=()=>an("src");Z("tabDat").onclick=()=>an("dat");function Fa(i,t=!0){i.file!==lt.file&&an(i.file);let e=ce.value.split(`
`),n=(i.line-1)*20;if((n<ce.scrollTop+20||n>ce.scrollTop+ce.clientHeight-60)&&(ce.scrollTop=Math.max(0,n-ce.clientHeight/3),Va()),t){let s=0;for(let r=0;r<i.line-1;r++)s+=e[r].length+1;ce.focus(),ce.setSelectionRange(s,s+(e[i.line-1]||"").length)}}var ii=i=>{let t=(i||"").match(/^\s*(?:GLOBAL\s+)?DEF\s+([A-Za-z_]\w*)/im);return t?t[1]:"programa"};function hr(){let i=Wt(),t=ii(i&&i.src);Z("tabSrc").textContent=t+".src",Z("tabDat").textContent=t+".dat"}function bn(i){if(lt.running)return rn("Pare a execu\xE7\xE3o antes de trocar de projeto");Ct.currentId=i;let t=Wt();t&&(Z("projName").value=t.name,lt.errLine=null,lt.curLine=null,lt.warnLines.clear(),an("src"),hr(),nc(t.scene),fr(!0),Mn(),lt.exTargets=t.exercise?(EXERCISES.find(e=>e.id===t.exercise)||{}).alvos||[]:[],Tv(),he())}Z("projName").onchange=()=>{let i=Wt();i&&(i.name=Z("projName").value.trim()||"Sem nome",he())};var xs=Z("view"),Sn=new Xs({antialias:!0});Sn.setPixelRatio(Math.min(2,devicePixelRatio));Sn.shadowMap.enabled=!0;Sn.shadowMap.type=Ll;Sn.toneMapping=Il;Sn.toneMappingExposure=1.05;xs.prepend(Sn.domElement);var Ga=new Ia;Ga.domElement.style.cssText="position:absolute;top:0;left:0;pointer-events:none";xs.appendChild(Ga.domElement);var mn=new fa,ys=new ze(38,1,.01,50),or=new Pa(ys,Sn.domElement);or.enableDamping=!0;or.dampingFactor=.12;mn.add(new Ma(14674175,1711394,1.1));var ws=new Js(16777215,2.2);ws.position.set(2.5,4,2);ws.castShadow=!0;ws.shadow.mapSize.set(2048,2048);Object.assign(ws.shadow.camera,{left:-2,right:2,top:2,bottom:-2,near:.5,far:10});ws.shadow.bias=-5e-4;mn.add(ws);var qu=new Js(10467583,.6);qu.position.set(-2,1.5,-2);mn.add(qu);var Da=null;function yv(i){let t=i!=="claro";mn.background=new Gt(t?921877:14673388),mn.fog=new da(t?921877:14673388,5,11),Da&&mn.remove(Da),Da=t?new tr(4,40,3818320,2304563):new tr(4,40,10135219,12831958),mn.add(Da),xs.style.background=t?"#0c0f13":"#dfe5ec"}var Kl=new Re(new Ws(12,12),new ba({opacity:.3}));Kl.rotation.x=-Math.PI/2;Kl.receiveShadow=!0;mn.add(Kl);var be=new me;be.rotation.x=-Math.PI/2;be.scale.setScalar(.001);mn.add(be);var Kt={orange:new Ce({color:15886864,roughness:.42,metalness:.15}),dark:new Ce({color:2830391,roughness:.6,metalness:.3}),black:new Ce({color:1382428,roughness:.7,metalness:.2}),steel:new Ce({color:11121597,roughness:.3,metalness:.8}),table:new Ce({color:5990002,roughness:.7,metalness:.2}),top:new Ce({color:9213859,roughness:.5,metalness:.3}),belt:new Ce({color:1909030,roughness:.9}),stripe:new Ce({color:2896184}),yellow:new Ce({color:15250464,roughness:.5}),wood:new Ce({color:11567952,roughness:.85}),machine:new Ce({color:7308695,roughness:.5,metalness:.3}),glass:new Ce({color:1780278,roughness:.15,metalness:.6}),part:new Ce({color:4163286,roughness:.35,metalness:.4}),hit:new Ce({color:16726843,emissive:6688784})};function Qt(i,t,e,n,s){let r=new Re(i,t);return r.castShadow=r.receiveShadow=!0,n&&r.position.set(...n),s&&r.rotation.set(...s),e.add(r),r}var Jl=(i,t,e=40)=>new yi(i,i,t,e).rotateX(Math.PI/2),Pi=(i,t,e=40)=>new yi(i,i,t,e),Wa=(i,t,e=40)=>new yi(i,i,t,e).rotateZ(Math.PI/2),_e=(i,t,e)=>new xi(i,t,e);function Ql(i,t,e,n){let s=new qs,r=i/2,a=e/2;n=Math.min(n,r,a),s.moveTo(-r+n,-a),s.lineTo(r-n,-a),s.quadraticCurveTo(r,-a,r,-a+n),s.lineTo(r,a-n),s.quadraticCurveTo(r,a,r-n,a),s.lineTo(-r+n,a),s.quadraticCurveTo(-r,a,-r,a-n),s.lineTo(-r,-a+n),s.quadraticCurveTo(-r,-a,-r+n,-a);let o=new ya(s,{depth:t,bevelEnabled:!0,bevelSize:6,bevelThickness:6,bevelSegments:3,curveSegments:8});return o.translate(0,0,-t/2),o.rotateX(Math.PI/2),o}function ur(i,t,e,n="lbl",s){let r=document.createElement("div");r.className=n,r.textContent=t,s&&(r.style.color=s);let a=new La(r);return a.position.set(...e),i.add(a),a}var Ge=RL.GEO;Qt(_e(300,300,16),Kt.dark,be,[0,0,8]);Qt(Jl(118,50),Kt.dark,be,[0,0,41]);var Li=new me;be.add(Li);Qt(Jl(104,150),Kt.orange,Li,[0,0,141]);Qt(Ql(200,190,230,40),Kt.orange,Li,[28,0,318]);Qt(Jl(46,120),Kt.dark,Li,[-95,0,270]);var zn=new me;zn.position.set(Ge.a1,0,Ge.d1);Li.add(zn);Qt(Pi(88,200),Kt.orange,zn);Qt(Pi(62,214),Kt.dark,zn);Qt(Ql(Ge.a2,82,112,30),Kt.orange,zn,[Ge.a2/2,0,0]);Qt(Pi(50,70),Kt.dark,zn,[0,-135,0]);var Hn=new me;Hn.position.set(Ge.a2,0,0);zn.add(Hn);Qt(Pi(74,172),Kt.orange,Hn);Qt(Pi(52,184),Kt.dark,Hn);Qt(Ql(220,150,125,30),Kt.orange,Hn,[18,0,40]);Qt(Wa(44,80),Kt.dark,Hn,[-125,0,58]);var ri=new me;ri.position.set(0,0,Ge.a3);Hn.add(ri);Qt(Wa(50,290),Kt.orange,ri,[250,0,0]);Qt(_e(80,16,92),Kt.orange,ri,[398,46,0]);Qt(_e(80,16,92),Kt.orange,ri,[398,-46,0]);var Ii=new me;Ii.position.set(Ge.d4,0,0);ri.add(Ii);Qt(Pi(44,76),Kt.orange,Ii);Qt(Pi(30,110),Kt.dark,Ii);var Ts=new me;Ii.add(Ts);Qt(Wa(38,52),Kt.orange,Ts,[32,0,0]);Qt(Wa(36,18),Kt.steel,Ts,[Ge.d6-9,0,0]);var Xa=new me;Xa.position.set(Ge.d6,0,0);Ts.add(Xa);var dr=new me;Xa.add(dr);Qt(_e(45,74,54),Kt.black,dr,[22.5,0,0]);var bv=Qt(_e(85,12,30),Kt.steel,dr,[87.5,51,0]),Sv=Qt(_e(85,12,30),Kt.steel,dr,[87.5,-51,0]),lr=new me;lr.matrixAutoUpdate=!1;Xa.add(lr);var tc=new er(70);tc.material.depthTest=!1;tc.renderOrder=5;lr.add(tc);var Ze={target:51,cur:51},Mv=[[Li,[0,0,230]],[zn,[0,-120,0]],[Hn,[0,-105,0]],[ri,[150,0,60]],[Ii,[0,-70,0]],[Ts,[50,0,50]]].map(([i,t],e)=>ur(i,"A"+(e+1),t));function ec(i,t,e){be.add(new Ea(new X(...i),new X(0,0,2),260,t,40,22)),ur(be,e,[i[0]*300,i[1]*300,i[2]*300+2],"lbl ax","#"+t.toString(16).padStart(6,"0"))}ec([1,0,0],16734810,"X");ec([0,1,0],4440954,"Y");ec([0,0,1],5941759,"Z");var ps=new me;be.add(ps);var ka={},ei=[],xn=null,Gl=!1;function Ev(i,t,e){let{x:n,y:s,w:r,d:a,h:o}=i,l=[];if(i.tipo==="mesa"){l.push(Qt(_e(r,a,20),Kt.top,e,[n,s,o-10]));for(let[c,h]of[[-1,-1],[1,-1],[-1,1],[1,1]])l.push(Qt(_e(24,24,o-20),Kt.table,e,[n+c*(r/2-20),s+h*(a/2-20),(o-20)/2]))}else if(i.tipo==="esteira"){l.push(Qt(_e(r,Math.max(10,a-40),o-30),Kt.table,e,[n,s,(o-30)/2])),l.push(Qt(_e(r,Math.max(10,a-70),20),Kt.belt,e,[n,s,o-10])),Qt(_e(r,18,34),Kt.yellow,e,[n,s-a/2+9,o-17]),Qt(_e(r,18,34),Kt.yellow,e,[n,s+a/2-9,o-17]);for(let c=n-r/2+30;c<n+r/2;c+=70)Qt(_e(6,Math.max(10,a-70),1),Kt.stripe,e,[c,s,o+.6])}else if(i.tipo==="palete"){let c=Math.max(3,Math.round(r/60));for(let h=0;h<c;h++)l.push(Qt(_e(Math.min(55,r/c-8),a,22),Kt.wood,e,[n-r/2+(h+.5)*r/c,s,o-11]));for(let h of[-1,0,1])for(let u of[-1,0,1])l.push(Qt(_e(70,70,o-22),Kt.wood,e,[n+h*(r/2-35),s+u*(a/2-35),(o-22)/2]))}else i.tipo==="maquina"?(l.push(Qt(_e(r,a,o),Kt.machine,e,[n,s,o/2])),Qt(_e(r*.6,6,o*.45),Kt.glass,e,[n,s-a/2-3,o*.55]),Qt(_e(r,a+4,16),Kt.yellow,e,[n,s,o-8])):l.push(Qt(_e(r,a,o),Kt.steel,e,[n,s,o/2]));ka[t]=l,ur(e,i.nome,[n,s+(i.tipo==="esteira"?-a/2-40:a/2+30),o+15],"lbl ob")}function Yu(i,t,e){let n=0;for(let s of Wt()?Wt().scene.objetos:[])Math.abs(i-s.x)<s.w/2&&Math.abs(t-s.y)<s.d/2&&(n=Math.max(n,s.h));for(let s of ei)if(s!==e&&s!==xn){let r=s.position;Math.abs(r.x-i)<48&&Math.abs(r.y-t)<48&&(n=Math.max(n,r.z+25))}return n}function nc(i){xn&&(xn=null),be.remove(ps),ps.traverse(e=>{e.element&&e.element.remove()}),ei.forEach(e=>{e.parent&&e.parent.remove(e)});for(let e in ka)delete ka[e];ps=new me,be.add(ps);let t=[];i.objetos.forEach((e,n)=>{let s="o"+n;Ev(e,s,ps),t.push({id:s,nome:e.nome,min:[e.x-e.w/2,e.y-e.d/2,0],max:[e.x+e.w/2,e.y+e.d/2,e.h]})}),RL.setObstacles(t),ei=[],i.pecas.forEach(([e,n])=>{let s=Qt(_e(50,50,50),Kt.part,be,[e,n,0]);s.position.z=Yu(e,n,s)+25,s.userData.home=s.position.toArray(),ei.push(s)})}function ic(i){let t=i.getWorldPosition(new X);return be.worldToLocal(t),{x:t.x,y:t.y,z:t.z}}var Zu=2e4,ju=new Float32Array(Zu*3),nr=0,ms=null,bs=new De;bs.setAttribute("position",new Ve(ju,3));bs.setDrawRange(0,0);var sc=new cs(bs,new Qn({color:16752704}));sc.frustumCulled=!1;be.add(sc);function wv(i){ms&&Math.hypot(i[0]-ms[0],i[1]-ms[1],i[2]-ms[2])<2||nr>=Zu||(ju.set(i,nr*3),nr++,bs.setDrawRange(0,nr),bs.attributes.position.needsUpdate=!0,ms=i)}function Ku(){nr=0,ms=null,bs.setDrawRange(0,0)}var $a=new Re(new hs(Ge.a2+Math.hypot(Ge.a3,Ge.d4)+Ge.d6+110,48,24),new Un({color:5941759,wireframe:!0,transparent:!0,opacity:.12}));$a.position.set(0,0,Ge.d1);$a.visible=!1;be.add($a);var _s=new me;be.add(_s);var Oa=new me;be.add(Oa);function Ju(i){i.children.slice().forEach(t=>{i.remove(t),t.traverse(e=>e.element&&e.element.remove())})}function Qu(i){Ju(_s);for(let t of i){let e=new Re(new hs(9,16,12),new Un({color:16763755}));e.position.set(...t.pos),_s.add(e);let n=new er(45);n.position.set(...t.pos),n.quaternion.copy(t.q),_s.add(n),ur(_s,t.name,[t.pos[0],t.pos[1],t.pos[2]+28],"lbl","#ffcb6b")}}function Tv(){Ju(Oa);for(let i of lt.exTargets){let t=new Re(new hs(14,20,14),new Un({color:4440954,transparent:!0,opacity:.75}));t.position.set(i.X,i.Y,i.Z),Oa.add(t),ur(Oa,"\u{1F3AF} "+i.nome,[i.X,i.Y,i.Z-34],"lbl","#43c37a")}}var td=i=>{let t=new ae;return t.set(...i),t};function rc(i){let t=[],e=RL.frameToMat(lt.base);for(let[n,s]of Object.entries(i)){if(!s||typeof s!="object"||n.startsWith("__")||n==="HOME"||n==="XHOME")continue;let r=null;["E6POS","POS","FRAME"].includes(s.__t)&&["X","Y","Z"].every(a=>typeof s[a]=="number")?r=RL.mul(e,RL.frameToMat(s)):["E6AXIS","AXIS"].includes(s.__t)&&["A1","A2","A3","A4","A5","A6"].every(a=>typeof s[a]=="number")&&(r=RL.mul(RL.fk(["A1","A2","A3","A4","A5","A6"].map(a=>s[a])).F6,RL.frameToMat(lt.tool))),r&&t.push({name:n,pos:[r[3],r[7],r[11]],q:new qe().setFromRotationMatrix(td(r)),raw:s})}return t}function ed(i){let t=RL.parse(i.src,i.dat);if(t.errors.length||!t.mod)return null;let e=new RL.Machine(t,Ov());for(let n of t.mod.dat)try{n.compat||e.declare(n,e.modScope)}catch{}return e.modScope}function Mn(){let i=Wt();if(!i)return;let t=ed(i);t&&Qu(rc(t))}function Av(){let i=lt.joints.map(t=>t*RL.D2R);Li.rotation.z=-i[0],zn.rotation.y=i[1],Hn.rotation.y=i[2],ri.rotation.x=i[3],Ii.rotation.y=i[4],Ts.rotation.x=i[5]}var qa=()=>RL.mul(RL.fk(lt.joints).F6,RL.frameToMat(lt.tool));function Ba(i){lt.tool={X:i.X||0,Y:i.Y||0,Z:i.Z||0,A:i.A||0,B:i.B||0,C:i.C||0},lr.matrix.copy(td(RL.frameToMat(lt.tool))),lr.matrixWorldNeedsUpdate=!0,Z("toolInfo").textContent=Math.abs(lt.tool.X-110)<1e-6&&!lt.tool.Y&&!lt.tool.Z?"garra (TCP X 110)":lt.tool.X||lt.tool.Y||lt.tool.Z?`TCP {X ${Ne(lt.tool.X)}, Y ${Ne(lt.tool.Y)}, Z ${Ne(lt.tool.Z)}}`:"flange ($NULLFRAME)"}var Wl=!0;function Ss(i,t){if(lt.joints=i.slice(),Av(),Wl=!0,t){let e=qa();wv([e[3],e[7],e[11]])}}var ac=[];RL.LIMITS.forEach(([i,t],e)=>{let n=document.createElement("div");n.className="axis",n.innerHTML=`<b>A${e+1}</b><input type="range" min="${i}" max="${t}" step="0.1"><input type="number" min="${i}" max="${t}" step="1">`;let[s,r]=n.querySelectorAll("input"),a=o=>{if(lt.running)return;o=Math.max(i,Math.min(t,+o||0));let l=lt.joints.slice();l[e]=o,Ss(l,!1),Pv()};s.oninput=()=>a(s.value),r.onchange=()=>a(r.value),Z("axes").appendChild(n),ac.push({r:n,sl:s,nu:r})});var Xl={},cr={};"XYZABC".split("").forEach(i=>{let t=document.createElement("div");t.innerHTML=`<span>${i}</span><b>0</b>`,Z("pose").appendChild(t),Xl[i]=t.querySelector("b")});"XYZABC".split("").forEach(i=>{let t=document.createElement("label");t.textContent=i,Z("gopos").appendChild(t)});"XYZABC".split("").forEach(i=>{let t=document.createElement("input");t.type="number",Z("gopos").appendChild(t),cr[i]=t});var Ya=()=>RL.matToFrame(RL.mul(RL.inv(RL.frameToMat(lt.base)),qa()));function Rv(){if(!Wl)return;Wl=!1,lt.joints.forEach((t,e)=>{let{r:n,sl:s,nu:r}=ac[e],[a,o]=RL.LIMITS[e];s.value=t,document.activeElement!==r&&(r.value=t.toFixed(1));let l=t<=a+.05||t>=o-.05;n.classList.toggle("lim",l),n.classList.toggle("near",!l&&(t<a+8||t>o-8))});let i=Ya();for(let t in Xl)Xl[t].textContent=Ne(i[t])}function Za(){let i=Ya();for(let t in cr)cr[t].value=+i[t].toFixed(1)}"XYZABC".split("").forEach(i=>["-","+"].forEach(t=>{let e=document.createElement("button");e.textContent=i+t,e.dataset.k=i+t,e.onclick=()=>Cv(i,t==="+"?1:-1),Z("jog").appendChild(e)}));function Cv(i,t){if(lt.running)return;let e=+Z("jogStep").value,n={1:1,10:5,50:15}[e],s={X:0,Y:0,Z:0,A:0,B:0,C:0};s[i]=t*("XYZ".includes(i)?e:n);let r=RL.mul(RL.inv(RL.frameToMat(lt.base)),qa()),a;if(Z("jogFrame").value==="TOOL")a=RL.mul(r,RL.frameToMat(s));else{let o=r.slice();o[3]=o[7]=o[11]=0,a=RL.mul(RL.frameToMat({A:s.A,B:s.B,C:s.C}),o),a[3]=r[3]+s.X,a[7]=r[7]+s.Y,a[11]=r[11]+s.Z}nd(a,!1)}function nd(i,t){let e=RL.ik(RL.mul(RL.frameToMat(lt.base),RL.mul(i,RL.inv(RL.frameToMat(lt.tool)))),lt.joints),n=Z("ikmsg");if(!e.ok){n.textContent="\u26A0 Posi\xE7\xE3o imposs\xEDvel: "+e.reason,n.style.color="var(--err)";return}n.textContent=e.singular?"Aten\xE7\xE3o: punho em singularidade (A5 \u2248 0\xB0) \u2014 A4 e A6 ficam amb\xEDguos.":"",n.style.color="var(--warn)";let s=RL.checkCollision(e.j,RL.frameToMat(lt.tool));if(s){n.textContent=`\u26A0 Bloqueado: ${s.part} colidiria com ${s.obstacle.nome}`,n.style.color="var(--err)",sd(s.obstacle.id);return}t?id(e.j):(Ss(e.j,!1),Za())}function id(i){let t=lt.joints.slice(),e=.6,n=0,s=performance.now(),r=a=>{n+=Math.max(0,(a-s)/1e3),s=a;let o=Math.min(1,n/e),l=o-Math.sin(2*Math.PI*o)/(2*Math.PI);Ss(t.map((c,h)=>c+(i[h]-c)*l),!1),o<1?requestAnimationFrame(r):Za()};requestAnimationFrame(r)}Z("bGo").onclick=()=>{if(lt.running)return;let i={};for(let t in cr)i[t]=+cr[t].value||0;nd(RL.frameToMat(i),!0)};Z("bHome").onclick=()=>{lt.running||id(RL.HOME)};function Pv(){let i=RL.checkCollision(lt.joints,RL.frameToMat(lt.tool));Z("ikmsg").textContent=i?`\u26A0 ${i.part} em colis\xE3o com ${i.obstacle.nome}`:"",Z("ikmsg").style.color="var(--err)"}for(let i=1;i<=8;i++){let t=document.createElement("button");t.textContent="IN "+i,t.onclick=()=>{lt.ins[i]=!lt.ins[i],t.classList.toggle("on",lt.ins[i]),ne("info",`$IN[${i}] = ${lt.ins[i]?"TRUE":"FALSE"} (operador)`)},Z("ins").appendChild(t);let e=document.createElement("div");e.className="lamp",e.innerHTML=`<i></i>${i}`,Z("outs").appendChild(e)}function Lv(i,t){lt.outs[i]=t,i<=8&&Z("outs").children[i-1].classList.toggle("on",t),i===1&&Iv(t)}function Iv(i){if(i!==Gl){if(Gl=i,i){let t=qa(),e=null,n=1e9;for(let s of ei){let r=ic(s),a=Math.hypot(t[3]-r.x,t[7]-r.y,t[11]-r.z);a<n&&(n=a,e=s)}e&&n<30&&Math.abs(lt.tool.X-110)<1?(dr.attach(e),xn=e,Ze.target=31,lt.events.push({t:"grip",ok:!0}),ne("ok","Garra fechada: pe\xE7a presa.")):(Ze.target=9,lt.events.push({t:"grip",ok:!1}),ne("info",e?`Garra fechada vazia (pe\xE7a mais pr\xF3xima a ${Math.round(n)} mm do TCP).`:"Garra fechada vazia."))}else if(Ze.target=51,xn){let t=xn;be.attach(t),xn=null;let e=Yu(t.position.x,t.position.y,t)+25,n=t.position.z-e;t.position.z=e,t.rotation.set(0,0,0);let s=(Wt().scene.objetos.find(r=>Math.abs(t.position.x-r.x)<r.w/2&&Math.abs(t.position.y-r.y)<r.d/2)||{nome:"o piso"}).nome;ne(n>15?"warn":"ok",n>15?`Pe\xE7a solta a ${Math.round(n)} mm de altura \u2014 caiu sobre ${s}.`:`Pe\xE7a depositada: ${s}.`)}}}function sd(i){let t=ka[i];t&&(t.forEach(e=>{e.userData.mat=e.userData.mat||e.material,e.material=Kt.hit}),setTimeout(()=>t.forEach(e=>e.material=e.userData.mat),1800))}function fr(i){if(!lt.running){Ss(RL.HOME,!1),xn&&(be.attach(xn),xn=null),ei.forEach(t=>{t.position.fromArray(t.userData.home),t.rotation.set(0,0,0)}),Gl=!1,Ze.target=51;for(let t=1;t<=64;t++)lt.outs[t]&&(lt.outs[t]=!1,t<=8&&Z("outs").children[t-1].classList.remove("on"));Ba(RL.DEFAULT_TOOL),lt.base={X:0,Y:0,Z:0,A:0,B:0,C:0},Ku(),lt.errLine=null,kn(),ti("idle"),Z("ikmsg").textContent="",Za(),i||ne("info","C\xE9lula reiniciada: rob\xF4 em HOME, pe\xE7as nas posi\xE7\xF5es iniciais.")}}var Dv=new X(.32,.36,.18),Nv={iso:[2,1.45,1.75],front:[2.6,.55,.18],side:[.32,.55,2.6],top:[.32,3.2,.19]};function rd(i){ys.position.set(...Nv[i]),or.target.copy(Dv),or.update(),document.querySelectorAll("[data-cam]").forEach(t=>t.classList.toggle("on",t.dataset.cam===i))}document.querySelectorAll("[data-cam]").forEach(i=>i.onclick=()=>rd(i.dataset.cam));var ja=(i,t)=>{let e=Z(i);e.onclick=()=>{e.classList.toggle("on"),t(e.classList.contains("on"))}};ja("tTrail",i=>sc.visible=i);ja("tPts",i=>_s.visible=i);ja("tAxes",i=>Mv.forEach(t=>t.visible=i));ja("tReach",i=>$a.visible=i);Z("tClear").onclick=Ku;Z("tFull").onclick=()=>{document.body.classList.toggle("full"),oc()};function oc(){let i=xs.clientWidth,t=xs.clientHeight;!i||!t||(Sn.setSize(i,t),Ga.setSize(i,t),ys.aspect=i/t,ys.updateProjectionMatrix())}new ResizeObserver(oc).observe(xs);Sn.setAnimationLoop(()=>{or.update(),Math.abs(Ze.cur-Ze.target)>.1&&(Ze.cur+=Math.sign(Ze.target-Ze.cur)*Math.min(Math.abs(Ze.target-Ze.cur),3),bv.position.y=Ze.cur,Sv.position.y=-Ze.cur),Rv(),Sn.render(mn,ys),Ga.render(mn,ys)});function Ov(){return{log(){},line(){},status(){},getJoints:()=>lt.joints,getIn:i=>!!lt.ins[i],output(){},getOverride:()=>lt.pov,setOverride(){},animate:async()=>{}}}function ti(i){let t=Z("status");t.className="chip "+i,t.textContent={running:"EXECUTANDO",paused:"PAUSADO",idle:"PARADO",error:"ERRO",waiting:"AGUARDANDO E/S"}[i]||i;let e=lt.running;Z("bRun").disabled=e&&i!=="paused",Z("bRun").textContent=i==="paused"?"\u25B6 Continuar":"\u25B6 Executar",Z("bPause").disabled=!(e&&(i==="running"||i==="waiting")),Z("bStop").disabled=!e,["bCheck","bReset","bTeach","bGo","bHome","examples","bAnalyze","bSceneApply","bBlkGen"].forEach(n=>Z(n)&&(Z(n).disabled=e)),document.querySelectorAll("#jog button,.exrun").forEach(n=>n.disabled=e),ac.forEach(n=>{n.sl.disabled=e,n.nu.disabled=e}),ce.readOnly=e}function lc(i){let t=Wt();if(!t)return null;lt.warnLines.clear(),lt.errLine=null;let e=RL.parse(t.src,t.dat);return e.warnings.forEach(n=>lt.warnLines.add(n.loc.file+n.loc.line)),e.errors.length?(e.errors.forEach(n=>ne("err",n.msg,n.loc)),lt.errLine=e.errors[0].loc,lt.pane!=="prog"&&sn("prog"),Fa(e.errors[0].loc,!1),kn(),ne("err",`Verifica\xE7\xE3o: ${e.errors.length} erro(s). Corrija antes de executar.`),ti("error"),null):(i&&(e.warnings.forEach(n=>ne("warn",n.msg,n.loc)),ne("ok",`Verifica\xE7\xE3o OK: ${Object.keys(e.mod.defs).length} subprograma(s), ${e.mod.dat.length} declara\xE7\xE3o(\xF5es) no .dat${e.warnings.length?`, ${e.warnings.length} aviso(s)`:""}.`)),kn(),Mn(),e)}async function Ci(i){if(lt.running)return lt.machine&&(i?lt.machine.step():lt.machine.resume()),null;let t=lc(!1);if(!t)return"error";si("Antes de executar");let e=new Set;t.warnings.forEach(r=>{e.has(r.msg)||(e.add(r.msg),ne("warn",r.msg,r.loc))}),Ba(RL.DEFAULT_TOOL),lt.base={X:0,Y:0,Z:0,A:0,B:0,C:0},lt.events=[];let n=new RL.Machine(t,{log:(r,a,o)=>ne(r,a,o),line:(r,a)=>{lt.curLine=r,lt.pane==="prog"&&(r.file!==lt.file&&an(r.file),kn(),Fa(r,!1));let o=Z("nowcmd");o.style.display="block",o.textContent=`\u25B6 ${a}   (linha ${r.line})`},status:r=>{r!=="idle"&&ti(r)},getJoints:()=>lt.joints,getIn:r=>!!lt.ins[r],output:(r,a)=>Lv(r,a),getOverride:()=>lt.pov,setOverride:r=>{lt.pov=r,Z("pov").value=r,Z("povv").textContent=r+"%"},frames:(r,a)=>{lt.base={...r},Ba(a),Mn()},points:r=>Qu(rc(r)),errorLine:r=>{lt.errLine=r,lt.curLine=null,lt.pane==="prog"&&(kn(),Fa(r,!1))},collision:r=>{sd(r),lt.events.push({t:"collision"})},moved:(r,a,o)=>lt.events.push({t:"move",label:r||"",pos:a,joints:lt.joints.slice(),cut:o}),waitEvent:r=>lt.events.push({t:"wait",text:r}),waiting:r=>{Z("ins").classList.toggle("waitio",r),ti(r?"waiting":"running")},animate:r=>new Promise(a=>{let o=r.keys,l=o.length,c=0,h=performance.now(),u=p=>{let d=Math.max(0,Math.min(.1,(p-h)/1e3));if(h=p,n.state==="stopping")return a();n.state!=="paused"&&(c+=d*lt.pov/100);let g=Math.min(1,c/r.duration),m=Math.max(0,g-Math.sin(2*Math.PI*g)/(2*Math.PI))*(l-1),f=Math.max(0,Math.min(l-2,Math.floor(m))),M=m-f;if(Ss(o[f].map((x,T)=>x+(o[f+1][T]-x)*M),!0),g>=1)return Ss(o[l-1],!0),a();requestAnimationFrame(u)};requestAnimationFrame(u)})});lt.machine=n,lt.running=!0,n.startStepping=i,lt.curLine=null,lt.errLine=null,ne("run",`Executando ${t.mod.defs[t.mod.order[0]].display}()${i?" \u2014 passo a passo":""}`),ti("running");let s=await n.run();return lt.running=!1,lt.machine=null,lt.curLine=null,Z("nowcmd").style.display="none",Z("ins").classList.remove("waitio"),ti(s==="error"?"error":"idle"),kn(),Za(),s}Z("bRun").onclick=()=>Ci(!1);Z("bStep").onclick=()=>Ci(!0);Z("bPause").onclick=()=>{lt.machine&&(lt.machine.pause(),ti("paused"))};Z("bStop").onclick=()=>{lt.machine&&lt.machine.stop()};Z("bCheck").onclick=()=>lc(!0);Z("bReset").onclick=()=>fr(!1);Z("pov").oninput=i=>{lt.pov=+i.target.value,Z("povv").textContent=lt.pov+"%"};Z("bClear").onclick=()=>Z("log").innerHTML="";Z("bHelp").onclick=()=>Z("mHelp").classList.add("on");Z("examples").innerHTML='<option value="">Exemplos\u2026</option>'+EXAMPLES.map(i=>`<option value="${i.id}">${Bt(i.title)}</option>`).join("");Z("examples").onchange=()=>{let i=EXAMPLES.find(t=>t.id===Z("examples").value);Z("examples").value="",i&&cc(i)};function cc(i){let t=Es({name:"Exemplo: "+i.title,cat:i.cat,src:i.src,dat:i.dat,scene:SCENES[i.scene||"pick"]});bn(t.id),sn("prog"),ne("info",`Projeto criado a partir do exemplo "${i.title}".`)}Z("bTeach").onclick=()=>{if(lt.running)return;let i=Wt(),t=ad(),e=lt.file==="src"?ce.selectionStart:i.src.length,n=i.src.split(`
`),s=0,r=0;for(;r<n.length&&(s+=n[r].length+1,!(s>e));r++);/^\s*END\s*$/i.test(n[r]||"")&&(r=Math.max(0,r-1)),n.splice(r+1,0,`  PTP ${t}`),i.src=n.join(`
`),an("src"),he(),Mn(),ne("ok",`Ponto ${t} gravado no .dat e "PTP ${t}" inserido no .src (linha ${r+2}).`,{file:"src",line:r+2})};function ad(){let i=Wt(),t=Ya(),e=1,n=(i.src+`
`+i.dat).toUpperCase();for(;new RegExp(`\\bP${e}\\b`).test(n);)e++;let s="P"+e,r=`  DECL E6POS ${s} = {X ${Ne(t.X)}, Y ${Ne(t.Y)}, Z ${Ne(t.Z)}, A ${Ne(t.A)}, B ${Ne(t.B)}, C ${Ne(t.C)}}`;return/^\s*ENDDAT/im.test(i.dat)?i.dat=i.dat.replace(/^(\s*ENDDAT)/im,r+`
$1`):i.dat+=`
`+r,s}var $l={home:{g:"mov",t:"Ir para HOME",krl:()=>"PTP HOME"},ptp:{g:"mov",t:"Mover at\xE9 (PTP)",f:[["ponto","pt"]],krl:i=>`PTP ${i.ponto}`},lin:{g:"mov",t:"Mover em linha reta at\xE9 (LIN)",f:[["ponto","pt"]],krl:i=>`LIN ${i.ponto}`},rel:{g:"mov",t:"Deslocar em linha reta",f:[["eixo","sel",["X","Y","Z"]],["mm","num","mm"]],krl:i=>`LIN_REL {${i.eixo} ${i.mm}}`},vel:{g:"mov",t:"Velocidade linear",f:[["v","num","m/s"]],krl:i=>`$VEL.CP = ${i.v}`},velax:{g:"mov",t:"Velocidade dos eixos",f:[["v","num","%"]],krl:i=>`BAS(#PTP_PARAMS, ${i.v})`},abrir:{g:"io",t:"Abrir garra",krl:()=>"$OUT[1] = FALSE"},fechar:{g:"io",t:"Fechar garra",krl:()=>"$OUT[1] = TRUE"},saida:{g:"io",t:"Sa\xEDda",f:[["n","num","n\xBA"],["v","sel",["TRUE","FALSE"]]],krl:i=>`$OUT[${i.n}] = ${i.v}`},espera_in:{g:"io",t:"Esperar entrada ligar",f:[["n","num","n\xBA"]],krl:i=>`WAIT FOR $IN[${i.n}]`},tempo:{g:"tm",t:"Aguardar",f:[["s","num","s"]],krl:i=>`WAIT SEC ${i.s}`},repetir:{g:"fl",t:"Repetir",f:[["n","num","vezes"]],open:!0},fim_rep:{g:"fl",t:"Fim do repetir",close:"repetir"},se:{g:"fl",t:"Se a entrada estiver ligada",f:[["n","num","n\xBA"]],open:!0},senao:{g:"fl",t:"Sen\xE3o",mid:!0},fim_se:{g:"fl",t:"Fim do se",close:"se"},coment:{g:"tm",t:"Coment\xE1rio",f:[["txt","text"]],krl:i=>`; ${i.txt||""}`},raw:{g:"raw",t:"KRL",f:[["code","text"]],krl:i=>i.code||""}},Uv=[["home","mov"],["ptp","mov"],["lin","mov"],["rel","mov"],["vel","mov"],["velax","mov"],["abrir","io"],["fechar","io"],["saida","io"],["espera_in","io"],["tempo","tm"],["repetir","fl"],["se","fl"],["coment","tm"],["raw","tm"]],Fv={home:"HOME",ptp:"PTP",lin:"LIN",rel:"Deslocar",vel:"Vel. linear",velax:"Vel. eixos",abrir:"Abrir garra",fechar:"Fechar garra",saida:"Sa\xEDda",espera_in:"Esperar entrada",tempo:"Aguardar",repetir:"Repetir",se:"Se entrada",coment:"Coment\xE1rio",raw:"KRL livre"};Z("palette").innerHTML=Uv.map(([i,t])=>`<button data-b="${i}" data-g="${t}">+ ${Fv[i]}</button>`).join("");Z("palette").onclick=i=>{let t=i.target.dataset&&i.target.dataset.b;if(!t)return;let e=Wt();e.blocks||(e.blocks=[]);let n=od(e),s={home:{},ptp:{ponto:n[0]||"HOME"},lin:{ponto:n[0]||"HOME"},rel:{eixo:"Z",mm:100},vel:{v:.3},velax:{v:100},saida:{n:2,v:"TRUE"},espera_in:{n:1},tempo:{s:.5},repetir:{n:3},se:{n:1},coment:{txt:""},raw:{code:""}}[t]||{},r=[{k:t,...s}];t==="repetir"&&r.push({k:"fim_rep"}),t==="se"&&r.push({k:"fim_se"}),e.blocks.push(...r),Ai()};function od(i){let t=["HOME"],e=/^\s*DECL\s+(?:GLOBAL\s+)?(E6POS|POS|E6AXIS|AXIS|FRAME)\s+([A-Za-z_]\w*)/gim,n;for(;n=e.exec(i.dat);)t.push(n[2]);return t}function hc(i,t,e){let n=[],s=[],r=1,a=0,o=[],l=()=>"  ".repeat(r);for(let c of i){let h=$l[c.k];if(h){if(c.k==="repetir"){a++,s.push(`  DECL INT rep${a}`),n.push(`${l()}FOR rep${a} = 1 TO ${Math.max(1,Math.round(+c.n||1))}`),o.push("ENDFOR"),r++;continue}if(c.k==="se"){n.push(`${l()}IF $IN[${c.n}] THEN`),o.push("ENDIF"),r++;continue}if(c.k==="senao"){n.push(`${"  ".repeat(Math.max(1,r-1))}ELSE`);continue}if(c.k==="fim_rep"||c.k==="fim_se"){r=Math.max(1,r-1),n.push(`${l()}${o.pop()||(c.k==="fim_rep"?"ENDFOR":"ENDIF")}`);continue}n.push(l()+h.krl(c))}}for(;o.length;)r--,n.push("  ".repeat(Math.max(1,r))+o.pop());return[`DEF ${t}()`,...s,"  INI",...n,"END"].join(`
`)+(e?`
`+e:"")}function uc(i){let t=i.split(`
`),e=t.findIndex(s=>/^\s*(GLOBAL\s+)?DEF\s+/i.test(s));if(e<0)return null;let n=e+1;for(;n<t.length&&!/^\s*END\s*(;.*)?$/i.test(t[n]);)n++;return{body:t.slice(e+1,n),rest:t.slice(n+1).join(`
`).replace(/^\n+/,"")}}function dc(i){let t=uc(i);if(!t)return[];let e=[];for(let n of t.body){let s=n.trim();if(!s)continue;let r;if(/^;/.test(s)){e.push({k:"coment",txt:s.replace(/^;\s?/,"")});continue}let a=s.indexOf(";"),o=(a>0&&!s.slice(0,a).includes('"')?s.slice(0,a):s).trim(),l=a>0&&o!==s?s.slice(a+1).trim():"";if(/^DECL\s+INT\s+rep\d+$/i.test(o)||/^INI$/i.test(o))continue;let c=e.length;/^PTP\s+X?HOME$/i.test(o)?e.push({k:"home"}):(r=o.match(/^PTP\s+([A-Za-z_]\w*)$/i))?e.push({k:"ptp",ponto:r[1]}):(r=o.match(/^LIN\s+([A-Za-z_]\w*)$/i))?e.push({k:"lin",ponto:r[1]}):(r=o.match(/^LIN_REL\s*\{\s*([XYZ])\s+(-?[\d.]+)\s*\}$/i))?e.push({k:"rel",eixo:r[1].toUpperCase(),mm:+r[2]}):(r=o.match(/^\$VEL\.CP\s*=\s*([\d.]+)$/i))?e.push({k:"vel",v:+r[1]}):(r=o.match(/^BAS\s*\(\s*#PTP_PARAMS\s*,\s*([\d.]+)\s*\)$/i))?e.push({k:"velax",v:+r[1]}):/^\$OUT\[\s*1\s*\]\s*=\s*FALSE$/i.test(o)?e.push({k:"abrir"}):/^\$OUT\[\s*1\s*\]\s*=\s*TRUE$/i.test(o)?e.push({k:"fechar"}):(r=o.match(/^\$OUT\[\s*(\d+)\s*\]\s*=\s*(TRUE|FALSE)$/i))?e.push({k:"saida",n:+r[1],v:r[2].toUpperCase()}):(r=o.match(/^WAIT\s+FOR\s+\$IN\[\s*(\d+)\s*\]$/i))?e.push({k:"espera_in",n:+r[1]}):(r=o.match(/^WAIT\s+SEC\s+([\d.]+)$/i))?e.push({k:"tempo",s:+r[1]}):(r=o.match(/^FOR\s+rep\d+\s*=\s*1\s+TO\s+(\d+)$/i))?e.push({k:"repetir",n:+r[1]}):/^ENDFOR$/i.test(o)&&e.some(h=>h.k==="repetir")?e.push({k:"fim_rep"}):(r=o.match(/^IF\s+\$IN\[\s*(\d+)\s*\]\s+THEN$/i))?e.push({k:"se",n:+r[1]}):/^ELSE$/i.test(o)?e.push({k:"senao"}):/^ENDIF$/i.test(o)?e.push({k:"fim_se"}):e.push({k:"raw",code:s}),l&&e.length>c&&e[e.length-1].k!=="raw"&&e.push({k:"coment",txt:l})}return e}var ql=!1,Vu;function Ai(){let i=Wt();Ka(),ql||(si("Antes de editar por blocos"),ql=!0),clearTimeout(Vu),Vu=setTimeout(()=>{let t=uc(i.src);i.src=hc(i.blocks,ii(i.src),t?t.rest:""),i.blkSrc=i.src,lt.file==="src"&&an("src"),hr(),he()},250)}function kv(){let i=Wt();i&&(ql=!1,(!i.blocks||i.blkSrc!==void 0&&i.blkSrc!==i.src)&&(!i.blocks||i.blocks.length===0)&&(i.blocks=dc(i.src),i.blkSrc=i.src),Ka())}function Ka(){let i=Wt(),t=Z("blocks"),e=od(i),n=0,s="";i.blkSrc!==void 0&&i.blkSrc!==i.src&&(s+='<div class="note" style="color:var(--warn)">O programa foi editado como texto depois da \xFAltima gera\xE7\xE3o. Clique em "Ler do KRL" para atualizar os blocos.</div>'),i.blocks.length||(s+='<p class="note">Nenhum bloco. Use a paleta acima para montar o programa.</p>'),i.blocks.forEach((r,a)=>{let o=$l[r.k]||$l.raw;(o.close||o.mid)&&(n=Math.max(0,n-1));let l=(o.f||[]).map(([c,h,u])=>h==="pt"?`<select data-i="${a}" data-n="${c}">${[...new Set([...e,r[c]])].map(p=>`<option ${p===r[c]?"selected":""}>${Bt(p)}</option>`).join("")}</select><button class="sm" data-teach="${a}" title="Gravar a pose atual como novo ponto">\u2295</button>`:h==="sel"?`<select data-i="${a}" data-n="${c}">${u.map(p=>`<option ${p===r[c]?"selected":""}>${p}</option>`).join("")}</select>`:h==="num"?`<input type="number" step="any" data-i="${a}" data-n="${c}" value="${Bt(r[c])}"><span class="note" style="margin:0">${u||""}</span>`:`<input type="text" style="flex:1;min-width:120px" data-i="${a}" data-n="${c}" value="${Bt(r[c]||"")}">`).join("");s+=`<div class="blk ${o.g}" draggable="true" data-idx="${a}" style="margin-left:${n*18}px"><span class="h">\u283F</span><b>${Bt(o.t)}</b>${l}<span class="x"><button data-up="${a}">\u2191</button><button data-dn="${a}">\u2193</button><button data-del="${a}" class="danger">\u2715</button></span></div>`,(o.open||o.mid)&&n++}),t.innerHTML=s}Z("blocks").addEventListener("change",i=>{let t=i.target;if(t.dataset.i===void 0)return;let e=Wt(),n=e.blocks[+t.dataset.i];n[t.dataset.n]=t.type==="number"?+t.value:t.value,Ai()});Z("blocks").addEventListener("click",i=>{let t=i.target,e=Wt();if(!t.dataset)return;let n=e.blocks;if(t.dataset.del!==void 0){let s=+t.dataset.del,r=n[s].k;if(n.splice(s,1),r==="repetir"||r==="se"){let a=0;for(let o=s;o<n.length;o++){let l=n[o].k;if(l===r&&a++,l===(r==="se"?"fim_se":"fim_rep")){if(a===0){n.splice(o,1);break}a--}}}Ai()}if(t.dataset.up!==void 0){let s=+t.dataset.up;s>0&&([n[s-1],n[s]]=[n[s],n[s-1]],Ai())}if(t.dataset.dn!==void 0){let s=+t.dataset.dn;s<n.length-1&&([n[s+1],n[s]]=[n[s],n[s+1]],Ai())}if(t.dataset.teach!==void 0){if(lt.running)return;let s=ad();n[+t.dataset.teach].ponto=s,Mn(),ne("ok",`Ponto ${s} gravado com a pose atual.`),Ai()}});var vs=null;Z("blocks").addEventListener("dragstart",i=>{let t=i.target.closest(".blk");t&&(vs=+t.dataset.idx,t.classList.add("drag"),i.dataTransfer.effectAllowed="move")});Z("blocks").addEventListener("dragover",i=>{let t=i.target.closest(".blk");t&&(i.preventDefault(),document.querySelectorAll(".blk.over").forEach(e=>e.classList.remove("over")),t.classList.add("over"))});Z("blocks").addEventListener("drop",i=>{let t=i.target.closest(".blk");if(!t||vs===null)return;i.preventDefault();let e=+t.dataset.idx,n=Wt().blocks,[s]=n.splice(vs,1);n.splice(e>vs?e-1:e,0,s),vs=null,Ai()});Z("blocks").addEventListener("dragend",()=>{vs=null,document.querySelectorAll(".blk.drag,.blk.over").forEach(i=>i.classList.remove("drag","over"))});Z("bBlkRead").onclick=()=>{let i=Wt();i.blocks=dc(i.src),i.blkSrc=i.src,Ka(),he(),rn(`${i.blocks.length} blocos lidos do programa`)};Z("bBlkGen").onclick=()=>{let i=Wt();si("Antes de gerar pelos blocos");let t=uc(i.src);i.src=hc(i.blocks,ii(i.src),t?t.rest:""),i.blkSrc=i.src,an("src"),he(),Ka(),rn("Programa .src gerado a partir dos blocos")};Z("projCatF").innerHTML+=Xu.map(i=>`<option>${i}</option>`).join("");Z("projSearch").oninput=nn;Z("projCatF").onchange=nn;function nn(){let i=Z("projSearch").value.toLowerCase(),t=Z("projCatF").value,e=Ct.projects.filter(s=>(!t||s.cat===t)&&(!i||s.name.toLowerCase().includes(i)));Z("projList").innerHTML=e.map(s=>`<div class="item ${s.id===Ct.currentId?"on":""}" data-open="${s.id}"><b>${Bt(s.name)}</b><div class="meta">${Bt(s.cat)} \xB7 ${s.versions.length} vers\xF5es \xB7 alterado ${ni(s.updated)}${s.original?" \xB7 importado":""}</div></div>`).join("")||'<p class="note">Nenhum projeto encontrado.</p>';let n=Wt();if(!n){Z("projDetail").innerHTML="";return}Z("projDetail").innerHTML=`<h3>Projeto aberto</h3>
    <div class="row"><input type="text" id="pdName" value="${Bt(n.name)}" style="flex:1"></div>
    <div class="row"><label>Categoria</label><select id="pdCat" style="flex:1">${Xu.map(s=>`<option ${s===n.cat?"selected":""}>${s}</option>`).join("")}</select></div>
    <div class="row"><button id="pdVer">Salvar vers\xE3o\u2026</button><button id="pdDup">Duplicar</button><button id="pdDel" class="danger">Excluir</button></div>
    <h3>Hist\xF3rico de vers\xF5es</h3>
    ${n.versions.slice().reverse().map((s,r)=>`<div class="item" style="cursor:default"><b>${Bt(s.note)}</b><div class="meta">${ni(s.date)} \xB7 ${s.src.split(`
`).length} linhas</div>
      <div class="row" style="margin-bottom:0"><button class="sm" data-vcmp="${s.id}">Comparar com o atual</button><button class="sm" data-vres="${s.id}">Restaurar</button></div></div>`).join("")}`,Z("pdName").onchange=()=>{n.name=Z("pdName").value.trim()||"Sem nome",Z("projName").value=n.name,he(),nn()},Z("pdCat").onchange=()=>{n.cat=Z("pdCat").value,he(),nn()},Z("pdVer").onclick=async()=>{let s=await ld("Salvar vers\xE3o","Descreva a altera\xE7\xE3o (ex.: ajustei a altura da pega):");s!==null&&(si(s||"Vers\xE3o manual",!0),nn(),rn("Vers\xE3o salva"))},Z("pdDup").onclick=()=>{let s=Ms(n);s.id=ar(),s.name=n.name+" (c\xF3pia)",s.created=s.updated=yn(),Ct.projects.unshift(s),bn(s.id),nn()},Z("pdDel").onclick=async()=>{lt.running||!await Ri("Excluir projeto",`Excluir <b>${Bt(n.name)}</b> e todo o seu hist\xF3rico? Se quiser guardar, fa\xE7a antes um backup deste projeto.`,[{label:"Cancelar",value:!1},{label:"Excluir",value:!0,danger:!0}])||(Ct.projects=Ct.projects.filter(r=>r!==n),Ct.projects.length||Es({name:"Meu primeiro programa",...Bv()}),bn(Ct.projects[0].id),nn())}}Z("projList").onclick=i=>{let t=i.target.closest("[data-open]");t&&(bn(t.dataset.open),nn())};Z("projDetail").onclick=async i=>{let t=Wt(),e=i.target;if(e.dataset.vcmp){let n=t.versions.find(s=>s.id===e.dataset.vcmp);cd(`Vers\xE3o "${n.note}" (${ni(n.date)}) \u2192 atual`,n,t)}if(e.dataset.vres){if(lt.running)return;let n=t.versions.find(r=>r.id===e.dataset.vres);if(!await Ri("Restaurar vers\xE3o",`Substituir o programa atual pela vers\xE3o <b>${Bt(n.note)}</b> de ${ni(n.date)}? O estado atual ser\xE1 guardado no hist\xF3rico antes.`,[{label:"Cancelar",value:!1},{label:"Restaurar",value:!0,pri:!0}]))return;si("Antes de restaurar vers\xE3o",!1),t.src=n.src,t.dat=n.dat,an("src"),hr(),Mn(),he(),nn(),rn("Vers\xE3o restaurada")}};function ld(i,t,e=""){return new Promise(n=>{Z("askTitle").textContent=i,Z("askBody").innerHTML=`<p>${t}</p><input type="text" id="askIn" style="width:100%" value="${Bt(e)}">`;let s=Z("askFoot");s.innerHTML="";let r=document.createElement("button");r.textContent="Cancelar",r.onclick=()=>{Z("mAsk").classList.remove("on"),n(null)};let a=document.createElement("button");a.textContent="OK",a.className="pri",a.onclick=()=>{Z("mAsk").classList.remove("on"),n(Z("askIn").value.trim())},s.append(r,a),Z("mAsk").classList.add("on"),setTimeout(()=>{Z("askIn").focus(),Z("askIn").onkeydown=o=>{o.key==="Enter"&&a.click()}},30)})}var Bv=()=>({src:`DEF novo()
  INI
  PTP HOME

  PTP HOME
END`,dat:`DEFDAT novo

ENDDAT`});Z("bProjNew").onclick=async()=>{let i=await ld("Novo projeto","Nome do projeto:","Novo programa");if(i===null)return;let t=(i||"novo").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9_]+/g,"_").replace(/^(\d)/,"_$1").toLowerCase().slice(0,24)||"novo",e=Es({name:i||"Novo programa",src:`DEF ${t}()
  INI
  PTP HOME

  PTP HOME
END`,dat:`DEFDAT ${t}

ENDDAT`,scene:SCENES.pick});bn(e.id),nn()};function zv(i,t){let e=i.split(`
`),n=t.split(`
`),s=e.length,r=n.length;if(s*r>4e6)return[{t:"h",s:"Arquivos grandes demais para comparar linha a linha."}];let a=Array.from({length:s+1},()=>new Uint32Array(r+1));for(let h=s-1;h>=0;h--)for(let u=r-1;u>=0;u--)a[h][u]=e[h]===n[u]?a[h+1][u+1]+1:Math.max(a[h+1][u],a[h][u+1]);let o=[],l=0,c=0;for(;l<s&&c<r;)e[l]===n[c]?(o.push({t:"=",s:e[l]}),l++,c++):a[l+1][c]>=a[l][c+1]?o.push({t:"r",s:e[l++]}):o.push({t:"a",s:n[c++]});for(;l<s;)o.push({t:"r",s:e[l++]});for(;c<r;)o.push({t:"a",s:n[c++]});return o}function Gu(i,t){let e=zv(i,t);if(!e.filter(o=>o.t==="a"||o.t==="r").length)return'<p class="note">Sem diferen\xE7as.</p>';let s=e.map((o,l)=>o.t!=="="||e.slice(Math.max(0,l-2),l+3).some(c=>c.t!=="=")),r="",a=!1;return e.forEach((o,l)=>{if(!s[l]){a||(r+='<div class="h">  \u22EF</div>'),a=!0;return}a=!1,r+=`<div class="${o.t==="a"?"a":o.t==="r"?"r":""}">${o.t==="a"?"+ ":o.t==="r"?"- ":"  "}${Bt(o.s)}</div>`}),`<p class="note">${e.filter(o=>o.t==="r").length} linha(s) removida(s), ${e.filter(o=>o.t==="a").length} adicionada(s).</p><div class="diff">${r}</div>`}function cd(i,t,e){Z("diffTitle").textContent=i,Z("diffBody").innerHTML=`<h3>Programa (.src)</h3>${Gu(t.src,e.src)}<h3>Dados (.dat)</h3>${Gu(t.dat,e.dat)}`,Z("mDiff").classList.add("on")}async function hd(i){let t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(i));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,"0")).join("")}var ud=i=>i.normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^\w.-]+/g,"_").slice(0,60);async function dd(i,t){let e=new Zl.default,n=JSON.stringify({projects:i,progress:t==="completo"?Ct.progress:void 0},null,1);e.file("biblioteca.json",n),e.file("manifesto.json",JSON.stringify({app:"Korum",versao:jl,tipo:t,data:yn(),projetos:i.length,sha256:await hd(n)},null,1));for(let s of i){let r=ii(s.src),a=e.folder("programas/"+ud(s.name));a.file(r+".src",s.src),a.file(r+".dat",s.dat)}return e.generateAsync({type:"uint8array",compression:"DEFLATE"})}var fd=()=>{let i=new Date;return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}_${String(i.getHours()).padStart(2,"0")}${String(i.getMinutes()).padStart(2,"0")}`};Z("bBackupAll").onclick=async()=>{let i=await dd(Ct.projects,"completo"),t=await Bn.saveFile(`korum-backup-${fd()}.zip`,i);t&&t.saved&&(Ct.settings.lastBackup=yn(),he(),rn("Backup salvo"),ne("ok",`Backup completo salvo: ${t.path} (${Ct.projects.length} projetos).`),fc())};Z("bBackupProj").onclick=async()=>{let i=Wt(),t=await dd([i],"projeto"),e=await Bn.saveFile(`korum-${ud(i.name)}-${fd()}.zip`,t);e&&e.saved&&(rn("Projeto exportado"),ne("ok",`Projeto salvo em ${e.path}.`))};Z("bExportKrl").onclick=async()=>{let i=Wt(),t=ii(i.src),e=await Bn.saveFile(t+".src",i.src);if(e&&e.saved){let n=await Bn.saveFile(t+".dat",i.dat);n&&n.saved&&ne("ok",`Arquivos ${t}.src e ${t}.dat exportados.`)}};Z("bRestore").onclick=()=>Z("fileZip").click();Z("fileZip").onchange=async i=>{let t=i.target.files[0];if(i.target.value="",!!t)try{let e,n=null;if(/\.json$/i.test(t.name)){let a=JSON.parse(await t.text());e=a.projects?a:{projects:[]}}else{let a=await Zl.default.loadAsync(await t.arrayBuffer()),o=a.file("biblioteca.json"),l=a.file("manifesto.json");if(!o)throw new Error("o arquivo n\xE3o \xE9 um backup do Korum (falta biblioteca.json)");let c=await o.async("string");if(l&&(n=JSON.parse(await l.async("string")),n.sha256&&n.sha256!==await hd(c)))throw new Error("verifica\xE7\xE3o de integridade falhou: o backup est\xE1 corrompido ou foi alterado");e=JSON.parse(c)}if(!Array.isArray(e.projects)||!e.projects.length)throw new Error("nenhum projeto no backup");let s=n?`Backup de ${ni(n.data)} \xB7 ${n.projetos} projeto(s) \xB7 integridade verificada \u2713`:`${e.projects.length} projeto(s)`,r=await Ri("Restaurar backup",`<p>${s}</p><p><b>Adicionar</b> coloca os projetos do backup junto aos atuais (c\xF3pias, sem apagar nada).<br><b>Substituir</b> apaga a biblioteca atual e deixa s\xF3 o conte\xFAdo do backup.</p>`,[{label:"Cancelar",value:null},{label:"Substituir tudo",value:"sub",danger:!0},{label:"Adicionar",value:"add",pri:!0}]);if(!r)return;if(r==="sub"){if(!await Ri("Confirmar substitui\xE7\xE3o","Isso apaga todos os projetos atuais. Tem certeza?",[{label:"Cancelar",value:!1},{label:"Apagar e substituir",value:!0,danger:!0}]))return;Ct.projects=e.projects,e.progress&&(Ct.progress=e.progress)}else e.projects.forEach(a=>{a.id=ar(),Ct.projects.unshift(a)});bn(Ct.projects[0].id),nn(),Ha(),ne("ok",`Backup restaurado (${r==="sub"?"substitui\xE7\xE3o":"adi\xE7\xE3o"}): ${e.projects.length} projeto(s).`)}catch(e){ne("err","N\xE3o foi poss\xEDvel restaurar: "+e.message),Ri("Backup inv\xE1lido",Bt(e.message),[{label:"OK",value:1}])}};function fc(){Z("backupInfo").textContent=`Pasta sugerida: ${Ct.settings.backupDir||"Documentos"} \xB7 \xFAltimo backup .zip: ${Ct.settings.lastBackup?ni(Ct.settings.lastBackup):"nunca"}. C\xF3pias autom\xE1ticas di\xE1rias ficam na pasta de dados.`}var pc="proj";Z("bProjImport").onclick=()=>{pc="proj",Z("fileKrl").click()};Z("bRevImport").onclick=()=>{pc="rev",Z("fileKrl").click()};Z("fileKrl").onchange=async i=>{let t=[...i.target.files];if(i.target.value="",!t.length)return;let e=null,n=null;for(let r of t){let a=await r.text();/\.dat$/i.test(r.name)||/^\s*(&.*\r?\n\s*)*DEFDAT/i.test(a)?n=a:e=a}if(e===null){n!==null&&Wt()&&(Wt().dat=n,an(lt.file),Mn(),he(),ne("info","Arquivo .dat importado para o projeto aberto."));return}e=e.replace(/\r\n/g,`
`),n=(n||`DEFDAT ${ii(e)}
ENDDAT`).replace(/\r\n/g,`
`);let s=Es({name:t.map(r=>r.name).join(" + "),cat:"Importados",src:e,dat:n,scene:Wt()?Wt().scene:SCENES.pick});s.original={src:e,dat:n,date:yn(),files:t.map(r=>r.name)},bn(s.id),ne("ok",`Importado: ${s.name}. O original foi guardado para compara\xE7\xE3o.`),pc==="rev"?(sn("analise"),mc()):(sn("prog"),lc(!0))};var gs=null;function ir(){let i=COURSES.flatMap(e=>e.aulas),t=i.filter(e=>Ct.progress.lessons[e.id]).length;if(Z("courseProg").textContent=`${t}/${i.length} aulas`,gs){let e=COURSES.find(a=>a.aulas.some(o=>o.id===gs)),n=e.aulas.find(a=>a.id===gs),s=e.aulas.indexOf(n),r=n.exemplo&&EXAMPLES.find(a=>a.id===n.exemplo);Z("courses").innerHTML=`<div class="row"><button class="sm" id="lsBack">\u2190 Trilha</button><span class="note">N\xEDvel ${e.nivel} \xB7 ${e.titulo} \xB7 aula ${s+1}/${e.aulas.length}</span></div>
      <h2>${Bt(n.titulo)}</h2><div class="lesson">${n.html}</div>
      <div class="row" style="margin-top:14px">${r?`<button class="pri" id="lsEx">Abrir exemplo: ${Bt(r.title)}</button>`:""}
      <button id="lsDone">${Ct.progress.lessons[n.id]?"\u2713 Conclu\xEDda":"Marcar como conclu\xEDda"}</button>
      <button id="lsAsk">Perguntar ao Professor</button>${s<e.aulas.length-1?'<button id="lsNext">Pr\xF3xima \u2192</button>':""}</div>`,Z("lsBack").onclick=()=>{gs=null,ir()},r&&(Z("lsEx").onclick=()=>cc(r)),Z("lsDone").onclick=()=>{Ct.progress.lessons[n.id]=!Ct.progress.lessons[n.id],he(),ir()},Z("lsAsk").onclick=()=>{sn("ia"),Z("chatIn").value=`Sobre a aula "${n.titulo}": `,Z("chatIn").focus()},Z("lsNext")&&(Z("lsNext").onclick=()=>{Ct.progress.lessons[n.id]=!0,he(),gs=e.aulas[s+1].id,ir(),Z("courses").scrollTop=0});return}Z("courses").innerHTML=`<div class="bar" style="margin-bottom:10px"><i style="width:${Math.round(100*t/i.length)}%"></i></div>`+COURSES.map(e=>{let n=e.aulas.filter(s=>Ct.progress.lessons[s.id]).length;return`<div class="cat">N\xEDvel ${e.nivel} \u2014 ${e.titulo} <span class="badge ${n===e.aulas.length?"ok":""}">${n}/${e.aulas.length}</span></div>`+e.aulas.map(s=>`<div class="item" data-ls="${s.id}">${Ct.progress.lessons[s.id]?"\u2713 ":""}<b>${Bt(s.titulo)}</b>${s.exemplo?'<div class="meta">com exemplo pr\xE1tico</div>':""}</div>`).join("")}).join("")}Z("courses").onclick=i=>{let t=i.target.closest("[data-ls]");t&&(gs=t.dataset.ls,ir(),Z("courses").scrollTop=0)};var sr=null;function Ja(){let i=Ct.progress.exercises,t=EXERCISES.filter(e=>i[e.id]&&i[e.id].best===100).length;if(Z("exProg").textContent=`${t}/${EXERCISES.length} completos`,sr){let e=EXERCISES.find(r=>r.id===sr),n=i[e.id],s=Ct.projects.find(r=>r.exercise===e.id);Z("exercises").innerHTML=`<div class="row"><button class="sm" id="exBack">\u2190 Exerc\xEDcios</button><span class="note">${Bt(e.nivel)} \xB7 cen\xE1rio: ${Bt(SCENES[e.scene].nome)}</span></div>
      <h2>${Bt(e.titulo)}</h2><p>${Bt(e.enunciado)}</p>
      <h3>Crit\xE9rios de avalia\xE7\xE3o</h3><div id="exCrit">${e.criterios.map(r=>`<div class="crit"><b>\u2022</b><div>${Bt(r.txt)}</div></div>`).join("")}</div>
      <div class="row" style="margin-top:12px"><button class="pri exrun" id="exStart">${s?"Abrir meu programa":"Come\xE7ar exerc\xEDcio"}</button><button class="exrun" id="exEval" ${s?"":"disabled"}>\u25B6 Executar e avaliar</button>${s?'<button class="exrun danger" id="exRestart">Recome\xE7ar do zero</button>':""}</div>
      ${n?`<p class="note">Melhor nota: <b>${n.best}%</b> \xB7 ${n.tries} tentativa(s) \xB7 \xFAltima em ${ni(n.date)}</p>`:""}<div id="exResult"></div>`,Z("exBack").onclick=()=>{sr=null,Ja()},Z("exStart").onclick=()=>{Yl(e,!1)},Z("exRestart")&&(Z("exRestart").onclick=async()=>{await Ri("Recome\xE7ar","Apagar o seu programa deste exerc\xEDcio e come\xE7ar do modelo inicial?",[{label:"Cancelar",value:!1},{label:"Recome\xE7ar",value:!0,danger:!0}])&&Yl(e,!0)}),Z("exEval").onclick=()=>pd(e);return}Z("exercises").innerHTML='<p class="note">Cada exerc\xEDcio abre um projeto pr\xF3prio (categoria Exerc\xEDcios) com o cen\xE1rio certo. Escreva a solu\xE7\xE3o e clique em "Executar e avaliar": o Korum executa o programa e confere cada crit\xE9rio.</p>'+EXERCISES.map(e=>{let n=i[e.id];return`<div class="item" data-ex="${e.id}"><b>${Bt(e.titulo)}</b> ${n?`<span class="badge ${n.best===100?"ok":"warn"}">${n.best}%</span>`:""}<div class="meta">${Bt(e.nivel)} \xB7 ${e.criterios.length} crit\xE9rios</div></div>`}).join("")}Z("exercises").onclick=i=>{let t=i.target.closest("[data-ex]");t&&(sr=t.dataset.ex,Ja())};function Yl(i,t){let e=Ct.projects.find(n=>n.exercise===i.id);e&&t&&(Ct.projects=Ct.projects.filter(n=>n!==e),e=null),e||(e=Es({name:"Exerc\xEDcio: "+i.titulo,cat:"Exerc\xEDcios",src:i.src,dat:i.dat,scene:SCENES[i.scene],exercise:i.id})),bn(e.id),Ja(),sn("prog"),ne("info",`Exerc\xEDcio "${i.titulo}": ${i.enunciado}`)}async function pd(i){let t=Wt();if(!t||t.exercise!==i.id){if(t=Ct.projects.find(o=>o.exercise===i.id),!t)return;bn(t.id)}t.scene=Ms(SCENES[i.scene]),nc(t.scene),fr(!0),ne("run",`Avalia\xE7\xE3o do exerc\xEDcio "${i.titulo}"`);let n={result:await Ci(!1),events:lt.events,joints:lt.joints.slice(),parts:ei.map(ic),outs:lt.outs.slice(),src:t.src,scene:t.scene},s=i.criterios.map(o=>{let l=!1;try{l=!!o.f(n)}catch{l=!1}return{...o,ok:l}}),r=Math.round(100*s.filter(o=>o.ok).length/s.length),a=Ct.progress.exercises[i.id]||{best:0,tries:0};a.tries++,a.best=Math.max(a.best,r),a.date=yn(),Ct.progress.exercises[i.id]=a,he(),sr=i.id,sn("exerc"),Z("exResult").innerHTML=`<h3>Resultado: ${r}%</h3><div class="bar"><i style="width:${r}%;background:${r===100?"var(--ok)":"var(--warn)"}"></i></div>`+s.map(o=>`<div class="crit ${o.ok?"ok":"no"}"><b>${o.ok?"\u2713":"\u2717"}</b><div>${Bt(o.txt)}${o.ok?"":`<small>Dica: ${Bt(o.dica)}</small>`}</div></div>`).join("")+(r===100?'<p style="color:var(--ok)"><b>Parab\xE9ns! Exerc\xEDcio conclu\xEDdo.</b></p>':'<p class="note">Corrija os itens marcados com \u2717 e avalie de novo. Em d\xFAvida, pergunte ao Professor.</p>'),ne(r===100?"ok":"warn",`Nota do exerc\xEDcio "${i.titulo}": ${r}%`)}var je=null;Z("scenePreset").innerHTML='<option value="">\u2014 escolher modelo \u2014</option>'+Object.entries(SCENES).map(([i,t])=>`<option value="${i}">${Bt(t.nome)}</option>`).join("");Z("scenePreset").onchange=()=>{let i=Z("scenePreset").value;i&&(je=Ms(SCENES[i]),pr(!0)),Z("scenePreset").value=""};function pr(i){let t=Wt();if(!t)return;(!i||!je)&&(je=Ms(t.scene));let e=(n,s,r=62)=>`<input type="number" data-s="${n}" value="${s}" style="width:${r}px">`;Z("sceneObjs").innerHTML=je.objetos.map((n,s)=>`<div class="item" style="cursor:default"><div class="row" style="margin:0 0 4px"><select data-s="o.${s}.tipo">${["mesa","esteira","palete","maquina","bloco"].map(r=>`<option ${r===n.tipo?"selected":""}>${r}</option>`).join("")}</select><input type="text" data-s="o.${s}.nome" value="${Bt(n.nome)}" style="flex:1"><button class="sm danger" data-sdel="o.${s}">\u2715</button></div>
    <div class="row" style="margin:0"><label>X</label>${e(`o.${s}.x`,n.x)}<label>Y</label>${e(`o.${s}.y`,n.y)}<label>L</label>${e(`o.${s}.w`,n.w,56)}<label>P</label>${e(`o.${s}.d`,n.d,56)}<label>A</label>${e(`o.${s}.h`,n.h,56)}</div></div>`).join("")||'<p class="note">Nenhum objeto.</p>',Z("sceneParts").innerHTML=je.pecas.map((n,s)=>`<div class="row"><label>Pe\xE7a ${s+1}</label><label>X</label>${e(`p.${s}.0`,n[0])}<label>Y</label>${e(`p.${s}.1`,n[1])}<button class="sm danger" data-sdel="p.${s}">\u2715</button></div>`).join("")||'<p class="note">Nenhuma pe\xE7a.</p>'}document.getElementById("p-cena").addEventListener("change",i=>{let t=i.target.dataset.s;if(!t)return;let[e,n,s]=t.split(".");e==="o"?je.objetos[+n][s]=i.target.type==="number"?+i.target.value:i.target.value:je.pecas[+n][+s]=+i.target.value});document.getElementById("p-cena").addEventListener("click",i=>{let t=i.target.dataset.sdel;if(!t)return;let[e,n]=t.split(".");(e==="o"?je.objetos:je.pecas).splice(+n,1),pr(!0)});Z("bAddObj").onclick=()=>{let i=Z("newObjType").value,t={mesa:[350,500,150],esteira:[440,310,150],palete:[320,320,120],maquina:[420,300,420],bloco:[150,150,150]}[i];je.objetos.push({tipo:i,nome:i[0].toUpperCase()+i.slice(1),x:500,y:400,w:t[0],d:t[1],h:t[2]}),pr(!0)};Z("bAddPart").onclick=()=>{je.pecas.push([575,0]),pr(!0)};Z("bSceneApply").onclick=()=>{if(lt.running)return;let i=Wt();for(let t of je.objetos)Math.hypot(t.x,t.y)<Math.max(t.w,t.d)/2+120&&Math.abs(t.x)<t.w/2+130&&Math.abs(t.y)<t.d/2+130&&ne("warn",`${t.nome} ocupa a base do rob\xF4 \u2014 ajuste X/Y.`);i.scene=Ms(je),nc(i.scene),fr(!0),he(),ne("ok",`Cen\xE1rio aplicado: ${i.scene.objetos.length} objeto(s), ${i.scene.pecas.length} pe\xE7a(s).`)};function Hv(){let i=Wt();Z("revOrig").textContent=i&&i.original?`Original guardado: ${(i.original.files||[]).join(" + ")||"importa\xE7\xE3o"} em ${ni(i.original.date)}.`:"Este projeto n\xE3o tem original importado: a compara\xE7\xE3o usa a primeira vers\xE3o do hist\xF3rico."}Z("bRevDiff").onclick=()=>{let i=Wt(),t=i.original||i.versions[0];cd(i.original?"Original importado \u2192 atual":"Primeira vers\xE3o \u2192 atual",t,i)};Z("bRevRestore").onclick=async()=>{let i=Wt(),t=i.original||i.versions[0];await Ri("Restaurar original","Voltar o programa ao original? O estado atual vai para o hist\xF3rico.",[{label:"Cancelar",value:!1},{label:"Restaurar",value:!0,danger:!0}])&&(si("Antes de restaurar o original"),i.src=t.src,i.dat=t.dat,an("src"),Mn(),he(),rn("Original restaurado"))};Z("bAnalyze").onclick=()=>mc();async function mc(){let i=Wt(),t=Z("report");t.innerHTML='<p class="note">Analisando\u2026</p>';let e=RL.parse(i.src,i.dat),n=i.src+`
`+i.dat,s=[...new Set([...i.src.matchAll(/\$IN\s*\[\s*(\d+)\s*\]/gi)].map(f=>+f[1]))].sort((f,M)=>f-M),r=[...new Set([...i.src.matchAll(/\$OUT\s*\[\s*(\d+)\s*\]/gi)].map(f=>+f[1]))].sort((f,M)=>f-M),a=f=>(i.src.match(f)||[]).length,o=`<h3>Estrutura</h3><table class="t rep">
    <tr><td>Linhas (.src / .dat)</td><td>${i.src.split(`
`).length} / ${i.dat.split(`
`).length}</td></tr>
    <tr><td>Subprogramas</td><td>${e.mod&&e.mod.order?e.mod.order.map(f=>Bt(e.mod.defs[f].display)+"()").join(", "):"\u2014"}</td></tr>
    <tr><td>Comandos de movimento</td><td>PTP ${a(/^\s*PTP\b/gim)} \xB7 LIN ${a(/^\s*LIN\b/gim)} \xB7 CIRC ${a(/^\s*CIRC\b/gim)} \xB7 REL ${a(/^\s*(PTP|LIN)_REL\b/gim)}</td></tr>
    <tr><td>Controle de fluxo</td><td>IF ${a(/^\s*IF\b/gim)} \xB7 FOR ${a(/^\s*FOR\b/gim)} \xB7 WHILE ${a(/^\s*WHILE\b/gim)} \xB7 LOOP ${a(/^\s*LOOP\b/gim)} \xB7 SWITCH ${a(/^\s*SWITCH\b/gim)}</td></tr>
    <tr><td>Entradas usadas</td><td>${s.length?s.map(f=>"$IN["+f+"]").join(", "):"nenhuma"}</td></tr>
    <tr><td>Sa\xEDdas usadas</td><td>${r.length?r.map(f=>"$OUT["+f+"]").join(", "):"nenhuma"}</td></tr>
    <tr><td>Formul\xE1rios inline (FOLD)</td><td>${(n.match(/;FOLD/gi)||[]).length}</td></tr></table>`;if(e.errors.length){o+=`<h3>Erros de sintaxe (${e.errors.length})</h3>`+e.errors.map(f=>`<div class="crit no"><b>\u2717</b><div>${f.loc.file}:${f.loc.line} \u2014 ${Bt(f.msg)}</div></div>`).join(""),t.innerHTML=o;return}e.warnings.length&&(o+=`<h3>Instru\xE7\xF5es n\xE3o simuladas ou ignoradas (${e.warnings.length})</h3>`+[...new Map(e.warnings.map(f=>[f.msg,f])).values()].map(f=>`<div class="crit"><b style="color:var(--warn)">!</b><div>${f.loc.file}:${f.loc.line} \u2014 ${Bt(f.msg)}</div></div>`).join(""));let l=ed(i)||{},c=rc(l),h=RL.frameToMat(RL.DEFAULT_TOOL);o+=`<h3>Pontos do .dat (${c.length})</h3><table class="t rep">`+c.map(f=>{let M=f.raw,x="";if(M.__t==="E6AXIS"||M.__t==="AXIS"){let T=["A1","A2","A3","A4","A5","A6"].map(P=>M[P]),L=T.findIndex((P,A)=>P<RL.LIMITS[A][0]||P>RL.LIMITS[A][1]);x=L>=0?`<span class="badge err">A${L+1} fora do limite</span>`:RL.checkCollision(T,h)?'<span class="badge err">colis\xE3o</span>':'<span class="badge ok">ok</span>'}else{let T=RL.ik(RL.mul(RL.frameToMat(M),RL.inv(h)),RL.HOME);x=T.ok?RL.checkCollision(T.j,h)?`<span class="badge err">colis\xE3o: ${Bt(RL.checkCollision(T.j,h).obstacle.nome)}</span>`:T.singular?'<span class="badge warn">singularidade</span>':'<span class="badge ok">alcan\xE7\xE1vel</span>':`<span class="badge err">${Bt(T.reason)}</span>`}return`<tr><td>${Bt(f.name)}</td><td>X ${Ne(f.pos[0])} Y ${Ne(f.pos[1])} Z ${Ne(f.pos[2])} ${x}</td></tr>`}).join("")+"</table>";let u=RL.HOME.slice(),p=[],d=[],g=new RL.Machine(e,{dry:!0,maxStmts:2e4,log:(f,M,x)=>d.push({l:f,msg:M,loc:x}),line(){},status(){},getJoints:()=>u,setJoints:f=>{u=f.slice()},getIn:()=>!1,output(){},getOverride:()=>100,setOverride(){},moved:(f,M,x)=>p.push({label:f,pos:M,cut:x}),animate:async()=>{}}),v=await g.run(),m=d.filter(f=>f.l==="err");o+=`<h3>Execu\xE7\xE3o simulada (sem anima\xE7\xE3o)</h3><table class="t rep">
    <tr><td>Resultado</td><td>${v==="done"?'<span class="badge ok">conclu\xEDdo</span>':'<span class="badge err">parou com erro</span>'}</td></tr>
    <tr><td>Movimentos executados</td><td>${g.motions||0}</td></tr>
    <tr><td>Tempo de ciclo estimado</td><td>${(g.totalTime||0).toFixed(1)} s (override 100%, aproximado)</td></tr></table>`,m.length&&(o+=m.map(f=>`<div class="crit no"><b>\u2717</b><div>${f.loc?`${f.loc.file}:${f.loc.line} \u2014 `:""}${Bt(f.msg)}</div></div>`).join("")),d.filter(f=>f.l==="warn"||f.l==="info"&&/Análise/.test(f.msg)).slice(0,12).forEach(f=>o+=`<div class="crit"><b style="color:var(--warn)">!</b><div>${f.loc?`${f.loc.file}:${f.loc.line} \u2014 `:""}${Bt(f.msg)}</div></div>`),p.length&&(o+=`<h3>Sequ\xEAncia de movimentos reconstru\xEDda${p.length>80?" (primeiros 80)":""}</h3><table class="t rep">`+p.slice(0,80).map((f,M)=>`<tr><td>${M+1}. ${Bt(f.label.trim())}</td><td>X ${Ne(f.pos.X)} Y ${Ne(f.pos.Y)} Z ${Ne(f.pos.Z)}${f.cut?' <span class="badge err">colis\xE3o</span>':""}</td></tr>`).join("")+"</table>"),o+='<div class="row" style="margin-top:10px"><button class="pri" id="repRun">\u25B6 Executar com anima\xE7\xE3o</button><button id="repAsk">Pedir explica\xE7\xE3o ao Professor</button></div>',t.innerHTML=o,Z("repRun").onclick=()=>{fr(!0),Ci(!1)},Z("repAsk").onclick=()=>{sn("ia"),Qa("Analise o programa aberto como engenharia reversa: explique o que ele faz passo a passo, aponte riscos e sugira melhorias.")},ne(v==="done"?"ok":"warn",`An\xE1lise conclu\xEDda: ${g.motions||0} movimentos, ~${(g.totalTime||0).toFixed(1)} s, ${m.length} erro(s).`)}var Vv=["Explique o programa aberto","Por que meu rob\xF4 n\xE3o chegou \xE0 posi\xE7\xE3o programada?","Qual a diferen\xE7a entre PTP e LIN?","Como criar um programa de paletiza\xE7\xE3o?","Como corrigir uma singularidade?","Crie um exerc\xEDcio para eu praticar"];Z("quick").innerHTML=Vv.map(i=>`<button data-q="${Bt(i)}">${Bt(i)}</button>`).join("");Z("quick").onclick=i=>{i.target.dataset.q&&Qa(i.target.dataset.q)};Z("bChatSend").onclick=()=>{let i=Z("chatIn").value.trim();i&&(Z("chatIn").value="",Qa(i))};Z("chatIn").addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),Z("bChatSend").click())});Z("bChatClear").onclick=()=>{lt.chat=[],rr()};function Gv(i){let t=i.split(/```(\w*)\n?([\s\S]*?)```/g),e="";for(let n=0;n<t.length;n+=3)if(e+=Bt(t[n]).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`([^`\n]+)`/g,"<code>$1</code>"),n+2<t.length){let s=t[n+2],r=/^\s*(GLOBAL\s+)?DEF\s/im.test(s)?"src":/^\s*DEFDAT\s/im.test(s)?"dat":null;e+=`<pre>${Bt(s)}</pre>`+(r?`<button class="sm" data-load="${r}" data-code="${encodeURIComponent(s)}">Carregar no .${r}</button> `:"")}return e}function rr(){let i=Z("chat");lt.chat.length?i.innerHTML=lt.chat.map(t=>`<div class="msg ${t.role==="user"?"u":"a"}">${t.role==="user"?Bt(t.content):Gv(t.content)}</div>`).join(""):i.innerHTML=`<div class="msg a">Ol\xE1! Sou o professor de rob\xF3tica do Korum. Analiso o programa aberto, explico comandos KRL, ajudo a corrigir erros e crio exemplos que voc\xEA pode carregar e executar no simulador.${Ct.settings.apiKey?"":`

Para respostas completas, coloque sua chave da API da Anthropic em Ajustes. Sem ela, respondo com o gloss\xE1rio de comandos embutido.`}</div>`,i.scrollTop=i.scrollHeight}Z("chat").onclick=i=>{let t=i.target;if(!t.dataset.load)return;let e=Wt(),n=decodeURIComponent(t.dataset.code);si("Antes de carregar c\xF3digo do Professor"),e[t.dataset.load]=n.replace(/\r\n/g,`
`).trim(),an(t.dataset.load),hr(),Mn(),he(),sn("prog"),ne("info",`C\xF3digo do Professor carregado no .${t.dataset.load}. Clique em Verificar e Executar.`)};var Na={PTP:"PTP (ponto a ponto): todos os eixos partem e chegam juntos pelo caminho mais r\xE1pido para os motores. A ferramenta faz uma curva no espa\xE7o. Use longe de pe\xE7as e obst\xE1culos. Ex.: PTP P1",LIN:"LIN (linear): o TCP segue uma linha reta at\xE9 o destino, com velocidade $VEL.CP (m/s). Use para aproximar e afastar de pe\xE7as. Ex.: LIN P2",CIRC:"CIRC aux, fim: arco de c\xEDrculo passando pelo ponto auxiliar at\xE9 o ponto final. Dois CIRC de 180\xB0 fazem um c\xEDrculo completo.",LIN_REL:"LIN_REL {Z 50}: move em linha reta somando o deslocamento \xE0 posi\xE7\xE3o atual (na BASE; com #TOOL, na dire\xE7\xE3o da ferramenta).",PTP_REL:"PTP_REL {A1 30}: soma \xE2ngulos aos eixos atuais (ou deslocamento cartesiano, se usar X, Y, Z).",INI:"INI: carrega velocidades e acelera\xE7\xF5es padr\xE3o. Deve vir no in\xEDcio do programa.",DECL:"DECL tipo nome: declara vari\xE1vel. Tipos: INT, REAL, BOOL, E6POS (ponto cartesiano), E6AXIS (ponto de eixos), FRAME. Ex.: DECL E6POS P1 = {X 500, Y 0, Z 400, A 0, B 90, C 0}",E6POS:"E6POS: ponto cartesiano com X, Y, Z (mm) e A, B, C (graus, rota\xE7\xF5es em Z, Y, X). S e T escolhem a configura\xE7\xE3o no controlador real.",E6AXIS:"E6AXIS: posi\xE7\xE3o dada pelos \xE2ngulos A1 a A6. HOME \xE9 um E6AXIS.",$TOOL:"$TOOL: sistema da ferramenta ativa (posi\xE7\xE3o do TCP em rela\xE7\xE3o ao flange). Um ponto ensinado com uma ferramenta s\xF3 \xE9 atingido corretamente com a mesma ferramenta ativa.",$BASE:"$BASE: sistema de coordenadas da pe\xE7a/mesa. Mudar a base desloca todos os pontos cartesianos programados juntos.",$OUT:"$OUT[n] = TRUE/FALSE liga e desliga sa\xEDdas digitais. No Korum, $OUT[1] comanda a garra.",$IN:"$IN[n] l\xEA entradas digitais (sensores, bot\xF5es, sinais do CLP). Use WAIT FOR $IN[1] para esperar.",WAIT:"WAIT SEC t espera t segundos. WAIT FOR condi\xE7\xE3o espera a condi\xE7\xE3o ficar verdadeira.",LOOP:"LOOP ... ENDLOOP repete para sempre. Saia com EXIT.",FOR:"FOR i = 1 TO n [STEP s] ... ENDFOR repete com contador (declare DECL INT i).",IF:"IF condi\xE7\xE3o THEN ... ELSE ... ENDIF. Em KRL, use par\xEAnteses em compara\xE7\xF5es combinadas: (a > 1) AND (b < 2).",SINGULARIDADE:"Singularidade de punho: com A5 \u2248 0\xB0, A4 e A6 ficam alinhados e um pequeno movimento LIN exige giros enormes. Incline a ferramenta (ex.: B 85), use PTP para passar pela regi\xE3o ou mude a posi\xE7\xE3o da pe\xE7a.",HOME:"HOME = {A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}: posi\xE7\xE3o segura de in\xEDcio e fim de ciclo.",OVERRIDE:"Override ($OV_PRO): percentual aplicado a todas as velocidades pelo operador. Teste programas novos com override baixo.",INTERRUPT:"INTERRUPT DECL n WHEN condi\xE7\xE3o DO sub() declara uma interrup\xE7\xE3o; INTERRUPT ON n ativa.",TCP:"TCP (Tool Center Point): ponto de trabalho da ferramenta. As posi\xE7\xF5es cartesianas descrevem onde est\xE1 o TCP.",ALCANCE:"Ponto inalcan\xE7\xE1vel: o destino est\xE1 fora do alcance do bra\xE7o ou exige um eixo al\xE9m do limite. Aproxime o ponto da base, reduza a altura ou mude a orienta\xE7\xE3o.",COLISAO:"Colis\xE3o: alguma parte do rob\xF4 ou da ferramenta entraria em um objeto. Suba o ponto (Z maior), crie um ponto de aproxima\xE7\xE3o ou altere o cen\xE1rio."};function Wu(i){let t=i.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g,""),e=Object.entries(Na).filter(([s])=>new RegExp(`(^|[^A-Z_$])${s.replace("$","\\$")}([^A-Z_]|$)`).test(t)),n="";if(/ERRO|NAO CHEGOU|PROBLEMA|FALHA/.test(t)){let s=lt.logTail.filter(r=>/^ERRO/.test(r)).slice(-3);n+=s.length?`\xDAltimos erros do console:
${s.join(`
`)}

`:`N\xE3o h\xE1 erros recentes no console.

`,s.some(r=>/alcance/i.test(r))&&e.push(["",Na.ALCANCE]),s.some(r=>/COLIS/i.test(r))&&e.push(["",Na.COLISAO]),s.some(r=>/singular/i.test(r))&&e.push(["",Na.SINGULARIDADE])}return/EXPLIQUE O PROGRAMA|ANALISE O PROGRAMA/.test(t)&&(n+=`Use a aba An\xE1lise: ela lista subprogramas, pontos (alcan\xE7\xE1veis ou n\xE3o), E/S e a sequ\xEAncia de movimentos.

`),n+=e.length?e.map(s=>"\u2022 "+s[1]).join(`

`):"N\xE3o encontrei esse assunto no gloss\xE1rio embutido. Tente palavras como PTP, LIN, CIRC, $TOOL, $BASE, WAIT, FOR, singularidade.",n+`

(Resposta do gloss\xE1rio offline. Configure a chave da API em Ajustes para respostas completas do Professor.)`}function Wv(){let i=Wt(),t=Ya();return`CONTEXTO DO KORUM (gerado automaticamente)
Projeto: ${i.name} (categoria ${i.cat})
Cen\xE1rio: ${i.scene.objetos.map(e=>`${e.nome} [${e.tipo}] centro X${e.x} Y${e.y}, ${e.w}x${e.d}, altura ${e.h}`).join("; ")||"vazio"}; pe\xE7as (cubos 50 mm): ${i.scene.pecas.map(e=>`(${e[0]}, ${e[1]})`).join(" ")||"nenhuma"}
Rob\xF4: 6 eixos did\xE1tico; HOME {A1 0,A2 -90,A3 90,A4 0,A5 0,A6 0}; limites A1\xB1170 A2 -190..45 A3 -120..156 A4\xB1185 A5\xB1120 A6\xB1350; garra em $OUT[1] (TRUE fecha), TCP a 110 mm do flange.
Eixos atuais: ${lt.joints.map((e,n)=>`A${n+1} ${e.toFixed(1)}`).join(" ")} | TCP: X ${t.X.toFixed(1)} Y ${t.Y.toFixed(1)} Z ${t.Z.toFixed(1)} A ${t.A.toFixed(1)} B ${t.B.toFixed(1)} C ${t.C.toFixed(1)}
\xDAltimas mensagens do console:
${lt.logTail.slice(-12).join(`
`)||"(nenhuma)"}
--- ${ii(i.src)}.src ---
${i.src.slice(0,12e3)}
--- ${ii(i.src)}.dat ---
${i.dat.slice(0,6e3)}`}var Xv=`Voc\xEA \xE9 o Professor de Rob\xF3tica do Korum, um laborat\xF3rio virtual de rob\xF3tica industrial para t\xE9cnicos e engenheiros brasileiros. Responda sempre em portugu\xEAs do Brasil, com linguagem t\xE9cnica e did\xE1tica, direto ao ponto.
Voc\xEA ensina programa\xE7\xE3o KRL de rob\xF4s industriais de 6 eixos, cinem\xE1tica, singularidades, diagn\xF3stico e boas pr\xE1ticas de seguran\xE7a.
O simulador do Korum interpreta este subconjunto de KRL: DEF/END (com par\xE2metros), DEFDAT/ENDDAT, DECL (INT, REAL, BOOL, E6POS, POS, FRAME, E6AXIS, AXIS, vetores), INI, PTP, LIN, CIRC aux,fim, PTP_REL, LIN_REL (BASE ou #TOOL), IF/ELSE/ENDIF, FOR/ENDFOR, WHILE, REPEAT/UNTIL, LOOP/ENDLOOP, SWITCH/CASE, EXIT, RETURN, WAIT SEC, WAIT FOR, HALT, INTERRUPT DECL/ON/OFF, $IN[n], $OUT[n], $VEL.CP (m/s), $VEL_AXIS[n] (%), $OV_PRO, $BASE, $TOOL, $POS_ACT, $AXIS_ACT, $NULLFRAME, BAS(#INITMOV/#PTP_PARAMS/#CP_PARAMS), SIN COS TAN ACOS ATAN2 SQRT ABS. Aproxima\xE7\xF5es C_PTP/C_DIS s\xE3o aceitas mas o rob\xF4 para em cada ponto. SPLINE, TRIGGER, GOTO e DEFFCT n\xE3o s\xE3o executados. Em KRL, AND/OR t\xEAm prioridade maior que compara\xE7\xF5es: use par\xEAnteses.
Conven\xE7\xF5es: mm e graus; X para a frente, Z para cima; A,B,C = rota\xE7\xF5es Z,Y,X; ferramenta apontando para baixo = B 90. Pe\xE7as s\xE3o cubos de 50 mm (centro a 25 mm acima da superf\xEDcie). Pegar: TCP a menos de 30 mm do centro da pe\xE7a e $OUT[1] = TRUE.
Quando escrever um programa, entregue o .src e o .dat em blocos de c\xF3digo separados (\`\`\`krl), com DEF e DEFDAT de mesmo nome, para o aluno carregar e executar no simulador. Use apenas o subconjunto suportado. Verifique alcance (at\xE9 ~950 mm do ombro, que fica em Z 400) e colis\xF5es com o cen\xE1rio informado.
Quando houver diferen\xE7a entre o simulador e controladores reais (KSS, iiQKA.OS2 ou outros), diga claramente. Nunca afirme que a simula\xE7\xE3o garante seguran\xE7a em um rob\xF4 real. Se n\xE3o tiver certeza sobre um detalhe de um controlador espec\xEDfico, diga que \xE9 preciso conferir na documenta\xE7\xE3o oficial do fabricante.`;async function Qa(i){if(lt.chat.push({role:"user",content:i}),rr(),!Ct.settings.apiKey){lt.chat.push({role:"assistant",content:Wu(i)}),rr();return}let t=Z("chat"),e=document.createElement("div");e.className="msg a",e.textContent="Pensando\u2026",t.appendChild(e),t.scrollTop=t.scrollHeight,Z("bChatSend").disabled=!0;let n=lt.chat.slice(-12).map((r,a,o)=>({role:r.role,content:a===o.length-1?Wv()+`

PERGUNTA DO ALUNO:
`+r.content:r.content})),s=await Bn.ai({apiKey:Ct.settings.apiKey,model:Ct.settings.model||za,system:Xv,messages:n});Z("bChatSend").disabled=!1,lt.chat.push({role:"assistant",content:s.error?`N\xE3o consegui falar com a API: ${s.error}

Confira a chave e o nome do modelo em Ajustes.

`+Wu(i):s.text}),rr()}function gc(i){document.documentElement.dataset.theme=i,yv(i)}Z("bTheme").onclick=()=>{Ct.settings.theme=Ct.settings.theme==="claro"?"escuro":"claro",gc(Ct.settings.theme),he(),lt.pane==="config"&&_c()};function _c(){Z("cfgTheme").value=Ct.settings.theme,Z("cfgKey").value=Ct.settings.apiKey||"",Z("cfgModel").value=Ct.settings.model||za,Z("cfgDir").textContent=Ct.settings.backupDir||"(Documentos)",Z("about").innerHTML=`Korum ${Bt(jl)} \u2014 laborat\xF3rio virtual de rob\xF3tica industrial. Interpretador KRL, cinem\xE1tica e cen\xE1rios pr\xF3prios; o modelo do rob\xF4 usa dimens\xF5es did\xE1ticas. N\xE3o envia comandos a rob\xF4s reais. KRL \xE9 a linguagem dos rob\xF4s KUKA; o Korum n\xE3o \xE9 afiliado a nenhum fabricante.`}Z("cfgTheme").onchange=()=>{Ct.settings.theme=Z("cfgTheme").value,gc(Ct.settings.theme),he()};Z("cfgKey").onchange=()=>{Ct.settings.apiKey=Z("cfgKey").value.trim(),he(),rn("Chave salva neste computador")};Z("cfgModel").onchange=()=>{Ct.settings.model=Z("cfgModel").value.trim()||za,he()};Z("bCfgDir").onclick=async()=>{let i=await Bn.chooseDir();i?(Ct.settings.backupDir=i,he(),_c(),fc()):Ye||rn("Dispon\xEDvel no aplicativo instalado")};Z("bOpenData").onclick=()=>Bn.openData();document.querySelectorAll(".rz").forEach(i=>i.addEventListener("pointerdown",t=>{t.preventDefault(),i.classList.add("drag"),i.setPointerCapture(t.pointerId);let e=i.dataset.rz,n=document.documentElement,s=a=>{e==="left"&&n.style.setProperty("--left",Math.max(280,Math.min(900,a.clientX-54))+"px"),e==="right"&&n.style.setProperty("--right",Math.max(240,Math.min(600,innerWidth-a.clientX))+"px"),e==="bottom"&&n.style.setProperty("--bottom",Math.max(70,Math.min(innerHeight-200,innerHeight-a.clientY))+"px")},r=()=>{i.classList.remove("drag"),i.removeEventListener("pointermove",s),i.removeEventListener("pointerup",r)};i.addEventListener("pointermove",s),i.addEventListener("pointerup",r)}));(async()=>{try{let i=await Bn.load();if(i){let t=JSON.parse(i);t&&Array.isArray(t.projects)&&(Ct=Object.assign(Ct,t,{settings:Object.assign(Ct.settings,t.settings||{}),progress:Object.assign({lessons:{},exercises:{}},t.progress||{})}))}}catch(i){ne("err","N\xE3o foi poss\xEDvel ler os dados salvos: "+i.message)}if(!Ct.projects.length){let i=EXAMPLES[0];Es({name:"Exemplo: "+i.title,cat:i.cat,src:i.src,dat:i.dat,scene:SCENES.pick})}Wt()||(Ct.currentId=Ct.projects[0].id),gc(Ct.settings.theme||"escuro"),Ba(RL.DEFAULT_TOOL),rd("iso"),oc(),bn(Ct.currentId),fc(),ti("idle"),ne("info",`Korum ${jl} pronto. ${Ct.projects.length} projeto(s) na biblioteca. F5 executa, F10 executa passo a passo, Ctrl+S salva uma vers\xE3o.`),window.__korum={S:lt,store:Ct,runProgram:Ci,analyze:mc,evaluate:i=>pd(EXERCISES.find(t=>t.id===i)),startExercise:i=>Yl(EXERCISES.find(t=>t.id===i),!0),cur:Wt,showPane:sn,parts:()=>ei.map(ic),sendChat:Qa,krlToBlocks:dc,blocksToKrl:hc,openExample:cc}})();})();
