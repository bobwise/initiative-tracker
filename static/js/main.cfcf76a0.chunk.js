(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,a){},104:function(e,t,a){},105:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(4),c=a.n(r),l=a(7),o=a(16),s=a(44),m=a(8),u=a(10),d=a(37),v=a.n(d),b=function(e){return i.a.createElement("svg",Object.assign({viewBox:"0 0 469.333 469.333"},e),i.a.createElement("path",{d:"M426.667 0h-384C19.146 0 0 19.135 0 42.667v384c0 23.531 19.146 42.667 42.667 42.667h384c23.521 0 42.667-19.135 42.667-42.667v-384C469.333 19.135 450.188 0 426.667 0zm-88.461 308.043c4.167 4.165 4.167 10.919 0 15.085l-15.081 15.082c-4.167 4.165-10.919 4.165-15.086 0l-73.374-73.374-73.374 73.374c-4.167 4.165-10.919 4.165-15.086 0l-15.081-15.082c-4.167-4.165-4.167-10.919 0-15.085l73.374-73.375-73.374-73.374c-4.167-4.165-4.167-10.919 0-15.085l15.081-15.082c4.167-4.165 10.919-4.165 15.086 0l73.374 73.374 73.374-73.374c4.167-4.165 10.919-4.165 15.086 0l15.081 15.082c4.167 4.165 4.167 10.919 0 15.085l-73.374 73.374 73.374 73.375z"}))},f=function(e){return i.a.createElement("svg",{version:"1.1",viewBox:"0 0 32 32","aria-hidden":"true"},i.a.createElement("style",null,"\nenable-background:new 0 0 32 32;\n"),i.a.createElement("path",{d:"M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"}))},E=(a(63),a(38)),p=a.n(E),h=function(e){var t=function(t){var a=t.target,n="checkbox"===a.type?a.checked:a.value,i=a.name;e.onUpdate(e.id,i,n)};return Object(n.useEffect)(function(){e.isActive&&document.getElementById("itemContainer"+e.id).focus()},[e.isActive]),i.a.createElement(u.b,{draggableId:e.id.toString(),index:e.index},function(a,n){return i.a.createElement("div",Object.assign({id:"itemContainer"+e.id,className:p()({initiative_entry:!0,is_dragging:n.isDragging}),onKeyDown:function(t){t.target.id!=="itemContainer"+e.id||46!==t.keyCode&&8!==t.keyCode||e.deleteCallback(e.id)}},a.draggableProps,a.dragHandleProps,{ref:a.innerRef}),i.a.createElement("div",Object.assign({className:"grabber hamburgerIcon"},a.dragHandleProps,{tabIndex:-1,"aria-hidden":"true"}),i.a.createElement(f,null)),i.a.createElement("div",{className:"name"},i.a.createElement("input",{type:"text",name:"name","aria-label":"Character Name",value:e.name,onClick:function(e){e.target.select()},onChange:t})),i.a.createElement("div",{className:"initiative_roll"},i.a.createElement("input",{type:"text",name:"initiative",pattern:"[0-9]*","aria-label":"Initiative",value:e.initiative,onClick:function(e){e.target.select()},onChange:t})),i.a.createElement("div",{className:"actions"},e.deleteCallback&&i.a.createElement("div",{className:"deleteIcon",onClick:function(){e.deleteCallback(e.id)}},i.a.createElement(b,null))))})},g=(a(102),a(103)),k=function(e,t){var a=e.initiative,n=t.initiative;return-1*(a>n?1:n>a?-1:0)},w=function(e){var t=Object(n.useRef)(null),a=Object(n.useRef)(null),r=Object(n.useState)(e.initialEntries?e.initialEntries:[]),c=Object(m.a)(r,2),d=c[0],b=c[1],f=Object(n.useState)(-1),E=Object(m.a)(f,2),p=E[0],w=E[1],y=Object(n.useState)(""),N=Object(m.a)(y,2),j=N[0],C=N[1],O=Object(n.useState)(!1),_=Object(m.a)(O,2),I=_[0],x=_[1],S=function(){b([]),C("The initiative order is empty")},B=function(){var e=Object(s.a)(d);isNaN(a.current.value)||""===t.current.value.trim()||e.push({name:t.current.value.trim(),initiative:Number(a.current.value),id:parseInt(g())}),e=e.sort(k),C("Initiative Order is: "+e.map(function(e){return e.name})),b(e)},A=function(e){b(d.filter(function(t){return t.id!==e}))},D=function(e,t,a){var n=d.map(function(n,i){return n.id===e?"initiative"===t?(a=parseInt(a),isNaN(a)?Object(o.a)({},n,Object(l.a)({},t,0)):Object(o.a)({},n,Object(l.a)({},t,parseInt(a)))):Object(o.a)({},n,Object(l.a)({},t,a)):n});b(n)};return Object(n.useEffect)(function(){t.current.value="",a.current.value=""},[d]),i.a.createElement("main",{className:"initiative_order",onKeyDown:function(e){switch("init_val"===e.target.name&&(40!==e.keyCode&&38!==e.keyCode||e.preventDefault()),e.keyCode){case 32:e.target.classList.contains("initiative_entry")&&x(!I);break;case 27:e.target.classList.contains("initiative_entry")&&I&&x(!1);break;case 13:"clearButton"===e.target.name?S():B(),t.current.focus();break;case 37:break;case 38:p>-1&&(0===p&&t.current.focus(),w(p-1));break;case 39:break;case 40:p<d.length-1&&w(p+1)}}},i.a.createElement("div",{className:"form_container",role:"form"},i.a.createElement("div",{className:"field_container"},i.a.createElement("label",{"aria-hidden":"true",htmlFor:"char_name"},"Name"),i.a.createElement("input",{type:"text",name:"char_name",id:"char_name","aria-label":"Enter character name.",onClick:function(e){e.target.select()},ref:t})),i.a.createElement("div",{className:"field_container"},i.a.createElement("label",{"aria-hidden":"true",htmlFor:"init_val"},"Initiative"),i.a.createElement("input",{type:"number","aria-label":"Enter character initiative",name:"init_val",id:"init_val",pattern:"[0-9]*",onClick:function(e){e.target.select()},ref:a})),i.a.createElement("button",{className:"submitButton","aria-label":"Add Initiative Entry",onClick:function(){B(),t.current.focus()}},"Add")),i.a.createElement("div",{"aria-live":"polite",className:"screen-reader-text",id:"initiative_live"},j),i.a.createElement(u.a,{onDragEnd:function(e){if(e.destination){var t=function(e,t,a){var n=Array.from(e),i=n.splice(t,1),r=Object(m.a)(i,1)[0];return n.splice(a,0,r),n}(d,e.source.index,e.destination.index);b(t),C("Initiative Order is: "+t.map(function(e){return e.name}))}}},i.a.createElement(u.c,{droppableId:"droppable"},function(e,t){return d.length>0&&i.a.createElement("div",Object.assign({className:"entries",ref:e.innerRef},e.droppableProps),i.a.createElement(v.a,{transitionName:"example",transitionEnterTimeout:500,transitionLeaveTimeout:300},d.map(function(e,t){return i.a.createElement(h,{index:t,isActive:t===p&&!I,displayNum:(t+1).toString(),id:e.id,key:e.id,name:e.name,initiative:e.initiative,comments:e.comments,onUpdate:D,deleteCallback:A})})),e.placeholder)})),d.length>0&&i.a.createElement("div",{className:"entry_footer"},i.a.createElement("p",null,"Drag and drop to adjust order."),i.a.createElement("span",{"aria-label":"Tab and Space to select rows, Up Arrow and Down Arrow to move them."}),i.a.createElement("p",{className:"hide-on-mobile","aria-hidden":"true"},i.a.createElement("kbd",null,"Tab")," and ",i.a.createElement("kbd",null,"Space")," to select rows, ",i.a.createElement("kbd",null,"\u2191")," and ",i.a.createElement("kbd",null,"\u2193")," to move them."),i.a.createElement("button",{className:"clearButton",name:"clearButton",onClick:S},"Clear")))},y=(a(104),function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"App"},i.a.createElement("h1",null,"Initiative Tracker"),i.a.createElement("hr",{"aria-hidden":"true"}),i.a.createElement(w,{initialEntries:[{id:123,name:"Anya",initiative:18},{id:234,name:"Wizowski",initiative:15},{id:1233,name:"Milo",initiative:15},{id:23444,name:"Shandri",initiative:15},{id:2352334,name:"Raj",initiative:12},{id:22333333352334,name:"Xhauk",initiative:12},{id:223352334,name:"Kriv",initiative:12}]})),i.a.createElement("footer",{className:"siteFooter"},i.a.createElement("p",null,i.a.createElement("span",{"aria-hidden":"true"},"by")," ",i.a.createElement("a",{"aria-label":"Made by Bobwise, with love.",href:"http://twitter.com/bobwise/"},"Bobwise"))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},45:function(e,t,a){e.exports=a(105)},63:function(e,t,a){}},[[45,1,2]]]);
//# sourceMappingURL=main.cfcf76a0.chunk.js.map