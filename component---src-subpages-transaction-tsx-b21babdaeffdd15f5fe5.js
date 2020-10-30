(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{328:function(e,n,t){"use strict";t.r(n),function(e){t(149),t(26),t(378),t(244),t(9),t(10),t(5),t(40),t(60);var a=t(1),r=t.n(a),c=t(370),i=t(372),l=t(499),o=t(373),u=t(395),s=t(396),m=t.n(s);function d(e){return e instanceof Map?Object.fromEntries(Array.from(e).map(function(e){return[e[0],d(e[1])]})):e instanceof Array?e.map(function(e){return d(e)}):e instanceof Uint8Array?"<binary> "+e.toString("hex"):"bigint"==typeof e?Number(e):e}var f={scheme:"apathy",author:"jannik siebert (https://github.com/janniks)",base00:"#faf9f8;",base01:"#0B342D",base02:"#184E45",base03:"#2B685E",base04:"#5F9C92",base05:"#81B5AC",base06:"#A7CEC8",base07:"#D2E7E4",base08:"#3E9688",base09:"#3E7996",base0A:"#3E4C96",base0B:"#883E96",base0C:"#963E4C",base0D:"#96883E",base0E:"#4C963E",base0F:"#3E965B"};n.default=function(n){var t=n.location,a=Object(c.a)(t)[0];return r.a.createElement(i.c,{variables:{id:a}},function(n){var t=n.data,c=n.loading,i=n.error;if(c)return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Transaction Details"),r.a.createElement("p",null,"Loading…"));if(i)return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Transaction Details"),r.a.createElement("p",null,"Failed to load ",a," - ",JSON.stringify(i.message)));var s=t.transactionQuery.transaction;if(!s)return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Transaction Details"),r.a.createElement("p",null,"No such transaction: ",r.a.createElement("code",null,a)));var E=s.blockRef===[]||null===s.blockRef?r.a.createElement("p",null,"No block references were found."):s.blockRef.map(function(e,n){return r.a.createElement("dd",{key:n},r.a.createElement(l.a,{href:"../block/?"+e.hash},e.hash))}),b=s.actions.map(function(n,t){return r.a.createElement("dd",{key:t},r.a.createElement("dl",null,r.a.createElement(m.a,{data:d(Object(u.decode)(e.from(n.raw,"base64"))),theme:f,invertTheme:!1,hideRoot:!0})))}),g="../account/?"+s.signer;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Transaction Details"),r.a.createElement("dl",null,r.a.createElement("dt",null,"Id"),r.a.createElement("dd",null,r.a.createElement("code",null,s.id)),r.a.createElement("dt",null,"Nonce"),r.a.createElement("dd",null,s.nonce," "),r.a.createElement("dt",null,"Public Key"),r.a.createElement("dd",null,r.a.createElement("code",null,s.publicKey)),r.a.createElement("dt",null,"Signature"),r.a.createElement("dd",null,r.a.createElement("code",null,s.signature)),r.a.createElement("dt",null,"Signer"),r.a.createElement("dd",null,r.a.createElement(l.a,{href:g},r.a.createElement("code",null,s.signer))),r.a.createElement("dt",null,"Timestamp"),r.a.createElement("dd",null,r.a.createElement(o.a,{timestamp:s.timestamp})),r.a.createElement("dt",null,"Updated Addresses"),s.updatedAddresses.map(function(e,n){return r.a.createElement("dd",{key:n},r.a.createElement(l.a,{href:"../account/?"+e},r.a.createElement("code",null,e)))}),r.a.createElement("dt",null,"Block Reference"),E,r.a.createElement("dt",null,"Actions"),b))})}}.call(this,t(385).Buffer)},370:function(e,n,t){"use strict";t.d(n,"a",function(){return c});t(185);var a=t(1),r=t(184);function c(e){return[Object(a.useMemo)(function(){return e.search.substr(1)},[e]),Object(a.useCallback)(function(n){var t=e.pathname.substr(Object(r.withPrefix)("/").length-1);Object(r.navigate)(t+(n?"?"+n:""))},[e,r.navigate])]}},372:function(e,n,t){"use strict";t.d(n,"b",function(){return v}),t.d(n,"a",function(){return p}),t.d(n,"c",function(){return $}),t.d(n,"d",function(){return B});t(46);var a=t(186),r=t.n(a),c=t(1),i=t(374);t(376);function l(){var e=E(["\n    query TransactionsByAccount($involvedAddress: Address!, $offset: Int, $limit: Int) {\n  transactionQuery {\n    transactions(involvedAddress: $involvedAddress, desc: true, offset: $offset, limit: $limit) {\n      ...TransactionCommon\n    }\n  }\n}\n    ",""]);return l=function(){return e},e}function o(){var e=E(['\n    query TransactionById($id: ID) {\n  transactionQuery {\n    transaction(id: $id) {\n      ...TransactionCommon\n      actions {\n        raw(encode: "base64")\n      }\n      blockRef {\n        ...BlockCommon\n      }\n    }\n  }\n}\n    ',"\n",""]);return o=function(){return e},e}function u(){var e=E(["\n    query TransactionList($signer: Address, $involvedAddress: Address, $desc: Boolean!, $offset: Int!, $limit: Int!) {\n  transactionQuery {\n    transactions(signer: $signer, involvedAddress: $involvedAddress, desc: $desc, offset: $offset, limit: $limit) {\n      ...TransactionCommon\n    }\n  }\n}\n    ",""]);return u=function(){return e},e}function s(){var e=E(["\n    query BlockByHash($hash: ID) {\n  blockQuery {\n    block(hash: $hash) {\n      ...BlockCommon\n      miner\n      nonce\n      stateRootHash\n      previousBlock {\n        hash\n      }\n      transactions {\n        ...TransactionCommon\n      }\n    }\n  }\n}\n    ","\n",""]);return s=function(){return e},e}function m(){var e=E(["\n    query BlockList($offset: Int!, $limit: Int!, $excludeEmptyTxs: Boolean!, $miner: Address) {\n  blockQuery {\n    blocks(desc: true, offset: $offset, limit: $limit, excludeEmptyTxs: $excludeEmptyTxs, miner: $miner) {\n      ...BlockCommon\n      miner\n      transactions {\n        id\n      }\n    }\n  }\n}\n    ",""]);return m=function(){return e},e}function d(){var e=E(["\n    fragment TransactionCommon on Transaction {\n  id\n  nonce\n  publicKey\n  signature\n  signer\n  timestamp\n  updatedAddresses\n}\n    "]);return d=function(){return e},e}function f(){var e=E(["\n    fragment BlockCommon on Block {\n  hash\n  index\n  difficulty\n  timestamp\n}\n    "]);return f=function(){return e},e}function E(e,n){return n||(n=e.slice(0)),e.raw=n,e}var b=r()(f()),g=r()(d()),h=r()(m(),b),v=function(e){return c.createElement(i.b,Object.assign({query:h},e))};var y=r()(s(),b,g),p=function(e){return c.createElement(i.b,Object.assign({query:y},e))};r()(u(),g);var k=r()(o(),g,b),$=function(e){return c.createElement(i.b,Object.assign({query:k},e))};var A=r()(l(),g),B=function(e){return c.createElement(i.b,Object.assign({query:A},e))}},373:function(e,n,t){"use strict";t(9),t(10),t(5),t(18);var a=t(1),r=t.n(a);var c={hour:"2-digit",minute:"2-digit",year:"2-digit",month:"numeric",day:"numeric"};n.a=function(e){var n=e.timestamp,t=new Date(n),a=new Date;if(a.getFullYear()==t.getFullYear()&&a.getMonth()==t.getMonth()&&a.getDate()==t.getDate()){var i=function(e,n){if(null==e)return{};var t,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)t=c[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(c,["year","month","day"]);return r.a.createElement("time",{dateTime:t.toISOString(),title:t.toLocaleString()},t.toLocaleString(void 0,i))}return r.a.createElement("time",{dateTime:t.toISOString(),title:t.toLocaleString()},t.toLocaleString(void 0,c))}}}]);
//# sourceMappingURL=component---src-subpages-transaction-tsx-b21babdaeffdd15f5fe5.js.map