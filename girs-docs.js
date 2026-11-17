/* GIRS document viewer: shows an invoice, credit note or receipt as a document and downloads it as a real PDF.
   Used by Invoice List (A–D), Invoice Generate and Enquiry. The PDF is written byte by byte; the Tax Invoice QR code uses the bundled qrcode-generator (MIT). */
/* QR Code Generator for JavaScript · Copyright (c) 2009 Kazuhiko Arase · MIT license · qrcode-generator 1.4.4 (minified, export wrapper removed) */
var qrcode=function(){var t=function(t,r){var e=t,n=g[r],o=null,i=0,a=null,u=[],f={},c=function(t,r){o=function(t){for(var r=new Array(t),e=0;e<t;e+=1){r[e]=new Array(t);for(var n=0;n<t;n+=1)r[e][n]=null}return r}(i=4*e+17),l(0,0),l(i-7,0),l(0,i-7),s(),h(),d(t,r),e>=7&&v(t),null==a&&(a=p(e,n,u)),w(a,r)},l=function(t,r){for(var e=-1;e<=7;e+=1)if(!(t+e<=-1||i<=t+e))for(var n=-1;n<=7;n+=1)r+n<=-1||i<=r+n||(o[t+e][r+n]=0<=e&&e<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==e||6==e)||2<=e&&e<=4&&2<=n&&n<=4)},h=function(){for(var t=8;t<i-8;t+=1)null==o[t][6]&&(o[t][6]=t%2==0);for(var r=8;r<i-8;r+=1)null==o[6][r]&&(o[6][r]=r%2==0)},s=function(){for(var t=B.getPatternPosition(e),r=0;r<t.length;r+=1)for(var n=0;n<t.length;n+=1){var i=t[r],a=t[n];if(null==o[i][a])for(var u=-2;u<=2;u+=1)for(var f=-2;f<=2;f+=1)o[i+u][a+f]=-2==u||2==u||-2==f||2==f||0==u&&0==f}},v=function(t){for(var r=B.getBCHTypeNumber(e),n=0;n<18;n+=1){var a=!t&&1==(r>>n&1);o[Math.floor(n/3)][n%3+i-8-3]=a}for(n=0;n<18;n+=1){a=!t&&1==(r>>n&1);o[n%3+i-8-3][Math.floor(n/3)]=a}},d=function(t,r){for(var e=n<<3|r,a=B.getBCHTypeInfo(e),u=0;u<15;u+=1){var f=!t&&1==(a>>u&1);u<6?o[u][8]=f:u<8?o[u+1][8]=f:o[i-15+u][8]=f}for(u=0;u<15;u+=1){f=!t&&1==(a>>u&1);u<8?o[8][i-u-1]=f:u<9?o[8][15-u-1+1]=f:o[8][15-u-1]=f}o[i-8][8]=!t},w=function(t,r){for(var e=-1,n=i-1,a=7,u=0,f=B.getMaskFunction(r),c=i-1;c>0;c-=2)for(6==c&&(c-=1);;){for(var g=0;g<2;g+=1)if(null==o[n][c-g]){var l=!1;u<t.length&&(l=1==(t[u]>>>a&1)),f(n,c-g)&&(l=!l),o[n][c-g]=l,-1==(a-=1)&&(u+=1,a=7)}if((n+=e)<0||i<=n){n-=e,e=-e;break}}},p=function(t,r,e){for(var n=A.getRSBlocks(t,r),o=b(),i=0;i<e.length;i+=1){var a=e[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var u=0;for(i=0;i<n.length;i+=1)u+=n[i].dataCount;if(o.getLengthInBits()>8*u)throw"code length overflow. ("+o.getLengthInBits()+">"+8*u+")";for(o.getLengthInBits()+4<=8*u&&o.put(0,4);o.getLengthInBits()%8!=0;)o.putBit(!1);for(;!(o.getLengthInBits()>=8*u||(o.put(236,8),o.getLengthInBits()>=8*u));)o.put(17,8);return function(t,r){for(var e=0,n=0,o=0,i=new Array(r.length),a=new Array(r.length),u=0;u<r.length;u+=1){var f=r[u].dataCount,c=r[u].totalCount-f;n=Math.max(n,f),o=Math.max(o,c),i[u]=new Array(f);for(var g=0;g<i[u].length;g+=1)i[u][g]=255&t.getBuffer()[g+e];e+=f;var l=B.getErrorCorrectPolynomial(c),h=k(i[u],l.getLength()-1).mod(l);for(a[u]=new Array(l.getLength()-1),g=0;g<a[u].length;g+=1){var s=g+h.getLength()-a[u].length;a[u][g]=s>=0?h.getAt(s):0}}var v=0;for(g=0;g<r.length;g+=1)v+=r[g].totalCount;var d=new Array(v),w=0;for(g=0;g<n;g+=1)for(u=0;u<r.length;u+=1)g<i[u].length&&(d[w]=i[u][g],w+=1);for(g=0;g<o;g+=1)for(u=0;u<r.length;u+=1)g<a[u].length&&(d[w]=a[u][g],w+=1);return d}(o,n)};f.addData=function(t,r){var e=null;switch(r=r||"Byte"){case"Numeric":e=M(t);break;case"Alphanumeric":e=x(t);break;case"Byte":e=m(t);break;case"Kanji":e=L(t);break;default:throw"mode:"+r}u.push(e),a=null},f.isDark=function(t,r){if(t<0||i<=t||r<0||i<=r)throw t+","+r;return o[t][r]},f.getModuleCount=function(){return i},f.make=function(){if(e<1){for(var t=1;t<40;t++){for(var r=A.getRSBlocks(t,n),o=b(),i=0;i<u.length;i++){var a=u[i];o.put(a.getMode(),4),o.put(a.getLength(),B.getLengthInBits(a.getMode(),t)),a.write(o)}var g=0;for(i=0;i<r.length;i++)g+=r[i].dataCount;if(o.getLengthInBits()<=8*g)break}e=t}c(!1,function(){for(var t=0,r=0,e=0;e<8;e+=1){c(!0,e);var n=B.getLostPoint(f);(0==e||t>n)&&(t=n,r=e)}return r}())},f.createTableTag=function(t,r){t=t||2;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+(r=void 0===r?4*t:r)+"px;",e+='">',e+="<tbody>";for(var n=0;n<f.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<f.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+t+"px;",e+=" height: "+t+"px;",e+=" background-color: ",e+=f.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},f.createSvgTag=function(t,r,e,n){var o={};"object"==typeof arguments[0]&&(t=(o=arguments[0]).cellSize,r=o.margin,e=o.alt,n=o.title),t=t||2,r=void 0===r?4*t:r,(e="string"==typeof e?{text:e}:e||{}).text=e.text||null,e.id=e.text?e.id||"qrcode-description":null,(n="string"==typeof n?{text:n}:n||{}).text=n.text||null,n.id=n.text?n.id||"qrcode-title":null;var i,a,u,c,g=f.getModuleCount()*t+2*r,l="";for(c="l"+t+",0 0,"+t+" -"+t+",0 0,-"+t+"z ",l+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',l+=o.scalable?"":' width="'+g+'px" height="'+g+'px"',l+=' viewBox="0 0 '+g+" "+g+'" ',l+=' preserveAspectRatio="xMinYMin meet"',l+=n.text||e.text?' role="img" aria-labelledby="'+y([n.id,e.id].join(" ").trim())+'"':"",l+=">",l+=n.text?'<title id="'+y(n.id)+'">'+y(n.text)+"</title>":"",l+=e.text?'<description id="'+y(e.id)+'">'+y(e.text)+"</description>":"",l+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',l+='<path d="',a=0;a<f.getModuleCount();a+=1)for(u=a*t+r,i=0;i<f.getModuleCount();i+=1)f.isDark(a,i)&&(l+="M"+(i*t+r)+","+u+c);return l+='" stroke="transparent" fill="black"/>',l+="</svg>"},f.createDataURL=function(t,r){t=t||2,r=void 0===r?4*t:r;var e=f.getModuleCount()*t+2*r,n=r,o=e-r;return I(e,e,function(r,e){if(n<=r&&r<o&&n<=e&&e<o){var i=Math.floor((r-n)/t),a=Math.floor((e-n)/t);return f.isDark(a,i)?0:1}return 1})},f.createImgTag=function(t,r,e){t=t||2,r=void 0===r?4*t:r;var n=f.getModuleCount()*t+2*r,o="";return o+="<img",o+=' src="',o+=f.createDataURL(t,r),o+='"',o+=' width="',o+=n,o+='"',o+=' height="',o+=n,o+='"',e&&(o+=' alt="',o+=y(e),o+='"'),o+="/>"};var y=function(t){for(var r="",e=0;e<t.length;e+=1){var n=t.charAt(e);switch(n){case"<":r+="&lt;";break;case">":r+="&gt;";break;case"&":r+="&amp;";break;case'"':r+="&quot;";break;default:r+=n}}return r};return f.createASCII=function(t,r){if((t=t||1)<2)return function(t){t=void 0===t?2:t;var r,e,n,o,i,a=1*f.getModuleCount()+2*t,u=t,c=a-t,g={"██":"█","█ ":"▀"," █":"▄","  ":" "},l={"██":"▀","█ ":"▀"," █":" ","  ":" "},h="";for(r=0;r<a;r+=2){for(n=Math.floor((r-u)/1),o=Math.floor((r+1-u)/1),e=0;e<a;e+=1)i="█",u<=e&&e<c&&u<=r&&r<c&&f.isDark(n,Math.floor((e-u)/1))&&(i=" "),u<=e&&e<c&&u<=r+1&&r+1<c&&f.isDark(o,Math.floor((e-u)/1))?i+=" ":i+="█",h+=t<1&&r+1>=c?l[i]:g[i];h+="\n"}return a%2&&t>0?h.substring(0,h.length-a-1)+Array(a+1).join("▀"):h.substring(0,h.length-1)}(r);t-=1,r=void 0===r?2*t:r;var e,n,o,i,a=f.getModuleCount()*t+2*r,u=r,c=a-r,g=Array(t+1).join("██"),l=Array(t+1).join("  "),h="",s="";for(e=0;e<a;e+=1){for(o=Math.floor((e-u)/t),s="",n=0;n<a;n+=1)i=1,u<=n&&n<c&&u<=e&&e<c&&f.isDark(o,Math.floor((n-u)/t))&&(i=0),s+=i?g:l;for(o=0;o<t;o+=1)h+=s+"\n"}return h.substring(0,h.length-1)},f.renderTo2dContext=function(t,r){r=r||2;for(var e=f.getModuleCount(),n=0;n<e;n++)for(var o=0;o<e;o++)t.fillStyle=f.isDark(n,o)?"black":"white",t.fillRect(n*r,o*r,r,r)},f};t.stringToBytes=(t.stringToBytesFuncs={default:function(t){for(var r=[],e=0;e<t.length;e+=1){var n=t.charCodeAt(e);r.push(255&n)}return r}}).default,t.createStringToBytes=function(t,r){var e=function(){for(var e=S(t),n=function(){var t=e.read();if(-1==t)throw"eof";return t},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n()<<8|n();i[String.fromCharCode(a<<8|u)]=f,o+=1}if(o!=r)throw o+" != "+r;return i}(),n="?".charCodeAt(0);return function(t){for(var r=[],o=0;o<t.length;o+=1){var i=t.charCodeAt(o);if(i<128)r.push(i);else{var a=e[t.charAt(o)];"number"==typeof a?(255&a)==a?r.push(a):(r.push(a>>>8),r.push(255&a)):r.push(n)}}return r}};var r,e,n,o,i,a=1,u=2,f=4,c=8,g={L:1,M:0,Q:3,H:2},l=0,h=1,s=2,v=3,d=4,w=5,p=6,y=7,B=(r=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],e=1335,n=7973,i=function(t){for(var r=0;0!=t;)r+=1,t>>>=1;return r},(o={}).getBCHTypeInfo=function(t){for(var r=t<<10;i(r)-i(e)>=0;)r^=e<<i(r)-i(e);return 21522^(t<<10|r)},o.getBCHTypeNumber=function(t){for(var r=t<<12;i(r)-i(n)>=0;)r^=n<<i(r)-i(n);return t<<12|r},o.getPatternPosition=function(t){return r[t-1]},o.getMaskFunction=function(t){switch(t){case l:return function(t,r){return(t+r)%2==0};case h:return function(t,r){return t%2==0};case s:return function(t,r){return r%3==0};case v:return function(t,r){return(t+r)%3==0};case d:return function(t,r){return(Math.floor(t/2)+Math.floor(r/3))%2==0};case w:return function(t,r){return t*r%2+t*r%3==0};case p:return function(t,r){return(t*r%2+t*r%3)%2==0};case y:return function(t,r){return(t*r%3+(t+r)%2)%2==0};default:throw"bad maskPattern:"+t}},o.getErrorCorrectPolynomial=function(t){for(var r=k([1],0),e=0;e<t;e+=1)r=r.multiply(k([1,C.gexp(e)],0));return r},o.getLengthInBits=function(t,r){if(1<=r&&r<10)switch(t){case a:return 10;case u:return 9;case f:case c:return 8;default:throw"mode:"+t}else if(r<27)switch(t){case a:return 12;case u:return 11;case f:return 16;case c:return 10;default:throw"mode:"+t}else{if(!(r<41))throw"type:"+r;switch(t){case a:return 14;case u:return 13;case f:return 16;case c:return 12;default:throw"mode:"+t}}},o.getLostPoint=function(t){for(var r=t.getModuleCount(),e=0,n=0;n<r;n+=1)for(var o=0;o<r;o+=1){for(var i=0,a=t.isDark(n,o),u=-1;u<=1;u+=1)if(!(n+u<0||r<=n+u))for(var f=-1;f<=1;f+=1)o+f<0||r<=o+f||0==u&&0==f||a==t.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(n=0;n<r-1;n+=1)for(o=0;o<r-1;o+=1){var c=0;t.isDark(n,o)&&(c+=1),t.isDark(n+1,o)&&(c+=1),t.isDark(n,o+1)&&(c+=1),t.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(n=0;n<r;n+=1)for(o=0;o<r-6;o+=1)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(e+=40);for(o=0;o<r;o+=1)for(n=0;n<r-6;n+=1)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(e+=40);var g=0;for(o=0;o<r;o+=1)for(n=0;n<r;n+=1)t.isDark(n,o)&&(g+=1);return e+=Math.abs(100*g/r/r-50)/5*10},o),C=function(){for(var t=new Array(256),r=new Array(256),e=0;e<8;e+=1)t[e]=1<<e;for(e=8;e<256;e+=1)t[e]=t[e-4]^t[e-5]^t[e-6]^t[e-8];for(e=0;e<255;e+=1)r[t[e]]=e;var n={glog:function(t){if(t<1)throw"glog("+t+")";return r[t]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return t[r]}};return n}();function k(t,r){if(void 0===t.length)throw t.length+"/"+r;var e=function(){for(var e=0;e<t.length&&0==t[e];)e+=1;for(var n=new Array(t.length-e+r),o=0;o<t.length-e;o+=1)n[o]=t[o+e];return n}(),n={getAt:function(t){return e[t]},getLength:function(){return e.length},multiply:function(t){for(var r=new Array(n.getLength()+t.getLength()-1),e=0;e<n.getLength();e+=1)for(var o=0;o<t.getLength();o+=1)r[e+o]^=C.gexp(C.glog(n.getAt(e))+C.glog(t.getAt(o)));return k(r,0)},mod:function(t){if(n.getLength()-t.getLength()<0)return n;for(var r=C.glog(n.getAt(0))-C.glog(t.getAt(0)),e=new Array(n.getLength()),o=0;o<n.getLength();o+=1)e[o]=n.getAt(o);for(o=0;o<t.getLength();o+=1)e[o]^=C.gexp(C.glog(t.getAt(o))+r);return k(e,0).mod(t)}};return n}var A=function(){var t=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],r=function(t,r){var e={};return e.totalCount=t,e.dataCount=r,e},e={};return e.getRSBlocks=function(e,n){var o=function(r,e){switch(e){case g.L:return t[4*(r-1)+0];case g.M:return t[4*(r-1)+1];case g.Q:return t[4*(r-1)+2];case g.H:return t[4*(r-1)+3];default:return}}(e,n);if(void 0===o)throw"bad rs block @ typeNumber:"+e+"/errorCorrectionLevel:"+n;for(var i=o.length/3,a=[],u=0;u<i;u+=1)for(var f=o[3*u+0],c=o[3*u+1],l=o[3*u+2],h=0;h<f;h+=1)a.push(r(c,l));return a},e}(),b=function(){var t=[],r=0,e={getBuffer:function(){return t},getAt:function(r){var e=Math.floor(r/8);return 1==(t[e]>>>7-r%8&1)},put:function(t,r){for(var n=0;n<r;n+=1)e.putBit(1==(t>>>r-n-1&1))},getLengthInBits:function(){return r},putBit:function(e){var n=Math.floor(r/8);t.length<=n&&t.push(0),e&&(t[n]|=128>>>r%8),r+=1}};return e},M=function(t){var r=a,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+2<r.length;)t.put(o(r.substring(n,n+3)),10),n+=3;n<r.length&&(r.length-n==1?t.put(o(r.substring(n,n+1)),4):r.length-n==2&&t.put(o(r.substring(n,n+2)),7))}},o=function(t){for(var r=0,e=0;e<t.length;e+=1)r=10*r+i(t.charAt(e));return r},i=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);throw"illegal char :"+t};return n},x=function(t){var r=u,e=t,n={getMode:function(){return r},getLength:function(t){return e.length},write:function(t){for(var r=e,n=0;n+1<r.length;)t.put(45*o(r.charAt(n))+o(r.charAt(n+1)),11),n+=2;n<r.length&&t.put(o(r.charAt(n)),6)}},o=function(t){if("0"<=t&&t<="9")return t.charCodeAt(0)-"0".charCodeAt(0);if("A"<=t&&t<="Z")return t.charCodeAt(0)-"A".charCodeAt(0)+10;switch(t){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+t}};return n},m=function(r){var e=f,n=t.stringToBytes(r),o={getMode:function(){return e},getLength:function(t){return n.length},write:function(t){for(var r=0;r<n.length;r+=1)t.put(n[r],8)}};return o},L=function(r){var e=c,n=t.stringToBytesFuncs.SJIS;if(!n)throw"sjis not supported.";!function(){var t=n("友");if(2!=t.length||38726!=(t[0]<<8|t[1]))throw"sjis not supported."}();var o=n(r),i={getMode:function(){return e},getLength:function(t){return~~(o.length/2)},write:function(t){for(var r=o,e=0;e+1<r.length;){var n=(255&r[e])<<8|255&r[e+1];if(33088<=n&&n<=40956)n-=33088;else{if(!(57408<=n&&n<=60351))throw"illegal char at "+(e+1)+"/"+n;n-=49472}n=192*(n>>>8&255)+(255&n),t.put(n,13),e+=2}if(e<r.length)throw"illegal char at "+(e+1)}};return i},D=function(){var t=[],r={writeByte:function(r){t.push(255&r)},writeShort:function(t){r.writeByte(t),r.writeByte(t>>>8)},writeBytes:function(t,e,n){e=e||0,n=n||t.length;for(var o=0;o<n;o+=1)r.writeByte(t[o+e])},writeString:function(t){for(var e=0;e<t.length;e+=1)r.writeByte(t.charCodeAt(e))},toByteArray:function(){return t},toString:function(){var r="";r+="[";for(var e=0;e<t.length;e+=1)e>0&&(r+=","),r+=t[e];return r+="]"}};return r},S=function(t){var r=t,e=0,n=0,o=0,i={read:function(){for(;o<8;){if(e>=r.length){if(0==o)return-1;throw"unexpected end of file./"+o}var t=r.charAt(e);if(e+=1,"="==t)return o=0,-1;t.match(/^\s$/)||(n=n<<6|a(t.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i}},a=function(t){if(65<=t&&t<=90)return t-65;if(97<=t&&t<=122)return t-97+26;if(48<=t&&t<=57)return t-48+52;if(43==t)return 62;if(47==t)return 63;throw"c:"+t};return i},I=function(t,r,e){for(var n=function(t,r){var e=t,n=r,o=new Array(t*r),i={setPixel:function(t,r,n){o[r*e+t]=n},write:function(t){t.writeString("GIF87a"),t.writeShort(e),t.writeShort(n),t.writeByte(128),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(0),t.writeByte(255),t.writeByte(255),t.writeByte(255),t.writeString(","),t.writeShort(0),t.writeShort(0),t.writeShort(e),t.writeShort(n),t.writeByte(0);var r=a(2);t.writeByte(2);for(var o=0;r.length-o>255;)t.writeByte(255),t.writeBytes(r,o,255),o+=255;t.writeByte(r.length-o),t.writeBytes(r,o,r.length-o),t.writeByte(0),t.writeString(";")}},a=function(t){for(var r=1<<t,e=1+(1<<t),n=t+1,i=u(),a=0;a<r;a+=1)i.add(String.fromCharCode(a));i.add(String.fromCharCode(r)),i.add(String.fromCharCode(e));var f,c,g,l=D(),h=(f=l,c=0,g=0,{write:function(t,r){if(t>>>r!=0)throw"length over";for(;c+r>=8;)f.writeByte(255&(t<<c|g)),r-=8-c,t>>>=8-c,g=0,c=0;g|=t<<c,c+=r},flush:function(){c>0&&f.writeByte(g)}});h.write(r,n);var s=0,v=String.fromCharCode(o[s]);for(s+=1;s<o.length;){var d=String.fromCharCode(o[s]);s+=1,i.contains(v+d)?v+=d:(h.write(i.indexOf(v),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(v+d)),v=d)}return h.write(i.indexOf(v),n),h.write(e,n),h.flush(),l.toByteArray()},u=function(){var t={},r=0,e={add:function(n){if(e.contains(n))throw"dup key:"+n;t[n]=r,r+=1},size:function(){return r},indexOf:function(r){return t[r]},contains:function(r){return void 0!==t[r]}};return e};return i}(t,r),o=0;o<r;o+=1)for(var i=0;i<t;i+=1)n.setPixel(i,o,e(i,o));var a=D();n.write(a);for(var u=function(){var t=0,r=0,e=0,n="",o={},i=function(t){n+=String.fromCharCode(a(63&t))},a=function(t){if(t<0);else{if(t<26)return 65+t;if(t<52)return t-26+97;if(t<62)return t-52+48;if(62==t)return 43;if(63==t)return 47}throw"n:"+t};return o.writeByte=function(n){for(t=t<<8|255&n,r+=8,e+=1;r>=6;)i(t>>>r-6),r-=6},o.flush=function(){if(r>0&&(i(t<<6-r),t=0,r=0),e%3!=0)for(var o=3-e%3,a=0;a<o;a+=1)n+="="},o.toString=function(){return n},o}(),f=a.toByteArray(),c=0;c<f.length;c+=1)u.writeByte(f[c]);return u.flush(),"data:image/gif;base64,"+u};return t}();qrcode.stringToBytesFuncs["UTF-8"]=function(t){return function(t){for(var r=[],e=0;e<t.length;e++){var n=t.charCodeAt(e);n<128?r.push(n):n<2048?r.push(192|n>>6,128|63&n):n<55296||n>=57344?r.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&t.charCodeAt(e)),r.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return r}(t)};

(function () {
  'use strict';
  var LOGO = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADYApIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKKACiiigBhLEkYwPWmeb5ZwzZP0pxzuJ6+1V7i4SFC0jpCPWQ4H60QvIzqPl1J/MZhkD5ab5nzZL49sV5r42/aD8C+ApJYNX8QxW1xEMsIR5n8q8O8Vft+6ZayP8A2B4ebWYF6XRfZ+OK6qeEqzeiMJ4qEI3Z9fGQAZ5P0FIJQ2cAj/eBFfnfrf7cvjfV2kl0tE0yB/ublDFa4y8/ay+K14SsvipHiP8AyzSAKfzxXprJ671OL+06Z+oYlXu6Z+tI0rfwhW+hr8rH/aK+IchLJ4gdCf4SKfb/ALSfxOgxs8QnHuK0/sWr3J/tOHY/U4SucZUj6DNP8zjnP5V+Y1h+1v8AFWwkG7xFHJEOkZhBP54rstC/bt8YWEg/tGzW/XuQNtZyyPER1NVjoPU/QhWJHX8aQFs43Zr470D/AIKCWEkqLq/hp7OL+K6V85/CvVvDP7YHw08SlVi14QTHrHIhGPxrz54KtS3idMcXTfU9uMoT7x/SnZJGRyPSsLRvGei67axXNjqtrNDJ9396uT+FbKOW+YOGU/3ea5HCUdzpjOMtUyYE4yRikLCmg5H+NIQazbaNEkx+aMGjHAo5qiW7C80ZxSc0lK6Qaik+9GfekopagLn3oz70lFGoASc0ZJ60hbmlzmnLYOV7ik8Ugpe/NI3HFTKfLG9ihGJ3cdKVicUA4FBOASacJcyTJty6sRSxPPSlLZ6U3OR7U0lc8NzVtpbi5nLVIk3hcZOKPMX1puAeozRtX+7STiVePUd5i+tHmL603av92jav92ndBeI7zF9aPMX1pu1f7tG1f7tF0F4jvMX1o8xfWm7V/u0bV/u0XQXiLvX+9RvX+9TcL/do+X+7RdE3iO3r/eo3r/epvy/3aPl9KLruF4+Y45PI6U4nimjpRmp5VuF0haUtigGmFx6U2yvi2JAcilpqHIp1AbBRRRQBG0gzjODUe4+vFDBGfHegIAampZK7YJRlsx4PHWl3gA5NNJAPAoPAyRVJpoi8UwWXccdDS7igyaQBQNwXmgHecMOKd4jbi5KweZvXC9aarMoJanhAgJHWmbuzDIp3T2JnZTTHByxBHQ0+hcADApQKhMu1ncM4FNbJ+7Q+O5pgZR/FUqSUg97oh4kA6nml8xfWmkA84zRtX+7Wl0O8eo7zF9aTzF9aTav92jav92i6C8RSSTx0oIPamsyjgnFIDkZU5ounomS5SWttB6hs8085qFGJOKkzmpcQjPn2HLS0g6UtMoKKKKACiiigAooooAKKKKACiiigDk/iV4tHgbwZq2tu20WyZUnse1fm38Rv2kPHPjy6ntbjWH/s4sQEiGz5fqK+1P2ztZGn/BHV7VW2zXZUL+BGa/N0SmQpGFAJUZP4V9hkmGhU96aPAzDE8vuiu7bjud5s8kztvP60wHByML7KMCgqUO0ndjvRX2TpUaT2PnJ1JVIg3zMSep9OlKrFemPypKKXMuhCirA3zsWPWkKg+tLRRcfKgX5BgdPenNKzLtJGKbRT5n1K1WwL8nQA+xGaY0SM27aFb1QYp9FLlov4kPmki3pepXukXP2i01C6gkHK4mO0fhXpvhj9qn4l+Eyqf2559mn/ACzdNxxXk4YSfu8YI70oM8Z28MnvXHUwlGp00NY4mpF6H174Q/4KBXSQQxav4fN2i/fvFbbu/CvaPCX7ZXw48UmOJtYOn3h6wSoQB+NfmvKUjbLN9nHZgMg/hT1F3KmTaR3MH/PVcI1eVUyWjPZWO6GYVI7n7B6R4w0bXrVJ7HVLWdJPukTLn8q145QwzuV/dTmvxt0vVbvSLrzNN1C7s3HIj85toNej+HP2lPiV4UdfK1oywr2f5q8WpklVN8rPThmMLK5+pZlVmK8gj1FKWGcZ5r4A8O/t7+KNPZVv9LXVyPvfwZrv9I/4KBWEzD+1fCz6cndxLux+leZUyqvF/Dc6446k+p9fNkHls0EnsM186af+3J8PbqNGlunhJ6gp0rVX9s/4WMuZNdaM+nlGsXgcXHaBssZS7nu6gkZPHtSfl+deEH9tH4WBPk15pP8AZ8o1z+r/ALdHgayz9ljkvQPQYoWBxb+wH1ul3PpdmCKSx49RTfPwRhTt/vHivjLXf+Cg0CCQaf4WfycfurkyZ5+leS+Jv2wPiP4mEq2GpJY2b/8ALPYAcfWuqllOIqNcysc1XHwjsfoV4k8baP4Vs3utV1SCzt1/i3gt+VeQ2X7YPhrxJ8Q7Hwp4bt5NWuLk4FxjaBjrX57634l1rxPqBuL7U57m5bmRGkOz8q9h/Y20F9V+OGm6i0islkjgoFxyQe9elXyqOGpOc3dmNLG+0dkfpHE7PGpddrEcj0p7/dqG34ViRj5jx+NSSn91mvl7cr0PUvendnO+PPFI8HeGbvVWjEqW6ElScc9q+Pbj9uvWoJpETw15u1yN3mdu1e6ftdasNJ+CWuFM+dMUA5xmvznBZYN0p2hgDwfavncxx7oaJn7fwRw3hc3wVStXjdp/ofUv/DeesIcN4d2t6b6P+G9tW/6F/wD8fr5YQDaNgLL2Y9aXH+x+tfPrM6r1TP0aHBeT8q5qep9Tf8N7at/0L/8A4/R/w3tq3/Qv/wDj9fLOP9j9aMf7H60f2lW7l/6lZN/z7Pqb/hvbVv8AoX//AB+j/hvbVv8AoX//AB+vlnH+x+tGP9j9aP7Srdw/1Kyb/n2fU3/De2rf9C//AOP0f8N7at/0L/8A4/Xyzj/Y/WjH+x+tH9pVu4f6lZN/z7Pqf/hvfWP+hf8A/H6P+G99X/6F/wD8fr5Y2/7H60bT/cH50f2lV7k/6l5N/wA+z6mP7e2uH7nhneOx8yrFv+37qcJBuPCe4f8AXSvlIfKPvbT6U0sr/eJxT/tKqupL4KyV6Omfbnhv9vPRtQ2jVNIOlg9WDbsV6x4S/aV8D+MnWKw1lfPP8Eg21+ZYEcJ3LbBs/wDLQnOfwp0Qkjbzrecxv6Rnb/KtY5tVXxHi4rw7wNWLeHbT9f8AM/X2x1SK9jDRSJOh6NG24H8qlkugOiZx94HtX5jfDb9oDxl8N542s7lrqyU5ks5W3GQexNfanwd/aX8O/Fm1WF3XTdUUYksJDg59j3r6TB4+nV0Z+PZ3wpmGVtuKvFdUe12s6XEQdPumpqhtXR4gUGB6VNXr3vsfFJSStLcKKKKBnMeP/FcfgnwxfawYhN9mXOwnHNfH/wDw3jrX9ptCPDXmopb5vMx9K9x/bA1VdJ+Cutqg/f3JULz71+cqK8MUksrbQVHQ+1fL5niqlJ+6z9n4H4bwebYepUxEL2Z9Tr+3vrO0hvDu1skYD5pB+3trAP8AyAP/AB+vleJQIwEBZf7x60/B/ufrXiRzKry7n6VQ4KyaVOUp09j6n/4b21c/8y//AOP0h/b21c/8y/8A+PV8sgH+5j8aTB/ufrVSzKsluEOC8llHm9mfUUn7emtpgr4dLA9Pnqez/b41e7mht18PeXK0ioSX9TXyyvmrJEVUFBzjNbvw/wBGHi7xxpdhHDh5p1cYP901tRzCrPdnJmPCWS4fCOtGnqj9WfC+qXGsaHZ3l1B9nnmjV2iz93IrTLYUmqWixCDT7WIfwQon5Crb/wCravt6XwJn8u1be1dlpc8b/aD+Nk3wh0WG5hshdTT/AOrBbGa+e2/b11Uizz4ZKhgfMbfUn7eOqJf+IfDOmqx3W+4yDPFfLcolL+UUDIOmDXyuYZi8PVaiz944V4WwuY4ONWvDVn1Iv7emrKCBoG4djvpf+G9tW/6F/wD8fr5aO0nKR4X60mP9j9a8z+06r1TPt3wVk6dnT1Pqb/hvbVv+hf8A/H6P+G9tW/6F/wD8fr5Zx/sfrRg/3P1o/tKt3D/UrJv+fZ9Qv+3hq0z7F8P/ADjr89dl8Hf2wNX+IvxDs/Dg8OmHzskyb/SviuL95KUWLY69XJ619C/sU+Hnv/idLqciZWyBG8e9deBxtatU5Wz5vP8AhfLMDl1WvSgk0nY/QSNi0e4rtbuPShHyxpsY2ZQHjJNNQcmvs0p8p/OScbNoso24U6o4fu1JVLzITugooopjCiiigAooooAKKKKACkOe1LTWOMfWla4bHx9+39rxsrDwzYCTEdyz709fSviCLJtX/wCe4OFPtX0v+3f4gGt/E6x0oN/yDF3EemRXzadqski/dbIr9CyqDp0YW7Hx2NXPUlcjChAAKWkGT1pa9+ouZbHmxSQUUUVCk0rWCyCiiinzy7CsFFFFVd9S7oKKKKm67By36hk4xS7j60lFUidgVipyMH680jrvOSWHsDgUtFO7AQgFNpHA/OmrGqdM/iafRRdhYG+dQp6D04pqIIvu8/73NOoqWkx3aEdVkYsyJuPoopPLT/nmn4qKdRTHzPuN8tM/6tB/wEU4YH8K/wDfIoooDmfcF+ViwHPp2pHHmdf04paKpWuUnzLUdEAskan/AFbA59a+u/8Agnh4fD3HizUZ493luot3P8IPWvj6cMQpXsp/lX6IfsM+Hhp3wmTUMfNfMST64r5/O52os9LL43qan0cVCocU1+Y1FSEZT0pCOBX563ZNn1bjeHKj5N/b08QG08N6PpAkxHfE74x/FiviSHaREOSqDDA19Mft062up/ELRbANkacCXHpmvmaU7LVpF/5aNxX53mcuaq0f1fwPReGyaHTm1+8dyT83WjFOY5IPsKSvKSsrH3iWgmKMUtFMdhMUYpaKAsJijFLRQFhMUYpaKAsgHFLu+lJRQFkIRnr09KNoB4paKBp8uwRQI8gZmOV6DNWtO1O40bWodQglaG5hOUkjOMH39aqtFuXKtz6U5SMYYZNUpyjszOpCNX+Irn33+yz+0EvxEsl0TU7tX1u1XDuePNHbFfQcs8pKyI2I1OCv96vyV8J+JrzwZ4gtdb0qQ295YOCcHAkU9f0r9Q/hj43tfiN4J0zX7X7k8YBT0Ydc/jX3WV4r2keWbuz+Y+MsiWWYz29ONoS6dEzskY7VNKCST6UigbBRvw22vba1ufme7Z8jft5eImt9I0PSzJiK5J8xP72OlfFajdGsfXPUGvpP9uTWV1f4j6fpatk2ILMPTNfNwcbPtC/dHGa+CzOpzVpI/q/gXCvD5dTltzK/3g5LNk9enFJihc4569aWvChufdyXLUsthMUYpaTvWj1NKCSg15jooilzC4JAYHdXrv7JeijUvjlojMm+2hDlh6da8iViWXH8INfUH7B+hfbfEWr6ky5NoQAfTNerlcOeqkz4zifERw+VYjme6aXq9j7mRPLdFThecinliQPTPNKuD+FV76YWtnPL/cid/wAhX3svdhofyPG8pH5yftceIG1T4zazatJvjtQoiA/h9a8atWEaFlyJPUmun+JmsjxL8Qtb1V23ebMyfka5Zxz8vSvzXGtVKruf2bkFFYbLKMYqzUUNClc569aMUuc0VzWse3vuJijFLRQFgY+ZH5f8IGTivsr9gPw75GneItRZT5FyV8knnp1r40bKxSEdSpA/Kv0O/Yy0VtJ+C+jSsMSTlyx/GvfySF6rZ+Y8fYlUspdFbya/z/Q97iXILHrUioAM0iDg08DjFfds/l+mrRBcdqdSDilqTQKKKKACiiigAooooATPNBPWkP3qVqUthIYGPzknioPNKRfOfmALZ9hUzLwwJwTWdrlytnpd7cOcLHbyHP4VcFcyqOx+Yv7S2ut4h+OXiO8gUTIdsYOfTivLyViiWN/k28hK0Ne1Aa54j1W5+0eVO1zJlmOMjdVSxs73ULr7PDpM983/AD1jQsP0r9Sw86dKhD0PhpxnUqy9SEOpUZOG7ingbh8vWvT/AAz+zV8SfFMUdxaeHMadL9yeRtrH6ivStD/YI8T6ptOoaqNMJ6gDdiuermlKGlzoWCqSPmT51JUpz65penLDFfZdn/wTvSNVM3jOQv3AirST/gn9pygB/FMjf9sv/r1gs7w2zOhZdVsfEOS5yqAIejZpMqn3nz9BX2xP/wAE+LCYny/FsiD0EXT9axNQ/wCCeN/CC1h4v809g0VNZ3hmH9nVUfIasjfMGJH90jFDsR/yyAHrmvonxB+w94/08uLGSPVlHTJCbq881/8AZ1+I3heNn1Lwo0MQ/wCWsUm/9BW0Mzo1HZM5JYGrHU84V3PSIFf72aRjt68H0FW73S77T5HiudLu029XaJgKqo8OcIQH/uscGvUp1oTRzOjUiwU5GaWlIbPzAZ9qSm99ACiiikAUUUUAFFFFABRRRQAUUUUAFFA5opN2ZUOoqhmGQcLuCEeueK/U79nHw+PDPwg8P2WzyyI95H15r8u9EsJdW1ezsIhl57qI/gGr9fvDlmmn6Hp9soCiK2jAHvtr5DPanuxie9lsfebNQnIqvLKY4gxPTk/Snq+F3N2qprU622m3srHGIHb9K+Lk/cufTxV5qJ+an7TutHW/jd4hkV98GFVR6eteWFQY0jPKJyo9K1/FuqNrXijVb1m3F7h1yfY1k1+bYyXPVbP7NyvDrCZdQpx7ICc0UUVyHtbBRRRQAUUUYoAKKMUYoAKKMUUAFFFFABRRRQAgGGyOtLnJ5oooAbKpeB9x7jbivsT9hfxs8z694fubjcg2m1h/u+uK+PScvGvY161+ybrD6P8AHPSfmIhuAyuPWvTy+q4VUj43jHBwzPJ5yitYa/cfpgGHlZ/Cq8khikXcecbifYVKBuG3sTkVR8QzpZaVeXLnAjt35/Cv0Pm5YXP5KprmqW+R+a37S+t/238cvEF3FJviAVEx2xwa8tVFSDyQP3Wc7fetTxLqLav4i1O7dtzPcSDJ/wB6s2vzHE1OerJ+Z/aWTUlg8vo010igJJx7cUUUVyrQ9d+97wUDrRRVIle7FhEcGU+ik/pX3P8AsJeG/sPge81XZta/b5m/vYr4XmGIQF+9Idv51+mX7Lehnw78GNCtnXEhUsfxr6HKI/vLn5L4iV3Ry6EV9pr/ADPWSc9Dj1rlPiRri6D4O1a9dgqxwOuT7iuoZiGwK8X/AGutW/sv4HazsbbNMVC/nX2OI92m2fgOV0frOY0aDV+ZpfifnFO5muLp2Od87tn6mmKdowKXsp9QCfyoPFfl1aV6x/aOHgqMFTXTQKKQUtJnQ9GFFFFAhQC11Yqv3XlVJB65OK/VL4PeH08O+AtIsY08qKOIOE9MivzK8C6K3iLxbpenKMvLOjD8DX6w6TCLXTrWLoEgRfyFfUZKrSbPwbxJxDjUpUFs9S6p3DIp2cCmpwAKQnGa+wZ+GbXJFORS0yP7tPoBaoKKKKBhRRRQAUUUUANPWjcaXFNpRXcljX4bPX09q5X4iaVqOr+CdRsNOk8q+uUMaSf3c11DZRiw+YHt6Uk0hRlAUkEdQOlVCXvaBO3LqfJfgD9g7QtNCXPi3Um1V2cyvaKNu0k5619F+EPhf4X8EWaw6LpFvbRgcb1DH8zV7XfG2i+E9Oa71bUre3hXqxcFvyrxHxt+234D0GNhpEza7dDjyVG0Z+td6+s1vdV2jjtRprmsj6IhREjyqCMf3U6fkKcG3d2H1Br4O8Sft9eIL1ZF0nwwNKY8B2k3Y96851D9rr4q6oHA8QR28bfwLEAfzrsp5RiKtmc88xpU9LH6bmZB1eMH3ak+0R/89Iv++6/Ka4+PHj25JebxBKZm+8RkVT/4XV463f8AIem/M10f2JVXUzWaU+x+syzxscB0J9FOaXdgdGH0BNflLbftCfEKxAW18VPHIv8AAyZxXSaT+1x8XLDAm1yK5T/ajFS8lrfZY1mdPqj9NNpcZ3N+opCiSfIyK49H+avgPQf29PFOkhE1LT11eUffVRtBr0jw1+33pOoSr/bPhx9ITvJ5m6uOpluIp9LnVHGUpo+ndY8H6Fr0L21/pltOjDkCIA/nXlHin9jf4beI45Hi0gafdtyJY3PX6Vo+Fv2qvhx4snSG08QKt0/BhkTbtP1xXptnrFnqIWSC6tpVbkFJgTXK5Yihom0PnpT6Jnx54s/4J/TRxzT6F4iMjfw2rr0/GvFfE37K/wASPCavJPooubcHiWN8k/gK/TxSW5Gcew/rSybApEgyD2bmu6lnGIh7stTGeEpT1Ssfjnqek6ho13JbX2m3dvLH97MLbR+NU1ZSchl/3WIBr9fdZ8L6H4itXt9RsLa5gfgr5IB/OvKPEv7HHw18RRu9vpP9n3Lc+ajnH5V7FLPF9uJwTypy1iz83B83IQD8aa3ynkce1fZniL/gn2haSTSvEjRr/BblOn415frv7FXxH0xm/s23j1JR0JcLmvUhmlCavzHlzwdWDcbHgiiRxlYAU7MWoYAfeOw+3Negap+zp8R9GlkS/wDDrpMn3vLbcMe2K5i88Fa9pDYu9Lu4yOu2BmrvhjaLW5g6NRdDEAX+/u+op20nouanls7oOV/sy/Z/732ZqfBoepzn5NPvl+ts1a+2pb8wKnPaxV2SD78YSP8Av55oKxrykpmP9zGK6jR/hb4q1hw1loVzcl+FaRCoNdvof7JXxT1qdXfQ0tLc87mkANYyxVCGrkaKhUlsjyFgzruMYhHpnJFMR1c4iU3Lj+CPlvyr6+8G/sCX0zx3utax9klk/wBbbgbhivefBH7Kvw+8C3MN3b6KtxqKcm6kOQT64ryp51SotqPvHYssnpK9j4y/Zu+EXiDxd8RdB1KTSprXRo2LPJMhUtj61+lkahAVHPlqFAptpbrbR7EhijwMAxoFFP8ALKoQp+c96+QxePeOqaq1j6XDYeNGOg8oGDKRwe1cF8bddPhn4aa3qIfyjDEVDntniu9j+UAE7ie9eA/ts64th8FNRslbbLeMgGO+DXj15KnTZ9Fk9D6xmeHha65lf0vqfnoWDvM4/jkZ/wA+aKVlChAOyL/Km1+YVfertn9nQjaXL0WwtFFFD3NGFFFFIB0dvNPcWsMUeWmkVA2fU4r6Cj/Ys8XXMKzx3ASOVFdB6ZFeUfCTQU8UfEXSdNdyC0okUY9Dmv1OsAywRRhiBHGq/XAr6HLsCqvvSPyHjLiXHZZiadOhZKx8Fn9iHxoOlwrD19aQfsR+NTx5y5+tfoEudozk++adg46frXuPK6d9j85/1+zVNr3fuf8AmfntcfsWeNLcAmQN9D1ry7xt8JPFPw8u2XWNNdbb+GZRkV+qDnypT5rna/Cr6Vj+J/B1h4p0SfT9ShjuRMpUMy5Iz0rlq5ZGMW0j0su8QsdSmniIpxufkxDHvQtv3DtSRMCGDDJ7V1vxa8ETfDT4hatoRbdHA29SPRulco6DaGXqa+Rqx9nUsz+g8FiHjsPDE7Keq9GMXIGD1paKKze53tW0CiiikADOGY/eUfL7V3HwQneD4m+HHiO2YyfMfxriFH7xVH8Qru/gHbG5+L2hRdlfP610YRN1keTm1qWX1+ziz9SYSxigbP8AAM1wPx518+GvhXrl8H8vy027vrXe27bY1B6BAK+ff239dFh8HrzTlbbLfMu0euCK/Q8VLkw7fkfyLk9B1szowSveS/M/P5mDvI46O5f8+aSnOoXYB0CL/Km1+bS1k2f2VTilBR7BRRRUmwUUlLSq6JWF0syezgN5dWkKD961xGB9N3NfrL4H0xNG8L6ZaquxEt0OPQkV+Y/wZ0IeI/ijoWnkbhI+/H05r9TLGIizii6BUVR+Ffa5TTSp81j8A8SsT7StRoReiV7EzjOSO1fKX7eHiJrHwzomkGTm9JJX1xX1g4wOO5Ar4N/bq1xNS+IuhWW7jT1JcfUV25rNxo6HxHCGHdfOaUrfDqfM4OQPYYpaUrtYj3zSV+fbu7P62esU13Ciiige4UUUDrQB61+yroh1n44aIXXfbwhiw9+1fpUgKKVPOOB9K+Ff2FNEN54z1jUCMi1xg+ma+7cbs+lfd5TTUYJn8u+IGK9vmyin8KSHRMSDUg5WmIuFNPX7vvXvNq5+ay+IcvSlpAMUtIYUUUUAFFFFABRRRQAnc00dafTKOhL3IpEZ96odjcfNXy/+2L8f9d+FU+jWHh27W0urjImcpuz6V9SSg4ABxyP51+b/AO254jOr/F+90tQG+wKhz6ZxXp5XhlXrcrOLG1HCndHi+v8AijWfE19LeatqNxdXMx3P+8O0/hWUUUkfKuR3xzTnJZsk5OOtJX6VChRgkranxbqVm/IQcHOTn60H5uT1paK0tb4S0k/iEAxS7jRRVXIcVcCcjGB+VM8sdcn86fRRcXKhdx27e3600qCMHke9LRWbipbgnJAAFXC/u/eP5T+daeg+KNY8MXAn0zVbyCUf35mYflWZRS9hhn8SN415I9v8KftffEvw35ZuNTTVrROlsUAbH1r2fwj/AMFBLK9kSHXfDj6eehmDZBr4nUoshxMYZO5xkVI0czYYyrdL6EYrzq2VYOpeyOyGOqR6n6deF/2qvhz4peKGHXkgu24MEi4Cn64r1Cx13TtSiWS1vra4RuQUlBr8dVJx89t5KDpsbDD8a0NE8Waz4buhJpOtXdmw/vSMwFeFVyPX92zvhmbW5+w33wMcj1FDOqD5tw/OvzH8P/tZfFHQZEjOti9tE6bk616Vo37fniKwAGo6Cuo46kNjNeZPJ8VHZHdHMsPLc+7fKR1yVVl/2xk1A1pYv1toCfeEGvk/Sv8AgoHplzGn2zw09o5+8BJnFdRa/tz+B5Ywbjdat6Fc4rkeAxUd4myxeHfU+hP7LtWOVsLRl9fJWpE0u0HBsrVT7QivA0/bb+G7rk3zs/8AuEVRv/26/A9sv7gPP+FJYHFPaIfWaC6n0SsdrFOYxHCpHRViAxVoE9CjAeq5r5A1f/goPpkDuNO8NPej+Fy+M1574p/bw8Y6vEy6Rp6aJ6O2HxWscrxc/smbx2Hj1Pvx7mC3Us8qxgdfOfbj868r+If7TXgb4d+bHeaulxeoOLeH5sn0yK/Pfxh8b/H3jiEHW/EUk8UnGIP3eB+FcRMhKsFma9ZlJKTHcx49TXrUcknFc9fY4quYKTtE/UH4FfG0/GePVr2GzNpYwkCAHnPvmvVW3MyMsnygHcPWvCP2LtBXTPgjpNz5At3vCxaPuOT3r3cLHECUBJr53FRpwqyVLY9ii5TgmwjVViXaNoHQGvjv9vfXyE8O6XHJ8jFvNT19K+xTn5c9a/PX9tHXhqPxYk0/dn7EAcema+azaq6dH1P0TgnC/Wc2i39hN/1954DtKjB6iilc5Ymkr4Hf3j+sox/d83kFFFFMxWqCjrRQKCj279kTQW1j4xaZdFQ0NkGzx0zX6NIQingBc18UfsEaGZdU8SahIMqm0IfSvtUqdhU8DrX32V05Kmmfynxxifb5tKN37tkPKEng8UvmICBmlQKy00xKpJNe23ZnwChGLbZDMrPISpwF6g96LcZVm+6zHoac6szA5wvesrxLr9p4b0e71O7lWOGCNmDMcDOKirUSg0VT9rXkqcI7ux+fn7YU0P8Awt7W441xOAm45614grMkCgnk10nxI8XT/EDx5q2uzZ/0iQqB7A8VzsrBsY7V+ZYx81ZtH9oZLSnHKKFOW8El9wdevNFGc0VzHsLYKKKKBjlVpHVEOJuqt6etes/sraV/anxz0AkbocOZB7ivJEkMW+VeWj4H0NfUv7CPhI3fivW9akXKWoHkt6Z616eXw5qyPjeL8T9XyepK9rqx9vxgFyvbJFfHH7fuunzfDOnRvhct5i+tfZAGyYY7nNfnv+2nrg1T4tTWG7P2EA49M19fms+TCs/BuDKCr5zTv01/Q8CwVAB6iildtzZpK/PE7q5/VklZ2CiigdaYgoo7UVL1kipq00vI9y/Y68Otq/xhsdQC7o7BW3H0zX6KWwKu4J4ydtfGP7Auit9o8V6gy5BKeWa+0vLIZCOwr9Ey2NqKP5O4zxHt81qL+XT9Rk37o8fdHzGvzK/ag1Ztf+NHieYSb4oygiA/hx1r9LNYuBaaVdyvxsgc5/CvyY8Was2reL9WvGYsHuHVifrXFnMrU7H0XhxhlWzCdR9ImVLIkj7kGFwBj3ptDII2Kjp1o718TDU/o2lrTl5MKKKKYlsNkDfKV6D71LkOWK8KFJpyHCSk9O1RTxskUSR/emyBQB9zfsI+HBZ+EtR1Uphr08v64r6mHAA9a8g/ZR0M6D8EtDikG2dgzMfWvYOpU+lfpWAhy0IvyP424irfWM3ry7Sa+7QVOEA708Hn6Uwn5sUu7k11t+8fOp3uyRTkUtMj6U+tGC1QUUUUhhRRRQAUUUUANByaaWINPAwabjmheY0Q3j7YXY/woW/Kvyh+N+vjxJ8YfEF8rb2lfZK/rtOBX6j+NtZj8P8AhbVNQlOEht3/ADIr8idQm83VNQu3bL3FxIwJ+tfU5CrVuY+ezSVo2RUwBwOlLTVBAwetLX3M6q5nofORem4tGKKKj2j6IVr9QopKKftH2K5RaKKKnnfYdkFFFFPlb1ZPOtgooopcq6k7hnIxx+VHTocUUU0kUNKAnJJP408OVGBj8qSiqu0ApZiMZ49qSiinzMnlQmOOlBVT1VT+ApaKzcU9y1oN8tP7if8AfIpwAH8K/wDfIoop2Q7sM+gA+gozg5ooqrtEWTBl5Mg+/wDpT4VEt5ZyIMSGVY3I75OKanB+b7pFbfw/0VvEnjHSNOiG43Fyjgf7rVjiqj9k7s6MOuaR+pPwc8PL4X+HOh6eqeXshD7fqM124UEZxVTTYfIsrWPGAkKJj6CroHFfk9WXNPmPtaKcY2K90xiilk/uKWHtivy6+PurjxD8Zdc1Df5iM21iO+K/TXxbqSaVoGo3Uhwsdu/P4V+SWr3r6hq17dsd3nXMnPtur5XOpXgkftvhrQviq1aS2VrlUNv56DNLTpVVHIXpTa+Lp7H9BxbVO3mFFFFWVsFBOFY+in+VFFAj7w/YosLDSPhmdRkubaGW9J3CSYKxx6ivoddesDEC2oWRb1+0LX5GxXlxbKUimukD9o5iq/gKc91cyKEW6vcryf8ASWr6qhmsKVOMLbH4pmXAFfH4upiXW+J32/4J+uo1/TlHF/ZD/t4WkOv6e3XULP8A8CFr8iv7Rum5Nze/+BLUfb7n/n5vf/Alq3/tim+h5j8NK7/5fL7v+CfqN42+LvhjwZBLNqWrQQhBnajht3sK+Ivj/wDtK6h8VxJpGkh7DQ1b5nzgyivEZUXVisVzdXE7RcpDJISB+J60s0qTMkN1+5kT/Vog4P1ry8TmEpr3XZH1eTcEQy+oqtT3muv+Qm4ABU+4BjkU0ADpT5fN8w+eoWXHIXpim14afO7s/VbKlT5IgBjiiiik9GEFyK7CkzS5oqeYl1Gnew13ERDAfKflb3J6V+i/7InghPCfwrtLyWIx3moZaQHsO1fEXwY+Hdx8TvH+n6XGm6zikElyw/hwcjNfp9p2jpYaXHp8OIYo0VEAHTFfWZJhXd1JH4b4iZxGpRjl9Le92W75xBE0g6qhYfhX5c/HPWz4k+LviLUWfzdzbNw9q/TLxjqSaR4Z1K6kPEFu4z+FfkxqF09/q11cMc/aLiQ59s1051P3FE4PDbDqrVrYhrZWT8yHcH5HAooO3Py9KK+LWx+/wbcU2FFFFMsR/uHb94daJmAiDJwNpz+VCjbLg9HBxSRoXhhiPWWQIPxOKukuaaJlNQi6kuh+gn7E/h5LD4T22pKmyS+J8xv72K+iQcAmvOP2ftC/4Rz4VaJpwGDEm78+a9Hk5jyOa/SsLFQpJH8ZZ7WeIzKvU7yf3XOF+Nmut4b+Gms3/mBDHEV3fWvyuZxNdXhP3JJGf8zX6F/tq6+NN+C2pWatia7ZQv4EV+eTrtSHHVlH8q+YzepfQ/bvDegqeCq1mtW3Z/IdyOD1ooznmivl0nY/X4XjR9QooorSOwlukIRkHdzH/EKltI3vL6xSP7xnRY/YE81ED+5nQ98Yrr/hFoZ8SfEzw/pijP7wOw+hzWuHhzzscGY1/YYGpO9mrn6efD7Ro9G8IaXaIu0JAjY9yOa6PywPxqvpieXZwp/cjVPyFW6/TKS5YJI/iyvN1a0qkt22xpQE5o2jNOorSxjsIBiloopgFFFFABRRRQAUUUUAJnmjikHJprHBqW7NC2PHv2r9ZfRPgb4knjl2TFVVPxIr8wd8t3AjmALj5txPc196/t7+IHsfAmmaWrbFv3IJ+mK+DMIjtagPcsFHyRDJ/SvuMmp8tPn7nzGZSu7D5GGe5fuB0pm8nqm38a6fwr8K/GHisxro+mTyQufkikjK4/E1654b/Yj8eaw6nUoE0lW/i3hiPwr3J5hQpu0meXTwdSaTR8+B0HBJJ+lO+/8AdC/i2K+xdO/4J6zYR7vxkQT1iEPT8a6a0/YD8OIgFxq8ly3c4xXG87w0WdkcuqnwkxZGKlEJHcOKXMY5eTZ9Oa+9v+GBvCQGVu5Eb1yTWXf/APBP7Sp/+PbxI9t/2zzWf9uYe5q8uqWPh0HPMa74+z9M03dz83y19f6p/wAE9b2Lc1n4uM/ojR4rhNf/AGKfiBpasNPtY9Tx0zIFzXTHOcMzllgKiPnwkMP3Z3N6Gly6f62EJ/tA5ruPEPwP8c+EQ41XQ5YZU5ZIQXAH1FcQ9td28pE2m3MTDr5qFR+tdkcVGprE53hnHcaCCMqcj1paC4ZudiN3UMOKMV0RfMYNcoUUUUxoKKKKACiiigAooooAKKKKACiiigAByj7udo4r139kbQ/7W+OXhssnmW8AkZh6HmvInYCPb3NfU37Afh77b4t1jUWXJsRgH0zXj5jU5aMrdjtwSvUPvSMYB9OlSDpTIzlM9Mk08dDX5m3edj7WKtE8q/aY18+HPg7r14r7GChM/WvzGT5skcQZ3hfc197/ALc2vpafDJdGLYk1NhtH+7ivgWclbULH0AVTXyGcSvKx/SHh3huTLJ4jvL9B+QeR0opXUIwA9BSV8zHRH61U92cI9woooply3CiiigQAnj2pVJRiw4J60lJilyoXK+4uMdqMUmKMUcqDlfcUklcfqOtGflxwR79aKKfI2J1Kj90RRtGOfxNLRRTS5So+78Qd6KKKmTuS3zSXYMFwEQZzy8v/ADyot2+0srKpVM7EPeVu2KEDfvYk+WGbmZj7dAK+jv2WvgBN401S38S67bGLRbNs2tuw/wBYfWu3DYb2rPIz7OaGUYZ1JntX7H/wh/4QTwxLrV/b+VqeojdJu647fSvowPlFZjye9MtLFIoPLAAQAKqjjAHSpSqMPKI6V+i4anGlSSifyBmePq5ljp4qfU8r/ab1n/hH/gzr86y7ZWUKG+tfmdEC5dE4x88ftnrX3V+3R4h+xfD620oHD37DA9cV8LRusBEw6IoU/lXx2cVHKdj+gvDnDexy2pU/mb/yI0AVcDpTqRVKLg9Sc0tfPLY/VI6IKKKKZQjHdLFjqoNaXhjTG1jxFpFmo3FrhDt/Gs8YUFj2r0j9m3Qzr3xn8PWzjKEs5z7c1vhFeqkePnFX2GU163ZM/S/w5Yrp2k2UCLtCwIMfhWoAANuOKjjAUKB0A2/lT88/jX6dTXuI/jGcnOTk+p8aft966wXw5pscmI3Lecnr6V8gEhtgXjHAr6B/bS15dS+LEumls/YlBwe2RXz9HhpoVXnINfnuZ1HKtJH9V8H4VYbJ6TX2lf7wYYOBSUinIJ9zS1wJe6fd1Vyxgu4UlLRWCdkFNXq2EbsRwFI3V7h+yH4dOofHGzu1XdFaod/tkV4dICYmjX77kEfhX1t+wRojTap4i1KVcldoU16+VQ56qPh+MMR9Xyut6NffofbEK7Qfqakpkf3afX6FFWSP5MvfUKKKKoAooooAKKKKACiiigAooooAaxINJSls0wnBrJyaa0E1ZXPA/wBo79nu/wDj3rOhW7aidK0vTmLtIoyXz2ra+H/7LXgLwEEmh0xL3UVA3XMvO4/SvV57tIvN8yZYlXqZTtUfia868bfH/wAD+ApDFqOrx/aAMiKI7s/lXq0515R5KbfyOGpKlvJI9GtLK2so1SG1hhA6LHGBj8qmcspyEZvxNfHnij/goBZxzTxaJoDXMI4jumbG78K8n8QftrfEPV940ydNNz0BUHFdMMqxNRczMXj6MPdSP0cWQMgMm1D/AHSelR/abeM5EsKn3kFflhe/tGfEnUWZr3xS/wBob7yomABWPJ8VvGF6xM2tTy59HIrrWS1XuzneaQXQ/Wj7bA3P2iE/SQVIs8Tj5GVvoc1+SqfFbxfaYEGqzoB0zITWtp37RPxK03Ag8UNCB/eTNDyOp3Es0i+h+qR+eQ5jOP7wzSyHZyWZR+Nfmppf7YPxS07YJdYjv41/iMYBavQPD37f2t2eE1XQBfnuyttrmlk+IR0RzKiz7na3gnXLxxSg/wDPRQT+tc/4k+GXhjxbatFqej21xGeu2MKf0rwPwr+3Z4O1SRBrVi+iyH738W2vYfCvx88C+M3VNK8QQzOeiyHZ/OuOWGxNB3s1/XkdcalGquh534s/Yk+H2tRSHTLRtFuG/wCWivu5+ma8V8V/sDazpqPJoWv/ANrt2gdduPxr7otp7ac74poZC3eOQNUjHZ1J59BitKeZYmj9pszqYWlPoflf4r/Z5+IfgwSPqPhxmhTnzIm35H4V53NbT27kXVvdWZHUSQkD86/ZNoY5hh4lkX1cZrnfEnw28N+LbZoNV0W2uIj1KxhT+Yr1qWfS0U4nBPK1vFn5FCSBhlJwx9MjNHnR9GBH+0BX6L+KP2J/h7rUUn9maedHuG/5bK2cfhXlOtf8E+r63jeTTfGBm9IHhA/WvXpZ3RdlI86pl9SOqPj8bD91y34UoBH8G+vdtZ/Y1+JOnyyJa2Md5Cv3Zd4Bb8K4rUP2fPiHozlbnw+7YP8ACc16UMZQqaqRwuhUi7NHnpUk54T/AGaUqOzCujvPh54ltJGjl0C6WReoEZNUh4I8RFv+QFd/9+jW6rUn9oXsanYx1MbOUMpDjtinmMqeMOPc4rprL4ceLLsBbfQpyT0DRkV02lfsx/EzXm3Q+GSydfnk20p4ujTW4406kny2PMmD54jCr7GmecpO0KC3ua+lfCX7CXjPVxG+r3aaFG33oQ2/ZXtngj9hXwjoEok1m7fXiByhG3P615VTOqMNtTvhl1SfkfB+j+GtV17UIbXTdOmvribgKqnap7c19/fsefCDWvhb4b1OfXLX7Pe6iQzHOfpXsHhX4c+HvBNklro2iwWMcf3cgM3510qOtuyxSuS0n3Rjivl8bmjrxcbaM9bC4RUqqfZE0e5FVS2fen7yJMdqZjafWk+425j3614aSk+Y9eLvJo+I/wBvjWjc614fskf57Utgema+VdmyCZPcEV7R+15rLav8btVtg26G0Cba8ayJJWA5yK/OcfOUsRNN9T+tuFMJ7DKqEY6JpN+rGN1H0FJRu3c0V5x9tNbNh+FFFFGw2rK4UUUUvaJERm+wUUZopXT1NLrsFFFFGgadgoopDWm3UhVpTfLFC0UUdOuB7mk6jXQcueOskLtMe15vljb/AFYHO/6+lIMzSEY8mUc+R13D2rQ0Hw9qXiW/W00W0lu7yQ4ZQuUb6HtX1t8EP2PIbWW31nxcPPukw6af2Q+5716OEwFSrLma0Pkc74jwmV0rt+926nmP7PH7Od38Tpk1fWkktNADgxROu1pCK++fDuiwaJpiadZwLa21uoVAo4IqzY6bb2NukK26QRIAESMYAH4VoEZGOiV9xh8NClGyR/NOd59Xzmo/aPTouwxVCoWPUdKcAdoJ59KcwGwims4SIMTwCOa7JtKDPmIxtGx8O/t6a0bzxDoFgkmTbE5X0zXyvKoMVxGo+UkEivZf2t9YOo/HHV0D74LdUC+nSvHMFZHz/H0r84zCXNWep/XHCFH2GTU1a11+YO28g+wFJTVUqMHrTq4D7FbBRRRQUG0tx2NfRH7FOhDU/idNqJTcumrtQ/3civnbJ2Ow6KK+z/2DPDpg0DXdSZcvcsNp+lerlNNSxavsfB8bYl0Mpny7PT79D66VmUj0JJqtdTuiSOpxtUsPwq2eWUe1Yviq9TSPDt9dv92O3kH4kV+gppJ3P5Voxcqqitb7H5n/ALQOtL4m+Mev6lv8zcRGGHTjivP0/dsrLwy9DVnU7tr/AFS/uHO5nuZDk+marV+YYh81WTfc/tDKqKo4GlSStZIQDHT60tFFY3PWeu4UUGkoaTWhcY8kucWMnzi38Sqdp/Cvvb9iPQPsPw1TU9m2a9Y73/vYNfBEindAi/elYJ+fFfp3+zxow8NfCjRNOYbZETcePWvfyWNql2fjviLjX9VVKC3f/BPUgQo64o8wf3qRV+UbhmjavpX3N49z+cY2tqL5g/vUeYP71JtX0o2r6UXj3K93zF8wf3qPMH96k2r6UbV9KLx7h7vmL5g/vUeYP71JtX0o2r6UXj3D3fMfu460057U0uuduaU5XFKMlLYltw6aC/N60UbzRT1D2iGuSH9qgvrj7LazzMcCOJnz9BmrDoGJBPFcd8WvEcfhf4fa1qTnCRwMmfqMVdNKpJRRNefLC5+d/wAYP2hPGPj/AFjUtPm1tv7CjnZIYIBsYYOOSOteTTM1xMks0sk8icK0r7v50so/0i5YHIeZ5PzOabX6jhMLSo0k2j4yriG5Bnk8AewFJjnNLRXWrdDjbT3FDkDAx+IpG+br+lFFPmsLlQgG0YGfzpTyKKKOYORCAAdMj8aMDNLRS3CyQHBHKqfqKVGaI5jllhP/AEybb/KkoqeWnPSSD2lSGx1Phn4o+K/BpjbRteuYHQ5CyuXx+dezeD/25/GuhMv9uwrrKL/dXaTXziCcYVMf7VIZGi5eXA+ma5quBwk/iR20sbUXU+9/CP7fHhPVIov7as5NHduGH3ttew+E/j54G8bOq6T4hhkc/wAMp2fzr8pxIX+cKhQ/xlRzQvyklZpQfSFin8q8WrklCWtN2PQhmU18R+ykN/b3ABiuYJSf+ecgbNSFmGSFYt9DX5G+G/id4q8JbE0jWrizjjOUEshfH516doP7ZXxM0h1F1qkeqRD+ExAH88V49TJa0fhdz0YZpRfxH6SDDD5shu4zSNEjj5o0I/2hmviLSf8AgoPqtpEkeoeEftLD706y43V1enft96RfAC58Nvb59ZM/0rz5ZXjIvY3+t4eWtz6vFhbkc28B9/LFINPtCeLa3/79CvnC1/bo8GBFWWFoHHVOuKsP+3L4IRcjeT6YrN4HFLdD+tYfufQ5trWLgwQqfaMVIkeBuUjb2CjFfLGq/t7+HbcObHS21A9lzjNcVrX/AAUG1GaBo9P8JHT2PSdpQ36VpDLsVJ25RPF4ZK9z7dWTH3lZPck4rH8ReN9E8KWT3eqajbWsCdT5g3flX50+JP2vviJ4k86GPWxplq4wNsXP515Fq2ta1rd21xqT3Gp7jkzNcEL/AN816dLJK0vjOOeZQj8J93/EH9uDwvoV1b2vhu0fxLLcTJEWXKhSTjNfRuk3c1xZW9zc/K9xEkiw4+5kZxmvys+DeiSeJfidoulW0aIbiVXLEA52nNfq1bloY44hHkRxqhf0wK5Mzw1LCqMI/M68FX9vTlPzLCIAo+Xb7ZqDUX8u1uGc/KsbOPwFWAP3IxXMfEXW00Lwpql9I21Yrd1J+orwJy5IXR6uFpSq1Yxjuz8y/ixrx8SfEjXdS37/ADpDGW9dpxXIp+7YsvBp0shkubtyc77iRs/U02vzKvLmqyl5n9qZZFUMHSp9khAMcCloorA9FvmCijigUnroTSvJtPoNdS7LscqF+/x1pVkQySnjY3CEnpT4CwkRGcNHLKibMepxX6A+BP2XvAt14U086pohuJzErs27HUV62Ey54g+Rz7ibD5Ilzq7fY/PrBThmBPrmkz7j86/S2L9lT4ZCMY8PYHoZDT/+GVPhn/0L4/77Neg8knfc+OXiTgba05fh/mfmfn3H50Z9x+dfph/wyp8M/wDoXx/32aP+GVPhn/0L4/77NL+xJ9x/8RJwH/Puf4f5n5oq4A5Uuf8AZ5qSC2uLt8RW1yR/sxE1+mdn+zR8OLFx5WgIGHqxNdXpnw18O6GB9h0e2THTcgNEMlqJ+89DCt4l4eMX7Gg7+dj82fCfwS8Z+MWR9K0aS7hkOAZQU2/nXvvw+/YXk82K68VascMOdOA/TNfZEFiluuY4oofRIlC4/Kp+X6jJHY17NLKqUfi1PhMx46zTGfwZciOM8A/Cbwx8PdNjtNG02O0Ve7AM2frXaxQJH90daYoQAAjYfSplxjA5r2IUowVl0PzytiMTiJudeV2+t7jREo+nvTgoXpQRmlxitLmCjFaoaMAMoqlqJNvpNw0hzsjZ8/QZq3MpeNgv3q5r4m6zHoHgfVr6RtqpAy5+orCs7QbOqhF1KsYLq0fmH8UdcPibx9rN+z+YJJSmfoa5gncVJ/h6UsrF7i6cnJed3z9TTM1+Z4mV6rP7UwVBYfL6MV1SFJLHJ60UUVid4UUUUADkiB1X+MEfjX6K/se6EdI+DWlSsm26mLGRj3HavztRfOmtIl6tMin8TX6rfCnRR4f8C6XZhdoSFW/MV9Jk0P8AaL+R+MeI2IcMPDDp7u51/JlBB4rzH9pPXR4d+Duu3av5bBQoP1r08kLGK+aP25vEAtfh1DogbEmpNlR/umvpsXPkpzfkfjORUfrOZ0KX95fhqfBgO7LDo7FvzpaONqhegUD8hRX5vJ3dz+yoR5IqKCiiipLDGDSUpPNHSqgTBuT1Hxssdzaz/wCs8hg7R/Q19F6P+2zf6Rp1vaWujmd4VCnBx0r5x3SWmJUUMH60rSLGA0UgjduvFdOGxbw89GeHmeS4XNLRrRvY+oP+G9daPTw+R7F6P+G9Nb/6AH/j9fLwUgcnzf8Ab6Zpdp/uD867pZnVvozxVwbkyVpU1c+oP+G9Nb/6AH/j9H/Demt/9AD/AMfr5f2n+4Pzo2n+4Pzpf2lW7j/1OyX/AJ9n1B/w3prf/QA/8fo/4b01v/oAf+P18v7T/cH50bT/AHB+dH9pVu4f6nZL/wA+z6g/4b01v/oAf+P0f8N6a3/0AP8Ax+vl/af7g/Ojaf7n60f2lW7h/qdkv/Ps+n3/AG8tWikgZ9BO13CHDdCelfYfw88RXninwlY6heRfZp51DlPQV+VGh2Jv9as7US/NNcRkRYzjBr9YvCtuLHw9YKowqQRjH4V9DlmIlXvzM/IONsswWV8kMPC1/wBDZ+1QjjJ/Kil3g84FFfRWPyLniOYfMT+VeD/tlaqmlfAnWrdH2S3RUJ6nkZr3llJkU9hXyD/wUB1s2+jeGtLV8C6Zyy+uK6sDTUq8UjPFvlptnxCCSiZ5O0Z/KlpFyFweo4pa/UYzcaajY+InNOQUUUU1doV0FFFFOzHdBRRRT5WVeLCiiijUXKmFFFFTZB5ChiBQHI9PxFJRScU9xWsDHcST39KM8Y7UUVS0AAdoAHSlLkjB/Skop3ZPKuwmOMZOPrSnldp6UUUXKGiNFGAo/EUu1T/CPypaKhxT3GAwo4AH0FHfOTRRTSsIUsWGDg/hTNgz1b6Zp1FVdhZHuv7GXh1tU+OGl6iqlksEcOewyDX6QbSzSKehNfFX/BPXRCb3xbqTrkAoIz6V9sAfP7ivzXO5KpXaXQ+wy6HLSt0YpO1CB1GK8Z/a41RtI+CWuPDJ5c8u0KfX1r2cAbTn8a+Uv26/ExtPDuj6QGwL0nI9cV8zjpcmGbR9pw7R9vmdCPTmX4anxCCCqleAQCfrilpAu1QPSlr83bu7n9kKMVokFFFFIYUUUVnV6WLWkZWNvwVoza/4r0vTgu+Sa4R0H0NfrJpdsINNtYwMEQRqfwFfmr+y5ob618bNFlK7obUMWr9M7bgbey8V95lCtSuz+bfEWtGeMpU49I6/MmVQBS4oXpS19AfkaVhMUYpaKBjDEpOe9BiU9qfRTux3GCJQSR3oMakg96fRSJsiNoVY5PWnKgXpTqKdyrsTbRjjFLRSJsRMAhY5rxH9rvW20r4I6wFk8uecqqfnXtsozInp3r5L/b31822heHtJVsfbWYkeuK83HycaTsfR8O0FXzbDxkrrmX4HxOmRGu7kkAmnUf0GKK/OZO89T+ypL3+VbLoFFFFAmFFFHWgDovh9of8AwkHjvQtNC72uJlfb/umv1e06EW9naQgfKsKKfwFfm5+yjoTa18ctCnK5hs1fdX6UxHCgngAkfrX2WUw5aXP5n84eJGJVXH06a+zH9f8AgD3IyvpXxF+3jrn2jxN4Xso3+e137h6Zr7clIQDPYg1+b37W+tDUvjXrEYbclsq7R6V15vPkoq3U8XgbDqrm8JNbanjG0ISq9M5oo579aK+Eluf1XLdhRRRUkhRRRQGwDgk+tIAAc4paKVle4bahmjNFFMVkwzRmiigVkGaM0UUBZBmjNFFAWR6D+z/og1/4w+H7MpvDMWwfav1BSJUgWHHyooX8q/Pz9i3w82qfFZdTAyunKQfbNfoNGdyMx4yTX3GU0+WKkfzJ4hYj22ZRprZJfiODYHQUVHteivprH5v7OPYsk/MR6mvz5/bv8TfbfiPp+lg7zYLlB/dzX6CTnYrMeijd+Vflt+054hHiD44a/OCCqlUTJ9K9fIaTlXcnsjxMwl+7seX7JXONgUd3JqM3Foj+X9pdpf7oTj86u2mk3OqTiIWNzO5+6YULKfxFeoeEf2Yfij4ojR7fRY7bTH6SykBsfjX3c8xw9CfLM+Uo0XVmeTCOXHMYx/ez1pDtT7zD6A19XaN/wT51m9jjk1DxD9k3feiAztrtNL/4J9aLaqPtGvyTt3+SvKqZ1RUnZnof2bUk7o+HfOjfhVH1JpdhIzuUD6ivv2L9hLwgFG+7d37tjrTZv2DvCMo4vJFrL+26If2ZUPgYRSFeERx/e3DmkIZfvJivt3Uv+Ce2i3Ejm01+WyB6EDNcfrX/AAT41W0Utpvi86kf+eLx7f1rWGdUZO1yXllRanygSi5Ytgf3aZ5kchwrlPwr2/X/ANjn4k6Q0htdHS6gTkSCUZP4V5xrXw48VeF9y6npE8G3qUiLV6VLMKVVaM55YSpDRnMsFjH+s3e+KNpxuDbh6U/E8Y3T2siwdnkXYT+BphKP80DAj0BzXXfm1RztWdgDbxnG32paTJPXrS0CCiiigAooooAKKKKACiiigAooooAa4YgbOD3p25d7H+EKSR74p0JxcIp/jBpkUZYrH3lfZ+dAz9Cf2FvDosPhQNV2bG1BiSf72K+j4wfKLscsTzXm/wCznoB8MfBzw/YEbWSMsR9ea9M2ho8V+WYyXPiJ37n3OEjy0IjHPGPU18Ffty68NQ8a6Zp+/c9jnaP7ua+8pG2lz2UZ/KvzL/ac1j+3PjPrcwbKIQq18pnFTlo2P1Xw8wn1nMpTa0gm/noeXEY680Upye1JivhFsf06ndBRRijFMoKB1oxSHgE+gzRJXaE376j3Pp39hfQxf+LNZvim77LgBvTNfdcCsJJD2PSvln9hHw6bHwjq2qMMC/YbT9K+qSQrA5xiv0DLly0kfyRxfiJVs2qxf2XYlHSlpq06vYPjAooooAKKKKACiiigAooooAKKKKAI24618Cftza8t/wDEDS9OD7m07JQf3c198yNtZiegGa/MT9pfWRr3xs165V90aEKv4V4eZS/dtH6ZwDhfrGa8zXwxueYsME02lyW5NGK+C+2f1C9feCijFGKpmad0FA60Yo6Kx9ATSGfUX7COhm98U65qDJkWu0K3pmvuVIyHYN9zqor5d/YX8PNYeCNT1TH/AB/sMH1xX1LgllOeg5r9Dy+CjhYn8jcXYiVfNqt3s7FLVJSlncyA42xsw9sCvyr+LOtr4i+Iet3zN5krylGf1wa/Tr4jasuheEtTvXO1I4HUn6ivyfuD9pubyYnLyzyN+teXn07U4I+88OMNzV6lV9BrZzz1xSUZLDNGK+Q3P3+W4UUYoxQIKKMUYoAKKMUYoAKKMUYoAKKMUYoAKKMUYoAcoCjLdDSBS5JXgUx8sUXoKfd5Rdkf3ip/lQI+xf2BvD5gg8SahImfOKhXr7CMY5HYV4R+xlov9m/BbTbtlAmui24+uDXu5fBb8K/Scvhy0Y+h/HnElb6xm1Z32lb7tBMtRUwQYor0ro+b5iC9JdHhU4eWNlU++K+YPC37FOm3viW517xlfnV5Z5XZrUDaCCeBmvqSff5ZMYBcdM0yURu8YkH7zsM1dOrOl8DsYyhGfxK5zPhP4YeGPB1hFbaRo9vbRR/dDoGI/E11CWyoAFXaB2XgU+JmZAXXYfSn1Epym7ydyY0oR+FCbRjFIEAPAp1FQaiYFGBS0UAN2DduxzS7R6Y+lLRQBH5Qz1P0JqC40u1ulKzW0EoPXfGDVuindolxT3R5z4r+Angfxm8p1PQopHkGC0fyD9K8Z8XfsFeF9QDf2BfNopb/AIFivqdyN2KYVA6Lk/Wuunjq9PabMJYSlPXlPzy8W/sNeNvD7SLo0yeII15V2YIWrx7xJ8L/ABR4NLLrujXFk69okMg/Sv1sPKsXBjA6EHrVa6sYLxVElpBdIeplQH+derSzmrDSWp5lTLYy2PxyJCjLRSoP+mqFTS5RxnzFUexBr9VPFPwE8DeLppZNR0KF5ZBhjGNn8q8l8VfsG+C9TRm0aeTRJT0bO/Fe1Tz6nJWkjill8loj4FwuNwbKdj3poDOcRrvPoeK+qtd/4J+63p6s+l6//acgGQzrtz7Yrz3Vv2Qvirp6tjQ472IfxJMATXo08zw9S15JHJLA1Dxh1CORI/lv3QDIH40Yz935q7u7+BfxA0wmCbw7JCU6oMtj8ax5vhh4qhbE2jXKn/ZjNdv1jDdZGPsJrSxzoWTug/Ohl464roovht4mmwkXh26lP/PQqRmt3TPgB8QNU5t/DsgB/vHFH1jDfzi9hPsefqN/yowZx1p3MZxJHt9817XoP7HfxI1m5UT6Cmmxt/y+mYZP/Ac1614U/wCCfLxOs2u+KmuD1MCp0/GuGpnGHp3StobwwNWTufG0zxQyxytK7ED5I4F3t+Qr0b4b/Avxx8SrzTL7TNCki0yKdXmmmBQlQfQ197+AP2YfAXw6eO9tdIjuNTUfvLub5wx/3TwK9Xt7WO12xokcSkfKsS7R+leBic6cv4aPUp4C3xEegaYmk6PZ2ca7VhhVMe4HNXgACSOM0sYIQAnmnEV8q5czcn1PcUeWKSKd8rtBMsa4ZkKg+5FfDnjL9kHxb4h8U6pqb3YKTyFk9hmvumUrhix+739KjKo2Mk89Oa4a+HjXVpK57+WZxWyiTnh3Zvc+BT+xF4wc/Lcqw9aP+GH/ABl/z8L+dffqIyoACW9807D+h/OuD+yKD1PqlxzmqWjVvn/mfAH/AAw/4y/5+F/Oj/hh/wAZf8/C/nX3/h/Q/nRh/Q/nS/sigP8A15zbuvu/4J8Af8MReMBwbkCl/wCGHvGDKwF0uSpH6V99yK27IJx9aQI3cn861jldJdDOpx9m0/dsvuf+Z5r8A/htefDL4a6Xol5hr6AsZZAfvZNenbQVO7knrQoAHXNKdvpmvThSUEkj4XE4mri6sq1T4pO7JFII4paauMcU6tDmXmFFFFAwooooAKKKKACiiigAooooAztQSaSOZI/vPGyj6kV8ReJv2N/GGv8AiS/1OS5G24kZhz2zxX3HNJGHbccFe9PRwWZRkEVz1sPGstT3MrzfGZTN1MPZN/kfATfsQ+MFJH2kEetH/DEPjEj/AI+F/Ovv8LgcksfXNBT6/nXl/wBl073sfVvj/NUre79z/wAz4A/4Yg8Zf8/C/nR/ww/4y/5+F/Ov0Aw2OAfzpMP6H86f9kUOpK46zZ9V93/BPgE/sPeMSvF0oNA/Ye8YlXDXK8qRX39sY9c/nSbWXsfzpf2RQH/rzm3dfd/wTzv4B/Dy5+GPwx0rQrshr2Dd5z+uSa9GVcZJ71GI3ODUiDaOTXtQpxpwUI7I+BxNR4itLEVHeUndnnvxt8N6p4x+HGs6PpTeVe3GFjf2718fj9iTxXFHA32obhy/1r7+k+aVSDwOo9aQKGbJJIboM1yVsNCv8aue7lXEWJylOOG6nwJ/wxF4vc5juBto/wCGH/GX/Pwv519/KDtG3J/Glw/ofzrheU0HqfQ/69Zs9U19z/zPgD/hh/xl/wA/C/nR/wAMP+Mv+fhfzr7/AMP6H86MP6H86X9kUA/15zbvH7v+CfAH/DD/AIy/5+F/Oj/hh/xl/wA/C/nX3/h/Q/nRh/Q/nR/ZFAP9ec27x+7/AIJ8Af8ADD/jL/n4X86P+GH/ABl/z8L+dff+H9D+dGH9D+dH9kUA/wBec27x+7/gnwB/ww/4y/5+F/Oj/hh/xl/z8L+dff8Ah/Q/nRh/Q/nR/ZFAP9ec27x+7/gnwB/ww/4y/wCfhfzo/wCGH/GX/Pwv519/4f0P50Yf0P50f2RQD/XnNu8fu/4J8Af8MQeMv+fhfzo/4Yg8Zf8APwv51+gOMev50fgfzo/sqmtkL/XnNu6+7/gn5/H9h/xiSn+kLx15qaP9iPxcNQika4UwjhhmvvoAZOcj8aTHJGDj1zR/ZdPsH+vObd19z/zOR+Efg5/AngLTdEk+/bA5x712JiU5yOvWljQIuF6e9Or2aceSKiuh8DXrSxFWVae8m2/mFFFFWYDSgYEHvSGJSysRyvQ0UVNwHAYpaKKLgFFFFUAUUUUAFFFFABRRRQA049KTAoop2RHMw2AZPr60hjBI9qKKylFFpsXHNG1e9FFFkldDtcRkVhg5x7HFIsSqOCx+rE0UVnKpJC5UNa3jc5aNG+q5qM2FuetvCfrGKKK6IttXuHJHsAsbcf8ALvCPpGKkW3jT7qKv0XFFFPXuLkj2HbB6kfQ0u0UUUyuVCGNcHjr1oIzgkdKKKmye4w+7wKeeRRRT2RjH4mMbDggjINIVRiMjpRRTNnFSWoDC9DS7veiipcExKKQbvek3e9FFLkQ+UGQE8nFARfWiiqu0jLnd7DsAdBSYb0FFFZOTHuSLnHNLRRVrVFBRRRTAKKKKACiiigAooooAKKKKAI5IkcEMuc0hUnGB06UUVmpO4NXVhNpHXgUpdRjJoorbdXCFOIFgTwaN3vRRUuCK5UG73pC2e9FFLkQcoD607b70UVWyM3BC7MdqYYumB93pRRRca93YcTjHak3e9FFTyJ6l2uG73o3e9FFHIg5Q3e9G73ooo5EHKG73o3e9FFHIg5Q3e9G73ooo5EHKG73pN3vRRRyIOUdk9aPzooqtiOVCHn1pcn3ooouHKh46UtFFIYUUUUAf/9k='; // PIL logo, JPEG, 658 × 216
  var LOGO_W = 658, LOGO_H = 216;
  var COUNTRY = { SG: 'Singapore', MY: 'Malaysia', IN: 'India', TH: 'Thailand' };

  // ---------------------------------------------------------------- helpers
  function fmt(n) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rateOf(code) { if (!code || code === '—') return null; if (/^(ZR|Zero)/i.test(code)) return 0; var m = String(code).match(/-(\d+(?:\.\d+)?)$/); return m ? Number(m[1]) : null; }
  function entityOf(port) { var c = String(port || '').slice(0, 2); return COUNTRY[c] ? 'PIL ' + COUNTRY[c] : 'PIL'; }

  // ---------------------------------------------------------------- one model, two renderers (screen + PDF)
  // rc: { no, date, inv, bl, amt, cur, port, cust: { code, name, tax, addr } }
  function receiptModel(rc) {
    var c = rc.cust || {};
    return {
      kind: 'receipt', title: 'RECEIPT', no: rc.no, file: 'Receipt-' + (rc.inv || rc.no).replace(/[^A-Za-z0-9-]/g, ''),
      from: entityOf(rc.port), stamp: 'PAID',
      meta: [['Receipt No.', rc.no || '—'], ['Receipt Date', rc.date || '—'], ['Currency', rc.cur || '—'], ['Amount Received', fmt(rc.amt || 0)]],
      billTo: { title: 'Received from', name: c.name || '—', lines: [c.code ? 'Customer Code ' + c.code : '', c.tax ? 'Tax ID ' + c.tax : '', c.addr || ''].filter(Boolean) },
      ship: null,
      cols: ['#', 'Invoice No.', 'B/L No.', 'Cur.', 'Amount received'], align: ['l', 'l', 'l', 'l', 'r'], widths: [24, 150, 150, 60, 131],
      rows: (rc.items || [{ inv: rc.inv, bl: rc.bl, cur: rc.cur, amt: rc.amt }]).map(function (x, n) { return [String(n + 1), x.inv || '—', x.bl || '—', x.cur, fmt(x.amt)]; }),
      totals: groupTotals(rc.items || [{ cur: rc.cur, amt: rc.amt }]),
      notes: [], footer: 'Generated by GIRS · ' + entityOf(rc.port)
    };
  }
  function groupTotals(items) {
    var per = {}, order = [];
    items.forEach(function (x) { if (!(x.cur in per)) { per[x.cur] = 0; order.push(x.cur); } per[x.cur] += x.amt; });
    return order.map(function (c) { return { cur: c, rows: [], total: fmt(per[c]), label: 'Total received' }; });
  }

  // ---------------------------------------------------------------- invoice document (client format: Proforma Invoice sample)
  var PORT = { SGSIN: 'SINGAPORE', MYPKG: 'PORT KLANG', INNSA: 'NHAVA SHEVA', THLCH: 'LAEM CHABANG' };
  var ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  function words999(n) { var s = ''; if (n >= 100) { s += ONES[Math.floor(n / 100)] + ' Hundred'; n %= 100; if (n) s += ' and '; } if (n >= 20) { s += TENS[Math.floor(n / 10)]; if (n % 10) s += '-' + ONES[n % 10]; } else if (n) s += ONES[n]; return s; }
  function inWords(x) {
    var whole = Math.floor(x + 1e-9), cents = Math.round((x - whole) * 100), parts = [], units = [[1e9, 'Billion'], [1e6, 'Million'], [1e3, 'Thousand']];
    if (!whole) parts.push('Zero');
    units.forEach(function (u) { if (whole >= u[0]) { parts.push(words999(Math.floor(whole / u[0])) + ' ' + u[1]); whole %= u[0]; } });
    if (whole) parts.push(words999(whole));
    return parts.join(' ') + (cents ? ' and Cents ' + words999(cents) : '');
  }
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function dShort(s) { var d = new Date(s); if (!s || s === '—' || isNaN(d)) return s || '—'; return d.getDate() + '-' + MON[d.getMonth()] + '-' + String(d.getFullYear()).slice(-2); }
  function nowStamp() { var d = new Date(), p = function (n) { return ('0' + n).slice(-2); }; return p(d.getDate()) + '-' + MON[d.getMonth()] + '-' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()); }
  function ph(v, p) { return v && v !== '—' ? v : p; }

  // inv: { kind?, no, type, status, pay?, date, due, bkg, bl, cntr, vvd, port, orig?, cust: { code, name, tax, addr }, lines: [{ code, name, amt, cur, roe, tax }] }
  // ---- sample (dummy) values, derived from the invoice so they stay consistent every time it opens
  function hsh(x) { var h = 7; x = String(x || ''); for (var i = 0; i < x.length; i++) h = (h * 31 + x.charCodeAt(i)) % 1000003; return h; }
  var VESSEL = { '01': 'KOTA LAYANG', '02': 'KOTA PEKARANG', '03': 'KOTA SATRIA', '04': 'KOTA CARUM', '05': 'KOTA HAKIM', '06': 'KOTA LUMAYAN' };
  var OTHER_PORT = { SGSIN: ['SHANGHAI', 'JEBEL ALI', 'MOMBASA', 'NHAVA SHEVA'], MYPKG: ['SHANGHAI', 'SINGAPORE', 'JEBEL ALI', 'LAEM CHABANG'], INNSA: ['SHANGHAI', 'SINGAPORE', 'JEBEL ALI', 'PORT KLANG'], THLCH: ['SHANGHAI', 'SINGAPORE', 'PORT KLANG', 'NHAVA SHEVA'] };
  var BANK = { SG: ['DBS Bank Ltd', 'DBSSSGSG'], MY: ['Malayan Banking Berhad (Maybank)', 'MBBEMYKL'], IN: ['HDFC Bank Ltd', 'HDFCINBB'], TH: ['Bangkok Bank Public Company Ltd', 'BKKBTHBK'] };
  var TXN = { Proforma: 'Booking Created', Freight: 'B/L Released', 'DET / DEM': 'Container Returned', MISC: 'Additional Service Requested' };
  function goodsOf(name) {
    var n = String(name || '').toLowerCase();
    if (/polymer/.test(n)) return 'Polymer granules'; if (/furnish/.test(n)) return 'Home furniture'; if (/agro/.test(n)) return 'Agricultural produce';
    if (/trader/.test(n)) return 'Rice'; return 'General cargo';
  }
  var BL_UNIT = { DOC: 1, AMD: 1, SEAL: 0, ADMIN: 1 };
  function qtyOf(l, h) {
    if (/^(DET|DEM)/.test(l.code)) { var d = [2, 3, 4, 5, 6, 8, 10].filter(function (x) { return Math.round(l.amt * 100) % x === 0; }).pop() || 1; return [d, 'Day']; }
    if (BL_UNIT[l.code] === 1) return [1, 'BL'];
    var n = [3, 2].filter(function (x) { return Math.round(l.amt * 100) % x === 0; })[(h % 2)] || 1; return [n, 'CNTR'];
  }
  function minusDays(s, n) { var d = new Date(s); if (isNaN(d)) return null; d.setDate(d.getDate() - n); return d; }

  // QR modules for the Tax Invoice (top-right corner)
  function qrCells(text) { var q = qrcode(0, 'M'); q.addData(text); q.make(); var n = q.getModuleCount(), c = []; for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (q.isDark(r, k)) c.push([k, r]); return { n: n, c: c }; }
  function qrSvg(text, px) { var q = qrCells(text), d = q.c.map(function (p) { return 'M' + p[0] + ' ' + p[1] + 'h1v1h-1z'; }).join('');
    return '<svg width="' + px + '" height="' + px + '" viewBox="-1 -1 ' + (q.n + 2) + ' ' + (q.n + 2) + '" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect x="-1" y="-1" width="' + (q.n + 2) + '" height="' + (q.n + 2) + '" fill="#fff"/><path d="' + d + '" fill="#161A21"/></svg>'; }
  function qrPdf(p, text, x, y, size) { var q = qrCells(text), u = size / q.n; q.c.forEach(function (c) { p.rect(x + c[0] * u, y + c[1] * u, u + 0.02, u + 0.02, '#161A21'); }); }

  function invoiceModel(inv) {
    var credit = inv.kind === 'credit', sign = credit ? -1 : 1, cust = inv.cust || {};
    var dir = String(inv.no || '').charAt(3), port = PORT[inv.port] || inv.port || '', h = hsh(inv.no), cc = String(inv.port || 'SG').slice(0, 2);
    var cur = ((inv.lines || []).filter(function (l) { return l.roe === '—' || !l.roe; })[0] || (inv.lines || [])[0] || {}).cur || 'USD';
    var pay = inv.pay || inv.status || '';
    var badge = /cancel/i.test(pay) || /cancel/i.test(inv.status) ? 'CANCELLED' : (/^(Paid|Receipted|Reconciled|Proforma · paid)$/.test(pay) || inv.status === 'Paid' ? 'PAID' : 'UN-PAID');
    var other = (OTHER_PORT[inv.port] || ['SHANGHAI', 'SINGAPORE'])[h % 4] || 'SHANGHAI';
    var vm = String(inv.vvd || '').match(/Vessel (\d+) \/ (\w+)/), sail = minusDays(inv.date, 4 + h % 6), bld = minusDays(inv.date, 2 + h % 3);
    var voyage = vm ? vm[2] + ' ' + dShort(sail) + '  ' + (VESSEL[vm[1]] || 'KOTA LAYANG') : ph(inv.vvd, '—');
    var extBl = String(inv.port || 'SGSIN').slice(2, 5) + 'SL' + String(60000000 + h * 37 % 39999999);
    var bank = BANK[cc] || BANK.SG, digits = String(cust.code || '').replace(/\D/g, '') || String(h);
    var taxInv = !credit && badge === 'PAID';
    var G = { ex: 0, disc: 0, net: 0, tax: 0, incl: 0 };
    var rows = (inv.lines || []).map(function (l, i) {
      var r = rateOf(l.tax), amt = sign * l.amt, tx = r == null ? 0 : Math.round(amt * r) / 100, roe = parseFloat(l.roe), k = l.cur === cur || isNaN(roe) ? 1 : roe;
      var q = qtyOf(l, h + i);
      G.ex += amt * k; G.net += amt * k; G.tax += tx * k; G.incl += (amt + tx) * k;
      return { head: l.name || l.code, qty: String(q[0]), uom: q[1], unit: fmt(amt / q[0]), cur: l.cur, ex: fmt(amt), dp: '0%', da: '0.00', net: fmt(amt), ta: r == null ? '0%' : r + '%', tax: fmt(tx), incl: fmt(amt + tx), date: dShort(inv.date) };
    });
    return {
      kind: credit ? 'credit' : 'invoice', no: inv.no, file: (credit ? 'Credit-note-' : 'Invoice-') + inv.no,
      title: credit ? 'Credit Note' : (taxInv ? 'Tax Invoice' : 'Proforma Invoice'), qr: taxInv ? 'PIL TAX INVOICE ' + inv.no + ' | ' + dShort(inv.date) + ' | ' + cur + ' ' + fmt(G.incl) : '',
      txn: credit ? 'Credit Note Approved' : (TXN[inv.type] || 'B/L Released'), badge: credit ? '' : badge,
      from: ['Pacific International Lines (China) Ltd. / PIL Logistics', 'Block 5, PIL Building, No. 18 Gongping Road,', 'Hongkou District, Shanghai 200082, China', 'Phone: +86-21-80138801 / +86-21-61235709'],
      to: [ph(cust.name, '—')].concat(cust.addr ? [cust.addr] : []),
      strip: [[credit ? 'Credit Note No.' : 'Invoice No.', inv.no], [credit ? 'Credit Note Date' : 'Invoice Date', dShort(inv.date)], ['Invoice Due Date', dShort(inv.due)], ['Currency', cur]],
      details: [['Customer Code', ph(cust.code, '—')], ['Customer Ref', extBl], ['Document Type', 'BL'], ['Nature of goods', goodsOf(cust.name)], ['Mode of Payment', 'Credit / Cash / Bank Transfer']].concat(inv.orig ? [['Against Invoice', inv.orig]] : []).concat(taxInv ? [['Reference Proforma Inv. No.', String(inv.no).replace(/PRF$/, '') + 'PRF']] : []),
      ship: [['Voyage', voyage], ['BL Id/Number', String(60000 + h % 9999) + ' - ' + ph(inv.bl, '—') + ' Dated ' + dShort(bld)],
        ['Loaded', dir === 'I' ? other : ph(port, '—')], ['Discharge', dir === 'I' ? ph(port, '—') : other],
        ['External BL No', extBl], ['Container Nos.', ph(inv.cntr, '—')]],
      cols: ['Charge head', 'Quantity', 'UOM', 'Unit Price', 'Currency', 'Total excluding Tax', 'Tax applicability', 'Tax Amount', 'Total Incl Tax'],
      keys: ['head', 'qty', 'uom', 'unit', 'cur', 'ex', 'ta', 'tax', 'incl'],
      right_: [0, 1, 0, 1, 0, 1, 1, 1, 1],
      rows: rows, totals: [['Total excluding Tax', fmt(G.ex) + ' ' + cur], ['Tax Amount', fmt(G.tax) + ' ' + cur], ['Invoice Total', fmt(G.incl) + ' ' + cur]], grandLabel: 'Grand Total (' + cur + ')',
      words: 'Total payable amount - ' + cur + ' ' + inWords(Math.abs(G.incl)) + ' only',
      bank: [['Bank Name', bank[0]], ['Virtual Account Number', 'PIL' + cc + digits.slice(-6) + String(h % 1000).padStart(3, '0')], ['IBAN', String(10000000 + h * 13 % 89999999)], ['SWIFT Code', bank[1]]],
      issued: 'Daniel Tan', disclaimer: 'Disclaimer: This is a computer generated invoice and further authorization is not required.', stamp2: 'Page 1 of 1 Date ' + nowStamp()
    };
  }

  // Invoice document · A4 portrait
  var INV_CSS = [
    '.gi{position:relative;width:794px;min-height:1123px;margin:0 auto;background:#fff;color:#161A21;box-shadow:0 12px 40px rgba(0,0,0,.35);box-sizing:border-box;padding:0 40px 96px;font-size:12px;line-height:18px;overflow:hidden}',
    '.gi *{box-sizing:border-box;letter-spacing:normal}.gi:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:#E31D1A}',
    '.gi .k{font-size:10px;line-height:15px;text-transform:uppercase;letter-spacing:.07em;color:#5A6170;font-weight:600}.gi .mu{color:#5A6170}',
    '.gi-hd{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;padding:28px 0 20px;border-bottom:1px solid #ECEEF2}',
    '.gi-qr{justify-self:end;line-height:0}.gi-hd img{height:38px;display:block}',
    '.gi-tt{text-align:center}.gi-tt h1{margin:0;font-size:22px;line-height:28px;letter-spacing:.04em;font-weight:700}',
    '.gi-tt .sub{margin-top:6px;display:flex;justify-content:center;align-items:center;gap:8px;font-size:12px}',
    '.gi-badge{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:12px;font-size:12px;line-height:16px;font-weight:500;white-space:nowrap}',
    '.gi-strip{display:grid;grid-template-columns:repeat(4,1fr);margin-top:20px;border:1px solid #DADDE3;border-radius:8px}',
    '.gi-strip>div{padding:10px 14px;border-left:1px solid #DADDE3}.gi-strip>div:first-child{border-left:0}.gi-strip .v{margin-top:3px;font-weight:600;font-size:14px;line-height:20px}',
    '.gi-parties{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:24px}',
    '.gi-parties .n{font-weight:600;font-size:14px;line-height:20px;margin-top:6px}.gi-parties .l{color:#3A4556}',
    '.gi-cust{margin-top:20px;padding-top:16px;border-top:1px solid #ECEEF2;display:grid;grid-template-columns:repeat(3,1fr);gap:12px 24px}.gi-cust .v,.gi-ship .v{margin-top:2px;font-weight:500}',
    '.gi-ship{margin-top:20px;padding:14px 18px;border-radius:8px;background:#F7F8FA;display:grid;grid-template-columns:1fr 1.35fr 1fr;gap:12px 24px}',
        '.gi table{width:100%;border-collapse:collapse;margin-top:24px;font-size:11.5px;line-height:16px;table-layout:auto}',
    '.gi th{background:#F4F5F7;text-align:left;font-weight:600;font-size:10px;line-height:14px;color:#3A4556;padding:9px 6px;border:0;border-bottom:1px solid #DADDE3;vertical-align:bottom;height:auto;position:static;white-space:normal;text-transform:none;letter-spacing:0}',
    '.gi th:first-child,.gi td:first-child{padding-left:10px}.gi th:last-child,.gi td:last-child{padding-right:10px}',
    '.gi td{padding:10px 6px;border:0;border-bottom:1px solid #ECEEF2;vertical-align:top;height:auto;white-space:nowrap;font-variant-numeric:tabular-nums}.gi td.w{white-space:normal;min-width:130px;font-weight:500}',
    '.gi tbody tr:hover td{background:none}.gi .r{text-align:right}',
    '.gi-bt{display:grid;grid-template-columns:1fr 290px;gap:32px;margin-top:22px;align-items:start}',
    '.gi-bank{display:grid;grid-template-columns:auto 1fr;gap:5px 16px;margin-top:8px}.gi-bank span:nth-child(odd){color:#5A6170}',
    '.gi-tot{display:flex;flex-direction:column;gap:6px}.gi-tot>div{display:flex;justify-content:space-between;gap:16px;font-variant-numeric:tabular-nums}',
    '.gi-tot>div.g{border-top:1px solid #161A21;padding-top:10px;margin-top:2px;font-weight:700;font-size:15px;line-height:22px}',
    '.gi-words{margin-top:16px;padding:10px 14px;border-radius:6px;background:#F7F8FA;color:#3A4556}',
    '.gi-ft{position:absolute;left:40px;right:40px;bottom:24px;border-top:1px solid #DADDE3;padding-top:10px;font-size:10.5px;line-height:16px;color:#5A6170;display:grid;grid-template-columns:1fr auto;gap:2px 24px}.gi-ft .d{grid-column:1/-1}'
  ].join('');
  // Invoice document · A4 landscape variant so the charge columns stay readable
  var INV_CSS_L = [
    '.gl{position:relative;width:1123px;min-height:794px;margin:0 auto;background:#fff;color:#161A21;box-shadow:0 12px 40px rgba(0,0,0,.35);box-sizing:border-box;padding:0 48px 64px;font-size:13px;line-height:19px;overflow:hidden}',
    '.gl *{box-sizing:border-box;letter-spacing:normal}.gl:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:#E31D1A}',
    '.gl .k{font-size:11px;line-height:16px;text-transform:uppercase;letter-spacing:.07em;color:#5A6170;font-weight:600}.gl .mu{color:#5A6170}',
    '.gl-hd{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;padding:32px 0 24px;border-bottom:1px solid #ECEEF2}',
    '.gl-qr{justify-self:end;line-height:0}.gl-hd img{height:44px;display:block}',
    '.gl-tt{text-align:center}.gl-tt h1{margin:0;font-size:26px;line-height:32px;letter-spacing:.04em;font-weight:700}',
    '.gl-tt .sub{margin-top:6px;display:flex;justify-content:center;align-items:center;gap:10px;font-size:13px}',
    '.gl-badge{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:12px;font-size:12px;line-height:16px;font-weight:500;white-space:nowrap}',
    '.gl-strip{display:grid;grid-template-columns:repeat(4,1fr);margin-top:24px;border:1px solid #DADDE3;border-radius:8px}',
    '.gl-strip>div{padding:12px 16px;border-left:1px solid #DADDE3}.gl-strip>div:first-child{border-left:0}.gl-strip .v{margin-top:4px;font-weight:600;font-size:15px;line-height:20px}',
    '.gl-parties{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;margin-top:28px}',
    '.gl-parties .n{font-weight:600;font-size:15px;line-height:21px;margin-top:8px}.gl-parties .l{color:#3A4556}',
    '.gl-kv{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;margin-top:8px}.gl-kv span:nth-child(odd){color:#5A6170}',
    '.gl-ship{margin-top:24px;padding:16px 20px;border-radius:8px;background:#F7F8FA;display:grid;grid-template-columns:repeat(3,1fr);gap:14px 32px}',
    '.gl-ship .v{margin-top:2px;font-weight:500}',
    '.gl table{width:100%;border-collapse:collapse;margin-top:28px;font-size:12.5px;line-height:18px;table-layout:auto}',
    '.gl th{background:#F4F5F7;text-align:left;font-weight:600;font-size:11px;line-height:15px;color:#3A4556;padding:10px 8px;border:0;border-bottom:1px solid #DADDE3;vertical-align:bottom;height:auto;position:static;white-space:normal;text-transform:none;letter-spacing:0}',
    '.gl th:first-child,.gl td:first-child{padding-left:12px}.gl th:last-child,.gl td:last-child{padding-right:12px}',
    '.gl td{padding:11px 8px;border:0;border-bottom:1px solid #ECEEF2;vertical-align:top;height:auto;white-space:nowrap;font-variant-numeric:tabular-nums}.gl td.w{white-space:normal;min-width:190px;font-weight:500}',
    '.gl tbody tr:hover td{background:none}.gl .r{text-align:right}',
    '.gl-bt{display:grid;grid-template-columns:1fr 360px;gap:48px;margin-top:24px;align-items:start}',
    '.gl-bank{display:grid;grid-template-columns:auto 1fr;gap:6px 20px;margin-top:8px}.gl-bank span:nth-child(odd){color:#5A6170}',
    '.gl-tot{display:flex;flex-direction:column;gap:8px}.gl-tot>div{display:flex;justify-content:space-between;gap:16px;font-variant-numeric:tabular-nums}',
    '.gl-tot>div.g{border-top:1px solid #161A21;padding-top:10px;margin-top:2px;font-weight:700;font-size:16px;line-height:22px}',
    '.gl-words{margin-top:12px;padding:10px 14px;border-radius:6px;background:#F7F8FA;color:#3A4556}',
    '.gl-ft{position:absolute;left:48px;right:48px;bottom:24px;border-top:1px solid #DADDE3;padding-top:10px;font-size:11px;line-height:16px;color:#5A6170;display:flex;justify-content:space-between;gap:24px}'
  ].join('');
  // Same colours as the Invoice Status chip on the list screens (--okbg/--ok, --warnbg/--warn, --badbg/--bad)
  var CHIP = { PAID: ['#E6F3EC', '#1F6B45'], 'UN-PAID': ['#FDF0E3', '#8A4200'], CANCELLED: ['#FBEAEA', '#A3262A'] };
  var BADGE = {}; Object.keys(CHIP).forEach(function (k) { BADGE[k] = 'background:' + CHIP[k][0] + ';color:' + CHIP[k][1]; });
  function invoiceHtml(m) {
    var kv = function (rows, cls) { return '<div class="' + cls + '">' + rows.map(function (r) { return '<span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span>'; }).join('') + '</div>'; };
    var strip = m.strip.map(function (r) { return '<div><div class="k">' + esc(r[0]) + '</div><div class="v">' + esc(r[1]) + '</div></div>'; }).join('');
    var head = '<tr>' + m.cols.map(function (c, i) { return '<th class="' + (m.right_[i] ? 'r' : '') + '">' + esc(c) + '</th>'; }).join('') + '</tr>';
    var body = m.rows.map(function (r) { return '<tr>' + m.keys.map(function (k, i) { return '<td class="' + (m.right_[i] ? 'r' : '') + (k === 'head' ? ' w' : '') + '">' + esc(r[k]) + '</td>'; }).join('') + '</tr>'; }).join('');
    var tot = '<div class="gi-tot">' + m.totals.map(function (t, i) { return '<div' + (i === m.totals.length - 1 ? ' class="g"' : '') + '><span>' + esc(t[0]) + '</span><span>' + esc(t[1]) + '</span></div>'; }).join('') + '</div>';
    return '<div class="gi" role="document">' +
      '<div class="gi-hd"><img src="data:image/jpeg;base64,' + LOGO + '" alt="PIL">' +
      '<div class="gi-tt"><h1>' + esc(m.title.toUpperCase()) + '</h1><div class="sub"><span class="mu">Transaction Name:</span><b>' + esc(m.txn) + '</b>' + (m.badge ? '<span class="gi-badge" style="' + BADGE[m.badge] + '">' + esc(m.badge) + '</span>' : '') + '</div></div>' + (m.qr ? '<div class="gi-qr">' + qrSvg(m.qr, 72) + '</div>' : '<div></div>') + '</div>' +
      '<div class="gi-strip">' + strip + '</div>' +
      '<div class="gi-parties">' +
        '<div><div class="k">From</div><div class="n">' + esc(m.from[0]) + '</div>' + m.from.slice(1).map(function (l) { return '<div class="l">' + esc(l) + '</div>'; }).join('') + '</div>' +
        '<div><div class="k">To</div><div class="n">' + esc(m.to[0]) + '</div>' + m.to.slice(1).map(function (l) { return '<div class="l">' + esc(l) + '</div>'; }).join('') + '</div>' +
      '</div><div class="gi-cust">' + m.details.map(function (r) { return '<div><div class="k">' + esc(r[0]) + '</div><div class="v">' + esc(r[1]) + '</div></div>'; }).join('') + '</div>' +
      '<div class="gi-ship">' + m.ship.map(function (r) { return '<div><div class="k">' + esc(r[0]) + '</div><div class="v">' + esc(r[1]) + '</div></div>'; }).join('') + '</div>' +
      '<table><thead>' + head + '</thead><tbody>' + body + '</tbody></table>' +
      '<div class="gi-bt"><div><div class="k">Bank details</div>' + kv(m.bank, 'gi-bank') + '</div>' + tot + '</div>' +
      '<div class="gi-words">' + esc(m.words) + '</div>' +
      '<div class="gi-ft"><span>Issued By: ' + esc(m.issued) + '</span><span>' + esc(m.stamp2) + '</span><span class="d">' + esc(m.disclaimer) + '</span></div></div>';
  }

  function invoiceHtmlL(m) {
    var kv = function (rows, cls) { return '<div class="' + cls + '">' + rows.map(function (r) { return '<span>' + esc(r[0]) + '</span><span>' + esc(r[1]) + '</span>'; }).join('') + '</div>'; };
    var strip = m.strip.map(function (r) { return '<div><div class="k">' + esc(r[0]) + '</div><div class="v">' + esc(r[1]) + '</div></div>'; }).join('');
    var head = '<tr>' + m.cols.map(function (c, i) { return '<th class="' + (m.right_[i] ? 'r' : '') + '">' + esc(c) + '</th>'; }).join('') + '</tr>';
    var body = m.rows.map(function (r) { return '<tr>' + m.keys.map(function (k, i) { return '<td class="' + (m.right_[i] ? 'r' : '') + (k === 'head' ? ' w' : '') + '">' + esc(r[k]) + '</td>'; }).join('') + '</tr>'; }).join('');
    var tot = '<div class="gl-tot">' + m.totals.map(function (t, i) { return '<div' + (i === m.totals.length - 1 ? ' class="g"' : '') + '><span>' + esc(t[0]) + '</span><span>' + esc(t[1]) + '</span></div>'; }).join('') + '</div>';
    return '<div class="gl" role="document">' +
      '<div class="gl-hd"><img src="data:image/jpeg;base64,' + LOGO + '" alt="PIL">' +
      '<div class="gl-tt"><h1>' + esc(m.title.toUpperCase()) + '</h1><div class="sub"><span class="mu">Transaction Name:</span><b>' + esc(m.txn) + '</b>' + (m.badge ? '<span class="gl-badge" style="' + BADGE[m.badge] + '">' + esc(m.badge) + '</span>' : '') + '</div></div>' + (m.qr ? '<div class="gl-qr">' + qrSvg(m.qr, 84) + '</div>' : '<div></div>') + '</div>' +
      '<div class="gl-strip">' + strip + '</div>' +
      '<div class="gl-parties">' +
        '<div><div class="k">From</div><div class="n">' + esc(m.from[0]) + '</div>' + m.from.slice(1).map(function (l) { return '<div class="l">' + esc(l) + '</div>'; }).join('') + '</div>' +
        '<div><div class="k">To</div><div class="n">' + esc(m.to[0]) + '</div>' + m.to.slice(1).map(function (l) { return '<div class="l">' + esc(l) + '</div>'; }).join('') + '</div>' +
        '<div><div class="k">Customer &amp; payment</div>' + kv(m.details, 'gl-kv') + '</div></div>' +
      '<div class="gl-ship">' + m.ship.map(function (r) { return '<div><div class="k">' + esc(r[0]) + '</div><div class="v">' + esc(r[1]) + '</div></div>'; }).join('') + '</div>' +
      '<table><thead>' + head + '</thead><tbody>' + body + '</tbody></table>' +
      '<div class="gl-bt"><div><div class="k">Bank details</div>' + kv(m.bank, 'gl-bank') + '</div>' + tot + '</div>' +
      '<div class="gl-words">' + esc(m.words) + '</div>' +
      '<div class="gl-ft"><span>Issued By: ' + esc(m.issued) + '</span><span>' + esc(m.disclaimer) + '</span><span>' + esc(m.stamp2) + '</span></div></div>';
  }

  // PDF: A4 portrait, same layout as the screen
  function drawInvoice(m) {
    var W = 595, H = 842, p = new Page(W, H), L = 30, R = W - 30, y, MU = '#5A6170';
    var K = function (x, yy, t) { p.text(x, yy, t.toUpperCase(), { size: 6.5, bold: true, color: MU }); };
    p.rect(0, 0, W, 3, '#E31D1A');
    p.logo(L, 22, 27);
    p.text(W / 2, 36, m.title.toUpperCase(), { size: 15, bold: true, align: 'c' });
    var lw = width('Transaction Name:', false, 8), vw = width(m.txn, true, 8), bw = m.badge ? width(m.badge, false, 7) + 14 : 0;
    var sx = W / 2 - (lw + 4 + vw + (bw ? 8 + bw : 0)) / 2;
    p.text(sx, 53, 'Transaction Name:', { size: 8, color: MU }); p.text(sx + lw + 4, 53, m.txn, { size: 8, bold: true });
    if (m.badge) { var bx = sx + lw + 4 + vw + 8, bc = CHIP[m.badge]; p.pill(bx, 53 - 9.6, bw, 14, bc[0]); p.text(bx + 7, 53 - 0.4, m.badge, { size: 7, color: bc[1] }); }
    if (m.qr) qrPdf(p, m.qr, R - 50, 10, 50);
    p.line(L, 66, R, 66, '#ECEEF2');
    // strip
    y = 78; var sw = (R - L) / 4; p.rect(L, y, R - L, 34, null, '#DADDE3');
    m.strip.forEach(function (r, i) { var x = L + i * sw; if (i) p.line(x, y, x, y + 34); K(x + 9, y + 12, r[0]); p.text(x + 9, y + 26, r[1], { size: 9.5, bold: true }); });
    // parties
    y = 130; var cw = (R - L - 24) / 2, cx = [L, L + cw + 24];
    K(cx[0], y, 'From'); K(cx[1], y, 'To');
    var col = function (x, lines) { var yy = y + 13; lines.forEach(function (l, i) { wrap(l, i === 0, i === 0 ? 9 : 8, cw - 6).forEach(function (t) { p.text(x, yy, t, { size: i === 0 ? 9 : 8, bold: i === 0, color: i === 0 ? '#161A21' : '#3A4556' }); yy += 11; }); }); return yy; };
    y = Math.max(col(cx[0], m.from), col(cx[1], m.to)) + 6;
    // customer & payment
    p.line(L, y, R, y, '#ECEEF2'); y += 14;
    var c3 = (R - L) / 3, grid = function (items, x0, w, top) { items.forEach(function (r, i) { var x = x0 + (i % 3) * w, yy = top + Math.floor(i / 3) * 24; K(x, yy, r[0]); p.text(x, yy + 11, r[1], { size: 8 }); }); return top + Math.ceil(items.length / 3) * 24; };
    y = grid(m.details, L, c3, y) + 2;
    // shipment panel
    var rows = Math.ceil(m.ship.length / 3), ph = 12 + rows * 24; p.rect(L, y, R - L, ph, '#F7F8FA');
    grid(m.ship, L + 12, (R - L - 24) / 3, y + 14);
    y += ph + 14;
    // table
    var fr = [2.0, 0.62, 0.55, 0.85, 0.7, 1.0, 0.95, 0.85, 1.0], tot = fr.reduce(function (a, b) { return a + b; }, 0), xs = [L];
    fr.forEach(function (f) { xs.push(xs[xs.length - 1] + f * (R - L) / tot); });
    var hh = 24; p.rect(L, y, R - L, hh, '#F4F5F7'); p.line(L, y + hh, R, y + hh, '#DADDE3');
    m.cols.forEach(function (c, i) { var ln = wrap(c, true, 6.5, xs[i + 1] - xs[i] - 6), yy = y + hh - 6 - (ln.length - 1) * 8;
      ln.forEach(function (t, k) { p.text(m.right_[i] ? xs[i + 1] - 3 : xs[i] + 3, yy + k * 8, t, { size: 6.5, bold: true, color: '#3A4556', align: m.right_[i] ? 'r' : 'l' }); }); });
    y += hh;
    m.rows.forEach(function (r) {
      var hl = wrap(r.head, true, 8, xs[1] - xs[0] - 6), rh = Math.max(19, 8 + hl.length * 10);
      hl.forEach(function (t, k) { p.text(xs[0] + 3, y + 12 + k * 10, t, { size: 8 }); });
      m.keys.forEach(function (k, i) { if (k === 'head') return; var s = String(r[k]); while (width(s, false, 8) > xs[i + 1] - xs[i] - 6 && s.length > 3) s = s.slice(0, -1); p.text(m.right_[i] ? xs[i + 1] - 3 : xs[i] + 3, y + 12, s, { size: 8, align: m.right_[i] ? 'r' : 'l' }); });
      y += rh; p.line(L, y, R, y, '#ECEEF2');
    });
    // bank + totals
    y += 16; var tx = R - 210, ty = y;
    m.totals.forEach(function (t, i) { var last = i === m.totals.length - 1; if (last) { p.line(tx, ty - 7, R, ty - 7, '#161A21', 0.9); ty += 5; }
      p.text(tx, ty, t[0], { size: last ? 10 : 8, bold: last }); p.text(R, ty, t[1], { size: last ? 10 : 8, bold: last, align: 'r' }); ty += last ? 14 : 12; });
    K(L, y, 'Bank details'); var by = y + 13;
    m.bank.forEach(function (b) { p.text(L, by, b[0], { size: 8, color: MU }); p.text(L + 108, by, b[1], { size: 8 }); by += 11; });
    y = Math.max(ty, by) + 6; var wl = wrap(m.words, false, 8, R - L - 18), wh = 8 + wl.length * 10;
    p.rect(L, y, R - L, wh, '#F7F8FA'); wl.forEach(function (t, k) { p.text(L + 9, y + 12 + k * 10, t, { size: 8, color: '#3A4556' }); });
    var fy = H - 30; p.line(L, fy - 11, R, fy - 11, '#DADDE3');
    p.text(L, fy, 'Issued By: ' + m.issued, { size: 7, color: MU });
    p.text(R, fy, m.stamp2, { size: 7, color: MU, align: 'r' });
    p.text(L, fy + 11, m.disclaimer, { size: 7, color: MU });
    return [p];
  }

  // PDF: A4 landscape variant
  function drawInvoiceL(m) {
    var W = 842, H = 595, p = new Page(W, H), L = 36, R = W - 36, y, MU = '#5A6170';
    var K = function (x, yy, t) { p.text(x, yy, t.toUpperCase(), { size: 6.5, bold: true, color: MU }); };
    p.rect(0, 0, W, 3, '#E31D1A');
    p.logo(L, 22, 30);
    p.text(W / 2, 38, m.title.toUpperCase(), { size: 17, bold: true, align: 'c' });
    var lw = width('Transaction Name:', false, 8.5), vw = width(m.txn, true, 8.5), bw = m.badge ? width(m.badge, false, 7) + 14 : 0;
    var sx = W / 2 - (lw + 4 + vw + (bw ? 8 + bw : 0)) / 2;
    p.text(sx, 56, 'Transaction Name:', { size: 8.5, color: MU }); p.text(sx + lw + 4, 56, m.txn, { size: 8.5, bold: true });
    if (m.badge) { var bx = sx + lw + 4 + vw + 8, bc = CHIP[m.badge]; p.pill(bx, 56 - 9.6, bw, 14, bc[0]); p.text(bx + 7, 56 - 0.4, m.badge, { size: 7, color: bc[1] }); }
    if (m.qr) qrPdf(p, m.qr, R - 54, 10, 54);
    p.line(L, 70, R, 70, '#ECEEF2');
    // strip
    y = 84; var sw = (R - L) / 4; p.rect(L, y, R - L, 36, null, '#DADDE3');
    m.strip.forEach(function (r, i) { var x = L + i * sw; if (i) p.line(x, y, x, y + 36); K(x + 10, y + 13, r[0]); p.text(x + 10, y + 28, r[1], { size: 10, bold: true }); });
    // parties
    y = 140; var cw = (R - L - 48) / 3, cx = [L, L + cw + 24, L + 2 * (cw + 24)];
    K(cx[0], y, 'From'); K(cx[1], y, 'To'); K(cx[2], y, 'Customer & payment');
    var col = function (x, lines) { var yy = y + 14; lines.forEach(function (l, i) { wrap(l, i === 0, i === 0 ? 9.5 : 8.5, cw - 6).forEach(function (t) { p.text(x, yy, t, { size: i === 0 ? 9.5 : 8.5, bold: i === 0, color: i === 0 ? '#161A21' : '#3A4556' }); yy += 12; }); }); return yy; };
    var y1 = col(cx[0], m.from), y2 = col(cx[1], m.to), y3 = y + 14;
    var dx = Math.max.apply(null, m.details.map(function (r) { return width(r[0], false, 8.5); })) + 10;
    m.details.forEach(function (r) { p.text(cx[2], y3, r[0], { size: 8.5, color: MU }); p.text(cx[2] + dx, y3, r[1], { size: 8.5 }); y3 += 12; });
    y = Math.max(y1, y2, y3) + 8;
    // shipment panel
    var rows = Math.ceil(m.ship.length / 3), ph = 16 + rows * 26; p.rect(L, y, R - L, ph, '#F7F8FA');
    m.ship.forEach(function (r, i) { var x = L + 14 + (i % 3) * ((R - L - 28) / 3), yy = y + 16 + Math.floor(i / 3) * 26; K(x, yy, r[0]); p.text(x, yy + 12, r[1], { size: 8.5 }); });
    y += ph + 14;
    // table
    var fr = [2.2, 0.62, 0.55, 0.8, 0.66, 0.95, 0.9, 0.8, 0.95], tot = fr.reduce(function (a, b) { return a + b; }, 0), xs = [L];
    fr.forEach(function (f) { xs.push(xs[xs.length - 1] + f * (R - L) / tot); });
    var hh = 26; p.rect(L, y, R - L, hh, '#F4F5F7'); p.line(L, y + hh, R, y + hh, '#DADDE3');
    m.cols.forEach(function (c, i) { var ln = wrap(c, true, 7, xs[i + 1] - xs[i] - 8), yy = y + hh - 7 - (ln.length - 1) * 8.5;
      ln.forEach(function (t, k) { p.text(m.right_[i] ? xs[i + 1] - 4 : xs[i] + 4, yy + k * 8.5, t, { size: 7, bold: true, color: '#3A4556', align: m.right_[i] ? 'r' : 'l' }); }); });
    y += hh;
    m.rows.forEach(function (r) {
      var hl = wrap(r.head, true, 8.5, xs[1] - xs[0] - 8), rh = Math.max(20, 9 + hl.length * 11);
      hl.forEach(function (t, k) { p.text(xs[0] + 4, y + 13 + k * 11, t, { size: 8.5 }); });
      m.keys.forEach(function (k, i) { if (k === 'head') return; var s = String(r[k]); while (width(s, false, 8.5) > xs[i + 1] - xs[i] - 8 && s.length > 3) s = s.slice(0, -1); p.text(m.right_[i] ? xs[i + 1] - 4 : xs[i] + 4, y + 13, s, { size: 8.5, align: m.right_[i] ? 'r' : 'l' }); });
      y += rh; p.line(L, y, R, y, '#ECEEF2');
    });
    // bank + totals
    y += 16; var tx = R - 250, ty = y;
    m.totals.forEach(function (t, i) { var last = i === m.totals.length - 1; if (last) { p.line(tx, ty - 7, R, ty - 7, '#161A21', 0.9); ty += 5; }
      p.text(tx, ty, t[0], { size: last ? 10.5 : 8.5, bold: last }); p.text(R, ty, t[1], { size: last ? 10.5 : 8.5, bold: last, align: 'r' }); ty += last ? 14 : 13; });
    K(L, y, 'Bank details'); var by = y + 14;
    m.bank.forEach(function (b) { p.text(L, by, b[0], { size: 8.5, color: MU }); p.text(L + 130, by, b[1], { size: 8.5 }); by += 12; });
    y = Math.max(ty, by) + 6; p.rect(L, y, R - L, 20, '#F7F8FA'); p.text(L + 10, y + 13, m.words, { size: 8.5, color: '#3A4556' });
    var fy = H - 20; p.line(L, fy - 11, R, fy - 11, '#DADDE3');
    p.text(L, fy, 'Issued By: ' + m.issued, { size: 7, color: MU });
    p.text(W / 2, fy, m.disclaimer, { size: 7, color: MU, align: 'c' });
    p.text(R, fy, m.stamp2, { size: 7, color: MU, align: 'r' });
    return [p];
  }

  // ---------------------------------------------------------------- screen renderer
  var CSS = [
    '.gd-paper,.gd-paper *{box-sizing:border-box;letter-spacing:normal}.gd-paper table{width:100%;table-layout:auto}.gd-paper td,.gd-paper th{height:auto;white-space:normal}.gd-paper tbody tr:hover td{background:none}.gd-scrim{position:fixed;inset:0;z-index:200;background:rgba(14,17,22,.62);display:flex;flex-direction:column;align-items:center;font-family:"IBM Plex Sans",system-ui,sans-serif}',
    '.gd-bar{position:sticky;top:0;width:100%;box-sizing:border-box;display:flex;align-items:center;gap:8px;padding:10px 20px;background:#161A21;color:#fff;flex:none}',
    '.gd-bar .t{font-weight:600;font-size:14px;margin-right:auto;display:flex;gap:10px;align-items:baseline;min-width:0}',
    '.gd-bar .t span{font-family:"IBM Plex Mono",monospace;font-weight:500;color:#C3CAD5;font-size:13px}',
    '.gd-btn{height:32px;padding:0 14px;border-radius:6px;border:1px solid #3A4350;background:#232A34;color:#fff;font:500 13px "IBM Plex Sans",sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}',
    '.gd-seg{display:inline-flex;padding:2px;gap:2px;border:1px solid #3A4350;border-radius:6px;background:#232A34}',
    '.gd-seg-b{height:26px;padding:0 10px;border:0;border-radius:4px;background:transparent;color:#C3CAD5;font:500 13px "IBM Plex Sans",sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}',
    '.gd-seg-b:hover{color:#fff;background:#2C333E}.gd-seg-b[aria-pressed=true]{background:#fff;color:#161A21}.gd-seg-b:focus-visible{outline:2px solid #5AB0E8;outline-offset:1px}',
    '.gd-btn:hover{background:#2C333E}.gd-btn.p{background:#0071B7;border-color:#0071B7}.gd-btn.p:hover{background:#005C96}',
    '.gd-btn:focus-visible,.gd-x:focus-visible{outline:2px solid #5AB0E8;outline-offset:2px}',
    '.gd-x{width:32px;height:32px;border-radius:6px;border:0;background:transparent;color:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.gd-x:hover{background:#2C333E}',
    '.gd-scroll{flex:1;overflow:auto;width:100%;padding:24px 0 40px;box-sizing:border-box}',
    '.gd-paper{position:relative;width:794px;min-height:1123px;margin:0 auto;background:#fff;color:#161A21;box-shadow:0 12px 40px rgba(0,0,0,.35);box-sizing:border-box;padding:0 48px 40px;font-size:12px;line-height:16px;overflow:hidden}',
    '.gd-paper:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:#E31D1A}',
    '.gd-head{display:flex;justify-content:space-between;align-items:flex-start;padding-top:36px}',
    '.gd-head img{height:40px;display:block}.gd-from{font-size:11px;color:#5A6170;margin-top:6px}',
    '.gd-title{text-align:right}.gd-title h1{margin:0;font-size:22px;line-height:28px;letter-spacing:.04em;font-weight:700}',
    '.gd-title .no{font-family:"IBM Plex Mono",monospace;font-size:13px;color:#3A4556;margin-top:2px}',
    '.gd-meta{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:24px;border:1px solid #DADDE3;border-radius:6px}',
    '.gd-meta>div{padding:10px 12px;border-left:1px solid #DADDE3}.gd-meta>div:first-child{border-left:0}',
    '.gd-k{font-size:10px;line-height:14px;text-transform:uppercase;letter-spacing:.06em;color:#5A6170;font-weight:600}',
    '.gd-v{margin-top:2px;font-weight:500}.gd-mono{font-family:"IBM Plex Mono",monospace}',
    '.gd-two{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}',
    '.gd-two .n{font-weight:600;font-size:13px;margin-top:6px}.gd-two .l{color:#3A4556}',
    '.gd-kv{display:grid;grid-template-columns:104px 1fr;gap:4px 12px;margin-top:6px}.gd-kv span:nth-child(odd){color:#5A6170}',
    '.gd-tbl{width:100%!important;border-collapse:collapse;margin-top:28px;font-size:11.5px}',
    '.gd-tbl th{background:#F4F5F7;text-align:left;font-weight:600;font-size:10px;text-transform:uppercase;letter-spacing:.05em;color:#3A4556;padding:8px 6px;border-top:1px solid #DADDE3;border-bottom:1px solid #DADDE3}',
    '.gd-tbl td{padding:8px 6px;border-bottom:1px solid #ECEEF2;vertical-align:top}.gd-tbl .r{text-align:right}.gd-tbl td.m{font-family:"IBM Plex Mono",monospace}',
    '.gd-tot{display:flex;justify-content:flex-end;gap:24px;margin-top:16px;flex-wrap:wrap}',
    '.gd-tot table{border-collapse:collapse;min-width:240px;width:auto;margin:0}.gd-tot td{padding:4px 0;border:0;background:none;height:auto;font-size:12px}.gd-tot td:first-child{padding-right:32px}.gd-tot td:last-child{text-align:right;font-family:"IBM Plex Mono",monospace}',
    '.gd-tot tr.g td{border-top:1px solid #161A21;padding-top:8px;font-weight:700;font-size:13px}',
    '.gd-notes{margin-top:28px;color:#5A6170;font-size:11px;display:flex;flex-direction:column;gap:2px}',
    '.gd-foot{position:absolute;left:48px;right:48px;bottom:28px;border-top:1px solid #DADDE3;padding-top:8px;font-size:10px;color:#6B7280;display:flex;justify-content:space-between}',
    '.gd-stamp{position:absolute;top:44px;left:400px;transform:rotate(-14deg);border:3px solid currentColor;border-radius:6px;padding:2px 12px;font:700 23px/32px "IBM Plex Sans",sans-serif;letter-spacing:.12em;opacity:.22;pointer-events:none}',
    '@media (max-width:860px){.gd-paper{transform:scale(.9);transform-origin:top center}}'
  ].join('');
  CSS += INV_CSS + INV_CSS_L;
  var STAMP_COLOR = { DRAFT: '#5A6170', CANCELLED: '#A3262A', CREDITED: '#5B3BA8', PAID: '#1F6B45' };

  function paperHtml(m) {
    if (m.kind === 'invoice' || m.kind === 'credit') return m.orient === 'l' ? invoiceHtmlL(m) : invoiceHtml(m);
    var meta = m.meta.slice(0, 4).map(function (r) { return '<div><div class="gd-k">' + esc(r[0]) + '</div><div class="gd-v' + (/No\.$/.test(r[0]) ? ' gd-mono' : '') + '">' + esc(r[1]) + '</div></div>'; }).join('');
    var extraMeta = m.meta.slice(4).map(function (r) { return '<span>' + esc(r[0]) + '</span><span class="gd-mono">' + esc(r[1]) + '</span>'; }).join('');
    var bill = '<div><div class="gd-k">' + esc(m.billTo.title) + '</div><div class="n">' + esc(m.billTo.name) + '</div>' + m.billTo.lines.map(function (l) { return '<div class="l">' + esc(l) + '</div>'; }).join('') + '</div>';
    var ship = m.ship ? '<div><div class="gd-k">' + esc(m.ship.title) + '</div><div class="gd-kv">' + m.ship.rows.map(function (r) { return '<span>' + esc(r[0]) + '</span><span class="gd-mono">' + esc(r[1]) + '</span>'; }).join('') + extraMeta + '</div></div>'
      : (extraMeta ? '<div><div class="gd-kv">' + extraMeta + '</div></div>' : '<div></div>');
    var head = '<tr>' + m.cols.map(function (c, i) { return '<th class="' + (m.align[i] === 'r' ? 'r' : '') + '">' + esc(c) + '</th>'; }).join('') + '</tr>';
    var body = m.rows.map(function (r) { return '<tr>' + r.map(function (v, i) { var mono = i > 0 && (m.align[i] === 'r' || /Charge|Invoice|B\/L|Tax code/.test(m.cols[i])); return '<td class="' + (m.align[i] === 'r' ? 'r ' : '') + (mono ? 'm' : '') + '">' + esc(v) + '</td>'; }).join('') + '</tr>'; }).join('');
    var tot = m.totals.map(function (t) { return '<table>' + t.rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + ' ' + esc(t.cur) + '</td></tr>'; }).join('') + '<tr class="g"><td>' + esc(t.label || 'Total') + '</td><td>' + esc(t.total) + ' ' + esc(t.cur) + '</td></tr></table>'; }).join('');
    return '<div class="gd-paper" role="document">' +
      (m.stamp ? '<div class="gd-stamp" style="color:' + STAMP_COLOR[m.stamp] + '">' + m.stamp + '</div>' : '') +
      '<div class="gd-head"><div><img src="data:image/jpeg;base64,' + LOGO + '" alt="PIL"><div class="gd-from">' + esc(m.from) + '</div></div>' +
      '<div class="gd-title"><h1>' + esc(m.title) + '</h1><div class="no">' + esc(m.no) + '</div></div></div>' +
      '<div class="gd-meta">' + meta + '</div><div class="gd-two">' + bill + ship + '</div>' +
      '<table class="gd-tbl"><thead>' + head + '</thead><tbody>' + body + '</tbody></table>' +
      '<div class="gd-tot">' + tot + '</div>' +
      (m.notes.length ? '<div class="gd-notes">' + m.notes.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('') + '</div>' : '') +
      '<div class="gd-foot"><span>' + esc(m.footer) + '</span><span>Page 1 of 1</span></div></div>';
  }

  var openEl = null, lastFocus = null;
  function close() {
    if (!openEl) return;
    openEl.remove(); openEl = null; document.removeEventListener('keydown', onKey, true);
    try { if (lastFocus && lastFocus.focus) lastFocus.focus(); } catch (e) {}
  }
  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key === 'Tab' && openEl) {
      var f = openEl.querySelectorAll('button'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  function ensureCss() { if (document.getElementById('gd-css')) return; var s = document.createElement('style'); s.id = 'gd-css'; s.textContent = CSS; document.head.appendChild(s); }

  // opts: { json: object|null, onDone: fn(message) }
  function show(m, opts) {
    opts = opts || {};
    ensureCss(); close();
    lastFocus = document.activeElement;
    var label = m.kind === 'receipt' ? 'Receipt' : (m.kind === 'credit' ? 'Credit note' : 'Invoice');
    var isInv = m.kind === 'invoice' || m.kind === 'credit';
    if (isInv) { try { m.orient = localStorage.getItem('girs.inv.orient') === 'l' ? 'l' : 'p'; } catch (e) { m.orient = 'p'; } }
    var ori = function (v, t, icon) { return '<button class="gd-seg-b" data-a="ori" data-v="' + v + '" aria-pressed="' + (m.orient === v) + '" title="' + t + '">' + icon + t + '</button>'; };
    var el = document.createElement('div');
    el.className = 'gd-scrim'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', label + ' ' + m.no);
    el.innerHTML = '<div class="gd-bar"><div class="t">' + label + '<span>' + esc(m.no) + '</span></div>' +
      (isInv ? '<div class="gd-seg" role="group" aria-label="Page orientation">' +
        ori('p', 'Portrait', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="1.5"/></svg>') +
        ori('l', 'Landscape', '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="1.5"/></svg>') + '</div>' : '') +
      (opts.json ? '<button class="gd-btn" data-a="json">Download JSON</button>' : '') +
      '<button class="gd-btn" data-a="print">Print</button>' +
      '<button class="gd-btn p" data-a="pdf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>Download PDF</button>' +
      '<button class="gd-x" data-a="close" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="gd-scroll">' + paperHtml(m) + '</div>';
    el.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-a]') : null;
      if (!b) { if (e.target === el || e.target.classList.contains('gd-scroll')) close(); return; }
      var a = b.getAttribute('data-a');
      if (a === 'close') close();
      else if (a === 'ori') {
        m.orient = b.getAttribute('data-v'); try { localStorage.setItem('girs.inv.orient', m.orient); } catch (e) {}
        el.querySelector('.gd-scroll').innerHTML = paperHtml(m);
        el.querySelectorAll('[data-a="ori"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-v') === m.orient)); });
      }
      else if (a === 'pdf') { download([m]); if (opts.onDone) opts.onDone(m.file + '.pdf downloaded'); }
      else if (a === 'json') { saveFile(m.file + '.json', JSON.stringify(opts.json, null, 2), 'application/json'); if (opts.onDone) opts.onDone(m.file + '.json downloaded'); }
      else if (a === 'print') printDoc(m);
    });
    document.body.appendChild(el); openEl = el;
    document.addEventListener('keydown', onKey, true);
    var pdfBtn = el.querySelector('[data-a="pdf"]'); if (pdfBtn) pdfBtn.focus();
  }
  function printDoc(m) {
    try {
      var w = window.open('', '_blank'); if (!w) return;
      w.document.write('<!doctype html><title>' + esc(m.file) + '</title><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><style>' + CSS +
        'body{margin:0}.gd-paper,.gi,.gl{box-shadow:none;margin:0}@page{size:A4' + (m.orient === 'l' ? ' landscape' : '') + ';margin:0}</style>' + paperHtml(m));
      w.document.close(); setTimeout(function () { w.focus(); w.print(); }, 400);
    } catch (e) {}
  }

  // ---------------------------------------------------------------- PDF writer
  var HW = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  var HB = [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584];
  var WIN = { '—': [151, 1000], '–': [150, 556], '·': [183, 278], '×': [215, 584], '’': [146, 222], '‘': [145, 222], '•': [149, 350], '→': null, '−': null };
  function winChar(ch) { var c = ch.charCodeAt(0); if (c >= 32 && c < 127) return [c, null]; if (ch === '→') return [null, '->']; if (ch === '−') return [45, null]; var w = WIN[ch]; return w ? [w[0], w[1]] : [63, null]; }
  function width(str, bold, size) {
    var t = bold ? HB : HW, w = 0; str = String(str);
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c >= 32 && c < 127) w += t[c - 32]; else { var x = winChar(str[i]); w += x[1] && typeof x[1] === 'number' ? x[1] : (x[1] === '->' ? 833 : 556); }
    }
    return w * size / 1000;
  }
  function pdfStr(str) {
    var out = ''; str = String(str);
    for (var i = 0; i < str.length; i++) {
      var x = winChar(str[i]);
      if (x[1] === '->') { out += '->'; continue; }
      var c = x[0];
      if (c === 40 || c === 41 || c === 92) out += '\\' + String.fromCharCode(c);
      else if (c >= 32 && c < 127) out += String.fromCharCode(c);
      else out += '\\' + ('00' + c.toString(8)).slice(-3);
    }
    return '(' + out + ')';
  }
  function rgb(hex) { var n = parseInt(hex.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255].map(function (v) { return v.toFixed(3); }).join(' '); }
  function wrap(text, bold, size, maxW) {
    var words = String(text).split(' '), lines = [], cur = '';
    words.forEach(function (w) { var t = cur ? cur + ' ' + w : w; if (width(t, bold, size) > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur); return lines;
  }

  var PH = 842, PW = 595;
  function Page(w, h) { this.ops = []; this.w = w || PW; this.h = h || PH; }
  Page.prototype.text = function (x, y, s, o) {
    o = o || {}; var size = o.size || 9, bold = !!o.bold, w = width(s, bold, size);
    if (o.align === 'r') x -= w; else if (o.align === 'c') x -= w / 2;
    this.ops.push('BT ' + rgb(o.color || '#161A21') + ' rg /' + (bold ? 'F2' : 'F1') + ' ' + size + ' Tf ' + x.toFixed(2) + ' ' + (this.h - y).toFixed(2) + ' Td ' + pdfStr(s) + ' Tj ET');
    return w;
  };
  Page.prototype.rect = function (x, y, w, h, fill, stroke, lw) {
    var s = 'q ';
    if (fill) s += rgb(fill) + ' rg ';
    if (stroke) s += rgb(stroke) + ' RG ' + (lw || 0.75) + ' w ';
    s += x.toFixed(2) + ' ' + (this.h - y - h).toFixed(2) + ' ' + w.toFixed(2) + ' ' + h.toFixed(2) + ' re ' + (fill && stroke ? 'B' : (fill ? 'f' : 'S')) + ' Q';
    this.ops.push(s);
  };
  Page.prototype.pill = function (x, y, w, h, fill) {
    var r = h / 2, k = r * 0.5523, Y = this.h - y - h, f = function (n) { return n.toFixed(2); };
    this.ops.push('q ' + rgb(fill) + ' rg ' + f(x + r) + ' ' + f(Y) + ' m ' + f(x + w - r) + ' ' + f(Y) + ' l ' +
      f(x + w - r + k) + ' ' + f(Y) + ' ' + f(x + w) + ' ' + f(Y + r - k) + ' ' + f(x + w) + ' ' + f(Y + r) + ' c ' +
      f(x + w) + ' ' + f(Y + r + k) + ' ' + f(x + w - r + k) + ' ' + f(Y + h) + ' ' + f(x + w - r) + ' ' + f(Y + h) + ' c ' +
      f(x + r) + ' ' + f(Y + h) + ' l ' + f(x + r - k) + ' ' + f(Y + h) + ' ' + f(x) + ' ' + f(Y + r + k) + ' ' + f(x) + ' ' + f(Y + r) + ' c ' +
      f(x) + ' ' + f(Y + r - k) + ' ' + f(x + r - k) + ' ' + f(Y) + ' ' + f(x + r) + ' ' + f(Y) + ' c f Q');
  };
  Page.prototype.line = function (x1, y1, x2, y2, color, lw) { this.ops.push('q ' + rgb(color || '#DADDE3') + ' RG ' + (lw || 0.75) + ' w ' + x1.toFixed(2) + ' ' + (this.h - y1).toFixed(2) + ' m ' + x2.toFixed(2) + ' ' + (this.h - y2).toFixed(2) + ' l S Q'); };
  Page.prototype.logo = function (x, y, h) { var w = h * LOGO_W / LOGO_H; this.ops.push('q ' + w.toFixed(2) + ' 0 0 ' + h.toFixed(2) + ' ' + x.toFixed(2) + ' ' + (this.h - y - h).toFixed(2) + ' cm /Im1 Do Q'); };
  Page.prototype.stamp = function (label, color) {
    var size = 18, w = width(label, true, size) + 20, h = 30, cx = 335, cy = 50, a = -14 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    this.ops.push('q /GS1 gs ' + c.toFixed(4) + ' ' + (-s).toFixed(4) + ' ' + s.toFixed(4) + ' ' + c.toFixed(4) + ' ' + cx + ' ' + (this.h - cy) + ' cm ' + rgb(color) + ' RG 2.5 w ' + (-w / 2).toFixed(2) + ' ' + (-h / 2) + ' ' + w.toFixed(2) + ' ' + h + ' re S ' +
      'BT ' + rgb(color) + ' rg /F2 ' + size + ' Tf ' + (-w / 2 + 10).toFixed(2) + ' -6.3 Td ' + pdfStr(label) + ' Tj ET Q');
  };

  function drawDoc(m) {
    if (m.kind === 'invoice' || m.kind === 'credit') return m.orient === 'l' ? drawInvoiceL(m) : drawInvoice(m);
    var pages = [], p = new Page(), L = 40, R = PW - 40, W = R - L;
    pages.push(p);
    p.rect(0, 0, PW, 3, '#E31D1A');
    if (m.stamp) p.stamp(m.stamp, STAMP_COLOR[m.stamp]);
    p.logo(L, 28, 30);
    p.text(L, 72, m.from, { size: 8, color: '#5A6170' });
    p.text(R, 44, m.title, { size: 16, bold: true, align: 'r' });
    p.text(R, 60, m.no, { size: 9.5, color: '#3A4556', align: 'r' });
    // meta strip
    var y = 88, mh = 36, cw = W / 4;
    p.rect(L, y, W, mh, null, '#DADDE3');
    m.meta.slice(0, 4).forEach(function (r, i) {
      var x = L + i * cw; if (i) p.line(x, y, x, y + mh);
      p.text(x + 8, y + 13, r[0].toUpperCase(), { size: 6.5, bold: true, color: '#5A6170' });
      p.text(x + 8, y + 27, r[1], { size: 9, bold: true });
    });
    // bill to + shipment
    y = 146;
    p.text(L, y, m.billTo.title.toUpperCase(), { size: 6.5, bold: true, color: '#5A6170' });
    var by = y + 14; p.text(L, by, m.billTo.name, { size: 10, bold: true }); by += 13;
    m.billTo.lines.forEach(function (l) { wrap(l, false, 8.5, W / 2 - 20).forEach(function (t) { p.text(L, by, t, { size: 8.5, color: '#3A4556' }); by += 11; }); });
    var sx = L + W / 2 + 10, sy = y;
    var kv = (m.ship ? m.ship.rows : []).concat(m.meta.slice(4));
    if (m.ship) p.text(sx, sy, m.ship.title.toUpperCase(), { size: 6.5, bold: true, color: '#5A6170' });
    sy += 14;
    kv.forEach(function (r) { p.text(sx, sy, r[0], { size: 8.5, color: '#5A6170' }); p.text(sx + 78, sy, r[1], { size: 8.5 }); sy += 12; });
    y = Math.max(by, sy) + 18;
    // table
    var scale = W / m.widths.reduce(function (a, b) { return a + b; }, 0), xs = [], acc = L;
    m.widths.forEach(function (w) { xs.push(acc); acc += w * scale; }); xs.push(R);
    var header = function () {
      p.rect(L, y, W, 18, '#F4F5F7'); p.line(L, y, R, y); p.line(L, y + 18, R, y + 18);
      m.cols.forEach(function (c, i) { var r = m.align[i] === 'r'; p.text(r ? xs[i + 1] - 4 : xs[i] + 4, y + 12, c.toUpperCase(), { size: 6.5, bold: true, color: '#3A4556', align: r ? 'r' : 'l' }); });
      y += 18;
    };
    header();
    m.rows.forEach(function (r) {
      if (y > PH - 140) { p = new Page(); pages.push(p); y = 48; header(); }
      r.forEach(function (v, i) {
        var right = m.align[i] === 'r', maxW = xs[i + 1] - xs[i] - 8, s = String(v);
        while (width(s, false, 8.5) > maxW && s.length > 3) s = s.slice(0, -1);
        p.text(right ? xs[i + 1] - 4 : xs[i] + 4, y + 13, s, { size: 8.5, align: right ? 'r' : 'l' });
      });
      y += 19; p.line(L, y, R, y, '#ECEEF2');
    });
    // totals
    y += 14;
    var tw = 190, tx = R - tw;
    m.totals.forEach(function (t, k) {
      var col = R - (m.totals.length - 1 - k) * (tw + 16), x0 = col - tw, yy = y;
      t.rows.forEach(function (r) { p.text(x0, yy + 9, r[0], { size: 8.5, color: '#3A4556' }); p.text(col, yy + 9, r[1] + ' ' + t.cur, { size: 8.5, align: 'r' }); yy += 14; });
      p.line(x0, yy + 2, col, yy + 2, '#161A21', 0.9);
      p.text(x0, yy + 16, t.label || 'Total', { size: 10, bold: true }); p.text(col, yy + 16, t.total + ' ' + t.cur, { size: 10, bold: true, align: 'r' });
    });
    void tx;
    y += (m.totals[0] ? m.totals[0].rows.length * 14 : 0) + 40;
    m.notes.forEach(function (n) { p.text(L, y, n, { size: 8, color: '#5A6170' }); y += 11; });
    pages.forEach(function (pg, n) {
      pg.line(L, PH - 40, R, PH - 40);
      pg.text(L, PH - 28, m.footer, { size: 7.5, color: '#6B7280' });
      pg.text(R, PH - 28, 'Page ' + (n + 1) + ' of ' + pages.length, { size: 7.5, color: '#6B7280', align: 'r' });
    });
    return pages;
  }

  function b64bytes(b64) { var s = atob(b64), a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a; }
  var LOGO_BYTES = null;

  function buildPdf(models, title) {
    var pages = []; models.forEach(function (m) { pages = pages.concat(drawDoc(m)); });
    if (!LOGO_BYTES) LOGO_BYTES = b64bytes(LOGO);
    var enc = function (s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; };
    var objs = []; // each: array of Uint8Array parts
    var add = function (parts) { objs.push(parts); return objs.length; };
    // 1 catalog, 2 pages, 3 F1, 4 F2, 5 image, 6 gstate, 7 info, then page/content pairs
    var nPages = pages.length, firstPage = 8;
    var kids = []; for (var i = 0; i < nPages; i++) kids.push((firstPage + i * 2) + ' 0 R');
    add([enc('<< /Type /Catalog /Pages 2 0 R >>')]);
    add([enc('<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + nPages + ' >>')]);
    add([enc('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>')]);
    add([enc('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>')]);
    add([enc('<< /Type /XObject /Subtype /Image /Width ' + LOGO_W + ' /Height ' + LOGO_H + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + LOGO_BYTES.length + ' >>\nstream\n'), LOGO_BYTES, enc('\nendstream')]);
    add([enc('<< /Type /ExtGState /CA 0.25 /ca 0.25 >>')]);
    var d = new Date(), pad = function (n) { return ('0' + n).slice(-2); };
    add([enc('<< /Title ' + pdfStr(title) + ' /Producer (GIRS prototype) /CreationDate (D:' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes()) + '00) >>')]);
    pages.forEach(function (pg, n) {
      var content = pg.ops.join('\n');
      add([enc('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pg.w + ' ' + pg.h + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Im1 5 0 R >> /ExtGState << /GS1 6 0 R >> >> /Contents ' + (firstPage + n * 2 + 1) + ' 0 R >>')]);
      add([enc('<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream')]);
    });
    var chunks = [enc('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')], off = chunks[0].length, xref = [];
    objs.forEach(function (parts, n) {
      xref.push(off);
      var head = enc((n + 1) + ' 0 obj\n'), tail = enc('\nendobj\n');
      chunks.push(head); off += head.length;
      parts.forEach(function (p) { chunks.push(p); off += p.length; });
      chunks.push(tail); off += tail.length;
    });
    var x = 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n' + xref.map(function (o) { return ('000000000' + o).slice(-10) + ' 00000 n \n'; }).join('') +
      'trailer\n<< /Size ' + (objs.length + 1) + ' /Root 1 0 R /Info 7 0 R >>\nstartxref\n' + off + '\n%%EOF\n';
    chunks.push(enc(x));
    return new Blob(chunks, { type: 'application/pdf' });
  }

  function saveFile(name, data, type) {
    try {
      var b = data instanceof Blob ? data : new Blob([data], { type: type });
      var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    } catch (e) {}
  }
  function download(models, name) {
    var file = name || models[0].file;
    saveFile(file + '.pdf', buildPdf(models, file), 'application/pdf');
  }

  window.GirsDocs = {
    invoice: function (inv, opts) { show(invoiceModel(inv), opts); },
    receipt: function (rc, opts) { show(receiptModel(rc), opts); },
    invoicePdf: function (list, name) { list = [].concat(list); download(list.map(function (i) { return invoiceModel(i); }), name); },
    receiptPdf: function (rc) { download([receiptModel(rc)]); },
    json: function (name, obj) { saveFile(name + '.json', JSON.stringify(obj, null, 2), 'application/json'); },
    model: invoiceModel, // the document fields (used by the Ready to invoice screen)
    close: close
  };
})();
