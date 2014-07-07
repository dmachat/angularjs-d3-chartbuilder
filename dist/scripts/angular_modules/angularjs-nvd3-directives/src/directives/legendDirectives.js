angular.module("legendDirectives",[]).directive("simpleSvgLegend",function(){return{restrict:"EA",scope:{id:"@",width:"@",height:"@",margin:"@",x:"@",y:"@",labels:"@",styles:"@",classes:"@",shapes:"@",padding:"@",columns:"@"},compile:function(){return function(t,n,r){var i,s,o,u,a=0,f=0,l=1,c=0,h=10,p,d="http://www.w3.org/2000/svg",v,m,g,y,b,w,E=0,S=0;u=t.$eval(r.margin)||{left:5,top:5,bottom:5,right:5},s=r.width==="undefined"?n[0].parentElement.offsetWidth-(u.left+u.right):+r.width-(u.left+u.right),o=r.height==="undefined"?n[0].parentElement.offsetHeight-(u.top+u.bottom):+r.height-(u.top+u.bottom),r.id?i=r.id:i="legend-"+Math.random(),r.columns&&(l=+r.columns),r.padding&&(h=+r.padding),p=h+"",v=document.createElementNS(d,"svg"),r.width&&v.setAttribute("width",s+""),r.height&&v.setAttribute("height",o+""),v.setAttribute("id",i),r.x&&(E=+r.x),r.y&&(S=+r.y),n.append(v),m=document.createElementNS(d,"g"),m.setAttribute("transform","translate("+E+","+S+")"),v.appendChild(m),r.labels&&(g=t.$eval(r.labels)),r.styles&&(y=t.$eval(r.styles)),r.classes&&(b=t.$eval(r.classes)),r.shapes&&(w=t.$eval(r.shapes));for(var x in g)if(g.hasOwnProperty(x)){var T=w[x],N,C,k,L;c%l===0&&(a=0,f+=h+h*1.5),L=document.createElementNS(d,"g"),L.setAttribute("transform","translate("+a+", "+f+")"),T==="rect"?(N=document.createElementNS(d,"rect"),N.setAttribute("y",0-h/2+""),N.setAttribute("width",p),N.setAttribute("height",p)):T==="ellipse"?(N=document.createElementNS(d,"ellipse"),N.setAttribute("rx",p),N.setAttribute("ry",h+h/2+"")):(N=document.createElementNS(d,"circle"),N.setAttribute("r",h/2+"")),y&&y[x]&&N.setAttribute("style",y[x]),b&&b[x]&&N.setAttribute("class",b[x]),L.appendChild(N),a=a+N.clientWidth+(h+h/2),C=document.createElementNS(d,"text"),C.setAttribute("transform","translate(10, 5)"),C.appendChild(document.createTextNode(g[x])),L.appendChild(C),m.appendChild(L),k=C.clientWidth,a=a+k+(h+h*.75),c++}}}}}).directive("nvd3Legend",[function(){var e,t,n,r;return{restrict:"EA",scope:{data:"=",id:"@",margin:"&",width:"@",height:"@",key:"&",color:"&",align:"@",rightalign:"@",updatestate:"@",radiobuttonmode:"@",x:"&",y:"&"},link:function(i,s,o){i.$watch("data",function(u){if(u){if(i.chart)return d3.select("#"+o.id+" svg").attr("height",n).attr("width",t).datum(u).transition().duration(250).call(i.chart);e=i.$eval(o.margin)||{top:5,right:0,bottom:5,left:0},t=o.width===undefined?s[0].parentElement.offsetWidth-(e.left+e.right):+o.width-(e.left+e.right),n=o.height===undefined?s[0].parentElement.offsetHeight-(e.top+e.bottom):+o.height-(e.top+e.bottom);if(t===undefined||t<0)t=400;if(n===undefined||n<0)n=20;o.id?r=o.id:r="legend-"+Math.random(),nv.addGraph({generate:function(){var r=nv.models.legend().width(t).height(n).margin(e).align(o.align===undefined?!0:o.align==="true").rightAlign(o.rightalign===undefined?!0:o.rightalign==="true").updateState(o.updatestate===undefined?!0:o.updatestate==="true").radioButtonMode(o.radiobuttonmode===undefined?!1:o.radiobuttonmode==="true").color(o.color===undefined?nv.utils.defaultColor():i.color()).key(o.key===undefined?function(e){return e.key}:i.key());return d3.select("#"+o.id+" svg")[0][0]||d3.select("#"+o.id).append("svg"),d3.select("#"+o.id+" svg").attr("height",n).attr("width",t).datum(u).transition().duration(250).call(r),nv.utils.windowResize(r.update),i.chart=r,r}})}})}}}]);